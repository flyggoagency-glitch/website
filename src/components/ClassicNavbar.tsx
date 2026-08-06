"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const ClassicNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/flyggo-classic' },
    { name: 'About Classic', href: '/about-classic' },
    { name: 'Investing', href: '/investing' },
    { name: 'Offers', href: '/offers' },
    { name: 'Complaint/Service', href: '/complaint' }
  ];

  return (
    <div className="relative z-50 px-4 md:px-12 lg:px-16 pt-6 max-w-[1920px] mx-auto w-full">
      <nav className="liquid-glass rounded-xl px-4 py-3 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center justify-between">
          <Link href="/flyggo-classic" className="text-2xl font-semibold tracking-tight text-white flex items-center gap-1 hover:opacity-80 transition-opacity">
            Flyggo<sup className="text-xs font-normal">®</sup>
          </Link>
          <button 
            className="md:hidden text-white p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
        
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 text-sm mt-6 md:mt-0 pb-4 md:pb-0`}>
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`transition-colors ${
                pathname === link.href ? 'text-white font-medium' : 'text-gray-300 hover:text-gray-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};
