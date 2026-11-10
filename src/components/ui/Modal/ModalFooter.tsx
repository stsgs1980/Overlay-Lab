import { cn } from "@/lib/utils";
import type { ModalFooterProps } from "@/types/ui";
import type { JSX } from "react";

/** Футер модалки: align='between' — подсказка слева, действия справа */
export function ModalFooter({ align = "end", className, children, ...rest }: ModalFooterProps): JSX.Element {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-t border-white/[.06] px-5 py-3.5",
        align === "between" ? "justify-between" : "justify-end",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
