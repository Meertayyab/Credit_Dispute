// components/ThemeInitializer.jsx
import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const mode = saved || (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, []);

  return null; // Nothing renders, just logic
}
