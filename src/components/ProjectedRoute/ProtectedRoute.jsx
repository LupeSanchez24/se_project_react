import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  element: Element,
  loggedIn,
  clothingItems,
}) {
  return loggedIn ? (
    <Element clothingItems={clothingItems} />
  ) : (
    <Navigate to="/" />
  );
}
