"use client";

import { RichPopover } from "@/components/patterns/RichPopover/RichPopover";
import { cn } from "@/lib/utils";
import type { Issue, IssuePriority, IssueStatus } from "@/types/issue";
import { PRIORITY_FLAG_CLASS } from "@/types/issue";
import { Circle, CircleCheck, CircleDashed, CircleDot, Flag, Plus, Search } from "lucide-react";
import type { JSX } from "react";
import { useMemo, useState } from "react";

interface IssueListProps {
  issues: Issue[];
  onOpenIssue: (issue: Issue) => void;
  onNewTask: () => void;
  priority: IssuePriority;
  onPriorityChange: (priority: IssuePriority) => void;
  popoverOpen: boolean;
  onPopoverOpenChange: (open: boolean) => void;
}

const STATUS_ICON: Record<IssueStatus, typeof Circle> = {
  backlog: CircleDashed,
  todo: Circle,
  "in-progress": CircleDot,
  done: CircleCheck,
};
const STATUS_TONE: Record<IssueStatus, string> = {
  backlog: "text-zinc-600",
  todo: "text-zinc-500",
  "in-progress": "text-amber-400",
  done: "text-lime-400",
};

/** Основная область «приложения»: туулбар + фильтр + список задач */
export function IssueList({
  issues,
  onOpenIssue,
  onNewTask,
  priority,
  onPriorityChange,
  popoverOpen,
  onPopoverOpenChange,
}: IssueListProps): JSX.Element {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? issues.filter((issue) => [issue.title, issue.id, issue.tag].join(" ").toLowerCase().includes(q))
      : issues;
  }, [issues, query]);

  const doneCount = issues.filter((issue) => issue.status === "done").length;

  return (
    <div className="flex min-h-full flex-col">
      {/* Туулбар */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[.04] px-4 py-3 sm:px-5">
        <h1 className="text-[15px] font-semibold text-zinc-100">Очередь</h1>
        <span className="rounded-full border border-white/[.07] px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-zinc-500">
          {filtered.length}
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <label className="flex h-8 items-center gap-2 rounded-lg border border-[#26282C] bg-white/[.03] px-2.5 text-zinc-500 focus-within:border-indigo-400/40">
            <Search size={13} aria-hidden="true" />
            <span className="sr-only">Фильтр по названию</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Фильтр…"
              className="w-24 bg-transparent text-[12px] text-zinc-200 outline-none placeholder:text-zinc-600 md:w-36"
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
            className="flex h-8 items-center gap-1.5 rounded-lg bg-zinc-100 px-3 text-[12px] font-semibold text-zinc-900 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70"
          >
            <Plus size={13} strokeWidth={2.4} aria-hidden="true" />
            Новая задача
          </button>
        </div>
      </div>

      {/* Шапка таблицы */}
      <div
        aria-hidden="true"
        className="grid grid-cols-[1.6rem_4.2rem_1fr_auto] items-center gap-2 border-b border-white/[.05] px-4 py-1.5 font-mono text-[9px] uppercase tracking-[.18em] text-zinc-600 sm:grid-cols-[1.6rem_4.2rem_1fr_5rem_4rem_2.5rem] sm:px-5"
      >
        <span />
        <span>ID</span>
        <span>Название</span>
        <span className="hidden sm:block">Тег</span>
        <span className="hidden sm:block">Приор.</span>
        <span className="hidden text-right sm:block">Кто</span>
      </div>

      {/* Строки */}
      <ul className="flex-1">
        {filtered.map((issue) => {
          const StatusIcon = STATUS_ICON[issue.status];
          const isDone = issue.status === "done";
          return (
            <li key={issue.id}>
              <button
                type="button"
                onClick={() => onOpenIssue(issue)}
                aria-label={`Открыть задачу ${issue.id}: ${issue.title}`}
                className="grid w-full grid-cols-[1.6rem_4.2rem_1fr_auto] items-center gap-2 border-b border-white/[.035] px-4 py-2.5 text-left transition-colors hover:bg-white/[.025] focus-visible:bg-white/[.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-400/50 sm:grid-cols-[1.6rem_4.2rem_1fr_5rem_4rem_2.5rem] sm:px-5"
              >
                <StatusIcon size={14} strokeWidth={1.8} className={STATUS_TONE[issue.status]} aria-hidden="true" />
                <span className="font-mono text-[11px] text-zinc-600">{issue.id}</span>
                <span
                  className={cn(
                    "truncate text-[13px]",
                    isDone ? "text-zinc-600 line-through decoration-zinc-700" : "text-zinc-200",
                  )}
                >
                  {issue.title}
                </span>
                <span className="hidden sm:block">
                  <span className="rounded border border-white/[.06] bg-white/[.03] px-1.5 py-0.5 font-mono text-[9.5px] text-zinc-500">
                    {issue.tag}
                  </span>
                </span>
                <Flag
                  size={12}
                  className={cn("hidden sm:block", PRIORITY_FLAG_CLASS[issue.priority])}
                  aria-label={`Приоритет: ${issue.priority}`}
                />
                <span
                  className="flex h-5 w-5 items-center justify-center justify-self-end rounded-full text-[7px] font-bold text-zinc-950"
                  style={{ background: issue.assignee.color }}
                  title={issue.assignee.name}
                >
                  {issue.assignee.initials}
                </span>
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="px-5 py-10 text-center text-[12.5px] text-zinc-600">Ничего не нашлось по «{query}»</li>
        )}
      </ul>

      {/* Нижняя статус-строка */}
      <div className="flex items-center gap-3 border-t border-white/[.05] px-4 py-2.5 font-mono text-[10px] text-zinc-600 sm:px-5">
        <span>
          {doneCount} / {issues.length} выполнено
        </span>
        <div className="h-1 w-28 overflow-hidden rounded-full bg-white/[.06]">
          <div
            className="h-full rounded-full bg-lime-400/80 transition-all"
            style={{ width: `${issues.length ? (doneCount / issues.length) * 100 : 0}%` }}
          />
        </div>
        <span className="ml-auto hidden sm:inline">обновлено только что</span>
      </div>
    </div>
  );
}
