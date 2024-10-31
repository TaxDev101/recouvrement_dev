import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import AppTooltip from "./AppTooltip.jsx";

const AppThemeToggle = ({ config, handleThemeToggle }) => {
  return (
    <li className="nav-item">
      <div className="theme-control-toggle px-2">
        <input
          className="form-check-input ms-0"
          id="themeControlToggle"
          type="checkbox"
          value="dark"
          checked={config.theme === "dark"}
          onChange={handleThemeToggle}
          style={{ display: "none" }}
        />
        <AppTooltip
          text={
            config.theme === "dark"
              ? "Passer au Thème Clair"
              : "Passer au Thème Sombre"
          }
          position="left"
        >
          <label
            className="theme-control-toggle-label"
            htmlFor="themeControlToggle"
          >
            <FontAwesomeIcon icon={config.theme === "dark" ? faSun : faMoon} />
          </label>
        </AppTooltip>
      </div>
    </li>
  );
};

export default AppThemeToggle;
