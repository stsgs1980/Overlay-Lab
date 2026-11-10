"use client";

import { Button } from "@/components/ui/Button";
import { useModalStackEntry } from "@/hooks/useModalStack";
import { SquarePen } from "lucide-react";
import type { JSX } from "react";
import { useState } from "react";
import { StandardModal } from "./StandardModal";

/** Демо-слот карточки: триггер + строка последней созданной задачи */
export function StandardModalDemo(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [lastCreated, setLastCreated] = useState<string | null>(null);

  useModalStackEntry("standard-modal", "Новая задача", open, "dialog");

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-zinc-300">Диалог «Новая задача»</p>
          <p className="mt-0.5 text-[10.5px] leading-snug text-zinc-500">
            Focus-trap · scroll-lock · inert-фон · ⌘↵ создаёт
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setOpen(true)} icon={<SquarePen size={14} />}>
          Создать задачу
        </Button>
      </div>

      <output
        aria-live="polite"
        className="flex h-8 items-center gap-2 rounded-lg border border-white/[.06] bg-black/30 px-3 font-mono text-[10.5px] text-zinc-500"
      >
        {lastCreated ? (
          <>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 6.3 4.7 9 10 3.2"
                stroke="#C8F169"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="truncate">
              Создана: <span className="text-lime-300">{lastCreated}</span>
            </span>
          </>
        ) : (
          "Задачи ещё не создавались…"
        )}
      </output>

      <StandardModal open={open} onOpenChange={setOpen} onCreate={(draft) => setLastCreated(draft.title)} />
    </div>
  );
}
