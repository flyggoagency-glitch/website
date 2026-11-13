"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, animate, useInView } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { Footer } from '@/components/Footer';
import { collection, query, orderBy, getDocs } from 'firebase/firestore/lite';
import { db } from '@/lib/firebase';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const TypewriterHeading = ({ 
  text, 
  splitIndex,
  color1 = "#ffffff",
  color2 = "#A068FF",
  speed = 35,
  delay = 400
}: { 
  text: string, 
  splitIndex: number,
  color1?: string,
  color2?: string,
  speed?: number,
  delay?: number
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentLength = 0;
    let timeoutId: NodeJS.Timeout;
    
    const type = () => {
      if (currentLength <= text.length) {
        setDisplayedText(text.slice(0, currentLength));
        currentLength++;
        timeoutId = setTimeout(type, speed);
      }
    };

    const initialTimeout = setTimeout(type, delay);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay]);

  const part1 = displayedText.slice(0, splitIndex);
  const part2 = displayedText.slice(splitIndex);

  return (
    <h1 className="font-['Urbanist'] text-[32px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-semibold leading-[1.2] md:leading-[1.1] lg:leading-[64px] tracking-[-1px] lg:tracking-[-1.5px] max-w-full lg:max-w-[600px]">
      <span style={{ color: color1 }}>{part1}</span>
      <span style={{ color: color2 }}>{part2}</span>
      <span className="cursor-blink">|</span>
    </h1>
  );
};



const services = [
  {
    title: "Web design & development",
    desc: "Fast, responsive, conversion-focused websites built on modern frameworks and clean architecture."
  },
  {
    title: "App development",
    desc: "Native and cross-platform apps for iOS, Android and beyond — built for performance and scale."
  },
  {
    title: "SaaS development",
    desc: "Multi-tenant platforms engineered to scale cleanly from first user to millionth."
  },
  {
    title: "Cloud & DevOps",
    desc: "CI/CD pipelines, infrastructure-as-code and cloud architecture that keeps you shipping safely."
  },
  {
    title: "UI/UX design",
    desc: "Interfaces people enjoy using, shaped by research and tested with real users."
  },
  {
    title: "API & systems integration",
    desc: "Connect your stack — payments, CRMs, ERPs and everything in between."
  }
];

