"use client";

import React from "react";
import { usePortfolio } from "./PortfolioContext";
import { PORTFOLIO_PROFILE } from "@/constants/portfolioData";

export default function ModernFooter() {
  const { mode, toggleMode, theme, toggleTheme, setIsResumeOpen } = usePortfolio();

  return (
    <footer className="border-t border-white/[0.06] bg-[#0C0D10] py-12 text-xs font-mono text-neutral-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <span className="text-neutral-300 font-medium font-sans">
            {PORTFOLIO_PROFILE.name}
          </span>
          <span className="text-neutral-700 hidden sm:inline">/</span>
          <span>Designed with restraint &amp; precision</span>
        </div>

        {/* Center: Dual Mode Switch & Theme Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800 text-[11px] text-neutral-300 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            title="Toggle Light/Dark Theme"
          >
            <span className="whitespace-nowrap">{theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}</span>
          </button>

          <button
            onClick={toggleMode}
            className="px-3 py-1.5 rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800 text-[11px] text-neutral-300 transition-colors whitespace-nowrap"
            title="Switch Between Space 3D and 2D Page"
          >
            <span className="whitespace-nowrap">
              {mode === "space" ? "Switch to 2D Page 📄" : "Launch Space 3D 🌌"}
            </span>
          </button>
          <a
            href="/resume.pdf"
            download="Chittipriya_Verma_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md hover:bg-neutral-900 text-[11px] text-neutral-400 hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap"
            title="Download Chittipriya Verma Resume PDF"
          >
            <span className="whitespace-nowrap">Download CV ↓</span>
          </a>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 text-neutral-400">
          <a
            href={PORTFOLIO_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href={`mailto:${PORTFOLIO_PROFILE.email}`}
            className="hover:text-white transition-colors"
          >
            Email ↗
          </a>
          <a
            href="#hero"
            className="hover:text-white transition-colors"
          >
            Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
