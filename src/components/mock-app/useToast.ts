"use client";

import { useCallback, useEffect, useState } from "react";

interface ToastState {
  toast: string | null;
  showToast: (message: string) => void;
}

/** Всплывающее уведомление демо-стенда: сообщение скрывается само через 2.4 секунды */
export function useToast(): ToastState {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  return { toast, showToast };
}
