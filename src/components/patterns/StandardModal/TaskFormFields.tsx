import { TextField } from "@/components/ui/TextField";
import { cn } from "@/lib/utils";
import type { IssuePriority } from "@/types/issue";
import { PRIORITY_FLAG_CLASS, PRIORITY_LABEL, PRIORITY_ORDER } from "@/types/issue";
import type { JSX } from "react";

interface TaskPriorityFieldProps {
  priority: IssuePriority;
  onPriorityChange: (priority: IssuePriority) => void;
}

/** Переключатель приоритета задачи: radio-группа с цветными флагами */
export function TaskPriorityField({ priority, onPriorityChange }: TaskPriorityFieldProps): JSX.Element {
  return (
    <fieldset>
      <legend className="text-[12px] font-medium text-zinc-400">Приоритет</legend>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {PRIORITY_ORDER.map((level) => (
          <button
            key={level}
            type="button"
            role="radio"
            aria-checked={priority === level}
            onClick={() => onPriorityChange(level)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11.5px] transition-colors focus-visible:ring-2 focus-visible:ring-lime-400/60 focus-visible:outline-hidden",
              priority === level
                ? "border-lime-400/35 bg-lime-400/10 text-zinc-100"
                : "border-white/[.08] bg-white/[.03] text-zinc-500 hover:text-zinc-300",
            )}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="currentColor"
              aria-hidden="true"
              className={PRIORITY_FLAG_CLASS[level]}
            >
              <path
                d="M2 1.5h8L7.6 5l2.4 3.5H2V1.5Z"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            {PRIORITY_LABEL[level]}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

interface TaskNotesFieldProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

/** Поле описания задачи: многострочный текст с подсказкой */
export function TaskNotesField({ notes, onNotesChange }: TaskNotesFieldProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="task-notes" className="text-[12px] font-medium text-zinc-400">
        Описание
      </label>
      <textarea
        id="task-notes"
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Контекст, критерии готовности…"
        rows={3}
        className="resize-none rounded-xl border border-white/[.09] bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-hidden transition-shadow placeholder:text-zinc-600 focus:border-lime-400/40 focus:ring-2 focus:ring-lime-400/25"
      />
    </div>
  );
}

interface TaskTitleFieldProps {
  title: string;
  onTitleChange: (title: string) => void;
}

/** Поле названия задачи */
export function TaskTitleField({ title, onTitleChange }: TaskTitleFieldProps): JSX.Element {
  return (
    <TextField
      id="task-title"
      label="Название"
      value={title}
      onChange={onTitleChange}
      placeholder="Например, «Доработать онбординг»"
      autoFocus
    />
  );
}
