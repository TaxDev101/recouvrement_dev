// AppContent.jsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import routes from "../routes";
import AppPrivatesRoutes from "./AppPrivatesRoutes.jsx";

const AppContent = () => {
  return (
    <Routes>
      {routes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            <AppPrivatesRoutes element={route.element} roles={route.roles} />
          }
        />
      ))}
    </Routes>
  );
};

export default AppContent;
