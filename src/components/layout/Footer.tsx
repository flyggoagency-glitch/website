import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1f2937] text-white pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 bg-brand-blue rounded-sm" />
              </div>
              Flyggo
            </Link>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Flyggo is the operating system for your business. We build enterprise applications, cloud infrastructure, and AI solutions that help organizations scale and succeed.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Apps & Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">Web Applications</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">SaaS Platforms</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">Enterprise AI</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">Cloud Infrastructure</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Flyggo</Link></li>
              <li><Link href="/portfolio" className="text-gray-400 hover:text-white text-sm transition-colors">Customers</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white text-sm transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Sales & Support</h4>
            <ul className="space-y-3 mb-6">
              <li className="text-gray-400 text-sm">24/5 Global Support</li>
              <li className="text-gray-400 text-sm">sales@flyggo.com</li>
              <li className="text-gray-400 text-sm">+1 (800) 123-4567</li>
            </ul>
            <Link href="/contact" className="inline-block bg-white text-gray-900 px-4 py-2 text-sm font-semibold rounded-sm hover:bg-gray-100 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Flyggo Corporation. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/security" className="hover:text-white transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
