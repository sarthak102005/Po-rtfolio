# Sarthak Makkar — YouTube-Themed Portfolio

A high-performance, YouTube-inspired personal portfolio designed for UI/UX evaluation and real-world impact. Built from the ground up as a greenfield Next.js 16 application with React 19, TypeScript, and Tailwind CSS v4.

---

## 🎬 Concept & Design System

The core design philosophy translates the familiar, desktop-grade YouTube interaction language into an engineer's personal portfolio:

- **Sticky App Bar**: YouTube logo-mark branded as Sarthak's Portfolio, real-time client-side search input, quick links (Resume, GitHub, LinkedIn), and notification bells.
- **Collapsible Guide Sidebar**: Primary navigation (*Home, Projects, About, Experience, Skills, You/Library*) with secondary categorized sections (*Explore: Backend, Full Stack, AI/GenAI, Systems*) and quick social links.
- **Chip Bar Filter**: Sticky feed categorization (*All, Backend, Full Stack, AI / GenAI, Systems*) for instantaneous project filtering.
- **Video Card Grid**: Dense project cards modeled after YouTube video thumbnails with badges (duration, category, tech stack), title, channel name, year, and metrics.
- **Immersive Watch Page (`/project/[slug]`)**:
  - Interactive player viewport with custom controls, play/pause state, timestamps, and key performance metric overlays.
  - Video chapter list with interactive timestamps seeking through project architecture breakdowns.
  - YouTube action buttons: Like, Share, Save, GitHub Repo, Live Demo.
  - Expandable video description box detailing architecture highlights and tech stacks.
  - YouTube-style recommended sidebar with related projects.
  - Simulated comments section featuring peer and lead developer testimonials.
- **Channel Surface (`/about`)**: YouTube channel page with custom channel banner, subscriber counter, verified badge, handle (`@sarthak102005`), and tabbed views (*Home, Projects, Skills, Experience, About*).
- **Search System (`/search?q=...`)**: Full-text search across projects, technical skills, and experience with empty states.
- **You / Library Surface (`/you`)**: Quick-action hub featuring career timeline, highlighted work, and quick document downloads.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16.3.5 (App Router & Turbopack)
- **Language**: TypeScript 5 (Strict mode)
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Typography**: Inter (Google Fonts)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/sarthak102005/Po-rtfolio.git
cd Po-rtfolio

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 👤 About Sarthak Makkar

- **Role**: Software Engineer / Technology Intern (Backend, Full Stack, GenAI)
- **Education**: B.Tech in Information Technology, Bhagwan Parshuram Institute of Technology (GGSIPU), CGPA: 8.495/10.0
- **Experience**: Technology Intern at ShortHills AI
- **GitHub**: [github.com/sarthak102005](https://github.com/sarthak102005)
- **LinkedIn**: [linkedin.com/in/sarthak-makkar-07085124b](https://www.linkedin.com/in/sarthak-makkar-07085124b/)
- **Email**: [makkarsarthak10@gmail.com](mailto:makkarsarthak10@gmail.com)
