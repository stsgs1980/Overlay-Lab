import { COMMANDS } from "@/lib/commands";
import { describe, expect, it } from "vitest";

const GROUPS = new Set(["Навигация", "Действия"]);

describe("COMMANDS registry", () => {
  it("has unique ids", () => {
    const ids = COMMANDS.map((command) => command.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses only known groups", () => {
    for (const command of COMMANDS) {
      expect(GROUPS.has(command.group)).toBe(true);
    }
  });

  it("covers both groups, so the palette never renders an empty section", () => {
    const groups = new Set(COMMANDS.map((command) => command.group));
    expect(groups).toEqual(GROUPS);
  });

  it("gives every command a non-empty label, run hint and icon", () => {
    for (const command of COMMANDS) {
      expect(command.label.trim().length).toBeGreaterThan(0);
      expect(command.run.trim().length).toBeGreaterThan(0);
      expect(command.icon).toBeTruthy();
    }
  });

  it("pairs the create-task action with the modal trigger id", () => {
    // MockApp maps this command id onto the Standard Modal flow; renaming it silently
    // breaks the keyboard path, so the test pins the contract.
    expect(COMMANDS.some((command) => command.id === "act-new-task")).toBe(true);
  });
});
