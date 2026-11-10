import type { JSX } from "react";

/** Логотип с названием проекта: ведёт к началу страницы (якорь #top) */
export function SiteBrand(): JSX.Element {
  return (
    <a
      href="#top"
      className="flex items-center gap-2.5 rounded-md focus-visible:ring-2 focus-visible:ring-lime-400/60 focus-visible:outline-hidden"
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect
          x="1.5"
          y="1.5"
          width="19"
          height="19"
          rx="5.5"
          className="stroke-[var(--border-strong)]"
          strokeWidth="1.4"
        />
        <rect x="6" y="9.5" width="10" height="6.5" rx="1.8" fill="#C8F169" fillOpacity="0.9" />
        <path d="M7.5 6.5h7" className="stroke-[var(--text-dim)]" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-[var(--text)]">Overlay&nbsp;Lab</span>
      <span className="hidden rounded-full border border-[var(--border)] px-2 py-0.5 font-mono text-[9.5px] tracking-[.14em] text-[var(--text-faint)] uppercase sm:inline-block">
        showcase
      </span>
    </a>
  );
}
