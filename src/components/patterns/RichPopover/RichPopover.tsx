"use client";

import { Z } from "@/lib/utils";
import type { IssuePriority } from "@/types/issue";
import type { JSX } from "react";
import { useId, useRef } from "react";
import { FocusScope, usePopover } from "react-aria";
import { createPortal } from "react-dom";
import { useOverlayTriggerState } from "react-stately";
import { PriorityOptions } from "./PriorityOptions";
import { PriorityTrigger } from "./PriorityTrigger";

interface RichPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: IssuePriority;
  onChange: (value: IssuePriority) => void;
}

/**
 * Rich Popover (немодальный): выбор приоритета, привязанный к триггеру.
 * Позиционирование — usePopover/useOverlayPosition (flip, offset, ARIA-стек),
 * закрытие — Escape и клик вне; фон визуально остаётся доступным.
 */
export function RichPopover({ open, onOpenChange, value, onChange }: RichPopoverProps): JSX.Element {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const descId = useId();
  const state = useOverlayTriggerState({ isOpen: open, onOpenChange });
  const { popoverProps } = usePopover(
    { triggerRef, popoverRef, placement: "bottom start", offset: 8, containerPadding: 12 },
    state,
  );

  const select = (level: IssuePriority): void => {
    onChange(level);
    state.close();
  };

  return (
    <>
      <PriorityTrigger
        value={value}
        open={open}
        onToggle={() => (open ? state.close() : state.open())}
        triggerRef={triggerRef}
      />

      {open &&
        createPortal(
          <FocusScope contain restoreFocus autoFocus>
            <div
              ref={popoverRef}
              {...popoverProps}
              role="listbox"
              aria-labelledby={labelId}
              aria-describedby={descId}
              style={{ ...popoverProps.style, zIndex: Z.popover }}
              className="animate-palette-in w-56 overflow-hidden rounded-xl border border-[#2C2E33] bg-[#1A1B1F]/95 p-1 shadow-[0_24px_70px_-12px_rgba(0,0,0,.8),inset_0_1px_0_rgba(255,255,255,.05)] outline-hidden backdrop-blur-xl"
            >
              <p id={labelId} className="px-2.5 pt-2 pb-1 font-mono text-[9px] tracking-[.2em] text-zinc-600 uppercase">
                Приоритет
              </p>
              <PriorityOptions value={value} onSelect={select} />
              <p id={descId} className="border-t border-white/[.06] px-2.5 py-2 text-[10px] leading-snug text-zinc-600">
                Действует на выбранные задачи в очереди
              </p>
            </div>
          </FocusScope>,
          document.body,
        )}
    </>
  );
}
