import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/brand/logo-dgi2.png";
import { useConfig } from "../hooks/useConfig.js";
import AppSearchBox from "./AppSearchBox.jsx";
import AppThemeToggle from "./AppThemeToggle.jsx";
import AppNotification from "./AppNotification.jsx";
import AppProfile from "./AppProfile.jsx";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext.jsx";
import AuthApi from "../services/auth/AuthApi.js";
import { toast } from "react-toastify";
const AppHeader = () => {
  const { config, setConfig } = useConfig();

  const handleThemeToggle = () => {
    const newTheme = config.theme === "dark" ? "light" : "dark";
    setConfig((prevConfig) => ({
      ...prevConfig,
      theme: newTheme,
    }));

    // Mettre à jour localStorage
    localStorage.setItem("theme", newTheme);

    // Appliquer ou retirer la classe dark
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = () => {
    AuthApi.logout();
    setIsAuthenticated(false);
    toast.info("Vous êtes déconnecté 😃");
    navigate("/connexion");
  };

  return (
    <nav className="navbar navbar-light navbar-glass navbar-top navbar-expand">
      <button
        className="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarVerticalCollapse"
        aria-controls="navbarVerticalCollapse"
        aria-expanded="false"
        aria-label="Toggle Navigation"
      >
        <span className="navbar-toggle-icon">
          <span className="toggle-line"></span>
        </span>
      </button>
      <Link className="navbar-brand me-1 me-sm-3" to="/">
        <div className="d-flex align-items-center">
          <img className="me-2" src={logo} alt="" width="40" />
          <span className="font-sans-serif">RAR</span>
        </div>
      </Link>
      <ul className="navbar-nav align-items-center d-none d-lg-block">
        <AppSearchBox />
      </ul>
      <ul className="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
        <AppThemeToggle config={config} handleThemeToggle={handleThemeToggle} />
        <AppNotification />
        <AppProfile handleLogout={handleLogout} />
      </ul>
    </nav>
  );
};

export default AppHeader;
