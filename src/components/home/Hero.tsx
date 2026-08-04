"use client";
import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#000000] text-white overflow-hidden flex flex-col">
      {/* Background Video Layer */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
        poster="https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZWNobm9sb2d5JTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3Njg5NzIyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
      />
      
      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-0" />

      {/* Decorative Gradients */}
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-900/20 blur-[120px] mix-blend-screen z-0" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-indigo-900/20 blur-[120px] mix-blend-screen z-0" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex-grow flex flex-col items-center justify-center text-center mt-20 space-y-12 px-6">
        
        <div className="space-y-4">
          {/* Pre-headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="font-['Instrument_Serif'] italic text-3xl sm:text-5xl lg:text-[48px] leading-[1.1] text-white"
          >
            Design at the speed of thought
          </motion.h2>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-['Instrument_Sans'] font-semibold text-6xl sm:text-8xl lg:text-[136px] leading-[0.9] tracking-tighter bg-gradient-to-b from-white via-white to-[#b4c0ff] bg-clip-text text-transparent pb-4"
          >
            Build Faster
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 0.7 }} 
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-['Instrument_Sans'] text-lg sm:text-[20px] leading-[1.65] text-white max-w-xl mx-auto pt-2 opacity-70"
          >
            Create fully functional, SEO-optimized websites in seconds with our advanced AI engine.
          </motion.p>
        </div>

        {/* CTA Buttons Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          {/* Primary Button */}
          <button className="flex items-center bg-white rounded-full pl-6 pr-2 py-2 group hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300">
            <span className="font-['Instrument_Sans'] font-medium text-lg text-[#0a0400] mr-4">
              Start Building Free
            </span>
            <div className="w-[40px] h-[40px] rounded-full bg-[#3054ff] group-hover:bg-[#2040e0] flex items-center justify-center transition-colors">
              <ArrowRight size={20} className="text-white" />
            </div>
          </button>

          {/* Secondary Button */}
          <button className="flex items-center text-white/70 hover:text-white backdrop-blur-sm hover:bg-white/5 px-4 py-2 rounded-lg transition-colors group font-['Instrument_Sans']">
            See Examples
            <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
