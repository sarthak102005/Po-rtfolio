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
} from "lucide-react";

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
    href: "https://www.linkedin.com/in/sarthakmakkar10/",
    label: "LinkedIn",
    icon: Link2,
    external: true,
  },
  { href: "/contact", label: "Contact", icon: Mail, external: false },
];

export default function GuideSidebar({
  open,
  onClose,
  mobileOpen = false,
  onMobileClose,
}: GuideSidebarProps) {
  const pathname = usePathname();
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

  // Lock body scroll when mobile drawer is open
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

  // Effective expanded state for desktop
  const isExpanded = open || isHovered;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/projects?filter=")) {
      return false;
    }
    return pathname.startsWith(href);
  };

  const linkClass = (href: string, isMobile = false) =>
    `flex items-center gap-5 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm group select-none ${
      isMobile ? "min-h-[44px]" : ""
    } ${
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
    isMobile = false,
    onNavigate,
  }: {
    title?: string;
    items: typeof primaryNav;
    expanded: boolean;
    isMobile?: boolean;
    onNavigate?: () => void;
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
            className={linkClass(href, isMobile)}
            title={!expanded ? label : undefined}
            aria-label={label}
            onClick={() => {
              if (onNavigate) onNavigate();
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
            className={linkClass(href, isMobile)}
            title={!expanded ? label : undefined}
            aria-label={label}
            onClick={() => {
              if (onNavigate) onNavigate();
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
      {/* ========================================================================= */}
      {/* Desktop sidebar with smooth hover expansion (72px -> 240px)                */}
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

      {/* ========================================================================= */}
      {/* Mobile Drawer (slides in from the RIGHT when hamburger is tapped)         */}
      {/* Requirement 14 & 15: Opaque dark dashboard, starts closed on fresh load   */}
      {/* ========================================================================= */}
      {/* Mobile backdrop dim */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      {/* Right-side mobile navigation drawer */}
      <aside
        className={`
          fixed right-0 top-0 bottom-0 z-50 w-[290px] max-w-[85vw]
          bg-[#0f0f0f] border-l border-[#272727] text-[#f1f1f1]
          shadow-2xl overflow-y-auto overflow-x-hidden
          transition-transform duration-300 ease-out
          md:hidden
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal={mobileOpen}
      >
        {/* Header inside drawer */}
        <div className="p-4 border-b border-[#272727] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#ff0033] flex items-center justify-center text-white flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="white" width={14} height={14} style={{ marginLeft: 2 }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="font-bold text-[#f1f1f1] text-base">
              Sarthak<span className="text-[#ff0033]">&apos;s</span> Portfolio
            </span>
          </div>
          <button
            onClick={onMobileClose}
            className="p-2 rounded-full text-[#aaaaaa] hover:text-white hover:bg-[#272727] min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dedicated Resume Download Button in Drawer */}
        <div className="p-4 border-b border-[#272727]">
          <a
            href="/Sarthak_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onMobileClose}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#ff0033] hover:bg-[#cc0000] text-white font-semibold text-sm shadow-md transition-all min-h-[44px]"
          >
            <FileText size={16} />
            <span>Download Resume (PDF)</span>
          </a>
        </div>

        {/* Navigation items */}
        <div className="px-2 py-3">
          <NavSection items={primaryNav} expanded={true} isMobile={true} onNavigate={onMobileClose} />
          <NavSection title="Explore" items={exploreNav} expanded={true} isMobile={true} onNavigate={onMobileClose} />
          <NavSection items={utilityNav} expanded={true} isMobile={true} onNavigate={onMobileClose} />
        </div>

        <div className="px-4 py-4 mt-2 border-t border-[#272727]">
          <p className="text-xs text-[#717171]">© 2026 Sarthak Makkar · Delhi, India</p>
        </div>
      </aside>
    </>
  );
}
