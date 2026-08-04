"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });
      
      // Initial state: hidden
      gsap.set(".dot", { scale: 0, opacity: 0 });
      gsap.set(".circuit", { scale: 0, opacity: 0 });
      gsap.set(".logo-part", { opacity: 0, y: 20 });
      gsap.set(".tagline", { opacity: 0 });

      // Black screen to dot
      tl.to(".dot", { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" })
        // Dot expands
        .to(".dot", { scale: 5, duration: 0.5, ease: "power2.inOut", delay: 0.2 })
        // Circuit lines grow
        .to(".circuit", { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.2")
        // Logo builds itself
        .to(".logo-part", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" })
        // Tagline fades
        .to(".tagline", { opacity: 1, duration: 0.5 }, "+=0.2")
        // Hold
        .to({}, { duration: 0.8 })
        // Zoom out and fade
        .to(containerRef.current, { scale: 5, opacity: 0, filter: "blur(20px)", duration: 0.8, ease: "power4.inOut" });
    }, containerRef);
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-black flex items-center justify-center origin-center">
      <div className="relative flex flex-col items-center justify-center">
        <div className="circuit absolute w-64 h-64 border border-brand-cyan/30 rounded-full flex items-center justify-center">
          <div className="w-48 h-48 border border-brand-blue/20 rounded-full" />
        </div>
        
        <div className="dot absolute w-2 h-2 bg-white rounded-full shadow-[0_0_20px_4px_rgba(255,255,255,0.8)]" />
        
        <div className="z-10 flex flex-col items-center mt-8">
          <div className="flex items-center gap-3 mb-4">
             <div className="logo-part w-10 h-10 bg-white rounded-sm flex items-center justify-center">
                <div className="w-5 h-5 bg-black rounded-sm" />
              </div>
             <h1 className="logo-part text-5xl font-bold tracking-tighter text-white">Flyggo</h1>
          </div>
          <p className="tagline text-brand-cyan tracking-widest uppercase text-sm font-medium">Engineering Digital Growth</p>
        </div>
      </div>
    </div>
  );
}
