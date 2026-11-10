/* --- Доменные типы мок-приложения (Linear-like) ----------- */
export type IssuePriority = "low" | "medium" | "high" | "urgent";
export type IssueStatus = "backlog" | "todo" | "in-progress" | "done";

export interface IssueComment {
  id: string;
  author: string;
  initials: string;
  /** Цвет аватара — hex, задаётся точечно для разнообразия */
  color: string;
  time: string;
  body: string;
}

export interface Issue {
  id: string;
  title: string;
  project: string;
  tag: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: { initials: string; color: string; name: string };
  comments: IssueComment[];
}

/** Черновик новой задачи из Standard Modal */
export interface NewTaskDraft {
  title: string;
  notes: string;
  priority: IssuePriority;
}

export const PRIORITY_ORDER: IssuePriority[] = ["low", "medium", "high", "urgent"];

export const PRIORITY_LABEL: Record<IssuePriority, string> = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
  urgent: "Срочный",
};

export const STATUS_LABEL: Record<IssueStatus, string> = {
  backlog: "Бэклог",
  todo: "К выполнению",
  "in-progress": "В работе",
  done: "Готово",
};

/** Цвет флага по приоритету — единый для модалки, поповера и списка */
export const PRIORITY_FLAG_CLASS: Record<IssuePriority, string> = {
  low: "text-sky-400",
  medium: "text-yellow-400",
  high: "text-orange-400",
  urgent: "text-red-400",
};
