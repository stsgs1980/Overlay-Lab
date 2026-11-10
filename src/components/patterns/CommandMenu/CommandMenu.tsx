"use client";

import { COMMANDS, type CommandGroup, type PaletteCommand } from "@/lib/commands";
import { cn, shortcutLabel, Z } from "@/lib/utils";
import { Search } from "lucide-react";
import type { JSX } from "react";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { FocusScope, useDialog, VisuallyHidden } from "react-aria";

interface CommandMenuProps {
  onClose: () => void;
  /** Вызывается с выбранной командой; палитра закрывается снаружи */
  onRun: (command: PaletteCommand) => void;
  /** Контекст-подпись в футере, например «OPL · workspace» */
  contextLabel?: string;
}

const GROUPS: CommandGroup[] = ["Навигация", "Действия"];

/**
 * Command Menu (паттерн ⌘K): стеклянный попап по центру, не блокирует
 * приложение навсегда — Escape / клик по затемнению / выбор команды.
 * FocusScope держит фокус внутри, стрелки + Enter запускают команды.
 */
export function CommandMenu({ onClose, onRun, contextLabel = "OPL · workspace" }: CommandMenuProps): JSX.Element {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const descId = useId();
  const titleId = useId();
  // Явные aria-labelledby/describedby (свой useId) — детерминированно независимо от момента монтирования
  const { dialogProps } = useDialog(
    { role: "dialog", "aria-labelledby": titleId, "aria-describedby": descId },
    dialogRef,
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((cmd) => [cmd.label, cmd.group].join(" ").toLowerCase().includes(q));
  }, [query]);

  useEffect(() => setActiveIndex(0), [filtered.length]);
  useEffect(() => {
    document.getElementById(`cmd-opt-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const visibleGroups = useMemo(
    () =>
      GROUPS.map((g) => ({ group: g, items: filtered.filter((cmd) => cmd.group === g) })).filter(
        (g) => g.items.length > 0,
      ),
    [filtered],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((i) => (filtered.length ? (i + delta + filtered.length) % filtered.length : 0));
    } else if (event.key === "Enter" && filtered[activeIndex]) {
      event.preventDefault();
      onRun(filtered[activeIndex]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

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
          {/* Строка поиска */}
          <div className="flex items-center gap-3 border-b border-white/[.07] px-4">
            <Search size={16} className="shrink-0 text-zinc-500" aria-hidden="true" />
            <input
              role="combobox"
              autoFocus
              aria-label="Поиск по командам"
              aria-expanded="true"
              aria-controls="command-menu-list"
              aria-activedescendant={activeIndex >= 0 ? `cmd-opt-${activeIndex}` : undefined}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Поиск действий, разделов и страниц…"
              autoComplete="off"
              spellCheck={false}
              className="h-14 w-full bg-transparent text-[15px] text-zinc-100 outline-hidden placeholder:text-zinc-600"
            />
            <kbd className="shrink-0 rounded-md border border-white/[.1] bg-white/[.05] px-1.5 py-0.5 font-mono text-[9.5px] text-zinc-500 uppercase">
              esc
            </kbd>
          </div>

          {/* Список с группировкой (разделители role=separator между секциями) */}
          <div id="command-menu-list" role="listbox" aria-label="Команды" className="max-h-[21rem] overflow-y-auto p-2">
            {filtered.length === 0 && (
              <p className="px-3 py-8 text-center text-[12.5px] text-zinc-500">Ничего не нашлось по «{query}»</p>
            )}
            {visibleGroups.map(({ group, items }, gi) => (
              <div key={group}>
                {gi > 0 && <div role="separator" aria-hidden="true" className="my-1.5 h-px bg-white/[.06]" />}
                <div role="group" aria-label={group}>
                  <p className="px-3 pt-2 pb-1 font-mono text-[9px] tracking-[.2em] text-zinc-600 uppercase">{group}</p>
                  {items.map((cmd) => {
                    const Icon = cmd.icon;
                    const index = filtered.indexOf(cmd);
                    const active = index === activeIndex;
                    return (
                      <button
                        key={cmd.id}
                        id={`cmd-opt-${index}`}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => onRun(cmd)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[13px] transition-colors focus-visible:outline-hidden",
                          active ? "bg-white/[.07] text-zinc-100" : "text-zinc-400",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors",
                            active
                              ? "border-indigo-400/30 bg-indigo-400/15 text-indigo-300"
                              : "border-white/[.08] bg-white/[.03] text-zinc-500",
                          )}
                        >
                          <Icon size={14} strokeWidth={1.8} />
                        </span>
                        <span className="min-w-0 flex-1 truncate">{cmd.label}</span>
                        <span className="shrink-0 font-mono text-[9px] tracking-[.14em] text-zinc-600 uppercase">
                          {cmd.group === "Навигация" ? "go to" : "run"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Футер-подсказки (id связывается с aria-describedby) */}
          <div
            id={descId}
            className="flex items-center gap-4 border-t border-white/[.07] px-4 py-2.5 font-mono text-[9.5px] text-zinc-600"
          >
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-white/[.12] px-1">↑↓</kbd>выбор
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded border border-white/[.12] px-1">↵</kbd>запуск
            </span>
            <span className="ml-auto hidden font-mono text-[9.5px] tracking-[.14em] text-zinc-700 uppercase sm:block">
              {contextLabel} · {shortcutLabel("K")}
            </span>
          </div>
        </div>
      </FocusScope>
    </>
  );
}
