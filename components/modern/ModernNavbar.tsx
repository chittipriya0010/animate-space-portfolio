"use client";

import React from "react";
import { usePortfolio } from "./PortfolioContext";
import { PORTFOLIO_PROFILE } from "@/constants/portfolioData";

export default function ModernNavbar() {
  const { mode, setMode, toggleMode, theme, toggleTheme, setIsResumeOpen } = usePortfolio();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0C0D10]/85 backdrop-blur-md transition-all duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand identity */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-neutral-800 border border-white/10 flex items-center justify-center font-mono font-medium text-xs text-neutral-200 group-hover:border-neutral-500 transition-colors">
            CP
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-sm tracking-tight text-neutral-100 group-hover:text-white transition-colors">
              {PORTFOLIO_PROFILE.name}
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-500">
              / mobile & full-stack
            </span>
          </div>
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-neutral-400 font-medium">
          <a
            href="#mobile-showcase"
            className="hover:text-neutral-100 transition-colors flex items-center gap-1.5"
          >
            <span>Mobile Apps</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-amber-500/10 text-amber-400 font-mono">
              3
            </span>
          </a>
          <a
            href="#projects"
            className="hover:text-neutral-100 transition-colors"
          >
            Work & ERP
          </a>
          <a
            href="#skills"
            className="hover:text-neutral-100 transition-colors"
          >
            Capabilities
          </a>
          <a
            href="#contact"
            className="hover:text-neutral-100 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Center/Action: PAGE / SPACE 3D Segmented Control (VEA Inspired) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-0.5 rounded-full bg-neutral-900/80 border border-neutral-700/60 shadow-inner">
            <button
              onClick={() => setMode("page")}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                mode === "page"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
              title="Editorial 2D Page View"
            >
              PAGE
            </button>
            <button
              onClick={() => setMode("space")}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap ${
                mode === "space"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
              title="Real-Time 3D Spatial Universe"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="whitespace-nowrap">SPACE 3D</span>
            </button>
          </div>

          {/* Dark / Light Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-neutral-700/60 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-all flex items-center justify-center shadow-sm whitespace-nowrap"
            title={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
            aria-label="Toggle dark/light theme"
          >
            {theme === "dark" ? (
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Direct Resume Download button */}
          <a
            href="/resume.pdf"
            download="Chittipriya_Verma_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-200 hover:text-white flex items-center gap-1.5 shadow-sm whitespace-nowrap"
            title="Download Chittipriya Verma Resume PDF"
          >
            <svg
              className="w-3.5 h-3.5 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="whitespace-nowrap">Download CV</span>
          </a>

          <button
            onClick={() => setIsResumeOpen(true)}
            className="p-1.5 text-neutral-400 hover:text-neutral-200 transition-colors whitespace-nowrap"
            title="Preview Resume Credentials"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
