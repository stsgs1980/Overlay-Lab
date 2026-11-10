"use client";

import { useEffect, useState } from "react";

/**
 * Держит компонент в DOM, пока идёт exit-анимация (`duration` мс),
 * затем размонтирует. Нужен для плавного translateX/opacity без блокировки таб-обхода.
 */
export function useDelayedUnmount(open: boolean, duration: number): boolean {
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      return undefined;
    }
    const timer = window.setTimeout(() => setMounted(false), duration);
    return () => window.clearTimeout(timer);
  }, [open, duration]);

  return mounted;
}
