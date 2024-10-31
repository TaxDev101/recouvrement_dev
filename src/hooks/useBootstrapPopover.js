import { useEffect } from "react";

const useBootstrapPopover = () => {
  useEffect(() => {
    // Initialiser les popovers Bootstrap
    const popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    );
    const popoverList = popoverTriggerList.map((popoverTriggerEl) => {
      return new window.bootstrap.Popover(popoverTriggerEl);
    });

    // Nettoyer les popovers à la destruction du composant
    return () => {
      popoverList.forEach((popover) => {
        popover.dispose();
      });
    };
  }, []);
};

export default useBootstrapPopover;
