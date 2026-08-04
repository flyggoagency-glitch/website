import Link from "next/link";
import { ArrowRight } from "lucide-react";

const apps = [
  { name: "Web App Dev", desc: "Custom web applications built for scale and performance.", color: "bg-blue-500" },
  { name: "Mobile Apps", desc: "Native and cross-platform apps for iOS and Android.", color: "bg-green-500" },
  { name: "SaaS Platforms", desc: "Multi-tenant architectures and subscription management.", color: "bg-red-500" },
  { name: "Enterprise AI", desc: "Integrate intelligent automation and LLMs into workflows.", color: "bg-purple-500" },
  { name: "Cloud Infra", desc: "Secure, scalable cloud deployments on AWS and Azure.", color: "bg-yellow-500" },
  { name: "UI/UX Design", desc: "User-centric interfaces that drive engagement.", color: "bg-pink-500" },
];

export function ServicesSuite() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">A complete suite of engineering services</h2>
          <p className="text-lg text-gray-600">
            Flyggo provides everything you need to build, launch, and scale your digital products. No need to manage multiple vendors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app, i) => (
            <Link key={i} href="/services" className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow group">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-lg ${app.color} flex items-center justify-center text-white text-xl font-bold shadow-sm`}>
                  {app.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-brand-blue transition-colors">{app.name}</h3>
                  <div className="flex items-center text-sm font-semibold text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{app.desc}</p>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
           <Link href="/services" className="inline-block bg-white text-brand-blue border border-gray-300 font-semibold px-8 py-3 rounded-sm hover:bg-gray-50 transition-colors">
              View All Products & Services
           </Link>
        </div>
      </div>
    </section>
  );
}