const ServicesSection = () => {
  const headingText = "FULL-STACK CAPABILITY";
  const characters = headingText.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
  };

  return (
    <section className="w-full bg-transparent text-white pt-24 pb-40 px-6 md:px-[64px] relative z-30 flex flex-col items-center">
      
      {/* Animated Heading */}
      <div
        className="font-['Urbanist'] text-center text-[7.5vw] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 w-full flex justify-center flex-nowrap whitespace-nowrap" 
        style={{ perspective: "1000px" }}
      >
        {characters.map((char, index) => (
          <span
            key={index}
            className={cn("inline-block", char === " " && "w-2 sm:w-4")}
          >
            {char}
          </span>
        ))}
      </div>
      
      {/* Subheading */}
      <p
        className="text-lg md:text-xl text-white/60 text-center max-w-3xl mb-24 font-['Inter'] leading-relaxed"
      >
        One accountable team. From first sketch to production scale — design, engineering and infrastructure under one roof.
      </p>

      {/* Services Grid */}
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 w-full">
        {services.map((service, idx) => (
          <div 
            key={idx}
            className="flex flex-col gap-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors group cursor-default"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
            </div>
            <h3 className="font-['Urbanist'] text-2xl font-bold text-white group-hover:text-white/90 transition-colors">{service.title}</h3>
            <p className="text-white/60 font-['Inter'] leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const processSteps = [
  {
    num: "01",
    title: "Pre-flight check",
    desc: "Discovery, technical audit and scoping — we learn your business before we write a line of code."
  },
  {
    num: "02",
    title: "Flight plan",
    desc: "Architecture, design and a roadmap you can see and approve before build begins."
  },
  {
    num: "03",
    title: "Takeoff",
    desc: "Sprint-based builds with continuous delivery — you watch the product take shape in real time."
  },
  {
    num: "04",
    title: "Cruise",
    desc: "Launch, monitor and optimize — performance and stability tuned under real traffic."
  },
  {
    num: "05",
    title: "Tower support",
    desc: "24/7 monitoring, ongoing support and iteration long after launch day."
  }
];

const ProcessSection = () => {
  const headingText = "HOW A FLYGGO PROJECT FLIES";
  const characters = headingText.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } }
  };

  return (
    <section className="w-full bg-transparent text-white pt-24 pb-40 px-6 md:px-[64px] relative z-30 flex flex-col items-center border-t border-white/5">
      
      {/* Animated Heading */}
      <div
        className="font-['Urbanist'] text-center text-[6vw] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 w-full flex justify-center flex-nowrap whitespace-nowrap" 
        style={{ perspective: "1000px" }}
      >
        {characters.map((char, index) => (
          <span
            key={index}
            className={cn("inline-block", char === " " && "w-2 sm:w-4")}
          >
            {char}
          </span>
        ))}
      </div>
      
      {/* Subheading */}
      <p
        className="text-lg md:text-xl text-white/60 text-center max-w-3xl mb-24 font-['Inter'] leading-relaxed"
      >
        A clear flight path from first conversation to ongoing support — no black boxes.
      </p>

      {/* Process Grid */}
      <div className="max-w-[1920px] mx-auto flex flex-wrap justify-center gap-x-8 gap-y-12 w-full">
        {processSteps.map((step, idx) => (
          <div 
            key={idx}
            className="flex flex-col gap-4 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors group cursor-default w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] relative overflow-hidden"
          >
            {/* Big background number */}
            <span className="absolute -right-4 -bottom-8 font-['Urbanist'] text-[120px] font-bold text-white/[0.03] group-hover:text-white/[0.06] transition-colors pointer-events-none select-none">
              {step.num}
            </span>

            <div className="flex items-center gap-4 mb-2">
              <span className="font-['Urbanist'] text-3xl font-black text-white group-hover:scale-110 transition-transform">{step.num}</span>
              <h3 className="font-['Urbanist'] text-2xl font-bold text-white group-hover:text-white transition-colors">{step.title}</h3>
            </div>
            
            <p className="text-white/60 font-['Inter'] leading-relaxed relative z-10">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section 
      className="relative z-10 w-full min-h-[60vh] bg-[#010828] text-white flex flex-col items-center justify-center overflow-hidden py-32 border-t border-white/5"
    >
      {/* Orbis CTA Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-auto object-cover pointer-events-none opacity-80"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_055729_72d66327-b59e-4ae9-bb70-de6ccb5ecdb0.mp4"
      />
      
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-[#010828]/60 pointer-events-none" />

      <div 
        className="mx-auto flex flex-col items-center justify-center w-full px-6 relative z-10"
        style={{
          transformStyle: "preserve-3d",
          perspective: "800px",
        }}
      >
        <div
          className="w-full max-w-4xl text-center flex flex-col items-center"
        >
          <span className="text-white/90 font-['Urbanist'] text-xl md:text-2xl font-bold tracking-widest uppercase mb-4 drop-shadow-lg">
            Get started
          </span>
          
          <h2 className="font-['Urbanist'] text-5xl sm:text-6xl md:text-7xl lg:text-[100px] leading-none font-black tracking-tighter text-white mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Ready for takeoff?
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 font-['Inter'] leading-relaxed max-w-2xl mb-12 drop-shadow-lg font-medium">
            Tell us where you want your brand to fly. We'll handle the engineering — from first sketch to global scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="btn-border-wrap">
              <Link href="/start-project" className="flex items-center gap-2 bg-[#060218] text-white px-[32px] py-[16px] text-[18px] font-medium rounded-[50px] btn-slide-fill-right whitespace-nowrap">
                Start a project
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer base gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </section>
  );
};


const AnimatedBackgroundLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full opacity-100"
        style={{
          background: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_111401_56af5012-2263-45d3-849a-8688084d7c2a.png&w=1280&q=85") center center / cover no-repeat',
        }}
      />
      
      {/* Left Lines */}
      <div 
        className="hidden md:block absolute top-0 left-0 bottom-0 w-[400px] overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 100%)'
        }}
      >
        {[...Array(20)].map((_, i) => (
          <div 
            key={`left-${i}`}
            className="absolute top-0 bottom-0 left-0 border-y-[1px] border-r-[1px] border-white/20 opacity-0 animate-line-pulse"
            style={{
              width: `${40 + i * 15}px`,
              borderTopRightRadius: '100%',
              borderBottomRightRadius: '100%',
              borderLeft: 'none',
              animationDelay: `${i * 0.25}s`,
              transformOrigin: 'left center'
            }}
          />
        ))}
      </div>

      {/* Right Lines */}
      <div 
        className="hidden md:block absolute top-0 right-0 bottom-0 w-[400px] overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to left, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to left, black 20%, transparent 100%)'
        }}
      >
        {[...Array(20)].map((_, i) => (
          <div 
            key={`right-${i}`}
            className="absolute top-0 bottom-0 right-0 border-y-[1px] border-l-[1px] border-white/20 opacity-0 animate-line-pulse"
            style={{
              width: `${40 + i * 15}px`,
              borderTopLeftRadius: '100%',
              borderBottomLeftRadius: '100%',
              borderRight: 'none',
              animationDelay: `${i * 0.25}s`,
              transformOrigin: 'right center'
            }}
          />
        ))}
      </div>

      {/* Top Lines (mobile) */}
      <div 
        className="block md:hidden absolute top-0 left-0 right-0 h-[300px] overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)'
        }}
      >
        {[...Array(20)].map((_, i) => (
          <div 
            key={`top-${i}`}
            className="absolute top-0 left-0 right-0 border-x-[1px] border-b-[1px] border-white/20 opacity-0 animate-line-pulse"
            style={{
              height: `${40 + i * 12}px`,
              borderBottomLeftRadius: '100%',
              borderBottomRightRadius: '100%',
              borderTop: 'none',
              animationDelay: `${i * 0.25}s`,
              transformOrigin: 'top center'
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Organization Structured Data (JSON-LD)
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://flyggo.com/#organization",
  "name": "Flyggo",
  "alternateName": "Flyggo",
  "url": "https://flyggo.com/",
  "description": "AI-powered product solutions company.",
  "sameAs": [
    "https://www.instagram.com/flyggo.media",
    "https://www.linkedin.com/company/flyggo/"
  ]
};

export default function FlyggoLandingPage() {
  // Companies for ticker
  const [companies, setCompanies] = useState<string[]>([
    "AANOOR GLOBAL EXPORTS",
    "THEBARBACK",
    "ACADAMKEY",
    "JAIROENTERPRESISE",
    "DERMAGLOW",
    "CADSPIRA",
    "IMS SOLAR",
    "REATILTALENT",
    "COCO CRAFT EXPORTS"
  ]);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const q = query(collection(db, 'launches'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const fetchedCompanies: string[] = [];
          querySnapshot.forEach((doc) => {
            fetchedCompanies.push(doc.data().name);
          });
          setCompanies(fetchedCompanies);
        }
      } catch (err) {
        console.error("Error fetching launches:", err);
      }
    };
    fetchLaunches();
  }, []);

  // Repeat for seamless loop
  const tickerItems = [...companies, ...companies, ...companies];

  return (
    <div className="w-full bg-[#0a0a0a] min-h-screen">
      {/* Organization Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      
      {/* HERO SECTION */}
      <div 
        className="min-h-screen w-full relative overflow-hidden flex flex-col"
        style={{
          background: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_111401_56af5012-2263-45d3-849a-8688084d7c2a.png&w=1280&q=85") center center / cover no-repeat'
        }}
      >
        {/* Header */}
        <header className="flex justify-between items-center px-6 md:px-[64px] py-[24px] max-w-[1920px] w-full mx-auto opacity-0 animate-fade-down relative z-50">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-white font-['Urbanist'] text-3xl tracking-tight">Flyggo</span>
            </Link>
          </div>

        </header>

        {/* Main Hero Content */}
        <main className="flex-grow max-w-[1920px] mx-auto px-6 md:px-[64px] w-full flex flex-col lg:flex-row items-center lg:items-center justify-between pb-40 pt-4 lg:pt-0 gap-12 lg:gap-0">
          
          {/* Hero Left */}
          <div 
            className="w-full lg:w-[600px] z-10 relative flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0 px-4"
            style={{ animation: 'fade-up 0.8s ease-out forwards' }}
          >
            <h1 className="font-['Urbanist'] text-[36px] sm:text-[42px] md:text-[48px] lg:text-[64px] font-semibold leading-[1.1] lg:leading-[64px] tracking-[-1px] lg:tracking-[-1.5px] max-w-full lg:max-w-[600px]">
              <span className="text-white">Where Brands Learn to Fly — </span>
              <span className="text-[#E9D5FF]">Your Technical Backbone Just One Click Away!</span>
            </h1>
            
            <div 
              className="mt-8 lg:mt-12"
              style={{ animation: 'fade-up 0.8s ease-out forwards', animationDelay: '0.4s', opacity: 0 }}
            >
              <div className="btn-border-wrap">
                <Link href="/start-project" className="flex items-center gap-2 bg-[#060218] text-white px-[28px] py-[14px] text-[16px] font-medium rounded-[50px] btn-slide-fill-right whitespace-nowrap">
                  Start Project
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Hero Right - Circles */}
          <div className="w-full flex justify-center items-center opacity-0 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] lg:w-[720px] lg:h-[720px] flex items-center justify-center mt-8 lg:mt-0">
              <div className="absolute w-[720px] h-[720px] scale-[0.44] sm:scale-[0.62] lg:scale-100 flex items-center justify-center">
                
                {/* Orbit 4 */}
                <div className="absolute w-[797px] h-[797px] rounded-full flex items-center justify-center" style={{ animation: 'spin-left 60s linear infinite' }}>
                  <div className="w-full h-full rounded-full border-[1.5px] border-transparent" style={{ background: 'linear-gradient(180deg, rgba(217,161,255,0) 0%, rgba(217,161,255,1) 43%, rgba(217,161,255,0) 100%) border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }} />
                  <Avatar src="https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png" radius={398.5} angle={30} delay={2.0} reverseSpin="spin-right 60s" shadowColor="rgba(160,104,255,0.5)" />
                  <Avatar src="https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png" radius={398.5} angle={95} size={88} isSquare delay={2.1} reverseSpin="spin-right 60s" shadowColor="rgba(255,165,0,0.5)" />
                  <Avatar src="https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png" radius={398.5} angle={220} size={88} isSquare delay={2.2} reverseSpin="spin-right 60s" shadowColor="rgba(255,105,180,0.5)" />
                  <Avatar src="https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png" radius={398.5} angle={320} delay={2.3} reverseSpin="spin-right 60s" shadowColor="rgba(160,104,255,0.5)" />
                </div>

                {/* Orbit 3 */}
                <div className="absolute w-[649px] h-[649px] rounded-full flex items-center justify-center" style={{ animation: 'spin-right 50s linear infinite' }}>
                  <div className="w-full h-full rounded-full border-[1.5px] border-transparent" style={{ background: 'linear-gradient(180deg, rgba(217,161,255,0) 0%, rgba(217,161,255,1) 43%, rgba(217,161,255,0) 100%) border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }} />
                  <Avatar src="https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png" radius={324.5} angle={130} size={88} delay={1.5} reverseSpin="spin-left 50s" shadowColor="rgba(255,105,180,0.5)" />
                </div>

                {/* Orbit 2 */}
                <div className="absolute w-[501px] h-[501px] rounded-full flex items-center justify-center" style={{ animation: 'spin-right 40s linear infinite' }}>
                  <div className="w-full h-full rounded-full border-[1.5px] border-transparent" style={{ background: 'linear-gradient(180deg, rgba(217,161,255,0) 0%, rgba(217,161,255,1) 43%, rgba(217,161,255,0) 100%) border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }} />
                  <Avatar src="https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png" radius={250.5} angle={60} delay={1.0} reverseSpin="spin-left 40s" shadowColor="rgba(255,215,0,0.5)" />
                  <Avatar src="https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png" radius={250.5} angle={180} size={78} delay={1.1} reverseSpin="spin-left 40s" shadowColor="rgba(255,105,180,0.5)" />
                  <Avatar src="https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png" radius={250.5} angle={300} isSquare delay={1.2} reverseSpin="spin-left 40s" shadowColor="rgba(0,191,255,0.5)" />
                </div>

                {/* Orbit 1 */}
                <div className="absolute w-[353px] h-[353px] rounded-full flex items-center justify-center" style={{ animation: 'spin-left 30s linear infinite' }}>
                  <div className="w-full h-full rounded-full border-[1.5px] border-transparent" style={{ background: 'linear-gradient(180deg, rgba(217,161,255,0) 0%, rgba(217,161,255,1) 43%, rgba(217,161,255,0) 100%) border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }} />
                  <Avatar src="https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png" radius={176.5} angle={270} isSquare delay={0.6} reverseSpin="spin-right 30s" shadowColor="rgba(160,104,255,0.5)" />
                  
                  <CenterCounter />
                </div>

              </div>
            </div>
          </div>
        </main>

        {/* Logo Ticker */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden py-8 lg:py-12 logo-ticker-mask opacity-0 animate-fade-up z-20" style={{ animationDelay: '0.6s' }}>
          <div className="flex gap-[48px] lg:gap-[64px] w-max items-center" style={{ animation: 'ticker 20s linear infinite' }}>
            {tickerItems.map((name, idx) => (
              <span key={idx} className="text-white/40 hover:text-white/80 font-['Urbanist'] text-lg lg:text-xl font-bold tracking-widest transition-opacity uppercase whitespace-nowrap">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* COMBINED SECTIONS WITH ANIMATED BACKGROUND */}
      <div className="relative w-full bg-[#060218]">
        <AnimatedBackgroundLines />
        <ServicesSection />
        <ProcessSection />
      </div>

      {/* --- NEW CTA SECTION --- */}
      <CTASection />

      <Footer />
    </div>
  );
}

// Avatar Helper Component
const Avatar = ({ 
  src, 
  radius, 
  angle, 
  size = 58, 
  isSquare = false, 
  delay = 0,
  reverseSpin = "spin-left 30s",
  shadowColor = "rgba(160,104,255,0.5)"
}: {
  src: string;
  radius: number;
  angle: number;
  size?: number;
  isSquare?: boolean;
  delay?: number;
  reverseSpin?: string;
  shadowColor?: string;
}) => {
  return (
    <div 
      className="avatar-wrapper z-20"
      style={{
        '--rot': `${angle}deg`,
        '--initial-rot': `${angle - 180}deg`,
        '--radius': `${radius}px`,
        animationDelay: `${delay}s`
      } as React.CSSProperties}
    >
      <div style={{ animation: `${reverseSpin} linear infinite` }}>
        <div 
          className="bg-white/10 p-1 backdrop-blur-md overflow-hidden transition-transform hover:scale-110 cursor-pointer"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: isSquare ? '20px' : '50%',
            boxShadow: `0 0 20px ${shadowColor}`
          }}
        >
          <img src={src} className="w-full h-full object-cover" style={{ borderRadius: isSquare ? '16px' : '50%' }} alt="Avatar" />
        </div>
      </div>
    </div>
  );
};
// Isolated Counter Component
const CenterCounter = () => {
  const count = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (count.current) {
      const controls = animate(0, 250, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (count.current) {
            count.current.textContent = Math.round(latest) + "+";
          }
        },
      });
      return () => controls.stop();
    }
  }, []);

  return (
    <div className="absolute" style={{ animation: 'spin-right 30s linear infinite' }}>
      <div className="flex flex-col items-center justify-center bg-[#070319] w-[180px] h-[180px] rounded-full shadow-[0_0_30px_rgba(160,104,255,0.3)] border border-[#A068FF]/30">
         <h2 ref={count} className="font-['Urbanist'] text-[64px] font-medium text-white leading-none tracking-tight">
           0+
         </h2>
         <p className="font-['Urbanist'] text-[16px] font-semibold text-[#A068FF] uppercase tracking-wider mt-1">
           Projects
         </p>
      </div>
    </div>
  );
};
