import { useContext } from "react";
import { ConfigContext } from "../contexts/ConfigContext.jsx";

export const useConfig = () => {
  return useContext(ConfigContext);
};
