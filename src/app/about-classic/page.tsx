"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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

export default function AboutClassicPage() {
  return (
    <div className="min-h-screen bg-[#060218] text-white flex flex-col font-['Inter'] relative overflow-hidden">
      
      {/* Background Video (Same as Classic) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-gradient-to-b from-transparent to-[#060218] z-0" />

      {/* Navbar Wrapper */}
      <ClassicNavbar />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-20 w-full max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <FadeIn delay={200} className="mb-6">
              <span className="text-[#FBE5B4] font-semibold tracking-[0.2em] uppercase text-sm flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#FBE5B4]"></span>
                Our Roots
              </span>
            </FadeIn>

            <FadeIn delay={400}>
              <h1 className="text-5xl md:text-7xl lg:text-[90px] text-white leading-[1.05] mb-10" style={{ fontFamily: '"Instrument Serif", serif', textShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                Never forgetting <br/> where we <span className="italic text-[#FBE5B4]">came from.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={1000} className="mt-4 hidden lg:block">
              <Link href="/start-project" className="inline-flex items-center justify-center bg-gradient-to-r from-[#FBE5B4] to-[#D4AF37] text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                Request a Call
              </Link>
            </FadeIn>
          </div>

          {/* Right Column: Story Text */}
          <div className="lg:col-span-6 flex flex-col items-start text-left lg:border-l lg:border-white/10 lg:pl-16">
            <FadeIn delay={700} className="text-lg md:text-xl text-white/80 font-light leading-relaxed space-y-8 max-w-2xl">
              <p>
                Today, we stand in a position of strength simply because of the small business owners, MSMEs, and new startups who believed in us and helped us grow. 
              </p>
              <p>
                To give back to the community that built us, we launched a dedicated initiative in <strong className="text-white font-medium">August 2026</strong>. 
              </p>
              
              <div className="relative pt-6 mt-8">
                <div className="absolute top-0 left-0 w-12 h-12 text-[#FBE5B4] opacity-20" style={{ fontFamily: '"Instrument Serif", serif', fontSize: '100px', lineHeight: '0' }}>"</div>
                <p className="text-2xl md:text-3xl text-white font-['Instrument_Serif'] italic leading-snug pl-6 relative z-10 text-[#FBE5B4]">
                  Targeting MSMEs and small business owners to provide world-class technological architecture and premium tech support at a truly affordable cost.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={1000} className="mt-12 block lg:hidden w-full">
              <Link href="/start-project" className="flex items-center justify-center w-full bg-gradient-to-r from-[#FBE5B4] to-[#D4AF37] text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                Request a Call
              </Link>
            </FadeIn>
          </div>

        </div>
      </main>

      {/* Footer */}
      <ClassicFooter />
    </div>
  );
}
