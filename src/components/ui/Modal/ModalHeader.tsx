import type { ModalHeaderProps } from "@/types/ui";
import { Dialog } from "@base-ui/react/dialog";
import type { JSX } from "react";

/**
 * Шапка модалки (семейство Base UI): слот-иконка, заголовок через
 * Dialog.Title (связывается с aria-labelledby) и кнопка Dialog.Close —
 * единый escape-путь для мыши, тача и клавиатуры.
 */
export function ModalHeader({ icon, title, description }: ModalHeaderProps): JSX.Element {
  return (
    <div className="flex items-start gap-3 border-b border-white/[.06] px-5 py-4">
      {icon && (
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[.08] bg-white/[.04] text-lime-300">
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <Dialog.Title className="text-[15px] font-semibold leading-snug text-zinc-100">{title}</Dialog.Title>
        {description && (
          <Dialog.Description className="mt-1 text-[12.5px] leading-snug text-zinc-500">
            {description}
          </Dialog.Description>
        )}
      </div>
      <Dialog.Close
        aria-label="Закрыть"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/[.06] hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </Dialog.Close>
    </div>
  );
}
