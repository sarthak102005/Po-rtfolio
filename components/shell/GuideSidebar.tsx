"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  User,
  Code2,
  Briefcase,
  BookOpen,
  Library,
  GitBranch,
  Link2,
  Mail,
  FileText,
  Cpu,
  Globe,
  Brain,
  FolderGit2,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/components/context/ThemeContext";

interface GuideSidebarProps {
  open: boolean;
  onClose?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const primaryNav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Compass },
  { href: "/about", label: "About", icon: User },
  { href: "/skills", label: "Skills", icon: Code2 },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/you", label: "You", icon: Library },
  { href: "/contact", label: "Contact", icon: Mail },
];

const exploreNav = [
  { href: "/projects?filter=Backend", label: "Backend", icon: Cpu },
  { href: "/projects?filter=Fullstack", label: "Fullstack", icon: Globe },
  { href: "/projects?filter=AI", label: "AI / GenAI", icon: Brain },
  { href: "/projects?filter=Core+CS", label: "Core CS", icon: BookOpen },
  { href: "/projects", label: "All Projects", icon: FolderGit2 },
];

const utilityNav = [
  {
    href: "/Sarthak_Resume.pdf",
    label: "Resume (PDF)",
    icon: FileText,
    external: true,
  },
  {
    href: "https://github.com/sarthak102005",
    label: "GitHub",
    icon: GitBranch,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/sarthakmakkar10/",
    label: "LinkedIn",
    icon: Link2,
    external: true,
  },
];

