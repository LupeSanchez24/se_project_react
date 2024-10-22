import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../components/Contexts/AppContext";

export default function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";

  // Destructure isLoggedIn from the value provided by AppContext
  const { isLoggedIn } = useContext(AppContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
