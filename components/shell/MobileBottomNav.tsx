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
      className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0f0f0f] border-t border-[#e5e5e5] dark:border-[#272727] flex md:hidden transition-colors"
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
            className={
              isActive(href)
                ? "text-[#0f0f0f] dark:text-[#f1f1f1]"
                : "text-[#606060] dark:text-[#aaaaaa]"
            }
          />
          <span
            className={`text-[10px] ${
              isActive(href)
                ? "font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]"
                : "text-[#606060] dark:text-[#aaaaaa]"
            }`}
          >
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
