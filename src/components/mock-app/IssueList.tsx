"use client";

import type { Issue, IssuePriority } from "@/types/issue";
import type { JSX } from "react";
import { useMemo, useState } from "react";
import { IssueRow } from "./IssueRow";
import { IssueStatusBar } from "./IssueStatusBar";
import { IssueTableHeader } from "./IssueTableHeader";
import { IssueToolbar } from "./IssueToolbar";

interface IssueListProps {
  issues: Issue[];
  onOpenIssue: (issue: Issue) => void;
  onNewTask: () => void;
  priority: IssuePriority;
  onPriorityChange: (priority: IssuePriority) => void;
  popoverOpen: boolean;
  onPopoverOpenChange: (open: boolean) => void;
}

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
      <IssueToolbar
        query={query}
        onQueryChange={setQuery}
        count={filtered.length}
        priority={priority}
        onPriorityChange={onPriorityChange}
        popoverOpen={popoverOpen}
        onPopoverOpenChange={onPopoverOpenChange}
        onNewTask={onNewTask}
      />

      <IssueTableHeader />

      {/* Строки */}
      <ul className="flex-1">
        {filtered.map((issue) => (
          <IssueRow key={issue.id} issue={issue} onOpenIssue={onOpenIssue} />
        ))}
        {filtered.length === 0 && (
          <li className="px-5 py-10 text-center text-[12.5px] text-zinc-600">Ничего не нашлось по «{query}»</li>
        )}
      </ul>

      <IssueStatusBar doneCount={doneCount} totalCount={issues.length} />
    </div>
  );
}
