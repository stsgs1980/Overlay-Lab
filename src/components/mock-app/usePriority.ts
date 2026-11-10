"use client";

import type { IssuePriority } from "@/types/issue";
import { useCallback, useState } from "react";

interface PriorityState {
  priority: IssuePriority;
  setPriority: (priority: IssuePriority) => void;
}

/** Выбранный приоритет задач демо-стенда */
export function usePriority(): PriorityState {
  const [priority, setPriority] = useState<IssuePriority>("high");
  const change = useCallback((next: IssuePriority) => {
    setPriority(next);
  }, []);

  return { priority, setPriority: change };
}
