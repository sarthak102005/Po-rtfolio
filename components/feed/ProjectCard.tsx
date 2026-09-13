"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { MoreVertical, ExternalLink, GitBranch, Link2 } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

// Thumbnail background with icon and gradient
function ProjectThumbnail({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="thumbnail-container relative"
      style={{
        background: `linear-gradient(135deg, ${project.color} 0%, ${project.accentColor}33 100%)`,
      }}
    >
      {/* Centered icon */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span style={{ fontSize: "clamp(32px, 5vw, 52px)" }} aria-hidden="true">
          {project.icon}
        </span>
        <div
          className="px-2 py-0.5 rounded text-white font-mono font-bold"
          style={{ fontSize: "clamp(9px, 1.5vw, 13px)", background: "rgba(0,0,0,0.4)" }}
        >
          {project.name.toUpperCase()}
        </div>
      </div>

      {/* Category badge top-left */}
      <div className="absolute top-2 left-2">
        <span
          className="px-1.5 py-0.5 rounded text-white font-semibold"
          style={{ fontSize: 10, background: "rgba(0,0,0,0.6)" }}
        >
          {project.category === "ai" ? "AI/GenAI" : project.category === "fullstack" ? "Full Stack" : project.category.charAt(0).toUpperCase() + project.category.slice(1)}
        </span>
      </div>

      {/* Metric badge bottom-right (like YouTube duration) */}
      {project.metric && (
        <div className="absolute bottom-2 right-2">
          <span
            className="px-1.5 py-0.5 rounded text-white font-bold"
            style={{ fontSize: 11, background: "rgba(0,0,0,0.75)" }}
          >
            {project.metric.value}
          </span>
        </div>
      )}
    </div>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen((v) => !v);
  };

  const handleMenuClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(false);
  };

  const categoryLabel =
    project.category === "ai"
      ? "AI / GenAI"
      : project.category === "fullstack"
      ? "Full Stack"
      : project.category.charAt(0).toUpperCase() + project.category.slice(1);

  return (
    <article className="group relative cursor-pointer" tabIndex={0}>
      <Link href={`/project/${project.slug}`} className="block" tabIndex={-1}>
        {/* Thumbnail */}
        <div className="transition-transform duration-150 group-hover:scale-[1.02] group-hover:shadow-md rounded-xl">
          <ProjectThumbnail project={project} />
        </div>

        {/* Card body */}
        <div className="flex gap-3 mt-3 px-0">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div
              className="w-9 h-9 rounded-full bg-[#ff0033] flex items-center justify-center text-white font-bold text-sm"
              aria-hidden="true"
            >
              S
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0 pr-8">
            {/* 2-line title */}
            <h3 className="text-sm font-semibold text-[#0f0f0f] line-clamp-2 leading-snug mb-0.5">
              {project.name} — {project.subtitle}
            </h3>

            {/* Channel / creator row */}
            <p className="text-xs text-[#606060] hover:text-[#0f0f0f] transition-colors truncate">
              Sarthak Makkar
            </p>

            {/* Metadata row */}
            <p className="text-xs text-[#606060] truncate mt-0.5">
              {categoryLabel} · {project.year} · {project.stack.slice(0, 3).join(", ")}
            </p>
          </div>
        </div>
      </Link>

      {/* Three-dot menu (positioned absolute, outside Link) */}
      <div
        ref={menuRef}
        className="absolute top-[calc(56.25%+12px)] right-0"
        style={{ top: "calc(56.25% + 12px)" }}
      >
        <button
          onClick={handleMenuToggle}
          className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-[#e5e5e5] transition-all"
          aria-label={`More options for ${project.name}`}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <MoreVertical size={16} strokeWidth={2} className="text-[#606060]" />
        </button>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              className="absolute right-0 mt-1 w-48 bg-white border border-[#e5e5e5] rounded-xl shadow-lg z-20 py-1 overflow-hidden"
              role="menu"
            >
              <Link
                href={`/project/${project.slug}`}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] hover:bg-[#f2f2f2] transition-colors"
                onClick={() => setMenuOpen(false)}
                role="menuitem"
              >
                <ExternalLink size={14} className="text-[#606060]" />
                Open project
              </Link>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] hover:bg-[#f2f2f2] transition-colors"
                  onClick={() => setMenuOpen(false)}
                  role="menuitem"
                >
                  <ExternalLink size={14} className="text-[#606060]" />
                  Live demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] hover:bg-[#f2f2f2] transition-colors"
                  onClick={() => setMenuOpen(false)}
                  role="menuitem"
                >
                  <GitBranch size={14} className="text-[#606060]" />
                  GitHub
                </a>
              )}
              <button
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] hover:bg-[#f2f2f2] transition-colors"
                onClick={() => {
                  navigator.clipboard?.writeText(
                    `${window.location.origin}/project/${project.slug}`
                  );
                  setMenuOpen(false);
                }}
                role="menuitem"
              >
                <Link2 size={14} className="text-[#606060]" />
                Copy link
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
