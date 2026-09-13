import {
  Home,
  Compass,
  User,
  Code2,
  Briefcase,
  Library,
  Cpu,
  Globe,
  Brain,
  BookOpen,
  FolderGit2,
  FileText,
  GitBranch,
  Link2,
  Mail,
  LucideIcon,
} from "lucide-react";
import { profile } from "./profile";

export interface SidebarSearchItem {
  id: string;
  label: string;
  type: "Navigation" | "Category" | "Link";
  href: string;
  external?: boolean;
  description: string;
  keywords: string[];
  icon: LucideIcon;
}

export const sidebarSearchItems: SidebarSearchItem[] = [
  {
    id: "home",
    label: "Home",
    type: "Navigation",
    href: "/",
    external: false,
    description: "Portfolio home feed with featured projects and highlights",
    keywords: ["home", "main", "feed", "start", "landing"],
    icon: Home,
  },
  {
    id: "projects",
    label: "Projects",
    type: "Navigation",
    href: "/projects",
    external: false,
    description: "Browse all software engineering builds and systems",
    keywords: ["projects", "all projects", "work", "builds", "portfolio"],
    icon: Compass,
  },
  {
    id: "about",
    label: "About",
    type: "Navigation",
    href: "/about",
    external: false,
    description: "About Sarthak Makkar, background, education, and values",
    keywords: ["about", "bio", "profile", "sarthak", "education", "bpit"],
    icon: User,
  },
  {
    id: "skills",
    label: "Skills",
    type: "Navigation",
    href: "/skills",
    external: false,
    description: "Languages, backend, cloud, databases, and AI frameworks",
    keywords: ["skills", "technologies", "tech stack", "languages", "tools"],
    icon: Code2,
  },
  {
    id: "experience",
    label: "Experience",
    type: "Navigation",
    href: "/experience",
    external: false,
    description: "Work history including ShortHills AI internship and education",
    keywords: ["experience", "internship", "work", "shorthills", "career", "history"],
    icon: Briefcase,
  },
  {
    id: "you",
    label: "You",
    type: "Navigation",
    href: "/you",
    external: false,
    description: "Your portfolio library, saved items, and profile details",
    keywords: ["you", "library", "account", "profile"],
    icon: Library,
  },
  {
    id: "backend",
    label: "Backend",
    type: "Category",
    href: "/projects?filter=Backend",
    external: false,
    description: "Filter projects: Node.js, FastAPI, distributed systems, microservices",
    keywords: ["backend", "server", "api", "databases", "fastapi", "node"],
    icon: Cpu,
  },
  {
    id: "fullstack",
    label: "Fullstack",
    type: "Category",
    href: "/projects?filter=Fullstack",
    external: false,
    description: "Filter projects: Next.js, React, Tailwind, end-to-end applications",
    keywords: ["fullstack", "full stack", "frontend", "web", "react", "nextjs"],
    icon: Globe,
  },
  {
    id: "ai",
    label: "AI / GenAI",
    type: "Category",
    href: "/projects?filter=AI",
    external: false,
    description: "Filter projects: RAG pipelines, LLM agents, vector embeddings",
    keywords: ["ai", "genai", "artificial intelligence", "rag", "llm", "gemini", "langchain"],
    icon: Brain,
  },
  {
    id: "core-cs",
    label: "Core CS",
    type: "Category",
    href: "/projects?filter=Core+CS",
    external: false,
    description: "Filter projects: Data structures, algorithms, operating systems, DBMS",
    keywords: ["core", "core cs", "cs", "computer science", "dsa", "algorithms", "os"],
    icon: BookOpen,
  },
  {
    id: "all-projects",
    label: "All Projects",
    type: "Category",
    href: "/projects",
    external: false,
    description: "View complete gallery of production projects",
    keywords: ["all projects", "all", "everything", "catalog"],
    icon: FolderGit2,
  },
  {
    id: "resume",
    label: "Resume",
    type: "Navigation",
    href: profile.resumeUrl,
    external: true,
    description: "View or download official resume PDF in a new tab",
    keywords: ["resume", "cv", "curriculum vitae", "pdf", "hire"],
    icon: FileText,
  },
  {
    id: "github",
    label: "GitHub",
    type: "Link",
    href: profile.github.url,
    external: true,
    description: "github.com/sarthak102005 — Repositories and open source code",
    keywords: ["github", "git", "source code", "repos", "repositories"],
    icon: GitBranch,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    type: "Link",
    href: profile.linkedin.url,
    external: true,
    description: "linkedin.com/in/sarthakmakkar10 — Connect and professional network",
    keywords: ["linkedin", "network", "connect", "social"],
    icon: Link2,
  },
  {
    id: "contact",
    label: "Contact",
    type: "Navigation",
    href: "/contact",
    external: false,
    description: "Get in touch: Email, phone, and direct messages",
    keywords: ["contact", "email", "phone", "touch", "reach", "message", "hire"],
    icon: Mail,
  },
];

export function searchSidebarItems(query: string): SidebarSearchItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return sidebarSearchItems.filter((item) => {
    if (item.label.toLowerCase().includes(q)) return true;
    if (item.type.toLowerCase().includes(q)) return true;
    if (item.keywords.some((k) => k.toLowerCase().includes(q))) return true;
    return false;
  });
}
