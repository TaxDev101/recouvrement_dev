// Récupérer un élément du store (localStorage par défaut)
export const getItemFromStore = (key, defaultValue, store = localStorage) => {
  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch (error) {
    return store.getItem(key) || defaultValue;
  }
};

// Définir un élément dans le store (localStorage par défaut)
export const setItemToStore = (key, payload, store = localStorage) => {
  return store.setItem(key, JSON.stringify(payload)); // On JSON.stringify pour s'assurer que c'est au bon format
};

// Fonction pour obtenir une couleur CSS
const getColor = (name, dom = document.documentElement) => {
  return getComputedStyle(dom).getPropertyValue(`--falcon-${name}`).trim();
};

// Fonction pour obtenir une palette de couleurs
const getColors = (dom) => ({
  primary: getColor("primary", dom),
  secondary: getColor("secondary", dom),
  success: getColor("success", dom),
  info: getColor("info", dom),
  warning: getColor("warning", dom),
  danger: getColor("danger", dom),
  light: getColor("light", dom),
  dark: getColor("dark", dom),
});

// Fonction pour obtenir une palette de couleurs douces
const getSoftColors = (dom) => ({
  primary: getColor("soft-primary", dom),
  secondary: getColor("soft-secondary", dom),
  success: getColor("soft-success", dom),
  info: getColor("soft-info", dom),
  warning: getColor("soft-warning", dom),
  danger: getColor("soft-danger", dom),
  light: getColor("soft-light", dom),
  dark: getColor("soft-dark", dom),
});

// Fonction pour obtenir les nuances de gris
const getGrays = (dom) => ({
  white: getColor("white", dom),
  100: getColor("100", dom),
  200: getColor("200", dom),
  300: getColor("300", dom),
  400: getColor("400", dom),
  500: getColor("500", dom),
  600: getColor("600", dom),
  700: getColor("700", dom),
  800: getColor("800", dom),
  900: getColor("900", dom),
  1000: getColor("1000", dom),
  1100: getColor("1100", dom),
  black: getColor("black", dom),
});

// Fonction pour vérifier si un élément a une classe
const hasClass = (el, className) => {
  if (!el) return false; // Vérification pour éviter une erreur
  return el.classList.contains(className);
};

// Fonction pour ajouter une classe à un élément
const addClass = (el, className) => {
  el.classList.add(className);
};

// Fonction pour obtenir le décalage d'un élément
const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
};

// Fonction pour vérifier si un élément est visible dans la vue
const isScrolledIntoView = (el) => {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
  return vertInView && horInView;
};

// Breakpoints pour la réactivité
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540,
};

// Fonction pour obtenir le breakpoint d'un élément
const getBreakpoint = (el) => {
  const classes = el && el.classList.value;
  let breakpoint;

  if (classes) {
    breakpoint =
      breakpoints[
        classes
          .split(" ")
          .filter((cls) => cls.includes("navbar-expand-"))
          .pop()
          .split("-")
          .pop()
      ];
  }

  return breakpoint;
};

// Fonction pour obtenir la position d'un élément
const getPosition = (pos, params, dom, rect, size) => {
  return {
    top: pos[1] - size.contentSize[1] - 10,
    left: pos[0] - size.contentSize[0] / 2,
  };
};

const themeColors = {
  primary: "#2c7be5",
  secondary: "#748194",
  success: "#00d27a",
  info: "#27bcfd",
  warning: "#f5803e",
  danger: "#e63757",
  light: "#f9fafd",
  dark: "#0b1727",
};

const numberFormatter = (number, fixed = 2) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(number)) >= 1.0e9
    ? (Math.abs(Number(number)) / 1.0e9).toFixed(fixed) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(number)) >= 1.0e6
    ? (Math.abs(Number(number)) / 1.0e6).toFixed(fixed) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(number)) >= 1.0e3
    ? (Math.abs(Number(number)) / 1.0e3).toFixed(fixed) + "K"
    : Math.abs(Number(number)).toFixed(fixed);
};

const hexToRgb = (hexValue) => {
  let hex = hexValue.startsWith("#") ? hexValue.substring(1) : hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    })
  );

  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

const rgbaColor = (color = "#fff", alpha = 0.5) => {
  const rgb = hexToRgb(color);
  return rgb ? `rgba(${rgb.join(", ")}, ${alpha})` : null;
};

// Exporter toutes les fonctions pour une utilisation dans d'autres composants
export {
  getColor,
  getColors,
  getSoftColors,
  getGrays,
  hasClass,
  addClass,
  getOffset,
  isScrolledIntoView,
  getBreakpoint,
  getPosition,
  themeColors,
  numberFormatter,
  hexToRgb,
  rgbaColor,
};
