import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthApi from "../services/auth/AuthApi.js";
import { Navigate } from "react-router-dom";

const AppPrivatesRoutes = ({ element: Component, roles }) => {
  const isAuthenticated = AuthApi.isAuthenticated();
  const userRoles = AuthApi.getUserRole();
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setUnauthorized(true);
    } else if (roles && !userRoles.some((role) => roles.includes(role))) {
      AuthApi.logout();
      toast.warn("Vous n'êtes pas autorisé!");
      setUnauthorized(true);
    } else {
      setUnauthorized(false);
    }
  }, [isAuthenticated, roles, userRoles]);

  if (!isAuthenticated || unauthorized) {
    return <Navigate to="/connexion" replace />;
  }

  return <Component />;
};

export default AppPrivatesRoutes;
