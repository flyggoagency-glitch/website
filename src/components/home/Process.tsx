const steps = [
  { id: "01", title: "Discovery & Strategy", desc: "We analyze your business processes and identify technological gaps." },
  { id: "02", title: "Architecture Design", desc: "System design, cloud infrastructure planning, and database modeling." },
  { id: "03", title: "Development", desc: "Agile sprints building robust frontend and scalable backend systems." },
  { id: "04", title: "Testing & QA", desc: "Rigorous automated and manual testing for security and performance." },
  { id: "05", title: "Deployment", desc: "Seamless launch with zero downtime and continuous integration." },
];

export function Process() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Enterprise-grade engineering process</h2>
          <p className="text-lg text-gray-600">
            A proven methodology ensuring your software is delivered on time, highly secure, and built to scale infinitely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {/* Horizontal Line connecting steps (visible on md+) */}
          <div className="hidden md:block absolute top-6 left-12 right-12 h-0.5 bg-gray-200 z-0" />
          
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-blue text-brand-blue font-bold flex items-center justify-center mb-6 shadow-sm">
                {step.id}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
