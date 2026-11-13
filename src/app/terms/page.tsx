import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions governing the use of Flyggo products and services.",
  alternates: {
    canonical: "https://flyggo.com/terms",
  },
};

export default function Page() {
  return (
    <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold capitalize text-gray-400 tracking-tight">{ "terms" }</h1>
    </main>
  );
}
