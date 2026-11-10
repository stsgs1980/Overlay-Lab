import { TOTALS } from "@/lib/constants";
import type { JSX } from "react";

/** Итоги витрины: сколько паттернов, библиотек и покрытия доступностью */
export function HeroStats(): JSX.Element {
  return (
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
  );
}
