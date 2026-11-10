"use client";

import { useDelayedUnmount } from "@/hooks/useDelayedUnmount";
import { cn } from "@/lib/utils";
import type { Issue, IssueComment } from "@/types/issue";
import type { JSX, KeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { FocusScope, OverlayContainer, useDialog } from "react-aria";
import { PanelComments } from "./PanelComments";
import { PanelComposer } from "./PanelComposer";
import { PanelDetails } from "./PanelDetails";

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
            "fixed top-3 right-3 bottom-3 z-[140] flex w-[min(400px,94vw)] flex-col overflow-hidden rounded-2xl border border-[#26282C] bg-[#141516] shadow-[0_24px_80px_-16px_rgba(0,0,0,.7)] outline-hidden",
            "transition-all duration-[380ms] ease-[cubic-bezier(.32,.72,.24,1)]",
            open ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-[112%] opacity-0",
          )}
        >
          <PanelDetails issue={issue} titleId={titleId} descId={descId} onClose={onClose} />

          {/* -- Комментарии ------------------------------------- */}
          <div className="flex items-center gap-2 px-4 pt-3">
            <h3 className="text-[11px] font-semibold tracking-[.14em] text-zinc-500 uppercase">Комментарии</h3>
            <span className="rounded-full border border-white/[.07] px-1.5 font-mono text-[10px] text-zinc-500">
              {comments.length}
            </span>
          </div>

          <PanelComments comments={comments} listRef={listRef} />

          {/* -- Композер ---------------------------------------- */}
          <PanelComposer draft={draft} onDraftChange={setDraft} onSubmit={addComment} />
        </aside>
      </FocusScope>
    </OverlayContainer>
  );
}
