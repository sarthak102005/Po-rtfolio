import type { Metadata } from "next";
import { Mail, GitBranch, Link2, Phone, FileText, MapPin } from "lucide-react";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Sarthak Makkar — email, Link2, GitBranch, and resume.",
};

export default function ContactPage() {
  return (
    <div className="content-wrap px-4 sm:px-6 py-6">
      <h1 className="text-2xl font-bold text-[#0f0f0f] mb-1">Contact</h1>
      <p className="text-sm text-[#606060] mb-8">
        Open to backend, full-stack, and GenAI engineering roles
      </p>

      <div className="max-w-xl space-y-4">
        {/* Email */}
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-4 p-4 rounded-xl border border-[#e5e5e5] bg-white hover:border-[#c0c0c0] hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#fff0f0] flex items-center justify-center flex-shrink-0">
            <Mail size={18} className="text-[#ff0033]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[#606060]">Email</p>
            <p className="text-sm font-semibold text-[#065fd4] group-hover:underline truncate">
              {profile.email}
            </p>
          </div>
        </a>

        {/* Link2 */}
        <a
          href={profile.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl border border-[#e5e5e5] bg-white hover:border-[#c0c0c0] hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#e8f3ff] flex items-center justify-center flex-shrink-0">
            <Link2 size={18} className="text-[#0a66c2]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[#606060]">LinkedIn</p>
            <p className="text-sm font-semibold text-[#065fd4] group-hover:underline truncate">
              {profile.linkedin.label}
            </p>
          </div>
        </a>

        {/* GitBranch */}
        <a
          href={profile.github.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-4 rounded-xl border border-[#e5e5e5] bg-white hover:border-[#c0c0c0] hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#f2f2f2] flex items-center justify-center flex-shrink-0">
            <GitBranch size={18} className="text-[#0f0f0f]" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[#606060]">GitHub</p>
            <p className="text-sm font-semibold text-[#065fd4] group-hover:underline truncate">
              {profile.github.label}
            </p>
          </div>
        </a>

        {/* Phone */}
        <a
          href={`tel:${profile.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-4 p-4 rounded-xl border border-[#e5e5e5] bg-white hover:border-[#c0c0c0] hover:shadow-sm transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-[#f0faf4] flex items-center justify-center flex-shrink-0">
            <Phone size={18} className="text-[#16a34a]" />
          </div>
          <div>
            <p className="text-xs text-[#606060]">Phone</p>
            <p className="text-sm font-semibold text-[#065fd4] group-hover:underline">
              {profile.phone}
            </p>
          </div>
        </a>

        {/* Location */}
        <div className="flex items-center gap-4 p-4 rounded-xl border border-[#e5e5e5] bg-white">
          <div className="w-10 h-10 rounded-full bg-[#fff8e8] flex items-center justify-center flex-shrink-0">
            <MapPin size={18} className="text-[#d97706]" />
          </div>
          <div>
            <p className="text-xs text-[#606060]">Location</p>
            <p className="text-sm font-semibold text-[#0f0f0f]">{profile.location}</p>
          </div>
        </div>

        {/* Resume CTA */}
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#ff0033] text-white text-sm font-semibold hover:bg-[#cc0000] transition-colors mt-2"
        >
          <FileText size={16} />
          View / Download Resume
        </a>
      </div>
    </div>
  );
}
