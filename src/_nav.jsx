import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBalanceScale,
  faChartPie,
  faExchangeAlt,
  faFileInvoiceDollar,
  faFileSignature,
  faGavel,
  faTasks,
  faThLarge,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

const _nav = [
  // NavLink pour l'administrateur
  {
    name: "Tableau de Bord",
    to: "/admin/tableau-de-bord",
    icon: <FontAwesomeIcon icon={faChartPie} />,
    roles: ["ROLE_ADMIN"],
  },
  // NavLink pour l'agent centrale
  {
    name: "Tableau de Bord",
    to: "/agent/tableau-de-bord",
    icon: <FontAwesomeIcon icon={faChartPie} />,
    roles: ["ROLE_AGENT"],
  },
  // Titre
  {
    title: "App",
    roles: ["ROLE_ADMIN", "ROLE_USER", "ROLE_AGENT"],
  },
  // NavLink pour l'agent centrale
  {
    name: "Restes à Recouvrer",
    to: "#rar",
    icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
    roles: ["ROLE_AGENT"],
    submenu: [
      {
        name: "État des saisies par UO",
        to: "/agent/saisie-par-unite",
      },
      {
        name: "RAR Notifié ou Non par TP",
        to: "/agent/rar-notifie-par-tp",
      },
    ],
  },
  {
    name: "Nouvelle Créance",
    to: "#creance",
    icon: <FontAwesomeIcon icon={faFileSignature} />,
    roles: ["ROLE_AGENT"],
    submenu: [
      {
        name: "Consultation par Période",
        to: "/agent/consultation-par-periode",
      },
      {
        name: "Taux de Recouvrement",
        to: "/agent/taux-recouvrement",
      },
    ],
  },

  {
    name: "Actions",
    to: "#action",
    icon: <FontAwesomeIcon icon={faTasks} />,
    roles: ["ROLE_AGENT"],
    submenu: [
      {
        name: "Actions Entreprises",
        to: "/agent/action-entreprise",
      },
      {
        name: "Recouvrement par Action",
        to: "/agent/recouvrement-par-action",
      },
      {
        name: "Historique des Actions",
        to: "/agent/historique-action",
      },
    ],
  },

  {
    name: "Apurement",
    to: "#apurement",
    icon: <FontAwesomeIcon icon={faGavel} />,
    roles: ["ROLE_AGENT"],
    submenu: [
      {
        name: "Suivie des apurements",
        to: "/agent/suvie-apurement",
      },
      {
        name: "Taux d'Apurement",
        to: "/agent/taux-apurement",
      },
      {
        name: "RAR par Âge",
        to: "/agent/rar-par-age",
      },
    ],
  },

  {
    name: "Contentieux",
    to: "#contentieux",
    icon: <FontAwesomeIcon icon={faBalanceScale} />,
    roles: ["ROLE_AGENT"],
    submenu: [
      {
        name: "RAR Contentieux",
        to: "/agent/rar-contentieux",
      },
      {
        name: "RAR Objet de Procédure d'Opposition",
        to: "/agent/rar-objet-procedure-oppostion",
      },
    ],
  },

  {
    name: "Segement",
    to: "#segement",
    icon: <FontAwesomeIcon icon={faThLarge} />,
    roles: ["ROLE_AGENT"],
    submenu: [
      {
        name: "Secteur d'Activité",
        to: "/agent/secteur-activite",
      },
      {
        name: "Nature d'Impôt",
        to: "/agent/nature-impot",
      },
      {
        name: "Recouvrabilité",
        to: "/agent/recouvrabilite",
      },
    ],
  },

  {
    name: "Transfert des Dossiers",
    to: "#transfert",
    icon: <FontAwesomeIcon icon={faExchangeAlt} />,
    roles: ["ROLE_AGENT"],
    submenu: [
      {
        name: "Suivi des Transferts",
        to: "/agent/suivi-transfert",
      },
      {
        name: "Acte d'Imposition",
        to: "/agent/acte-imposition-non-prise-en-charge",
      },
    ],
  },

  // NavLink pour l'administrateur
  {
    name: "Utilisateurs",
    to: "#rar",
    icon: <FontAwesomeIcon icon={faUserGroup} />,
    roles: ["ROLE_ADMIN"],
    submenu: [
      {
        name: "Liste des utilisateurs",
        to: "/admin/liste-des-utilisateurs",
      },
    ],
  },
];

export default _nav;
