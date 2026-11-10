"use client";

import { useCommandMenu } from "@/hooks/useCommandMenu";
import { useModalStackEntry } from "@/hooks/useModalStack";
import type { JSX } from "react";
import { OverlayProvider } from "react-aria";
import { AppHeader } from "./AppHeader";
import { IssueList } from "./IssueList";
import { MockOverlays } from "./MockOverlays";
import { Sidebar } from "./Sidebar";
import { useMockAppState } from "./useMockAppState";

/**
 * Mock SaaS-приложения «Orbit»: сайдбар + очередь задач + шапка с Base UI Tabs.
 * Вкладки — драйвер демонстрации: переключение открывает соответствующий оверлей.
 */
export default function MockApp(): JSX.Element {
  const {
    issues,
    activeTab,
    overlay,
    selectedIssue,
    priority,
    toast,
    openPattern,
    closeOverlay,
    openIssue,
    createIssue,
    runCommand,
    changePriority,
    setPopoverOpen,
    toggleCommandMenu,
    setStandardModalOpen,
  } = useMockAppState();

  // Демонстрируемый слой кладём в общий реестр — монитор видит и оверлеи макета
  useModalStackEntry("standard-modal", "Новая задача", overlay === "standard-modal", "dialog");
  useModalStackEntry("side-panel", `Задача ${selectedIssue.id}`, overlay === "side-panel", "panel");
  useModalStackEntry("command-menu", "Командное меню", overlay === "command-menu", "palette");
  useModalStackEntry("rich-popover", "Выбор приоритета", overlay === "rich-popover", "popover");

  // ⌘K / Ctrl K — переключатель командного меню из любого места
  useCommandMenu(toggleCommandMenu);

  return (
    <OverlayProvider>
      <div className="flex h-[100svh] overflow-hidden bg-[#08090A] text-zinc-300">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader activeTab={activeTab} onTabChange={openPattern} />
          <main id="app-main" className="min-h-0 flex-1 overflow-y-auto bg-[#0B0C0E]">
            <IssueList
              issues={issues}
              onOpenIssue={openIssue}
              onNewTask={() => openPattern("standard-modal")}
              priority={priority}
              onPriorityChange={changePriority}
              popoverOpen={overlay === "rich-popover"}
              onPopoverOpenChange={setPopoverOpen}
            />
          </main>
        </div>

        <MockOverlays
          overlay={overlay}
          selectedIssue={selectedIssue}
          toast={toast}
          onCloseOverlay={closeOverlay}
          onStandardModalOpenChange={setStandardModalOpen}
          onCreate={createIssue}
          onRunCommand={runCommand}
        />
      </div>
    </OverlayProvider>
  );
}
