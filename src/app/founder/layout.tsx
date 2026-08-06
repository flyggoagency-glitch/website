import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nikesh S - Founder & CEO",
  description: "Learn more about Nikesh S, the Founder and CEO of Flyggo. Nikesh is driving innovation in tech, SaaS, and digital product development.",
  keywords: [
    "Nikesh S", 
    "Nikesh Flyggo", 
    "Nikesh S Founder", 
    "Flyggo CEO", 
    "Tech Founder", 
    "Nikesh S CEO", 
    "Flyggo Founder",
    "Nikesh S Entrepreneur"
  ],
  openGraph: {
    title: "Nikesh S - Founder & CEO of Flyggo",
    description: "Learn more about Nikesh S, the visionary behind Flyggo.",
    url: "https://flyggo.com/founder",
    type: "profile",
    images: [
      {
        url: "/images/founder.jpeg",
        width: 800,
        height: 1000,
        alt: "Nikesh S - Founder & CEO, Flyggo",
      },
    ],
  }
};

export default function FounderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
