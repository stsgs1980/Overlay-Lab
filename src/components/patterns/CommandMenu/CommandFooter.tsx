import { shortcutLabel } from "@/lib/utils";
import type { JSX } from "react";

interface CommandFooterProps {
  descId: string;
  contextLabel: string;
}

/** Подсказки управления в подвале палитры: стрелки, Enter и контекст */
export function CommandFooter({ descId, contextLabel }: CommandFooterProps): JSX.Element {
  return (
    <div
      id={descId}
      className="flex items-center gap-4 border-t border-white/[.07] px-4 py-2.5 font-mono text-[9.5px] text-zinc-600"
    >
      <span className="flex items-center gap-1.5">
        <kbd className="rounded border border-white/[.12] px-1">↑↓</kbd>выбор
      </span>
      <span className="flex items-center gap-1.5">
        <kbd className="rounded border border-white/[.12] px-1">↵</kbd>запуск
      </span>
      <span className="ml-auto hidden font-mono text-[9.5px] tracking-[.14em] text-zinc-700 uppercase sm:block">
        {contextLabel} · {shortcutLabel("K")}
      </span>
    </div>
  );
}
