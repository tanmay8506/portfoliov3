"use client";

import React, { createContext, useContext, useEffect } from "react";

// Theme is permanently dark — no toggle
type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lock to dark mode on every mount — no localStorage, no toggle
    document.documentElement.classList.add("theme-dark");
    localStorage.removeItem("portfolio-theme");
  }, []);

  // No-op stubs kept so any component calling toggleTheme/setTheme doesn't break
  const toggleTheme = () => {};
  const setTheme = () => {};

  return (
    <ThemeContext.Provider value={{ theme: "dark", toggleTheme, setTheme }}>
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
