"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';

export default function OurStoryPage() {
  const steps = [
    {
      title: "The Beginning",
      desc: "Flyggo began with a simple mission—to help businesses grow. What started as a small marketing agency soon evolved as we worked closely with clients and gained a deeper understanding of the challenges they faced in today's digital world."
    },
    {
      title: "The Evolution",
      desc: "As our team expanded, so did our expertise. We moved beyond marketing and began delivering websites, mobile applications, custom software, SaaS platforms, and complete technology solutions that empowered businesses to operate more efficiently and scale with confidence."
    },
    {
      title: "Where We Are Today",
      desc: "Today, Flyggo is proud to be a trusted technology partner for startups, MSMEs, and enterprises. Every project we take on is driven by innovation, collaboration, and a commitment to building solutions that create lasting business value."
    },
    {
      title: "The Future",
      desc: "Our journey continues with one goal at its core: helping businesses grow through technology. We are constantly exploring new frontiers to bring you the best digital backbone possible."
    }
  ];

  return (
    <div className="bg-[#03010b] font-['Inter'] relative min-h-screen flex flex-col overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="fixed inset-0 w-full h-full opacity-60 z-0 pointer-events-none"
        style={{
          background: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_111401_56af5012-2263-45d3-849a-8688084d7c2a.png&w=1280&q=85") center center / cover no-repeat',
        }}
      />
      <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-[#03010b]/50 via-[#03010b]/80 to-[#03010b] z-0 pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 md:px-[64px] py-6 max-w-[1920px] w-full mx-auto z-50">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-white font-['Urbanist'] text-3xl tracking-tight drop-shadow-md">Flyggo</span>
        </Link>
        <Link href="/" className="text-white/80 hover:text-white transition-colors text-sm font-medium drop-shadow-md bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20">
          Back to Home
        </Link>
      </header>

      <main className="relative z-10 w-full flex-grow text-white pt-40 pb-32">
        
        {/* Title Area */}
        <div className="grid content-start justify-items-center gap-6 text-center z-20 mb-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/90 font-['Urbanist'] text-xl font-bold tracking-widest uppercase mb-4 block drop-shadow-lg">
              How We Got Here
            </span>
            <h1 className="text-5xl sm:text-7xl font-black text-white font-['Urbanist'] tracking-tighter mb-4 drop-shadow-xl">
              Our Story
            </h1>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="w-full max-w-4xl mx-auto px-6 relative">
          
          {/* Vertical Line */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#A068FF] to-transparent transform md:-translate-x-1/2 rounded-full hidden sm:block opacity-50" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col md:flex-row gap-8 md:gap-16 relative ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline Dot */}
                <div className="hidden sm:flex absolute left-4 md:left-1/2 top-8 w-6 h-6 bg-[#03010b] border-4 border-[#A068FF] rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(160,104,255,0.5)]" />

                {/* Content Card */}
                <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] hover:border-[#A068FF]/30 transition-all shadow-xl flex flex-col gap-4 group">
                  <h3 className="text-2xl sm:text-3xl font-bold font-['Urbanist'] text-white group-hover:text-[#A068FF] transition-colors">{step.title}</h3>
                  <p className="text-white/70 text-lg leading-relaxed font-['Inter']">
                    {step.desc}
                  </p>
                </div>
                
                {/* Empty space for alternating layout */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-24 pb-8 flex justify-center"
          >
            <Link 
              href="/" 
              className="px-10 py-5 bg-[#A068FF] text-white hover:bg-[#b585ff] rounded-full font-bold font-['Urbanist'] tracking-wide transition-all shadow-[0_0_20px_rgba(160,104,255,0.4)] hover:shadow-[0_0_40px_rgba(160,104,255,0.8)] hover:scale-105 flex items-center gap-3 text-lg"
            >
              Start Your Journey
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </motion.div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
