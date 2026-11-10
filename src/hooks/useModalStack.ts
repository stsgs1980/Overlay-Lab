"use client";

import { ModalStackContext } from "@/context/ModalStackContext";
import type { ModalStackContextValue, StackKind } from "@/types/patterns";
import { useContext, useEffect } from "react";

/** Доступ к реестру слоёв. Падает с понятной ошибкой вне провайдера. */
export function useModalStack(): ModalStackContextValue {
  const ctx = useContext(ModalStackContext);
  if (!ctx) {
    throw new Error("useModalStack должен использоваться внутри <ModalStackProvider>");
  }
  return ctx;
}

/**
 * Автоматически регистрирует слой, пока `active === true`.
 * Размонтирование / active=false → слой снимается со стека.
 */
export function useModalStackEntry(id: string, title: string, active: boolean, kind: StackKind = "dialog"): void {
  const { push, remove } = useModalStack();

  useEffect(() => {
    if (!active) return undefined;
    push({ id, title, kind });
    return () => remove(id);
  }, [active, id, title, kind, push, remove]);
}
