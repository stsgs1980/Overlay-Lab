"use client";

import { Card } from "@/components/ui/Card";
import { usePanelToggle } from "@/hooks/usePanelToggle";
import type { PatternMeta } from "@/types/patterns";
import type { JSX, ReactNode } from "react";
import { PatternCardHeader } from "./PatternCardHeader";
import { PatternFeatures } from "./PatternFeatures";
import { PatternPanels } from "./PatternPanels";

interface PatternCardProps {
  meta: PatternMeta;
  /** Живое демо паттерна — слот снизу карточки */
  demo: ReactNode;
  /** Исходник паттерна для панели «Код» */
  snippet: string;
}

/** Карточка паттерна: мета → возможности → живое демо → раскрываемые панели «Код» / «Когда использовать» */
export function PatternCard({ meta, demo, snippet }: PatternCardProps): JSX.Element {
  const { panel, toggle } = usePanelToggle();

  return (
    <Card interactive className="flex h-full flex-col overflow-hidden">
      <PatternCardHeader meta={meta} />

      {/* -- Заголовок и описание ------------------------------- */}
      <div className="px-5 pt-3">
        <p className="font-mono text-[10px] tracking-[.2em] text-lime-500 uppercase dark:text-lime-400/80">
          {meta.tagline}
        </p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight text-[var(--text)]">{meta.title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-dim)]">{meta.description}</p>
      </div>

      <PatternFeatures features={meta.features} />

      {/* -- Живое демо ----------------------------------------- */}
      <div className="mt-4 px-5">
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[#12141D]">{demo}</div>
      </div>

      <PatternPanels meta={meta} snippet={snippet} panel={panel} toggle={toggle} />
    </Card>
  );
}
