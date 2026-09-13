import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, GitBranch, FileText, Mail } from "lucide-react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import ProjectCard from "@/components/feed/ProjectCard";
import ProjectGallery from "@/components/project/ProjectGallery";
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

  const related = projects
    .filter(
      (p) =>
        p.slug !== project.slug &&
        (p.category === project.category ||
          p.priority === project.priority ||
          p.categories.some((c) => project.categories.includes(c)))
    )
    .slice(0, 3);

  const categoryLabel = project.categories?.includes("fullstack")
    ? "Fullstack"
    : project.categories?.includes("backend")
    ? "Backend"
    : project.categories?.includes("ai")
    ? "AI / GenAI"
    : project.category === "ai"
    ? "AI / GenAI"
    : project.category === "fullstack"
    ? "Fullstack"
    : project.category.charAt(0).toUpperCase() + project.category.slice(1);

  return (
    <div className="content-wrap">
      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 py-6">
        {/* ======= LEFT: Main content ======= */}
        <main className="flex-1 min-w-0" id="main-content">
          {/* Back nav */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-[#606060] dark:text-[#aaaaaa] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            All Projects
          </Link>

          {/* Large Project / Watch Page Gallery with Autoplay, Arrows, and Fullscreen Lightbox */}
          <ProjectGallery project={project} />

          {/* Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1] leading-snug mb-2">
            {project.name} — {project.subtitle}
          </h1>

          {/* Category + metric chips */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-[#f2f2f2] dark:bg-[#272727] text-xs font-semibold text-[#606060] dark:text-[#aaaaaa]">
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
            <span className="px-2.5 py-1 rounded-full bg-[#f2f2f2] dark:bg-[#272727] text-xs text-[#606060] dark:text-[#aaaaaa]">
              {project.year}
            </span>
          </div>

          {/* Channel row */}
          <div className="flex items-center gap-3 py-3 border-y border-[#e5e5e5] dark:border-[#272727] mb-4">
            <div className="w-10 h-10 rounded-full bg-[#ff0033] flex items-center justify-center text-white font-bold text-base flex-shrink-0 select-none">
              S
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">{profile.name.full}</p>
              <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">{profile.handle}</p>
            </div>
            <div className="ml-auto flex items-center gap-2 flex-wrap">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0f0f0f] dark:bg-[#f1f1f1] text-white dark:text-[#0f0f0f] text-sm font-semibold hover:opacity-90 transition-opacity"
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#e5e5e5] dark:border-[#383838] text-[#0f0f0f] dark:text-[#f1f1f1] text-sm font-semibold hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
                >
                  <GitBranch size={14} />
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <section className="mb-6" aria-labelledby="project-overview">
            <h2 id="project-overview" className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-2">
              Overview
            </h2>
            <p className="text-sm text-[#0f0f0f] dark:text-[#e0e0e0] leading-relaxed">{project.summary}</p>
          </section>

          {/* Engineering decisions */}
          <section className="mb-6" aria-labelledby="project-proof">
            <h2 id="project-proof" className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-3">
              Engineering Decisions
            </h2>
            <ul className="space-y-3">
              {project.proofPoints.map((pt, i) => (
                <li key={i} className="flex gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 select-none"
                    style={{ background: project.accentColor }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm text-[#0f0f0f] dark:text-[#e0e0e0] leading-relaxed">{pt}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Architecture / Technical notes */}
          <section className="mb-6" aria-labelledby="project-arch">
            <h2 id="project-arch" className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-3">
              Architecture Notes
            </h2>
            <div
              className="rounded-xl p-4 space-y-2 bg-[#f9f9f9] dark:bg-[#181818] border border-[#e5e5e5] dark:border-[#282828]"
            >
              {project.architectureNotes.map((note, i) => (
                <p key={i} className="text-sm text-[#0f0f0f] dark:text-[#e0e0e0] leading-relaxed flex gap-2">
                  <span style={{ color: project.accentColor }} aria-hidden="true">→</span>
                  {note}
                </p>
              ))}
            </div>
          </section>

          {/* Tech stack */}
          <section className="mb-6" aria-labelledby="project-stack">
            <h2 id="project-stack" className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-3">
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full text-sm font-medium border border-[#e5e5e5] dark:border-[#383838] bg-white dark:bg-[#212121] text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Action row: hire CTA */}
          <div className="flex flex-wrap items-center gap-3 py-4 border-t border-[#e5e5e5] dark:border-[#272727]">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Sarthak_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ff0033] text-white text-sm font-semibold hover:bg-[#cc0000] transition-colors"
            >
              <FileText size={14} />
              View Resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#e5e5e5] dark:border-[#383838] text-[#0f0f0f] dark:text-[#f1f1f1] text-sm font-semibold hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-colors"
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
          <h2 className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-4">Up next</h2>
          <div className="space-y-4">
            {related.map((rp) => (
              <ProjectCard key={rp.slug} project={rp} />
            ))}
          </div>

          {related.length === 0 && (
            <div className="p-4 rounded-xl bg-[#f9f9f9] dark:bg-[#181818] border border-[#e5e5e5] dark:border-[#282828] text-center">
              <p className="text-sm text-[#606060] dark:text-[#aaaaaa]">No related projects</p>
              <Link
                href="/projects"
                className="text-sm text-[#065fd4] dark:text-[#3ea6ff] hover:underline mt-1 block"
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
