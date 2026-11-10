import { SendHorizontal } from "lucide-react";
import type { FormEvent, JSX, KeyboardEvent } from "react";

interface PanelComposerProps {
  draft: string;
  onDraftChange: (draft: string) => void;
  onSubmit: () => void;
}

/** Поле ввода комментария: Enter отправляет, кнопка дублирует действие */
export function PanelComposer({ draft, onDraftChange, onSubmit }: PanelComposerProps): JSX.Element {
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <form
      className="flex items-center gap-2 border-t border-white/[.05] p-3"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        value={draft}
        autoFocus
        onChange={(e) => onDraftChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Оставить комментарий…  (Enter)"
        aria-label="Оставить комментарий"
        className="h-9 min-w-0 flex-1 rounded-lg border border-[#26282C] bg-white/[.03] px-3 text-[12.5px] text-zinc-100 outline-hidden transition-shadow placeholder:text-zinc-600 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/20"
      />
      <button
        type="submit"
        disabled={draft.trim() === ""}
        aria-label="Отправить комментарий"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#5E6AD2] text-white transition-all hover:bg-[#6E79D6] focus-visible:ring-2 focus-visible:ring-indigo-400/70 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-40"
      >
        <SendHorizontal size={15} />
      </button>
    </form>
  );
}
