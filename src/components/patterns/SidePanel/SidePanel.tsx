"use client";

import { useDelayedUnmount } from "@/hooks/useDelayedUnmount";
import { cn } from "@/lib/utils";
import type { Issue, IssueComment } from "@/types/issue";
import { PRIORITY_LABEL, STATUS_LABEL } from "@/types/issue";
import { SendHorizontal, X } from "lucide-react";
import type { FormEvent, JSX, KeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { FocusScope, OverlayContainer, useDialog } from "react-aria";

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  issue: Issue | null;
}

const DURATION = 380;

/**
 * Side Panel (Linear-паттерн): детали задачи + комментарии справа.
 * OverlayContainer делает дерево приложения aria-hidden, FocusScope запирает
 * Tab внутри и возвращает фокус на триггер. Визуально backdrop нет —
 * переход на transform: translateX.
 */
export function SidePanel({ open, onClose, issue }: SidePanelProps): JSX.Element | null {
  const mounted = useDelayedUnmount(open, DURATION);
  const panelRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const descId = useId();
  const titleId = useId();
  // Явные aria-labelledby/describedby (свой useId) — детерминированно и не зависит от момента монтирования
  const { dialogProps } = useDialog(
    { role: "dialog", "aria-labelledby": titleId, "aria-describedby": descId },
    panelRef,
  );
  const [comments, setComments] = useState<IssueComment[]>(issue?.comments ?? []);
  const [draft, setDraft] = useState("");

  // Синхронизируемся по объекту задачи: комментарии сбрасываются,
  // когда меняется выбранная задача, а не на каждый рендер.
  useEffect(() => setComments(issue?.comments ?? []), [issue]);
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [comments.length]);

  if (!mounted || !issue) return null;

  const addComment = (): void => {
    const body = draft.trim();
    if (!body) return;
    setComments((prev) => [
      ...prev,
      { id: `c-${Date.now()}`, author: "Аня Соколова", initials: "АС", color: "#7C6CF0", time: "только что", body },
    ]);
    setDraft("");
  };
  const onComposerKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      addComment();
    }
  };
  const onPanelKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (event.key === "Escape") onClose();
  };

  return (
    <OverlayContainer>
      <FocusScope contain restoreFocus autoFocus>
        <aside
          ref={panelRef}
          {...dialogProps}
          aria-modal="true"
          onKeyDown={onPanelKeyDown}
          className={cn(
            "fixed bottom-3 right-3 top-3 z-[140] flex w-[min(400px,94vw)] flex-col overflow-hidden rounded-2xl border border-[#26282C] bg-[#141516] shadow-[0_24px_80px_-16px_rgba(0,0,0,.7)] outline-none",
            "transition-all duration-[380ms] ease-[cubic-bezier(.32,.72,.24,1)]",
            open ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-[112%] opacity-0",
          )}
        >
          {/* -- Шапка ------------------------------------------- */}
          <div className="flex items-center gap-2 border-b border-white/[.05] px-4 py-3">
            <span className="rounded-md border border-white/[.08] bg-white/[.03] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
              {issue.project}
            </span>
            <span className="font-mono text-[11px] text-zinc-600">{issue.id}</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть панель"
              className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-white/[.06] hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70"
            >
              <X size={15} />
            </button>
          </div>
          <div className="border-b border-white/[.05] px-4 pb-4 pt-3">
            <p id={descId} className="sr-only">
              Детали задачи {issue.id}: статус, приоритет, исполнитель и комментарии
            </p>
            <h2 id={titleId} className="text-[15px] font-medium leading-snug text-zinc-100">
              {issue.title}
            </h2>
            <dl className="mt-3 grid grid-cols-3 gap-2">
              {[
                ["Статус", STATUS_LABEL[issue.status]],
                ["Приоритет", PRIORITY_LABEL[issue.priority]],
                ["Исполнитель", issue.assignee.name.split(" ")[0]],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <dt className="font-mono text-[8.5px] uppercase tracking-[.18em] text-zinc-600">{label}</dt>
                  <dd className="mt-0.5 truncate text-[12px] text-zinc-300">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* -- Комментарии ------------------------------------- */}
          <div className="flex items-center gap-2 px-4 pt-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-[.14em] text-zinc-500">Комментарии</h3>
            <span className="rounded-full border border-white/[.07] px-1.5 font-mono text-[10px] text-zinc-500">
              {comments.length}
            </span>
          </div>
          <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {comments.map((comment) => (
              <figure key={comment.id} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[8.5px] font-bold text-zinc-950"
                  style={{ background: comment.color }}
                >
                  {comment.initials}
                </span>
                <span className="min-w-0">
                  <span className="flex items-baseline gap-2">
                    <span className="text-[11.5px] font-medium text-zinc-300">{comment.author}</span>
                    <span className="font-mono text-[9.5px] text-zinc-600">{comment.time}</span>
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-zinc-400">{comment.body}</span>
                </span>
              </figure>
            ))}
          </div>

          {/* -- Композер ---------------------------------------- */}
          <form
            className="flex items-center gap-2 border-t border-white/[.05] p-3"
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              addComment();
            }}
          >
            <input
              value={draft}
              autoFocus
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onComposerKeyDown}
              placeholder="Оставить комментарий…  (Enter)"
              aria-label="Оставить комментарий"
              className="h-9 min-w-0 flex-1 rounded-lg border border-[#26282C] bg-white/[.03] px-3 text-[12.5px] text-zinc-100 outline-none transition-shadow placeholder:text-zinc-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
            />
            <button
              type="submit"
              disabled={draft.trim() === ""}
              aria-label="Отправить комментарий"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#5E6AD2] text-white transition-all hover:bg-[#6E79D6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70 disabled:pointer-events-none disabled:opacity-40"
            >
              <SendHorizontal size={15} />
            </button>
          </form>
        </aside>
      </FocusScope>
    </OverlayContainer>
  );
}
