import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { Suspense, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/theme.css";
import AppSpinner from "./components/AppSpinner.jsx";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import Login from "./pages/auth/Login.jsx";
import AuthApi from "./services/auth/AuthApi.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppPrivateRoute from "./components/AppPrivateRoute.jsx";

const MainLayout = React.lazy(() => import("./layouts/MainLayout.jsx"));
AuthApi.setup();

function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);
  return (
    <>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<AppSpinner />}>
            <Routes>
              <Route path="/connexion" name="Login" element={<Login />} />
              <Route
                path="*"
                name="Home"
                element={
                  <AppPrivateRoute>
                    <MainLayout />
                  </AppPrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
