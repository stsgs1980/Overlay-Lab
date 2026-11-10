import { Z, bringToEnd, clamp, cn, shortcutLabel } from "@/lib/utils";
import { describe, expect, it } from "vitest";

describe("cn", () => {
  it("merges conflicting Tailwind classes, last wins", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-zinc-500", "text-zinc-100")).toBe("text-zinc-100");
  });

  it("keeps non-conflicting classes from both sides", () => {
    expect(cn("px-2", "py-3")).toBe("px-2 py-3");
  });

  it("drops falsy values", () => {
    expect(cn("px-2", false, null, undefined, "py-3")).toBe("px-2 py-3");
  });
});

describe("clamp", () => {
  it("returns the value inside the range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("pins below the minimum and above the maximum", () => {
    expect(clamp(-3, 0, 10)).toBe(0);
    expect(clamp(42, 0, 10)).toBe(10);
  });
});

describe("bringToEnd", () => {
  const list = [
    { id: "a", label: "A" },
    { id: "b", label: "B" },
    { id: "c", label: "C" },
  ];

  it("moves the target to the end, preserving order of the rest", () => {
    expect(bringToEnd(list, "a").map((item) => item.id)).toEqual(["b", "c", "a"]);
  });

  it("does not mutate the input array", () => {
    bringToEnd(list, "a");
    expect(list.map((item) => item.id)).toEqual(["a", "b", "c"]);
  });

  it("returns the same list for an unknown id", () => {
    expect(bringToEnd(list, "nope")).toBe(list);
  });
});

describe("shortcutLabel", () => {
  it("falls back to the Ctrl label outside macOS", () => {
    // Node test environment has no `navigator`, so the macOS branch is unreachable here.
    expect(shortcutLabel("K")).toBe("Ctrl K");
  });
});

describe("Z ladder", () => {
  it("keeps the sanctioned stacking order", () => {
    const order = [Z.header, Z.popover, Z.panel, Z.dialog, Z.paletteBackdrop, Z.palette, Z.toast];
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  it("keeps overlays below the command palette and toast", () => {
    expect(Z.popover).toBeLessThan(Z.dialog);
    expect(Z.dialog).toBeLessThan(Z.palette);
    expect(Z.palette).toBeLessThan(Z.toast);
  });
});
