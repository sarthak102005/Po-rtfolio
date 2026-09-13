"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, ExternalLink, ArrowRight } from "lucide-react";
import ProjectCard from "@/components/feed/ProjectCard";
import { projects, Project } from "@/data/projects";
import { searchSidebarItems, SidebarSearchItem } from "@/data/sidebarSearch";

function searchPortfolio(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return { projects: [] as Project[], sidebarItems: [] as SidebarSearchItem[] };

  // 1A. PROJECT SEARCH — Title and reasonable partial title matches (case-insensitive)
  const matchedProjects = projects.filter((p) => {
    const nameMatch = p.name.toLowerCase().includes(q);
    const slugMatch = p.slug.toLowerCase().includes(q);
    const subtitleMatch = p.subtitle.toLowerCase().includes(q);
    return nameMatch || slugMatch || subtitleMatch;
  });

  // 1B. SIDEBAR SEARCH — Left sidebar items (Home, Resume, GitHub, LinkedIn, Contact, etc.)
  const matchedSidebar = searchSidebarItems(q);

  return { projects: matchedProjects, sidebarItems: matchedSidebar };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const results = searchPortfolio(initialQ);
  const total = results.projects.length + results.sidebarItems.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const getBadgeStyle = (type: SidebarSearchItem["type"]) => {
    switch (type) {
      case "Navigation":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
      case "Category":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20";
      case "Link":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
      default:
        return "bg-[#f2f2f2] dark:bg-[#272727] text-[#606060] dark:text-[#aaaaaa]";
    }
  };

  return (
    <div className="content-wrap px-4 sm:px-6 py-6 max-w-[1400px] mx-auto">
      {/* Search input header */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-8 max-w-2xl">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#606060] dark:text-[#aaaaaa]" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects & sidebar (e.g. Earnease, Resume, GitHub, Backend)…"
            className="w-full h-10 pl-10 pr-10 text-sm border border-[#d3d3d3] dark:border-[#303030] rounded-full focus:outline-none focus:border-[#1c62b9] bg-white dark:bg-[#121212] text-[#0f0f0f] dark:text-[#f1f1f1] placeholder-[#909090] dark:placeholder-[#717171] transition-colors"
            autoFocus
            aria-label="Search query"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#606060] dark:text-[#aaaaaa] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1]"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-5 py-2 rounded-full bg-[#0f0f0f] dark:bg-[#f1f1f1] text-white dark:text-[#0f0f0f] text-sm font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
        >
          Search
        </button>
      </form>

      {!initialQ ? (
        /* Empty prompt */
        <div className="py-16 text-center max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f2f2f2] dark:bg-[#212121] flex items-center justify-center text-[#606060] dark:text-[#aaaaaa]">
            <Search size={28} />
          </div>
          <p className="text-lg font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-2">
            Search Projects & Navigation
          </p>
          <p className="text-sm text-[#606060] dark:text-[#aaaaaa] mb-4">
            Search across portfolio projects and left sidebar items.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Earnease", "Resume", "GitHub", "Backend", "ReachInbox", "AI", "Contact"].map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  router.push(`/search?q=${encodeURIComponent(s)}`);
                }}
                className="px-3 py-1 text-xs rounded-full bg-[#f2f2f2] dark:bg-[#272727] text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#e5e5e5] dark:hover:bg-[#383838] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : total === 0 ? (
        /* No results */
        <div className="py-16 text-center max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#f2f2f2] dark:bg-[#212121] flex items-center justify-center text-3xl">
            😶
          </div>
          <p className="text-lg font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">
            No results for &quot;{initialQ}&quot;
          </p>
          <p className="text-sm text-[#606060] dark:text-[#aaaaaa] mb-6">
            Try searching for a project title (e.g. &quot;Earnease&quot;, &quot;ReachInbox&quot;) or sidebar item (&quot;Resume&quot;, &quot;GitHub&quot;, &quot;Backend&quot;).
          </p>
          <Link
            href="/projects"
            className="px-5 py-2.5 rounded-full bg-[#0f0f0f] dark:bg-[#f1f1f1] text-white dark:text-[#0f0f0f] text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Browse all projects
          </Link>
        </div>
      ) : (
        <div>
          {/* Results summary */}
          <p className="text-sm text-[#606060] dark:text-[#aaaaaa] mb-6">
            About {total} result{total !== 1 ? "s" : ""} for &quot;{initialQ}&quot;
          </p>

          {/* 1B & 1C: Sidebar & Navigation Results */}
          {results.sidebarItems.length > 0 && (
            <section className="mb-10" aria-labelledby="search-sidebar">
              <div className="flex items-center justify-between mb-4">
                <h2 id="search-sidebar" className="text-sm font-bold uppercase tracking-wider text-[#606060] dark:text-[#aaaaaa]">
                  Navigation & Sidebar ({results.sidebarItems.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {results.sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-center justify-between p-4 rounded-xl border border-[#e5e5e5] dark:border-[#282828] bg-white dark:bg-[#181818] hover:border-[#b0b0b0] dark:hover:border-[#404040] hover:bg-[#f9f9f9] dark:hover:bg-[#212121] transition-all group">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-[#f2f2f2] dark:bg-[#272727] flex items-center justify-center text-[#0f0f0f] dark:text-[#f1f1f1] flex-shrink-0 group-hover:scale-105 transition-transform">
                          <Icon size={20} strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#ff0033] dark:group-hover:text-[#ff0033] transition-colors truncate">
                              {item.label}
                            </span>
                            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${getBadgeStyle(item.type)}`}>
                              {item.type}
                            </span>
                          </div>
                          <p className="text-xs text-[#606060] dark:text-[#aaaaaa] truncate mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center text-[#909090] dark:text-[#717171] group-hover:text-[#0f0f0f] dark:group-hover:text-[#f1f1f1] transition-colors ml-2 flex-shrink-0">
                        {item.external ? (
                          <ExternalLink size={16} />
                        ) : (
                          <ArrowRight size={16} />
                        )}
                      </div>
                    </div>
                  );

                  return item.external ? (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block focus:outline-none focus:ring-2 focus:ring-[#ff0033] rounded-xl"
                      title={`${item.label} (${item.type})`}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="block focus:outline-none focus:ring-2 focus:ring-[#ff0033] rounded-xl"
                      title={`${item.label} (${item.type})`}
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* 1A: Project Results */}
          {results.projects.length > 0 && (
            <section className="mb-8" aria-labelledby="search-projects">
              <div className="flex items-center justify-between mb-4">
                <h2 id="search-projects" className="text-sm font-bold uppercase tracking-wider text-[#606060] dark:text-[#aaaaaa]">
                  Projects ({results.projects.length})
                </h2>
                <span className="text-xs text-[#909090] dark:text-[#717171] px-2 py-0.5 rounded bg-[#f2f2f2] dark:bg-[#272727]">
                  Project Matches
                </span>
              </div>
              <div className="feed-grid">
                {results.projects.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="content-wrap px-4 sm:px-6 py-6">
          <div className="h-10 w-80 bg-[#f2f2f2] dark:bg-[#212121] rounded-full animate-pulse mb-6" />
          <div className="h-4 w-48 bg-[#f2f2f2] dark:bg-[#212121] rounded animate-pulse" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
