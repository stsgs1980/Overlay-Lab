import type { JSX } from "react";

/** Якорная навигация витрины: разделы страницы и демо-приложение */
export function SiteNav(): JSX.Element {
  return (
    <nav className="ml-auto hidden items-center gap-6 text-[13px] font-medium text-[var(--text-dim)] md:flex">
      <a
        href="/#patterns"
        className="rounded transition-colors hover:text-[var(--text)] focus-visible:ring-2 focus-visible:ring-lime-400/60 focus-visible:outline-hidden"
      >
        Паттерны
      </a>
      <a
        href="/#architecture"
        className="rounded transition-colors hover:text-[var(--text)] focus-visible:ring-2 focus-visible:ring-lime-400/60 focus-visible:outline-hidden"
      >
        Архитектура
      </a>
      <a
        href="/app"
        className="group flex items-center gap-1 rounded text-lime-600 transition-colors hover:text-lime-500 focus-visible:ring-2 focus-visible:ring-lime-400/60 focus-visible:outline-hidden dark:text-lime-400/90 dark:hover:text-lime-300"
      >
        Демо-приложение
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
    </nav>
  );
}
