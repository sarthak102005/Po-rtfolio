"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  GitBranch,
  Link2,
  Mail,
  FileText,
  User,
  X,
} from "lucide-react";
import { profile } from "@/data/profile";

interface TopBarProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

export default function TopBar({ onMenuClick, sidebarOpen }: TopBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // "/" shortcut to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        setProfileOpen(false);
        setNotifOpen(false);
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e5e5e5]"
      style={{ height: "var(--topbar-height)" }}
      role="banner"
    >
      <div className="flex items-center h-full px-4 gap-2 max-w-[2560px] mx-auto">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-[#f2f2f2] transition-colors"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu size={22} strokeWidth={1.8} />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 group select-none"
            aria-label="Sarthak's Portfolio — Home"
          >
            {/* Mini play tile */}
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: 28,
                height: 28,
                background: "#ff0033",
                borderRadius: "20%",
                flexShrink: 0,
              }}
            >
              <svg viewBox="0 0 24 24" fill="white" width={14} height={14} style={{ marginLeft: 2 }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span
              className="font-bold text-[#0f0f0f] leading-none tracking-tight hidden sm:block"
              style={{ fontSize: "clamp(15px, 2vw, 18px)" }}
            >
              Sarthak<span className="text-[#ff0033]">&apos;s</span> Portfolio
            </span>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex-1 flex justify-center px-2 sm:px-4 min-w-0">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full max-w-[600px] h-9"
          >
            <div className="relative flex-1 min-w-0">
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Sarthak's portfolio"
                className="w-full h-9 pl-4 pr-3 text-sm border border-[#d3d3d3] rounded-l-full focus:outline-none focus:border-[#1c62b9] bg-white text-[#0f0f0f] placeholder-[#909090]"
                aria-label="Search portfolio"
              />
            </div>
            <button
              type="submit"
              className="h-9 px-4 border border-l-0 border-[#d3d3d3] rounded-r-full bg-[#f8f8f8] hover:bg-[#f0f0f0] transition-colors flex items-center justify-center flex-shrink-0"
              aria-label="Submit search"
            >
              <Search size={16} strokeWidth={2} className="text-[#0f0f0f]" />
            </button>
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Resume/Hire CTA */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#0f0f0f] text-[#0f0f0f] text-sm font-medium hover:bg-[#0f0f0f] hover:text-white transition-all"
            aria-label="View resume"
          >
            <FileText size={14} />
            <span>Resume</span>
          </a>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); }}
              className="p-2 rounded-full hover:bg-[#f2f2f2] transition-colors relative"
              aria-label="Notifications"
            >
              <Bell size={22} strokeWidth={1.8} />
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-1 w-72 bg-white border border-[#e5e5e5] rounded-xl shadow-lg z-50 py-2">
                <div className="px-4 py-2 text-sm font-semibold text-[#0f0f0f] border-b border-[#f2f2f2]">
                  Updates
                </div>
                <div className="px-4 py-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ff0033] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">S</div>
                    <div>
                      <p className="text-sm text-[#0f0f0f] font-medium">New project added</p>
                      <p className="text-xs text-[#606060]">Quantum Scraper — AI/GenAI</p>
                      <p className="text-xs text-[#909090] mt-0.5">Jun 2026</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-[#f2f2f2]">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ff0033] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">S</div>
                    <div>
                      <p className="text-sm text-[#0f0f0f] font-medium">Internship completed</p>
                      <p className="text-xs text-[#606060]">ShortHills AI — Technology Intern</p>
                      <p className="text-xs text-[#909090] mt-0.5">Aug 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile avatar */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
              className="w-8 h-8 rounded-full bg-[#ff0033] flex items-center justify-center text-white font-bold text-sm hover:ring-2 hover:ring-[#ff0033] hover:ring-offset-1 transition-all"
              aria-label="Profile menu"
              aria-expanded={profileOpen}
            >
              S
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-[#e5e5e5] rounded-xl shadow-lg z-50 overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b border-[#f2f2f2]">
                  <div className="w-10 h-10 rounded-full bg-[#ff0033] flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0f0f0f] truncate">{profile.name.full}</p>
                    <p className="text-xs text-[#606060] truncate">{profile.handle}</p>
                  </div>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <Link
                    href="/about"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] hover:bg-[#f2f2f2] transition-colors"
                  >
                    <User size={16} className="text-[#606060]" />
                    View profile
                  </Link>
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] hover:bg-[#f2f2f2] transition-colors"
                  >
                    <FileText size={16} className="text-[#606060]" />
                    Resume
                  </a>
                  <a
                    href={profile.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] hover:bg-[#f2f2f2] transition-colors"
                  >
                    <GitBranch size={16} className="text-[#606060]" />
                    GitHub
                  </a>
                  <a
                    href={profile.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] hover:bg-[#f2f2f2] transition-colors"
                  >
                    <Link2 size={16} className="text-[#606060]" />
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] hover:bg-[#f2f2f2] transition-colors"
                  >
                    <Mail size={16} className="text-[#606060]" />
                    Contact
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
