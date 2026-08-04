import Link from "next/link";
import { ArrowRight } from "lucide-react";

const portfolioItems = [
  { 
    title: "Global ERP System", 
    category: "Manufacturing", 
    desc: "A custom ERP solution integrating supply chain, inventory, and HR for a Fortune 500 manufacturer.",
    color: "bg-blue-100 border-blue-200 text-blue-800"
  },
  { 
    title: "Healthcare Portal", 
    category: "Healthcare", 
    desc: "Secure, HIPAA-compliant patient management system and telehealth video consultation platform.",
    color: "bg-green-100 border-green-200 text-green-800"
  },
  { 
    title: "Fintech App", 
    category: "Finance", 
    desc: "High-frequency trading mobile application with real-time sockets and robust security architecture.",
    color: "bg-purple-100 border-purple-200 text-purple-800"
  }
];

export function PortfolioPreview() {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Empowering industry leaders</h2>
              <p className="text-lg text-gray-600">
                Explore how Flyggo has transformed operations for enterprises across manufacturing, healthcare, and finance.
              </p>
           </div>
           <Link href="/portfolio" className="text-brand-blue font-semibold flex items-center hover:underline mt-4 md:mt-0">
              View all case studies <ArrowRight size={18} className="ml-1" />
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {portfolioItems.map((item, i) => (
             <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-100 border-b border-gray-200 p-6 flex flex-col justify-end">
                   {/* Mock UI Graphic inside */}
                   <div className="w-full h-32 bg-white rounded-t-md shadow-sm border border-gray-200 p-4">
                      <div className="w-1/2 h-4 bg-gray-200 rounded-sm mb-4" />
                      <div className="flex gap-2">
                        <div className="w-1/3 h-16 bg-gray-100 rounded-sm" />
                        <div className="w-1/3 h-16 bg-gray-100 rounded-sm" />
                        <div className="w-1/3 h-16 bg-gray-100 rounded-sm" />
                      </div>
                   </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                   <div className={`text-xs font-bold uppercase tracking-wider mb-2 inline-block px-2 py-1 rounded-sm border ${item.color} w-max`}>
                      {item.category}
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                   <p className="text-gray-600 text-sm mb-6 flex-grow">{item.desc}</p>
                   <Link href="/case-studies" className="text-brand-blue font-semibold text-sm hover:underline">
                      Read Case Study
                   </Link>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
