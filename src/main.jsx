import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider } from "./contexts/ConfigContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </AuthProvider>
  </StrictMode>
);
