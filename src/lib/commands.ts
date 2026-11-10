import {
  CheckCheck,
  FileText,
  FolderKanban,
  Inbox,
  Keyboard,
  Moon,
  Rocket,
  SquarePen,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

export type CommandGroup = "Навигация" | "Действия";

export interface PaletteCommand {
  id: string;
  label: string;
  group: CommandGroup;
  /** Что произойдёт — уходит в тост после запуска */
  run: string;
  icon: LucideIcon;
}

/**
 * Реестр команд палитры. Единый источник для мока приложения и галереи —
 * в проде сюда приехал бы динамический провайдер команд.
 */
export const COMMANDS: PaletteCommand[] = [
  { id: "nav-inbox", label: "Открыть входящие", group: "Навигация", run: "Раздел «Входящие» открыт", icon: Inbox },
  { id: "nav-projects", label: "Перейти к проектам", group: "Навигация", run: "Проекты открыты", icon: FolderKanban },
  { id: "nav-docs", label: "Открыть документацию", group: "Навигация", run: "Документация открыта", icon: FileText },
  {
    id: "act-new-task",
    label: "Создать задачу",
    group: "Действия",
    run: "Открылась форма новой задачи",
    icon: SquarePen,
  },
  { id: "act-deploy", label: "Выполнить деплой", group: "Действия", run: "Деплой поставлен в очередь", icon: Rocket },
  { id: "act-invite", label: "Пригласить участника", group: "Действия", run: "Приглашение отправлено", icon: UserPlus },
  {
    id: "act-complete",
    label: "Отметить всё прочитанным",
    group: "Действия",
    run: "Всё отмечено прочитанным",
    icon: CheckCheck,
  },
  { id: "act-theme", label: "Переключить тему", group: "Действия", run: "Тема переключена", icon: Moon },
  {
    id: "act-shortcuts",
    label: "Все шорткаты",
    group: "Действия",
    run: "Справка по шорткатам открыта",
    icon: Keyboard,
  },
];
