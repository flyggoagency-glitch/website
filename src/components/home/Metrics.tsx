const metrics = [
  { value: "250+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Countries Served" },
  { value: "99.9%", label: "System Uptime" },
];

export function Metrics() {
  return (
    <section className="py-12 bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/3">
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted by businesses worldwide</h3>
             <p className="text-gray-600">Delivering reliable enterprise software at scale.</p>
          </div>
          <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
            {metrics.map((metric, i) => (
              <div key={i} className="flex flex-col items-center md:items-start border-l-2 border-brand-blue pl-4">
                <h4 className="text-3xl font-extrabold text-gray-900 mb-1">{metric.value}</h4>
                <p className="text-sm text-gray-500 font-medium">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
