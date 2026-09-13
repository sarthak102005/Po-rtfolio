import type { Metadata } from "next";
import Link from "next/link";
import { FileText, GitBranch, Link2, Mail } from "lucide-react";
import ProjectCard from "@/components/feed/ProjectCard";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "You — Sarthak's Portfolio",
  description: "Sarthak Makkar's portfolio library: selected work, resume, project collections, and career journey.",
};

const collections = [
  {
    title: "Selected Work",
    desc: "Primary production builds",
    href: "/projects",
    icon: "⭐",
    count: projects.filter((p) => p.priority === "primary").length,
  },
  {
    title: "AI / GenAI Projects",
    desc: "LLM, RAG, and agent systems",
    href: "/projects?filter=AI",
    icon: "🤖",
    count: projects.filter((p) => p.categories.includes("ai")).length,
  },
  {
    title: "Backend Systems",
    desc: "APIs, queues, and databases",
    href: "/projects?filter=Backend",
    icon: "⚙️",
    count: projects.filter((p) => p.categories.includes("backend")).length,
  },
];

export default function YouPage() {
  const featured = projects.filter((p) => p.priority === "primary");

  return (
    <div className="content-wrap px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-[#ff0033] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 select-none shadow-sm">
          S
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{profile.name.full}</h1>
          <p className="text-sm text-[#606060] dark:text-[#aaaaaa]">{profile.handle} · {profile.tagline}</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          
          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#e5e5e5] dark:border-[#282828] bg-white dark:bg-[#181818] hover:bg-[#f9f9f9] dark:hover:bg-[#212121] hover:shadow-sm transition-all text-center"
        >
          <FileText size={22} className="text-[#ff0033]" />
          <span className="text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">Resume</span>
        </a>
        <a
          href={profile.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#e5e5e5] dark:border-[#282828] bg-white dark:bg-[#181818] hover:bg-[#f9f9f9] dark:hover:bg-[#212121] hover:shadow-sm transition-all text-center"
        >
          <GitBranch size={22} className="text-[#0f0f0f] dark:text-[#f1f1f1]" />
          <span className="text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">GitHub</span>
        </a>
        <a
          href={profile.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#e5e5e5] dark:border-[#282828] bg-white dark:bg-[#181818] hover:bg-[#f9f9f9] dark:hover:bg-[#212121] hover:shadow-sm transition-all text-center"
        >
          <Link2 size={22} className="text-[#0a66c2] dark:text-[#388bfd]" />
          <span className="text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">LinkedIn</span>
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[#e5e5e5] dark:border-[#282828] bg-white dark:bg-[#181818] hover:bg-[#f9f9f9] dark:hover:bg-[#212121] hover:shadow-sm transition-all text-center"
        >
          <Mail size={22} className="text-[#606060] dark:text-[#aaaaaa]" />
          <span className="text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">Contact</span>
        </a>
      </div>

      {/* Collections */}
      <section className="mb-8" aria-labelledby="you-collections">
        <h2 id="you-collections" className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-4">
          Project Collections
        </h2>
        <div className="space-y-3">
          {collections.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              className="flex items-center gap-4 p-4 rounded-xl border border-[#e5e5e5] dark:border-[#282828] bg-white dark:bg-[#181818] hover:border-[#c0c0c0] dark:hover:border-[#404040] hover:shadow-sm transition-all"
            >
              <span className="text-2xl flex-shrink-0" aria-hidden="true">{col.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">{col.title}</p>
                <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">{col.desc}</p>
              </div>
              <span className="text-xs text-[#606060] dark:text-[#aaaaaa] flex-shrink-0">{col.count} projects</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Career timeline */}
      <section className="mb-8" aria-labelledby="you-journey">
        <h2 id="you-journey" className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-4">
          Career Journey
        </h2>
        <div className="relative border-l-2 border-[#e5e5e5] dark:border-[#282828] pl-5 space-y-6 ml-2">
          {/* Internship */}
          {experience.map((exp) => (
            <div key={exp.company} className="relative">
              <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-[#ff0033] border-2 border-white dark:border-[#0f0f0f]" aria-hidden="true" />
              <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mb-0.5">{exp.period}</p>
              <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">{exp.role} @ {exp.company}</p>
              <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">{exp.location}</p>
            </div>
          ))}
          {/* Education */}
          <div className="relative">
            <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-[#43b89c] border-2 border-white dark:border-[#0f0f0f]" aria-hidden="true" />
            <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mb-0.5">{profile.education.period}</p>
            <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">{profile.education.degree}</p>
            <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">{profile.education.shortInstitution} · CGPA {profile.education.cgpa}</p>
          </div>
        </div>
      </section>

      {/* Selected work preview */}
      <section aria-labelledby="you-selected">
        <div className="flex items-center justify-between mb-4">
          <h2 id="you-selected" className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
            Selected Work
          </h2>
          <Link href="/projects" className="text-sm text-[#065fd4] dark:text-[#3ea6ff] hover:underline">
            See all
          </Link>
        </div>
        <div className="feed-grid">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
