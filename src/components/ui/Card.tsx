import { cn } from "@/lib/utils";
import type { CardProps } from "@/types/ui";
import { forwardRef } from "react";

/** Поверхность карточки: 1px рамка, мягкий градиент, опциональный подъём */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { interactive = false, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-[var(--border)]",
        "bg-[var(--panel)]",
        "shadow-[0_1px_2px_rgba(16,16,20,.06),0_24px_48px_-28px_rgba(16,16,20,.35)]",
        interactive &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[0_2px_4px_rgba(16,16,20,.07),0_32px_64px_-28px_rgba(16,16,20,.4)]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
