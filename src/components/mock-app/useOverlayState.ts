"use client";

import type { PaletteCommand } from "@/lib/commands";
import type { IssuePriority } from "@/types/issue";
import { PRIORITY_LABEL } from "@/types/issue";
import type { PatternId } from "@/types/patterns";
import { useCallback, useState } from "react";
import { usePriority } from "./usePriority";
import { useToast } from "./useToast";

interface OverlayState {
  activeTab: PatternId;
  overlay: PatternId | null;
  priority: IssuePriority;
  toast: string | null;
  openPattern: (tab: PatternId) => void;
  closeOverlay: () => void;
  runCommand: (command: PaletteCommand) => void;
  changePriority: (priority: IssuePriority) => void;
  setPopoverOpen: (open: boolean) => void;
  toggleCommandMenu: () => void;
  setStandardModalOpen: (open: boolean) => void;
  showToast: (message: string) => void;
}

/**
 * Активный оверлей демо-стенда: вкладка, открытый слой и тосты.
 * Отвечает за переключение паттернов; очередь задач живёт в useIssueQueue.
 */
export function useOverlayState(): OverlayState {
  const [activeTab, setActiveTab] = useState<PatternId>("standard-modal");
  // Стартуем с открытой модалкой: сразу видно, что /app — живой демо-стенд
  const [overlay, setOverlay] = useState<PatternId | null>("standard-modal");
  const { priority, setPriority } = usePriority();
  const { toast, showToast } = useToast();

  const openPattern = useCallback((tab: PatternId) => {
    setActiveTab(tab);
    setOverlay(tab);
  }, []);
  const closeOverlay = useCallback(() => setOverlay(null), []);

  const runCommand = useCallback(
    (command: PaletteCommand) => {
      setOverlay(null);
      if (command.id === "act-new-task") {
        setActiveTab("standard-modal");
        setOverlay("standard-modal");
        return;
      }
      showToast(command.run);
    },
    [showToast],
  );

  const changePriority = useCallback(
    (next: IssuePriority) => {
      setPriority(next);
      showToast(`Приоритет: ${PRIORITY_LABEL[next]}`);
    },
    [setPriority, showToast],
  );

  const setPopoverOpen = useCallback((open: boolean) => {
    setActiveTab("rich-popover");
    setOverlay(open ? "rich-popover" : null);
  }, []);

  const toggleCommandMenu = useCallback(() => {
    setActiveTab("command-menu");
    setOverlay((current) => (current === "command-menu" ? null : "command-menu"));
  }, []);

  const setStandardModalOpen = useCallback((open: boolean) => {
    setOverlay(open ? "standard-modal" : null);
  }, []);

  return {
    activeTab,
    overlay,
    priority,
    toast,
    openPattern,
    closeOverlay,
    runCommand,
    changePriority,
    setPopoverOpen,
    toggleCommandMenu,
    setStandardModalOpen,
    showToast,
  };
}
