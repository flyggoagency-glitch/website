"use client";

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { collection, query, orderBy, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Footer } from '@/components/Footer';
import { FadeIn } from '@/components/animations/FadeIn';
import { AnimatePresence, motion } from 'framer-motion';

type JobPosting = {
  id: string;
  position: string;
  experience: string;
  mode: string;
  salary: string;
  submittedAt: any;
};

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Application Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male',
    experience: '',
    location: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, 'career_applications'), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: JobPosting[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as JobPosting);
        });
        setJobs(fetched);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const openApplyModal = (job: JobPosting) => {
    setSelectedJob(job);
    setSubmitSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: 'Male',
      experience: '',
      location: ''
    });
    setIsModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'candidate_applications'), {
        jobId: selectedJob.id,
        jobPosition: selectedJob.position,
        ...formData,
        submittedAt: serverTimestamp()
      });
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Something went wrong while submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#03010b] font-['Inter'] relative min-h-screen flex flex-col overflow-hidden selection:bg-[#A068FF]/30">
      
      {/* Background Image */}
      <div 
        className="fixed inset-0 w-full h-full opacity-60 z-0 pointer-events-none"
        style={{
          background: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_111401_56af5012-2263-45d3-849a-8688084d7c2a.png&w=1280&q=85") center center / cover no-repeat',
        }}
      />
      <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-[#03010b]/50 via-[#03010b]/80 to-[#03010b] z-0 pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 md:px-[64px] py-6 max-w-[1920px] w-full mx-auto z-50">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-white font-['Urbanist'] text-3xl tracking-tight drop-shadow-md">Flyggo</span>
        </Link>
        <Link href="/" className="text-white/80 hover:text-white transition-colors text-sm font-medium drop-shadow-md bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20">
          Back to Home
        </Link>
      </header>

      <main className="relative z-10 w-full flex-grow text-white flex flex-col px-6 md:px-16 lg:px-24 max-w-[1920px] mx-auto pt-40 pb-32">
        <FadeIn>
          <div className="grid content-start justify-items-center gap-6 text-center z-20 mb-24 px-4">
            <h1 className="text-5xl sm:text-7xl font-black text-white font-['Urbanist'] tracking-tighter mb-4 drop-shadow-xl">
              Join Flyggo
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-['Inter'] leading-relaxed">
              We are always looking for talented individuals to join our team. Explore our open positions below and help us build the future.
            </p>
          </div>
        </FadeIn>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#A068FF]/50 border-t-[#A068FF] rounded-full animate-spin"></div>
          </div>
        ) : jobs.length === 0 ? (
          <FadeIn delay={200}>
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md">
              <h3 className="text-2xl font-semibold mb-2">No Openings Currently</h3>
              <p className="text-white/50">Please check back later for new opportunities.</p>
            </div>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <FadeIn key={job.id} delay={100 * (index + 1)}>
                <div className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#A068FF]/50 rounded-[2rem] p-8 transition-all duration-300 flex flex-col h-full backdrop-blur-md">
                  <div className="flex items-start justify-between mb-6">
                    <h2 className="text-2xl font-bold group-hover:text-[#A068FF] transition-colors">{job.position}</h2>
                    <span className="bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full uppercase tracking-wider font-semibold">
                      Mode: {job.mode}
                    </span>
                  </div>
                  
                  <div className="space-y-4 mb-8 flex-1">
                    <div className="flex items-center gap-3 text-white/70">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-400/80 font-medium">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3h12"></path>
                        <path d="M6 8h12"></path>
                        <path d="M6 13l8.5 8"></path>
                        <path d="M6 13h3"></path>
                        <path d="M9 13c6.667 0 6.667-10 0-10"></path>
                      </svg>
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => openApplyModal(job)}
                    className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-[#A068FF] hover:text-white transition-colors flex items-center justify-center gap-2 mt-auto"
                  >
                    Apply
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </main>

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={closeApplyModal} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <button 
                onClick={closeApplyModal}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              {submitSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h2 className="text-3xl font-bold font-['Urbanist'] text-white mb-4">Application Submitted!</h2>
                  <p className="text-white/70 text-lg mb-8">
                    Thank you for applying for the <strong className="text-white">{selectedJob?.position}</strong> role. We've received your application and will be in touch soon.
                  </p>
                  <button 
                    onClick={closeApplyModal}
                    className="bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold font-['Urbanist'] text-white mb-2">Apply for {selectedJob?.position}</h2>
                    <p className="text-white/60 text-sm">Please fill out all the details below to complete your application.</p>
                  </div>

                  <form onSubmit={handleApply} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
                      <input 
                        type="text" required 
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#A068FF] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                      <input 
                        type="email" required 
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#A068FF] transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Phone Number</label>
                      <input 
                        type="text" required 
                        value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#A068FF] transition-colors"
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Age</label>
                      <input 
                        type="number" required 
                        value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#A068FF] transition-colors"
                        placeholder="25"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Gender</label>
                      <select 
                        required 
                        value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#A068FF] transition-colors appearance-none"
                      >
                        <option value="Male" className="bg-[#0a0a0a]">Male</option>
                        <option value="Female" className="bg-[#0a0a0a]">Female</option>
                        <option value="Other" className="bg-[#0a0a0a]">Other</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-white/70 mb-2">Current Location</label>
                      <input 
                        type="text" required 
                        value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#A068FF] transition-colors"
                        placeholder="Mumbai, India"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-white/70 mb-2">Previous Experience</label>
                      <textarea 
                        required 
                        value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#A068FF] transition-colors h-32 resize-none custom-scrollbar"
                        placeholder="Describe your previous work experience relevant to this role..."
                      />
                    </div>

                    <div className="sm:col-span-2 mt-4">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-[#A068FF] text-white font-semibold hover:bg-[#8f5ae8] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
}