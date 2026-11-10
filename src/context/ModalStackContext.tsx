"use client";

import type { ModalStackContextValue, StackEntry } from "@/types/patterns";
import type { JSX } from "react";
import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";

export const ModalStackContext = createContext<ModalStackContextValue | null>(null);

/**
 * Реестр модальных слоёв уровня страницы.
 * Нужен не для рендера, а как «монитор стека»: кто открыт,
 * в каком порядке и на какой глубине. Рендером занимается Base UI / React Aria.
 */
export function ModalStackProvider({ children }: { children: ReactNode }): JSX.Element {
  const [stack, setStack] = useState<StackEntry[]>([]);

  const push = useCallback((entry: StackEntry) => {
    setStack((prev) => {
      const rest = prev.filter((item) => item.id !== entry.id);
      return [...rest, entry];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setStack((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const bringToFront = useCallback((id: string) => {
    setStack((prev) => {
      const target = prev.find((item) => item.id === id);
      return target ? [...prev.filter((item) => item.id !== id), target] : prev;
    });
  }, []);

  const clear = useCallback(() => setStack([]), []);

  const value = useMemo<ModalStackContextValue>(
    () => ({
      stack,
      depth: stack.length,
      topId: stack.length > 0 ? stack[stack.length - 1].id : null,
      push,
      remove,
      bringToFront,
      clear,
    }),
    [stack, push, remove, bringToFront, clear],
  );

  return <ModalStackContext.Provider value={value}>{children}</ModalStackContext.Provider>;
}
