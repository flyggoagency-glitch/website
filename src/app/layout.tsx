import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://flyggo.com"),
  title: {
    default: "Flyggo | AI-Powered Product Solutions",
    template: "%s | Flyggo",
  },
  description: "Flyggo builds AI-powered product solutions, business websites, CRM systems and automation solutions to help businesses grow.",
  applicationName: "Flyggo",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flyggo.com/",
    siteName: "Flyggo",
    title: "Flyggo | AI-Powered Product Solutions",
    description: "Flyggo builds AI-powered product solutions, business websites, CRM systems and automation solutions to help businesses grow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flyggo | AI-Powered Product Solutions",
    description: "Flyggo builds AI-powered product solutions, business websites, CRM systems and automation solutions to help businesses grow.",
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
