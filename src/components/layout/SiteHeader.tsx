import type { JSX } from "react";
import { ThemeToggle } from "./ThemeToggle";

/** Липкая шапка: лого, якорная навигация, переключатель темы */
export function SiteHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-40 h-14 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-6xl items-center gap-4 px-4 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60"
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
          <span className="hidden rounded-full border border-[var(--border)] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[.14em] text-[var(--text-faint)] sm:inline-block">
            showcase
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-6 text-[13px] font-medium text-[var(--text-dim)] md:flex">
          <a
            href="/#patterns"
            className="rounded transition-colors hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60"
          >
            Паттерны
          </a>
          <a
            href="/#architecture"
            className="rounded transition-colors hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60"
          >
            Архитектура
          </a>
          <a
            href="/app"
            className="group flex items-center gap-1 rounded text-lime-600 transition-colors hover:text-lime-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60 dark:text-lime-400/90 dark:hover:text-lime-300"
          >
            Демо-приложение
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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

        <div className="ml-auto flex items-center gap-3 md:ml-6">
          <span className="hidden font-mono text-[10px] text-[var(--text-faint)] lg:inline">v2.0</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
