"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, User, Library, Code2 } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Compass },
  { href: "/skills", label: "Skills", icon: Code2 },
  { href: "/about", label: "About", icon: User },
  { href: "/you", label: "You", icon: Library },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#e5e5e5] flex md:hidden"
      style={{ height: 56 }}
      aria-label="Mobile bottom navigation"
    >
      {items.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors"
          aria-label={label}
          aria-current={isActive(href) ? "page" : undefined}
        >
          <Icon
            size={22}
            strokeWidth={isActive(href) ? 2.2 : 1.6}
            className={isActive(href) ? "text-[#0f0f0f]" : "text-[#606060]"}
          />
          <span
            className="text-[10px]"
            style={{
              color: isActive(href) ? "#0f0f0f" : "#606060",
              fontWeight: isActive(href) ? 600 : 400,
            }}
          >
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
