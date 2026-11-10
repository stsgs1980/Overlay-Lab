import type { JSX } from "react";
/**
 * Декоративная иллюстрация «слоёв»: backdrop, попап и плавающие чипы.
 * Чисто CSS/SVG — без единого изображения, всё анимируется на GPU.
 */
export function HeroArt(): JSX.Element {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md select-none lg:max-w-none">
      {/* Сценическая панель */}
      <div className="dot-grid relative h-[340px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[#10121A] sm:h-[400px]">
        {/* Затемнение-backdrop */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Тень родительского «окна» под попапом */}
        <div className="absolute top-[30%] left-[8%] h-56 w-64 rounded-xl border border-white/[.07] bg-[#1B1E29] shadow-2xl sm:h-64 sm:w-72" />

        {/* Главный «модальный» попап */}
        <div className="absolute top-[38%] left-[16%] w-60 rounded-xl border border-white/[.12] bg-[#1F2230] shadow-2xl shadow-black/60 sm:w-72">
          <div className="flex items-center gap-2 border-b border-white/[.07] px-3.5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-lime-400/90" />
            <span className="h-1.5 w-20 rounded-full bg-white/[.14]" />
            <span className="ml-auto h-2.5 w-2.5 rounded-xs bg-white/[.1]" />
          </div>
          <div className="space-y-2 px-3.5 py-3.5">
            <div className="h-2 w-3/4 rounded-full bg-white/[.13]" />
            <div className="h-2 w-1/2 rounded-full bg-white/[.08]" />
            <div className="mt-3 h-8 rounded-lg border border-lime-400/20 bg-lime-400/[.07]" />
            <div className="flex justify-end gap-1.5 pt-1">
              <div className="h-6 w-12 rounded-md bg-white/[.07]" />
              <div className="h-6 w-14 rounded-md bg-lime-400/80" />
            </div>
          </div>
        </div>

        {/* Призрачный чип ⌘K поверх всего */}
        <div className="float-slow absolute top-[14%] right-[7%] flex items-center gap-2 rounded-xl border border-white/[.12] bg-[#181B26]/95 px-3 py-2 shadow-xl shadow-black/50 backdrop-blur">
          <kbd className="rounded-md border border-white/[.14] bg-white/[.06] px-1.5 py-0.5 font-mono text-[10px] text-lime-300">
            ⌘K
          </kbd>
          <span className="h-1.5 w-16 rounded-full bg-white/[.14]" />
        </div>

        {/* Чип focus-trap */}
        <div className="float-slower absolute bottom-[10%] left-[8%] flex items-center gap-2 rounded-xl border border-white/[.12] bg-[#181B26]/95 px-3 py-2 shadow-xl shadow-black/50 backdrop-blur">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.5" stroke="#C8F169" strokeWidth="1.5" strokeDasharray="3 2.4" />
            <circle cx="7" cy="7" r="1.4" fill="#C8F169" />
          </svg>
          <span className="font-mono text-[10px] tracking-[.12em] text-zinc-400 uppercase">focus trap</span>
        </div>
      </div>

      {/* Подпись слоя под иллюстрацией */}
      <div className="mt-3 flex items-center justify-between px-1 font-mono text-[10px] tracking-[.16em] text-[var(--text-faint)] uppercase">
        <span>backdrop → dialog · panel → palette</span>
        <span>z: 130–180</span>
      </div>
    </div>
  );
}
