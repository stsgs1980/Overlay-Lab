import type { JSX } from "react";

interface IssueStatusBarProps {
  doneCount: number;
  totalCount: number;
}

/** Нижняя статус-строка очереди: сколько задач выполнено и шкала прогресса */
export function IssueStatusBar({ doneCount, totalCount }: IssueStatusBarProps): JSX.Element {
  const progress = totalCount ? (doneCount / totalCount) * 100 : 0;

  return (
    <div className="flex items-center gap-3 border-t border-white/[.05] px-4 py-2.5 font-mono text-[10px] text-zinc-600 sm:px-5">
      <span>
        {doneCount} / {totalCount} выполнено
      </span>
      <div className="h-1 w-28 overflow-hidden rounded-full bg-white/[.06]">
        <div className="h-full rounded-full bg-lime-400/80 transition-all" style={{ width: `${progress}%` }} />
      </div>
      <span className="ml-auto hidden sm:inline">обновлено только что</span>
    </div>
  );
}
