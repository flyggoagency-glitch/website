import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, updates, and thought leadership from Flyggo on digital products, AI, and business growth.",
  alternates: {
    canonical: "https://flyggo.com/blog",
  },
};

export default function Page() {
  return (
    <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold capitalize text-gray-400 tracking-tight">{ "blog" }</h1>
    </main>
  );
}
