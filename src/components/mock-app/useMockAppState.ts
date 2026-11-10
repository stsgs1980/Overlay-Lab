"use client";

import type { PaletteCommand } from "@/lib/commands";
import type { Issue, IssuePriority, NewTaskDraft } from "@/types/issue";
import type { PatternId } from "@/types/patterns";
import { useCallback } from "react";
import { useIssueQueue } from "./useIssueQueue";
import { useOverlayState } from "./useOverlayState";
import { useSelectedIssue } from "./useSelectedIssue";

interface MockAppState {
  issues: Issue[];
  activeTab: PatternId;
  overlay: PatternId | null;
  selectedIssue: Issue;
  priority: IssuePriority;
  toast: string | null;
  openPattern: (tab: PatternId) => void;
  closeOverlay: () => void;
  openIssue: (issue: Issue) => void;
  createIssue: (draft: NewTaskDraft) => void;
  runCommand: (command: PaletteCommand) => void;
  changePriority: (priority: IssuePriority) => void;
  setPopoverOpen: (open: boolean) => void;
  toggleCommandMenu: () => void;
  setStandardModalOpen: (open: boolean) => void;
}

/**
 * Состояние демо-стенда «Orbit»: очередь задач, активный оверлей и всплывающие уведомления.
 * Держит всё поведение макета, чтобы компонент оставался чистой композицией.
 */
export function useMockAppState(): MockAppState {
  const { issues, createIssue: addIssue } = useIssueQueue();
  const { selectedIssue, selectIssue } = useSelectedIssue();
  const overlayState = useOverlayState();

  const openIssue = useCallback(
    (issue: Issue) => {
      selectIssue(issue);
      overlayState.openPattern("side-panel");
    },
    [overlayState, selectIssue],
  );

  const createIssue = useCallback(
    (draft: NewTaskDraft) => {
      const id = addIssue(draft);
      overlayState.setStandardModalOpen(false);
      overlayState.showToast(`Задача ${id} создана`);
    },
    [addIssue, overlayState],
  );

  return { ...overlayState, issues, selectedIssue, openIssue, createIssue };
}
