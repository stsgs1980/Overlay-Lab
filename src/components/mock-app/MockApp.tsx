"use client";

import { CommandMenu } from "@/components/patterns/CommandMenu/CommandMenu";
import { SidePanel } from "@/components/patterns/SidePanel/SidePanel";
import { StandardModal } from "@/components/patterns/StandardModal/StandardModal";
import { Toast } from "@/components/ui/Toast";
import { useCommandMenu } from "@/hooks/useCommandMenu";
import { useModalStackEntry } from "@/hooks/useModalStack";
import type { PaletteCommand } from "@/lib/commands";
import { ISSUES } from "@/lib/mock-issues";
import type { Issue, IssuePriority, NewTaskDraft } from "@/types/issue";
import { PRIORITY_LABEL } from "@/types/issue";
import type { PatternId } from "@/types/patterns";
import type { JSX } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { OverlayProvider } from "react-aria";
import { AppHeader } from "./AppHeader";
import { IssueList } from "./IssueList";
import { Sidebar } from "./Sidebar";

/**
 * Mock SaaS-приложения «Orbit»: сайдбар + очередь задач + шапка с Base UI Tabs.
 * Вкладки — драйвер демонстрации: переключение открывает соответствующий оверлей.
 */
export default function MockApp(): JSX.Element {
  const [issues, setIssues] = useState<Issue[]>(ISSUES);
  const [activeTab, setActiveTab] = useState<PatternId>("standard-modal");
  // Стартуем с открытой модалкой: сразу видно, что /app — живой демо-стенд
  const [overlay, setOverlay] = useState<PatternId | null>("standard-modal");
  const [selectedIssue, setSelectedIssue] = useState<Issue>(ISSUES[0]);
  const [priority, setPriority] = useState<IssuePriority>("high");
  const [toast, setToast] = useState<string | null>(null);
  const nextId = useRef(242);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // Демонстрируемый слой кладём в общий реестр — монитор видит и оверлеи макета
  useModalStackEntry("standard-modal", "Новая задача", overlay === "standard-modal", "dialog");
  useModalStackEntry("side-panel", `Задача ${selectedIssue.id}`, overlay === "side-panel", "panel");
  useModalStackEntry("command-menu", "Командное меню", overlay === "command-menu", "palette");
  useModalStackEntry("rich-popover", "Выбор приоритета", overlay === "rich-popover", "popover");

  const openPattern = useCallback((tab: PatternId) => {
    setActiveTab(tab);
    setOverlay(tab);
    if (tab === "side-panel") setSelectedIssue((current) => current ?? ISSUES[0]);
  }, []);
  const closeOverlay = useCallback(() => setOverlay(null), []);

  // ⌘K / Ctrl K — переключатель командного меню из любого места
  useCommandMenu(
    useCallback(() => {
      setActiveTab("command-menu");
      setOverlay((current) => (current === "command-menu" ? null : "command-menu"));
    }, []),
  );

  const createIssue = (draft: NewTaskDraft): void => {
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
    setOverlay(null);
    setToast(`Задача ${id} создана`);
  };

  const runCommand = (command: PaletteCommand): void => {
    setOverlay(null);
    if (command.id === "act-new-task") {
      setActiveTab("standard-modal");
      setOverlay("standard-modal");
      return;
    }
    setToast(command.run);
  };

  return (
    <OverlayProvider>
      <div className="flex h-[100svh] overflow-hidden bg-[#08090A] text-zinc-300">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader activeTab={activeTab} onTabChange={openPattern} />
          <main id="app-main" className="min-h-0 flex-1 overflow-y-auto bg-[#0B0C0E]">
            <IssueList
              issues={issues}
              onOpenIssue={(issue) => {
                setSelectedIssue(issue);
                setActiveTab("side-panel");
                setOverlay("side-panel");
              }}
              onNewTask={() => openPattern("standard-modal")}
              priority={priority}
              onPriorityChange={(next) => {
                setPriority(next);
                setToast(`Приоритет: ${PRIORITY_LABEL[next]}`);
              }}
              popoverOpen={overlay === "rich-popover"}
              onPopoverOpenChange={(open) => {
                setActiveTab("rich-popover");
                setOverlay(open ? "rich-popover" : null);
              }}
            />
          </main>
        </div>

        {overlay === "standard-modal" && (
          <StandardModal
            open
            onOpenChange={(open) => setOverlay(open ? "standard-modal" : null)}
            onCreate={createIssue}
          />
        )}
        <SidePanel open={overlay === "side-panel"} onClose={closeOverlay} issue={selectedIssue} />
        {overlay === "command-menu" && (
          <CommandMenu onClose={closeOverlay} onRun={runCommand} contextLabel="OPL · Orbit" />
        )}
        {toast && <Toast message={toast} />}
      </div>
    </OverlayProvider>
  );
}
