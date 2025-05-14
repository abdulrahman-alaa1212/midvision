
"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggleButton() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme) {
      setCurrentTheme(storedTheme);
    } else if (systemPrefersDark) {
      setCurrentTheme("dark");
    } else {
      setCurrentTheme("light");
    }
  }, []);

  useEffect(() => {
    if (mounted) { // only run if component is mounted
      if (currentTheme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [currentTheme, mounted]);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  if (!mounted) {
    // Render a placeholder or null to avoid hydration mismatch for the icon
    return <div className="h-10 w-10" />; // Or <Button variant="ghost" size="icon" disabled />
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
    >
      {currentTheme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
