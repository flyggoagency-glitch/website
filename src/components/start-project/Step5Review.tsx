import React from 'react';
import { useFormContext } from "react-hook-form";
import { StartProjectFormData } from '@/lib/schemas/startProjectSchema';
import { motion } from 'framer-motion';
import { SummaryCard } from '../ui/SummaryCard';

interface Step5Props {
  setStep: (step: number) => void;
}

export const Step5Review = ({ setStep }: Step5Props) => {
  const { getValues } = useFormContext<StartProjectFormData>();
  const values = getValues();
  
  const getPersonalizedMessage = () => {
    switch (values.businessSize) {
      case "Startup": return "Perfect! We love helping startups build and launch faster.";
      case "MSME": return "We'll recommend scalable solutions designed for growing businesses.";
      case "Large Enterprise": return "Our enterprise team specializes in secure, scalable digital solutions.";
      case "MNC": return "We are ready to build robust, global-scale digital infrastructure for your corporation.";
      default: return "We're excited to learn more about your business.";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-4xl mx-auto flex flex-col gap-8 pb-12"
    >
      <div className="text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold font-['Urbanist'] text-white mb-3">Review & Submit</h2>
        <p className="text-white/60 font-['Inter']">Please review your project request before submitting.</p>
        <p className="text-[#A068FF] font-medium mt-2">{getPersonalizedMessage()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCard title="Business Profile" onEdit={() => setStep(1)}>
          <p><span className="text-white/50">Size:</span> {values.businessSize}</p>
        </SummaryCard>

        <SummaryCard title="Business Details" onEdit={() => setStep(2)}>
          <p><span className="text-white/50">Name:</span> {values.businessName}</p>
          <p><span className="text-white/50">Location:</span> {values.country} {values.state ? `, ${values.state}` : ''}</p>
        </SummaryCard>

        <SummaryCard title="Services Selected" onEdit={() => setStep(3)}>
          <ul className="list-disc pl-4 space-y-1">
            {values.services.map(s => (
              <li key={s}>{s === "Other" && values.otherService ? `Other: ${values.otherService}` : s}</li>
            ))}
          </ul>
        </SummaryCard>

        <SummaryCard title="Contact Information" onEdit={() => setStep(4)}>
          <p><span className="text-white/50">Email:</span> {values.email}</p>
          <p><span className="text-white/50">Phone:</span> {values.phone}</p>
        </SummaryCard>
      </div>

      <div className="bg-[#A068FF]/5 border border-[#A068FF]/20 rounded-2xl p-6 mt-4">
        <h4 className="font-['Urbanist'] text-lg font-bold text-white mb-4">What happens next?</h4>
        <ul className="space-y-3 font-['Inter'] text-sm text-white/80">
          <li className="flex items-center gap-3"><span className="text-[#A068FF]">✔</span> Project request received instantly</li>
          <li className="flex items-center gap-3"><span className="text-[#A068FF]">✔</span> Initial review by our team</li>
          <li className="flex items-center gap-3"><span className="text-[#A068FF]">✔</span> Consultation within <strong>24–48 business hours</strong></li>
          <li className="flex items-center gap-3"><span className="text-[#A068FF]">✔</span> Proposal and technical discussion</li>
        </ul>
      </div>

    </motion.div>
  );
};
