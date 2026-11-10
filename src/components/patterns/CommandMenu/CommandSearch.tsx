import { Search } from "lucide-react";
import type { JSX, KeyboardEvent } from "react";

interface CommandSearchProps {
  query: string;
  activeIndex: number;
  listId: string;
  onQueryChange: (query: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

/** Строка поиска команд: комбобокс с подсказкой закрытия по Escape */
export function CommandSearch({
  query,
  activeIndex,
  listId,
  onQueryChange,
  onKeyDown,
}: CommandSearchProps): JSX.Element {
  return (
    <div className="flex items-center gap-3 border-b border-white/[.07] px-4">
      <Search size={16} className="shrink-0 text-zinc-500" aria-hidden="true" />
      <input
        role="combobox"
        autoFocus
        aria-label="Поиск по командам"
        aria-expanded="true"
        aria-controls={listId}
        aria-activedescendant={activeIndex >= 0 ? `cmd-opt-${activeIndex}` : undefined}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Поиск действий, разделов и страниц…"
        autoComplete="off"
        spellCheck={false}
        className="h-14 w-full bg-transparent text-[15px] text-zinc-100 outline-hidden placeholder:text-zinc-600"
      />
      <kbd className="shrink-0 rounded-md border border-white/[.1] bg-white/[.05] px-1.5 py-0.5 font-mono text-[9.5px] text-zinc-500 uppercase">
        esc
      </kbd>
    </div>
  );
}
