import React, { createContext, useState, useEffect } from "react";

export const ConfigContext = createContext();

const defaultConfig = {
  isNavbarVerticalCollapsed:
    JSON.parse(localStorage.getItem("isNavbarVerticalCollapsed")) || false,
  theme: localStorage.getItem("theme") || "light",
  isRTL: JSON.parse(localStorage.getItem("isRTL")) || false,
  isFluid: JSON.parse(localStorage.getItem("isFluid")) || false,
  navbarStyle: localStorage.getItem("navbarStyle") || "transparent",
  navbarPosition: localStorage.getItem("navbarPosition") || "vertical",
};

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", config.theme === "dark");

    // Sauvegarder la configuration dans localStorage à chaque changement
    localStorage.setItem("theme", config.theme);
    localStorage.setItem("isFluid", config.isFluid);
    localStorage.setItem("isRTL", config.isRTL);
    localStorage.setItem("navbarStyle", config.navbarStyle);
    localStorage.setItem("navbarPosition", config.navbarPosition);
  }, [config]); // Exécutez à chaque fois que config change

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};
