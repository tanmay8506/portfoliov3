"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "alternating" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("alternating");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load theme from localStorage on client side mount
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme;
    if (savedTheme === "dark" || savedTheme === "alternating") {
      setThemeState(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Toggle html class based on theme
    if (theme === "dark") {
      document.documentElement.classList.add("theme-dark");
    } else {
      document.documentElement.classList.remove("theme-dark");
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "alternating" ? "dark" : "alternating";
    setTheme(nextTheme);
  };

  // Prevent hydration mismatch by providing default context during server render
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
