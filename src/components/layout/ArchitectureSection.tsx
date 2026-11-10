import type { JSX } from "react";
import { PrinciplesList } from "./PrinciplesList";
import { ZIndexLadder } from "./ZIndexLadder";

/** Блок «Архитектура»: лесенка z-index, принципы a11y и живой монитор стека */
export function ArchitectureSection(): JSX.Element {
  return (
    <section
      id="architecture"
      aria-labelledby="arch-heading"
      className="scroll-mt-20 border-t border-[var(--border)] bg-[var(--panel-soft)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="font-mono text-[10px] tracking-[.22em] text-lime-600 dark:text-lime-400/80">Архитектура</p>
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
          <ZIndexLadder />
          <PrinciplesList />
        </div>
      </div>
    </section>
  );
}
