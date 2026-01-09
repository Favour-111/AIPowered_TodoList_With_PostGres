import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Update localStorage and DOM
    localStorage.setItem("theme", isDark ? "dark" : "light");
    const html = document.documentElement;

    console.log("Theme changed:", isDark ? "dark" : "light");
    console.log("HTML classes before:", html.className);

    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    console.log("HTML classes after:", html.className);
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
