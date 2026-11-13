import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a Complaint",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComplaintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
