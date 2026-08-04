import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flyggo | Where Brands Learn to Fly",
  description: "Your Global Tech Partner is Just One Click Away. We build websites, mobile apps, saas, and software for MSMEs to large scale enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-['Inter']">
        {children}
      </body>
    </html>
  );
}
