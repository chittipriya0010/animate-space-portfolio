"use client";

import React from "react";
import Hero from "@/components/main/Hero";
import Skills from "@/components/main/Skills";
import Encryption from "@/components/main/Encryption";
import Projects from "@/components/main/Projects";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import StarsCanvas from "@/components/main/StarBackground";
import { usePortfolio } from "@/components/modern/PortfolioContext";
import ChickFollower from "@/components/chick/ChickFollower";

export default function ClassicPortfolio() {
  const { toggleMode } = usePortfolio();

  return (
    <div className="relative min-h-screen bg-[#030014] text-white overflow-y-scroll overflow-x-hidden">
      {/* Interactive Chick Follower */}
      <ChickFollower enabled={true} />

      {/* Persistent Floating Switch to Modern V2 */}
      <div className="fixed top-20 right-6 z-50">
        <button
          onClick={toggleMode}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-white/15 text-neutral-200 hover:text-white text-xs font-mono shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          title="Switch to the Modern Portfolio"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="whitespace-nowrap">Return to v2.0 Portfolio</span>
          <span className="text-[10px] text-neutral-500 font-mono">↗</span>
        </button>
      </div>

      {/* 3D Star Canvas */}
      <StarsCanvas />

      {/* Original Classic Navbar */}
      <Navbar />

      {/* Classic Space Content */}
      <main className="h-full w-full">
        <div className="flex flex-col gap-20">
          <Hero />
          <Skills />
          <Encryption />
          <Projects />
        </div>
      </main>

      {/* Original Classic Footer */}
      <Footer />
    </div>
  );
}
