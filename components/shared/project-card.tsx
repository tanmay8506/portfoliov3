"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Project } from "@/portfolio.config";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";

interface ProjectCardProps {
  project: Project & { accuracy?: string };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(0);
  const [glowY, setGlowY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setGlowX(x);
    setGlowY(y);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -6; // max 6 degrees X rotation
    const rY = ((x - centerX) / centerX) * 6;  // max 6 degrees Y rotation
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        y: isHovered ? -5 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden bg-surface-1 border border-hairline rounded-xl p-6 transition-colors duration-300 hover:bg-surface-2/80 hover:border-hairline-strong h-full",
        project.gridArea || ""
      )}
    >
      {/* Dynamic Radial Glow Spot */}
      {isHovered && (
        <div
          className="absolute pointer-events-none inset-0 z-0 opacity-15 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 250px at ${glowX}px ${glowY}px, rgba(0, 245, 160, 0.45), transparent 80%)`,
          }}
        />
      )}

      <div className="flex flex-col space-y-4 relative z-10">
        {/* Category Label */}
        <div className="flex items-center justify-between">
          <span className="text-mono text-body-sm text-accent uppercase tracking-wider font-semibold">
            {project.category}
          </span>
          <div className="flex items-center space-x-3 text-ink-subtle">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors duration-150"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink transition-colors duration-150"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-card-title font-sans font-semibold text-ink leading-snug text-balance">
            {project.title}
          </h3>
          <p className="mt-2 text-body-sm text-ink-muted leading-relaxed max-w-65ch">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-sm bg-surface-3 border border-hairline/40 text-mono text-[11px] text-ink-subtle font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Unique Custom Inner Widget Visual (No images!) */}
      <div className="mt-6 w-full h-44 rounded-md border border-hairline/40 bg-canvas overflow-hidden relative z-10 flex items-center justify-center">
        {project.innerWidget === "algogenie" && <AlgoGenieWidget />}
        {project.innerWidget === "vibe-coder" && <VibeCoderWidget />}
        {project.innerWidget === "langgraph-hitl" && <LangGraphHitlWidget />}
        {project.innerWidget === "rag-queue" && <RagQueueWidget />}
        {project.innerWidget === "the-ink" && <TheInkWidget />}
        {project.innerWidget === "flight-finder" && <FlightFinderWidget />}
        {project.innerWidget === "arm-artistry" && <ArmArtistryWidget />}
        {project.innerWidget === "litrev" && <LitRevWidget />}
        {project.innerWidget === "personabot" && <PersonaBotWidget />}
        {project.innerWidget === "visionary" && <VisionaryWidget />}
        {project.innerWidget === "hr" && (
          <HrWidget accuracy={project.accuracy || "76.43%"} />
        )}
        {project.innerWidget === "studyai" && <StudyAiWidget />}
      </div>
    </motion.div>
  );
}

/* ==========================================
   1. AlgoGenie Widget: Coder-Executor chat
   ========================================== */
