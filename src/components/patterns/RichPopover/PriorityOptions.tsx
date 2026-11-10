import { cn } from "@/lib/utils";
import type { IssuePriority } from "@/types/issue";
import { PRIORITY_FLAG_CLASS, PRIORITY_LABEL, PRIORITY_ORDER } from "@/types/issue";
import { Check, Flag } from "lucide-react";
import type { JSX } from "react";

interface PriorityOptionsProps {
  value: IssuePriority;
  onSelect: (level: IssuePriority) => void;
}

/** Список приоритетов внутри поповера: radio-опции с отметкой выбранного */
export function PriorityOptions({ value, onSelect }: PriorityOptionsProps): JSX.Element {
  return (
    <>
      {PRIORITY_ORDER.map((level) => {
        const selected = level === value;
        return (
          <button
            key={level}
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => onSelect(level)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] text-zinc-300 transition-colors hover:bg-white/[.05] focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:outline-hidden",
            )}
          >
            <Flag size={13} className={PRIORITY_FLAG_CLASS[level]} aria-hidden="true" />
            <span className="flex-1 text-left">{PRIORITY_LABEL[level]}</span>
            {selected && <Check size={14} className="text-indigo-300" aria-hidden="true" />}
          </button>
        );
      })}
    </>
  );
}
