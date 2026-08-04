import React from 'react';
import { useFormContext } from "react-hook-form";
import { StartProjectFormData } from '@/lib/schemas/startProjectSchema';
import { motion } from 'framer-motion';
import { FormSelect } from '../ui/FormSelect';
import { SmoothInput } from '../SmoothInput';
import { COUNTRIES, INDIAN_STATES } from '@/lib/constants';

export const Step2BusinessInfo = () => {
  const { register, watch, formState: { errors } } = useFormContext<StartProjectFormData>();
  const country = watch("country");
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-2xl mx-auto flex flex-col gap-8"
    >
      <div className="text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold font-['Urbanist'] text-white mb-3">Business Information</h2>
        <p className="text-white/60 font-['Inter']">Where are you located and what is your business called?</p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/80">Country</label>
          <FormSelect {...register("country")}>
            <option value="">Select a country</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </FormSelect>
          {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country.message}</p>}
        </div>

        {country === "India" && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-col gap-2 overflow-hidden"
          >
            <label className="text-sm font-medium text-white/80">State / Union Territory</label>
            <FormSelect {...register("state")}>
              <option value="">Select a state</option>
              {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </FormSelect>
            {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>}
          </motion.div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-white/80">Business Name</label>
          <SmoothInput 
            {...register("businessName")} 
            placeholder="Enter your company or business name" 
            wrapperClassName="max-w-full"
          />
          {errors.businessName && <p className="text-red-400 text-sm mt-1">{errors.businessName.message}</p>}
        </div>
      </div>
    </motion.div>
  );
};
