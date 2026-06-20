"use client";

import React, { useState } from "react";
import { CONFIG } from "@/portfolio.config";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/copy-button";
import { Mail, MapPin, CheckCircle } from "lucide-react";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="w-full theme-dark py-24 select-none font-sans scroll-mt-14"
    >
      <div className="max-w-[1280px] mx-auto px-6 w-full flex flex-col space-y-12">
        {/* Title */}
        <div>
          <h2 className="text-display-lg font-semibold text-ink tracking-tight caret-cursor">
            Contact
          </h2>
        </div>

        {/* Two-Column Form Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Column: Details & Copy Email (5 cols) */}
          <div className="md:col-span-5 flex flex-col space-y-6">
            <h3 className="text-headline font-semibold text-ink-muted">
              Get in touch
            </h3>
            <p className="text-body text-ink-muted leading-relaxed max-w-[45ch]">
              I&apos;m currently open to senior AI engineering, agentic development, or
              full-stack developer roles. If you have an opportunity or just want to chat,
              drop a message.
            </p>

            {/* Info Cards */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-3 text-body-sm text-ink-muted select-text">
                <Mail className="w-4 h-4 text-accent" />
                <span>{CONFIG.email || "tanmay8506@gmail.com"}</span>
              </div>
              <div className="flex items-center space-x-3 text-body-sm text-ink-muted">
                <MapPin className="w-4 h-4 text-accent" />
                <span>{CONFIG.location || "New Delhi, India"}</span>
              </div>
            </div>

            {/* Copy Email Button */}
            <div className="pt-2">
              <CopyButton textToCopy={CONFIG.email || "tanmay8506@gmail.com"} />
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="md:col-span-7 bg-surface-1 border border-hairline rounded-xl p-6 md:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-scaleIn">
                <CheckCircle className="w-12 h-12 text-success" />
                <h4 className="text-headline font-semibold text-ink">
                  Message Sent Successfully
                </h4>
                <p className="text-body-sm text-ink-muted max-w-[40ch]">
                  Thank you for reaching out! I&apos;ve received your message and will get back
                  to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                {/* Name Input */}
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-body-sm font-semibold text-ink-muted"
                  >
                    Name
                  </label>
                  <Input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === "submitting"}
                    className="rounded-full px-5 h-11"
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-body-sm font-semibold text-ink-muted"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "submitting"}
                    className="rounded-full px-5 h-11"
                  />
                </div>

                {/* Message Input */}
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="text-body-sm font-semibold text-ink-muted"
                  >
                    Message
                  </label>
                  <Textarea
                    id="contact-message"
                    required
                    placeholder="Describe your project, team, or opportunity..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={status === "submitting"}
                    className="rounded-xl p-4 min-h-32"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
