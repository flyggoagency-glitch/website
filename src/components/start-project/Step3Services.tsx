import React from 'react';
import { useFormContext } from "react-hook-form";
import { SelectableCard } from '../ui/SelectableCard';
import { StartProjectFormData } from '@/lib/schemas/startProjectSchema';
import { motion, AnimatePresence } from 'framer-motion';
import { SmoothInput } from '../SmoothInput';
import { Monitor, Smartphone, LayoutGrid, Cloud, ShieldCheck, PenTool, Database, Megaphone, Zap, Cpu, Settings, MoreHorizontal } from 'lucide-react';

export const Step3Services = () => {
  const { watch, setValue, register, formState: { errors } } = useFormContext<StartProjectFormData>();
  const selectedServices = watch("services") || [];
  const hasOther = selectedServices.includes("Other");

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setValue("services", selectedServices.filter(s => s !== service), { shouldValidate: true });
      if (service === "Other") {
        setValue("otherService", "");
      }
    } else {
      setValue("services", [...selectedServices, service], { shouldValidate: true });
    }
  };

  const options = [
    { id: "Website Development", title: "Website Development", desc: "Modern business and corporate websites.", icon: <Monitor size={24} /> },
    { id: "Mobile Application", title: "Mobile Application", desc: "Android & iOS native or cross-platform apps.", icon: <Smartphone size={24} /> },
    { id: "Web Application", title: "Web Application", desc: "Complex web-based portals and tools.", icon: <LayoutGrid size={24} /> },
    { id: "SaaS Platform", title: "SaaS Platform", desc: "Subscription-based cloud software.", icon: <Cloud size={24} /> },
    { id: "Custom Software", title: "Custom Software", desc: "Tailored solutions for unique workflows.", icon: <Settings size={24} /> },
    { id: "UI/UX Design", title: "UI/UX Design", desc: "User research, wireframing, and interface design.", icon: <PenTool size={24} /> },
    { id: "Cloud & Backend Development", title: "Cloud & Backend", desc: "Scalable server architectures and databases.", icon: <Database size={24} /> },
    { id: "API Development", title: "API Development", desc: "RESTful or GraphQL integrations.", icon: <Zap size={24} /> },
    { id: "AI Integration", title: "AI Integration", desc: "LLMs, computer vision, and automation.", icon: <Cpu size={24} /> },
    { id: "Digital Marketing", title: "Digital Marketing", desc: "Growth, PPC, and content strategies.", icon: <Megaphone size={24} /> },
    { id: "Complete End-to-End", title: "End-to-End Solution", desc: "Everything from design to deployment.", icon: <ShieldCheck size={24} /> },
    { id: "Other", title: "Other", desc: "Something else entirely.", icon: <MoreHorizontal size={24} /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-5xl mx-auto flex flex-col gap-8"
    >
      <div className="text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold font-['Urbanist'] text-white mb-3">What can Flyggo help you build?</h2>
        <p className="text-white/60 font-['Inter']">Select all the services you need. We'll tailor our approach based on this.</p>
      </div>

      {selectedServices.length === 0 ? (
        <div className="bg-[#A068FF]/5 border border-[#A068FF]/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4">
           <div className="w-16 h-16 rounded-full bg-[#A068FF]/10 flex items-center justify-center text-[#A068FF]">
             <LayoutGrid size={32} />
           </div>
           <p className="text-white/80 font-medium">Select one or more services to help us understand your project requirements.</p>
        </div>
      ) : (
        <div className="text-sm font-medium text-[#A068FF] bg-[#A068FF]/10 inline-block px-4 py-1.5 rounded-full w-max mx-auto sm:mx-0">
          {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((opt) => (
           <SelectableCard
              key={opt.id}
              title={opt.title}
              description={opt.desc}
              icon={opt.icon}
              selected={selectedServices.includes(opt.id)}
              onClick={() => toggleService(opt.id)}
              isMulti
           />
        ))}
      </div>

      <AnimatePresence>
        {hasOther && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-2 overflow-hidden mt-4"
          >
            <label className="text-sm font-medium text-white/80">Please specify</label>
            <SmoothInput 
              {...register("otherService")} 
              placeholder="Tell us what you have in mind..." 
              wrapperClassName="max-w-full"
            />
            {errors.otherService && <p className="text-red-400 text-sm mt-1">{errors.otherService.message}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {errors.services && (
        <p className="text-red-400 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg">{errors.services.message}</p>
      )}
    </motion.div>
  );
};
