import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Flyggo | Where Brands Learn to Fly",
    template: "%s | Flyggo",
  },
  description: "Your Global Tech Partner is Just One Click Away. We build websites, mobile apps, SaaS, and software for MSMEs to large scale enterprises.",
  keywords: [
    "Flyggo", 
    "Flygo", // Common misspelling
    "Tech Agency", 
    "Web Development Company", 
    "Mobile App Development", 
    "SaaS Development", 
    "Custom Software Solutions",
    "Nikesh S Flyggo",
    "Flyggo Agency"
  ],
  authors: [{ name: "Nikesh S" }],
  creator: "Nikesh S",
  publisher: "Flyggo",
  metadataBase: new URL("https://flyggo.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flyggo.com",
    siteName: "Flyggo",
    title: "Flyggo | Where Brands Learn to Fly",
    description: "Your Global Tech Partner is Just One Click Away. We build websites, mobile apps, SaaS, and software.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flyggo | Global Tech Partner",
    description: "Building the future of tech. Websites, Mobile Apps, SaaS.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
