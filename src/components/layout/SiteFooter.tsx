import type { JSX } from "react";
/** Футер витрины: стек, лицензия, ссылки */
export function SiteFooter(): JSX.Element {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-[13px] font-semibold text-[var(--text)]">Overlay Lab</p>
          <p className="mt-0.5 max-w-sm text-[11.5px] leading-snug text-[var(--text-faint)]">
            Эталонная витрина паттернов: modal · panel · menu · popover.
          </p>
        </div>
        <div className="flex flex-col items-start gap-1.5 sm:items-end">
          <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--text-faint)]">
            Next.js 16 · React 19 · Tailwind · Lucide
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[.16em] text-[var(--text-faint)]">
            Base UI · React Aria · React Stately
          </p>
        </div>
      </div>
    </footer>
  );
}
