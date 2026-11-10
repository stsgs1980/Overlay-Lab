import { LAYERS } from "@/lib/constants";
import type { JSX } from "react";
import { StackMonitor } from "./StackMonitor";

/** Лесенка слоёв: порядок оверлеев по z-index плюс живой монитор стека */
export function ZIndexLadder(): JSX.Element {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 lg:col-span-3">
      <p className="font-mono text-[10px] tracking-[.2em] text-[var(--text-faint)]">z-index map</p>
      <div className="mt-4 space-y-1.5" role="list" aria-label="Слои от нижнего к верхнему">
        {LAYERS.map((layer, index) => (
          <div key={layer.label} role="listitem" className="flex items-center gap-3">
            <span className="w-6 text-right font-mono text-[10px] text-[var(--text-faint)] tabular-nums">
              {index + 1}
            </span>
            <div
              className={`flex h-9 items-center justify-between gap-3 rounded-lg px-3 ${layer.tone}`}
              style={{ width: `${34 + index * 16}%`, minWidth: "11rem" }}
            >
              <span className="truncate text-[11px] font-semibold text-zinc-950/85">{layer.label}</span>
              <span className="font-mono text-[10px] text-zinc-950/70 tabular-nums">{layer.z}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <StackMonitor />
      </div>
    </div>
  );
}
