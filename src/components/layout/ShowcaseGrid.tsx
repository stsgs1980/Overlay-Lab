import { CommandMenuDemo } from "@/components/patterns/CommandMenu/CommandMenuDemo";
import { RichPopoverDemo } from "@/components/patterns/RichPopover/RichPopoverDemo";
import { SidePanelDemo } from "@/components/patterns/SidePanel/SidePanelDemo";
import { StandardModalDemo } from "@/components/patterns/StandardModal/StandardModalDemo";
import { PATTERNS } from "@/lib/constants";
import { PATTERN_SNIPPETS } from "@/lib/snippets";
import type { PatternId } from "@/types/patterns";
import type { ComponentType, JSX } from "react";
import { PatternCard } from "./PatternCard";

/** Реестр демо: id паттерна → его живой слот */
const DEMOS: Record<PatternId, ComponentType> = {
  "standard-modal": StandardModalDemo,
  "side-panel": SidePanelDemo,
  "command-menu": CommandMenuDemo,
  "rich-popover": RichPopoverDemo,
};

/** Сетка витрины: четыре паттерна, каждый — карточка с демо и кодом */
export function ShowcaseGrid(): JSX.Element {
  return (
    <section
      id="patterns"
      aria-labelledby="patterns-heading"
      className="relative mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <p className="font-mono text-[10px] uppercase tracking-[.22em] text-lime-600 dark:text-lime-400/80">
            Паттерны
          </p>
          <h2
            id="patterns-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl"
          >
            Четыре способа работать со слоями
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-dim)]">
            От эталонного диалога до командного меню. Внутри каждой карточки — рабочий пример, разбор возможностей и
            исходник без воды.
          </p>
        </div>
        <a
          href="/app"
          className="group inline-flex items-center gap-1.5 rounded font-mono text-[10px] uppercase tracking-[.18em] text-lime-600 transition-colors hover:text-lime-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60 dark:text-lime-400/80 dark:hover:text-lime-300"
        >
          Демо-приложение в стиле Linear
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          >
            <path
              d="M2 8 8 2M8 2H3.5M8 2v4.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {PATTERNS.map((meta) => {
          const Demo = DEMOS[meta.id];
          return (
            <article key={meta.id} aria-label={meta.title}>
              <PatternCard meta={meta} snippet={PATTERN_SNIPPETS[meta.id]} demo={<Demo />} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
