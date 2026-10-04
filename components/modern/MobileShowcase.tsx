"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MOBILE_SHOWCASE_PROJECTS } from "@/constants/portfolioData";
import { usePortfolio } from "./PortfolioContext";

const smoothEase = [0.16, 1, 0.3, 1];

export default function MobileShowcase() {
  const { theme } = usePortfolio();
  const isLight = theme === "light";
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const activeApp = MOBILE_SHOWCASE_PROJECTS[activeAppIndex];

  return (
    <section id="mobile-showcase" className="relative py-28 border-b border-white/[0.06] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header with Generous Negative Space */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300/80">
              Selected Work / 01
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-100 mt-2">
              Mobile Engineering
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md font-normal leading-relaxed">
            Native-performance cross-platform applications built with Flutter &amp; React Native,
            engineered for sub-second streaming, offline sync, and enterprise reliability.
          </p>
        </motion.div>

        {/* Minimal Tab Switchers */}
        <div className={`flex items-center gap-2 border-b pb-3 mb-10 overflow-x-auto scrollbar-hidden ${
          isLight ? "border-slate-200" : "border-white/[0.08]"
        }`}>
          {MOBILE_SHOWCASE_PROJECTS.map((app, index) => (
            <button
              key={app.id}
              onClick={() => setActiveAppIndex(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all whitespace-nowrap relative ${
                activeAppIndex === index
                  ? isLight
                    ? "text-slate-900 font-semibold"
                    : "text-neutral-100 font-medium"
                  : isLight
                    ? "text-slate-500 hover:text-slate-900"
                    : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {activeAppIndex === index && (
                <motion.div
                  layoutId="activeTabBadge"
                  className={`absolute inset-0 rounded-lg -z-10 shadow-sm border ${
                    isLight
                      ? "bg-white border-slate-300/90 shadow-slate-200/50"
                      : "bg-neutral-800/90 border-white/10"
                  }`}
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className={isLight ? "text-slate-400" : "text-neutral-500"}>0{index + 1}</span>
              <span>{app.title.split("-")[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Showcase Canvas Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
          className="card-behance rounded-2xl p-6 sm:p-12 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Device Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className={`device-mockup-frame relative w-[285px] sm:w-[305px] h-[575px] rounded-[44px] p-3.5 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                  isLight
                    ? "bg-slate-100 border-2 border-slate-300/80 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18),0_0_0_1px_rgba(15,23,42,0.06)]"
                    : "bg-[#090A0E] border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]"
                }`}
              >
                {/* Minimal Speaker Pill */}
                <div
                  className={`w-16 h-3 rounded-full mx-auto mb-2.5 shrink-0 transition-colors duration-300 ${
                    isLight ? "bg-slate-300 border border-slate-400/20" : "bg-neutral-800/80"
                  }`}
                />

                {/* Simulated Screen Body */}
                <div
                  className={`device-mockup-screen flex-1 flex flex-col justify-between overflow-y-auto font-sans text-xs scrollbar-hidden px-2 py-1 rounded-[30px] transition-colors duration-300 ${
                    isLight ? "bg-white text-slate-900" : "bg-[#090A0E] text-neutral-100"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeApp.id}
                      initial={{ opacity: 0, scale: 0.98, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98, y: -6 }}
                      transition={{ duration: 0.28, ease: smoothEase }}
                      className="h-full flex flex-col justify-between"
                    >
                      {/* APP 1: PAYMITRA (RETAILER FINTECH) */}
                      {activeApp.id === "fintech-app" && (
                        <div className="space-y-3.5">
                          {/* Retailer Top Header */}
                          <div className={`flex justify-between items-center pt-1 pb-2 border-b transition-colors ${
                            isLight ? "border-slate-200" : "border-neutral-800"
                          }`}>
                            <div>
                              <p className={`text-[9px] font-mono uppercase tracking-wider ${
                                isLight ? "text-slate-400 font-semibold" : "text-neutral-500"
                              }`}>
                                Merchant Portal
                              </p>
                              <p className={`text-sm font-bold font-mono tracking-tight ${
                                isLight ? "text-slate-900" : "text-neutral-100"
                              }`}>
                                Chittipriya Store
                              </p>
                            </div>
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-semibold border ${
                              isLight
                                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            }`}>
                              KYC Active
                            </span>
                          </div>

                          {/* Dual Balance Wallet Card */}
                          <div className={`rounded-xl p-3.5 shadow-sm transition-all border ${
                            isLight
                              ? "bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white border-amber-200"
                              : "bg-gradient-to-br from-neutral-900 to-neutral-800/90 border-white/10"
                          }`}>
                            <div className="flex justify-between items-center mb-1">
                              <span className={`text-[10px] font-mono uppercase font-semibold ${
                                isLight ? "text-slate-600" : "text-neutral-400"
                              }`}>
                                Available Float
                              </span>
                              <span className={`text-[10px] font-mono font-bold ${
                                isLight
                                  ? "text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded border border-amber-200"
                                  : "text-amber-300"
                              }`}>
                                Comm: +₹1,420
                              </span>
                            </div>
                            <p className={`text-xl font-bold font-mono tracking-tight ${
                              isLight ? "text-slate-900" : "text-neutral-100"
                            }`}>
                              ₹48,250.00
                            </p>
                            <div className={`flex items-center gap-1.5 mt-2.5 pt-2 border-t text-[9px] font-mono font-semibold ${
                              isLight
                                ? "border-amber-200 text-emerald-700"
                                : "border-neutral-700/50 text-emerald-400"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                isLight ? "bg-emerald-600" : "bg-emerald-400"
                              }`}></span>
                              <span>Mantra RD Biometric: Ready</span>
                            </div>
                          </div>

                          {/* 4 Core Merchant Services: DMT, AEPS, BBPS, Recharge */}
                          <div>
                            <p className={`text-[9px] font-mono uppercase tracking-wider mb-2 font-bold ${
                              isLight ? "text-slate-500" : "text-neutral-500"
                            }`}>
                              Core Services
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {/* AEPS */}
                              <div className={`p-2.5 rounded-xl border transition-all ${
                                isLight
                                  ? "bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm"
                                  : "bg-neutral-900/90 border-neutral-800/80 hover:border-neutral-700"
                              }`}>
                                <div className="flex items-center justify-between text-xs mb-1.5">
                                  <span className="text-base">🏧</span>
                                  <span className={`text-[8px] font-mono px-1 rounded font-bold ${
                                    isLight ? "bg-amber-100 text-amber-800" : "bg-amber-500/10 text-amber-300"
                                  }`}>
                                    Biometric
                                  </span>
                                </div>
                                <p className={`font-bold text-xs ${isLight ? "text-slate-900" : "text-neutral-200"}`}>
                                  AEPS Cash
                                </p>
                                <p className={`text-[9px] font-mono ${isLight ? "text-slate-500" : "text-neutral-500"}`}>
                                  Withdrawal &amp; Balance
                                </p>
                              </div>

                              {/* DMT */}
                              <div className={`p-2.5 rounded-xl border transition-all ${
                                isLight
                                  ? "bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm"
                                  : "bg-neutral-900/90 border-neutral-800/80 hover:border-neutral-700"
                              }`}>
                                <div className="flex items-center justify-between text-xs mb-1.5">
                                  <span className="text-base">💸</span>
                                  <span className={`text-[8px] font-mono px-1 rounded font-bold ${
                                    isLight ? "bg-cyan-100 text-cyan-800" : "bg-cyan-500/10 text-cyan-300"
                                  }`}>
                                    24x7 IMPS
                                  </span>
                                </div>
                                <p className={`font-bold text-xs ${isLight ? "text-slate-900" : "text-neutral-200"}`}>
                                  DMT Transfer
                                </p>
                                <p className={`text-[9px] font-mono ${isLight ? "text-slate-500" : "text-neutral-500"}`}>
                                  Instant Bank Payout
                                </p>
                              </div>

                              {/* BBPS */}
                              <div className={`p-2.5 rounded-xl border transition-all ${
                                isLight
                                  ? "bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm"
                                  : "bg-neutral-900/90 border-neutral-800/80 hover:border-neutral-700"
                              }`}>
                                <div className="flex items-center justify-between text-xs mb-1.5">
                                  <span className="text-base">💡</span>
                                  <span className={`text-[8px] font-mono px-1 rounded font-bold ${
                                    isLight ? "bg-emerald-100 text-emerald-800" : "bg-emerald-500/10 text-emerald-300"
                                  }`}>
                                    Govt BBPS
                                  </span>
                                </div>
                                <p className={`font-bold text-xs ${isLight ? "text-slate-900" : "text-neutral-200"}`}>
                                  BBPS Bills
                                </p>
                                <p className={`text-[9px] font-mono ${isLight ? "text-slate-500" : "text-neutral-500"}`}>
                                  Electricity &amp; Utilities
                                </p>
                              </div>

                              {/* Recharge */}
                              <div className={`p-2.5 rounded-xl border transition-all ${
                                isLight
                                  ? "bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm"
                                  : "bg-neutral-900/90 border-neutral-800/80 hover:border-neutral-700"
                              }`}>
                                <div className="flex items-center justify-between text-xs mb-1.5">
                                  <span className="text-base">📱</span>
                                  <span className={`text-[8px] font-mono px-1 rounded font-bold ${
                                    isLight ? "bg-purple-100 text-purple-800" : "bg-purple-500/10 text-purple-300"
                                  }`}>
                                    Instant
                                  </span>
                                </div>
                                <p className={`font-bold text-xs ${isLight ? "text-slate-900" : "text-neutral-200"}`}>
                                  Recharges
                                </p>
                                <p className={`text-[9px] font-mono ${isLight ? "text-slate-500" : "text-neutral-500"}`}>
                                  Mobile, DTH &amp; FASTag
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Recent Settlement Ledger */}
                          <div className="pt-1">
                            <div className={`p-2.5 rounded-xl border flex justify-between items-center text-xs ${
                              isLight
                                ? "bg-slate-50 border-slate-200 shadow-sm"
                                : "bg-neutral-900/60 border-neutral-800"
                            }`}>
                              <div>
                                <p className={`font-semibold text-[11px] ${
                                  isLight ? "text-slate-900" : "text-neutral-200"
                                }`}>
                                  AEPS Cash Out (•••• 4821)
                                </p>
                                <p className={`text-[9px] font-mono font-medium ${
                                  isLight ? "text-emerald-700" : "text-emerald-400"
                                }`}>
                                  Commission: +₹8.50 credited
                                </p>
                              </div>
                              <span className={`font-mono text-xs font-bold ${
                                isLight ? "text-slate-900" : "text-neutral-200"
                              }`}>
                                ₹2,500.00
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* APP 2: CRICPULSE */}
                      {activeApp.id === "cricket-live-app" && (
                        <div className="space-y-3.5">
                          <div className={`rounded-xl border p-3.5 ${
                            isLight
                              ? "bg-slate-50 border-slate-200 shadow-sm"
                              : "bg-neutral-900 border-neutral-800"
                          }`}>
                            <div className="flex justify-between items-center text-[9px] font-mono mb-2">
                              <span className={`flex items-center gap-1 font-bold ${
                                isLight ? "text-emerald-700" : "text-emerald-400"
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                  isLight ? "bg-emerald-600" : "bg-emerald-400"
                                }`}></span>
                                LIVE • T20 FINALS
                              </span>
                              <span className={isLight ? "text-slate-500 font-semibold" : "text-neutral-400"}>
                                Over 18.4
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className={`font-bold text-xs ${isLight ? "text-slate-900" : "text-white"}`}>IND</p>
                                <p className={`text-lg font-bold font-mono ${isLight ? "text-amber-700" : "text-amber-300"}`}>
                                  188/4
                                </p>
                              </div>
                              <div className={`text-[10px] font-mono font-semibold ${isLight ? "text-slate-500" : "text-neutral-500"}`}>
                                CRR 9.85
                              </div>
                              <div className="text-right">
                                <p className={`font-semibold text-xs ${isLight ? "text-slate-600" : "text-neutral-400"}`}>AUS</p>
                                <p className={`text-sm font-mono font-semibold ${isLight ? "text-slate-600" : "text-neutral-400"}`}>
                                  184/8
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Over Timeline */}
                          <div>
                            <p className={`text-[9px] font-mono mb-1.5 font-bold ${isLight ? "text-slate-500" : "text-neutral-500"}`}>
                              Over 19 Progression
                            </p>
                            <div className="flex gap-2 text-center font-mono text-[11px]">
                              <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-medium ${
                                isLight ? "bg-slate-200 text-slate-800" : "bg-neutral-800 text-neutral-300"
                              }`}>
                                1
                              </span>
                              <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${
                                isLight ? "bg-blue-100 text-blue-800 border border-blue-200" : "bg-blue-900/80 text-blue-200"
                              }`}>
                                4
                              </span>
                              <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-medium ${
                                isLight ? "bg-slate-200 text-slate-800" : "bg-neutral-800 text-neutral-300"
                              }`}>
                                0
                              </span>
                              <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${
                                isLight ? "bg-purple-100 text-purple-800 border border-purple-200" : "bg-purple-900/80 text-purple-200"
                              }`}>
                                6
                              </span>
                              <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${
                                isLight ? "border border-amber-500 bg-amber-50 text-amber-700" : "border border-amber-400/60 text-amber-300"
                              }`}>
                                ●
                              </span>
                            </div>
                          </div>

                          {/* Batters */}
                          <div className={`p-3 rounded-xl border text-xs space-y-1.5 font-mono ${
                            isLight ? "bg-slate-50 border-slate-200" : "bg-neutral-900/80 border-neutral-800"
                          }`}>
                            <div className="flex justify-between">
                              <span className={`font-semibold ${isLight ? "text-slate-900" : "text-neutral-200"}`}>
                                V. Kohli *
                              </span>
                              <span className={`font-bold ${isLight ? "text-amber-700" : "text-amber-300"}`}>
                                76 (44)
                              </span>
                            </div>
                            <div className={`flex justify-between text-[10px] ${isLight ? "text-slate-500" : "text-neutral-500"}`}>
                              <span>H. Pandya</span>
                              <span>24 (11)</span>
                            </div>
                          </div>

                          {/* Commentary snippet */}
                          <div className={`p-2.5 rounded-xl border text-[10px] leading-relaxed ${
                            isLight ? "bg-slate-50 border-slate-200 text-slate-700" : "bg-neutral-900/40 border-neutral-800/80 text-neutral-400"
                          }`}>
                            <span className={`font-mono font-bold ${isLight ? "text-amber-700" : "text-amber-300"}`}>18.4 • </span>
                            Lofted cleanly over deep cover. Pure timing off the middle of the willow.
                          </div>
                        </div>
                      )}

                      {/* APP 3: FACEATTEND AI */}
                      {activeApp.id === "ai-attendance-app" && (
                        <div className="space-y-3.5">
                          <div className={`relative h-44 rounded-xl border overflow-hidden flex items-center justify-center ${
                            isLight ? "bg-slate-50 border-slate-200" : "bg-neutral-900 border-neutral-800"
                          }`}>
                            <div className={`w-28 h-28 rounded-xl border border-dashed flex flex-col items-center justify-center relative overflow-hidden ${
                              isLight ? "border-cyan-600 bg-cyan-50/40" : "border-cyan-400/80"
                            }`}>
                              <span className="text-2xl">👤</span>
                              <span className={`text-[8px] font-mono mt-1 font-bold ${
                                isLight ? "text-cyan-800" : "text-cyan-300"
                              }`}>
                                99.4% CONFIDENCE
                              </span>
                              {/* Animated Radar Scanning Line */}
                              <motion.div
                                animate={{ y: [-40, 50, -40] }}
                                transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                                className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_8px_#06b6d4]"
                              />
                            </div>
                            <div className={`absolute bottom-2.5 inset-x-2.5 flex justify-between text-[9px] font-mono px-2.5 py-1 rounded-md backdrop-blur-sm ${
                              isLight
                                ? "bg-white/95 border border-slate-200 shadow-sm"
                                : "bg-black/80"
                            }`}>
                              <span className={`font-bold ${isLight ? "text-emerald-700" : "text-emerald-400"}`}>
                                Liveness: VERIFIED
                              </span>
                              <span className={isLight ? "text-slate-600 font-medium" : "text-neutral-400"}>180ms</span>
                            </div>
                          </div>

                          <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs ${
                            isLight
                              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                              : "bg-emerald-950/40 border-emerald-500/20 text-emerald-300"
                          }`}>
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              isLight ? "bg-emerald-200 text-emerald-900" : "bg-emerald-500/20"
                            }`}>✓</span>
                            <span className="font-semibold">Checked In (09:14 AM)</span>
                          </div>

                          <div className={`p-2.5 rounded-xl border text-[10px] font-mono space-y-1 ${
                            isLight ? "bg-slate-50 border-slate-200 text-slate-600" : "bg-neutral-900 border-neutral-800 text-neutral-400"
                          }`}>
                            <div className="flex justify-between">
                              <span>Geo-Fencing Radius:</span>
                              <span className={`font-semibold ${isLight ? "text-slate-900" : "text-neutral-200"}`}>
                                Inside Zone (8m)
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Shift Window:</span>
                              <span className={`font-semibold ${isLight ? "text-slate-900" : "text-neutral-200"}`}>
                                09:00 - 18:00
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom indicator */}
                  <div className={`w-20 h-1 rounded-full mx-auto mt-2 shrink-0 ${
                    isLight ? "bg-slate-300" : "bg-neutral-800"
                  }`} />
                </div>
              </motion.div>
            </div>

            {/* Right: Architectural Case Study (Clean, uncluttered editorial) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeApp.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: smoothEase }}
                className="lg:col-span-7 flex flex-col justify-center space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300/90">
                      {activeApp.badge}
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Flutter Architecture
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-medium tracking-tight text-neutral-100">
                    {activeApp.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed">
                  {activeApp.description}
                </p>

                {/* Key Metrics / Highlights Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {activeApp.id === "fintech-app" && (
                    <>
                      <div className="subtle-metric-card p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Supported Rails</p>
                        <p className="text-sm font-semibold text-neutral-100 font-mono mt-0.5">DMT, AEPS, BBPS, Recharge</p>
                      </div>
                      <div className="subtle-metric-card p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Hardware Integration</p>
                        <p className="text-sm font-semibold text-amber-400 font-mono mt-0.5">Biometric RD Service</p>
                      </div>
                    </>
                  )}
                  {activeApp.id === "cricket-live-app" && (
                    <>
                      <div className="subtle-metric-card p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Latency</p>
                        <p className="text-sm font-semibold text-emerald-400 font-mono mt-0.5">&lt; 350ms WebSocket Feed</p>
                      </div>
                      <div className="subtle-metric-card p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Offline Resilience</p>
                        <p className="text-sm font-semibold text-neutral-100 font-mono mt-0.5">Local SQLite Cache</p>
                      </div>
                    </>
                  )}
                  {activeApp.id === "ai-attendance-app" && (
                    <>
                      <div className="subtle-metric-card p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">On-Device Inference</p>
                        <p className="text-sm font-semibold text-cyan-300 font-mono mt-0.5">TFLite 180ms Latency</p>
                      </div>
                      <div className="subtle-metric-card p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">Security Verification</p>
                        <p className="text-sm font-semibold text-emerald-400 font-mono mt-0.5">Anti-Spoofing &amp; Geo-Fence</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Tech Stack Pills */}
                <div className={`pt-4 border-t flex flex-wrap gap-2 ${
                  isLight ? "border-slate-200" : "border-white/[0.06]"
                }`}>
                  {activeApp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="tech-pill-chip px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-300 hover:border-neutral-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
