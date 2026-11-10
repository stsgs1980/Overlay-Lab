import type { JSX } from "react";
import { SiteBrand } from "./SiteBrand";
import { SiteNav } from "./SiteNav";
import { ThemeToggle } from "./ThemeToggle";

/** Липкая шапка: лого, якорная навигация, переключатель темы */
export function SiteHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-40 h-14 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-6xl items-center gap-4 px-4 sm:px-6">
        <SiteBrand />
        <SiteNav />
        <div className="ml-auto flex items-center gap-3 md:ml-6">
          <span className="hidden font-mono text-[10px] text-[var(--text-faint)] lg:inline">v2.0</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
