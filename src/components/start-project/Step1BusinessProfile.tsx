import React from 'react';
import { useFormContext } from "react-hook-form";
import { SelectableCard } from '../ui/SelectableCard';
import { StartProjectFormData } from '@/lib/schemas/startProjectSchema';
import { Rocket, Briefcase, Building2, Landmark, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Step1BusinessProfile = () => {
  const { watch, setValue, formState: { errors } } = useFormContext<StartProjectFormData>();
  const selectedSize = watch("businessSize");

  const options = [
    {
      id: "Startup",
      title: "Startup",
      desc: "Early-stage business focused on launching new ideas with strong growth potential.",
      icon: <Rocket size={24} />
    },
    {
      id: "Small Business",
      title: "Small Business",
      desc: "A growing business with a small team, serving local or regional customers.",
      icon: <Briefcase size={24} />
    },
    {
      id: "MSME",
      title: "MSME",
      desc: "Micro, Small, or Medium Enterprise looking to digitize operations or expand.",
      icon: <Building2 size={24} />
    },
    {
      id: "Large Enterprise",
      title: "Large Enterprise",
      desc: "An established organization with multiple departments and enterprise requirements.",
      icon: <Landmark size={24} />
    },
    {
      id: "MNC",
      title: "Multinational Corporation (MNC)",
      desc: "A global organization operating across multiple countries with complex infrastructure.",
      icon: <Globe2 size={24} />
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-4xl mx-auto flex flex-col gap-8"
    >
      <div className="text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold font-['Urbanist'] text-white mb-3">Tell us about your business</h2>
        <p className="text-white/60 font-['Inter']">Help us understand your organization so we can recommend the most suitable technology solution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt) => (
          <div key={opt.id} className={opt.id === "MNC" ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""}>
             <SelectableCard
                title={opt.title}
                description={opt.desc}
                icon={opt.icon}
                selected={selectedSize === opt.id}
                onClick={() => setValue("businessSize", opt.id, { shouldValidate: true })}
             />
          </div>
        ))}
      </div>

      {errors.businessSize && (
        <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg">{errors.businessSize.message}</p>
      )}
    </motion.div>
  );
};
