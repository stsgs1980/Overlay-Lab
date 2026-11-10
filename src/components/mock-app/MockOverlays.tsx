"use client";

import { CommandMenu } from "@/components/patterns/CommandMenu/CommandMenu";
import { SidePanel } from "@/components/patterns/SidePanel/SidePanel";
import { StandardModal } from "@/components/patterns/StandardModal/StandardModal";
import { Toast } from "@/components/ui/Toast";
import type { PaletteCommand } from "@/lib/commands";
import type { Issue, NewTaskDraft } from "@/types/issue";
import type { PatternId } from "@/types/patterns";
import type { JSX } from "react";

interface MockOverlaysProps {
  overlay: PatternId | null;
  selectedIssue: Issue;
  toast: string | null;
  onCloseOverlay: () => void;
  onStandardModalOpenChange: (open: boolean) => void;
  onCreate: (draft: NewTaskDraft) => void;
  onRunCommand: (command: PaletteCommand) => void;
}

/** Оверлеи демо-стенда: модалка, боковая панель, командное меню и тост */
export function MockOverlays({
  overlay,
  selectedIssue,
  toast,
  onCloseOverlay,
  onStandardModalOpenChange,
  onCreate,
  onRunCommand,
}: MockOverlaysProps): JSX.Element {
  return (
    <>
      {overlay === "standard-modal" && (
        <StandardModal open onOpenChange={onStandardModalOpenChange} onCreate={onCreate} />
      )}
      <SidePanel open={overlay === "side-panel"} onClose={onCloseOverlay} issue={selectedIssue} />
      {overlay === "command-menu" && (
        <CommandMenu onClose={onCloseOverlay} onRun={onRunCommand} contextLabel="OPL · Orbit" />
      )}
      {toast && <Toast message={toast} />}
    </>
  );
}
