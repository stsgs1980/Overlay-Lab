import { cn } from "@/lib/utils";
import type { IssuePriority } from "@/types/issue";
import { PRIORITY_FLAG_CLASS, PRIORITY_LABEL } from "@/types/issue";
import { ChevronDown, Flag } from "lucide-react";
import type { JSX } from "react";

interface PriorityTriggerProps {
  value: IssuePriority;
  open: boolean;
  onToggle: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

/** Триггер поповера: текущий приоритет и шеврон, раскрывающий список */
export function PriorityTrigger({ value, open, onToggle, triggerRef }: PriorityTriggerProps): JSX.Element {
  return (
    <button
      ref={triggerRef}
      type="button"
      onClick={onToggle}
      aria-haspopup="listbox"
      aria-expanded={open}
      className="flex h-8 items-center gap-2 rounded-lg border border-[#26282C] bg-white/[.04] px-3 text-[12px] font-medium text-zinc-300 transition-colors hover:border-white/[.14] hover:text-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-400/70 focus-visible:outline-hidden"
    >
      <Flag size={13} className={PRIORITY_FLAG_CLASS[value]} aria-hidden="true" />
      {PRIORITY_LABEL[value]}
      <ChevronDown
        size={13}
        className={cn("text-zinc-500 transition-transform duration-200", open && "rotate-180")}
        aria-hidden="true"
      />
    </button>
  );
}
