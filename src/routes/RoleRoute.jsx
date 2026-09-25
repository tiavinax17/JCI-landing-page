import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const RoleRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);
  
  if (loading) {
     return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300" />
      </div>
    );
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