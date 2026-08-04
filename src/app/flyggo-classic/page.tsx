"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ClassicFooter } from '@/components/ClassicFooter';

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
      className={`transition-opacity ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

// AnimatedHeading Component
const AnimatedHeading = ({ text, initialDelay = 200 }: { text: string, initialDelay?: number }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  const lines = text.split('\n');
  const charDelay = 30; // ms
  let globalCharIndex = 0;

  return (
    <h1 className="text-5xl md:text-6xl lg:text-[90px] xl:text-[110px] mb-8 text-white leading-[1.1] lg:leading-[1.1]" style={{ fontFamily: '"Instrument Serif", serif', textShadow: '0 8px 24px rgba(0,0,0,0.6)' }}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="overflow-hidden whitespace-nowrap py-2">
          {line.split('').map((char, charIndex) => {
            const currentDelay = initialDelay + (globalCharIndex * charDelay);
            globalCharIndex++;
            return (
              <span
                key={charIndex}
                className="inline-block transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? 'translateY(0) rotateX(0deg)' : 'translateY(50px) rotateX(-45deg)',
                  transitionDelay: `${currentDelay}ms`,
                  color: charIndex % 7 === 0 && lineIndex === 1 ? '#FBE5B4' : 'inherit'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>
      ))}
    </h1>
  );
};

export default function FlyggoClassicPage() {
  return (
    <div className="bg-black font-['Inter'] relative flex flex-col text-white">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4" type="video/mp4" />
      </video>

      {/* 100vh Hero Container */}
      <div className="min-h-screen flex flex-col w-full">
        {/* Navbar Wrapper */}
        <div className="relative z-10 px-6 md:px-12 lg:px-16 pt-6 max-w-[1920px] mx-auto w-full">
        <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold tracking-tight text-white flex items-center gap-1">
            Flyggo<sup className="text-xs font-normal">®</sup>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/flyggo-classic" className="text-white font-medium">Home</Link>
            <Link href="/about-classic" className="text-gray-300 hover:text-gray-100 transition-colors">About Classic</Link>
            <Link href="/investing" className="text-gray-300 hover:text-gray-100 transition-colors">Investing</Link>
            <Link href="/offers" className="text-gray-300 hover:text-gray-100 transition-colors">Offers</Link>
            <Link href="/complaint" className="text-gray-300 hover:text-gray-100 transition-colors">Complaint/Service</Link>
          </div>
        </nav>
      </div>

      {/* Hero Content */}
      <main className="relative z-10 px-6 md:px-12 lg:px-24 flex-1 flex flex-col justify-end pb-16 lg:pb-24 w-full max-w-[1920px] mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:items-end gap-12">
          
          {/* Left Column */}
          <div className="flex flex-col max-w-4xl">
            <AnimatedHeading text={"A Helping Hand\nfor MSMEs."} />
            
            <FadeIn delay={800} duration={1000} className="text-base md:text-xl text-white/80 font-light mb-8 max-w-xl leading-relaxed">
              <p>Joining forces with small business owners to elevate your ventures to the <span className="font-medium text-[#FBE5B4]">premium tier</span>.</p>
            </FadeIn>
            
            <FadeIn delay={1200} duration={1000} className="flex flex-wrap gap-5 mt-2">
              <Link href="/start-project" className="bg-gradient-to-r from-[#FBE5B4] to-[#D4AF37] text-black px-8 py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                Apply
              </Link>
              <Link href="#" className="liquid-glass border border-white/20 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-white/10 transition-all backdrop-blur-md">
                Learn More
              </Link>
            </FadeIn>
          </div>

          {/* Right Column */}
          <div className="flex items-end justify-start lg:justify-end mt-12 lg:mt-0">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white">
                  Investing. Building. Advisory.
                </span>
              </div>
            </FadeIn>
          </div>

        </div>
      </main>
      </div>

      {/* Footer */}
      <ClassicFooter />

    </div>
  );
}
