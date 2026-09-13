"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProjectCard from "@/components/feed/ProjectCard";
import { projects, filterProjects } from "@/data/projects";

const filterOptions = [
  "All",
  "Backend",
  "Fullstack",
  "AI / GenAI",
  "Core CS",
  "Systems",
];

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") || "All";

  // Normalize initial filter from query param
  const normalizedInitial =
    initialFilter.toLowerCase().includes("full")
      ? "Fullstack"
      : initialFilter.toLowerCase().includes("core")
      ? "Core CS"
      : initialFilter.toLowerCase().includes("ai")
      ? "AI / GenAI"
      : initialFilter.toLowerCase().includes("back")
      ? "Backend"
      : initialFilter.toLowerCase().includes("sys")
      ? "Systems"
      : "All";

  const [selected, setSelected] = useState(normalizedInitial);

  useEffect(() => {
    if (searchParams.get("filter")) {
      const q = searchParams.get("filter") || "All";
      const norm = q.toLowerCase().includes("full")
        ? "Fullstack"
        : q.toLowerCase().includes("core")
        ? "Core CS"
        : q.toLowerCase().includes("ai")
        ? "AI / GenAI"
        : q.toLowerCase().includes("back")
        ? "Backend"
        : q.toLowerCase().includes("sys")
        ? "Systems"
        : "All";
      setSelected(norm);
    }
  }, [searchParams]);

  const filtered = filterProjects(projects, selected);

  return (
    <div className="content-wrap px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">
          Projects
        </h1>
        <p className="text-sm text-[#606060] dark:text-[#aaaaaa]">
          {projects.length} production builds · Backend, Fullstack, AI / GenAI
        </p>
      </div>

      {/* Chip filters */}
      <div
        className="flex items-center gap-2 flex-wrap mb-6"
        role="tablist"
        aria-label="Project filters"
      >
        {filterOptions.map((chip) => {
          const isActive = selected === chip;
          return (
            <button
              key={chip}
              onClick={() => setSelected(chip)}
              role="tab"
              aria-selected={isActive}
              className={`chip flex-shrink-0 transition-all ${
                isActive ? "chip-active" : "chip-inactive"
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="feed-grid">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : selected === "Core CS" ? (
        <div className="py-16 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#f2f2f2] dark:bg-[#272727] text-3xl flex items-center justify-center mx-auto mb-4" aria-hidden="true">
            💻
          </div>
          <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-2">
            Core CS Fundamentals & Coursework
          </h2>
          <p className="text-sm text-[#606060] dark:text-[#aaaaaa] mb-6 leading-relaxed">
            Sarthak&apos;s core computer science foundations—including Operating Systems, DBMS, Computer Networks, Object-Oriented Programming, and Data Structures—are detailed in the Skills section.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/skills"
              className="px-5 py-2.5 rounded-full bg-[#ff0033] text-white text-sm font-semibold hover:bg-[#cc0000] transition-colors"
            >
              View Core CS Skills
            </Link>
            <button
              onClick={() => setSelected("All")}
              className="px-4 py-2.5 rounded-full border border-[#e5e5e5] dark:border-[#383838] text-sm font-medium hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
            >
              Show all projects
            </button>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-3xl mb-3" aria-hidden="true">🔍</p>
          <p className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">
            No projects found for &quot;{selected}&quot;
          </p>
          <p className="text-sm text-[#606060] dark:text-[#aaaaaa]">
            Try a different filter category
          </p>
          <button
            onClick={() => setSelected("All")}
            className="mt-4 px-5 py-2 rounded-full bg-[#0f0f0f] dark:bg-[#f1f1f1] text-white dark:text-[#0f0f0f] text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Show all projects
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="content-wrap px-4 sm:px-6 py-6">
          <div className="h-8 w-48 bg-[#f2f2f2] dark:bg-[#212121] rounded mb-4 animate-pulse" />
          <div className="feed-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="thumbnail-container bg-[#f2f2f2] dark:bg-[#212121] animate-pulse" />
                <div className="flex gap-3 px-0">
                  <div className="w-9 h-9 rounded-full bg-[#f2f2f2] dark:bg-[#212121] animate-pulse flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[#f2f2f2] dark:bg-[#212121] rounded animate-pulse" />
                    <div className="h-3 bg-[#f2f2f2] dark:bg-[#212121] rounded w-2/3 animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
