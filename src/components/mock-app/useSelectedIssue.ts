"use client";

import { ISSUES } from "@/lib/mock-issues";
import type { Issue } from "@/types/issue";
import { useCallback, useState } from "react";

interface SelectedIssueState {
  selectedIssue: Issue;
  selectIssue: (issue: Issue) => void;
}

/** Выбранная задача демо-стенда: последняя открытая в боковой панели */
export function useSelectedIssue(): SelectedIssueState {
  const [selectedIssue, setSelectedIssue] = useState<Issue>(ISSUES[0]);

  const selectIssue = useCallback((issue: Issue) => {
    setSelectedIssue(issue);
  }, []);

  return { selectedIssue, selectIssue };
}
