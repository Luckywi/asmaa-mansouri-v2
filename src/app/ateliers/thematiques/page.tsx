import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ThematiquesHero } from "@/components/sections/ateliers/ThematiquesHero";
import { AteliersThematiques } from "@/components/sections/ateliers/Thematiques";
import { AteliersOrganiser } from "@/components/sections/ateliers/Organiser";

export const metadata: Metadata = {
  title:
    "Les thématiques d'ateliers — Asmaa Mansouri, naturopathe à Décines-Charpieu",
  description:
    "Cosmétiques maison, fermentation, alimentation hormonale, diététique saisonnière : découvrez les thématiques d'ateliers bien-être animés par Asmaa Mansouri.",
  robots: { index: false, follow: false },
};

export default function ThematiquesPage() {
  return (
    <main id="contenu-principal" className="flex-1">
      <Breadcrumbs
        items={[
          { label: "Ateliers", href: "/ateliers" },
          { label: "Thématiques", href: "/ateliers/thematiques" },
        ]}
      />
      <ThematiquesHero />
      <AteliersThematiques />
      <AteliersOrganiser as="section" title="Vous souhaitez organiser un atelier ?" />
    </main>
  );
}
