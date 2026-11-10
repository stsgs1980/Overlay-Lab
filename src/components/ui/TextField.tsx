import { cn } from "@/lib/utils";
import type { TextFieldProps } from "@/types/ui";
import type { JSX } from "react";

/** Думб-поле ввода с подписью — единая стилистика всех форм витрины */
export function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
  autoFocus = false,
  autoComplete = "off",
}: TextFieldProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] font-medium text-zinc-400">
        {label}
      </label>
      <input
        id={id}
        value={value}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-10 rounded-xl border border-white/[.09] bg-black/30 px-3 text-sm text-zinc-100",
          "outline-hidden transition-shadow placeholder:text-zinc-600",
          "focus:border-lime-400/40 focus:ring-2 focus:ring-lime-400/25",
        )}
      />
      {hint && <p className="text-[11px] leading-snug text-zinc-600">{hint}</p>}
    </div>
  );
}
