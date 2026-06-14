"use client";

import React, { useEffect, useState, useRef } from "react";
import { Project } from "@/portfolio.config";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";

interface ProjectCardProps {
  project: Project & { accuracy?: string };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden bg-surface-1 border border-hairline rounded-lg p-6 transition-all duration-300 hover:bg-surface-2 hover:border-hairline-strong",
        project.gridArea || ""
      )}
    >
      <div className="flex flex-col space-y-4">
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
      <div className="mt-6 w-full h-44 rounded-md border border-hairline/40 bg-canvas overflow-hidden relative flex items-center justify-center">
        {project.innerWidget === "algogenie" && <AlgoGenieWidget />}
        {project.innerWidget === "litrev" && <LitRevWidget />}
        {project.innerWidget === "personabot" && <PersonaBotWidget />}
        {project.innerWidget === "visionary" && <VisionaryWidget />}
        {project.innerWidget === "hr" && (
          <HrWidget accuracy={project.accuracy || "76.43%"} />
        )}
        {project.innerWidget === "studyai" && <StudyAiWidget />}
      </div>
    </div>
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

  useEffect(() => {
    const list = [
      { method: "POST", path: "/api/auth/login", status: 200, time: "18ms" },
      { method: "GET", path: "/api/dashboard", status: 200, time: "8ms" },
      { method: "POST", path: "/api/projects/create", status: 201, time: "34ms" },
      { method: "PUT", path: "/api/user/profile", status: 200, time: "12ms" },
      { method: "DELETE", path: "/api/session/logout", status: 204, time: "5ms" },
    ];

    let timer = setInterval(() => {
      setLogs((prev) => {
        const nextLog = list[prev.length % list.length];
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

  return (
    <div className="w-full h-full p-4 flex flex-wrap gap-2 items-center justify-center select-none">
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className={cn(
            "px-2.5 py-1 rounded-sm text-mono text-[10px] font-semibold transition-all duration-300 hover:border-accent/50",
            idx % 3 === 0
              ? "bg-accent/15 border border-accent/20 text-accent-hover"
              : idx % 3 === 1
              ? "bg-surface-2 border border-hairline text-ink-muted"
              : "bg-surface-3 border border-hairline/50 text-ink-subtle"
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
