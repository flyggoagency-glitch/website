"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { ClassicFooter } from '@/components/ClassicFooter';
import { ClassicNavbar } from '@/components/ClassicNavbar';

type OfferData = {
  id: string;
  title: string;
  price: string;
  features: string[];
  posterUrl?: string;
};

export default function OffersListingPage() {
  const [offers, setOffers] = useState<OfferData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const q = query(collection(db, 'offers'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: OfferData[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as OfferData);
        });
        setOffers(fetched);
      } catch (err) {
        console.error("Error fetching offers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="min-h-screen bg-[#060218] text-white flex flex-col font-['Inter'] relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500 opacity-[0.03] blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#A068FF] opacity-[0.03] blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Navbar Wrapper */}
      <ClassicNavbar />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col px-6 md:px-16 lg:px-24 py-20 w-full max-w-[1920px] mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn delay={200}>
            <span className="text-cyan-400 font-semibold tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-cyan-400"></span>
              Exclusive Packages
              <span className="w-8 h-[1px] bg-cyan-400"></span>
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1] text-white" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Special <span className="italic text-cyan-400">Offers</span>
            </h1>
            <p className="text-lg text-white/60">
              Browse our curated selection of premium service packages designed to accelerate your business growth. 
            </p>
          </FadeIn>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center text-white/40 py-20">
            No special offers available at the moment. Please check back later!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, idx) => (
              <FadeIn key={offer.id} delay={400 + (idx * 100)}>
                <Link href={`/offers/${offer.id}`} className="block h-full group">
                  <div className="bg-white/5 border border-white/10 hover:border-cyan-500/50 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-2">
                    
                    {/* Optional Poster */}
                    {offer.posterUrl ? (
                      <div className="h-48 w-full overflow-hidden bg-black/50">
                        <img src={offer.posterUrl} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    ) : (
                      <div className="h-32 w-full bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                        <span className="text-cyan-400/50 font-bold tracking-widest uppercase">Special Deal</span>
                      </div>
                    )}

                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{offer.title}</h3>
                      <div className="text-3xl font-['Urbanist'] text-emerald-400 font-bold mb-6">
                        {offer.price}
                      </div>
                      
                      <div className="space-y-3 mb-8 flex-1">
                        {offer.features.slice(0, 4).map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                            <span className="text-white/80 text-sm">{feature}</span>
                          </div>
                        ))}
                        {offer.features.length > 4 && (
                          <div className="text-white/40 text-sm italic mt-2">
                            + {offer.features.length - 4} more features
                          </div>
                        )}
                      </div>

                      <div className="w-full bg-white/10 text-white font-bold text-center py-3 rounded-lg group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                        View Details
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <ClassicFooter />
    </div>
  );
}
