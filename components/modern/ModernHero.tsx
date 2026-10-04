"use client";

import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_PROFILE } from "@/constants/portfolioData";
import { usePortfolio } from "./PortfolioContext";
import dynamic from "next/dynamic";

const Avatar3D = dynamic(() => import("@/components/canvas/Avatar3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] flex flex-col items-center justify-center font-mono text-xs text-neutral-500">
      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
      <span>Loading 3D Avatar...</span>
    </div>
  ),
});

const smoothEase = [0.16, 1, 0.3, 1];

export default function ModernHero() {
  const { setMode, setIsResumeOpen } = usePortfolio();

  return (
    <section id="hero" className="relative pt-12 pb-20 border-b border-white/[0.06] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Editorial Intro & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability status tag */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: smoothEase }}
              className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono tracking-wide text-neutral-300">
                Available for Mobile Architecture &amp; High-Impact Roles
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: smoothEase }}
                className="text-4xl sm:text-6xl font-medium tracking-tight text-neutral-100 leading-[1.12]"
              >
                Architecting <span className="font-serif-editorial italic font-normal text-amber-200/95">fluid</span> mobile apps &amp;{" "}
                <span className="font-serif-editorial italic font-normal text-neutral-300">resilient</span> enterprise systems.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: smoothEase }}
                className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal"
              >
                I&apos;m <span className="text-neutral-100 font-medium">Chittipriya Verma</span>, a Software Engineer crafting
                production-grade mobile products (Flutter &amp; React Native), scalable distributed platforms, and applied AI systems.
              </motion.p>
            </div>

            {/* Action Row with 3D Space Launch & CV */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: smoothEase }}
              className="pt-2 flex flex-wrap items-center gap-3.5"
            >
              {/* Direct Jump to 3D Space Mode (VEA Inspired) */}
              <button
                onClick={() => setMode("space")}
                className="btn-tactile px-4 sm:px-5 py-2.5 rounded-xl text-xs font-mono font-medium text-white flex items-center gap-2 hover:border-cyan-400/40 transition-all shadow-lg whitespace-nowrap"
                title="Enter Real-Time 3D Spatial Universe"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="whitespace-nowrap">Enter 3D Space Experience</span>
                <span className="text-cyan-300">↗</span>
              </button>

              <a
                href="/resume.pdf"
                download="Chittipriya_Verma_Resume.pdf"
                className="px-4 py-2.5 rounded-xl border border-white/[0.08] hover:border-white/[0.2] bg-white/[0.02] text-xs font-medium text-neutral-300 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap"
                title="Download official PDF resume"
              >
                <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="whitespace-nowrap">Download CV</span>
              </a>

              <button
                onClick={() => setIsResumeOpen(true)}
                className="p-2.5 rounded-xl border border-white/[0.08] hover:border-white/[0.2] text-neutral-400 hover:text-neutral-200 transition-colors whitespace-nowrap"
                title="Quick preview resume credentials"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* Right: Interactive 3D Cybernetic Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Glowing Backdrop Ring */}
            <div className="absolute w-[280px] h-[280px] rounded-full bg-cyan-500/10 filter blur-3xl pointer-events-none -z-10" />
            
            <div className="w-full max-w-[380px] h-[380px] sm:h-[420px] rounded-3xl border border-white/10 bg-neutral-950/40 backdrop-blur-sm p-2 shadow-2xl relative overflow-hidden">
              <Avatar3D scale={1.3} className="w-full h-full" />
            </div>
          </motion.div>
        </div>

        {/* Minimalist Editorial Capabilities Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.38 }}
          className="mt-14 pt-6 border-t border-white/[0.05] flex flex-wrap items-center justify-between text-xs text-neutral-400 font-mono gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80"></span>
            <span>Flutter &amp; React Native Mobile Architecture</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80"></span>
            <span>Enterprise ERP &amp; Rust Distributed Systems</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80"></span>
            <span>Applied AI Workflows</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
