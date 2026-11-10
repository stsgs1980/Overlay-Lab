/** Единая точка экспорта сниппетов — карточки тянут их по id паттерна */
import type { PatternId } from "@/types/patterns";
import { commandMenuSnippet } from "./commandMenu";
import { richPopoverSnippet } from "./richPopover";
import { sidePanelSnippet } from "./sidePanel";
import { standardModalSnippet } from "./standardModal";

export const PATTERN_SNIPPETS: Record<PatternId, string> = {
  "standard-modal": standardModalSnippet,
  "side-panel": sidePanelSnippet,
  "command-menu": commandMenuSnippet,
  "rich-popover": richPopoverSnippet,
};
