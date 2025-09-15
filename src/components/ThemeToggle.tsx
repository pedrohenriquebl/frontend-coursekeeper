"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      setIsLight(true);
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      setIsLight(false);
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("theme");
      setIsLight(false);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setIsLight(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="px-3 py-2 rounded bg-emerald-600 text-white shadow hover:bg-emerald-700 ml-4 lg:ml-0"
    >
      Alternar tema
    </button>
  );
}
