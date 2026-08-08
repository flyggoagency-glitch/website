import React from 'react';
import Link from 'next/link';

// Instagram SVG Icon
const InstagramIcon = ({ size = 18 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// LinkedIn SVG Icon
const LinkedinIcon = ({ size = 18 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#03010b] border-t border-white/10 pt-16 pb-8 px-6 md:px-[64px] relative z-30">
      <div className="max-w-[1920px] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Logo & Copyright */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-white font-['Urbanist'] text-3xl tracking-tight">Flyggo</span>
            </Link>
            <p className="text-white/50 text-sm font-['Inter']">
              &copy; {currentYear} Flyggo. All rights reserved.
            </p>
            <a href="mailto:support@flyggo.in" className="text-white/50 hover:text-white transition-colors text-sm font-['Inter']">
              support@flyggo.in
            </a>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 md:gap-10">
            <Link href="/" className="text-white/70 hover:text-white transition-colors font-['Urbanist'] font-medium text-base tracking-wide">
              Home
            </Link>
            <Link href="/about" className="text-white/70 hover:text-white transition-colors font-['Urbanist'] font-medium text-base tracking-wide">
              About Us
            </Link>
            <Link href="/our-story" className="text-white/70 hover:text-white transition-colors font-['Urbanist'] font-medium text-base tracking-wide">
              Our Story
            </Link>
            <Link href="/flyggo-classic" className="text-white/70 hover:text-white transition-colors font-['Urbanist'] font-medium text-base tracking-wide">
              Flyggo Classic
            </Link>
            <Link href="/careers" className="text-white/70 hover:text-white transition-colors font-['Urbanist'] font-medium text-base tracking-wide">
              Careers
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/flyggo.media" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all border border-white/10 hover:border-white/20"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/company/flyggo/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all border border-white/10 hover:border-white/20"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
