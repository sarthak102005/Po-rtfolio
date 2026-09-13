import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, GitBranch, FileText, Mail } from "lucide-react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import ProjectCard from "@/components/feed/ProjectCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} — ${project.subtitle}`,
    description: project.summary,
  };
}

export default async function ProjectWatchPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = projects.filter(
    (p) => p.slug !== project.slug && (p.category === project.category || p.priority === project.priority)
  ).slice(0, 3);

  const categoryLabel =
    project.category === "ai"
      ? "AI / GenAI"
      : project.category === "fullstack"
      ? "Full Stack"
      : project.category.charAt(0).toUpperCase() + project.category.slice(1);

  return (
    <div className="content-wrap">
      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 py-6">
        {/* ======= LEFT: Main content ======= */}
        <main className="flex-1 min-w-0" id="main-content">
          {/* Back nav */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-[#606060] hover:text-[#0f0f0f] transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            All Projects
          </Link>

          {/* Hero thumbnail */}
          <div
            className="w-full rounded-2xl overflow-hidden mb-5"
            style={{
              aspectRatio: "16/9",
              background: `linear-gradient(135deg, ${project.color} 0%, ${project.accentColor}33 100%)`,
            }}
            role="img"
            aria-label={`${project.name} project visual`}
          >
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <span style={{ fontSize: "clamp(48px, 8vw, 80px)" }} aria-hidden="true">
                {project.icon}
              </span>
              <div
                className="px-4 py-1.5 rounded-xl text-white font-mono font-bold text-center"
                style={{ fontSize: "clamp(14px, 2vw, 22px)", background: "rgba(0,0,0,0.45)" }}
              >
                {project.name}
              </div>
              {project.metric && (
                <div
                  className="px-3 py-1 rounded-full text-white font-semibold"
                  style={{
                    fontSize: "clamp(11px, 1.5vw, 15px)",
                    background: project.accentColor,
                  }}
                >
                  {project.metric.label}: {project.metric.value}
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-[#0f0f0f] leading-snug mb-2">
            {project.name} — {project.subtitle}
          </h1>

          {/* Category + metric chips */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-[#f2f2f2] text-xs font-semibold text-[#606060]">
              {categoryLabel}
            </span>
            {project.metric && (
              <span
                className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: project.accentColor }}
              >
                {project.metric.value}
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full bg-[#f2f2f2] text-xs text-[#606060]">
              {project.year}
            </span>
          </div>

          {/* Channel row */}
          <div className="flex items-center gap-3 py-3 border-y border-[#e5e5e5] mb-4">
            <div className="w-10 h-10 rounded-full bg-[#ff0033] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
              S
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0f0f0f]">{profile.name.full}</p>
              <p className="text-xs text-[#606060]">{profile.handle}</p>
            </div>
            <div className="ml-auto flex items-center gap-2 flex-wrap">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0f0f0f] text-white text-sm font-semibold hover:bg-[#333] transition-colors"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#e5e5e5] text-[#0f0f0f] text-sm font-semibold hover:bg-[#f2f2f2] transition-colors"
                >
                  <GitBranch size={14} />
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <section className="mb-6" aria-labelledby="project-overview">
            <h2 id="project-overview" className="text-base font-semibold text-[#0f0f0f] mb-2">
              Overview
            </h2>
            <p className="text-sm text-[#0f0f0f] leading-relaxed">{project.summary}</p>
          </section>

          {/* Engineering decisions */}
          <section className="mb-6" aria-labelledby="project-proof">
            <h2 id="project-proof" className="text-base font-semibold text-[#0f0f0f] mb-3">
              Engineering Decisions
            </h2>
            <ul className="space-y-3">
              {project.proofPoints.map((pt, i) => (
                <li key={i} className="flex gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ background: project.accentColor }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm text-[#0f0f0f] leading-relaxed">{pt}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Architecture / Technical notes */}
          <section className="mb-6" aria-labelledby="project-arch">
            <h2 id="project-arch" className="text-base font-semibold text-[#0f0f0f] mb-3">
              Architecture Notes
            </h2>
            <div
              className="rounded-xl p-4 space-y-2"
              style={{ background: `${project.color}12`, border: `1px solid ${project.accentColor}25` }}
            >
              {project.architectureNotes.map((note, i) => (
                <p key={i} className="text-sm text-[#0f0f0f] leading-relaxed flex gap-2">
                  <span style={{ color: project.accentColor }} aria-hidden="true">→</span>
                  {note}
                </p>
              ))}
            </div>
          </section>

          {/* Tech stack */}
          <section className="mb-6" aria-labelledby="project-stack">
            <h2 id="project-stack" className="text-base font-semibold text-[#0f0f0f] mb-3">
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full text-sm font-medium border border-[#e5e5e5] bg-white text-[#0f0f0f] hover:bg-[#f2f2f2] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Action row: hire CTA */}
          <div className="flex flex-wrap items-center gap-3 py-4 border-t border-[#e5e5e5]">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ff0033] text-white text-sm font-semibold hover:bg-[#cc0000] transition-colors"
            >
              <FileText size={14} />
              View Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#e5e5e5] text-[#0f0f0f] text-sm font-semibold hover:bg-[#f2f2f2] transition-colors"
            >
              <Mail size={14} />
              Hire me
            </a>
          </div>
        </main>

        {/* ======= RIGHT: Related / Up Next ======= */}
        <aside
          className="lg:w-[360px] xl:w-[400px] flex-shrink-0"
          aria-label="Related projects"
        >
          <h2 className="text-base font-semibold text-[#0f0f0f] mb-4">Up next</h2>
          <div className="space-y-4">
            {related.map((rp) => (
              <ProjectCard key={rp.slug} project={rp} />
            ))}
          </div>

          {related.length === 0 && (
            <div className="p-4 rounded-xl bg-[#f9f9f9] text-center">
              <p className="text-sm text-[#606060]">No related projects</p>
              <Link
                href="/projects"
                className="text-sm text-[#065fd4] hover:underline mt-1 block"
              >
                View all projects →
              </Link>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
