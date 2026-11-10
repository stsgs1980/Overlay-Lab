"use client";

import { Button } from "@/components/ui/Button";
import { useCommandMenu } from "@/hooks/useCommandMenu";
import { useModalStackEntry } from "@/hooks/useModalStack";
import type { PaletteCommand } from "@/lib/commands";
import { shortcutLabel } from "@/lib/utils";
import { Command } from "lucide-react";
import type { JSX } from "react";
import { useCallback, useState } from "react";
import { CommandMenu } from "./CommandMenu";

/** Демо-слот карточки: командное меню ⌘K поверх макета */
export function CommandMenuDemo(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [lastRun, setLastRun] = useState<string | null>(null);

  useModalStackEntry("command-menu", "Командное меню", open, "palette");
  useCommandMenu(useCallback(() => setOpen((value) => !value), []));

  const run = (command: PaletteCommand): void => {
    setLastRun(command.run);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-zinc-300">Командное меню по {shortcutLabel("K")}</p>
          <p className="mt-0.5 text-[10.5px] leading-snug text-zinc-500">
            Glassmorphism · поиск · ↑↓ и Enter · клик вне закрывает
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setOpen(true)}
          icon={
            <kbd className="rounded border border-zinc-950/20 bg-zinc-950/10 px-1.5 font-mono text-[10px]">
              {shortcutLabel("K")}
            </kbd>
          }
        >
          Открыть меню
        </Button>
      </div>

      <output
        aria-live="polite"
        className="flex h-8 items-center gap-2 rounded-lg border border-white/[.06] bg-black/30 px-3 font-mono text-[10.5px] text-zinc-500"
      >
        <Command size={12} className="shrink-0 text-indigo-300" aria-hidden="true" />
        <span className="truncate">
          {lastRun ? (
            <>
              Выполнено: <span className="text-indigo-300">{lastRun}</span>
            </>
          ) : (
            "Меню ждёт запроса…"
          )}
        </span>
      </output>

      {open && <CommandMenu onClose={() => setOpen(false)} onRun={run} contextLabel="showcase · demo" />}
    </div>
  );
}
