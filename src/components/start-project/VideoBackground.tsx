"use client";

import React, { useEffect, useRef } from 'react';

export const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafId = useRef<number | null>(null);
  const opacityRef = useRef<number>(0);

  const startFadeIn = (duration = 500) => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }
    
    const startOpacity = opacityRef.current;
    const targetOpacity = 1;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      opacityRef.current = startOpacity + (targetOpacity - startOpacity) * progress;
      
      if (videoRef.current) {
        videoRef.current.style.opacity = opacityRef.current.toString();
      }
      
      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        rafId.current = null;
      }
    };
    
    rafId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';
    
    const handlePlay = () => {
       startFadeIn(500);
    };

    video.addEventListener('playing', handlePlay);

    if (!video.paused) {
      startFadeIn(500);
    }

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      video.removeEventListener('playing', handlePlay);
    };
  }, []);

  return (
    <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#03010b]/70 z-10" />
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[115%] h-[115%] max-w-none object-cover object-top"
        style={{ opacity: 0 }}
      />
    </div>
  );
};

