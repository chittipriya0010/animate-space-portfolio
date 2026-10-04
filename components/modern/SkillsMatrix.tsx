"use client";

import React from "react";
import { motion } from "framer-motion";
import { SKILL_CATEGORIES } from "@/constants/portfolioData";

const smoothEase = [0.16, 1, 0.3, 1];

export default function SkillsMatrix() {
  return (
    <section id="skills" className="relative py-28 border-b border-white/[0.06] overflow-hidden">
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
              Capabilities / 03
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-100 mt-2">
              Technical Arsenal
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-sm font-normal leading-relaxed">
            Production stacks spanning cross-platform mobile architectures, distributed backend engines, and applied AI systems.
          </p>
        </motion.div>

        {/* 4 Clean Visual Cards with Tactile Skill Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: smoothEase }}
              className="card-behance rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/[0.06]">
                  <h3 className="font-medium text-base text-neutral-100">
                    {category.title}
                  </h3>
                  <span className="font-mono text-[11px] text-neutral-500">
                    0{idx + 1}
                  </span>
                </div>

                {/* Tactile Skill Chips */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-900/90 border border-white/[0.07] text-neutral-300 font-mono text-xs hover:border-neutral-600 hover:text-white transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
