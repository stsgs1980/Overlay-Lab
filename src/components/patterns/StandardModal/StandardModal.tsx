"use client";

import { Button } from "@/components/ui/Button";
import { ModalBody } from "@/components/ui/Modal/ModalBody";
import { ModalFooter } from "@/components/ui/Modal/ModalFooter";
import { ModalHeader } from "@/components/ui/Modal/ModalHeader";
import { TextField } from "@/components/ui/TextField";
import { cn } from "@/lib/utils";
import type { IssuePriority, NewTaskDraft } from "@/types/issue";
import { PRIORITY_FLAG_CLASS, PRIORITY_LABEL, PRIORITY_ORDER } from "@/types/issue";
import { Dialog } from "@base-ui/react/dialog";
import { SquarePen } from "lucide-react";
import type { JSX, KeyboardEvent } from "react";
import { useState } from "react";

interface StandardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Вызывается с черновиком при создании (Cmd/Ctrl+Enter или кнопка) */
  onCreate?: (draft: NewTaskDraft) => void;
}

/**
 * Standard Modal: классический диалог с подложкой.
 * Base UI обрабатывает focus-trap, inert-фон, scroll-lock и Escape —
 * мы отвечаем только за контент формы создания задачи.
 */
export function StandardModal({ open, onOpenChange, onCreate }: StandardModalProps): JSX.Element {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState<IssuePriority>("medium");

  const canSubmit = title.trim().length > 0;

  const submit = (): void => {
    if (!canSubmit) return;
    onCreate?.({ title: title.trim(), notes: notes.trim(), priority });
    setTitle("");
    setNotes("");
    setPriority("medium");
    onOpenChange(false);
  };

  /** ⌘/Ctrl+Enter — быстрое создание из любой точки формы */
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      submit();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-[3px] motion-safe:animate-backdrop-in" />
        <Dialog.Popup
          onKeyDown={onKeyDown}
          className="fixed left-1/2 top-1/2 z-[150] flex max-h-[86vh] w-[min(30rem,92vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-white/[.1] bg-[#17181D] shadow-[0_32px_80px_-16px_rgba(0,0,0,.75)] outline-none motion-safe:animate-dialog-in"
        >
          <ModalHeader
            icon={<SquarePen size={17} strokeWidth={1.8} />}
            title="Новая задача"
            description="Фон заблокирован: Tab-цикл заперт внутри, Escape и клик по backdrop закрывают окно."
          />
          <ModalBody>
            <TextField
              id="task-title"
              label="Название"
              value={title}
              onChange={setTitle}
              placeholder="Например, «Доработать онбординг»"
              autoFocus
            />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="task-notes" className="text-[12px] font-medium text-zinc-400">
                Описание
              </label>
              <textarea
                id="task-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Контекст, критерии готовности…"
                rows={3}
                className="resize-none rounded-xl border border-white/[.09] bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-none transition-shadow placeholder:text-zinc-600 focus:border-lime-400/40 focus:ring-2 focus:ring-lime-400/25"
              />
            </div>
            <fieldset>
              <legend className="text-[12px] font-medium text-zinc-400">Приоритет</legend>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {PRIORITY_ORDER.map((level) => (
                  <button
                    key={level}
                    type="button"
                    role="radio"
                    aria-checked={priority === level}
                    onClick={() => setPriority(level)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60",
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
          </ModalBody>
          <ModalFooter align="between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">⌘↵ — создать</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                Отмена
              </Button>
              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit}
                className="inline-flex h-8 items-center rounded-lg bg-zinc-100 px-3.5 text-[13px] font-semibold text-zinc-900 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/70 disabled:pointer-events-none disabled:opacity-40"
              >
                Создать задачу
              </button>
            </div>
          </ModalFooter>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
