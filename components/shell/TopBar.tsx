"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  GitBranch,
  Link2,
  Mail,
  FileText,
  User,
  Sun,
  Moon,
  ArrowRight,
  ExternalLink,
  ArrowLeft,
  X,
} from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { searchSidebarItems, SidebarSearchItem } from "@/data/sidebarSearch";
import { useTheme } from "@/components/context/ThemeContext";

interface TopBarProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
  mobileMenuOpen?: boolean;
}

export default function TopBar({
  onMenuClick,
  sidebarOpen,
  mobileMenuOpen = false,
}: TopBarProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileSearchActive, setMobileSearchActive] = useState(false);

  const desktopSearchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchTriggerRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Suggestions for search dropdown
  const suggestions = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { projects: [], sidebarItems: [] };

    const matchedProjects = projects
      .filter((p) => p.name.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q))
      .slice(0, 4);

    const matchedSidebar = searchSidebarItems(q).slice(0, 4);

    return { projects: matchedProjects, sidebarItems: matchedSidebar };
  }, [query]);

  const hasSuggestions =
    query.trim().length > 0 &&
    (suggestions.projects.length > 0 || suggestions.sidebarItems.length > 0);

  // Unified flat list of dropdown items for keyboard navigation
  const allItems = useMemo(() => {
    const items: Array<
      | { type: "sidebar"; data: SidebarSearchItem }
      | { type: "project"; data: typeof projects[0] }
      | { type: "view_all" }
    > = [];

    suggestions.sidebarItems.forEach((item) => {
      items.push({ type: "sidebar", data: item });
    });
    suggestions.projects.forEach((item) => {
      items.push({ type: "project", data: item });
    });
    if (query.trim().length > 0) {
      items.push({ type: "view_all" });
    }
    return items;
  }, [suggestions, query]);

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Reset selectedIndex when suggestions change or dropdown closes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [query, isDropdownOpen]);

  // Keyboard shortcut "/" to focus search and Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        if (window.innerWidth < 768) {
          setMobileSearchActive(true);
          setTimeout(() => mobileSearchRef.current?.focus(), 50);
        } else {
          desktopSearchRef.current?.focus();
        }
      }
      if (e.key === "Escape") {
        if (mobileSearchActive) {
          closeMobileSearch();
        }
        setProfileOpen(false);
        setNotifOpen(false);
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
        desktopSearchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mobileSearchActive]);

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
      }
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

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      setIsDropdownOpen(false);
      setMobileSearchActive(false);
      setSelectedIndex(-1);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectSidebarItem = (item: SidebarSearchItem) => {
    setIsDropdownOpen(false);
    setMobileSearchActive(false);
    setSelectedIndex(-1);
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.href);
    }
  };

  const handleSelectProject = (slug: string) => {
    setIsDropdownOpen(false);
    setMobileSearchActive(false);
    setSelectedIndex(-1);
    router.push(`/project/${slug}`);
  };

  const openMobileSearch = () => {
    setMobileSearchActive(true);
    setIsDropdownOpen(true);
    setTimeout(() => {
      mobileSearchRef.current?.focus();
    }, 60);
  };

  const closeMobileSearch = () => {
    setMobileSearchActive(false);
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
    mobileSearchTriggerRef.current?.focus();
  };

  // Keyboard navigation handler on search input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || allItems.length === 0) {
      if (e.key === "ArrowDown" && hasSuggestions) {
        e.preventDefault();
        setIsDropdownOpen(true);
        setSelectedIndex(0);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < allItems.length ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : allItems.length - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSelectedIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSelectedIndex(allItems.length - 1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (mobileSearchActive) {
        closeMobileSearch();
      } else {
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
      }
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < allItems.length) {
        e.preventDefault();
        const activeItem = allItems[selectedIndex];
        if (activeItem.type === "sidebar") {
          handleSelectSidebarItem(activeItem.data);
        } else if (activeItem.type === "project") {
          handleSelectProject(activeItem.data.slug);
        } else if (activeItem.type === "view_all") {
          handleSearch();
        }
      }
    }
  };

  let desktopItemCursor = 0;
  let mobileItemCursor = 0;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-[#0f0f0f] border-b border-[#e5e5e5] dark:border-[#272727] transition-colors"
      style={{ height: "var(--topbar-height)" }}
      role="banner"
    >
      {/* ========================================================================= */}
      {/* 1. DESKTOP HEADER (md:flex) — APPROVED & 100% UNCHANGED                   */}
      {/* ========================================================================= */}
      <div className="hidden md:flex items-center h-full px-4 gap-2 max-w-[2560px] mx-auto w-full">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-[#f2f2f2] dark:hover:bg-[#272727] text-[#0f0f0f] dark:text-[#f1f1f1] transition-colors"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu size={22} strokeWidth={1.8} />
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 group select-none"
            aria-label="Sarthak's Portfolio — Home"
          >
            <div
              className="flex items-center justify-center rounded-lg bg-[#ff0033] flex-shrink-0"
              style={{ width: 28, height: 28 }}
            >
              <svg viewBox="0 0 24 24" fill="white" width={14} height={14} style={{ marginLeft: 2 }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span
              className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] leading-none tracking-tight"
              style={{ fontSize: "clamp(15px, 2vw, 18px)" }}
            >
              Sarthak<span className="text-[#ff0033]">&apos;s</span> Portfolio
            </span>
          </Link>
        </div>

        {/* Center: Search Bar + Dropdown */}
        <div ref={searchContainerRef} className="flex-1 flex justify-center px-4 min-w-0 relative">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full max-w-[600px] h-9 relative"
          >
            <div className="relative flex-1 min-w-0">
              <input
                ref={desktopSearchRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsDropdownOpen(true);
                  setSelectedIndex(-1);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                onKeyDown={handleKeyDown}
                role="combobox"
                aria-expanded={isDropdownOpen && hasSuggestions}
                aria-autocomplete="list"
                aria-controls="desktop-search-dropdown-listbox"
                aria-activedescendant={selectedIndex >= 0 ? `desktop-search-item-${selectedIndex}` : undefined}
                placeholder="Search projects & sidebar (Press '/' to focus)"
                className="w-full h-9 pl-4 pr-3 text-sm border border-[#d3d3d3] dark:border-[#303030] rounded-l-full focus:outline-none focus:border-[#1c62b9] bg-white dark:bg-[#121212] text-[#0f0f0f] dark:text-[#f1f1f1] placeholder-[#909090] dark:placeholder-[#717171] transition-colors"
                aria-label="Search portfolio"
              />
            </div>
            <button
              type="submit"
              className="h-9 px-4 border border-l-0 border-[#d3d3d3] dark:border-[#303030] rounded-r-full bg-[#f8f8f8] dark:bg-[#222222] hover:bg-[#f0f0f0] dark:hover:bg-[#272727] text-[#0f0f0f] dark:text-[#f1f1f1] transition-colors flex items-center justify-center flex-shrink-0"
              aria-label="Submit search"
            >
              <Search size={16} strokeWidth={2} />
            </button>
          </form>

          {/* Desktop Search Result Dropdown */}
          {isDropdownOpen && hasSuggestions && (
            <div
              id="desktop-search-dropdown-listbox"
              role="listbox"
              aria-label="Search suggestions"
              className="absolute left-4 right-4 top-full mt-1.5 max-w-[600px] mx-auto bg-white dark:bg-[#212121] border border-[#e5e5e5] dark:border-[#383838] rounded-2xl shadow-xl z-50 overflow-hidden py-2"
            >
              {suggestions.sidebarItems.length > 0 && (
                <div className="pb-1">
                  <div className="px-4 py-1 text-[11px] font-semibold text-[#808080] dark:text-[#aaaaaa] uppercase tracking-wider">
                    Navigation & Actions
                  </div>
                  {suggestions.sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const currentIndex = desktopItemCursor++;
                    const isSelected = selectedIndex === currentIndex;

                    return (
                      <button
                        key={item.id}
                        id={`desktop-search-item-${currentIndex}`}
                        role="option"
                        aria-selected={isSelected}
                        type="button"
                        onClick={() => handleSelectSidebarItem(item)}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={`w-full flex items-center justify-between px-4 py-2 transition-colors text-left group ${
                          isSelected
                            ? "bg-[#e5e5e5] dark:bg-[#383838] text-[#0f0f0f] dark:text-[#f1f1f1]"
                            : "hover:bg-[#f2f2f2] dark:hover:bg-[#2e2e2e] text-[#0f0f0f] dark:text-[#f1f1f1]"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon size={16} className="text-[#606060] dark:text-[#aaaaaa] flex-shrink-0" />
                          <span className="text-sm font-medium truncate">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f2f2f2] dark:bg-[#272727] text-[#606060] dark:text-[#aaaaaa]">
                            {item.type}
                          </span>
                          {item.external ? (
                            <ExternalLink size={12} className="text-[#909090] dark:text-[#717171]" />
                          ) : (
                            <ArrowRight size={12} className="text-[#909090] dark:text-[#717171]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {suggestions.projects.length > 0 && (
                <div className="pt-1 border-t border-[#f2f2f2] dark:border-[#2e2e2e]">
                  <div className="px-4 py-1 text-[11px] font-semibold text-[#808080] dark:text-[#aaaaaa] uppercase tracking-wider">
                    Projects
                  </div>
                  {suggestions.projects.map((p) => {
                    const currentIndex = desktopItemCursor++;
                    const isSelected = selectedIndex === currentIndex;

                    return (
                      <button
                        key={p.slug}
                        id={`desktop-search-item-${currentIndex}`}
                        role="option"
                        aria-selected={isSelected}
                        type="button"
                        onClick={() => handleSelectProject(p.slug)}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={`w-full flex items-center justify-between px-4 py-2 transition-colors text-left group ${
                          isSelected
                            ? "bg-[#e5e5e5] dark:bg-[#383838] text-[#0f0f0f] dark:text-[#f1f1f1]"
                            : "hover:bg-[#f2f2f2] dark:hover:bg-[#2e2e2e] text-[#0f0f0f] dark:text-[#f1f1f1]"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Search size={15} className="text-[#606060] dark:text-[#aaaaaa] flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{p.name}</p>
                            <p className="text-xs text-[#606060] dark:text-[#aaaaaa] truncate">{p.subtitle}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-[#ff0033] border border-red-500/20 flex-shrink-0">
                          Project
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {query.trim().length > 0 && (() => {
                const currentIndex = desktopItemCursor++;
                const isSelected = selectedIndex === currentIndex;
                return (
                  <div className="pt-2 mt-1 border-t border-[#f2f2f2] dark:border-[#2e2e2e] px-2">
                    <button
                      id={`desktop-search-item-${currentIndex}`}
                      role="option"
                      aria-selected={isSelected}
                      type="button"
                      onClick={() => handleSearch()}
                      onMouseEnter={() => setSelectedIndex(currentIndex)}
                      className={`w-full py-2 px-3 rounded-xl text-xs text-center font-medium transition-colors ${
                        isSelected
                          ? "bg-[#e5e5e5] dark:bg-[#383838] text-[#065fd4] dark:text-[#3ea6ff] font-semibold"
                          : "text-[#065fd4] dark:text-[#3ea6ff] hover:bg-[#f2f2f2] dark:hover:bg-[#2e2e2e]"
                      }`}
                    >
                      View all results for &quot;{query}&quot; →
                    </button>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#0f0f0f] dark:border-[#f1f1f1] text-[#0f0f0f] dark:text-[#f1f1f1] text-sm font-medium hover:bg-[#0f0f0f] hover:text-white dark:hover:bg-[#f1f1f1] dark:hover:text-[#0f0f0f] transition-all"
            aria-label="View or download resume"
          >
            <FileText size={14} />
            <span>Resume</span>
          </a>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[#f2f2f2] dark:hover:bg-[#272727] text-[#0f0f0f] dark:text-[#f1f1f1] transition-colors relative"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? (
              <Sun size={20} strokeWidth={1.8} className="text-[#f1f1f1]" />
            ) : (
              <Moon size={20} strokeWidth={1.8} className="text-[#0f0f0f]" />
            )}
          </button>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => {
                setNotifOpen((v) => !v);
                setProfileOpen(false);
              }}
              className="p-2 rounded-full hover:bg-[#f2f2f2] dark:hover:bg-[#272727] text-[#0f0f0f] dark:text-[#f1f1f1] transition-colors relative"
              aria-label="Notifications"
            >
              <Bell size={20} strokeWidth={1.8} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff0033]" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-1 w-72 bg-white dark:bg-[#212121] border border-[#e5e5e5] dark:border-[#383838] rounded-xl shadow-lg z-50 py-2">
                <div className="px-4 py-2 text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] border-b border-[#f2f2f2] dark:border-[#2e2e2e]">
                  Updates
                </div>
                <div className="px-4 py-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ff0033] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      S
                    </div>
                    <div>
                      <p className="text-sm text-[#0f0f0f] dark:text-[#f1f1f1] font-medium">New project added</p>
                      <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">Quantum Scraper — AI/GenAI</p>
                      <p className="text-xs text-[#909090] dark:text-[#717171] mt-0.5">Jun 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile avatar */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => {
                setProfileOpen((v) => !v);
                setNotifOpen(false);
              }}
              className="w-8 h-8 rounded-full bg-[#ff0033] flex items-center justify-center text-white font-bold text-sm hover:ring-2 hover:ring-[#ff0033] hover:ring-offset-1 transition-all"
              aria-label="Profile menu"
              aria-expanded={profileOpen}
            >
              S
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-1 w-64 bg-white dark:bg-[#212121] border border-[#e5e5e5] dark:border-[#383838] rounded-xl shadow-lg z-50 overflow-hidden">
                <div className="flex items-center gap-3 p-4 border-b border-[#f2f2f2] dark:border-[#2e2e2e]">
                  <div className="w-10 h-10 rounded-full bg-[#ff0033] flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] truncate">
                      {profile.name.full}
                    </p>
                    <p className="text-xs text-[#606060] dark:text-[#aaaaaa] truncate">{profile.handle}</p>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/about"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
                  >
                    <User size={16} className="text-[#606060] dark:text-[#aaaaaa]" />
                    View profile
                  </Link>
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
                  >
                    <FileText size={16} className="text-[#606060] dark:text-[#aaaaaa]" />
                    Resume (PDF)
                  </a>
                  <a
                    href={profile.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
                  >
                    <GitBranch size={16} className="text-[#606060] dark:text-[#aaaaaa]" />
                    GitHub
                  </a>
                  <a
                    href={profile.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
                  >
                    <Link2 size={16} className="text-[#606060] dark:text-[#aaaaaa]" />
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
                  >
                    <Mail size={16} className="text-[#606060] dark:text-[#aaaaaa]" />
                    Contact
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DEDICATED MOBILE HEADER (md:hidden) — STRICT PROBLEM 1 & 2 FIXES        */}
      {/* STATE A: Hamburger + Viewport-Centered Logo + Compact Search Icon          */}
      {/* STATE B: Full-width expanded search input consuming 100% width             */}
      {/* ========================================================================= */}
      <div className="flex md:hidden items-center h-full w-full relative px-2">
        {mobileSearchActive ? (
          /* --------------------------------------------------------------------- */
          /* STATE B: Full-Width Search Input (100% Usable Width)                  */
          /* Typable, readable >=16px, never cramped, clear X button               */
          /* --------------------------------------------------------------------- */
          <div className="flex items-center h-full w-full gap-2 z-20">
            {/* Back button ← */}
            <button
              type="button"
              onClick={closeMobileSearch}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-[#f2f2f2] dark:hover:bg-[#272727] text-[#0f0f0f] dark:text-[#f1f1f1] transition-colors flex-shrink-0"
              aria-label="Close search"
            >
              <ArrowLeft size={20} />
            </button>

            {/* Expansive Full-Width Mobile Input */}
            <form onSubmit={handleSearch} className="flex-1 flex items-center relative min-w-0">
              <input
                ref={mobileSearchRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsDropdownOpen(true);
                  setSelectedIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search projects & navigation..."
                className="w-full h-10 pl-4 pr-10 text-base border border-[#d3d3d3] dark:border-[#303030] rounded-full focus:outline-none focus:border-[#1c62b9] bg-[#f2f2f2] dark:bg-[#181818] text-[#0f0f0f] dark:text-[#f1f1f1] placeholder-[#909090] dark:placeholder-[#717171] transition-colors"
                style={{ fontSize: "16px" }}
                aria-label="Search projects and navigation"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[32px] min-h-[32px] flex items-center justify-center text-[#606060] dark:text-[#aaaaaa] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1]"
                  aria-label="Clear search text"
                >
                  <X size={16} />
                </button>
              )}
            </form>

            {/* Search Submit Icon */}
            <button
              type="button"
              onClick={() => handleSearch()}
              className="min-w-[44px] min-h-[44px] px-3.5 rounded-full bg-[#ff0033] hover:bg-[#cc0000] text-white flex items-center justify-center flex-shrink-0 transition-colors"
              aria-label="Submit search"
            >
              <Search size={18} />
            </button>

            {/* Mobile Dropdown Suggestions */}
            {isDropdownOpen && hasSuggestions && (
              <div
                role="listbox"
                aria-label="Search suggestions"
                className="fixed left-2 right-2 top-[var(--topbar-height)] mt-1.5 bg-white dark:bg-[#212121] border border-[#e5e5e5] dark:border-[#383838] rounded-2xl shadow-2xl z-50 max-h-[70vh] overflow-y-auto py-2"
              >
                {suggestions.sidebarItems.length > 0 && (
                  <div className="pb-1">
                    <div className="px-4 py-1 text-[11px] font-semibold text-[#808080] dark:text-[#aaaaaa] uppercase tracking-wider">
                      Navigation & Actions
                    </div>
                    {suggestions.sidebarItems.map((item) => {
                      const Icon = item.icon;
                      const currentIndex = mobileItemCursor++;
                      const isSelected = selectedIndex === currentIndex;

                      return (
                        <button
                          key={item.id}
                          role="option"
                          aria-selected={isSelected}
                          type="button"
                          onClick={() => handleSelectSidebarItem(item)}
                          className={`w-full flex items-center justify-between px-4 py-3 transition-colors text-left min-h-[46px] ${
                            isSelected
                              ? "bg-[#e5e5e5] dark:bg-[#383838] text-[#0f0f0f] dark:text-[#f1f1f1]"
                              : "hover:bg-[#f2f2f2] dark:hover:bg-[#2e2e2e] text-[#0f0f0f] dark:text-[#f1f1f1]"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Icon size={18} className="text-[#606060] dark:text-[#aaaaaa] flex-shrink-0" />
                            <span className="text-sm font-medium truncate">{item.label}</span>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#f2f2f2] dark:bg-[#272727] text-[#606060] dark:text-[#aaaaaa]">
                            {item.type}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {suggestions.projects.length > 0 && (
                  <div className="pt-1 border-t border-[#f2f2f2] dark:border-[#2e2e2e]">
                    <div className="px-4 py-1 text-[11px] font-semibold text-[#808080] dark:text-[#aaaaaa] uppercase tracking-wider">
                      Projects
                    </div>
                    {suggestions.projects.map((p) => {
                      const currentIndex = mobileItemCursor++;
                      const isSelected = selectedIndex === currentIndex;

                      return (
                        <button
                          key={p.slug}
                          role="option"
                          aria-selected={isSelected}
                          type="button"
                          onClick={() => handleSelectProject(p.slug)}
                          className={`w-full flex items-center justify-between px-4 py-3 transition-colors text-left min-h-[46px] ${
                            isSelected
                              ? "bg-[#e5e5e5] dark:bg-[#383838] text-[#0f0f0f] dark:text-[#f1f1f1]"
                              : "hover:bg-[#f2f2f2] dark:hover:bg-[#2e2e2e] text-[#0f0f0f] dark:text-[#f1f1f1]"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Search size={16} className="text-[#606060] dark:text-[#aaaaaa] flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium truncate">{p.name}</p>
                              <p className="text-xs text-[#606060] dark:text-[#aaaaaa] truncate">{p.subtitle}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-500/10 text-[#ff0033] border border-red-500/20 flex-shrink-0">
                            Project
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {query.trim().length > 0 && (
                  <div className="pt-2 mt-1 border-t border-[#f2f2f2] dark:border-[#2e2e2e] px-3">
                    <button
                      type="button"
                      onClick={() => handleSearch()}
                      className="w-full py-2.5 text-xs text-center font-medium text-[#065fd4] dark:text-[#3ea6ff] hover:underline"
                    >
                      View all results for &quot;{query}&quot; →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* --------------------------------------------------------------------- */
          /* STATE A: Compact Normal Mobile Header                                 */
          /* Left: Hamburger                                                       */
          /* Center: Mathematically Centered YouTube-Inspired Logo (Viewport 50%)  */
          /* Right: Compact Search Trigger ONLY (Resume & Theme in Drawer)         */
          /* --------------------------------------------------------------------- */
          <div className="flex items-center justify-between h-full w-full relative">
            {/* Left: Hamburger Button (44x44 Touch Target) */}
            <button
              onClick={onMenuClick}
              className="p-2.5 rounded-full hover:bg-[#f2f2f2] dark:hover:bg-[#272727] text-[#0f0f0f] dark:text-[#f1f1f1] min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors flex-shrink-0 z-10"
              aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            >
              <Menu size={22} strokeWidth={2} />
            </button>

            {/* Center: Mathematically & Visually Centered YouTube-Inspired Logo */}
            {/* position: absolute; left: 50%; transform: translateX(-50%)        */}
            {/* Absolute positioning relative to viewport guarantees true center  */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center z-10">
              <Link
                href="/"
                className="flex items-center gap-2 group select-none py-1"
                aria-label="Sarthak's Portfolio — Home"
              >
                <div
                  className="flex items-center justify-center rounded-lg bg-[#ff0033] flex-shrink-0"
                  style={{ width: 28, height: 28 }}
                >
                  <svg viewBox="0 0 24 24" fill="white" width={14} height={14} style={{ marginLeft: 2 }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] text-base tracking-tight whitespace-nowrap">
                  Sarthak<span className="text-[#ff0033]">&apos;s</span> Portfolio
                </span>
              </Link>
            </div>

            {/* Right: Compact Search Trigger ONLY (Eliminating Collision) */}
            <div className="flex items-center flex-shrink-0 z-10">
              <button
                ref={mobileSearchTriggerRef}
                onClick={openMobileSearch}
                className="p-2.5 rounded-full hover:bg-[#f2f2f2] dark:hover:bg-[#272727] text-[#0f0f0f] dark:text-[#f1f1f1] min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
                aria-label="Search projects"
              >
                <Search size={21} strokeWidth={2} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
