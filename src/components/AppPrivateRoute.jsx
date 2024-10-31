import AuthApi from "../services/auth/AuthApi.js";
import { Navigate } from "react-router-dom";

const AppPrivateRoute = ({ children }) => {
  return AuthApi.isAuthenticated() ? children : <Navigate to="/connexion" />;
};

export default AppPrivateRoute;
