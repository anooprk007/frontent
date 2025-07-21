
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("access");

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
