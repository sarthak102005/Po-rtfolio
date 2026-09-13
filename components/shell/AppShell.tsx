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
  // Desktop sidebar pinned state (can be remembered on desktop)
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  // Mobile drawer state — MUST ALWAYS BE FALSE ON INITIAL LOAD
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initial scroll position must be top of page (Requirement 16)
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    // Restore desktop sidebar state from localStorage only if screen is desktop width
    try {
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        const saved = localStorage.getItem(SIDEBAR_KEY);
        if (saved !== null) setDesktopSidebarOpen(saved === "true");
      }
    } catch {}

    // Check if splash already shown this session
    try {
      const shown = sessionStorage.getItem(SPLASH_KEY);
      if (shown) setSplashDone(true);
    } catch {
      setSplashDone(true);
    }
  }, []);

  const handleMenuClick = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      // On mobile, toggle mobile drawer (always starts closed)
      setMobileDrawerOpen((prev) => !prev);
    } else {
      // On desktop, toggle pinned desktop sidebar
      setDesktopSidebarOpen((prev) => {
        const next = !prev;
        try {
          localStorage.setItem(SIDEBAR_KEY, String(next));
        } catch {}
        return next;
      });
    }
  }, []);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
    try {
      sessionStorage.setItem(SPLASH_KEY, "true");
    } catch {}
  }, []);

  // Main content left offset based on desktop sidebar state
  const contentLeft = desktopSidebarOpen ? 240 : 72;

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
        className="min-h-screen bg-white dark:bg-[#0f0f0f] text-[#0f0f0f] dark:text-[#f1f1f1] transition-colors duration-200"
        style={{ opacity: splashDone ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <TopBar
          onMenuClick={handleMenuClick}
          sidebarOpen={desktopSidebarOpen}
          mobileMenuOpen={mobileDrawerOpen}
        />

        <GuideSidebar
          open={desktopSidebarOpen}
          onClose={() => setDesktopSidebarOpen(false)}
          mobileOpen={mobileDrawerOpen}
          onMobileClose={() => setMobileDrawerOpen(false)}
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
