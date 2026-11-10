import { cn } from "@/lib/utils";
import type { Issue, IssueStatus } from "@/types/issue";
import { PRIORITY_FLAG_CLASS } from "@/types/issue";
import { Circle, CircleCheck, CircleDashed, CircleDot, Flag } from "lucide-react";
import type { JSX } from "react";

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

interface IssueRowProps {
  issue: Issue;
  onOpenIssue: (issue: Issue) => void;
}

/** Строка очереди: статус, идентификатор, название, тег, приоритет и исполнитель */
export function IssueRow({ issue, onOpenIssue }: IssueRowProps): JSX.Element {
  const StatusIcon = STATUS_ICON[issue.status];
  const isDone = issue.status === "done";

  return (
    <li>
      <button
        type="button"
        onClick={() => onOpenIssue(issue)}
        aria-label={`Открыть задачу ${issue.id}: ${issue.title}`}
        className="grid w-full grid-cols-[1.6rem_4.2rem_1fr_auto] items-center gap-2 border-b border-white/[.035] px-4 py-2.5 text-left transition-colors hover:bg-white/[.025] focus-visible:bg-white/[.03] focus-visible:ring-2 focus-visible:ring-indigo-400/50 focus-visible:outline-hidden focus-visible:ring-inset sm:grid-cols-[1.6rem_4.2rem_1fr_5rem_4rem_2.5rem] sm:px-5"
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
}
