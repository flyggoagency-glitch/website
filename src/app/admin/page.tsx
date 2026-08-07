"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, query, orderBy, getDocs, doc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore/lite';
import { db } from '@/lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type ProjectEntry = {
  id: string;
  businessName: string;
  businessSize: string;
  services: string[];
  email: string;
  phone: string;
  submittedAt: any;
  status: string;
};

type IdeaEntry = {
  id: string;
  topic: string;
  description: string;
  email: string;
  phone: string;
  submittedAt: any;
  status: string;
};

type OfferEntry = {
  id: string;
  title: string;
  price: string;
  features: string[];
  posterUrl: string;
  createdAt: any;
};

type OfferLeadEntry = {
  id: string;
  offerId: string;
  offerTitle: string;
  name: string;
  phone: string;
  email: string;
  businessType: string;
  submittedAt: any;
  status: string;
};

type ComplaintEntry = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  customerType: string;
  problem: string;
  submittedAt: any;
  status: string;
};

type LaunchEntry = {
  id: string;
  name: string;
  createdAt: any;
};

type CareerEntry = {
  id: string;
  position: string;
  experience: string;
  mode: string;
  salary: string;
  submittedAt: any;
};

type CandidateApplicationEntry = {
  id: string;
  jobId: string;
  jobPosition: string;
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  experience: string;
  location: string;
  submittedAt: any;
};

