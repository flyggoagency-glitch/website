import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Flyggo team. We are here to answer your questions and start your project.",
  alternates: {
    canonical: "https://flyggo.com/contact",
  },
};

export default function Page() {
  return (
    <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold capitalize text-gray-400 tracking-tight">{ "contact" }</h1>
    </main>
  );
}
