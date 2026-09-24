import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const RoleRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);
  
  console.log("ROLE CHECK:", {
    user,
    role: user?.role,
    allowedRoles,
    isAllowed: allowedRoles.includes(user?.role),
  });
  console.log("Allowed Roles:", allowedRoles);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/admin/unauthorized`} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;