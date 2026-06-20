"use client";

import React, { useState, useEffect } from "react";
import { CONFIG } from "@/portfolio.config";
import { cn } from "@/lib/utils";
import { Menu, X, FileText } from "lucide-react";
import { GithubIcon } from "@/components/shared/icons";

export function Nav() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Scroll tracker to style floating navbar dynamically
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Lock body scroll when mobile menu is open
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    // Intersection Observer to track active section
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = ["hero", "projects", "skills", "timeline", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetElement = document.getElementById("contact");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      const nameInput = document.getElementById("contact-name");
      if (nameInput) {
        setTimeout(() => {
          nameInput.focus();
        }, 800);
      }
    }
  };

  const navLinks = CONFIG.nav || [];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 select-none",
          scrolled
            ? "bg-canvas/80 backdrop-blur-md border-b border-hairline py-3 px-4 sm:px-6 md:px-10 shadow-sm"
            : "bg-transparent py-4 sm:py-6 px-4 sm:px-6 md:px-10"
        )}
      >
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 text-ink">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center space-x-2 outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm"
            aria-label="Tanmay Gemini — Home"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-7 h-7 text-accent fill-current hover:scale-105 transition-transform duration-200"
            >
              <rect x="15" y="15" width="70" height="15" rx="3" />
              <rect x="42.5" y="30" width="15" height="55" rx="3" />
            </svg>
            <span className="text-lg sm:text-xl font-semibold tracking-tight text-ink font-sans">
              TANMAY<sup className="text-[10px] font-medium text-accent">TM</sup>
            </span>
          </a>
        </div>

        {/* Center Floating Pill Menu (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 bg-surface-1/70 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-hairline/80">
          {navLinks.map((link) => {
            const targetId = link.href.replace("#", "");
            const isActive = activeSection === targetId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "text-sm px-3.5 py-2 transition-colors rounded-full font-sans font-medium",
                  isActive
                    ? "text-accent font-semibold"
                    : "text-ink-subtle hover:text-ink"
                )}
              >
                {link.label}
              </a>
            );
          })}
          <button
            onClick={handleContactClick}
            className="ml-2 bg-accent hover:bg-accent-focus text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            Hire Me
          </button>
        </div>

        {/* Right Actions Menu (Desktop / Tablet) */}
        <div className="flex items-center gap-3 sm:gap-6 text-ink">
          <a
            href="https://github.com/tanmay8506"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-ink-subtle hover:text-ink transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-ink-subtle hover:text-ink transition-colors"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
          
          {/* Hamburger Mobile Menu Toggle Button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-surface-1/70 backdrop-blur-md border border-hairline text-ink transition-all duration-300 hover:bg-surface-1"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <Menu
              className={cn(
                "w-5 h-5 absolute transition-all duration-300",
                menuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
              )}
            />
            <X
              className={cn(
                "w-5 h-5 absolute transition-all duration-300",
                menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-opacity duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "lg:hidden fixed top-0 right-0 bottom-0 z-40 w-[85%] max-w-sm bg-surface-1/95 backdrop-blur-xl border-l border-hairline shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8 justify-between">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "text-2xl font-semibold py-4 border-b border-hairline transition-all duration-500",
                    isActive ? "text-accent" : "text-ink",
                    menuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  )}
                  style={{ transitionDelay: menuOpen ? `${150 + i * 70}ms` : "0ms" }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div
            className={cn(
              "mt-8 flex flex-col gap-5 transition-all duration-500",
              menuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            )}
            style={{ transitionDelay: menuOpen ? "400ms" : "0ms" }}
          >
            <a
              href="https://github.com/tanmay8506"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-body font-medium text-ink-subtle sm:hidden"
            >
              <GithubIcon className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-body font-medium text-ink-subtle sm:hidden"
            >
              <FileText className="w-5 h-5" />
              Resume
            </a>
            <button
              onClick={handleContactClick}
              className="mt-2 w-full bg-accent hover:bg-accent-focus text-white text-body font-semibold px-5 py-3 rounded-full transition-colors cursor-pointer"
            >
              Hire Me
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
