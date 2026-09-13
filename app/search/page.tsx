"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";
import ProjectCard from "@/components/feed/ProjectCard";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { experience } from "@/data/experience";

function searchPortfolio(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return { projects: [], skills: [], experience: [] };

  const matchedProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.stack.some((s) => s.toLowerCase().includes(q)) ||
      p.chips.some((c) => c.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      p.categories.some((c) => c.toLowerCase().includes(q)) ||
      (p.metric?.value.toLowerCase().includes(q) ?? false) ||
      p.proofPoints.some((pt) => pt.toLowerCase().includes(q)) ||
      p.year.includes(q)
  );

  const matchedSkills = skillGroups
    .map((g) => ({
      group: g.title,
      skills: g.skills.filter((s) => s.toLowerCase().includes(q)),
    }))
    .filter((g) => g.skills.length > 0 || g.group.toLowerCase().includes(q));

  const matchedExp = experience.filter(
    (e) =>
      e.company.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.stack.some((s) => s.toLowerCase().includes(q)) ||
      e.proofPoints.some((pt) => pt.toLowerCase().includes(q))
  );

  return { projects: matchedProjects, skills: matchedSkills, experience: matchedExp };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const results = searchPortfolio(initialQ);
  const total = results.projects.length + results.skills.length + results.experience.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="content-wrap px-4 sm:px-6 py-6">
      {/* Search input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6 max-w-lg">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#606060] dark:text-[#aaaaaa]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Sarthak's portfolio…"
            className="w-full h-10 pl-9 pr-10 text-sm border border-[#d3d3d3] dark:border-[#303030] rounded-full focus:outline-none focus:border-[#1c62b9] bg-white dark:bg-[#121212] text-[#0f0f0f] dark:text-[#f1f1f1] placeholder-[#909090] dark:placeholder-[#717171] transition-colors"
            autoFocus
            aria-label="Search query"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#606060] dark:text-[#aaaaaa] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1]"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-[#0f0f0f] dark:bg-[#f1f1f1] text-white dark:text-[#0f0f0f] text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Search
        </button>
      </form>

      {!initialQ ? (
        /* Empty state */
        <div className="py-12 text-center max-w-sm mx-auto">
          <span className="text-4xl mb-4 block" aria-hidden="true">🔍</span>
          <p className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">
            Search Sarthak&apos;s Portfolio
          </p>
          <p className="text-sm text-[#606060] dark:text-[#aaaaaa]">
            Try: &quot;RAG&quot;, &quot;Node.js&quot;, &quot;ShortHills&quot;, &quot;backend&quot;, &quot;91.08%&quot;
          </p>
        </div>
      ) : total === 0 ? (
        /* No results */
        <div className="py-12 text-center max-w-sm mx-auto">
          <span className="text-4xl mb-4 block" aria-hidden="true">😶</span>
          <p className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">
            No results for &quot;{initialQ}&quot;
          </p>
          <p className="text-sm text-[#606060] dark:text-[#aaaaaa] mb-4">
            Try different keywords or browse all projects.
          </p>
          <Link
            href="/projects"
            className="px-4 py-2 rounded-full bg-[#0f0f0f] dark:bg-[#f1f1f1] text-white dark:text-[#0f0f0f] text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Browse all projects
          </Link>
        </div>
      ) : (
        <>
          {/* Results summary */}
          <p className="text-sm text-[#606060] dark:text-[#aaaaaa] mb-6">
            About {total} result{total !== 1 ? "s" : ""} for &quot;{initialQ}&quot;
          </p>

          {/* Projects results */}
          {results.projects.length > 0 && (
            <section className="mb-8" aria-labelledby="search-projects">
              <h2 id="search-projects" className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-4">
                Projects ({results.projects.length})
              </h2>
              <div className="feed-grid">
                {results.projects.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </section>
          )}

          {/* Skills results */}
          {results.skills.length > 0 && (
            <section className="mb-8" aria-labelledby="search-skills">
              <h2 id="search-skills" className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-4">
                Skills ({results.skills.reduce((a, g) => a + g.skills.length, 0)})
              </h2>
              <div className="space-y-3">
                {results.skills.map((g) => (
                  <div key={g.group} className="p-4 rounded-xl border border-[#e5e5e5] dark:border-[#282828] bg-white dark:bg-[#181818]">
                    <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-2">{g.group}</p>
                    <div className="flex flex-wrap gap-2">
                      {g.skills.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-full bg-[#f2f2f2] dark:bg-[#272727] text-xs font-medium text-[#606060] dark:text-[#aaaaaa]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience results */}
          {results.experience.length > 0 && (
            <section className="mb-8" aria-labelledby="search-exp">
              <h2 id="search-exp" className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-4">
                Experience ({results.experience.length})
              </h2>
              {results.experience.map((exp) => (
                <Link
                  key={exp.company}
                  href="/experience"
                  className="block p-4 rounded-xl border border-[#e5e5e5] dark:border-[#282828] bg-white dark:bg-[#181818] hover:border-[#c0c0c0] dark:hover:border-[#404040] transition-all"
                >
                  <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
                    {exp.role} @ {exp.company}
                  </p>
                  <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-0.5">
                    {exp.period} · {exp.location}
                  </p>
                </Link>
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="content-wrap px-4 sm:px-6 py-6">
        <div className="h-10 w-80 bg-[#f2f2f2] dark:bg-[#212121] rounded-full animate-pulse mb-6" />
        <div className="h-4 w-48 bg-[#f2f2f2] dark:bg-[#212121] rounded animate-pulse" />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
