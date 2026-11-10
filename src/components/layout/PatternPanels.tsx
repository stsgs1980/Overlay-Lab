import { CodeBlock } from "@/components/ui/CodeBlock";
import type { Panel } from "@/hooks/usePanelToggle";
import { cn } from "@/lib/utils";
import type { PatternMeta } from "@/types/patterns";
import type { JSX } from "react";

const Chevron = ({ open }: { open: boolean }): JSX.Element => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    className={cn("transition-transform duration-200", open && "rotate-180")}
  >
    <path
      d="m2.5 4.5 3.5 3.5 3.5-3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface PatternPanelsProps {
  meta: PatternMeta;
  snippet: string;
  /** Активная раскрытая панель: «none», «code» или «when» */
  panel: Panel;
  toggle: (target: Exclude<Panel, "none">) => void;
}

/** Раскрываемые панели карточки: исходник паттерна и список «когда использовать» */
export function PatternPanels({ meta, snippet, panel, toggle }: PatternPanelsProps): JSX.Element {
  const isCode = panel === "code";
  const isWhen = panel === "when";

  return (
    <div className="mt-auto px-5 pt-4 pb-5">
      <div className="flex items-center gap-2 border-t border-[var(--border)] pt-3.5">
        {(
          [
            { id: "code", label: "</> Код", open: isCode, expands: "pattern-snippet" },
            { id: "when", label: "Когда использовать", open: isWhen, expands: "pattern-when" },
          ] as const
        ).map(({ id, label, open, expands }) => (
          <button
            key={id}
            type="button"
            onClick={() => toggle(id)}
            aria-expanded={open}
            aria-controls={`${meta.id}-${expands}`}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 font-mono text-[10.5px] tracking-wider text-[var(--text-dim)] uppercase transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)] focus-visible:ring-2 focus-visible:ring-lime-400/60 focus-visible:outline-hidden"
          >
            {label}
            <Chevron open={open} />
          </button>
        ))}
      </div>

      {isCode && (
        <div id={`${meta.id}-pattern-snippet`} className="motion-safe:animate-toast-in mt-3">
          <CodeBlock code={snippet} filename={`${meta.id}/Pattern.tsx`} />
        </div>
      )}
      {isWhen && (
        <ul id={`${meta.id}-pattern-when`} className="motion-safe:animate-toast-in mt-3 space-y-1.5">
          {meta.whenToUse.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[12px] leading-snug text-[var(--text-dim)]">
              <span aria-hidden="true" className="mt-[1px] font-mono text-lime-500 dark:text-lime-400">
                →
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
