"use client";

import type { PaletteCommand } from "@/lib/commands";
import { Z } from "@/lib/utils";
import type { JSX } from "react";
import { useId, useRef } from "react";
import { FocusScope, useDialog, VisuallyHidden } from "react-aria";
import { CommandFooter } from "./CommandFooter";
import { CommandList } from "./CommandList";
import { CommandSearch } from "./CommandSearch";
import { useCommandFilter } from "./useCommandFilter";

interface CommandMenuProps {
  onClose: () => void;
  /** Вызывается с выбранной командой; палитра закрывается снаружи */
  onRun: (command: PaletteCommand) => void;
  /** Контекст-подпись в футере, например «OPL · workspace» */
  contextLabel?: string;
}

const LIST_ID = "command-menu-list";

/**
 * Command Menu (паттерн ⌘K): стеклянный попап по центру, не блокирует
 * приложение навсегда — Escape / клик по затемнению / выбор команды.
 * FocusScope держит фокус внутри, стрелки + Enter запускают команды.
 */
export function CommandMenu({ onClose, onRun, contextLabel = "OPL · workspace" }: CommandMenuProps): JSX.Element {
  const dialogRef = useRef<HTMLDivElement>(null);
  const descId = useId();
  const titleId = useId();
  // Явные aria-labelledby/describedby (свой useId) — детерминированно независимо от момента монтирования
  const { dialogProps } = useDialog(
    { role: "dialog", "aria-labelledby": titleId, "aria-describedby": descId },
    dialogRef,
  );

  const { query, setQuery, activeIndex, setActiveIndex, filtered, visibleGroups, onKeyDown } = useCommandFilter(
    onRun,
    onClose,
  );

  return (
    <>
      <button
        type="button"
        aria-label="Закрыть командное меню"
        onClick={onClose}
        style={{ zIndex: Z.paletteBackdrop }}
        className="motion-safe:animate-backdrop-in fixed inset-0 cursor-default bg-black/55 backdrop-blur-[5px]"
      />
      <FocusScope contain restoreFocus autoFocus>
        <div
          ref={dialogRef}
          {...dialogProps}
          style={{ zIndex: Z.palette }}
          className="animate-palette-in fixed top-[13vh] left-1/2 w-[min(38rem,92vw)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/[.09] bg-[#16181F]/85 shadow-[0_40px_110px_-20px_rgba(0,0,0,.85),inset_0_1px_0_rgba(255,255,255,.06)] outline-hidden backdrop-blur-2xl"
        >
          {/* Скрытый заголовок связывается с aria-labelledby */}
          <VisuallyHidden>
            <h2 id={titleId}>Командное меню</h2>
          </VisuallyHidden>

          <CommandSearch
            query={query}
            activeIndex={activeIndex}
            listId={LIST_ID}
            onQueryChange={setQuery}
            onKeyDown={onKeyDown}
          />

          <CommandList
            groups={visibleGroups}
            filtered={filtered}
            activeIndex={activeIndex}
            query={query}
            listId={LIST_ID}
            onHover={setActiveIndex}
            onRun={onRun}
          />

          <CommandFooter descId={descId} contextLabel={contextLabel} />
        </div>
      </FocusScope>
    </>
  );
}
