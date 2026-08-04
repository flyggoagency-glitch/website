"use client";
import Link from "next/link";
import { ChevronDown, Sun } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 py-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2">
          {/* Sunburst icon placeholder, using Sun from lucide as an approximation */}
          <Sun size={24} className="text-white" />
          <span className="font-bold text-white font-['Instrument_Sans'] tracking-tight">Flyggo</span>
        </Link>
      </div>

      {/* Center Section */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white cursor-pointer transition-colors font-['Instrument_Sans']">
          Products <ChevronDown size={14} />
        </div>
        <Link href="/stories" className="text-sm font-medium text-white/80 hover:text-white transition-colors font-['Instrument_Sans']">
          Customer Stories
        </Link>
        <Link href="/resources" className="text-sm font-medium text-white/80 hover:text-white transition-colors font-['Instrument_Sans']">
          Resources
        </Link>
        <Link href="/pricing" className="text-sm font-medium text-white/80 hover:text-white transition-colors font-['Instrument_Sans']">
          Pricing
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <Link href="/demo" className="hidden sm:block text-sm font-medium text-white/80 hover:text-white transition-colors font-['Instrument_Sans']">
          Book A Demo
        </Link>
        <Link href="/start" className="bg-white text-black rounded-full px-5 py-2.5 font-semibold text-sm hover:scale-105 transition-transform font-['Instrument_Sans']">
          Get Started
        </Link>
      </div>
    </nav>
  );
}
