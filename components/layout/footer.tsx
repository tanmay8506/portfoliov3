import React from "react";
import { CONFIG } from "@/portfolio.config";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/icons";

export function Footer() {
  return (
    <footer className="w-full bg-canvas border-t border-hairline/80 pt-16 pb-12 select-none">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col space-y-12">
        <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0 text-body-sm text-ink-subtle">
          {/* Left Column: Copyright & Monogram info */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <svg viewBox="0 0 100 100" className="w-4 h-4 text-accent fill-current">
                <rect x="15" y="15" width="70" height="15" rx="3" />
                <rect x="42.5" y="30" width="15" height="55" rx="3" />
              </svg>
              <span className="font-semibold text-ink-muted">Tanmay Gemini</span>
            </div>
            <p>© {new Date().getFullYear()} Tanmay. Built with Next.js 15 & Tailwind v4.</p>
          </div>

          {/* Right Column: Social Links */}
          <div className="flex items-center space-x-6 text-ink-subtle">
            <a
              href={CONFIG.github || "https://github.com/tanmay8506"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors duration-150 flex items-center space-x-1"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href={CONFIG.linkedin || "https://linkedin.com/in/tanmay-gemini-864005273"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors duration-150 flex items-center space-x-1"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href={`mailto:${CONFIG.email || "tanmay8506@gmail.com"}`}
              className="hover:text-ink transition-colors duration-150 flex items-center space-x-1"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Email</span>
            </a>
          </div>
        </div>

        {/* Giant low-contrast footer wordmark */}
        <div className="w-full text-center select-none pt-8 border-t border-hairline/40">
          <span className="text-[12vw] font-bold tracking-[-0.05em] leading-none text-hairline uppercase font-sans select-none block">
            Gemini
          </span>
        </div>
      </div>
    </footer>
  );
}
