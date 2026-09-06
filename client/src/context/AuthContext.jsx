import { createContext, useCallback, useState } from "react";
import {
  checkIsAuthenticated,
  persistAuthenticated,
  clearAuthenticated,
} from "../utils/auth";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    checkIsAuthenticated()
  );

  // Restore saved user when the application starts
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Failed to restore user:", error);
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = useCallback(async (credentials) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.identifier,
            password: credentials.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message,
        };
      }

      // Store JWT token
      localStorage.setItem("token", data.token);

      // Store authenticated user
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }

      // Update authentication state
      persistAuthenticated();
      setIsAuthenticated(true);

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }, []);

  const signup = useCallback(async (details) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: details.fullName,
            email: details.email,
            mobile: details.mobile,
            password: details.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message,
        };
      }

      // Store JWT token if signup returns one
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Store authenticated user
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }

      // Update authentication state
      persistAuthenticated();
      setIsAuthenticated(true);

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }, []);

  const logout = useCallback(() => {
    // Remove stored authentication data
    clearAuthenticated();
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}