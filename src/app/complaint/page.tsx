"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { ClassicFooter } from '@/components/ClassicFooter';

export default function ComplaintPage() {
  const [formData, setFormData] = useState({
    name: '',
    customerType: '',
    problem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'complaints'), {
        ...formData,
        submittedAt: serverTimestamp(),
        status: 'pending' // 'pending', 'resolved', etc.
      });
      setIsSuccess(true);
    } catch (err) {
      console.error("Error submitting complaint:", err);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060218] text-white flex flex-col font-['Inter'] relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-600 opacity-[0.03] blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-orange-500 opacity-[0.03] blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Navbar Wrapper */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 pt-6 max-w-[1920px] mx-auto w-full">
        <nav className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-6 py-4 flex items-center justify-between">
          <Link href="/flyggo-classic" className="text-2xl font-semibold tracking-tight text-white flex items-center gap-1 hover:opacity-80 transition-opacity">
            Flyggo<sup className="text-xs font-normal">®</sup>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/flyggo-classic" className="text-gray-300 hover:text-gray-100 transition-colors">Home</Link>
            <Link href="/about-classic" className="text-gray-300 hover:text-gray-100 transition-colors">About Classic</Link>
            <Link href="/investing" className="text-gray-300 hover:text-gray-100 transition-colors">Investing</Link>
            <Link href="/offers" className="text-gray-300 hover:text-gray-100 transition-colors">Offers</Link>
            <Link href="/complaint" className="text-white font-medium">Complaint/Service</Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 w-full max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <FadeIn delay={200} className="mb-6">
              <span className="text-red-500 font-semibold tracking-[0.2em] uppercase text-sm flex items-center gap-4">
                <span className="w-8 h-[1px] bg-red-500"></span>
                Urgent Priority
              </span>
            </FadeIn>

            <FadeIn delay={400}>
              <h1 className="text-5xl md:text-7xl lg:text-[85px] text-white leading-[1.05] mb-8 font-['Instrument_Serif']" style={{ textShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                <span className="italic text-red-500">0 Tolerance</span> against client dissatisfaction.
              </h1>
            </FadeIn>

            <FadeIn delay={600} className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-lg border-l-4 border-red-500/50 pl-6 py-2">
              <p>
                Book an immediate complaint. Our team will contact you <strong className="text-white">within 30 minutes</strong>, and action will be taken immediately.
              </p>
            </FadeIn>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6 flex flex-col w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">
            <FadeIn delay={800} className="w-full">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-50 pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative z-10 text-center py-12 flex flex-col items-center"
                    >
                      <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-6">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <h3 className="text-3xl font-['Instrument_Serif'] text-white mb-4">Complaint Logged!</h3>
                      <p className="text-white/70 font-light text-lg mb-6">
                        Our priority response team has been alerted. We will call you within 30 minutes.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-6 relative z-10"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">File a Report</h3>
                        <p className="text-white/50 text-sm">We take your concerns seriously. Please tell us what went wrong.</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Your Name</label>
                          <input 
                            type="text" 
                            required 
                            value={formData.name} 
                            onChange={e => setFormData({...formData, name: e.target.value})} 
                            placeholder="John Doe" 
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500 focus:bg-black/60 transition-all" 
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Customer Status</label>
                          <select 
                            required 
                            value={formData.customerType} 
                            onChange={e => setFormData({...formData, customerType: e.target.value})} 
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-500 focus:bg-black/60 transition-all appearance-none"
                          >
                            <option value="" disabled>Select your status</option>
                            <option value="New Customer">New Customer</option>
                            <option value="Existing Customer">Existing Customer</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Describe the Problem</label>
                          <textarea 
                            required 
                            value={formData.problem} 
                            onChange={e => setFormData({...formData, problem: e.target.value})} 
                            placeholder="Please explain the issue shortly..." 
                            rows={4}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500 focus:bg-black/60 transition-all resize-none" 
                          />
                        </div>
                      </div>

                      {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                      )}

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-lg py-4 rounded-xl transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                      >
                        {isSubmitting ? 'Submitting...' : 'Alert Support Team Now'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </FadeIn>
          </div>
        </div>
      </main>

      {/* Footer */}
      <ClassicFooter />
    </div>
  );
}
