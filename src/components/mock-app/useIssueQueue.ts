"use client";

import { ISSUES } from "@/lib/mock-issues";
import type { Issue, NewTaskDraft } from "@/types/issue";
import { useCallback, useRef, useState } from "react";

interface IssueQueue {
  issues: Issue[];
  /** Добавляет задачу в начало очереди и возвращает её идентификатор */
  createIssue: (draft: NewTaskDraft) => string;
}

/** Очередь задач демо-стенда: список и добавление новой задачи */
export function useIssueQueue(): IssueQueue {
  const [issues, setIssues] = useState<Issue[]>(ISSUES);
  const nextId = useRef(242);

  const createIssue = useCallback((draft: NewTaskDraft): string => {
    nextId.current += 1;
    const id = `OPL-${nextId.current}`;
    setIssues((prev) => [
      {
        id,
        title: draft.title,
        project: "Core",
        tag: "ux",
        status: "todo",
        priority: draft.priority,
        assignee: { initials: "АС", color: "#7C6CF0", name: "Аня Соколова" },
        comments: [],
      },
      ...prev,
    ]);
    return id;
  }, []);

  return { issues, createIssue };
}
