"use client";

import { cn, Z } from "@/lib/utils";
import type { IssuePriority } from "@/types/issue";
import { PRIORITY_FLAG_CLASS, PRIORITY_LABEL, PRIORITY_ORDER } from "@/types/issue";
import { Check, ChevronDown, Flag } from "lucide-react";
import type { JSX } from "react";
import { useId, useRef } from "react";
import { FocusScope, usePopover } from "react-aria";
import { createPortal } from "react-dom";
import { useOverlayTriggerState } from "react-stately";

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
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? state.close() : state.open())}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-8 items-center gap-2 rounded-lg border border-[#26282C] bg-white/[.04] px-3 text-[12px] font-medium text-zinc-300 transition-colors hover:border-white/[.14] hover:text-zinc-100 focus-visible:ring-2 focus-visible:ring-indigo-400/70 focus-visible:outline-hidden"
      >
        <Flag size={13} className={PRIORITY_FLAG_CLASS[value]} aria-hidden="true" />
        {PRIORITY_LABEL[value]}
        <ChevronDown
          size={13}
          className={cn("text-zinc-500 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

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
              {PRIORITY_ORDER.map((level) => {
                const selected = level === value;
                return (
                  <button
                    key={level}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => select(level)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] text-zinc-300 transition-colors hover:bg-white/[.05] focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:outline-hidden"
                  >
                    <Flag size={13} className={PRIORITY_FLAG_CLASS[level]} aria-hidden="true" />
                    <span className="flex-1 text-left">{PRIORITY_LABEL[level]}</span>
                    {selected && <Check size={14} className="text-indigo-300" aria-hidden="true" />}
                  </button>
                );
              })}
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
