"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="bg-[#03010b] font-['Inter'] relative min-h-screen">
      
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

      <main className="relative z-10 w-full text-white pt-28 md:pt-40 pb-20 md:pb-32">
        
        {/* Title Area */}
        <div className="grid content-start justify-items-center gap-6 text-center z-20 mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white/90 font-['Urbanist'] text-xl font-bold tracking-widest uppercase mb-4 block drop-shadow-lg">
              Who We Are
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white font-['Urbanist'] tracking-tighter mb-4 drop-shadow-xl">
              About Flyggo
            </h1>
          </motion.div>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-12 rounded-[2rem] hover:border-white/20 transition-all flex flex-col gap-5 md:gap-6"
          >
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-['Urbanist'] text-white">Our Core</h3>
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-['Inter']">
              Technology is at the core of every successful business, and at Flyggo, we build the digital solutions that help businesses move forward with confidence. We partner with startups, MSMEs, and enterprises to create secure, scalable, and high-performing software tailored to their goals.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-12 rounded-[2rem] hover:border-white/20 transition-all flex flex-col gap-5 md:gap-6"
          >
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-['Urbanist'] text-white">Our Expertise</h3>
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-['Inter']">
              Our expertise spans website development, web applications, mobile applications, SaaS platforms, business automation, cloud solutions, and custom software development. Every project is built with a focus on performance, user experience, security, and long-term scalability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-12 rounded-[2rem] hover:border-white/20 transition-all flex flex-col gap-5 md:gap-6 md:col-span-2 text-left md:text-center items-start md:items-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold font-['Urbanist'] text-white">The Flyggo Philosophy</h3>
            <p className="text-white/80 text-base md:text-xl leading-relaxed font-['Inter'] max-w-4xl">
              We believe technology should simplify operations, strengthen customer experiences, and support sustainable business growth. That's why we work closely with our clients from strategy and design through development, deployment, and ongoing support, ensuring every solution delivers measurable value. At Flyggo, we don't simply build digital products—we build technology that empowers businesses to innovate, grow, and succeed in an increasingly digital world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-12 pb-8 flex justify-center md:col-span-2"
          >
            <Link 
              href="/" 
              className="px-10 py-5 bg-white text-black hover:bg-white/90 rounded-full font-bold font-['Urbanist'] tracking-wide transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] hover:scale-105 flex items-center gap-3 text-lg"
            >
              Return Home
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </motion.div>

        </div>

      </main>

      <Footer />
    </div>
  );
}