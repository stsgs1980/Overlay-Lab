import { PRINCIPLES } from "@/lib/constants";
import type { JSX } from "react";

/** Список принципов: чем держится единый порядок слоёв вместо ручных z-index */
export function PrinciplesList(): JSX.Element {
  return (
    <ol className="flex flex-col gap-3 lg:col-span-2">
      {PRINCIPLES.map((principle, index) => (
        <li
          key={principle.title}
          className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5"
        >
          <span
            aria-hidden="true"
            className="font-mono text-[22px] leading-none font-semibold text-[var(--text-faint)]"
          >
            0{index + 1}
          </span>
          <span>
            <h3 className="text-[14px] font-semibold text-[var(--text)]">{principle.title}</h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[var(--text-dim)]">{principle.text}</p>
          </span>
        </li>
      ))}
      <li className="rounded-2xl border border-dashed border-[var(--border-strong)] p-5 text-[12px] leading-relaxed text-[var(--text-faint)]">
        Демо и сниппеты — одной ширины: всё, что видите в карточках, повторяет исходники в{" "}
        <code className="font-mono text-[11px]">src/components/patterns</code> без усечений логики.
      </li>
    </ol>
  );
}
