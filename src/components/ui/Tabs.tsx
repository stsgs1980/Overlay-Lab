"use client";

import { cn } from "@/lib/utils";
import { Tabs } from "@base-ui/react/tabs";
import type { JSX, ReactNode } from "react";

/**
 * Тонкий слой стилизации над Base UI Tabs:
 * List — контейнер-пилюля, Trigger — кнопка вкладки,
 * Indicator — «скользящий» фон активной вкладки.
 */
export function TabsList({
  className,
  children,
  ...rest
}: {
  className?: string;
  children: ReactNode;
  "aria-label": string;
}): JSX.Element {
  return (
    <Tabs.List
      className={cn(
        "relative flex w-max items-center gap-0.5 rounded-xl border border-[#26282C] bg-white/[.03] p-1",
        className,
      )}
      {...rest}
    >
      <Tabs.Indicator className="absolute rounded-lg border border-white/[.07] bg-[#1D1E24] shadow-sm transition-[left,width] duration-200 ease-out [height:var(--active-tab-height)] [left:var(--active-tab-left)] [top:var(--active-tab-top)] [width:var(--active-tab-width)]" />
      {children}
    </Tabs.List>
  );
}

/** Вкладка Base UI Tabs; onActivate fires и по клику на уже активную вкладку */
export function TabsTrigger({
  value,
  icon,
  children,
  className,
  onActivate,
}: {
  value: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  onActivate?: () => void;
}): JSX.Element {
  return (
    <Tabs.Tab
      value={value}
      onClick={onActivate}
      className={cn(
        "relative z-10 flex h-8 items-center gap-1.5 rounded-lg px-3 text-[12px] font-medium text-zinc-500 outline-none transition-colors duration-150",
        "hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-indigo-400/70",
        "data-[selected]:text-zinc-100",
        className,
      )}
    >
      {icon}
      <span className="hidden md:inline">{children}</span>
    </Tabs.Tab>
  );
}

export { Tabs };
