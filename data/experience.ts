export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  proofPoints: string[];
  stack: string[];
  type: "internship" | "fulltime" | "contract";
};

export const experience: ExperienceEntry[] = [
  {
    company: "ShortHills AI",
    role: "Technology Intern",
    period: "Jun 2026 – Aug 2026",
    location: "Gurugram, India",
    type: "internship",
    proofPoints: [
      "Migrated retrieval backend from FAISS to Qdrant with chunking strategy tuning — achieved 92% retrieval completeness",
      "Built multi-provider LLM fallback system for rate-limit resilience across production workloads",
      "Delivered Quantum Scraper: 91.08% extraction accuracy via multi-agent LLM fallback pipeline using Google ADK and MCP",
    ],
    stack: ["Python", "Google ADK", "MCP", "Qdrant", "FastAPI"],
  },
];
