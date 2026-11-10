import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** clsx + tailwind-merge: базовое слияние классов для всех компонентов */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/* --- Z-index manager --------------------------------------
 * Единая лесенка слоёв, чтобы модалки, панели и палитры
 * не дрались за слой. См. архитектуру на странице.
 * Порядок выбран так: немодальное снизу, модальное сверху.
 * --------------------------------------------------------- */
export const Z = {
  header: 40,
  popover: 130, // Rich Popover — немодальный, под диалогами
  panel: 140, // Side Panel — без backdrop, но поверх страницы
  dialog: 150, // Standard Modal (Base UI портал)
  paletteBackdrop: 160, // затемнение Command Menu
  palette: 170, // сам Command Menu
  toast: 180,
} as const;

/** Целочисленный ограничитель диапазона */
export const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

/** Переход очереди окон: `id` поднимается в конец массива */
export function bringToEnd<T extends { id: string }>(list: T[], id: string): T[] {
  const target = list.find((item) => item.id === id);
  if (!target) return list;
  return [...list.filter((item) => item.id !== id), target];
}

/** «⌘K» на macOS, «Ctrl K» на остальных платформах */
export function shortcutLabel(key: string): string {
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
  return isMac ? `⌘${key}` : `Ctrl ${key}`;
}
