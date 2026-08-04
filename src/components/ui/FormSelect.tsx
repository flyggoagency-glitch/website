import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export const FormSelect = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(({ className, children, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <select
        ref={ref}
        className={cn(
          "w-full bg-white/5 border border-white/10 rounded-xl p-4 appearance-none text-white font-['Inter'] outline-none transition-all duration-300",
          "focus:border-[#A068FF]/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(160,104,255,0.2)]",
          "hover:border-white/20 [&>option]:text-black [&>option]:bg-white",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
        <ChevronDown size={20} />
      </div>
    </div>
  );
});
FormSelect.displayName = "FormSelect";
