import { useEffect, useState } from "react";

export default function useThemeMode() {
  const [mode, setMode] = useState("light");

  // ⏰ Define auto schedule (7pm - 7am = dark)
  const isScheduledDark = () => {
    const hour = new Date().getHours();
    return hour >= 19 || hour < 7;
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      setMode(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      const scheduled = isScheduledDark() ? "dark" : "light";
      setMode(scheduled);
      document.documentElement.classList.toggle("dark", scheduled === "dark");
    }
  }, []);

  const toggleMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
    document.documentElement.classList.toggle("dark", newMode === "dark");
  };

  return { mode, toggleMode };
}
