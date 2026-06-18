"use client";

import React, { useState, useEffect } from "react";
import { CONFIG } from "@/portfolio.config";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Nav() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Intersection Observer to track active section
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger when section occupies the center of screen
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

    // Observe all sections
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
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-14 bg-canvas/80 backdrop-blur-md border-b border-hairline z-100 select-none">
        <div className="max-w-[1280px] h-full mx-auto px-6 flex items-center justify-between">
          {/* Left: T Monogram */}
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
              {/* Sleek geometric monogram T */}
              <rect x="15" y="15" width="70" height="15" rx="3" />
              <rect x="42.5" y="30" width="15" height="55" rx="3" />
            </svg>
          </a>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {CONFIG.nav.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "text-body-sm font-sans font-medium transition-colors duration-150 outline-hidden focus-visible:text-ink rounded-sm",
                    isActive ? "text-accent" : "text-ink-subtle hover:text-ink"
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="sm">
                Resume ↓
              </Button>
            </a>
            <Button variant="primary" size="sm" onClick={handleContactClick}>
              Hire Me
            </Button>
          </div>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-ink-subtle hover:text-ink transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50 rounded-md cursor-pointer"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-150 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-[280px] bg-surface-1 border-l border-hairline z-200 p-6 flex flex-col justify-between transform transition-transform duration-300 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <span className="text-mono text-xs text-ink-subtle uppercase tracking-wider font-semibold">
              Navigation
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 text-ink-subtle hover:text-ink cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col space-y-6">
            {CONFIG.nav.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "text-body font-medium transition-colors duration-150 py-1 border-b border-hairline/20",
                    isActive ? "text-accent font-semibold" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {link.label}
                </a>
              );
            })}


          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 pt-6 border-t border-hairline">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="secondary" className="w-full" size="md">
              Resume ↓
            </Button>
          </a>
          <Button
            variant="primary"
            className="w-full"
            size="md"
            onClick={handleContactClick}
          >
            Hire Me
          </Button>
        </div>
      </div>
    </>
  );
}
