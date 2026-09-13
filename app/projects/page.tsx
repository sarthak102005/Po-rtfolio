"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProjectCard from "@/components/feed/ProjectCard";
import { projects, filterProjects, topicChips } from "@/data/projects";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") || "All";
  const [selected, setSelected] = useState(
    topicChips.includes(initialFilter) ? initialFilter : "All"
  );

  const filtered = filterProjects(projects, selected);

  return (
    <div className="content-wrap px-4 sm:px-6 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0f0f0f] mb-1">Projects</h1>
        <p className="text-sm text-[#606060]">
          {projects.length} production builds · Backend, Full Stack, AI/GenAI
        </p>
      </div>

      {/* Chip filters */}
      <div className="flex items-center gap-2 flex-wrap mb-6" role="tablist" aria-label="Project filters">
        {["All", "Backend", "Full Stack", "AI", "Systems"].map((chip) => (
          <button
            key={chip}
            onClick={() => setSelected(chip)}
            role="tab"
            aria-selected={selected === chip}
            className={`chip flex-shrink-0 ${selected === chip ? "chip-active" : "chip-inactive"}`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="feed-grid">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-2xl mb-2" aria-hidden="true">🔍</p>
          <p className="text-base font-semibold text-[#0f0f0f] mb-1">No projects found</p>
          <p className="text-sm text-[#606060]">Try a different filter</p>
          <button
            onClick={() => setSelected("All")}
            className="mt-4 px-4 py-2 rounded-full bg-[#0f0f0f] text-white text-sm font-medium hover:bg-[#333] transition-colors"
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
    <Suspense fallback={
      <div className="content-wrap px-4 sm:px-6 py-6">
        <div className="h-8 w-48 bg-[#f2f2f2] rounded mb-4 animate-pulse" />
        <div className="feed-grid">
          {[1,2,3,4].map(i => (
            <div key={i} className="space-y-3">
              <div className="thumbnail-container bg-[#f2f2f2] animate-pulse" />
              <div className="flex gap-3 px-0">
                <div className="w-9 h-9 rounded-full bg-[#f2f2f2] animate-pulse flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-[#f2f2f2] rounded animate-pulse" />
                  <div className="h-3 bg-[#f2f2f2] rounded w-2/3 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
