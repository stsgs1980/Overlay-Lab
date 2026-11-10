import { ArchitectureSection } from "@/components/layout/ArchitectureSection";
import { HeroSection } from "@/components/layout/HeroSection";
import { ShowcaseGrid } from "@/components/layout/ShowcaseGrid";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { JSX } from "react";

/** Главная витрины — только сборка секций, никакой логики */
export default function HomePage(): JSX.Element {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ShowcaseGrid />
        <ArchitectureSection />
      </main>
      <SiteFooter />
    </>
  );
}
