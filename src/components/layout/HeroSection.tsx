import { Button } from "@/components/ui/Button";
import { SITE, TOTALS } from "@/lib/constants";
import type { JSX } from "react";
import { HeroArt } from "./HeroArt";

/** Первый экран: позиционирование, CTA, цифры витрины и декоративная схема слоёв */
export function HeroSection(): JSX.Element {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_.95fr] lg:pb-20">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] py-1 pr-3 pl-2.5 text-[10.5px] font-medium tracking-[.18em] text-[var(--text-dim)] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
            </span>
            Overlay Lab · UI-паттерны
          </p>

          <h1 className="mt-5 text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-balance text-[var(--text)] sm:text-6xl">
            Анатомия{" "}
            <span className="bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 bg-clip-text text-transparent">
              модальных окон
            </span>
          </h1>

          <p className="mt-5 text-[16px] leading-relaxed text-pretty text-[var(--text-dim)]">
            {SITE.description} Каждый паттерн — живое демо: откройте, потаскайте, нажмите Escape — и загляните под капот
            в сниппет.
          </p>

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

          <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[10.5px] tracking-[.16em] text-[var(--text-faint)] uppercase">
            <span>Или откройте</span>
            <a
              href="/app"
              className="group inline-flex items-center gap-1.5 rounded-md border border-[var(--border-strong)] px-2 py-1 text-[var(--text-dim)] transition-colors hover:border-lime-400/50 hover:text-lime-600 focus-visible:ring-2 focus-visible:ring-lime-400/60 focus-visible:outline-hidden dark:hover:text-lime-300"
            >
              демо-приложение Orbit в стиле Linear
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
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <dl className="mt-8 flex items-stretch gap-6 border-t border-[var(--border)] pt-6 sm:gap-10">
            {[
              { n: String(TOTALS.patterns), label: "паттерна" },
              { n: String(TOTALS.libraries), label: "библиотеки" },
              { n: TOTALS.a11y, label: "с фокусом и ARIA" },
            ].map(({ n, label }) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="text-2xl font-semibold text-[var(--text)] tabular-nums">{n}</dd>
                <dd className="mt-0.5 max-w-[9rem] text-[11px] leading-snug text-[var(--text-faint)]">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroArt />
      </div>
    </section>
  );
}
