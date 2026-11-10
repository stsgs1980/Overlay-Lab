import { cn } from "@/lib/utils";
import type { ButtonProps, ButtonSize, ButtonVariant } from "@/types/ui";
import type { JSX } from "react";
import { forwardRef } from "react";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-lime-400 text-zinc-950 hover:bg-lime-300 shadow-[0_0_24px_-6px_rgba(200,241,105,.45)] border-transparent",
  secondary: "bg-[var(--btn-2)] text-[var(--text)] hover:bg-[var(--btn-2-hover)] border-[var(--border)]",
  outline: "bg-transparent text-[var(--text)] hover:bg-[var(--btn-ghost)] border-[var(--border-strong)]",
  ghost:
    "bg-transparent text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--btn-ghost)] border-transparent",
  danger: "bg-red-500/15 text-red-600 dark:text-red-300 hover:bg-red-500/25 border-red-500/30",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-[15px] gap-2 rounded-xl",
};

const Spinner = (): JSX.Element => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
  </svg>
);

/** Думб-кнопка витрины: варианты, размеры, состояние загрузки */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "secondary", size = "md", isLoading = false, icon, className, children, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center border font-medium whitespace-nowrap select-none",
        "transition-all duration-150 active:scale-[.98]",
        "focus-visible:ring-2 focus-visible:ring-lime-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] focus-visible:outline-hidden",
        "disabled:pointer-events-none disabled:opacity-45",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {isLoading ? <Spinner /> : icon}
      {children}
    </button>
  );
});
