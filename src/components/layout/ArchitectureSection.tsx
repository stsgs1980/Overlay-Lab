import { LAYERS, PRINCIPLES } from "@/lib/constants";
import type { JSX } from "react";
import { StackMonitor } from "./StackMonitor";

/** Блок «Архитектура»: лесенка z-index, принципы a11y и живой монитор стека */
export function ArchitectureSection(): JSX.Element {
  return (
    <section
      id="architecture"
      aria-labelledby="arch-heading"
      className="scroll-mt-20 border-t border-[var(--border)] bg-[var(--panel-soft)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[.22em] text-lime-600 dark:text-lime-400/80">
          Архитектура
        </p>
        <h2
          id="arch-heading"
          className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl"
        >
          Один порядок слоёв — вместо десяти «z-index: 9999»
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[var(--text-dim)]">
          Все оверлеи страницы зарегистрированы в <code className="font-mono text-[13px]">ModalStackContext</code> и
          занимают предсказуемые полосы z-index. Отрисовка — за Base UI и React Aria; стек нужен для монитора и
          координации Escape между слоями.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-5">
          {/* Лесенка слоёв */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 lg:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-[var(--text-faint)]">z-index map</p>
            <div className="mt-4 space-y-1.5" role="list" aria-label="Слои от нижнего к верхнему">
              {LAYERS.map((layer, index) => (
                <div key={layer.label} role="listitem" className="flex items-center gap-3">
                  <span className="w-6 text-right font-mono text-[10px] tabular-nums text-[var(--text-faint)]">
                    {index + 1}
                  </span>
                  <div
                    className={`flex h-9 items-center justify-between gap-3 rounded-lg px-3 ${layer.tone}`}
                    style={{ width: `${34 + index * 16}%`, minWidth: "11rem" }}
                  >
                    <span className="truncate text-[11px] font-semibold text-zinc-950/85">{layer.label}</span>
                    <span className="font-mono text-[10px] tabular-nums text-zinc-950/70">{layer.z}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5">
              <StackMonitor />
            </div>
          </div>

          {/* Принципы */}
          <ol className="flex flex-col gap-3 lg:col-span-2">
            {PRINCIPLES.map((principle, index) => (
              <li
                key={principle.title}
                className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[22px] font-semibold leading-none text-[var(--text-faint)]"
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
        </div>
      </div>
    </section>
  );
}
