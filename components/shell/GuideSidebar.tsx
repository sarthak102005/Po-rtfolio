"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

interface GuideSidebarProps {
  open: boolean;
  onClose?: () => void;
}

const primaryNav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Compass },
  { href: "/about", label: "About", icon: User },
  { href: "/skills", label: "Skills", icon: Code2 },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/you", label: "You", icon: Library },
];

const exploreNav = [
  { href: "/projects?filter=Backend", label: "Backend", icon: Cpu },
  { href: "/projects?filter=Frontend", label: "Frontend", icon: Globe },
  { href: "/projects?filter=AI", label: "AI / GenAI", icon: Brain },
  { href: "/skills", label: "Core CS", icon: BookOpen },
  { href: "/projects", label: "All Projects", icon: FolderGit2 },
];

const utilityNav = [
  {
    href: "https://drive.google.com/file/d/1kpUDMh8ppQjTbE2V1UwD0wkuaXxXsFJz/view",
    label: "Resume",
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
    href: "https://linkedin.com/in/sarthakmakkar10",
    label: "LinkedIn",
    icon: Link2,
    external: true,
  },
  { href: "/contact", label: "Contact", icon: Mail, external: false },
];

export default function GuideSidebar({ open, onClose }: GuideSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("?")[0]);
  };

  const linkClass = (href: string, base = "") =>
    `flex items-center gap-4 px-3 py-2.5 rounded-xl transition-colors cursor-pointer group select-none ${base} ${
      isActive(href)
        ? "bg-[#f2f2f2] font-semibold text-[#0f0f0f]"
        : "text-[#0f0f0f] hover:bg-[#f2f2f2]"
    }`;

  const iconClass = (href: string) =>
    `flex-shrink-0 ${isActive(href) ? "text-[#0f0f0f]" : "text-[#606060] group-hover:text-[#0f0f0f]"}`;

  const NavSection = ({
    title,
    items,
  }: {
    title?: string;
    items: typeof primaryNav;
  }) => (
    <div className="py-2">
      {title && open && (
        <p className="px-3 py-1 text-xs font-semibold text-[#909090] uppercase tracking-wider mb-1">
          {title}
        </p>
      )}
      {!title && open && <div className="h-px bg-[#e5e5e5] mx-3 my-2" />}
      {items.map(({ href, label, icon: Icon, ...rest }) => {
        const isExt = (rest as { external?: boolean }).external;
        return isExt ? (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass(href)}
            title={!open ? label : undefined}
            aria-label={label}
          >
            <Icon size={20} strokeWidth={1.8} className={iconClass(href)} />
            {open && <span className="text-sm truncate">{label}</span>}
          </a>
        ) : (
          <Link
            key={href}
            href={href}
            className={linkClass(href)}
            title={!open ? label : undefined}
            aria-label={label}
            onClick={onClose}
          >
            <Icon size={20} strokeWidth={1.8} className={iconClass(href)} />
            {open && <span className="text-sm truncate">{label}</span>}
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {open && onClose && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <nav
        className={`
          fixed left-0 top-[var(--topbar-height)] bottom-0 z-40
          bg-white overflow-y-auto overflow-x-hidden
          transition-[width] duration-200 ease-out
          sidebar hidden md:block
          ${open ? "w-[240px]" : "w-[72px]"}
        `}
        aria-label="Main navigation"
        role="navigation"
      >
        <div className="px-2 py-2">
          <NavSection items={primaryNav} />
          <NavSection title="Explore" items={exploreNav} />
          <NavSection items={utilityNav} />

          {/* Footer info when expanded */}
          {open && (
            <div className="px-3 py-4 mt-2 border-t border-[#e5e5e5]">
              <p className="text-[11px] text-[#909090] leading-relaxed">
                © 2026 Sarthak Makkar
              </p>
              <p className="text-[11px] text-[#909090]">Delhi, India</p>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile drawer (slides in from left) */}
      <nav
        className={`
          fixed left-0 top-0 bottom-0 z-40 w-[240px]
          bg-white overflow-y-auto overflow-x-hidden
          transition-transform duration-200 ease-out
          md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Mobile navigation"
      >
        {/* Logo area in mobile drawer */}
        <div className="flex items-center gap-3 h-14 px-4 border-b border-[#e5e5e5]">
          <div
            className="flex items-center justify-center rounded-lg flex-shrink-0"
            style={{ width: 28, height: 28, background: "#ff0033", borderRadius: "20%" }}
          >
            <svg viewBox="0 0 24 24" fill="white" width={14} height={14} style={{ marginLeft: 2 }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="font-bold text-[#0f0f0f] text-base">
            Sarthak&apos;s Portfolio
          </span>
        </div>
        <div className="px-2 py-2">
          <NavSection items={primaryNav} />
          <NavSection title="Explore" items={exploreNav} />
          <NavSection items={utilityNav} />
          <div className="px-3 py-4 mt-2 border-t border-[#e5e5e5]">
            <p className="text-[11px] text-[#909090]">© 2026 Sarthak Makkar · Delhi, India</p>
          </div>
        </div>
      </nav>
    </>
  );
}
