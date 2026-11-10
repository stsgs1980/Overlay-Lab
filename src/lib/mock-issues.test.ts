import { ISSUES } from "@/lib/mock-issues";
import { PRIORITY_FLAG_CLASS, PRIORITY_LABEL, PRIORITY_ORDER, STATUS_LABEL } from "@/types/issue";
import { describe, expect, it } from "vitest";

describe("ISSUES seed data", () => {
  it("has unique ids", () => {
    const ids = ISSUES.map((issue) => issue.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses only declared priorities and statuses", () => {
    for (const issue of ISSUES) {
      expect(PRIORITY_ORDER).toContain(issue.priority);
      expect(STATUS_LABEL[issue.status]).toBeTruthy();
    }
  });

  it("gives every issue a comment timeline array", () => {
    for (const issue of ISSUES) {
      expect(Array.isArray(issue.comments)).toBe(true);
    }
  });
});

describe("issue domain vocabulary", () => {
  it("labels every priority exactly once", () => {
    expect(Object.keys(PRIORITY_LABEL).sort()).toEqual([...PRIORITY_ORDER].sort());
    expect(Object.keys(PRIORITY_FLAG_CLASS).sort()).toEqual([...PRIORITY_ORDER].sort());
  });

  it("orders priorities from calm to loud", () => {
    expect(PRIORITY_ORDER).toEqual(["low", "medium", "high", "urgent"]);
  });
});
