import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offers",
  description: "Exclusive digital solution offers from Flyggo for startups and enterprises.",
  alternates: {
    canonical: "https://flyggo.com/offers",
  },
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
