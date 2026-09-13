"use client";

import { useState, useEffect, useCallback } from "react";
import TopBar from "./TopBar";
import GuideSidebar from "./GuideSidebar";
import MobileBottomNav from "./MobileBottomNav";
import SplashScreen from "../ui/SplashScreen";

const SIDEBAR_KEY = "yt-portfolio-sidebar";
const SPLASH_KEY = "yt-portfolio-splash-shown";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [splashDone, setSplashDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Restore sidebar state from localStorage
    try {
      const saved = localStorage.getItem(SIDEBAR_KEY);
      if (saved !== null) setSidebarOpen(saved === "true");
    } catch {}

    // Check if splash already shown this session
    try {
      const shown = sessionStorage.getItem(SPLASH_KEY);
      if (shown) setSplashDone(true);
    } catch {
      setSplashDone(true);
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => {
      const next = !prev;
      try { localStorage.setItem(SIDEBAR_KEY, String(next)); } catch {}
      return next;
    });
  }, []);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
    try { sessionStorage.setItem(SPLASH_KEY, "true"); } catch {}
  }, []);

  // Main content left offset based on sidebar state (desktop only)
  const contentLeft = sidebarOpen ? 240 : 72;

  if (!mounted) {
    // SSR / hydration placeholder — show nothing to avoid flash
    return null;
  }

  return (
    <>
      {/* Splash (one-time per session) */}
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}

      {/* App shell (rendered behind splash, fades in after) */}
      <div
        className="min-h-screen bg-white"
        style={{ opacity: splashDone ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <TopBar onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />

        <GuideSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content area — offset for desktop sidebar */}
        <main
          id="main-content"
          className="min-h-screen"
          style={{
            paddingTop: "var(--topbar-height)",
            paddingBottom: 56, // space for mobile bottom nav
          }}
        >
          {/* Desktop: offset by sidebar width */}
          <div
            className="hidden md:block"
            style={{ paddingLeft: contentLeft, transition: "padding-left 200ms ease" }}
          >
            {children}
          </div>
          {/* Mobile: no sidebar offset */}
          <div className="md:hidden">{children}</div>
        </main>

        <MobileBottomNav />
      </div>
    </>
  );
}
