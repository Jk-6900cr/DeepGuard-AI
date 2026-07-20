// Centralized auth helpers — the only file to rewrite when JWT exists.
// Every other file calls these functions and never touches storage directly.

const AUTH_KEY = "isAuthenticated";

export function getIsAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function persistAuthenticated() {
  localStorage.setItem(AUTH_KEY, "true");
}

export function clearAuthenticated() {
  localStorage.removeItem(AUTH_KEY);
}

// Swap this whole implementation later for:
//   const token = localStorage.getItem("token");
//   return !!token;
// or delegate to useAuth()'s `user` state once a real backend responds.
export function checkIsAuthenticated() {
  return getIsAuthenticated();
}