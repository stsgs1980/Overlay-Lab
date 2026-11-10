import type { JSX } from "react";
import { SidebarNav, SidebarProjects, SidebarTeams, SidebarUser, WorkspaceSwitcher } from "./SidebarParts";

/** Сайдбар макета: workspace-свитчер, навигация, команды, проекты, пользователь */
export function Sidebar(): JSX.Element {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-[#26282C] bg-[#101113] md:flex lg:w-64">
      <WorkspaceSwitcher />
      <SidebarNav />
      <SidebarTeams />
      <SidebarProjects />
      <SidebarUser />
    </aside>
  );
}
