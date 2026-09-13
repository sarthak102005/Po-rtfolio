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
  { href: "/projects?filter=Fullstack", label: "Fullstack", icon: Globe },
  { href: "/projects?filter=AI", label: "AI / GenAI", icon: Brain },
  { href: "/projects?filter=Core+CS", label: "Core CS", icon: BookOpen },
  { href: "/projects", label: "All Projects", icon: FolderGit2 },
];

const utilityNav = [
  {
    href: "/Sarthak_Resume.pdf",
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
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear hover state when pinned open state changes
  useEffect(() => {
    if (open) {
      setIsHovered(false);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    }
  }, [open]);

  // Clean up timer on unmount
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
    // Only expand on hover if currently collapsed on desktop
    if (!open) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    // 150ms hysteresis delay before collapsing to prevent flickering
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  // Effective expanded state (either explicitly open or hovered on desktop)
  const isExpanded = open || isHovered;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/projects?filter=")) {
      // Handled via URL params if on projects page
      return false;
    }
    return pathname.startsWith(href);
  };

  const linkClass = (href: string) =>
    `flex items-center gap-5 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm group select-none ${
      isActive(href)
        ? "bg-[#f2f2f2] dark:bg-[#272727] font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]"
        : "text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727]"
    }`;

  const iconClass = (href: string) =>
    `flex-shrink-0 ${
      isActive(href)
        ? "text-[#0f0f0f] dark:text-[#f1f1f1]"
        : "text-[#606060] dark:text-[#aaaaaa] group-hover:text-[#0f0f0f] dark:group-hover:text-[#f1f1f1]"
    }`;

  const NavSection = ({
    title,
    items,
    expanded,
  }: {
    title?: string;
    items: typeof primaryNav;
    expanded: boolean;
  }) => (
    <div className="py-2">
      {title && expanded && (
        <p className="px-3 py-1 text-xs font-semibold text-[#909090] dark:text-[#717171] uppercase tracking-wider mb-1 transition-opacity duration-200">
          {title}
        </p>
      )}
      {!title && expanded && <div className="h-px bg-[#e5e5e5] dark:bg-[#272727] mx-3 my-2" />}
      {!expanded && <div className="h-px bg-[#e5e5e5] dark:bg-[#272727] mx-2 my-2" />}
      {items.map(({ href, label, icon: Icon, ...rest }) => {
        const isExt = (rest as { external?: boolean }).external;
        return isExt ? (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass(href)}
            title={!expanded ? label : undefined}
            aria-label={label}
            onClick={() => {
              if (!open) setIsHovered(false);
            }}
          >
            <Icon size={20} strokeWidth={1.8} className={iconClass(href)} />
            {expanded && (
              <span className="text-sm truncate transition-opacity duration-200 animate-in fade-in-50">
                {label}
              </span>
            )}
          </a>
        ) : (
          <Link
            key={href}
            href={href}
            className={linkClass(href)}
            title={!expanded ? label : undefined}
            aria-label={label}
            onClick={() => {
              if (onClose) onClose();
              if (!open) setIsHovered(false);
            }}
          >
            <Icon size={20} strokeWidth={1.8} className={iconClass(href)} />
            {expanded && (
              <span className="text-sm truncate transition-opacity duration-200 animate-in fade-in-50">
                {label}
              </span>
            )}
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
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Desktop sidebar with hover expansion */}
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
          <NavSection items={primaryNav} expanded={isExpanded} />
          <NavSection title="Explore" items={exploreNav} expanded={isExpanded} />
          <NavSection items={utilityNav} expanded={isExpanded} />

          {/* Footer info when expanded */}
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

      {/* Mobile drawer (slides in from left on touch/mobile) */}
      <nav
        className={`
          fixed left-0 top-0 bottom-0 z-40 w-[240px]
          bg-white dark:bg-[#0f0f0f] border-r border-[#e5e5e5] dark:border-[#272727]
          overflow-y-auto overflow-x-hidden
          transition-transform duration-200 ease-out
          md:hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Mobile navigation"
      >
        <div className="p-4 border-b border-[#e5e5e5] dark:border-[#272727] flex items-center justify-between">
          <span className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] text-base">
            Sarthak<span className="text-[#ff0033]">&apos;s</span> Portfolio
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#606060] dark:text-[#aaaaaa] hover:bg-[#f2f2f2] dark:hover:bg-[#272727]"
            aria-label="Close drawer"
          >
            ✕
          </button>
        </div>
        <div className="px-2 py-2">
          <NavSection items={primaryNav} expanded={true} />
          <NavSection title="Explore" items={exploreNav} expanded={true} />
          <NavSection items={utilityNav} expanded={true} />
        </div>
      </nav>
    </>
  );
}
