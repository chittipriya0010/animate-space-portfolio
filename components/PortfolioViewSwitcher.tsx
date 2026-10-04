"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePortfolio } from "./modern/PortfolioContext";
import ModernPortfolio from "./modern/ModernPortfolio";

const SpatialUniverse = dynamic(() => import("./space3d/SpatialUniverse"), {
  ssr: false,
  loading: () => (
    <div className="w-screen h-screen bg-[#040508] flex flex-col items-center justify-center text-white font-mono">
      <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-xs text-cyan-300 tracking-widest uppercase">
        Initializing 3D Spatial Architecture...
      </p>
    </div>
  ),
});

const ClassicPortfolio = dynamic(() => import("./classic/ClassicPortfolio"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#030014] flex flex-col items-center justify-center text-white font-mono">
      <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-xs text-violet-300">Warping to Classic Space Universe...</p>
    </div>
  ),
});

export default function PortfolioViewSwitcher() {
  const { mode } = usePortfolio();

  if (mode === "classic") {
    return <ClassicPortfolio />;
  }

  if (mode === "space") {
    return <SpatialUniverse />;
  }

  return <ModernPortfolio />;
}
