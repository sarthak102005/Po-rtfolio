import type { Metadata } from "next";
import { Mail, GitBranch, Link2, Phone, FileText, MapPin } from "lucide-react";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Sarthak Makkar — email, LinkedIn, GitHub, and resume.",
};

export default function ContactPage() {
  return (
    <div className="content-wrap px-4 sm:px-6 py-6">
      <h1 className="text-2xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-1">Contact</h1>
      <p className="text-sm text-[#606060] dark:text-[#aaaaaa] mb-8">
        Open to backend, fullstack, and GenAI engineering roles
      </p>

      <div className="max-w-xl space-y-4">
        {/* Email */}
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-4 p-4 rounded-xl border border-[#e5e5e5] dark:border-[#282828] bg-white dark:bg-[#181818] hover:border-[#c0c0c0] dark:hover:border-[#404040] hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#fff0f0] dark:bg-[#331115] flex items-center justify-center flex-shrink-0">
            <Mail size={18} className="text-[#ff0033]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">Email</p>
            <p className="text-sm font-semibold text-[#065fd4] dark:text-[#3ea6ff] group-hover:underline truncate">
              {profile.email}
            </p>
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href={profile.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl border border-[#e5e5e5] dark:border-[#282828] bg-white dark:bg-[#181818] hover:border-[#c0c0c0] dark:hover:border-[#404040] hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#e8f3ff] dark:bg-[#112233] flex items-center justify-center flex-shrink-0">
            <Link2 size={18} className="text-[#0a66c2] dark:text-[#388bfd]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">LinkedIn</p>
            <p className="text-sm font-semibold text-[#065fd4] dark:text-[#3ea6ff] group-hover:underline truncate">
              {profile.linkedin.label}
            </p>
          </div>
        </a>

        {/* GitHub */}
        <a
          href={profile.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl border border-[#e5e5e5] dark:border-[#282828] bg-white dark:bg-[#181818] hover:border-[#c0c0c0] dark:hover:border-[#404040] hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#f2f2f2] dark:bg-[#272727] flex items-center justify-center flex-shrink-0">
            <GitBranch size={18} className="text-[#0f0f0f] dark:text-[#f1f1f1]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">GitHub</p>
            <p className="text-sm font-semibold text-[#065fd4] dark:text-[#3ea6ff] group-hover:underline truncate">
              {profile.github.label}
            </p>
          </div>
        </a>

        {/* Phone */}
        <a
          href={`tel:${profile.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-4 p-4 rounded-xl border border-[#e5e5e5] dark:border-[#282828] bg-white dark:bg-[#181818] hover:border-[#c0c0c0] dark:hover:border-[#404040] hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#f0faf4] dark:bg-[#0f2e1a] flex items-center justify-center flex-shrink-0">
            <Phone size={18} className="text-[#16a34a] dark:text-[#3fb950]" />
          </div>
          <div>
            <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">Phone</p>
            <p className="text-sm font-semibold text-[#065fd4] dark:text-[#3ea6ff] group-hover:underline">
              {profile.phone}
            </p>
          </div>
        </a>

        {/* Location */}
        <div className="flex items-center gap-4 p-4 rounded-xl border border-[#e5e5e5] dark:border-[#282828] bg-white dark:bg-[#181818]">
          <div className="w-10 h-10 rounded-full bg-[#fff8e8] dark:bg-[#2e2208] flex items-center justify-center flex-shrink-0">
            <MapPin size={18} className="text-[#d97706] dark:text-[#f59e0b]" />
          </div>
          <div>
            <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">Location</p>
            <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">{profile.location}</p>
          </div>
        </div>

        {/* Resume CTA */}
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          download="Sarthak_Resume.pdf"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#ff0033] text-white text-sm font-semibold hover:bg-[#cc0000] transition-colors mt-2 shadow-sm"
        >
          <FileText size={16} />
          View / Download Resume (PDF)
        </a>
      </div>
    </div>
  );
}
