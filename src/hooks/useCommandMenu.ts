"use client";

import { useCallback } from "react";
import { useKeyboardShortcut } from "./useKeyboardShortcut";

/**
 * Регистрирует ⌘K / Ctrl K для открытия Command Menu.
 * Хук — единственная точка, где знают про шорткат меню.
 * @param onToggle вызывается при каждом нажатии (открыть/закрыть решает вызывающий)
 */
export function useCommandMenu(onToggle: () => void): void {
  const stableToggle = useCallback(onToggle, [onToggle]);
  useKeyboardShortcut("k", stableToggle, { metaOrCtrl: true });
}
