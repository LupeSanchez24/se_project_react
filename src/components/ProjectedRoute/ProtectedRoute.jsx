import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, LoggedIn }) {
  return LoggedIn ? children : <Navigate to="/" />;
}
