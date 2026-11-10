"use client";

import { useEffect } from "react";

export interface ShortcutOptions {
  /** true → требует ⌘ (mac) или Ctrl (остальные) вместе с клавишей */
  metaOrCtrl?: boolean;
  preventDefault?: boolean;
}

/**
 * Глобальный клавиатурный шорткат. Клавиша сравнивается в нижнем регистре.
 * @example useKeyboardShortcut('k', toggleMenu, { metaOrCtrl: true }) // ⌘K / Ctrl K
 */
export function useKeyboardShortcut(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options: ShortcutOptions = {},
): void {
  const { metaOrCtrl = true, preventDefault = true } = options;

  useEffect(() => {
    const listener = (event: KeyboardEvent): void => {
      const modifierOk = metaOrCtrl ? event.metaKey || event.ctrlKey : true;
      if (modifierOk && event.key.toLowerCase() === key.toLowerCase()) {
        if (preventDefault) event.preventDefault();
        handler(event);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [key, handler, metaOrCtrl, preventDefault]);
}
