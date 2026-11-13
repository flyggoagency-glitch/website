import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investing",
  description: "Invest in Flyggo or partner with us to accelerate high-impact digital ventures.",
  alternates: {
    canonical: "https://flyggo.com/investing",
  },
};

export default function InvestingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
