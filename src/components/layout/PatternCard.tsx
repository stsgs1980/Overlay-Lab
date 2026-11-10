"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { usePanelToggle } from "@/hooks/usePanelToggle";
import { cn } from "@/lib/utils";
import type { PatternMeta } from "@/types/patterns";
import type { JSX, ReactNode } from "react";

interface PatternCardProps {
  meta: PatternMeta;
  /** Живое демо паттерна — слот снизу карточки */
  demo: ReactNode;
  /** Исходник паттерна для панели «Код» */
  snippet: string;
}

const CheckIcon = (): JSX.Element => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="mt-[2px] shrink-0">
    <path
      d="M2.5 7.4 5.6 10.4 11.5 3.6"
      stroke="#C8F169"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

/** Карточка паттерна: мета → возможности → живое демо → раскрываемые панели «Код» / «Когда использовать» */
export function PatternCard({ meta, demo, snippet }: PatternCardProps): JSX.Element {
  const { panel, toggle } = usePanelToggle();
  const isCode = panel === "code";
  const isWhen = panel === "when";

  return (
    <Card interactive className="flex h-full flex-col overflow-hidden">
      {/* -- Шапка: номер + библиотека --------------------------- */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5">
        <span
          aria-hidden="true"
          className="font-mono text-[34px] font-semibold leading-none text-[var(--text-faint)] opacity-70"
        >
          {meta.index}
        </span>
        <div className="flex flex-col items-end gap-1.5">
          <Badge tone={meta.libraryTone} dot>
            {meta.library}
          </Badge>
          <span className="font-mono text-[9.5px] uppercase tracking-[.16em] text-[var(--text-faint)]">
            {meta.layer}
          </span>
        </div>
      </div>

      {/* -- Заголовок и описание ------------------------------- */}
      <div className="px-5 pt-3">
        <p className="font-mono text-[10px] uppercase tracking-[.2em] text-lime-500 dark:text-lime-400/80">
          {meta.tagline}
        </p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight text-[var(--text)]">{meta.title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-dim)]">{meta.description}</p>
      </div>

      {/* -- Возможности ---------------------------------------- */}
      <ul className="grid grid-cols-1 gap-x-3 gap-y-1.5 px-5 pt-4 sm:grid-cols-2">
        {meta.features.map((feature) => (
          <li key={feature} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-[var(--text-dim)]">
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* -- Живое демо ----------------------------------------- */}
      <div className="mt-4 px-5">
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[#12141D]">{demo}</div>
      </div>

      {/* -- Раскрываемые панели -------------------------------- */}
      <div className="mt-auto px-5 pb-5 pt-4">
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
              className="flex h-8 items-center gap-1.5 rounded-lg border border-[var(--border)] px-2.5 font-mono text-[10.5px] uppercase tracking-wider text-[var(--text-dim)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60"
            >
              {label}
              <Chevron open={open} />
            </button>
          ))}
        </div>

        {isCode && (
          <div id={`${meta.id}-pattern-snippet`} className="mt-3 motion-safe:animate-toast-in">
            <CodeBlock code={snippet} filename={`${meta.id}/Pattern.tsx`} />
          </div>
        )}
        {isWhen && (
          <ul id={`${meta.id}-pattern-when`} className="mt-3 space-y-1.5 motion-safe:animate-toast-in">
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
    </Card>
  );
}
