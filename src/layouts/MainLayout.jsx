import React from "react";

import {
  AppContent,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSetting,
} from "../components/index.js";
import { useConfig } from "../hooks/useConfig.js";

const MainLayout = () => {
  const { config } = useConfig();
  const isFluid = config.isFluid;

  return (
    <>
      <main className="main" id="top">
        <div className={isFluid ? "container-fluid" : "container"}>
          <AppSidebar />
          <div className="content">
            <AppHeader />
            <AppContent />
            <AppFooter />
          </div>
        </div>
      </main>
      <AppSetting />
    </>
  );
};

export default MainLayout;
