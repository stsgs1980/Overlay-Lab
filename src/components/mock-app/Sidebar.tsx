import { cn } from "@/lib/utils";
import { ChevronsUpDown, Hexagon, Inbox, ListTodo, Settings, Sparkles, type LucideIcon } from "lucide-react";
import type { JSX } from "react";

interface NavItem {
  icon: LucideIcon;
  label: string;
  badge: number | null;
  active?: boolean;
}

const NAV: ReadonlyArray<NavItem> = [
  { icon: Inbox, label: "Входящие", badge: 3 },
  { icon: ListTodo, label: "Мои задачи", badge: null, active: true },
  { icon: Sparkles, label: "Виды · AI", badge: null },
];

const TEAMS = [
  { color: "#7C6CF0", label: "Core", members: 4 },
  { color: "#38BDF8", label: "Growth", members: 3 },
  { color: "#F472B6", label: "Platform", members: 5 },
] as const;

const PROJECTS = ["Q4 Redesign", "API v2", "Onboarding 2.0"] as const;

/** Сайдбар макета: workspace-свитчер, навигация, команды, проекты, пользователь */
export function Sidebar(): JSX.Element {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-[#26282C] bg-[#101113] md:flex lg:w-64">
      {/* Workspace switcher */}
      <button
        type="button"
        className="flex h-14 items-center gap-2.5 border-b border-white/[.04] px-4 text-left transition-colors hover:bg-white/[.03] focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:outline-hidden focus-visible:ring-inset"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-violet-600 text-white">
          <Hexagon size={15} strokeWidth={2.2} fill="rgba(255,255,255,.25)" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-semibold text-zinc-100">Orbit</span>
          <span className="block font-mono text-[9px] tracking-[.16em] text-zinc-600 uppercase">OPL · Enterprise</span>
        </span>
        <ChevronsUpDown size={14} className="text-zinc-600" aria-hidden="true" />
      </button>

      {/* Навигация */}
      <nav aria-label="Основная навигация" className="border-b border-white/[.04] p-2">
        {NAV.map(({ icon: Icon, label, badge, active }) => (
          <button
            key={label}
            type="button"
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-[12.5px] transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:outline-hidden",
              active
                ? "bg-white/[.055] font-medium text-zinc-100"
                : "text-zinc-500 hover:bg-white/[.035] hover:text-zinc-300",
            )}
          >
            <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
            <span className="flex-1">{label}</span>
            {badge !== null && (
              <span className="rounded-full bg-indigo-400/15 px-1.5 font-mono text-[9.5px] text-indigo-300 tabular-nums">
                {badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Команды */}
      <div className="border-b border-white/[.04] p-2">
        <p className="px-2.5 pt-2 pb-1.5 font-mono text-[9px] tracking-[.2em] text-zinc-600 uppercase">Команды</p>
        {TEAMS.map(({ color, label, members }) => (
          <button
            key={label}
            type="button"
            className="flex h-7 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-[12px] text-zinc-500 transition-colors hover:bg-white/[.035] hover:text-zinc-300"
          >
            <span className="h-2 w-2 rounded-[3px]" style={{ background: color }} aria-hidden="true" />
            <span className="flex-1">{label}</span>
            <span className="font-mono text-[9.5px] text-zinc-700 tabular-nums">{members}</span>
          </button>
        ))}
      </div>

      {/* Проекты */}
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <p className="px-2.5 pt-2 pb-1.5 font-mono text-[9px] tracking-[.2em] text-zinc-600 uppercase">Проекты</p>
        {PROJECTS.map((label) => (
          <button
            key={label}
            type="button"
            className="flex h-7 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-[12px] text-zinc-500 transition-colors hover:bg-white/[.035] hover:text-zinc-300"
          >
            <span
              className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-zinc-600"
              aria-hidden="true"
            >
              <span className="h-1 w-1 rounded-full bg-zinc-500" />
            </span>
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>

      {/* Пользователь */}
      <div className="flex items-center gap-2.5 border-t border-white/[.04] p-3">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#7C6CF0] text-[10px] font-bold text-zinc-950">
          АС
          <span
            className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#101113] bg-emerald-400"
            aria-label="онлайн"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12px] font-medium text-zinc-200">Аня Соколова</span>
          <span className="block font-mono text-[9px] tracking-[.14em] text-zinc-600 uppercase">Product engineer</span>
        </span>
        <button
          type="button"
          aria-label="Настройки workspace"
          className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-white/[.05] hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-indigo-400/60 focus-visible:outline-hidden"
        >
          <Settings size={15} />
        </button>
      </div>
    </aside>
  );
}
