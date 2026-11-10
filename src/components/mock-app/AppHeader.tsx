"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import type { PatternId } from "@/types/patterns";
import { ArrowLeft, Command, MousePointer2, PanelRight, SquarePen } from "lucide-react";
import type { JSX, ReactNode } from "react";

interface AppHeaderProps {
  /** Активная вкладка = какой паттерн демонстрируется */
  activeTab: PatternId;
  onTabChange: (tab: PatternId) => void;
}

const TABS: ReadonlyArray<{ id: PatternId; label: string; icon: ReactNode }> = [
  { id: "standard-modal", label: "Standard Modal", icon: <SquarePen size={13} strokeWidth={1.8} /> },
  { id: "side-panel", label: "Side Panel", icon: <PanelRight size={13} strokeWidth={1.8} /> },
  { id: "command-menu", label: "Command Menu", icon: <Command size={13} strokeWidth={1.8} /> },
  { id: "rich-popover", label: "Rich Popover", icon: <MousePointer2 size={13} strokeWidth={1.8} /> },
];

/**
 * Шапка макета: хлебные крошки + Base UI Tabs,
 * переключающие демонстрируемый оверлей. ⌘K дублирует вкладку меню.
 */
export function AppHeader({ activeTab, onTabChange }: AppHeaderProps): JSX.Element {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#26282C] bg-[#101113]/90 px-3 backdrop-blur sm:px-4">
      {/* Возврат на витрину: единственный выход из макета */}
      <a
        href="/"
        aria-label="Вернуться на витрину паттернов"
        title="К витрине"
        className="flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-[#26282C] bg-white/[.03] px-2 text-zinc-500 transition-colors hover:border-white/[.14] hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70"
      >
        <ArrowLeft size={13} strokeWidth={1.8} aria-hidden="true" />
        <span className="hidden font-mono text-[10px] uppercase tracking-[.12em] sm:inline">Витрина</span>
      </a>

      {/* Хлебные крошки */}
      <nav aria-label="Путь" className="hidden items-center gap-2 font-mono text-[11px] lg:flex">
        <span className="text-zinc-600">Orbit</span>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-600">Issues</span>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-300">Очередь</span>
      </nav>

      {/* Переключатель паттернов */}
      <div className="mx-auto flex items-center gap-2">
        <Tabs.Root value={activeTab} onValueChange={(value) => onTabChange(value as PatternId)}>
          <TabsList aria-label="Демонстрируемый паттерн">
            {TABS.map(({ id, label, icon }) => (
              <TabsTrigger key={id} value={id} icon={icon} onActivate={() => onTabChange(id)}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs.Root>
      </div>

      {/* Быстрый ⌘K + аватар */}
      <div className="flex shrink-0 items-center gap-2.5">
        <button
          type="button"
          onClick={() => onTabChange("command-menu")}
          aria-label="Открыть командное меню (Ctrl или Cmd + K)"
          className="flex h-8 items-center gap-2 rounded-lg border border-[#26282C] bg-white/[.03] px-2 text-zinc-500 transition-colors hover:border-white/[.14] hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70"
        >
          <Command size={12} aria-hidden="true" />
          <kbd className="font-mono text-[10px]">⌘K</kbd>
        </button>
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7C6CF0] text-[9px] font-bold text-zinc-950"
        >
          АС
        </span>
      </div>
    </header>
  );
}
