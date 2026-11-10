"use client";

import { useModalStack } from "@/hooks/useModalStack";
import type { StackKind } from "@/types/patterns";
import type { JSX } from "react";

const KIND_LABEL: Record<StackKind, string> = {
  dialog: "modal",
  panel: "panel",
  palette: "palette",
  popover: "popover",
};

/**
 * Живой срез ModalStackContext: что открыто прямо сейчас и в каком порядке.
 * Обновляется мгновенно — открывайте любые оверлеи выше.
 */
export function StackMonitor(): JSX.Element {
  const { stack, depth, topId } = useModalStack();

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[.2em] text-[var(--text-faint)]">
          ModalStackContext · live
        </p>
        <span className="rounded-full border border-lime-400/25 bg-lime-400/10 px-2 py-0.5 font-mono text-[10px] tabular-nums text-lime-600 dark:text-lime-400">
          depth {depth}
        </span>
      </div>

      <div className="mt-3 flex min-h-[44px] flex-wrap items-center gap-1.5" aria-live="polite">
        {stack.length === 0 ? (
          <p className="text-[12px] text-[var(--text-faint)]">
            Стек пуст — откройте любой диалог, панель или палитру выше.
          </p>
        ) : (
          stack.map((entry, index) => {
            const isTop = entry.id === topId;
            return (
              <span
                key={entry.id}
                className={
                  isTop
                    ? "flex items-center gap-1.5 rounded-lg border border-lime-400/35 bg-lime-400/10 px-2 py-1.5 text-[11px] font-medium text-lime-700 dark:text-lime-300"
                    : "flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--panel-2)] px-2 py-1.5 text-[11px] text-[var(--text-dim)]"
                }
              >
                <span className="font-mono text-[9px] text-[var(--text-faint)]">{index + 1}</span>
                {entry.title}
                <span className="rounded border border-[var(--border)] px-1 font-mono text-[8px] uppercase tracking-wider text-[var(--text-faint)]">
                  {KIND_LABEL[entry.kind]}
                </span>
              </span>
            );
          })
        )}
      </div>
      <p className="mt-2 text-[10.5px] leading-snug text-[var(--text-faint)]">
        Реестр заполняют <code className="font-mono text-[10px]">useModalStackEntry</code> при открытии; размонтирование
        снимает слой. Сам рендером по-прежнему владеют Base UI и React Aria.
      </p>
    </div>
  );
}
