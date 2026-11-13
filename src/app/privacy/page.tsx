import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Flyggo collects, uses, and protects your personal information.",
  alternates: {
    canonical: "https://flyggo.com/privacy",
  },
};

export default function Page() {
  return (
    <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold capitalize text-gray-400 tracking-tight">{ "privacy" }</h1>
    </main>
  );
}
