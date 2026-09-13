import type { Metadata } from "next";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { MapPin, Calendar, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience of Sarthak Makkar — Technology Intern at ShortHills AI.",
};

export default function ExperiencePage() {
  return (
    <div className="content-wrap px-4 sm:px-6 py-6">
      <h1 className="text-2xl font-bold text-[#0f0f0f] mb-1">Experience</h1>
      <p className="text-sm text-[#606060] mb-8">Professional work history</p>

      <div className="space-y-6 max-w-3xl">
        {experience.map((exp, idx) => (
          <article
            key={exp.company}
            className="rounded-2xl border border-[#e5e5e5] bg-white overflow-hidden hover:shadow-sm transition-shadow"
          >
            {/* Header banner */}
            <div
              className="h-16 w-full"
              style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #4f8ef7 100%)",
              }}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              {/* Avatar overlapping banner */}
              <div className="-mt-7 mb-3 flex items-end gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#4f8ef7] border-4 border-white flex items-center justify-center flex-shrink-0">
                  <Briefcase size={20} className="text-white" />
                </div>
                <div className="pb-1">
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#fff3cd] text-[#856404]">
                    {exp.type === "internship" ? "Internship" : exp.type}
                  </div>
                </div>
              </div>

              {/* Role & company */}
              <h2 className="text-lg font-bold text-[#0f0f0f]">{exp.role}</h2>
              <p className="text-[#ff0033] font-semibold text-base mb-2">@ {exp.company}</p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#606060] mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {exp.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} />
                  {exp.location}
                </span>
              </div>

              {/* Proof points */}
              <ul className="space-y-3 mb-4">
                {exp.proofPoints.map((pt, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="w-5 h-5 rounded-full bg-[#ff0033] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm text-[#0f0f0f] leading-relaxed">{pt}</p>
                  </li>
                ))}
              </ul>

              {/* Stack */}
              <div className="flex flex-wrap gap-2">
                {exp.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-full bg-[#f2f2f2] text-xs font-medium text-[#606060]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}

        {/* Education card */}
        <article className="rounded-2xl border border-[#e5e5e5] bg-white overflow-hidden">
          <div
            className="h-16 w-full"
            style={{ background: "linear-gradient(135deg, #0f2027 0%, #43b89c 100%)" }}
            aria-hidden="true"
          />
          <div className="px-5 sm:px-6 pb-5 sm:pb-6">
            <div className="-mt-7 mb-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0f2027] to-[#43b89c] border-4 border-white flex items-center justify-center">
                <span className="text-white text-xl" aria-hidden="true">🎓</span>
              </div>
            </div>
            <h2 className="text-lg font-bold text-[#0f0f0f]">{profile.education.degree}</h2>
            <p className="text-[#43b89c] font-semibold text-base mb-2">{profile.education.institution}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#606060] mb-4">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {profile.education.period} · Graduating {profile.education.graduatingDate}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "CGPA", value: `${profile.education.cgpa}/10.0` },
                { label: "Class 12", value: "88% (CBSE)" },
                { label: "Class 10", value: "93.2% (CBSE)" },
                { label: "Achievement", value: "Hackhazards '24 — Top 15" },
              ].map(({ label, value }) => (
                <div key={label} className="px-3 py-2 rounded-lg bg-[#f9f9f9]">
                  <p className="text-xs text-[#606060]">{label}</p>
                  <p className="text-sm font-semibold text-[#0f0f0f]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
