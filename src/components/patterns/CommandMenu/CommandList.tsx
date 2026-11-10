import type { PaletteCommand } from "@/lib/commands";
import { cn } from "@/lib/utils";
import type { JSX } from "react";

interface CommandGroup {
  group: string;
  items: PaletteCommand[];
}

interface CommandListProps {
  groups: CommandGroup[];
  filtered: PaletteCommand[];
  activeIndex: number;
  query: string;
  listId: string;
  onHover: (index: number) => void;
  onRun: (command: PaletteCommand) => void;
}

/** Список команд с группировкой и разделителями между секциями */
export function CommandList({
  groups,
  filtered,
  activeIndex,
  query,
  listId,
  onHover,
  onRun,
}: CommandListProps): JSX.Element {
  return (
    <div id={listId} role="listbox" aria-label="Команды" className="max-h-[21rem] overflow-y-auto p-2">
      {filtered.length === 0 && (
        <p className="px-3 py-8 text-center text-[12.5px] text-zinc-500">Ничего не нашлось по «{query}»</p>
      )}
      {groups.map(({ group, items }, groupIndex) => (
        <div key={group}>
          {groupIndex > 0 && <div role="separator" aria-hidden="true" className="my-1.5 h-px bg-white/[.06]" />}
          <div role="group" aria-label={group}>
            <p className="px-3 pt-2 pb-1 font-mono text-[9px] tracking-[.2em] text-zinc-600 uppercase">{group}</p>
            {items.map((command) => (
              <CommandOption
                key={command.id}
                command={command}
                index={filtered.indexOf(command)}
                active={filtered.indexOf(command) === activeIndex}
                onHover={onHover}
                onRun={onRun}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

interface CommandOptionProps {
  command: PaletteCommand;
  index: number;
  active: boolean;
  onHover: (index: number) => void;
  onRun: (command: PaletteCommand) => void;
}

/** Отдельная команда в списке: иконка, подпись и тип действия */
function CommandOption({ command, index, active, onHover, onRun }: CommandOptionProps): JSX.Element {
  const Icon = command.icon;

  return (
    <button
      id={`cmd-opt-${index}`}
      type="button"
      role="option"
      aria-selected={active}
      onMouseEnter={() => onHover(index)}
      onClick={() => onRun(command)}
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
      <span className="min-w-0 flex-1 truncate">{command.label}</span>
      <span className="shrink-0 font-mono text-[9px] tracking-[.14em] text-zinc-600 uppercase">
        {command.group === "Навигация" ? "go to" : "run"}
      </span>
    </button>
  );
}
