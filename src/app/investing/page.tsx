"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ClassicFooter } from '@/components/ClassicFooter';
import { ClassicNavbar } from '@/components/ClassicNavbar';

// FadeIn Component
const FadeIn = ({ children, delay = 0, duration = 1000, className = "" }: { children: React.ReactNode, delay?: number, duration?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default function InvestingPage() {
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [generatedId, setGeneratedId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');

      // Save to Firestore with standard auto-generated ID
      await addDoc(collection(db, 'investment_ideas'), {
        ...formData,
        submittedAt: serverTimestamp(),
        status: 'new'
      });
      setIsSuccess(true);
    } catch (err) {
      console.error("Error submitting idea:", err);
      setError("Something went wrong while submitting your idea. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060218] text-white flex flex-col font-['Inter'] relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FBE5B4] opacity-[0.03] blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#A068FF] opacity-[0.03] blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Navbar Wrapper */}
      <ClassicNavbar />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 w-full max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <FadeIn delay={200} className="mb-6">
              <span className="text-[#FBE5B4] font-semibold tracking-[0.2em] uppercase text-sm flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#FBE5B4]"></span>
                Venture Capital
              </span>
            </FadeIn>

            <FadeIn delay={400}>
              <h1 className="text-5xl md:text-7xl lg:text-[85px] text-white leading-[1.05] mb-8" style={{ fontFamily: '"Instrument Serif", serif', textShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                We are ready to <span className="italic text-[#FBE5B4]">invest</span> in ideas that really matter.
              </h1>
            </FadeIn>

            <FadeIn delay={600} className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-lg">
              <p>
                Have a groundbreaking idea? Pitch it to us. Submit your details, and if your vision aligns with our thesis, we will contact you to build the future together.
              </p>
            </FadeIn>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6 flex flex-col w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto">
            <FadeIn delay={800} className="w-full">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FBE5B4]/5 to-transparent opacity-50 pointer-events-none" />
                
                {isSuccess ? (
                  <div className="relative z-10 text-center py-12 flex flex-col items-center">
                    <div className="w-20 h-20 bg-[#FBE5B4]/20 text-[#FBE5B4] rounded-full flex items-center justify-center mb-6">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <h3 className="text-3xl font-['Instrument_Serif'] text-white mb-4">Idea Submitted Successfully!</h3>
                    <p className="text-white/70 font-light text-lg mb-6">
                      Thank you for sharing your vision with us. Our team will review your submission and contact you shortly.
                    </p>

                    <button 
                      onClick={() => {
                        setIsSuccess(false);
                        setGeneratedId('');
                        setFormData({ topic: '', description: '', email: '', phone: '' });
                      }}
                      className="mt-4 text-[#FBE5B4] hover:text-white transition-colors underline underline-offset-4 text-sm font-medium"
                    >
                      Submit another idea
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                    <div>
                      <label htmlFor="topic" className="block text-sm font-medium text-white/80 mb-2">Idea Topic</label>
                      <input 
                        type="text" 
                        id="topic"
                        name="topic"
                        required
                        value={formData.topic}
                        onChange={handleChange}
                        placeholder="e.g. Next-Gen FinTech Platform"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FBE5B4] focus:ring-1 focus:ring-[#FBE5B4] transition-all"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-2">Idea Description</label>
                      <textarea 
                        id="description"
                        name="description"
                        required
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Briefly describe your vision and what makes it unique..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FBE5B4] focus:ring-1 focus:ring-[#FBE5B4] transition-all resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@startup.com"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FBE5B4] focus:ring-1 focus:ring-[#FBE5B4] transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FBE5B4] focus:ring-1 focus:ring-[#FBE5B4] transition-all"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <div className="pt-4">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#FBE5B4] to-[#D4AF37] text-black px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          "Submit Idea"
                        )}
                      </button>
                      <p className="text-center text-white/40 text-xs mt-4">
                        By submitting, you agree to our confidentiality terms.
                      </p>
                    </div>
                  </form>
                )}
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
