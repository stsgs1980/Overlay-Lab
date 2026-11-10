"use client";

import { Button } from "@/components/ui/Button";
import { ModalBody } from "@/components/ui/Modal/ModalBody";
import { ModalFooter } from "@/components/ui/Modal/ModalFooter";
import { ModalHeader } from "@/components/ui/Modal/ModalHeader";
import type { IssuePriority, NewTaskDraft } from "@/types/issue";
import { Dialog } from "@base-ui/react/dialog";
import { SquarePen } from "lucide-react";
import type { JSX, KeyboardEvent } from "react";
import { useState } from "react";
import { TaskNotesField, TaskPriorityField, TaskTitleField } from "./TaskFormFields";

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
        <Dialog.Backdrop className="motion-safe:animate-backdrop-in fixed inset-0 z-[150] bg-black/60 backdrop-blur-[3px]" />
        <Dialog.Popup
          onKeyDown={onKeyDown}
          className="motion-safe:animate-dialog-in fixed top-1/2 left-1/2 z-[150] flex max-h-[86vh] w-[min(30rem,92vw)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-white/[.1] bg-[#17181D] shadow-[0_32px_80px_-16px_rgba(0,0,0,.75)] outline-hidden"
        >
          <ModalHeader
            icon={<SquarePen size={17} strokeWidth={1.8} />}
            title="Новая задача"
            description="Фон заблокирован: Tab-цикл заперт внутри, Escape и клик по backdrop закрывают окно."
          />
          <ModalBody>
            <TaskTitleField title={title} onTitleChange={setTitle} />
            <TaskNotesField notes={notes} onNotesChange={setNotes} />
            <TaskPriorityField priority={priority} onPriorityChange={setPriority} />
          </ModalBody>
          <ModalFooter align="between">
            <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase">⌘↵ — создать</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                Отмена
              </Button>
              <button
                type="button"
                onClick={submit}
                disabled={!canSubmit}
                className="inline-flex h-8 items-center rounded-lg bg-zinc-100 px-3.5 text-[13px] font-semibold text-zinc-900 transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-lime-400/70 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-40"
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
