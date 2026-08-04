import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

export const useFormPersist = (
  name: string,
  { watch, setValue }: UseFormReturn<any>
) => {
  useEffect(() => {
    const saved = localStorage.getItem(name);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        Object.keys(parsed).forEach((key) => {
          setValue(key, parsed[key]);
        });
      } catch (e) {
        console.error("Failed to parse form persist data", e);
      }
    }
  }, [name, setValue]);

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem(name, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch, name]);
  
  const clearPersist = () => {
    localStorage.removeItem(name);
  }
  
  return { clearPersist };
};
