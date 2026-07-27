import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, roles = [] }) {
  const location = useLocation();
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    localStorage.removeItem("user");
  }

  if (!user?.token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (
    roles.length > 0 &&
    !roles.includes(user.role)
  ) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}

export default ProtectedRoute;
