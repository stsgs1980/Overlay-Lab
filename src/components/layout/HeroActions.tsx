import { Button } from "@/components/ui/Button";
import type { JSX } from "react";

/** Призывы к действию: переход к паттернам, к архитектуре и в демо-приложение */
export function HeroActions(): JSX.Element {
  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href="#patterns">
          <Button
            variant="primary"
            size="lg"
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M8 3v10M8 13l-4-4M8 13l4-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          >
            Смотреть паттерны
          </Button>
        </a>
        <a href="#architecture">
          <Button variant="outline" size="lg">
            Как это устроено
          </Button>
        </a>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[10.5px] tracking-[.16em] text-[var(--text-faint)]">
        <span>Или откройте</span>
        <a
          href="/app"
          className="group inline-flex items-center gap-1.5 rounded-md border border-[var(--border-strong)] px-2 py-1 text-[var(--text-dim)] transition-colors hover:border-lime-400/50 hover:text-lime-600 focus-visible:ring-2 focus-visible:ring-lime-400/60 focus-visible:outline-none dark:hover:text-lime-300"
        >
          демо-приложение Orbit в стиле Linear
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
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </>
  );
}
