import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flyggo Classic",
  description: "Explore Flyggo Classic — our foundational suite of digital and design services.",
  alternates: {
    canonical: "https://flyggo.com/flyggo-classic",
  },
};

export default function FlyggoClassicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
