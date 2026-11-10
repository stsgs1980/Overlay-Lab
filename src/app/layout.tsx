import { ModalStackProvider } from "@/context/ModalStackContext";
import type { Metadata, Viewport } from "next";
import type { JSX } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Overlay Lab — Паттерны модальных окон и оверлеев",
  description:
    "Интерактивная витрина: Standard Modal, Side Panel, Command Menu и Rich Popover в контексте Linear-подобного SaaS. Next.js, Base UI, React Aria, Tailwind CSS.",
  applicationName: "Overlay Lab",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0C10" },
    { media: "(prefers-color-scheme: light)", color: "#F4F4EF" },
  ],
};

// До первой отрисовки выставляем класс темы из localStorage — без вспышки
const themeInit = `(function(){try{var t=localStorage.getItem('overlay-lab-theme');var l=t==='light';var r=document.documentElement;r.classList.toggle('light',l);r.classList.toggle('dark',!l);r.style.colorScheme=l?'light':'dark';}catch(e){document.documentElement.classList.add('dark');}})();`;

/** Корневой layout: шрифты, метаданные, без обёртки темы (тёмная по умолчанию) */
export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#patterns"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-lime-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-zinc-950"
        >
          К содержанию — паттерны
        </a>
        <ModalStackProvider>{children}</ModalStackProvider>
      </body>
    </html>
  );
}
