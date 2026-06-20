import React from "react";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Certifications } from "@/components/sections/certifications";
import { Education } from "@/components/sections/education";
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

      {/* Certifications Section */}
      <Certifications />

      {/* Education Section */}
      <Education />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
export const dynamic = "force-static"; // Ensure static export capability out-of-the-box
