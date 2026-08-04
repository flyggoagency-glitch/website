import { useEffect } from "react";

export const useBeforeUnload = (shouldWarn: boolean, message = "You have unsaved changes. Are you sure you want to leave?") => {
  useEffect(() => {
    if (!shouldWarn) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [shouldWarn, message]);
};
