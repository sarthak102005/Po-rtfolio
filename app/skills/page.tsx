import type { Metadata } from "next";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical skills of Sarthak Makkar — Backend, Frontend, Core CS, AI/GenAI.",
};

export default function SkillsPage() {
  return (
    <div className="content-wrap px-4 sm:px-6 py-6">
      <h1 className="text-2xl font-bold text-[#0f0f0f] mb-1">Skills</h1>
      <p className="text-sm text-[#606060] mb-8">
        Technology clusters across backend, frontend, core CS, and applied AI
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
        {skillGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-2xl border border-[#e5e5e5] bg-white overflow-hidden hover:shadow-sm transition-shadow"
          >
            {/* Banner */}
            <div
              className="h-20 w-full flex items-center px-5 gap-3"
              style={{
                background: `linear-gradient(135deg, ${group.color}22 0%, ${group.color}11 100%)`,
                borderBottom: `1px solid ${group.color}25`,
              }}
            >
              <span className="text-3xl" aria-hidden="true">{group.icon}</span>
              <div>
                <h2 className="text-base font-bold text-[#0f0f0f]">{group.title}</h2>
                <p className="text-xs text-[#606060]">{group.skills.length} technologies</p>
              </div>
            </div>

            {/* Skills */}
            <div className="p-5">
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors hover:opacity-80"
                    style={{
                      background: `${group.color}15`,
                      color: group.color,
                      border: `1px solid ${group.color}30`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Descriptor row (from spec table) */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl">
        {[
          { title: "Backend", desc: "Distributed Systems & APIs" },
          { title: "Frontend", desc: "Interactive Interfaces & UX" },
          { title: "Core CS", desc: "Foundations & Architecture" },
          { title: "Applied AI / GenAI", desc: "Pipelines & Evaluation" },
        ].map(({ title, desc }) => (
          <div key={title} className="px-4 py-3 rounded-xl bg-[#f9f9f9] border border-[#f2f2f2]">
            <p className="text-xs font-semibold text-[#0f0f0f]">{title}</p>
            <p className="text-xs text-[#606060] mt-0.5">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
