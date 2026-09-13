"use client";

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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const linkClass = (href: string) =>
    `flex items-center gap-6 px-3 py-2.5 rounded-xl transition-colors text-sm group ${
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
  }: {
    title?: string;
    items: typeof primaryNav;
  }) => (
    <div className="py-2">
      {title && open && (
        <p className="px-3 py-1 text-xs font-semibold text-[#909090] dark:text-[#717171] uppercase tracking-wider mb-1">
          {title}
        </p>
      )}
      {!title && open && <div className="h-px bg-[#e5e5e5] dark:bg-[#272727] mx-3 my-2" />}
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
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Desktop sidebar */}
      <nav
        className={`
          fixed left-0 top-[var(--topbar-height)] bottom-0 z-40
          bg-white dark:bg-[#0f0f0f] border-r border-[#e5e5e5] dark:border-[#272727]
          overflow-y-auto overflow-x-hidden
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
            <div className="px-3 py-4 mt-2 border-t border-[#e5e5e5] dark:border-[#272727]">
              <p className="text-[11px] text-[#909090] dark:text-[#717171] leading-relaxed">
                © 2026 Sarthak Makkar
              </p>
              <p className="text-[11px] text-[#909090] dark:text-[#717171]">Delhi, India</p>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile drawer (slides in from left) */}
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
          <NavSection items={primaryNav} />
          <NavSection title="Explore" items={exploreNav} />
          <NavSection items={utilityNav} />
        </div>
      </nav>
    </>
  );
}
