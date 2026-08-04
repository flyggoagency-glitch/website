import React from 'react';
import { useFormContext } from "react-hook-form";
import { StartProjectFormData } from '@/lib/schemas/startProjectSchema';
import { motion } from 'framer-motion';
import { SmoothInput } from '../SmoothInput';

export const Step4Contact = () => {
  const { register, formState: { errors } } = useFormContext<StartProjectFormData>();
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-2xl mx-auto flex flex-col gap-8"
    >
      <div className="text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold font-['Urbanist'] text-white mb-3">Contact Information</h2>
        <p className="text-white/60 font-['Inter']">How can we reach you to discuss your project?</p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/80">Email Address</label>
          <SmoothInput 
            {...register("email")} 
            type="email"
            placeholder="you@company.com" 
            wrapperClassName="max-w-full"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/80">Phone Number (with country code)</label>
          <SmoothInput 
            {...register("phone")} 
            type="text"
            placeholder="+1 (555) 000-0000" 
            wrapperClassName="max-w-full"
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
        </div>
      </div>
    </motion.div>
  );
};
