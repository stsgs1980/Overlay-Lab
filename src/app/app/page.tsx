import MockApp from "@/components/mock-app/MockApp";
import type { Metadata } from "next";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: "Orbit · Демо SaaS-приложения — Overlay Lab",
  description:
    "Mock Linear-подобного трекера: сайдбар, очередь задач и четыре оверлея (Standard Modal, Side Panel, Command Menu, Rich Popover), переключаемые вкладками Base UI.",
};

/** Часть 2 витрины: живой мок приложения — паттерны в контексте реального сценария */
export default function MockAppPage(): JSX.Element {
  return <MockApp />;
}
