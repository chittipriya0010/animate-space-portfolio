"use client";

import React from "react";
import ModernNavbar from "./ModernNavbar";
import ModernHero from "./ModernHero";
import MobileShowcase from "./MobileShowcase";
import ProjectsSection from "./ProjectsSection";
import SkillsMatrix from "./SkillsMatrix";
import ContactSection from "./ContactSection";
import ModernFooter from "./ModernFooter";
import ResumeModal from "./ResumeModal";
import ChickFollower from "../chick/ChickFollower";

import { usePortfolio } from "./PortfolioContext";

export default function ModernPortfolio() {
  const { theme } = usePortfolio();

  return (
    <div
      className={`modern-portfolio-root min-h-screen transition-colors duration-200 ${
        theme === "light"
          ? "bg-[#F8F9FA] text-[#111215] selection:bg-amber-100 selection:text-amber-900"
          : "bg-[#0C0D10] text-[#F4F4F6] selection:bg-neutral-700 selection:text-white"
      } font-sans relative bg-grain`}
    >
      {/* Interactive Chick Cursor Follower */}
      <ChickFollower enabled={true} />

      {/* Navigation */}
      <ModernNavbar />

      {/* Main Content */}
      <main className="flex flex-col">
        <ModernHero />
        <MobileShowcase />
        <ProjectsSection />
        <SkillsMatrix />
        <ContactSection />
      </main>

      {/* Footer */}
      <ModernFooter />

      {/* Resume Quick View Modal */}
      <ResumeModal />
    </div>
  );
}
