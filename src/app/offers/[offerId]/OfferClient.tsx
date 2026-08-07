"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';

type OfferData = {
  title: string;
  price: string;
  features: string[];
  posterUrl?: string;
};



export default function OfferLandingPage() {
  const params = useParams();
  const offerId = params.offerId as string;

  const [offer, setOffer] = useState<OfferData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const docRef = doc(db, 'offers', offerId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOffer(docSnap.data() as OfferData);
        } else {
          setError("Offer not found or has expired.");
        }
      } catch (err) {
        console.error("Error fetching offer:", err);
        setError("Something went wrong while loading the offer.");
      } finally {
        setIsLoading(false);
      }
    };

    if (offerId) fetchOffer();
  }, [offerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'offer_leads'), {
        ...formData,
        offerId,
        offerTitle: offer?.title || 'Unknown Offer',
        submittedAt: serverTimestamp(),
        status: 'new'
      });
      setIsSuccess(true);
    } catch (err) {
      console.error("Error submitting lead:", err);
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#03010b] text-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen bg-[#03010b] text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="text-white/60 mb-8 max-w-md">{error}</p>
        <button onClick={() => window.location.href = '/'} className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors">
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03010b] text-white font-['Inter'] relative overflow-hidden flex items-center">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500 opacity-[0.03] blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#A068FF] opacity-[0.03] blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-[1400px] w-full mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10 items-center">
        
        {/* Left Column: Offer Details */}
        <div className="flex flex-col">
          <FadeIn delay={200}>
            <span className="text-cyan-400 font-semibold tracking-[0.2em] uppercase text-sm flex items-center gap-4 mb-6">
              <span className="w-8 h-[1px] bg-cyan-400"></span>
              Special Offer (Limited Users Only)
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight leading-[1.1]">{offer.title}</h1>
            <div className="text-4xl md:text-5xl font-['Urbanist'] text-emerald-400 font-bold mb-8">
              {offer.price}
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="space-y-4 mb-10">
              <h3 className="text-lg font-semibold text-white/80 uppercase tracking-wider mb-2">What&apos;s Included</h3>
              {offer.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span className="text-lg text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Right Column: Form or Poster */}
        <div className="relative">
          {offer.posterUrl && !isSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-12 -right-12 w-64 h-64 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 rotate-12 hidden lg:block z-[-1]"
            >
              <img src={offer.posterUrl} alt="Offer Poster" className="w-full h-full object-cover" />
            </motion.div>
          )}

          <FadeIn delay={600} className="w-full">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-10 relative z-10"
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-cyan-500/20">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Request Submitted!</h3>
                    <p className="text-xl text-cyan-400 font-medium">
                      Within 30 minutes, our executive will call you.
                    </p>
                    <p className="text-white/50 mt-4 text-sm">Thank you for choosing Flyggo.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6 relative z-10"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Claim this Offer</h3>
                      <p className="text-white/60 text-sm">Fill out the details below to book a call.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Full Name" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500 focus:bg-black/60 transition-all" />
                      </div>
                      <div>
                        <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Phone Number" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500 focus:bg-black/60 transition-all" />
                      </div>
                      <div>
                        <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email Address" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500 focus:bg-black/60 transition-all" />
                      </div>
                      <div>
                        <select 
                          required 
                          value={formData.businessType} 
                          onChange={e => setFormData({...formData, businessType: e.target.value})} 
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 focus:bg-black/60 transition-all appearance-none"
                        >
                          <option value="" disabled>Select Business Type</option>
                          <option value="education">Education</option>
                          <option value="saloon">Saloon</option>
                          <option value="travels">Travels</option>
                          <option value="real_estate">Real Estate</option>
                          <option value="marketers">Marketers</option>
                          <option value="manufactures">Manufactures</option>
                          <option value="ecom">E-Commerce</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-lg py-4 rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                    >
                      {isSubmitting ? 'Booking Call...' : 'Book Call'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
