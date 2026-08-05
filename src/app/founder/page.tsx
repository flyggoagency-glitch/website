"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Footer } from '@/components/Footer';

export default function FounderPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white flex flex-col font-['Inter'] relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* --- Advanced AI-like Background --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[30%] -right-[10%] w-[70vw] h-[70vw] bg-gradient-to-b from-cyan-500/10 to-transparent rounded-full blur-[120px] mix-blend-screen" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[20%] w-[60vw] h-[60vw] bg-gradient-to-t from-emerald-500/10 to-[#A068FF]/10 rounded-full blur-[150px] mix-blend-screen" 
        />
      </div>

      {/* --- Navbar Wrapper --- */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-50 px-6 md:px-12 lg:px-16 pt-6 max-w-[1920px] mx-auto w-full"
      >
        <nav className="bg-black/50 backdrop-blur-2xl border border-white/5 rounded-2xl px-6 py-4 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-1 hover:opacity-80 transition-opacity">
            Flyggo<sup className="text-xs font-normal text-white/50">®</sup>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/flyggo-classic" className="hover:text-white transition-colors">Flyggo Classic</Link>
          </div>
        </nav>
      </motion.div>

      <main className="relative z-10 flex-1 flex flex-col px-6 md:px-16 lg:px-24 w-full max-w-[1600px] mx-auto pb-32">
        
        {/* --- Hero Section --- */}
        <div className="pt-24 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image with 3D Float */}
          <motion.div 
            style={{ y: y1 }}
            className="lg:col-span-5 relative group perspective-[1000px]"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] border border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_120px_rgba(6,182,212,0.2)] transition-shadow duration-700 bg-black"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 z-10" />
              <Image 
                src="/images/founder.jpeg" 
                alt="Nikesh S - Founder & CEO, Flyggo" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                priority
              />
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="overflow-hidden">
                  <motion.h1 
                    initial={{ y: 50 }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-5xl lg:text-6xl font-['Instrument_Serif'] text-white mb-2 tracking-tight"
                  >
                    Nikesh S
                  </motion.h1>
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                  <p className="text-cyan-400 font-medium tracking-[0.2em] uppercase text-xs">Founder & CEO, Flyggo</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: About Text */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-[72px] font-black tracking-tighter mb-4 text-white">
                About the Founder
              </h2>
              
              <h3 className="text-2xl md:text-3xl font-semibold mb-10 leading-tight text-white/80">
                Empowering businesses through <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-emerald-300">innovative technology</span>.
              </h3>
              
              <div className="space-y-8 text-xl text-white/60 leading-relaxed font-light">
                <p>
                  Flyggo was founded with a singular vision: to empower businesses through innovative technology and seamless digital solutions. We focus on helping startups, MSMEs, and growing brands establish an undeniable digital presence.
                </p>
                <p>
                  With deep expertise spanning website development, mobile applications, AI automation, SaaS platforms, and digital marketing, our ultimate goal is to architect solutions that drive exponential growth and measurable success.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- AI-styled Quote Section --- */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-40"
        >
          <div className="bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center backdrop-blur-3xl shadow-2xl">
            {/* Top glowing line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <svg className="w-12 h-12 mx-auto mb-10 text-white/20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              <h3 className="text-3xl md:text-5xl font-['Instrument_Serif'] leading-[1.2] mb-10 text-white">
                "Great businesses are built on innovation, trust, and the courage to create something meaningful."
              </h3>
              <p className="text-white/40 font-medium tracking-[0.2em] uppercase text-xs">Nikesh S</p>
            </div>
            
            {/* Ambient glows behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />
          </div>
        </motion.div>

        {/* --- Vision & Mission (Glass Cards) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 hover:bg-white/[0.02] transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">Vision</h3>
              <p className="text-white/60 leading-relaxed text-lg font-light">
                To build Flyggo into a trusted global technology partner that enables businesses of all sizes to innovate, grow, and succeed in the rapidly evolving digital era.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 hover:bg-white/[0.02] transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-3xl font-bold mb-6 tracking-tight">Mission</h3>
              <p className="text-white/60 leading-relaxed text-lg font-light">
                To provide accessible, high-performance technology solutions that simplify operations, fortify brands, and dramatically accelerate digital transformation.
              </p>
            </div>
          </motion.div>
        </div>

        {/* --- Core Values (Bento Grid Style) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Core Principles</h2>
            <p className="text-white/50 text-lg">The foundation of everything we build at Flyggo.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Innovation", desc: "Pushing boundaries to build the future." },
              { name: "Integrity", desc: "Unwavering commitment to honesty and transparency." },
              { name: "Customer Success", desc: "Your growth is our ultimate metric." },
              { name: "Quality First", desc: "Excellence woven into every line of code." },
              { name: "Continuous Learning", desc: "Evolving alongside the pace of technology." },
              { name: "Long-Term Partnerships", desc: "Building relationships that stand the test of time." }
            ].map((value, idx) => (
              <div key={idx} className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.08] transition-all duration-300">
                <h4 className="text-xl font-bold mb-3 text-white/90">{value.name}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}
