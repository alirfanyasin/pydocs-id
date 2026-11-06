"use client";

import React, { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "pydocs_theme_v1";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as
        | "light"
        | "dark"
        | null;
      const initial =
        saved ||
        (document.documentElement.classList.contains("dark")
          ? "dark"
          : "light");
      setTheme(initial);
      if (initial === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Ignore
    }
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="w-24 h-9 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:border-blue-500 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 transition cursor-pointer"
      aria-label={theme === "dark" ? "Aktifkan tema terang" : "Aktifkan tema gelap"}
      title={
        theme === "dark" ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"
      }
    >
      <span aria-hidden="true">{theme === "dark" ? "☼" : "◐"}</span>
      <span>{theme === "dark" ? "Terang" : "Gelap"}</span>
    </button>
  );
}

