"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/data/projects";

interface ProjectShelfProps {
  title: string;
  projects: Project[];
  seeAllHref?: string;
  seeAllLabel?: string;
}

export default function ProjectShelf({
  title,
  projects,
  seeAllHref,
  seeAllLabel = "See all",
}: ProjectShelfProps) {
  if (projects.length === 0) return null;

  return (
    <section className="mb-8" aria-labelledby={`shelf-${title.replace(/\s+/g, "-").toLowerCase()}`}>
      {/* Shelf header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          id={`shelf-${title.replace(/\s+/g, "-").toLowerCase()}`}
          className="text-lg font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]"
        >
          {title}
        </h2>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="flex items-center gap-1 text-sm font-medium text-[#065fd4] dark:text-[#3ea6ff] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors"
            aria-label={`${seeAllLabel} in ${title}`}
          >
            {seeAllLabel}
            <ChevronRight size={16} />
          </Link>
        )}
      </div>

      {/* Grid */}
      <div className="feed-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
