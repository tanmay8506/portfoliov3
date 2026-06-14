import React from "react";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/sections/timeline";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <Skills />

      {/* Timeline Section */}
      <Timeline />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
export const dynamic = "force-static"; // Ensure static export capability out-of-the-box
