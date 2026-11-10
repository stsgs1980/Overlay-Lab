import type { JSX } from "react";

/** Шапка таблицы очереди: подписи колонок (декоративная, скрыта от скринридера) */
export function IssueTableHeader(): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-[1.6rem_4.2rem_1fr_auto] items-center gap-2 border-b border-white/[.05] px-4 py-1.5 font-mono text-[9px] tracking-[.18em] text-zinc-600 uppercase sm:grid-cols-[1.6rem_4.2rem_1fr_5rem_4rem_2.5rem] sm:px-5"
    >
      <span />
      <span>ID</span>
      <span>Название</span>
      <span className="hidden sm:block">Тег</span>
      <span className="hidden sm:block">Приор.</span>
      <span className="hidden text-right sm:block">Кто</span>
    </div>
  );
}
