// portfolio.config.ts
// Single source of truth — edit this file to update the entire site.

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  category: "Agentic AI" | "Full-Stack" | "ML + Data";
  github: string;
  demo?: string;
  innerWidget: "algogenie" | "litrev" | "personabot" | "visionary" | "hr" | "studyai" | "vibe-coder" | "langgraph-hitl" | "rag-queue" | "the-ink" | "flight-finder" | "arm-artistry";
  featured?: boolean;
  gridArea?: string;
}

export interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Proficient";
  percentage: number;
}

export interface TimelineEntry {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ToolTag {
  name: string;
}

export const CONFIG = {
  name: "Tanmay Gemini",
  title: "AI Product Engineer",
  tagline: "Building AI Agents That Actually Work.",
  subhead: "Python + LangGraph + AutoGen. Multi-agent systems shipped to production, not demos.",
  email: "tanmay8506@gmail.com",
  github: "https://github.com/tanmay8506",
  linkedin: "https://linkedin.com/in/tanmay-gemini-864005273",
  location: "New Delhi",
  available: true,
  currentlyBuilding: ["AlgoGenie v2", "LitRev v2"],

  seo: {
    title: "Tanmay Gemini — AI Product Engineer | Multi-Agent Systems",
    description:
      "Tanmay builds multi-agent AI systems with Python, LangGraph, and AutoGen — shipped to production, not demos. Open to senior AI engineering roles.",
    ogTitle: "Tanmay Gemini — AI Product Engineer",
    ogDescription: "Multi-agent systems. Python + LangGraph + AutoGen. Production, not demos.",
    canonical: "https://tanmay.dev",
  },

  projects: [
    {
      id: "algogenie",
      title: "AlgoGenie",
      description:
        "Multi-agent DSA team. Coder writes Python, Executor runs it in a Docker sandbox, streams results back.",
      stack: ["AutoGen", "Python", "Docker", "asyncio"],
      category: "Agentic AI",
      github: "https://github.com/tanmay8506",
      innerWidget: "algogenie",
      featured: true,
    },
    {
      id: "vibe-coder",
      title: "Vibe Coder",
      description:
        "Voice-controlled AI coding assistant. Speaks coding requests, runs a LangGraph agent workflow, and reads responses back using TTS.",
      stack: ["LangGraph", "Python", "SpeechRecognition", "gTTS"],
      category: "Agentic AI",
      github: "https://github.com/tanmay8506",
      innerWidget: "vibe-coder",
      featured: true,
    },
    {
      id: "langgraph-hitl",
      title: "LangGraph HITL",
      description:
        "Human-in-the-Loop agent orchestration. Pauses execution for user approval on sensitive tools like email and file deletion using state checkpointers.",
      stack: ["LangGraph", "Python", "Groq", "MemorySaver"],
      category: "Agentic AI",
      github: "https://github.com/tanmay8506",
      innerWidget: "langgraph-hitl",
    },
    {
      id: "rag-queue",
      title: "Asynchronous RAG Ingestion Queue",
      description:
        "Background document ingestion workflow. A web server queues parsing jobs, and background workers handle PDF chunking and embedding storage in ChromaDB.",
      stack: ["ChromaDB", "LangChain", "Python", "HuggingFace"],
      category: "ML + Data",
      github: "https://github.com/tanmay8506",
      innerWidget: "rag-queue",
    },
    {
      id: "the-ink",
      title: "The Ink",
      description:
        "Full-stack publishing CMS built with Flask. Features secure hashed user auth, role permissions (Admin post creation), and gravatar comments.",
      stack: ["Flask", "SQLAlchemy", "SQLite", "Flask-Login"],
      category: "Full-Stack",
      github: "https://github.com/tanmay8506",
      innerWidget: "the-ink",
    },
    {
      id: "flight-finder",
      title: "Intelligent Flight Price Alert System",
      description:
        "Monitors Delhi flight pricing deals via SerpApi (Google Flights) and Sheety. Emails users round-trip discount bulletins under budget thresholds.",
      stack: ["Python", "SerpApi", "Sheety", "Google Sheets"],
      category: "Full-Stack",
      github: "https://github.com/tanmay8506",
      innerWidget: "flight-finder",
    },
    {
      id: "arm-artistry",
      title: "ARM Artistry",
      description:
        "Commercial makeup atelier booking system. Features Supabase Auth, PostgreSQL schema with atomic hold slot reservation transactions, and design guidelines inspired by Lamborghini.",
      stack: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Playwright"],
      category: "Full-Stack",
      github: "https://github.com/tanmay8506",
      innerWidget: "arm-artistry",
      featured: true,
    },
    {
      id: "litrev",
      title: "LitRev",
      description:
        "2-agent literature reviewer. Search Agent queries arXiv, Summarizer Agent synthesizes structured Markdown reviews.",
      stack: ["AutoGen", "Groq", "arXiv", "Streamlit"],
      category: "Agentic AI",
      github: "https://github.com/tanmay8506",
      innerWidget: "litrev",
    },
    {
      id: "personabot",
      title: "PersonaBot",
      description:
        "Upload a WhatsApp or HTML chat export. Talk to a digital clone of anyone in it.",
      stack: ["Groq", "Python", "NLP", "Gradio"],
      category: "Agentic AI",
      github: "https://github.com/tanmay8506",
      innerWidget: "personabot",
    },
    {
      id: "visionary",
      title: "Visionary",
      description:
        "Full-stack web app with user authentication, protected routes, PostgreSQL persistence, JWT tokens.",
      stack: ["React", "Express", "PostgreSQL", "JWT"],
      category: "Full-Stack",
      github: "https://github.com/tanmay8506",
      innerWidget: "visionary",
    },
    {
      id: "hr-absenteeism",
      title: "HR Absenteeism Predictor",
      description:
        "End-to-end ML pipeline on 700 HR records. Predicts binary absenteeism. FastAPI REST with Tableau export.",
      stack: ["FastAPI", "Scikit-learn", "SQLite", "Tableau"],
      category: "ML + Data",
      github: "https://github.com/tanmay8506",
      innerWidget: "hr",
      accuracy: "76.43%",
    },
    {
      id: "studyai",
      title: "StudyAI",
      description:
        "Generates structured study notes from past exam papers for Delhi University B.Sc. NEP/UGCF 2022.",
      stack: ["Python", "NLP", "PDF", "DU"],
      category: "ML + Data",
      github: "https://github.com/tanmay8506",
      innerWidget: "studyai",
    },
  ] as (Project & { accuracy?: string })[],

  skills: [
    { name: "AI Orchestration", level: "Expert", percentage: 95 },
    { name: "Multi-Agent Systems", level: "Expert", percentage: 98 },
    { name: "LangGraph", level: "Advanced", percentage: 88 },
    { name: "Python", level: "Expert", percentage: 97 },
    { name: "JavaScript / TS", level: "Advanced", percentage: 85 },
    { name: "FastAPI / Flask", level: "Advanced", percentage: 82 },
    { name: "PostgreSQL / SQL", level: "Advanced", percentage: 80 },
    { name: "Docker / Redis", level: "Proficient", percentage: 72 },
  ] as Skill[],

  tools: [
    "AutoGen", "LangGraph", "Pydantic AI", "Ollama", "Groq",
    "React", "FastAPI", "Docker", "Redis", "SQLite",
    "Playwright", "Tableau", "Scikit-Learn", "TensorFlow",
    "Asyncio", "Knex",
  ],

  timeline: [
    {
      year: "2024",
      title: "Udemy — AI Agents in Python Certificate",
      subtitle: "LangGraph, AutoGen, Multi-Agent Orchestration",
      description: "Deep-dive into production-grade agent systems, tool use, and multi-agent coordination patterns.",
    },
    {
      year: "2024",
      title: "Acharya Narendra Dev College",
      subtitle: "B.Sc. (Hons) Computer Science",
      description: "Data Structures, OS, DBMS, Web Technologies, Python.",
    },
    {
      year: "2023",
      title: "Started building AI-first products full-time",
      subtitle: "AlgoGenie, LitRev, PersonaBot shipped to GitHub",
      description: "Moved from learning to shipping. Three production-grade agent systems built and open-sourced.",
    },
    {
      year: "2022",
      title: "First Python project",
      subtitle: "100 Days of Code",
      description: "Started the journey. Built discipline through consistency.",
    },
  ] as TimelineEntry[],

  agentTicker: {
    tools: 12,
    agents: 3,
  },

  nav: [
    { label: "Work", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Timeline", href: "#timeline" },
    { label: "Contact", href: "#contact" },
  ],
} as const;
