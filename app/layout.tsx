import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/shell/AppShell";
import { ThemeProvider } from "@/components/context/ThemeContext";

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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('yt-portfolio-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-[#0f0f0f] text-[#0f0f0f] dark:text-[#f1f1f1]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-white dark:focus:bg-[#212121] focus:text-[#0f0f0f] dark:focus:text-[#f1f1f1] focus:px-3 focus:py-1 focus:rounded focus:border focus:border-[#e5e5e5] dark:focus:border-[#383838] focus:text-sm"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
