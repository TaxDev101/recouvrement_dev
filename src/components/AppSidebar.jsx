import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useConfig } from "../hooks/useConfig.js";
import logo from "../assets/brand/logo-dgi2.png";
import navItems from "../_nav.jsx";
import AppSidebarNav from "./AppSidebarNav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import AppTooltip from "./AppTooltip.jsx";

const AppSidebar = () => {
  const { config, setConfig } = useConfig();
  let classname = "";
  const navstyle = config.navbarStyle;

  if (navstyle === "card") {
    classname += "navbar-card";
  } else if (navstyle === "vibrant") {
    classname += "navbar-vibrant";
  } else if (navstyle === "inverted") {
    classname += "navbar-inverted";
  } else {
    classname += "navbar-transparent";
  }

  // Function pour fermer le navbar
  const closeNavbar = () => {
    const navbar = document.getElementById("navbarVerticalCollapse");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const navbar = document.getElementById("navbarVerticalCollapse");
      const toggleButton = document.querySelector(".navbar-toggler");
      if (
        navbar &&
        !navbar.contains(event.target) &&
        !toggleButton.contains(event.target)
      ) {
        closeNavbar();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleToggleClick = () => {
    const newState = !config.isNavbarVerticalCollapsed;
    setConfig((prevConfig) => ({
      ...prevConfig,
      isNavbarVerticalCollapsed: newState,
    }));
    localStorage.setItem("isNavbarVerticalCollapsed", JSON.stringify(newState));
  };
  // Fonction pour gérer la navigation verticale
  useEffect(() => {
    const Selector = {
      HTML: "html",
      NAVBAR_VERTICAL_TOGGLE: ".navbar-vertical-toggle",
      NAVBAR_VERTICAL_COLLAPSE: ".navbar-vertical .navbar-collapse",
    };
    const ClassNames = {
      NAVBAR_VERTICAL_COLLAPSED: "navbar-vertical-collapsed",
      NAVBAR_VERTICAL_COLLAPSED_HOVER: "navbar-vertical-collapsed-hover",
    };

    const navbarVerticalToggle = document.querySelector(
      Selector.NAVBAR_VERTICAL_TOGGLE
    );
    const navbarVerticalCollapse = document.querySelector(
      Selector.NAVBAR_VERTICAL_COLLAPSE
    );

    const toggleClickHandler = (e) => {
      handleToggleClick(); // Appeler la fonction ici pour basculer
      e.currentTarget.blur(); // Retirer le focus
    };

    const handleMouseOver = () => {
      if (
        document.documentElement.classList.contains(
          ClassNames.NAVBAR_VERTICAL_COLLAPSED
        )
      ) {
        document.documentElement.classList.add(
          ClassNames.NAVBAR_VERTICAL_COLLAPSED_HOVER
        );
      }
    };

    const handleMouseLeave = () => {
      document.documentElement.classList.remove(
        ClassNames.NAVBAR_VERTICAL_COLLAPSED_HOVER
      );
    };

    // Ajout des écouteurs d'événements
    if (navbarVerticalToggle) {
      navbarVerticalToggle.addEventListener("click", toggleClickHandler);
    }

    if (navbarVerticalCollapse) {
      navbarVerticalCollapse.addEventListener("mouseover", handleMouseOver);
      navbarVerticalCollapse.addEventListener("mouseleave", handleMouseLeave);
    }

    // Appliquer l'état à la classe HTML lors du chargement
    document.documentElement.classList.toggle(
      ClassNames.NAVBAR_VERTICAL_COLLAPSED,
      config.isNavbarVerticalCollapsed
    );

    // Nettoyer les événements lors du démontage
    return () => {
      if (navbarVerticalToggle) {
        navbarVerticalToggle.removeEventListener("click", toggleClickHandler);
      }
      if (navbarVerticalCollapse) {
        navbarVerticalCollapse.removeEventListener(
          "mouseover",
          handleMouseOver
        );
        navbarVerticalCollapse.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      }
    };
  }, [config.isNavbarVerticalCollapsed]);

  const myButton = (
    <button className="btn navbar-toggler-humburger-icon navbar-vertical-toggle">
      <span className="navbar-toggle-icon">
        <span className="toggle-line"></span>
      </span>
    </button>
  );

  return (
    <nav
      className={`navbar navbar-light navbar-vertical navbar-expand-xl ${
        config.isNavbarVerticalCollapsed ? "collapsed" : ""
      } ${classname}`}
    >
      <div className="d-flex align-items-center">
        <div className="toggle-icon-wrapper">
          <AppTooltip text={"Basculer la navigation"} position="right">
            {myButton}
          </AppTooltip>
        </div>
        <Link className="navbar-brand" to="/">
          <div className="d-flex align-items-center py-3">
            <img className="me-2 logo-brand" src={logo} alt="logo" width="40" />
            <span className="font-sans-serif">RAR</span>
          </div>
        </Link>
      </div>
      <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
        <div className="navbar-vertical-content scrollbar">
          <AppSidebarNav navItems={navItems} handleCloseNavBar={closeNavbar} />
        </div>
      </div>
    </nav>
  );
};

export default AppSidebar;
