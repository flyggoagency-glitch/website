import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SubmitButton = ({ isSubmitting, isSuccess }: { isSubmitting: boolean, isSuccess: boolean }) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting || isSuccess}
      className="relative w-full overflow-hidden bg-white text-black font-semibold text-lg py-4 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.div
            key="submitting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            <span>Processing Request...</span>
          </motion.div>
        ) : isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-green-600"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span>Submitted</span>
          </motion.div>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="block"
          >
            Submit Project Request
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
