"use client";

import { useCallback, useEffect, useState } from "react";

type Theme = "dark" | "light";
const STORAGE_KEY = "overlay-lab-theme";

/** Читает класс, выставленный inline-скриптом в layout.tsx (без FOUC) */
function readDomTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

/** Тема оформления: синхронизирует <html> класс, localStorage и inline-скрипт против FOUC */
export function useTheme(): { theme: Theme; toggle: () => void; mounted: boolean } {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readDomTheme());
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      const root = document.documentElement;
      root.classList.toggle("light", next === "light");
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* приватный режим — просто не запоминаем */
      }
      return next;
    });
  }, []);

  return { theme, toggle, mounted };
}
