"use client";

import { Button } from "@/components/ui/Button";
import { useModalStackEntry } from "@/hooks/useModalStack";
import { ISSUES } from "@/lib/mock-issues";
import { PanelRight } from "lucide-react";
import type { JSX } from "react";
import { useState } from "react";
import { SidePanel } from "./SidePanel";

const DEMO_ISSUE = ISSUES[0];

/** Демо-слот карточки: боковая панель с деталями и комментариями задачи */
export function SidePanelDemo(): JSX.Element {
  const [open, setOpen] = useState(false);

  useModalStackEntry("side-panel", `Задача ${DEMO_ISSUE.id}`, open, "panel");

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-zinc-300">Панель задачи {DEMO_ISSUE.id}</p>
          <p className="mt-0.5 text-[10.5px] leading-snug text-zinc-500">
            Выезд translateX · без backdrop · OverlayContainer + FocusScope
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setOpen(true)} icon={<PanelRight size={14} />}>
          Открыть панель
        </Button>
      </div>

      <div className="flex h-8 items-center gap-2 rounded-lg border border-white/[.06] bg-black/30 px-3 font-mono text-[10.5px] text-zinc-500">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" aria-hidden="true" />
        <span className="truncate">
          {open ? "Открыта — Esc или ✕ закрывает" : `«${DEMO_ISSUE.title.slice(0, 42)}…»`}
        </span>
      </div>

      <SidePanel open={open} onClose={() => setOpen(false)} issue={DEMO_ISSUE} />
    </div>
  );
}
