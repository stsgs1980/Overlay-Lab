import type { Issue } from "@/types/issue";
import { PRIORITY_LABEL, STATUS_LABEL } from "@/types/issue";
import { X } from "lucide-react";
import type { JSX } from "react";

interface PanelDetailsProps {
  issue: Issue;
  titleId: string;
  descId: string;
  onClose: () => void;
}

/** Шапка панели: теги задачи, заголовок и сводка полей */
export function PanelDetails({ issue, titleId, descId, onClose }: PanelDetailsProps): JSX.Element {
  return (
    <>
      <div className="flex items-center gap-2 border-b border-white/[.05] px-4 py-3">
        <span className="rounded-md border border-white/[.08] bg-white/[.03] px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
          {issue.project}
        </span>
        <span className="font-mono text-[11px] text-zinc-600">{issue.id}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть панель"
          className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/[.06] hover:text-zinc-200 focus-visible:ring-2 focus-visible:ring-indigo-400/70 focus-visible:outline-hidden"
        >
          <X size={15} />
        </button>
      </div>
      <div className="border-b border-white/[.05] px-4 pt-3 pb-4">
        <p id={descId} className="sr-only">
          Детали задачи {issue.id}: статус, приоритет, исполнитель и комментарии
        </p>
        <h2 id={titleId} className="text-[15px] leading-snug font-medium text-zinc-100">
          {issue.title}
        </h2>
        <dl className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["Статус", STATUS_LABEL[issue.status]],
            ["Приоритет", PRIORITY_LABEL[issue.priority]],
            ["Исполнитель", issue.assignee.name.split(" ")[0]],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="font-mono text-[8.5px] tracking-[.18em] text-zinc-600 uppercase">{label}</dt>
              <dd className="mt-0.5 truncate text-[12px] text-zinc-300">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
