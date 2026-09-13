"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MoreVertical, ExternalLink, GitBranch, Link2 } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

function CardThumbnailCarousel({
  project,
  isHovered,
}: {
  project: Project;
  isHovered: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [];

  // Independent timer for each card — auto advances unless hovered
  useEffect(() => {
    if (gallery.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [gallery.length, isHovered]);

  const categoryLabel = project.categories?.includes("fullstack")
    ? "Fullstack"
    : project.categories?.includes("backend")
    ? "Backend"
    : project.categories?.includes("ai")
    ? "AI / GenAI"
    : project.category === "ai"
    ? "AI / GenAI"
    : project.category === "fullstack"
    ? "Fullstack"
    : project.category.charAt(0).toUpperCase() + project.category.slice(1);

  return (
    <div
      className="thumbnail-container relative overflow-hidden rounded-xl bg-[#e5e5e5] dark:bg-[#212121] aspect-video select-none"
      role="img"
      aria-label={`${project.name} screenshot ${currentIndex + 1} of ${gallery.length || 1}`}
    >
      {/* Screenshots layer with crossfade */}
      {gallery.length > 0 ? (
        gallery.map((src, idx) => {
          // Preload first 2, render active + immediate neighbors
          const isVisible = idx === currentIndex;
          return (
            <img
              key={src}
              src={src}
              alt={`${project.name} preview screenshot ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out pointer-events-none ${
                isVisible ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          );
        })
      ) : (
        /* Fallback if no screenshots */
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${project.color} 0%, ${project.accentColor}33 100%)`,
          }}
        >
          <span className="text-4xl" aria-hidden="true">
            {project.icon}
          </span>
          <span className="text-xs font-mono font-bold text-white bg-black/40 px-2 py-0.5 rounded">
            {project.name.toUpperCase()}
          </span>
        </div>
      )}

      {/* Category badge top-left */}
      <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
        <span className="px-2 py-0.5 rounded text-[11px] font-semibold text-white bg-black/70 backdrop-blur-xs tracking-wide">
          {categoryLabel}
        </span>
      </div>

      {/* Screenshot indicator / duration badge bottom-right */}
      <div className="absolute bottom-2.5 right-2.5 z-20 pointer-events-none flex items-center gap-1.5">
        {gallery.length > 1 && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-white/90 bg-black/60 backdrop-blur-xs">
            {currentIndex + 1}/{gallery.length}
          </span>
        )}
        {project.metric && (
          <span className="px-2 py-0.5 rounded text-[11px] font-bold text-white bg-black/80 backdrop-blur-xs">
            {project.metric.value}
          </span>
        )}
      </div>

      {/* Subtle indicator bar for carousel progress on cards */}
      {gallery.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 z-20 flex">
          {gallery.map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 transition-colors duration-300 ${
                i === currentIndex ? "bg-[#ff0033]" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen((v) => !v);
  };

  const categoryLabel = project.categories?.includes("fullstack")
    ? "Fullstack"
    : project.categories?.includes("backend")
    ? "Backend"
    : project.categories?.includes("ai")
    ? "AI / GenAI"
    : project.category === "ai"
    ? "AI / GenAI"
    : project.category === "fullstack"
    ? "Fullstack"
    : project.category.charAt(0).toUpperCase() + project.category.slice(1);

  return (
    <article
      className="group relative cursor-pointer"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/project/${project.slug}`} className="block" tabIndex={-1}>
        {/* Animated Screenshot Thumbnail */}
        <div className="transition-all duration-200 group-hover:scale-[1.01] group-hover:shadow-md rounded-xl overflow-hidden">
          <CardThumbnailCarousel project={project} isHovered={isHovered} />
        </div>

        {/* Card body */}
        <div className="flex gap-3 mt-3 px-0">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div
              className="w-9 h-9 rounded-full bg-[#ff0033] flex items-center justify-center text-white font-bold text-sm select-none"
              aria-hidden="true"
            >
              S
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0 pr-8">
            {/* 2-line title */}
            <h3 className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] line-clamp-2 leading-snug mb-0.5 group-hover:text-[#ff0033] dark:group-hover:text-[#ff3b5c] transition-colors">
              {project.name} — {project.subtitle}
            </h3>

            {/* Creator row */}
            <p className="text-xs text-[#606060] dark:text-[#aaaaaa] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors truncate">
              Sarthak Makkar
            </p>

            {/* Metadata row */}
            <p className="text-xs text-[#606060] dark:text-[#aaaaaa] truncate mt-0.5">
              {categoryLabel} · {project.year} · {project.stack.slice(0, 3).join(", ")}
            </p>
          </div>
        </div>
      </Link>

      {/* Three-dot menu */}
      <div
        ref={menuRef}
        className="absolute top-[calc(56.25%+12px)] right-0"
      >
        <button
          onClick={handleMenuToggle}
          className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-[#e5e5e5] dark:hover:bg-[#272727] transition-all"
          aria-label={`More options for ${project.name}`}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <MoreVertical size={16} strokeWidth={2} className="text-[#606060] dark:text-[#aaaaaa]" />
        </button>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              className="absolute right-0 mt-1 w-48 bg-white dark:bg-[#212121] border border-[#e5e5e5] dark:border-[#383838] rounded-xl shadow-lg z-40 py-1 overflow-hidden"
              role="menu"
            >
              <Link
                href={`/project/${project.slug}`}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
                onClick={() => setMenuOpen(false)}
                role="menuitem"
              >
                <ExternalLink size={14} className="text-[#606060] dark:text-[#aaaaaa]" />
                Open project
              </Link>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
                  onClick={() => setMenuOpen(false)}
                  role="menuitem"
                >
                  <ExternalLink size={14} className="text-[#606060] dark:text-[#aaaaaa]" />
                  Live demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
                  onClick={() => setMenuOpen(false)}
                  role="menuitem"
                >
                  <GitBranch size={14} className="text-[#606060] dark:text-[#aaaaaa]" />
                  GitHub
                </a>
              )}
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors text-left"
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `${window.location.origin}/project/${project.slug}`
                  );
                  setMenuOpen(false);
                }}
                role="menuitem"
              >
                <Link2 size={14} className="text-[#606060] dark:text-[#aaaaaa]" />
                Copy link
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
