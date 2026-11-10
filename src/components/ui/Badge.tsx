import { cn } from "@/lib/utils";
import type { BadgeProps, BadgeTone } from "@/types/ui";
import type { JSX } from "react";

const TONES: Record<BadgeTone, { chip: string; dot: string }> = {
  lime: { chip: "border-lime-400/25 bg-lime-400/10 text-lime-300", dot: "bg-lime-400" },
  violet: { chip: "border-violet-400/25 bg-violet-400/10 text-violet-300", dot: "bg-violet-400" },
  zinc: { chip: "border-[var(--border)] bg-[var(--btn-2)] text-[var(--text-dim)]", dot: "bg-zinc-400" },
  amber: { chip: "border-amber-400/25 bg-amber-400/10 text-amber-300", dot: "bg-amber-400" },
  sky: { chip: "border-sky-400/25 bg-sky-400/10 text-sky-300", dot: "bg-sky-400" },
};

/** Метка технологии / статуса. Только отображение, без поведения. */
export function Badge({ tone = "zinc", dot = false, className, children, ...rest }: BadgeProps): JSX.Element {
  const tones = TONES[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5",
        "font-mono text-[10.5px] font-medium uppercase tracking-[.08em]",
        tones.chip,
        className,
      )}
      {...rest}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", tones.dot)} aria-hidden="true" />}
      {children}
    </span>
  );
}
