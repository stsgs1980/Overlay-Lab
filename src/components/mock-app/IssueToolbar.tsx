import { RichPopover } from "@/components/patterns/RichPopover/RichPopover";
import type { IssuePriority } from "@/types/issue";
import { Plus, Search } from "lucide-react";
import type { JSX } from "react";

interface IssueToolbarProps {
  query: string;
  onQueryChange: (query: string) => void;
  /** Сколько задач прошло фильтр */
  count: number;
  priority: IssuePriority;
  onPriorityChange: (priority: IssuePriority) => void;
  popoverOpen: boolean;
  onPopoverOpenChange: (open: boolean) => void;
  onNewTask: () => void;
}

/** Туулбар очереди: фильтр по названию, выбор приоритета и создание задачи */
export function IssueToolbar({
  query,
  onQueryChange,
  count,
  priority,
  onPriorityChange,
  popoverOpen,
  onPopoverOpenChange,
  onNewTask,
}: IssueToolbarProps): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-white/[.04] px-4 py-3 sm:px-5">
      <h1 className="text-[15px] font-semibold text-zinc-100">Очередь</h1>
      <span className="rounded-full border border-white/[.07] px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 tabular-nums">
        {count}
      </span>
      <div className="ml-auto flex flex-wrap items-center gap-2">
        <label className="flex h-8 items-center gap-2 rounded-lg border border-[#26282C] bg-white/[.03] px-2.5 text-zinc-500 focus-within:border-indigo-400/40">
          <Search size={13} aria-hidden="true" />
          <span className="sr-only">Фильтр по названию</span>
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Фильтр…"
            className="w-24 bg-transparent text-[12px] text-zinc-200 outline-hidden placeholder:text-zinc-600 md:w-36"
          />
        </label>
        <RichPopover
          open={popoverOpen}
          onOpenChange={onPopoverOpenChange}
          value={priority}
          onChange={onPriorityChange}
        />
        <button
          type="button"
          onClick={onNewTask}
          className="flex h-8 items-center gap-1.5 rounded-lg bg-zinc-100 px-3 text-[12px] font-semibold text-zinc-900 transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-indigo-400/70 focus-visible:outline-hidden"
        >
          <Plus size={13} strokeWidth={2.4} aria-hidden="true" />
          Новая задача
        </button>
      </div>
    </div>
  );
}
