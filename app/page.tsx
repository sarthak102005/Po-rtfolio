"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, GitBranch, Link2, Mail, ChevronRight } from "lucide-react";
import TopicChips from "@/components/feed/TopicChips";
import ProjectShelf from "@/components/feed/ProjectShelf";
import { projects, filterProjects } from "@/data/projects";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { skillGroups } from "@/data/skills";

export default function HomePage() {
  const [selectedChip, setSelectedChip] = useState("All");

  const filtered = filterProjects(projects, selectedChip);
  const primary = filtered.filter((p) => p.priority === "primary");
  const aiGenai = filtered.filter((p) => p.category === "ai");
  const additional = filtered.filter((p) => p.priority === "secondary");
  const allFiltered = filtered;

  return (
    <>
      {/* Topic Chips — sticky below top bar */}
      <TopicChips selected={selectedChip} onSelect={setSelectedChip} />

      {/* Main feed */}
      <div className="content-wrap px-4 sm:px-6 py-6">
        {/* 1. Identity shelf */}
        <section className="mb-8" aria-label="Identity">
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 60%, #16213e 100%)",
              minHeight: 200,
            }}
          >
            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, #ff0033 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4f8ef7 0%, transparent 50%)",
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 sm:p-8">
              {/* Avatar */}
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ff0033] flex items-center justify-center text-white font-bold text-2xl sm:text-3xl flex-shrink-0"
                aria-hidden="true"
              >
                S
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                  {profile.name.full}
                </h1>
                <p className="text-[#ff4040] font-semibold text-sm sm:text-base mt-1">
                  {profile.tagline}
                </p>
                <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
                  {profile.valueProp}
                </p>

                {/* Quick stats */}
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <span className="text-gray-400 text-xs">
                    CGPA{" "}
                    <span className="text-white font-semibold">
                      {profile.education.cgpa}/{profile.education.cgpaOutOf}
                    </span>
                  </span>
                  <span className="text-gray-400 text-xs">
                    {profile.education.shortInstitution}{" "}
                    <span className="text-white font-semibold">
                      {profile.education.period}
                    </span>
                  </span>
                  <span className="text-gray-400 text-xs">
                    Hackhazards '24{" "}
                    <span className="text-white font-semibold">Top 15</span>
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-row sm:flex-col gap-2 flex-shrink-0">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#0f0f0f] text-sm font-semibold hover:bg-gray-100 transition-colors"
                >
                  <FileText size={14} />
                  Resume
                </a>
                <Link
                  href="/contact"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  <Mail size={14} />
                  Hire me
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Chip-filtered shelves */}
        {selectedChip !== "All" ? (
          /* Filtered view */
          <ProjectShelf
            title={`${selectedChip} Projects`}
            projects={allFiltered}
            seeAllHref="/projects"
          />
        ) : (
          <>
            {/* 3. Primary Projects shelf */}
            <ProjectShelf
              title="Primary Projects"
              projects={projects.filter((p) => p.priority === "primary")}
              seeAllHref="/projects"
            />

            {/* 4. AI / GenAI shelf */}
            <ProjectShelf
              title="AI / GenAI"
              projects={projects.filter((p) => p.category === "ai")}
              seeAllHref="/projects?filter=AI"
            />

            {/* 5. Additional Builds shelf */}
            {projects.filter((p) => p.priority === "secondary").length > 0 && (
              <ProjectShelf
                title="Additional Builds"
                projects={projects.filter((p) => p.priority === "secondary")}
                seeAllHref="/projects"
              />
            )}

            {/* 6. Experience shelf */}
            <section className="mb-8" aria-labelledby="exp-shelf-title">
              <div className="flex items-center justify-between mb-4">
                <h2 id="exp-shelf-title" className="text-lg font-semibold text-[#0f0f0f]">
                  Experience
                </h2>
                <Link
                  href="/experience"
                  className="flex items-center gap-1 text-sm font-medium text-[#065fd4] hover:text-[#0f0f0f] transition-colors"
                >
                  See all <ChevronRight size={16} />
                </Link>
              </div>
              {experience.map((exp) => (
                <Link
                  key={exp.company}
                  href="/experience"
                  className="flex flex-col sm:flex-row items-start gap-4 p-5 rounded-xl border border-[#e5e5e5] hover:border-[#c0c0c0] hover:shadow-sm transition-all bg-white"
                >
                  {/* Company avatar */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#4f8ef7] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">S</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <h3 className="font-semibold text-[#0f0f0f] text-base">{exp.role}</h3>
                      <span className="text-[#ff0033] font-semibold text-sm">@ {exp.company}</span>
                    </div>
                    <p className="text-xs text-[#606060] mt-0.5">
                      {exp.period} · {exp.location}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {exp.proofPoints.map((pt, i) => (
                        <li key={i} className="text-sm text-[#0f0f0f] flex gap-2">
                          <span className="text-[#ff0033] mt-0.5">·</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {exp.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-full bg-[#f2f2f2] text-xs text-[#606060] font-medium"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </section>

            {/* 7. Skills shelf */}
            <section className="mb-8" aria-labelledby="skills-shelf-title">
              <div className="flex items-center justify-between mb-4">
                <h2 id="skills-shelf-title" className="text-lg font-semibold text-[#0f0f0f]">
                  Skills
                </h2>
                <Link
                  href="/skills"
                  className="flex items-center gap-1 text-sm font-medium text-[#065fd4] hover:text-[#0f0f0f] transition-colors"
                >
                  See all <ChevronRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {skillGroups.map((group) => (
                  <div
                    key={group.title}
                    className="p-4 rounded-xl border border-[#e5e5e5] bg-white hover:border-[#c0c0c0] hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl" aria-hidden="true">
                        {group.icon}
                      </span>
                      <h3 className="font-semibold text-sm text-[#0f0f0f]">
                        {group.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: `${group.color}18`,
                            color: group.color,
                            border: `1px solid ${group.color}30`,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. Contact CTA shelf */}
            <section className="mb-8" aria-labelledby="contact-shelf-title">
              <div
                className="rounded-2xl p-6 sm:p-8 text-center"
                style={{ background: "linear-gradient(135deg, #f9f9f9 0%, #f2f2f2 100%)" }}
              >
                <h2
                  id="contact-shelf-title"
                  className="text-xl sm:text-2xl font-bold text-[#0f0f0f] mb-2"
                >
                  Let&apos;s Connect
                </h2>
                <p className="text-[#606060] text-sm sm:text-base mb-6 max-w-sm mx-auto">
                  Open to backend, full-stack, and GenAI engineering roles. Graduating July 2027.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ff0033] text-white text-sm font-semibold hover:bg-[#cc0000] transition-colors"
                  >
                    <Mail size={14} />
                    {profile.email}
                  </a>
                  <a
                    href={profile.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#e5e5e5] bg-white text-[#0f0f0f] text-sm font-semibold hover:bg-[#f2f2f2] transition-colors"
                  >
                    <Link2 size={14} />
                    LinkedIn
                  </a>
                  <a
                    href={profile.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#e5e5e5] bg-white text-[#0f0f0f] text-sm font-semibold hover:bg-[#f2f2f2] transition-colors"
                  >
                    <GitBranch size={14} />
                    GitHub
                  </a>
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#e5e5e5] bg-white text-[#0f0f0f] text-sm font-semibold hover:bg-[#f2f2f2] transition-colors"
                  >
                    <FileText size={14} />
                    Resume
                  </a>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
