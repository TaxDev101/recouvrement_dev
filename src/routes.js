import React from "react";

const Dashboard = React.lazy(() => import("./pages/agent/Dashboard.jsx"));
const EtatDesSaisies = React.lazy(() =>
  import("./pages/agent/EtatDesSaisies.jsx")
);

const ListeDesUtilisateurs = React.lazy(() =>
  import("./pages/admin/ListeDesUtilisateurs.jsx")
);

const routes = [
  {
    path: "/",
    exact: true,
    name: "Home",
    element: Dashboard,
    roles: ["ROLE_ADMIN"],
  },
  {
    path: "/agent/tableau-de-bord",
    name: "Dashboard",
    element: Dashboard,
    roles: ["ROLE_AGENT"],
  },
  {
    path: "/agent/saisie-par-unite",
    name: "SaisieParUnite",
    element: EtatDesSaisies,
    roles: ["ROLE_AGENT"],
  },

  // Routes pour l'administrateur
  {
    path: "/admin/tableau-de-bord",
    name: "Dashboard",
    element: Dashboard,
    roles: ["ROLE_ADMIN"],
  },
  {
    path: "/admin/liste-des-utilisateurs",
    name: "ListeUtilisateur",
    element: ListeDesUtilisateurs,
    roles: ["ROLE_ADMIN"],
  },
];

export default routes;
