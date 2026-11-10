import { Badge } from "@/components/ui/Badge";
import type { PatternMeta } from "@/types/patterns";
import type { JSX } from "react";

/** Шапка карточки: порядковый номер, библиотека и слой паттерна */
export function PatternCardHeader({ meta }: { meta: PatternMeta }): JSX.Element {
  return (
    <div className="flex items-start justify-between gap-3 px-5 pt-5">
      <span
        aria-hidden="true"
        className="font-mono text-[34px] leading-none font-semibold text-[var(--text-faint)] opacity-70"
      >
        {meta.index}
      </span>
      <div className="flex flex-col items-end gap-1.5">
        <Badge tone={meta.libraryTone} dot>
          {meta.library}
        </Badge>
        <span className="font-mono text-[9.5px] tracking-[.16em] text-[var(--text-faint)] uppercase">{meta.layer}</span>
      </div>
    </div>
  );
}
