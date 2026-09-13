import type { Metadata } from "next";
import Link from "next/link";
import { FileText, GitBranch, Link2, Mail, MapPin, GraduationCap, Trophy } from "lucide-react";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import ProjectCard from "@/components/feed/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "About — Sarthak Makkar",
  description: "Sarthak Makkar — Backend, Full Stack, GenAI Engineer. Channel profile and portfolio.",
};

const tabs = ["Home", "Projects", "Skills", "Experience", "About"];

export default function AboutPage() {
  const featured = projects.filter((p) => p.priority === "primary" || p.priority === "featured");

  return (
    <div className="content-wrap">
      {/* Channel Banner */}
      <div
        className="w-full h-28 sm:h-36 lg:h-44"
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
        }}
        role="img"
        aria-label="Channel banner"
      >
        <div
          className="w-full h-full opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, #ff0033 0%, transparent 60%), radial-gradient(circle at 70% 30%, #4f8ef7 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Channel header */}
      <div className="px-4 sm:px-6 pb-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-8 sm:-mt-10 mb-5">
          {/* Avatar */}
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-[#ff0033] border-4 border-white flex items-center justify-center text-white font-bold text-3xl sm:text-4xl flex-shrink-0 z-10"
            aria-hidden="true"
          >
            S
          </div>

          {/* Identity */}
          <div className="flex-1 min-w-0 pt-2 sm:pt-0 sm:pb-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0f0f0f] leading-tight">
              {profile.name.full}
            </h1>
            <p className="text-sm text-[#606060] mt-0.5">{profile.handle}</p>
            <p className="text-sm text-[#606060] mt-0.5">{profile.tagline}</p>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 flex-shrink-0 sm:pb-2">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0f0f0f] text-white text-sm font-semibold hover:bg-[#333] transition-colors"
            >
              <FileText size={14} />
              View Resume
            </a>
          </div>
        </div>

        {/* Tabs */}
        <nav
          className="flex items-center gap-1 border-b border-[#e5e5e5] overflow-x-auto chips-scroll"
          aria-label="Channel tabs"
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab === "Home"
                  ? "border-[#0f0f0f] text-[#0f0f0f]"
                  : "border-transparent text-[#606060] hover:text-[#0f0f0f]"
              }`}
              role="tab"
              aria-selected={tab === "Home"}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Channel content */}
      <div className="px-4 sm:px-6 py-6 space-y-10">
        {/* Featured projects shelf */}
        <section aria-labelledby="channel-featured">
          <div className="flex items-center justify-between mb-4">
            <h2 id="channel-featured" className="text-base font-semibold text-[#0f0f0f]">
              Featured Projects
            </h2>
            <Link href="/projects" className="text-sm text-[#065fd4] hover:underline">
              See all
            </Link>
          </div>
          <div className="feed-grid">
            {featured.slice(0, 4).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>

        {/* About / Bio */}
        <section aria-labelledby="channel-about">
          <h2 id="channel-about" className="text-base font-semibold text-[#0f0f0f] mb-4">
            About
          </h2>
          <div className="rounded-xl border border-[#e5e5e5] p-5 sm:p-6 space-y-4">
            <p className="text-sm text-[#0f0f0f] leading-relaxed">
              {profile.valueProp}
            </p>
            <p className="text-sm text-[#606060] leading-relaxed">
              I&apos;m a final-year B.Tech IT student at{" "}
              <strong className="text-[#0f0f0f]">{profile.education.institution}</strong> (
              {profile.education.period}), graduating{" "}
              <strong className="text-[#0f0f0f]">{profile.education.graduatingDate}</strong> with a
              CGPA of <strong className="text-[#0f0f0f]">{profile.education.cgpa}/{profile.education.cgpaOutOf}</strong>.
              I specialize in building production-grade backend systems, full-stack applications, and AI/GenAI pipelines.
            </p>

            {/* Education block */}
            <div className="flex flex-wrap gap-4 pt-2 border-t border-[#f2f2f2]">
              <div className="flex items-center gap-2 text-sm text-[#606060]">
                <GraduationCap size={15} className="text-[#ff0033]" />
                <span>{profile.education.degree} · {profile.education.shortInstitution}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#606060]">
                <MapPin size={15} className="text-[#ff0033]" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#606060]">
                <Trophy size={15} className="text-[#ff0033]" />
                <span>Hackhazards &apos;24 — Top 15</span>
              </div>
            </div>

            {/* Academic detail */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { label: "CGPA", value: `${profile.education.cgpa}/10.0` },
                { label: "Class 12", value: profile.education.board12.split("—")[1].trim() },
                { label: "Class 10", value: profile.education.board10.split("—")[1].trim() },
                { label: "Graduating", value: profile.education.graduatingDate },
              ].map(({ label, value }) => (
                <div key={label} className="px-3 py-2 rounded-lg bg-[#f9f9f9] text-center min-w-[80px]">
                  <p className="text-xs text-[#606060]">{label}</p>
                  <p className="text-sm font-semibold text-[#0f0f0f]">{value}</p>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-[#f2f2f2]">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 text-sm text-[#065fd4] hover:underline"
              >
                <Mail size={14} /> {profile.email}
              </a>
              <a
                href={profile.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-[#065fd4] hover:underline"
              >
                <Link2 size={14} /> LinkedIn
              </a>
              <a
                href={profile.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-[#065fd4] hover:underline"
              >
                <GitBranch size={14} /> GitHub
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
