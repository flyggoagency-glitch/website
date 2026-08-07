"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startProjectSchema, StartProjectFormData, defaultFormValues } from '@/lib/schemas/startProjectSchema';
import { useFormPersist } from '@/hooks/useFormPersist';
import { useBeforeUnload } from '@/hooks/useBeforeUnload';
import { motion, AnimatePresence } from 'framer-motion';

import { StepIndicator } from '@/components/start-project/StepIndicator';
import { Step1BusinessProfile } from '@/components/start-project/Step1BusinessProfile';
import { Step2BusinessInfo } from '@/components/start-project/Step2BusinessInfo';
import { Step3Services } from '@/components/start-project/Step3Services';
import { Step4Contact } from '@/components/start-project/Step4Contact';
import { Step5Review } from '@/components/start-project/Step5Review';
import { SuccessScreen } from '@/components/start-project/SuccessScreen';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { VideoBackground } from '@/components/start-project/VideoBackground';
const TOTAL_STEPS = 5;

export default function StartProjectPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const methods = useForm<StartProjectFormData>({
    resolver: zodResolver(startProjectSchema),
    defaultValues: defaultFormValues,
    mode: "onChange"
  });

  const { clearPersist } = useFormPersist("flyggo-start-project", methods);
  
  // Warn before leaving if form is dirty and not successful
  useBeforeUnload(methods.formState.isDirty && !isSuccess);

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["businessSize"];
    if (step === 2) fieldsToValidate = ["country", "state", "businessName"];
    if (step === 3) fieldsToValidate = ["services", "otherService"];
    if (step === 4) fieldsToValidate = ["email", "phone"];

    const isValid = await methods.trigger(fieldsToValidate as any);
    if (isValid) {
      setStep(s => Math.min(s + 1, TOTAL_STEPS));
    }
  };

  const handleBack = () => {
    setStep(s => Math.max(s - 1, 1));
  };

  const [generatedId, setGeneratedId] = useState('');

  const onSubmit = async (data: StartProjectFormData) => {
    if (step !== TOTAL_STEPS) {
      handleNext();
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { doc, setDoc, serverTimestamp } = await import('firebase/firestore/lite');
      const { db } = await import('@/lib/firebase');
      
      // 1. Generate Custom ID
      const randomNum = Math.floor(10000 + Math.random() * 90000); // 5 digits
      const projectId = `FLYGGO-${randomNum}`;
      setGeneratedId(projectId);
      
      // 2. Save to Firestore with the custom ID
      await setDoc(doc(db, 'start_projects', projectId), {
        ...data,
        projectId,
        submittedAt: serverTimestamp(),
        status: 'new'
      });
      
      setIsSuccess(true);
      clearPersist();
      setStep(6); // Success screen
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard navigation (Enter to next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger on textareas or when submitting
      if (e.key === 'Enter' && step < 5 && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, methods]);

  return (
    <div className="min-h-screen bg-[#03010b] flex flex-col font-['Inter'] relative overflow-hidden">
      {/* Looping Video Background */}
      <VideoBackground />

      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-[64px] py-6 max-w-[1920px] w-full mx-auto relative z-50">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-white font-['Urbanist'] text-3xl tracking-tight">Flyggo</span>
        </Link>
        <Link href="/" className="text-white/60 hover:text-white transition-colors text-sm font-medium">
          Cancel & Return
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full max-w-[1920px] mx-auto px-6 md:px-[64px] pb-24 relative z-10">
        
        {step <= TOTAL_STEPS && (
          <div className="w-full mt-4 sm:mt-8">
            <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />
          </div>
        )}

        <div className="w-full flex-1 flex flex-col mt-4 sm:mt-8">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full flex flex-col flex-1 h-full">
              
              <AnimatePresence mode="wait">
                {step === 1 && <Step1BusinessProfile key="step1" />}
                {step === 2 && <Step2BusinessInfo key="step2" />}
                {step === 3 && <Step3Services key="step3" />}
                {step === 4 && <Step4Contact key="step4" />}
                {step === 5 && <Step5Review key="step5" setStep={setStep} />}
                {step === 6 && (
                  <SuccessScreen 
                    onReset={() => {
                      setStep(1);
                      setIsSuccess(false);
                      setGeneratedId('');
                      methods.reset(defaultFormValues);
                      clearPersist();
                    }}
                    projectId={generatedId}
                  />
                )}
              </AnimatePresence>

              {/* Bottom Navigation */}
              {step <= TOTAL_STEPS && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-12 sm:mt-auto pt-8 border-t border-white/10 w-full max-w-4xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between gap-4"
                >
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium transition-all text-center ${
                      step === 1 ? 'opacity-0 pointer-events-none' : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                    }`}
                  >
                    Back
                  </button>

                  {step < TOTAL_STEPS ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-[#A068FF] text-white font-bold tracking-wide hover:bg-[#8A52E6] transition-colors shadow-[0_0_20px_rgba(160,104,255,0.3)] hover:shadow-[0_0_30px_rgba(160,104,255,0.5)]"
                    >
                      Next Step
                    </button>
                  ) : (
                    <div className="w-full sm:w-[280px]">
                      <SubmitButton isSubmitting={isSubmitting} isSuccess={isSuccess} />
                    </div>
                  )}
                </motion.div>
              )}
            </form>
          </FormProvider>
        </div>
      </main>
    </div>
  );
}
