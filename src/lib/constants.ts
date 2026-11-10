import type { PatternMeta } from "@/types/patterns";

export const SITE = {
  name: "Overlay Lab",
  tagline: "Витрина паттернов модальных окон",
  description:
    "Интерактивная коллекция оверлеев уровня Linear и Vercel: модалка создания, боковая панель, командное меню и богатый поповер. Каждый паттерн — живое демо со сниппетом.",
} as const;

export const PATTERNS: PatternMeta[] = [
  {
    id: "standard-modal",
    index: "01",
    title: "Standard Modal",
    tagline: "Классическая подложка",
    description:
      "Взрослая модалка: форма создания задачи поверх затемнённого backdrop-blur. Base UI держит focus-trap, scroll-lock и inert-фон; Cmd/Ctrl+Enter сохраняет без мыши.",
    library: "Base UI",
    libraryTone: "lime",
    features: [
      "Focus trap и возврат фокуса на триггер",
      "Scroll-lock и inert-фон",
      "Escape и клик по backdrop",
      "Cmd/Ctrl+Enter — быстрое создание",
    ],
    whenToUse: [
      "Создание и редактирование сущностей",
      "Подтверждение критичных действий",
      "Формы, требующие полного внимания",
    ],
    layer: "Dialog · 150",
  },
  {
    id: "side-panel",
    index: "02",
    title: "Side Panel",
    tagline: "Детали задачи справа",
    description:
      "Linear-паттерн: детали и комментарии рядом с очередью. Панель выезжает transform: translateX без затемнения фона. OverlayContainer + FocusScope из React Aria: фон скрыт для скринридера, фокус возвращается ровно на триггер.",
    library: "React Aria",
    libraryTone: "sky",
    features: [
      "Выезд на translateX с spring-кривой",
      "Без backdrop: фон остаётся рабочим",
      "OverlayContainer + FocusScope (contain, restoreFocus)",
      "Композер комментариев с Enter-отправкой",
    ],
    whenToUse: [
      "Детали записи рядом со списком",
      "Чат / тред к задаче или документу",
      "Настройки, не требующие отдельного экрана",
    ],
    layer: "Panel · 140",
  },
  {
    id: "command-menu",
    index: "03",
    title: "Command Menu",
    tagline: "Командное меню по ⌘K",
    description:
      "Spotlight для продукта: glassmorphism-попап с поиском, группами «Навигация/Действия» и полной клавиатурной навигацией. react-aria FocusScope + useDialog; открытие — глобальный шорткат через useKeyboardShortcut.",
    library: "React Aria",
    libraryTone: "violet",
    features: [
      "Глобальный ⌘K / Ctrl K",
      "Фильтр и навигация стрелками",
      "Enter запускает, Esc закрывает",
      "Glassmorphism и группировка команд",
    ],
    whenToUse: [
      "Клавиатурно-ориентированные продукты",
      "Десятки разделов и частые действия",
      "Power-users: меньше переключений контекста",
    ],
    layer: "Palette · 160–170",
  },
  {
    id: "rich-popover",
    index: "04",
    title: "Rich Popover",
    tagline: "Богатый попап к триггеру",
    description:
      "Немодальное «меню-карточка»: выбор приоритета прямо у кнопки. usePopover из React Aria позиционирует панель от якоря (flip, offset), закрывает по Escape и клику вне; фон не блокируется.",
    library: "React Aria",
    libraryTone: "amber",
    features: [
      "Позиционирование от триггера (flip)",
      "Закрытие по Escape и outside-click",
      "Осознанная тень-elevation, backdrop-blur",
      "Немодальный: контекст не теряется",
    ],
    whenToUse: [
      "Выбор значения: приоритет, статус, тег",
      "Карточка пользователя / объекта",
      "Быстрые настройки у контрола",
    ],
    layer: "Popover · 130",
  },
];

export const LAYERS = [
  { label: "Страница", z: "0–39", tone: "bg-zinc-700" },
  { label: "Шапка (sticky)", z: "40", tone: "bg-zinc-600" },
  { label: "Rich Popover", z: "130", tone: "bg-amber-400/80" },
  { label: "Side Panel", z: "140", tone: "bg-sky-400/75" },
  { label: "Standard Modal", z: "150", tone: "bg-lime-400/80" },
  { label: "Command Menu + backdrop", z: "160–170", tone: "bg-violet-400/75" },
] as const;

export const PRINCIPLES = [
  {
    title: "Ловушка фокуса",
    text: "Tab-цикл ограничен активным оверлеем, фон inert. Ни одно «пустое» нажатие не уходит в страницу.",
  },
  {
    title: "Возврат фокуса",
    text: "После закрытия фокус всегда возвращается на элемент-триггер — иначе клавиатурный пользователь теряется.",
  },
  {
    title: "Предсказуемые слои",
    text: "Каждому классу оверлея — своя полоса z-index. Никакого z-index: 9999 в разрозненных файлах.",
  },
] as const;

export const TOTALS = { patterns: PATTERNS.length, libraries: 4, a11y: "100%" } as const;
