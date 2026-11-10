"use client";

import { COMMANDS, type CommandGroup, type PaletteCommand } from "@/lib/commands";
import type { KeyboardEvent } from "react";
import { useEffect, useMemo, useState } from "react";

const GROUPS: CommandGroup[] = ["Навигация", "Действия"];

interface CommandFilter {
  query: string;
  setQuery: (query: string) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  filtered: PaletteCommand[];
  visibleGroups: { group: string; items: PaletteCommand[] }[];
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

/** Фильтрация команд по запросу и навигация стрелками по активной команде */
export function useCommandFilter(onRun: (command: PaletteCommand) => void, onClose: () => void): CommandFilter {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((cmd) => [cmd.label, cmd.group].join(" ").toLowerCase().includes(q));
  }, [query]);

  useEffect(() => setActiveIndex(0), [filtered.length]);
  useEffect(() => {
    document.getElementById(`cmd-opt-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const visibleGroups = useMemo(
    () =>
      GROUPS.map((g) => ({ group: g, items: filtered.filter((cmd) => cmd.group === g) })).filter(
        (g) => g.items.length > 0,
      ),
    [filtered],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((i) => (filtered.length ? (i + delta + filtered.length) % filtered.length : 0));
    } else if (event.key === "Enter" && filtered[activeIndex]) {
      event.preventDefault();
      onRun(filtered[activeIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  return { query, setQuery, activeIndex, setActiveIndex, filtered, visibleGroups, onKeyDown };
}
