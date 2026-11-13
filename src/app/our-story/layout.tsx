import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The story of Flyggo — how we started, our milestones, and our vision for empowering businesses worldwide.",
  alternates: {
    canonical: "https://flyggo.com/our-story",
  },
};

export default function OurStoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
