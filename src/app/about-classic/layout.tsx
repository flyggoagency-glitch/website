import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Classic",
  description: "Learn about Flyggo Classic services and our heritage of digital craft.",
  alternates: {
    canonical: "https://flyggo.com/about-classic",
  },
};

export default function AboutClassicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
