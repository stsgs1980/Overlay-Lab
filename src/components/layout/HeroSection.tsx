import { SITE } from "@/lib/constants";
import type { JSX } from "react";
import { HeroActions } from "./HeroActions";
import { HeroArt } from "./HeroArt";
import { HeroStats } from "./HeroStats";

/** Первый экран: позиционирование, CTA, цифры витрины и декоративная схема слоёв */
export function HeroSection(): JSX.Element {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_.95fr] lg:pb-20">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] py-1 pr-3 pl-2.5 text-[10.5px] font-medium tracking-[.18em] text-[var(--text-dim)]">
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

          <HeroActions />
          <HeroStats />
        </div>

        <HeroArt />
      </div>
    </section>
  );
}
