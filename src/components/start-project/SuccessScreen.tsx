import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SuccessScreenProps {
  onReset: () => void;
  projectId?: string;
}

export const SuccessScreen = ({ onReset, projectId }: SuccessScreenProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center gap-8 py-12 sm:py-20 px-4"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-500/10 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500 flex items-center justify-center text-white"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      </div>

      <div>
        <h1 className="text-3xl sm:text-5xl font-bold font-['Urbanist'] text-white mb-4">Project Request Submitted Successfully</h1>
        <p className="text-white/60 text-lg sm:text-xl font-['Inter'] leading-relaxed">
          Thank you for choosing Flyggo. Our team is reviewing your details and will be in touch shortly to discuss the next steps.
        </p>
      </div>

      {projectId && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full">
          <p className="text-white/50 text-sm mb-3 font-['Inter']">Please keep this tracking ID for future communication regarding your project.</p>
          <div className="font-mono text-xl sm:text-2xl font-bold text-[#A068FF] tracking-wider bg-[#060218] py-3 sm:py-4 rounded-xl border border-[#A068FF]/20 inline-block px-6 sm:px-10">
            {projectId}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-center mt-8 w-full">
        <Link href="/" className="px-10 py-4 bg-[#A068FF] hover:bg-[#8e54eb] text-white rounded-xl font-medium transition-colors shadow-[0_0_20px_rgba(160,104,255,0.3)] text-center w-full sm:w-auto">
          Return to Home
        </Link>
      </div>
    </motion.div>
  );
};
