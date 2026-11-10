/**
 * Централизованная логика показа кода в карточке:
 * какое состояние "раскрыто", в каком файле лежит сниппет.
 * Замысел: у карточки — ноль ветвлений, у хука — вся механика.
 */
"use client";

import { useCallback, useState } from "react";

export type Panel = "none" | "code" | "when";

/** Переключает код/on-when панель-шторку вокруг карточки паттерна */
export function usePanelToggle(initial: Panel = "none"): {
  panel: Panel;
  toggle: (target: Exclude<Panel, "none">) => void;
} {
  const [panel, setPanel] = useState<Panel>(initial);

  const toggle = useCallback((target: Exclude<Panel, "none">) => {
    setPanel((current) => (current === target ? "none" : target));
  }, []);

  return { panel, toggle } as const;
}
