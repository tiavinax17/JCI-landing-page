import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const RoleRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);
  console.log("USER",user);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/admin/unauthorized${user}`} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;