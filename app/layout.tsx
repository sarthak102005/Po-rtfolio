import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/shell/AppShell";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Sarthak's Portfolio",
    template: "%s | Sarthak's Portfolio",
  },
  description:
    "Sarthak Makkar — Backend, Full Stack, GenAI Engineer. Production-grade systems and AI applications.",
  keywords: [
    "Sarthak Makkar",
    "Backend Engineer",
    "Full Stack",
    "GenAI",
    "Node.js",
    "FastAPI",
    "RAG",
    "Portfolio",
  ],
  authors: [{ name: "Sarthak Makkar" }],
  openGraph: {
    title: "Sarthak's Portfolio",
    description: "I build reliable production-grade systems and AI applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-white focus:text-[#0f0f0f] focus:px-3 focus:py-1 focus:rounded focus:border focus:border-[#e5e5e5] focus:text-sm"
        >
          Skip to main content
        </a>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
