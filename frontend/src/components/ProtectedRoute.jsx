import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    alert("Please login first.");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;