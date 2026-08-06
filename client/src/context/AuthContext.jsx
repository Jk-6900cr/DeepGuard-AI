import { createContext, useCallback, useState } from "react";
import {
  checkIsAuthenticated,
  persistAuthenticated,
  clearAuthenticated,
} from "../utils/auth";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(checkIsAuthenticated());
  const [user, setUser] = useState(null);

  // TODO backend: POST /api/auth/login { identifier, password } -> { token, user }
  // Replace persistAuthenticated() with setToken(token) from utils/auth.js.
  const login = useCallback(async (credentials) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.identifier,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message,
        };
      }

      // Store JWT token
      localStorage.setItem("token", data.token);

      // Temporary authentication
      persistAuthenticated();
      setIsAuthenticated(true);
      setUser(data.user);

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

  // TODO backend: POST /api/auth/signup { fullName, email, mobile, otp } -> { token, user }
  const signup = useCallback(async (details) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
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
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message,
        };
      }

      // Temporary authentication
      persistAuthenticated();
      setIsAuthenticated(true);
      setUser(data.user);

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
    clearAuthenticated();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = { isAuthenticated, user, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}