export default function GuideSidebar({
  open,
  onClose,
  mobileOpen = false,
  onMobileClose,
}: GuideSidebarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen && onMobileClose) {
        onMobileClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, onMobileClose]);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Desktop hover expansion handlers
  useEffect(() => {
    if (open) {
      setIsHovered(false);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (!open) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  const isExpanded = open || isHovered;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/projects?filter=")) {
      return false;
    }
    return pathname.startsWith(href);
  };

  // Desktop link class
  const desktopLinkClass = (href: string) =>
    `flex items-center gap-5 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm group select-none ${
      isActive(href)
        ? "bg-[#f2f2f2] dark:bg-[#272727] font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]"
        : "text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727]"
    }`;

  const desktopIconClass = (href: string) =>
    `flex-shrink-0 ${
      isActive(href)
        ? "text-[#0f0f0f] dark:text-[#f1f1f1]"
        : "text-[#606060] dark:text-[#aaaaaa] group-hover:text-[#0f0f0f] dark:group-hover:text-[#f1f1f1]"
    }`;

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. DESKTOP SIDEBAR (hidden md:block) — APPROVED & UNCHANGED                */}
      {/* ========================================================================= */}
      <nav
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          fixed left-0 top-[var(--topbar-height)] bottom-0
          bg-white dark:bg-[#0f0f0f] border-r border-[#e5e5e5] dark:border-[#272727]
          overflow-y-auto overflow-x-hidden
          transition-[width,box-shadow] duration-200 ease-out
          sidebar hidden md:block
          ${isExpanded ? "w-[240px]" : "w-[72px]"}
          ${!open && isHovered ? "z-50 shadow-[4px_0_24px_rgba(0,0,0,0.15)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.7)]" : "z-30"}
        `}
        aria-label="Main navigation"
        role="navigation"
      >
        <div className="px-2 py-2">
          {/* Primary Nav */}
          <div className="py-2">
            {!isExpanded && <div className="h-px bg-[#e5e5e5] dark:bg-[#272727] mx-2 my-2" />}
            {primaryNav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={desktopLinkClass(href)}
                title={!isExpanded ? label : undefined}
                aria-label={label}
              >
                <Icon size={20} strokeWidth={1.8} className={desktopIconClass(href)} />
                {isExpanded && (
                  <span className="text-sm truncate transition-opacity duration-200 animate-in fade-in-50">
                    {label}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Explore Nav */}
          <div className="py-2">
            {isExpanded ? (
              <p className="px-3 py-1 text-xs font-semibold text-[#909090] dark:text-[#717171] uppercase tracking-wider mb-1">
                Explore
              </p>
            ) : (
              <div className="h-px bg-[#e5e5e5] dark:bg-[#272727] mx-2 my-2" />
            )}
            {exploreNav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={desktopLinkClass(href)}
                title={!isExpanded ? label : undefined}
                aria-label={label}
              >
                <Icon size={20} strokeWidth={1.8} className={desktopIconClass(href)} />
                {isExpanded && (
                  <span className="text-sm truncate transition-opacity duration-200 animate-in fade-in-50">
                    {label}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Utility Nav */}
          <div className="py-2">
            {isExpanded && <div className="h-px bg-[#e5e5e5] dark:bg-[#272727] mx-3 my-2" />}
            {!isExpanded && <div className="h-px bg-[#e5e5e5] dark:bg-[#272727] mx-2 my-2" />}
            {utilityNav.map(({ href, label, icon: Icon, external }) =>
              external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={desktopLinkClass(href)}
                  title={!isExpanded ? label : undefined}
                  aria-label={label}
                >
                  <Icon size={20} strokeWidth={1.8} className={desktopIconClass(href)} />
                  {isExpanded && (
                    <span className="text-sm truncate transition-opacity duration-200 animate-in fade-in-50">
                      {label}
                    </span>
                  )}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className={desktopLinkClass(href)}
                  title={!isExpanded ? label : undefined}
                  aria-label={label}
                >
                  <Icon size={20} strokeWidth={1.8} className={desktopIconClass(href)} />
                  {isExpanded && (
                    <span className="text-sm truncate transition-opacity duration-200 animate-in fade-in-50">
                      {label}
                    </span>
                  )}
                </Link>
              )
            )}
          </div>

          {/* Desktop Footer */}
          {isExpanded && (
            <div className="px-3 py-4 mt-2 border-t border-[#e5e5e5] dark:border-[#272727] transition-opacity duration-200">
              <p className="text-[11px] text-[#909090] dark:text-[#717171] leading-relaxed">
                © 2026 Sarthak Makkar
              </p>
              <p className="text-[11px] text-[#909090] dark:text-[#717171]">Delhi, India</p>
            </div>
          )}
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. MOBILE NAVIGATION DRAWER (md:hidden) — STRICT PROBLEM 3 & 4 FIXES      */}
      {/* - Opaque near-black (#0f0f0f)                                              */}
      {/* - Right-side slide-in                                                     */}
      {/* - Icon + Text Label 100% visible (high contrast text-white, never clipped)*/}
      {/* - Prominent Resume Button                                                 */}
      {/* - Prominent Appearance / Dark Mode Toggle                                 */}
      {/* - Independent vertical scroll, NO horizontal overflow                     */}
      {/* ========================================================================= */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <aside
        className={`
          fixed right-0 top-0 bottom-0 z-[70]
          w-[min(86vw,420px)] h-[100dvh]
          bg-[#0f0f0f] border-l border-[#272727] text-white
          shadow-2xl overflow-y-auto overflow-x-hidden
          transition-transform duration-300 ease-out flex flex-col
          md:hidden
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal={mobileOpen}
      >
        {/* Drawer Top Header: Logo + Close Button */}
        <div className="p-4 border-b border-[#272727] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#ff0033] flex items-center justify-center text-white flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="white" width={14} height={14} style={{ marginLeft: 2 }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-white text-base leading-none">
                Sarthak<span className="text-[#ff0033]">&apos;s</span> Portfolio
              </span>
              <p className="text-[11px] text-[#aaaaaa] mt-0.5">Software Engineer</p>
            </div>
          </div>

          <button
            onClick={onMobileClose}
            className="w-10 h-10 rounded-full text-[#aaaaaa] hover:text-white hover:bg-[#272727] flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Primary Action: Download Resume Button */}
        <div className="p-4 border-b border-[#272727] flex-shrink-0">
          <a
            href="/Sarthak_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onMobileClose}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-[#ff0033] hover:bg-[#cc0000] text-white font-bold text-sm shadow-lg transition-all min-h-[46px]"
          >
            <FileText size={17} />
            <span>Download Resume (PDF)</span>
          </a>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4">
          {/* Main Navigation */}
          <div>
            <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#888888] mb-1">
              Menu
            </p>
            <div className="space-y-1">
              {primaryNav.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={onMobileClose}
                    className={`flex items-center gap-4 px-3.5 py-3 rounded-xl transition-colors min-h-[46px] group ${
                      active
                        ? "bg-[#222222] text-[#ff0033] font-semibold"
                        : "text-[#f1f1f1] hover:bg-[#1a1a1a] hover:text-white"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 flex items-center justify-center flex-shrink-0 ${
                        active ? "text-[#ff0033]" : "text-[#aaaaaa] group-hover:text-white"
                      }`}
                    >
                      <Icon size={20} strokeWidth={1.9} />
                    </div>
                    <span className="flex-1 min-w-0 text-sm truncate font-medium">
                      {label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Explore Projects */}
          <div className="pt-2 border-t border-[#222222]">
            <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#888888] mb-1">
              Explore Projects
            </p>
            <div className="space-y-1">
              {exploreNav.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onMobileClose}
                  className="flex items-center gap-4 px-3.5 py-3 rounded-xl text-[#f1f1f1] hover:bg-[#1a1a1a] hover:text-white transition-colors min-h-[46px] group"
                >
                  <div className="w-6 h-6 flex items-center justify-center text-[#aaaaaa] group-hover:text-white flex-shrink-0">
                    <Icon size={19} strokeWidth={1.8} />
                  </div>
                  <span className="flex-1 min-w-0 text-sm truncate font-medium">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Appearance / Theme Switcher (Problem 4: Fully Discoverable!) */}
          <div className="pt-2 border-t border-[#222222]">
            <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#888888] mb-2">
              Appearance
            </p>
            <div className="px-3.5 py-3 rounded-xl bg-[#181818] border border-[#2a2a2a] flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "dark" ? (
                  <Moon size={18} className="text-[#3ea6ff]" />
                ) : (
                  <Sun size={18} className="text-[#f59e0b]" />
                )}
                <div>
                  <p className="text-sm font-semibold text-white">Dark Theme</p>
                  <p className="text-xs text-[#aaaaaa]">
                    {theme === "dark" ? "Currently active" : "Off (Light theme active)"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  theme === "dark"
                    ? "bg-[#282828] hover:bg-[#383838] text-white border border-[#444444]"
                    : "bg-[#ff0033] hover:bg-[#cc0000] text-white"
                }`}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
                <span>{theme === "dark" ? "Switch to Light" : "Enable Dark"}</span>
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-2 border-t border-[#222222]">
            <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#888888] mb-1">
              Links
            </p>
            <div className="space-y-1">
              {utilityNav.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onMobileClose}
                  className="flex items-center gap-4 px-3.5 py-3 rounded-xl text-[#f1f1f1] hover:bg-[#1a1a1a] hover:text-white transition-colors min-h-[46px] group"
                >
                  <div className="w-6 h-6 flex items-center justify-center text-[#aaaaaa] group-hover:text-white flex-shrink-0">
                    <Icon size={19} strokeWidth={1.8} />
                  </div>
                  <span className="flex-1 min-w-0 text-sm truncate font-medium">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#272727] flex-shrink-0 text-center">
          <p className="text-xs text-[#717171]">
            © 2026 Sarthak Makkar · Delhi, India
          </p>
        </div>
      </aside>
    </>
  );
}
