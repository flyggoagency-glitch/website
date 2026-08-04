import Link from 'next/link';
import React from 'react';

export const ClassicFooter = () => {
  return (
    <footer className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 py-8 border-t border-white/5 bg-black/40 backdrop-blur-md mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-bold text-white mb-1 tracking-tight">Flyggo</span>
          <span className="text-xs text-white/40">© 2026 Flyggo. All rights reserved.</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
          <Link href="/" className="hover:text-white transition-colors">Flyggo Premium</Link>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
