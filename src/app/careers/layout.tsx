import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Flyggo team. Explore career opportunities in technology, design, and product development.",
  alternates: {
    canonical: "https://flyggo.com/careers",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
