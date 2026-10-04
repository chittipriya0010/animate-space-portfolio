import type { Metadata } from "next";
import "./globals.css";
import { PortfolioProvider } from "@/components/modern/PortfolioContext";

export const metadata: Metadata = {
  title: "Chittipriya Verma | Mobile Architect & Full-Stack Engineer",
  description:
    "Portfolio of Chittipriya Verma — building high-performance mobile apps in Flutter, scalable full-stack platforms, and AI intelligence systems.",
  keywords: [
    "Chittipriya",
    "Chittipriya Verma",
    "Flutter Developer",
    "React Native",
    "Full-Stack Engineer",
    "Next.js",
    "Mobile App Developer",
    "AI Systems",
    "Rust",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#06080E] text-slate-100 antialiased overflow-x-hidden font-sans">
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}