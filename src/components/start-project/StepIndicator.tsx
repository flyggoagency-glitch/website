import React from "react";
import { motion } from "framer-motion";

export const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="w-full flex items-center justify-between mb-12 max-w-3xl mx-auto px-4">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-[#A068FF] text-white shadow-[0_0_15px_rgba(160,104,255,0.4)]"
                  : isCompleted
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/30 border border-white/10"
              }`}
            >
              {isCompleted ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                stepNum
              )}
            </div>
            {index < totalSteps - 1 && (
              <div className="flex-1 h-[2px] mx-2 sm:mx-4 rounded-full overflow-hidden bg-white/10 relative">
                 <motion.div 
                    initial={false}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute top-0 left-0 h-full bg-[#A068FF]"
                 />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
