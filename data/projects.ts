export type ProjectCategory = "backend" | "fullstack" | "ai" | "systems";
export type ProjectPriority = "primary" | "featured" | "secondary";

export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  priority: ProjectPriority;
  category: ProjectCategory;
  liveUrl?: string;
  githubUrl?: string;
  stack: string[];
  summary: string;
  proofPoints: string[];
  metric?: { label: string; value: string };
  architectureNotes: string[];
  chips: string[];
  color: string;
  accentColor: string;
  icon: string;
  year: string;
};

export const projects: Project[] = [
  {
    slug: "reachinbox",
    name: "ReachInbox",
    subtitle: "Email Job Scheduler",
    priority: "primary",
    category: "backend",
    liveUrl: "https://reach-inbox-topaz.vercel.app",
    stack: [
      "Node.js",
      "TypeScript",
      "Express",
      "BullMQ",
      "Redis",
      "PostgreSQL",
      "Next.js",
      "Tailwind",
      "Google OAuth",
      "Slack OAuth 2.0",
    ],
    summary:
      "Production email scheduling platform with persistent delayed-job processing, boot-time reconciliation, and exactly-once delivery guarantees.",
    proofPoints: [
      "Persistent delayed-job scheduling with boot-time reconciliation after process restarts — zero duplicate or lost sends",
      "Per-sender atomic Redis rate limiting with automatic rescheduling under load",
      "Idempotent exactly-once delivery under concurrent workers with distributed locking",
    ],
    metric: {
      label: "Delivery Guarantee",
      value: "Exactly-Once",
    },
    architectureNotes: [
      "Uses BullMQ for persistent delayed-job scheduling instead of cron — jobs survive process restarts through boot-time reconciliation",
      "Per-sender rate limiting implemented with atomic Redis counters; when a sender hits the limit, the job is automatically rescheduled rather than dropped",
      "Slack OAuth 2.0 alerts are deduplicated with distributed locking to prevent notification storms",
      "CSV bulk recipient upload with real-time scheduled/sent tracking dashboard",
      "Deployed across Render (API), Vercel (frontend), Neon PostgreSQL, and Redis",
    ],
    chips: ["Backend", "APIs", "Distributed Systems"],
    color: "#1a1a2e",
    accentColor: "#4f8ef7",
    icon: "📬",
    year: "2025",
  },
  {
    slug: "earnease",
    name: "Earnease",
    subtitle: "Earned Wage Access Platform",
    priority: "primary",
    category: "fullstack",
    liveUrl: "https://earnease-seven.vercel.app",
    stack: ["FastAPI", "PostgreSQL", "React", "Framer Motion"],
    summary:
      "Full-stack earned wage access system with a two-tier eligibility engine, six-state request lifecycle, and append-only audit logging.",
    proofPoints: [
      "Two-tier eligibility rules engine: hard-fail constraints vs negotiable rules routed to HR for approval",
      "Six-state request lifecycle with append-only audit logging separate from mutable request state",
      "Employee/HR RBAC with per-request database-backed verification and wage-accrual engine preventing duplicate advances",
    ],
    metric: {
      label: "Request States",
      value: "6-State FSM",
    },
    architectureNotes: [
      "Two-tier eligibility rules engine separates hard-fail constraints (e.g., minimum tenure) from negotiable rules routed to HR for manual approval",
      "Six-state lifecycle: Pending → Auto-Approved / Auto-Rejected / Escalated to HR → HR-Approved / HR-Rejected",
      "Append-only audit logging is kept separate from mutable request state for compliance and debugging",
      "Wage-accrual engine prevents duplicate advances within the same pay cycle",
      "Calendar-day rate limiting and bcrypt password hashing hardened against long passphrase inputs",
    ],
    chips: ["Full Stack", "Backend", "Systems"],
    color: "#0f2027",
    accentColor: "#43b89c",
    icon: "💰",
    year: "2025",
  },
  {
    slug: "quantum-scraper",
    name: "Quantum Scraper",
    subtitle: "Multi-Agent LLM-Assisted Extraction",
    priority: "featured",
    category: "ai",
    liveUrl: "https://quantum-scraper-beryl.vercel.app",
    stack: [
      "Python",
      "AsyncIO",
      "FastAPI",
      "Google ADK",
      "MCP",
      "Playwright",
      "Next.js",
      "TypeScript",
    ],
    summary:
      "Multi-agent web scraping system with LLM-assisted fallback architecture achieving 91.08% extraction accuracy across diverse web targets, built at ShortHills AI.",
    proofPoints: [
      "91.08% extraction accuracy via multi-agent LLM fallback pipeline",
      "Semantic DOM + JSON-LD + LLM reasoning with confidence-driven validation and crawl diagnostics",
      "Google ADK-based orchestration with MCP tool integration for dynamic extraction strategies",
      "AsyncIO-powered concurrent scraping with Playwright for JS-rendered pages",
    ],
    metric: {
      label: "Extraction Accuracy",
      value: "91.08%",
    },
    architectureNotes: [
      "Multi-agent pipeline: primary CSS/XPath + JSON-LD extractor → LLM fallback agent → confidence-driven validation layer",
      "Google Agent Development Kit (ADK) orchestrates agent handoffs and tool calls via MCP",
      "Playwright handles JavaScript-rendered SPAs that static scrapers cannot reach",
      "Enterprise manufacturer evaluation across diverse page structures and schemas",
      "Built and delivered during Technology Internship at ShortHills AI (Jun–Aug 2026)",
    ],
    chips: ["AI", "GenAI", "RAG", "Agents"],
    color: "#1a0533",
    accentColor: "#a855f7",
    icon: "🤖",
    year: "2026",
  },
  {
    slug: "ask-wiki",
    name: "Ask-Wiki",
    subtitle: "RAG-Based Wikipedia Chatbot",
    priority: "featured",
    category: "ai",
    stack: [
      "Python",
      "RAG",
      "Sentence-Transformers",
      "Vector Database",
      "RAGAS",
      "DeepEval",
      "FastAPI",
    ],
    summary:
      "RAG-based chatbot over Wikipedia with a full evaluation pipeline using RAGAS and DeepEval, achieving 89% composite score with 92% precision at threshold across 7,500 test queries.",
    proofPoints: [
      "89% composite evaluation score measured by RAGAS and DeepEval frameworks",
      "92% precision at threshold across 7,500 test queries with evaluation-driven RAG tuning",
      "Configurable chunking/overlap and model fallbacks for retrieval robustness",
    ],
    metric: {
      label: "Composite Score",
      value: "89%",
    },
    architectureNotes: [
      "Retrieval pipeline: query → embedding → vector search → top-k chunks → LLM synthesis",
      "Sentence-Transformers used for dense embeddings with cosine similarity retrieval",
      "Configurable chunking and overlap strategy for different Wikipedia article sizes",
      "RAGAS evaluates faithfulness, answer relevancy, context recall, and context precision",
      "DeepEval provides additional G-Eval and hallucination detection metrics",
      "7,500 test query evaluation set for systematic RAG performance benchmarking",
    ],
    chips: ["AI", "RAG", "GenAI"],
    color: "#002244",
    accentColor: "#3b82f6",
    icon: "📚",
    year: "2026",
  },
  {
    slug: "briefly",
    name: "Brief.ly",
    subtitle: "URL Shortener & Analytics",
    priority: "secondary",
    category: "backend",
    stack: ["FastAPI", "PostgreSQL", "Redis", "React", "Docker Compose"],
    summary:
      "High-performance URL shortener with Redis cache-aside resolution, per-user/IP rate limiting, and real-time click analytics dashboard.",
    proofPoints: [
      "Cache-aside pattern with Redis for sub-millisecond redirect resolution",
      "Per-user/IP rate limiting to prevent abuse and ensure fair usage",
      "Real-time click analytics with geographic and referrer tracking",
    ],
    metric: {
      label: "Caching Pattern",
      value: "Cache-Aside",
    },
    architectureNotes: [
      "Cache-aside: read from Redis first, fall back to PostgreSQL, populate cache on miss",
      "Short codes generated with base-62 encoding for collision-free compact URLs",
      "Analytics aggregated asynchronously to avoid write amplification on hot paths",
      "Docker Compose for local multi-service orchestration (API, DB, cache)",
    ],
    chips: ["Backend", "APIs", "Systems"],
    color: "#0a1628",
    accentColor: "#f59e0b",
    icon: "🔗",
    year: "2025",
  },
];

export const topicChips = [
  "All",
  "AI",
  "Backend",
  "Full Stack",
  "Systems",
  "GenAI",
  "RAG",
  "APIs",
  "Distributed Systems",
  "Frontend",
  "Projects",
];

export function filterProjects(allProjects: Project[], chip: string): Project[] {
  if (chip === "All") return allProjects;
  const lower = chip.toLowerCase();
  return allProjects.filter(
    (p) =>
      p.chips.some((c) => c.toLowerCase() === lower) ||
      p.category.toLowerCase().includes(lower) ||
      p.stack.some((s) => s.toLowerCase().includes(lower)) ||
      p.subtitle.toLowerCase().includes(lower) ||
      p.summary.toLowerCase().includes(lower)
  );
}
