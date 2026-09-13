export type SkillGroup = {
  title: string;
  icon: string;
  skills: string[];
  color: string;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Backend",
    icon: "⚙️",
    color: "#4f8ef7",
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Docker",
      "REST APIs",
    ],
  },
  {
    title: "Frontend",
    icon: "🎨",
    color: "#43b89c",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "Core CS",
    icon: "🧩",
    color: "#f59e0b",
    skills: ["Data Structures", "Algorithms", "SQL", "Git"],
  },
  {
    title: "Applied AI / GenAI",
    icon: "🤖",
    color: "#a855f7",
    skills: [
      "RAG Pipelines",
      "Google ADK",
      "MCP",
      "LLM Integration",
      "Sentence-Transformers",
      "Vector Databases",
      "RAGAS",
      "DeepEval",
    ],
  },
];
