"use client";

import { useModalStackEntry } from "@/hooks/useModalStack";
import type { IssuePriority } from "@/types/issue";
import { PRIORITY_LABEL } from "@/types/issue";
import type { JSX } from "react";
import { useState } from "react";
import { RichPopover } from "./RichPopover";

/** Демо-слот карточки: немодальный попап приоритета у триггера */
export function RichPopoverDemo(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState<IssuePriority>("high");

  useModalStackEntry("rich-popover", "Выбор приоритета", open, "popover");

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-zinc-300">Приоритет к задаче</p>
          <p className="mt-0.5 text-[10.5px] leading-snug text-zinc-500">
            Позиционирование от триггера · outside-click · без модальности
          </p>
        </div>
        <RichPopover open={open} onOpenChange={setOpen} value={priority} onChange={setPriority} />
      </div>

      <output
        aria-live="polite"
        className="flex h-8 items-center gap-2 rounded-lg border border-white/[.06] bg-black/30 px-3 font-mono text-[10.5px] text-zinc-500"
      >
        <span className="h-1.5 w-1.5 shrink-0 rounded-sm bg-orange-400" aria-hidden="true" />
        <span>
          Текущий приоритет: <span className="text-zinc-300">{PRIORITY_LABEL[priority]}</span>
        </span>
      </output>
    </div>
  );
}
