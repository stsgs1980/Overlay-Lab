import { Check } from "lucide-react";
import type { JSX } from "react";

/** Тост подтверждения: всплывает снизу, гаснет по таймеру родителя */
export function Toast({ message }: { message: string }): JSX.Element {
  return (
    <div
      role="status"
      className="pointer-events-none fixed bottom-5 left-1/2 z-[180] flex -translate-x-1/2 animate-toast-in items-center gap-2 rounded-full border border-emerald-400/25 bg-[#121B14]/95 px-4 py-2 text-[12px] font-medium text-emerald-300 shadow-[0_16px_48px_rgba(0,0,0,.55)] backdrop-blur"
    >
      <Check size={13} strokeWidth={2.4} aria-hidden="true" />
      <span className="max-w-[70vw] truncate">{message}</span>
    </div>
  );
}