function AlgoGenieWidget() {
  const [step, setStep] = useState(0);
  const messages = [
    { sender: "Coder", text: "Writing binary search script...", type: "system" },
    { sender: "Coder", text: "def search(arr, target):", type: "code" },
    { sender: "Executor", text: "Spinning up Docker sandbox...", type: "system" },
    { sender: "Executor", text: "Running tests: 5 passed, 0 failed", type: "success" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % (messages.length + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-4 font-mono text-[11px] flex flex-col justify-center space-y-2 select-none">
      {messages.slice(0, step).map((msg, idx) => (
        <div key={idx} className="flex items-start space-x-1.5 animate-fadeIn">
          <span
            className={cn(
              "font-semibold uppercase text-[9px] px-1 rounded-xs",
              msg.sender === "Coder"
                ? "bg-accent/20 text-accent"
                : "bg-surface-3 text-ink-muted"
            )}
          >
            {msg.sender}
          </span>
          <span
            className={cn(
              "flex-1",
              msg.type === "code"
                ? "text-accent-hover font-bold"
                : msg.type === "success"
                ? "text-success"
                : "text-ink-muted"
            )}
          >
            {msg.text}
          </span>
        </div>
      ))}
      {step === 0 && (
        <div className="text-ink-tertiary flex items-center justify-center h-full">
          <span>Awaiting execution...</span>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   2. LitRev Widget: Flowchart Agent Nodes
   ========================================== */
function LitRevWidget() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 select-none">
      <div className="flex flex-col items-center space-y-3 w-full max-w-[200px]">
        {/* Node 0: Query */}
        <div
          className={cn(
            "w-full text-center border py-1.5 rounded-md font-mono text-[11px] transition-all duration-300",
            activeNode === 0
              ? "bg-accent/15 border-accent text-accent shadow-[0_0_10px_rgba(94,106,210,0.2)]"
              : "bg-surface-2 border-hairline text-ink-subtle"
          )}
        >
          User Topic Input
        </div>

        {/* Connector 1 */}
        <div className="h-4 w-[1px] bg-hairline relative">
          <div
            className={cn(
              "absolute inset-0 bg-accent transition-all duration-500",
              activeNode === 1 ? "h-full" : "h-0"
            )}
          />
        </div>

        {/* Node 1: Search Agent */}
        <div
          className={cn(
            "w-full text-center border py-1.5 rounded-md font-mono text-[11px] transition-all duration-300",
            activeNode === 2
              ? "bg-accent/15 border-accent text-accent shadow-[0_0_10px_rgba(94,106,210,0.2)]"
              : "bg-surface-2 border-hairline text-ink-subtle"
          )}
        >
          Search Agent (arXiv API)
        </div>

        {/* Connector 2 */}
        <div className="h-4 w-[1px] bg-hairline relative">
          <div
            className={cn(
              "absolute inset-0 bg-accent transition-all duration-500",
              activeNode === 3 ? "h-full" : "h-0"
            )}
          />
        </div>

        {/* Node 2: Synthesis */}
        <div
          className={cn(
            "w-full text-center border py-1.5 rounded-md font-mono text-[11px] transition-all duration-300",
            activeNode === 0
              ? "bg-surface-2 border-hairline text-ink-subtle"
              : activeNode === 3
              ? "bg-success/10 border-success text-success"
              : "bg-surface-2 border-hairline text-ink-subtle"
          )}
        >
          Summarizer (Llama-3.3)
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   3. PersonaBot Widget: Bubble Chat Mockup
   ========================================== */
function PersonaBotWidget() {
  const [bubbleCount, setBubbleCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setBubbleCount((prev) => (prev === 1 ? 2 : 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-end space-y-3 font-sans text-body-sm select-none">
      {/* User Bubble */}
      <div className="flex justify-end">
        <div className="bg-surface-2 border border-hairline text-ink-muted px-3 py-2 rounded-xl rounded-tr-none max-w-[80%] leading-snug animate-fadeIn">
          How did your interview go?
        </div>
      </div>

      {/* Clone Bubble */}
      {bubbleCount >= 2 && (
        <div className="flex justify-start">
          <div className="bg-accent text-ink px-3 py-2 rounded-xl rounded-tl-none max-w-[85%] leading-snug animate-fadeIn shadow-lg">
            Honestly, it went super well! I showcased the multi-agent system.
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   4. Visionary Widget: API Log Stream
   ========================================== */
function VisionaryWidget() {
  const [logs, setLogs] = useState<
    { method: string; path: string; status: number; time: string }[]
  >([]);
  const indexRef = useRef(0);

  useEffect(() => {
    const list = [
      { method: "POST", path: "/api/auth/login", status: 200, time: "18ms" },
      { method: "GET", path: "/api/dashboard", status: 200, time: "8ms" },
      { method: "POST", path: "/api/projects/create", status: 201, time: "34ms" },
      { method: "PUT", path: "/api/user/profile", status: 200, time: "12ms" },
      { method: "DELETE", path: "/api/session/logout", status: 204, time: "5ms" },
    ];

    const timer = setInterval(() => {
      setLogs((prev) => {
        const nextLog = list[indexRef.current % list.length];
        indexRef.current += 1;
        const nextList = [...prev, nextLog];
        if (nextList.length > 4) nextList.shift();
        return nextList;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full p-4 font-mono text-[11px] flex flex-col justify-center space-y-1.5 select-none">
      {logs.map((log, idx) => (
        <div key={idx} className="flex items-center justify-between text-ink-muted animate-fadeIn">
          <div className="flex items-center space-x-2">
            <span
              className={cn(
                "px-1 py-0.5 rounded-[3px] text-[9px] font-bold",
                log.method === "POST"
                  ? "bg-accent/25 text-accent-hover"
                  : log.method === "GET"
                  ? "bg-success/20 text-success"
                  : "bg-surface-3 text-ink-subtle"
              )}
            >
              {log.method}
            </span>
            <span className="text-ink-subtle">{log.path}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-success">{log.status}</span>
            <span className="text-ink-tertiary">{log.time}</span>
          </div>
        </div>
      ))}
      {logs.length === 0 && (
        <div className="text-ink-tertiary flex items-center justify-center h-full">
          <span>HTTP Server listening on port 5000...</span>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   5. HR Absenteeism Widget: Stat Dashboard
   ========================================== */
function HrWidget({ accuracy }: { accuracy: string }) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center space-y-2 select-none">
      <span className="text-[10px] text-mono text-ink-subtle tracking-wider uppercase font-semibold">
        Model Prediction Accuracy
      </span>
      <div className="flex items-baseline space-x-1.5">
        <span
          className={cn(
            "text-4xl font-bold tracking-tight text-ink transition-transform duration-500",
            pulse ? "scale-[1.02]" : "scale-100"
          )}
        >
          {accuracy}
        </span>
      </div>
      <span className="text-[10px] text-mono text-accent bg-accent/10 px-2 py-0.5 rounded-sm">
        Logistic Regression · 700 records
      </span>
    </div>
  );
}

/* ==========================================
   6. StudyAI Widget: Syllabus Tags Cloud
   ========================================== */
function StudyAiWidget() {
  const [activeIdx, setActiveIdx] = useState(0);
  const tags = [
    "NEP 2022",
    "NLP",
    "PDF Parsing",
    "DU Exams",
    "Core Computer Science",
    "Data Structures",
    "Syllabus Notes Generator",
    "Text Summarization",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % tags.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [tags.length]);

  return (
    <div className="w-full h-full p-4 flex flex-wrap gap-2 items-center justify-center select-none">
      {tags.map((tag, idx) => {
        const isActive = idx === activeIdx;
        return (
          <span
            key={idx}
            className={cn(
              "px-2.5 py-1 rounded-sm text-mono text-[10px] font-semibold transition-all duration-300",
              isActive
                ? "bg-accent/25 border border-accent text-accent-hover shadow-[0_0_10px_rgba(94,106,210,0.25)] scale-105"
                : idx % 3 === 0
                ? "bg-accent/15 border border-accent/20 text-accent-hover"
                : idx % 3 === 1
                ? "bg-surface-2 border border-hairline text-ink-muted"
                : "bg-surface-3 border border-hairline/50 text-ink-subtle"
            )}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}

/* ==========================================
   7. Vibe Coder Widget: Voice agent loop
   ========================================== */
function VibeCoderWidget() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-4 font-mono text-[11px] flex flex-col justify-center space-y-2 select-none">
      <div className="flex items-center space-x-2 text-ink-subtle">
        <span className={cn("w-2 h-2 rounded-full", stage === 0 ? "bg-accent animate-ping" : "bg-hairline")} />
        <span className={stage === 0 ? "text-accent font-semibold" : ""}>🎤 Listening...</span>
      </div>
      {stage >= 1 && (
        <div className="text-ink animate-fadeIn">
          🗣️ &quot;Create counter in React&quot;
        </div>
      )}
      {stage >= 2 && (
        <div className="text-accent-hover font-bold animate-fadeIn">
          🤖 Working: generating file...
        </div>
      )}
      {stage >= 3 && (
        <div className="text-success font-semibold flex items-center space-x-1.5 animate-fadeIn">
          <span>🔊 Response: &quot;Done! check workspace&quot;</span>
        </div>
      )}
    </div>
  );
}

/* ==========================================
   8. LangGraph HITL Widget: Manual approval
   ========================================== */
function LangGraphHitlWidget() {
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setApproved((prev) => !prev);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center font-sans text-xs select-none">
      <div className="w-full max-w-[220px] bg-surface-2 border border-hairline rounded-md p-3 space-y-2.5 shadow-sm text-center">
        <span className="text-[10px] text-mono text-ink-subtle uppercase tracking-wider block">
          Approval Required
        </span>
        <div className="text-[11px] text-ink font-mono bg-canvas py-1 px-2 rounded border border-hairline truncate">
          delete_file(&quot;data.csv&quot;)
        </div>
        <div className="flex justify-center space-x-2">
          <button
            className={cn(
              "px-3 py-1 text-[10px] font-semibold rounded-sm transition-all duration-300",
              approved
                ? "bg-success text-ink"
                : "bg-surface-3 border border-hairline text-ink-subtle hover:text-ink"
            )}
            disabled
          >
            {approved ? "Approved ✓" : "Approve"}
          </button>
          <button
            className="px-3 py-1 text-[10px] font-semibold rounded-sm bg-surface-3 border border-hairline text-ink-subtle"
            disabled
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   9. RAG Queue Widget: Async ingestion
   ========================================== */
function RagQueueWidget() {
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-4 font-mono text-[11px] flex flex-col justify-center space-y-2.5 select-none">
      <div className="flex justify-between items-center text-ink-subtle">
        <span>Job Queue</span>
        <span className="text-accent">#8506</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <span>Document:</span>
          <span className="text-ink font-semibold">manual.pdf</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Status:</span>
          {status === 0 && <span className="text-ink-subtle">Queued in server...</span>}
          {status === 1 && <span className="text-accent-hover font-semibold">Chunking PDF (80%)</span>}
          {status === 2 && <span className="text-accent animate-pulse">Embedding [HF model]</span>}
          {status === 3 && <span className="text-success font-semibold">Saved in ChromaDB ✓</span>}
        </div>
      </div>
      <div className="w-full h-1 bg-surface-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${(status + 1) * 25}%` }}
        />
      </div>
    </div>
  );
}

/* ==========================================
   10. The Ink Widget: Blogging interface
   ========================================== */
function TheInkWidget() {
  const [status, setStatus] = useState("Draft");

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus((s) => (s === "Draft" ? "Saving..." : s === "Saving..." ? "Saved ✓" : "Draft"));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center space-y-2 font-sans text-xs select-none">
      <div className="bg-surface-2 border border-hairline rounded p-2.5 space-y-1.5 font-mono text-[10px]">
        <div className="flex justify-between border-b border-hairline/60 pb-1 text-ink-subtle">
          <span>Flask CMS Editor</span>
          <span className={cn(
            "transition-colors duration-300 font-semibold",
            status === "Saved ✓"
              ? "text-success"
              : status === "Saving..."
              ? "text-accent animate-pulse"
              : "text-ink-subtle"
          )}>
            {status}
          </span>
        </div>
        <div className="text-ink">
          <span className="text-accent-hover font-semibold">Title:</span> My First Blog Post
        </div>
        <div className="text-ink-muted leading-relaxed">
          <span className="text-accent-hover font-semibold">Body:</span> Writing full-stack blog in Flask...
        </div>
      </div>
      <div className="flex justify-between items-center text-[10px] text-ink-subtle px-1">
        <span>SQLAlchemy Relational Schema</span>
        <span className="text-accent">Gravatar Enabled</span>
      </div>
    </div>
  );
}

/* ==========================================
   11. Flight Finder Widget: Price alerts
   ========================================== */
function FlightFinderWidget() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center space-y-2 font-sans text-xs select-none">
      <div className="flex justify-between items-baseline">
        <span className="text-[10px] text-mono text-accent uppercase font-bold">DEL ✈️ LHR (London)</span>
        <span className="text-[9px] text-mono text-ink-subtle">SerpApi Tracker</span>
      </div>
      <div className="grid grid-cols-2 gap-2 bg-surface-2 p-2 rounded border border-hairline">
        <div>
          <span className="text-[9px] text-ink-subtle block">Budget Limit</span>
          <span className="text-ink font-semibold">Rs. 65,000</span>
        </div>
        <div>
          <span className="text-[9px] text-ink-subtle block">Cheapest Deal</span>
          <span className={cn("font-bold transition-all duration-300", pulse ? "text-success scale-105" : "text-ink")}>
            Rs. 58,900
          </span>
        </div>
      </div>
      <div className="text-center font-mono text-[10px] text-success bg-success/10 py-1 rounded border border-success/20 animate-pulse">
        🚨 Price Drop Detected! Email sent.
      </div>
    </div>
  );
}

/* ==========================================
   12. ARM Artistry Widget: Lamborghini Booking
   ========================================== */
function ArmArtistryWidget() {
  const [bookingStep, setBookingStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBookingStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center space-y-2.5 font-sans text-xs bg-black text-white select-none">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#202020] pb-1.5">
        <span className="text-[10px] text-mono text-white/50 tracking-wider uppercase">
          ARM Artistry · Booking
        </span>
        <span className="text-[9px] text-[#FFC000] font-bold">Lambo UI</span>
      </div>

      {/* Slots Row */}
      <div className="grid grid-cols-3 gap-1.5">
        <div className="bg-[#181818] border border-[#202020] py-1 text-center rounded-xs text-[10px] text-white/40 line-through">
          09:00 AM
        </div>
        <div
          className={cn(
            "py-1 text-center rounded-xs text-[10px] font-semibold transition-all duration-300 border",
            bookingStep === 0
              ? "bg-[#181818] border-[#202020] text-white"
              : bookingStep >= 1
              ? "bg-[#FFC000]/10 border-[#FFC000] text-[#FFC000] shadow-[0_0_8px_rgba(255,192,0,0.3)]"
              : "bg-[#181818] border-[#202020] text-white"
          )}
        >
          11:30 AM
        </div>
        <div className="bg-[#181818] border border-[#202020] py-1 text-center rounded-xs text-[10px] text-white/60">
          03:00 PM
        </div>
      </div>

      {/* Process telemtry */}
      <div className="min-h-7 flex items-center justify-center">
        {bookingStep === 1 && (
          <div className="text-[10px] text-mono text-white/80 animate-fadeIn">
            SELECTING SLOT → Requesting reservation...
          </div>
        )}
        {bookingStep === 2 && (
          <div className="text-[10px] text-mono text-[#FFC000] animate-pulse">
            SUPABASE RPC → executing hold_slot() lock...
          </div>
        )}
        {bookingStep === 3 && (
          <div className="w-full text-center font-mono text-[9px] text-[#FFC000] bg-[#FFC000]/15 py-1 rounded-xs border border-[#FFC000]/30 animate-fadeIn">
            Slot Locked for 15m (Atomic Concurrency) ✓
          </div>
        )}
      </div>
    </div>
  );
}