export default function AdminPanel() {
  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Dashboard States
  const [activeTab, setActiveTab] = useState<'projects' | 'ideas' | 'offers' | 'offer_leads' | 'complaints' | 'launches' | 'careers' | 'applications'>('projects');
  
  const [projects, setProjects] = useState<ProjectEntry[]>([]);
  const [ideas, setIdeas] = useState<IdeaEntry[]>([]);
  const [offers, setOffers] = useState<OfferEntry[]>([]);
  const [offerLeads, setOfferLeads] = useState<OfferLeadEntry[]>([]);
  const [complaints, setComplaints] = useState<ComplaintEntry[]>([]);
  const [launches, setLaunches] = useState<LaunchEntry[]>([]);
  const [careers, setCareers] = useState<CareerEntry[]>([]);
  const [candidateApplications, setCandidateApplications] = useState<CandidateApplicationEntry[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<IdeaEntry | null>(null);

  // New Offer Form State
  const [newOffer, setNewOffer] = useState({ title: '', price: '', features: '', posterUrl: '' });
  const [isCreatingOffer, setIsCreatingOffer] = useState(false);

  // New Launch Form State
  const [newLaunchName, setNewLaunchName] = useState('');
  const [isCreatingLaunch, setIsCreatingLaunch] = useState(false);

  // New Career Form State
  const [newCareer, setNewCareer] = useState({ position: '', experience: '', mode: 'Hybrid', salary: '' });
  const [isCreatingCareer, setIsCreatingCareer] = useState(false);

  // Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'flyggoagency@gmail.com' && password === 'Flyggo@8') {
      setIsAuthenticated(true);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'projects') {
        const q = query(collection(db, 'start_projects'), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: ProjectEntry[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as ProjectEntry);
        });
        setProjects(fetched);
      } else if (activeTab === 'ideas') {
        const q = query(collection(db, 'investment_ideas'), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: IdeaEntry[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as IdeaEntry);
        });
        setIdeas(fetched);
      } else if (activeTab === 'offers') {
        const q = query(collection(db, 'offers'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: OfferEntry[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as OfferEntry);
        });
        setOffers(fetched);
      } else if (activeTab === 'offer_leads') {
        const q = query(collection(db, 'offer_leads'), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: OfferLeadEntry[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as OfferLeadEntry);
        });
        setOfferLeads(fetched);
      } else if (activeTab === 'complaints') {
        const q = query(collection(db, 'complaints'), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: ComplaintEntry[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as ComplaintEntry);
        });
        setComplaints(fetched);
      } else if (activeTab === 'launches') {
        const q = query(collection(db, 'launches'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: LaunchEntry[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as LaunchEntry);
        });
        setLaunches(fetched);
      } else if (activeTab === 'careers') {
        const q = query(collection(db, 'career_applications'), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: CareerEntry[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as CareerEntry);
        });
        setCareers(fetched);
      } else if (activeTab === 'applications') {
        const q = query(collection(db, 'candidate_applications'), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetched: CandidateApplicationEntry[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as CandidateApplicationEntry);
        });
        setCandidateApplications(fetched);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (collectionName: string, id: string) => {
    if (!window.confirm("Are you sure you want to delete this record? This action cannot be undone.")) return;
    
    try {
      await deleteDoc(doc(db, collectionName, id));
      if (collectionName === 'start_projects') {
        setProjects(projects.filter(p => p.id !== id));
      } else if (collectionName === 'investment_ideas') {
        setIdeas(ideas.filter(i => i.id !== id));
      } else if (collectionName === 'offers') {
        setOffers(offers.filter(o => o.id !== id));
      } else if (collectionName === 'offer_leads') {
        setOfferLeads(offerLeads.filter(l => l.id !== id));
      } else if (collectionName === 'complaints') {
        setComplaints(complaints.filter(c => c.id !== id));
      } else if (collectionName === 'launches') {
        setLaunches(launches.filter(l => l.id !== id));
      } else if (collectionName === 'career_applications') {
        setCareers(careers.filter(c => c.id !== id));
      } else if (collectionName === 'candidate_applications') {
        setCandidateApplications(candidateApplications.filter(a => a.id !== id));
      }
    } catch (err) {
      console.error("Error deleting document:", err);
      alert("Failed to delete record.");
    }
  };

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingOffer(true);
    try {
      const featuresArray = newOffer.features.split(',').map(f => f.trim()).filter(f => f);
      const docRef = await addDoc(collection(db, 'offers'), {
        title: newOffer.title,
        price: newOffer.price,
        features: featuresArray,
        posterUrl: newOffer.posterUrl,
        createdAt: serverTimestamp()
      });
      
      setOffers([{
        id: docRef.id,
        title: newOffer.title,
        price: newOffer.price,
        features: featuresArray,
        posterUrl: newOffer.posterUrl,
        createdAt: new Date()
      }, ...offers]);
      
      setNewOffer({ title: '', price: '', features: '', posterUrl: '' });
      alert("Offer created successfully!");
    } catch (err) {
      console.error("Error creating offer", err);
      alert("Failed to create offer.");
    } finally {
      setIsCreatingOffer(false);
    }
  };

  const handleCreateLaunch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLaunchName.trim()) return;
    setIsCreatingLaunch(true);
    try {
      const docRef = await addDoc(collection(db, 'launches'), {
        name: newLaunchName.trim(),
        createdAt: serverTimestamp()
      });
      
      setLaunches([{
        id: docRef.id,
        name: newLaunchName.trim(),
        createdAt: new Date()
      }, ...launches]);
      
      setNewLaunchName('');
    } catch (err) {
      console.error("Error creating launch", err);
      alert("Failed to add launch.");
    } finally {
      setIsCreatingLaunch(false);
    }
  };

  const handleCreateCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCareer.position.trim() || !newCareer.salary.trim()) return;
    setIsCreatingCareer(true);
    try {
      const docRef = await addDoc(collection(db, 'career_applications'), {
        ...newCareer,
        submittedAt: serverTimestamp()
      });
      
      setCareers([{
        id: docRef.id,
        ...newCareer,
        submittedAt: { toDate: () => new Date() }
      } as unknown as CareerEntry, ...careers]);
      
      setNewCareer({ position: '', experience: '', mode: 'Hybrid', salary: '' });
      alert("Career record added successfully!");
    } catch (err) {
      console.error("Error adding career", err);
      alert("Failed to add career record.");
    } finally {
      setIsCreatingCareer(false);
    }
  };

  const copyOfferLink = (offerId: string) => {
    const url = `${window.location.origin}/offers/${offerId}`;
    navigator.clipboard.writeText(url);
    alert(`Copied link to clipboard: \n${url}`);
  };

  // Fetch when authenticated or when tab changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center font-['Inter'] relative overflow-hidden px-4">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_111401_56af5012-2263-45d3-849a-8688084d7c2a.png&w=1920&q=85")',
            filter: 'brightness(0.4) blur(10px)',
            transform: 'scale(1.1)' 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#03010b]/60 to-[#03010b]/90 z-0 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-3xl border border-white/20 p-10 rounded-[2rem] shadow-[0_0_80px_rgba(160,104,255,0.2)] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />

          <div className="flex flex-col items-center mb-10 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-[#A068FF] to-[#6FFF00] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#A068FF]/30">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <span className="font-['Urbanist'] text-3xl font-bold text-white tracking-tight mb-2">Flyggo Admin</span>
            <p className="text-white/60 text-sm font-medium uppercase tracking-widest">Secure Portal Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#A068FF] focus:ring-1 focus:ring-[#A068FF] focus:bg-black/50 transition-all text-sm"
                placeholder="agency@flyggo.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#A068FF] focus:ring-1 focus:ring-[#A068FF] focus:bg-black/50 transition-all text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-sm text-center bg-red-500/10 py-3 rounded-lg border border-red-500/20"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#A068FF] to-[#8e54eb] text-white font-bold tracking-wide py-4 rounded-xl hover:shadow-[0_0_30px_rgba(160,104,255,0.4)] transition-all hover:scale-[1.02] mt-2"
            >
              Authenticate
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // DASHBOARD SCREEN
  return (
    <div className="min-h-screen bg-[#03010b] text-white font-['Inter']">
      
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center gap-6 min-w-max">
            <span className="font-['Urbanist'] text-2xl font-bold tracking-tight pr-4 border-r border-white/10">Flyggo Admin</span>
            
            {/* Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'projects' ? 'bg-[#A068FF]/20 text-[#A068FF]' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                START PROJECTS
              </button>
              <button
                onClick={() => setActiveTab('ideas')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'ideas' ? 'bg-[#FBE5B4]/20 text-[#FBE5B4]' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                INVESTMENT IDEAS
              </button>
              <button
                onClick={() => setActiveTab('offers')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'offers' ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                MANAGE OFFERS
              </button>
              <button
                onClick={() => setActiveTab('offer_leads')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'offer_leads' ? 'bg-green-500/20 text-green-400' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                OFFER LEADS
              </button>
              <button
                onClick={() => setActiveTab('complaints')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'complaints' ? 'bg-red-500/20 text-red-400' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                COMPLAINTS
              </button>
              <button
                onClick={() => setActiveTab('launches')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'launches' ? 'bg-orange-500/20 text-orange-400' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                LAUNCHES
              </button>
              <button
                onClick={() => setActiveTab('careers')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'careers' ? 'bg-pink-500/20 text-pink-400' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                JOB POSTINGS
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'applications' ? 'bg-[#A068FF]/20 text-[#A068FF]' : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                APPLICATIONS
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-sm text-white/60 hover:text-white transition-colors min-w-max ml-6"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto px-6 py-12">
        
        {/* Page Title & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {activeTab === 'projects' && 'Registered Projects'}
              {activeTab === 'ideas' && 'Investment Ideas'}
              {activeTab === 'offers' && 'Manage Special Offers'}
              {activeTab === 'offer_leads' && 'Offer Form Leads'}
              {activeTab === 'complaints' && 'Urgent Complaints'}
              {activeTab === 'launches' && 'Managed Ticker Launches'}
              {activeTab === 'careers' && 'Career Applications'}
            </h1>
            <p className="text-white/60">
              {activeTab === 'projects' && "Overview of all clients who have submitted a 'Start Project' request."}
              {activeTab === 'ideas' && "Overview of all pitches submitted via the 'Investing' page."}
              {activeTab === 'offers' && "Create and manage custom offers to generate unique landing page links."}
              {activeTab === 'offer_leads' && "View all the people who filled out the form on your custom offer links."}
              {activeTab === 'complaints' && "Client complaints and service requests requiring immediate action."}
              {activeTab === 'launches' && "Manage the company names scrolling on the main page ticker."}
              {activeTab === 'careers' && "Create and manage job openings on your careers page."}
              {activeTab === 'applications' && "Review candidates who applied to join the Flyggo team."}
            </p>
          </div>
          <button 
            onClick={fetchData}
            className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            Refresh Data
          </button>
        </div>

        {/* Offers Manager Form */}
        {activeTab === 'offers' && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4">Create New Offer</h3>
            <form onSubmit={handleCreateOffer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Offer Title</label>
                <input type="text" required value={newOffer.title} onChange={e => setNewOffer({...newOffer, title: e.target.value})} placeholder="e.g. Professional Website" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/20 focus:border-cyan-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Price Label</label>
                <input type="text" required value={newOffer.price} onChange={e => setNewOffer({...newOffer, price: e.target.value})} placeholder="e.g. ₹8999" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/20 focus:border-cyan-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Features (comma separated)</label>
                <input type="text" required value={newOffer.features} onChange={e => setNewOffer({...newOffer, features: e.target.value})} placeholder="e.g. Free Domain, Hosting, 5 Pages" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/20 focus:border-cyan-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Poster Image URL (Optional)</label>
                <input type="text" value={newOffer.posterUrl} onChange={e => setNewOffer({...newOffer, posterUrl: e.target.value})} placeholder="https://..." className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/20 focus:border-cyan-500 outline-none text-sm" />
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button type="submit" disabled={isCreatingOffer} className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-2 rounded-lg text-sm transition-colors disabled:opacity-50">
                  {isCreatingOffer ? 'Creating...' : 'Create Offer'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Create Launch Form */}
        {activeTab === 'launches' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Add New Launch
            </h2>
            <form onSubmit={handleCreateLaunch} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Company Name</label>
                <input
                  type="text"
                  required
                  value={newLaunchName}
                  onChange={e => setNewLaunchName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors"
                  placeholder="e.g. THEBARBACK"
                />
              </div>
              <button
                type="submit"
                disabled={isCreatingLaunch}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap w-full md:w-auto"
              >
                {isCreatingLaunch ? 'Adding...' : 'Add Launch'}
              </button>
            </form>
          </div>
        )}

        {/* Create Career Form */}
        {activeTab === 'careers' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-400"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
              Add New Career Record
            </h2>
            <form onSubmit={handleCreateCareer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Position</label>
                <input type="text" required value={newCareer.position} onChange={e => setNewCareer({...newCareer, position: e.target.value})} placeholder="e.g. Telecaller" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Experience Required</label>
                <input type="text" required value={newCareer.experience} onChange={e => setNewCareer({...newCareer, experience: e.target.value})} placeholder="e.g. 2+ Years" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Mode</label>
                <select required value={newCareer.mode} onChange={e => setNewCareer({...newCareer, mode: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50 appearance-none">
                  <option value="Hybrid">Hybrid</option>
                  <option value="Offline">Offline</option>
                  <option value="Online">Online</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Expected Salary</label>
                <input type="text" required value={newCareer.salary} onChange={e => setNewCareer({...newCareer, salary: e.target.value})} placeholder="e.g. $50,000 / ₹40,000" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500/50" />
              </div>
              <div className="md:col-span-2 lg:col-span-2 flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={isCreatingCareer}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-colors disabled:opacity-50"
                >
                  {isCreatingCareer ? 'Saving...' : 'Post Job Record'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-max">
              
              {/* TABLE HEADER */}
              <thead className="bg-black/40 text-white/60 border-b border-white/10">
                <tr>
                  {activeTab === 'projects' && (
                    <>
                      <th className="px-6 py-4 font-medium">Tracking ID</th>
                      <th className="px-6 py-4 font-medium">Business / Client</th>
                      <th className="px-6 py-4 font-medium">Size</th>
                      <th className="px-6 py-4 font-medium">Requested Services</th>
                      <th className="px-6 py-4 font-medium">Contact</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Actions</th>
                    </>
                  )}
                  {activeTab === 'ideas' && (
                    <>
                      <th className="px-6 py-4 font-medium">Tracking ID</th>
                      <th className="px-6 py-4 font-medium">Topic</th>
                      <th className="px-6 py-4 font-medium">Actions</th>
                      <th className="px-6 py-4 font-medium">Contact</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </>
                  )}
                  {activeTab === 'offers' && (
                    <>
                      <th className="px-6 py-4 font-medium">Offer ID</th>
                      <th className="px-6 py-4 font-medium">Title</th>
                      <th className="px-6 py-4 font-medium">Price</th>
                      <th className="px-6 py-4 font-medium">Features</th>
                      <th className="px-6 py-4 font-medium">Actions</th>
                    </>
                  )}
                  {activeTab === 'offer_leads' && (
                    <>
                      <th className="px-6 py-4 font-medium">Offer Title</th>
                      <th className="px-6 py-4 font-medium">Client Name</th>
                      <th className="px-6 py-4 font-medium">Business Type</th>
                      <th className="px-6 py-4 font-medium">Contact Info</th>
                      <th className="px-6 py-4 font-medium">Actions</th>
                    </>
                  )}
                  {activeTab === 'complaints' && (
                    <>
                      <th className="px-6 py-4 font-medium">Name</th>
                      <th className="px-6 py-4 font-medium">Contact</th>
                      <th className="px-6 py-4 font-medium">Customer Type</th>
                      <th className="px-6 py-4 font-medium">Problem</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Actions</th>
                    </>
                  )}
                  {activeTab === 'launches' && (
                    <>
                      <th className="px-6 py-4 font-medium">Company Name</th>
                      <th className="px-6 py-4 font-medium w-32">Actions</th>
                    </>
                  )}
                  {activeTab === 'careers' && (
                    <>
                      <th className="px-6 py-4 font-medium">Position</th>
                      <th className="px-6 py-4 font-medium">Experience</th>
                      <th className="px-6 py-4 font-medium">Mode</th>
                      <th className="px-6 py-4 font-medium">Expected Salary</th>
                      <th className="px-6 py-4 font-medium">Posted</th>
                      <th className="px-6 py-4 font-medium w-32">Actions</th>
                    </>
                  )}
                  {activeTab === 'applications' && (
                    <>
                      <th className="px-6 py-4 font-medium">Candidate</th>
                      <th className="px-6 py-4 font-medium">Contact</th>
                      <th className="px-6 py-4 font-medium">Details</th>
                      <th className="px-6 py-4 font-medium">Experience</th>
                      <th className="px-6 py-4 font-medium">Applied Date</th>
                      <th className="px-6 py-4 font-medium w-32">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              
              {/* TABLE BODY */}
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-white/40">
                      Loading data...
                    </td>
                  </tr>
                ) : (
                  activeTab === 'projects' && projects.length === 0 ||
                  activeTab === 'ideas' && ideas.length === 0 ||
                  activeTab === 'offers' && offers.length === 0 ||
                  activeTab === 'offer_leads' && offerLeads.length === 0 ||
                  activeTab === 'complaints' && complaints.length === 0 ||
                  activeTab === 'launches' && launches.length === 0 ||
                  activeTab === 'careers' && careers.length === 0 ||
                  activeTab === 'applications' && candidateApplications.length === 0
                ) ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-white/40">
                      No records found.
                    </td>
                  </tr>
                ) : (
                  <>
                    {/* START PROJECTS */}
                    {activeTab === 'projects' && projects.map((project) => (
                      <tr key={project.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-[#A068FF] bg-[#A068FF]/10 px-2 py-1 rounded border border-[#A068FF]/20 tracking-wider">
                            {project.id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{project.businessName}</div>
                        </td>
                        <td className="px-6 py-4 text-white/80">
                          {project.businessSize.replace('_', ' ')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {project.services?.map(s => (
                              <span key={s} className="bg-white/10 text-xs px-2 py-1 rounded text-white/80">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <a href={`mailto:${project.email}`} className="text-[#A068FF] hover:underline">{project.email}</a>
                            <span className="text-white/60">{project.phone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded">
                            {project.status?.toUpperCase() || 'NEW'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleDelete('start_projects', project.id)}
                            className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 px-3 py-1 rounded text-xs font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                    {/* INVESTMENT IDEAS */}
                    {activeTab === 'ideas' && ideas.map((idea) => (
                      <tr key={idea.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-[#FBE5B4] bg-[#FBE5B4]/10 px-2 py-1 rounded border border-[#FBE5B4]/20 tracking-wider">
                            {idea.id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{idea.topic}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setSelectedIdea(idea)}
                              className="bg-[#FBE5B4]/10 text-[#FBE5B4] hover:bg-[#FBE5B4]/20 border border-[#FBE5B4]/20 px-3 py-1 rounded text-xs font-semibold transition-colors"
                            >
                              Details
                            </button>
                            <button 
                              onClick={() => handleDelete('investment_ideas', idea.id)}
                              className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 px-3 py-1 rounded text-xs font-semibold transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <a href={`mailto:${idea.email}`} className="text-[#FBE5B4] hover:underline">{idea.email}</a>
                            <span className="text-white/60">{idea.phone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded">
                            {idea.status?.toUpperCase() || 'NEW'}
                          </span>
                        </td>
                      </tr>
                    ))}

                    {/* OFFERS CONFIG */}
                    {activeTab === 'offers' && offers.map((offer) => (
                      <tr key={offer.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded border border-cyan-400/20 tracking-wider">
                            {offer.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-white">{offer.title}</td>
                        <td className="px-6 py-4 text-emerald-400 font-bold">{offer.price}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {offer.features?.map(f => (
                              <span key={f} className="bg-white/10 text-xs px-2 py-1 rounded text-white/80">
                                {f}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => copyOfferLink(offer.id)}
                              className="bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/20 px-3 py-1 rounded text-xs font-semibold transition-colors"
                            >
                              Copy Link
                            </button>
                            <button 
                              onClick={() => handleDelete('offers', offer.id)}
                              className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 px-3 py-1 rounded text-xs font-semibold transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {/* OFFER LEADS */}
                    {activeTab === 'offer_leads' && offerLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-cyan-400">{lead.offerTitle}</div>
                          <div className="text-xs text-white/40 mt-1 font-mono">Offer ID: {lead.offerId}</div>
                        </td>
                        <td className="px-6 py-4 font-bold text-white">{lead.name}</td>
                        <td className="px-6 py-4">
                          <span className="bg-white/10 text-xs px-2 py-1 rounded text-white/80 capitalize">
                            {lead.businessType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <a href={`mailto:${lead.email}`} className="text-cyan-400 hover:underline">{lead.email}</a>
                            <span className="text-white/60">{lead.phone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleDelete('offer_leads', lead.id)}
                            className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 px-3 py-1 rounded text-xs font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}

                    {/* COMPLAINTS */}
                    {activeTab === 'complaints' && complaints.map((complaint) => (
                      <tr key={complaint.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">{complaint.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1 text-sm">
                            <a href={`mailto:${complaint.email}`} className="text-cyan-400 hover:underline">{complaint.email || 'N/A'}</a>
                            <span className="text-white/60">{complaint.phone || 'N/A'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${complaint.customerType === 'New Customer' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {complaint.customerType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/80 max-w-sm truncate">
                          {complaint.problem}
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                            {complaint.status || 'PENDING'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                // Re-using selectedIdea for complaints detail modal view to save time, 
                                // wait, we don't have a complaint detail modal. Let's just alert for now.
                                alert(`Problem:\n\n${complaint.problem}`);
                              }}
                              className="bg-white/10 text-white hover:bg-white/20 border border-white/20 px-3 py-1 rounded text-xs font-semibold transition-colors"
                            >
                              Read Issue
                            </button>
                            <button 
                              onClick={() => handleDelete('complaints', complaint.id)}
                              className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 px-3 py-1 rounded text-xs font-semibold transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
                
                {activeTab === 'launches' && (
                  <>
                    {launches.map((launch) => (
                      <tr key={launch.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-white font-medium">{launch.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleDelete('launches', launch.id)}
                            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
                
                {activeTab === 'applications' && (
                  <>
                    {candidateApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-white font-bold">{app.name}</div>
                          <div className="text-xs text-[#A068FF] mt-1 font-semibold uppercase tracking-wider">{app.jobPosition}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/70">
                          <div><a href={`mailto:${app.email}`} className="text-cyan-400 hover:underline">{app.email}</a></div>
                          <div>{app.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/70">
                          <div><span className="text-white/40">Age:</span> {app.age}</div>
                          <div><span className="text-white/40">Gender:</span> {app.gender}</div>
                          <div><span className="text-white/40">Loc:</span> {app.location}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/70 max-w-[250px]">
                          <div className="line-clamp-3" title={app.experience}>{app.experience}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/50">
                          {app.submittedAt?.toDate().toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleDelete('candidate_applications', app.id)}
                            className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 px-3 py-1 rounded text-xs font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
                
                {activeTab === 'careers' && (
                  <>
                    {careers.map((career) => (
                      <tr key={career.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">
                          {career.position}
                        </td>
                        <td className="px-6 py-4 text-sm text-white/70">
                          {career.experience}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="bg-pink-500/20 text-pink-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                            {career.mode}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-green-400 font-medium">
                          {career.salary}
                        </td>
                        <td className="px-6 py-4 text-sm text-white/50">
                          {career.submittedAt?.toDate().toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleDelete('career_applications', career.id)}
                            className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 px-3 py-1 rounded text-xs font-semibold transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Idea Details Modal */}
      <AnimatePresence>
        {selectedIdea && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIdea(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#060218] border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="font-mono text-xs text-[#FBE5B4] bg-[#FBE5B4]/10 px-2 py-1 rounded border border-[#FBE5B4]/20 tracking-wider mb-3 inline-block">
                      {selectedIdea.id}
                    </span>
                    <h2 className="text-2xl font-bold text-white">{selectedIdea.topic}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedIdea(null)}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Full Description</h4>
                    <div className="bg-white/5 rounded-lg p-4 text-white/80 leading-relaxed border border-white/5 text-sm max-h-[300px] overflow-y-auto whitespace-pre-wrap">
                      {selectedIdea.description}
                    </div>
                  </div>
                  
                  <div className="flex gap-8 border-t border-white/10 pt-6">
                    <div>
                      <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Email</h4>
                      <a href={`mailto:${selectedIdea.email}`} className="text-[#FBE5B4] hover:underline text-sm">{selectedIdea.email}</a>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Phone</h4>
                      <span className="text-white/80 text-sm">{selectedIdea.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
