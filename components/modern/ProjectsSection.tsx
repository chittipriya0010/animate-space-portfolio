"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_PROJECTS, ProjectItem } from "@/constants/portfolioData";
import { usePortfolio } from "./PortfolioContext";

const smoothEase = [0.16, 1, 0.3, 1];

type CategoryFilter = "all" | "enterprise" | "ai" | "mobile" | "system" | "fullstack";

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "Featured Works" },
  { id: "enterprise", label: "Enterprise ERP" },
  { id: "ai", label: "Applied AI" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "system", label: "Systems & Rust" },
  { id: "fullstack", label: "Full-Stack Web" },
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const { toggleMode } = usePortfolio();

  // For "all", show the 4 curated flagship projects to keep the page clean and balanced
  const filteredProjects =
    activeCategory === "all"
      ? ALL_PROJECTS.slice(0, 4)
      : ALL_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-28 border-b border-white/[0.06] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header with Generous Negative Space */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300/80">
              Proof of Work / 02
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-100 mt-2">
              Systems, ERP &amp; AI
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-sm font-normal leading-relaxed">
            Enterprise platforms, computer vision workflows, and high-concurrency systems engineered for scale and speed.
          </p>
        </motion.div>

        {/* Minimal Category Tabs */}
        <div className="flex items-center gap-2 pb-2 mb-10 overflow-x-auto scrollbar-hidden">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap relative ${
                activeCategory === cat.id
                  ? "text-neutral-100 font-medium"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-neutral-800/90 rounded-lg border border-white/10 -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Grid: Clean, high-impact cards with generous padding */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: ProjectItem, index: number) => {
              const isClassic = project.id === "classic-space-portfolio";

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.97, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -10 }}
                  transition={{ duration: 0.32, ease: smoothEase }}
                  className="card-behance rounded-2xl p-7 sm:p-8 flex flex-col justify-between group relative"
                >
                  <div className="space-y-4">
                    {/* Card Header Tag */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-400 font-medium">
                        0{index + 1} • {project.category.toUpperCase()}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-[11px]">
                        {project.badge}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-medium text-neutral-100 group-hover:text-amber-200/95 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-neutral-400 mt-1">
                        {project.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-neutral-300 font-normal leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Single Crisp Technical Highlight */}
                    {project.highlights.length > 0 && (
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-neutral-300 flex items-start gap-2">
                        <span className="text-amber-400/90 font-mono mt-0.5">✦</span>
                        <span className="leading-snug">{project.highlights[0]}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.06] space-y-4">
                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400 hover:text-neutral-200 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 text-[11px] font-mono text-neutral-600">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {isClassic ? (
                        <button
                          onClick={toggleMode}
                          className="w-full btn-tactile py-2.5 px-4 rounded-xl text-xs font-mono text-neutral-200 flex items-center justify-center gap-2 hover:border-amber-400/30 whitespace-nowrap"
                        >
                          <span className="whitespace-nowrap">Launch Classic 3D Space Theme</span>
                          <span className="text-neutral-400">↗</span>
                        </button>
                      ) : (
                        <>
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                            >
                              <span className="whitespace-nowrap">GitHub Code</span>
                              <span className="text-neutral-500">↗</span>
                            </a>
                          )}

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 btn-tactile py-2 px-3 rounded-xl text-xs font-mono text-amber-200 hover:text-amber-100 flex items-center justify-center gap-1.5 whitespace-nowrap"
                            >
                              <span className="whitespace-nowrap">Live Preview</span>
                              <span>↗</span>
                            </a>
                          )}

                          {!project.liveUrl && (
                            <span className="text-xs font-mono text-neutral-500 py-1.5 px-2 whitespace-nowrap">
                              Enterprise Verified
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
