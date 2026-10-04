"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type PortfolioMode = "space" | "page" | "classic";
export type Theme = "dark" | "light";

interface PortfolioContextType {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  toggleMode: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setModeState] = useState<PortfolioMode>("space");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    try {
      const savedMode = localStorage.getItem("portfolio_view_mode") as string;
      if (savedMode === "space" || savedMode === "page" || savedMode === "classic") {
        setModeState(savedMode as PortfolioMode);
      } else if (savedMode === "new") {
        setModeState("space");
      }

      const savedTheme = localStorage.getItem("portfolio_theme") as Theme;
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
        applyThemeClass(savedTheme);
      } else {
        applyThemeClass("dark");
      }
    } catch {
      applyThemeClass("dark");
    }
  }, []);

  const applyThemeClass = (targetTheme: Theme) => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (targetTheme === "light") {
        root.classList.remove("dark");
        root.classList.add("light");
      } else {
        root.classList.remove("light");
        root.classList.add("dark");
      }
    }
  };

  const setMode = (newMode: PortfolioMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem("portfolio_view_mode", newMode);
    } catch {}
  };

  const toggleMode = () => {
    const next = mode === "space" ? "page" : "space";
    setMode(next);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeClass(newTheme);
    try {
      localStorage.setItem("portfolio_theme", newTheme);
    } catch {}
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <PortfolioContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        theme,
        setTheme,
        toggleTheme,
        isResumeOpen,
        setIsResumeOpen,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
