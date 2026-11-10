import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

/* --- Button ----------------------------------------------- */
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
}

/* --- Card ------------------------------------------------- */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Поднимает карточку и подсвечивает рамку при наведении */
  interactive?: boolean;
}

/* --- Badge ------------------------------------------------ */
export type BadgeTone = "lime" | "violet" | "zinc" | "amber" | "sky";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
}

/* --- Modal sections (dumb parts) -------------------------- */
export interface ModalHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  /** Иконка-слот слева от заголовка */
  icon?: ReactNode;
}

export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** between — черновик + действия, end — только действия справа */
  align?: "between" | "end";
}

/* --- TextField -------------------------------------------- */
export interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  autoFocus?: boolean;
  autoComplete?: string;
}
