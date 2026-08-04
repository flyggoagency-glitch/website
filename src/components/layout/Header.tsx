"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search } from "lucide-react";

const products = [
  { name: "Web Applications", color: "bg-blue-500", href: "/services" },
  { name: "Mobile Apps", color: "bg-green-500", href: "/services" },
  { name: "SaaS Platforms", color: "bg-red-500", href: "/services" },
  { name: "Enterprise AI", color: "bg-purple-500", href: "/services" },
  { name: "Cloud Infrastructure", color: "bg-yellow-500", href: "/services" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold tracking-tight flex items-center gap-2 text-brand-blue">
            <div className="w-6 h-6 bg-brand-blue rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm" />
            </div>
            Flyggo
          </Link>
          
          <nav className="hidden md:flex items-center h-full">
            <div 
              className="relative h-16 flex items-center"
              onMouseEnter={() => setIsProductsHovered(true)}
              onMouseLeave={() => setIsProductsHovered(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-brand-blue px-4 h-full">
                Products <ChevronDown size={16} />
              </button>
              
              {/* Mega Menu */}
              {isProductsHovered && (
                <div className="absolute top-16 left-0 w-max bg-white border border-gray-200 shadow-lg rounded-b-lg p-6 grid grid-cols-2 gap-x-12 gap-y-6">
                  {products.map(product => (
                    <Link key={product.name} href={product.href} className="flex items-center gap-3 group">
                      <div className={`w-8 h-8 rounded-md ${product.color} flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform`}>
                        {product.name[0]}
                      </div>
                      <span className="text-sm font-medium text-gray-800 group-hover:text-brand-blue">{product.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/solutions" className="text-sm font-medium text-gray-700 hover:text-brand-blue px-4">Solutions</Link>
            <Link href="/portfolio" className="text-sm font-medium text-gray-700 hover:text-brand-blue px-4">Customers</Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-brand-blue px-4">Company</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-gray-600 hover:text-brand-blue p-2">
            <Search size={20} />
          </button>
          <Link href="/contact" className="text-sm font-medium text-brand-blue hover:underline">Contact Sales</Link>
          <Link href="/book-consultation" className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-sm text-sm font-semibold uppercase tracking-wide shadow-sm transition-colors">
            Start Free Trial
          </Link>
        </div>

        <button 
          className="md:hidden text-gray-700 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 p-6 flex flex-col gap-4 md:hidden shadow-lg h-screen overflow-y-auto">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Products</div>
          {products.map(product => (
            <Link key={product.name} href={product.href} className="flex items-center gap-3 text-lg font-medium text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>
               <div className={`w-6 h-6 rounded-md ${product.color} flex items-center justify-center text-white text-xs font-bold`}>{product.name[0]}</div>
               {product.name}
            </Link>
          ))}
          <div className="h-px bg-gray-100 my-2" />
          <Link href="/solutions" className="text-lg font-medium text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Solutions</Link>
          <Link href="/portfolio" className="text-lg font-medium text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Customers</Link>
          <Link href="/about" className="text-lg font-medium text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Company</Link>
          <div className="mt-8 flex flex-col gap-4">
            <Link href="/contact" className="text-center font-medium text-brand-blue py-3 border border-brand-blue rounded-sm" onClick={() => setIsMobileMenuOpen(false)}>Contact Sales</Link>
            <Link href="/book-consultation" className="text-center font-bold text-white bg-red-500 py-3 rounded-sm uppercase tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Start Free Trial</Link>
          </div>
        </div>
      )}
    </header>
  );
}
