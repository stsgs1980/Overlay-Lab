import type { BadgeTone } from "./ui";

export type PatternId = "standard-modal" | "side-panel" | "command-menu" | "rich-popover";

export type StackKind = "dialog" | "panel" | "palette" | "popover";

/** Запись в стеке модальных слоёв (ModalStackContext) */
export interface StackEntry {
  id: string;
  title: string;
  kind: StackKind;
}

export interface ModalStackContextValue {
  /** От нижнего к верхнему: последний элемент — самый верхний */
  stack: StackEntry[];
  depth: number;
  topId: string | null;
  push: (entry: StackEntry) => void;
  remove: (id: string) => void;
  bringToFront: (id: string) => void;
  clear: () => void;
}

export interface PatternMeta {
  id: PatternId;
  index: string;
  title: string;
  tagline: string;
  description: string;
  library: string;
  libraryTone: BadgeTone;
  /** Что демонстрирует паттерн — чек-лист возможностей */
  features: string[];
  /** Когда паттерн уместен */
  whenToUse: string[];
  /** Слой на диаграмме z-index (для ArchitectureSection) */
  layer: string;
}
