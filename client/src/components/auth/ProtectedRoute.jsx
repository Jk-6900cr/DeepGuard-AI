import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // `state.from` is preserved so signup/login can redirect the user
    // back to the page they originally wanted, once real auth exists.
    return <Navigate to="/signup" replace state={{ from: location }} />;
  }

  return children;
}