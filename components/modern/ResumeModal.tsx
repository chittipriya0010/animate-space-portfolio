"use client";

import React, { useEffect } from "react";
import { usePortfolio } from "./PortfolioContext";
import { RESUME_DATA, PORTFOLIO_PROFILE } from "@/constants/portfolioData";

export default function ResumeModal() {
  const { isResumeOpen, setIsResumeOpen } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsResumeOpen(false);
      }
    };
    if (isResumeOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isResumeOpen, setIsResumeOpen]);

  if (!isResumeOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fadeIn">
      {/* Modal backdrop click area */}
      <div
        className="absolute inset-0"
        onClick={() => setIsResumeOpen(false)}
      />

      {/* Modal Body */}
      <div className="resume-modal-body relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0F1014] p-6 sm:p-10 shadow-2xl text-neutral-200 scrollbar-hidden">
        {/* Header Action Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
            Curriculum Vitae • {RESUME_DATA.name}
          </span>

          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download="Chittipriya_Verma_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile px-3.5 py-1.5 rounded-lg text-xs font-mono text-amber-200 hover:text-white flex items-center gap-1.5 whitespace-nowrap"
              title="Download Chittipriya Verma Resume PDF"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="whitespace-nowrap">Download PDF</span>
            </a>

            <button
              onClick={handlePrint}
              className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 whitespace-nowrap"
            >
              <span className="whitespace-nowrap">Print</span>
            </button>

            <button
              onClick={() => setIsResumeOpen(false)}
              className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors whitespace-nowrap"
              title="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="py-6 space-y-8 text-xs font-normal leading-relaxed">
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-medium tracking-tight text-white">
              {RESUME_DATA.name}
            </h2>
            <p className="text-amber-200/90 font-mono text-xs">
              {RESUME_DATA.title}
            </p>
            <div className="flex flex-wrap gap-4 text-neutral-500 font-mono text-[11px] pt-1">
              <span>{PORTFOLIO_PROFILE.email}</span>
              <span>{PORTFOLIO_PROFILE.location}</span>
              <span>github.com/{PORTFOLIO_PROFILE.githubUsername}</span>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Professional Profile
            </p>
            <p className="text-neutral-300 leading-relaxed">
              {RESUME_DATA.summary}
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Selected Engineering Experience
            </p>
            {RESUME_DATA.experience.map((exp, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-baseline font-medium text-neutral-200">
                  <span>{exp.role} <span className="text-neutral-500 font-normal">/ {exp.company}</span></span>
                  <span className="font-mono text-neutral-500 text-[11px]">{exp.period}</span>
                </div>
                <ul className="space-y-1.5 text-neutral-400 pl-3">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="list-disc leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Education
            </p>
            {RESUME_DATA.education.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-medium text-neutral-200">
                  <span>{edu.degree}</span>
                  <span className="font-mono text-neutral-500 text-[11px]">{edu.year}</span>
                </div>
                <p className="text-neutral-400 font-mono text-[11px]">{edu.institution}</p>
                <p className="text-neutral-500">{edu.details}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              Certifications &amp; Accreditations
            </p>
            <div className="flex flex-wrap gap-1.5">
              {RESUME_DATA.certifications.map((c, cIdx) => (
                <span
                  key={cIdx}
                  className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 font-mono text-[10px] text-neutral-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-white/[0.08] flex justify-between items-center text-xs font-mono text-neutral-500">
          <span className="whitespace-nowrap">Available immediately</span>
          <a
            href={`mailto:${PORTFOLIO_PROFILE.email}?subject=Interview%20Request%20-%20Chittipriya%20Verma`}
            className="btn-tactile px-3 py-1.5 rounded-md text-neutral-200 hover:text-white whitespace-nowrap"
          >
            <span className="whitespace-nowrap">Schedule Interview ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
