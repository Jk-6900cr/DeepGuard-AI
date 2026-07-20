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
    console.log("login() called with:", credentials);
    persistAuthenticated();
    setIsAuthenticated(true);
    return { success: true };
  }, []);

  // TODO backend: POST /api/auth/signup { fullName, email, mobile, otp } -> { token, user }
  const signup = useCallback(async (details) => {
    console.log("signup() called with:", details);
    persistAuthenticated();
    setIsAuthenticated(true);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    clearAuthenticated();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = { isAuthenticated, user, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}