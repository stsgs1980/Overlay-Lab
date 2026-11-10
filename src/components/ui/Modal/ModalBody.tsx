import { cn } from "@/lib/utils";
import type { HTMLAttributes, JSX } from "react";

/** Тело модалки: единая сетка отступов для всех паттернов */
export function ModalBody({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div className={cn("flex flex-col gap-4 px-5 py-4", className)} {...rest}>
      {children}
    </div>
  );
}
