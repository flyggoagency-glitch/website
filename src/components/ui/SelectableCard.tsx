import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SelectableCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  isMulti?: boolean;
}

export const SelectableCard = ({ title, description, selected, onClick, icon, isMulti = false }: SelectableCardProps) => {
  return (
    <div
      onClick={onClick}
      role={isMulti ? "checkbox" : "radio"}
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "relative flex flex-col p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden group text-left",
        selected 
          ? "bg-white/10 border-[#A068FF] shadow-[0_0_20px_rgba(160,104,255,0.2)]" 
          : "bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20"
      )}
    >
      {selected && (
        <motion.div 
           layoutId={isMulti ? undefined : "selected-glow"}
           className="absolute inset-0 bg-gradient-to-br from-[#A068FF]/10 to-transparent opacity-100 pointer-events-none"
        />
      )}
      
      <div className="relative z-10 flex items-start gap-4">
        {icon && (
          <div className={cn(
            "p-3 rounded-xl transition-colors shrink-0",
            selected ? "bg-[#A068FF]/20 text-[#A068FF]" : "bg-white/5 text-white/50 group-hover:text-white/80"
          )}>
            {icon}
          </div>
        )}
        <div className="pr-8">
          <h3 className={cn(
            "font-['Urbanist'] text-lg sm:text-xl font-bold mb-1 sm:mb-2 transition-colors",
            selected ? "text-white" : "text-white/80 group-hover:text-white"
          )}>
            {title}
          </h3>
          <p className="text-white/50 font-['Inter'] text-xs sm:text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      
      {/* Indicator */}
      <div className={cn(
        "absolute top-5 sm:top-6 right-5 sm:right-6 w-5 h-5 border-2 flex items-center justify-center transition-colors",
        isMulti ? "rounded-md" : "rounded-full"
      )}
           style={{ borderColor: selected ? '#A068FF' : 'rgba(255,255,255,0.2)' }}>
         {selected && (
           <motion.div initial={{scale:0}} animate={{scale:1}} className={cn("bg-[#A068FF]", isMulti ? "w-3 h-3 rounded-sm" : "w-2.5 h-2.5 rounded-full")} />
         )}
      </div>
    </div>
  );
};
