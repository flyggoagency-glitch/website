import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Begin your project with Flyggo. Share your requirements and let our experts architect your digital solution.",
  alternates: {
    canonical: "https://flyggo.com/start-project",
  },
};

export default function StartProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
