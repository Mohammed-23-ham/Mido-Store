"use client";

import { useEffect } from "react";
import { Moon } from "lucide-react";

export default function ThemeToggle() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");

    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", nextIsDark);
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className="inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
    >
      <Moon aria-hidden="true" size={22} strokeWidth={1.8} />
    </button>
  );
}
