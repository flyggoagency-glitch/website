import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description: "Schedule a consultation with Flyggo to discuss your digital product, AI automation, or custom software requirements.",
  alternates: {
    canonical: "https://flyggo.com/book-consultation",
  },
};

export default function Page() {
  return (
    <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold capitalize text-gray-400 tracking-tight">{ "book consultation" }</h1>
    </main>
  );
}
