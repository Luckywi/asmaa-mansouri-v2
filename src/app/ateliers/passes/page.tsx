import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PassesHero } from "@/components/sections/ateliers/PassesHero";
import { AteliersListe } from "@/components/sections/ateliers/Liste";
import { PassesFAQ } from "@/components/sections/ateliers/PassesFAQ";

export const metadata: Metadata = {
  title:
    "Ateliers passés — Asmaa Mansouri, naturopathe à Décines-Charpieu",
  description:
    "Retrouvez les ateliers bien-être déjà animés par Asmaa Mansouri : cosmétiques maison, fermentation, gourmandises saines et diététique saisonnière.",
  robots: { index: false, follow: false },
};

export default function AteliersPassesPage() {
  return (
    <main id="contenu-principal" className="flex-1">
      <Breadcrumbs
        items={[
          { label: "Ateliers", href: "/ateliers" },
          { label: "Ateliers passés", href: "/ateliers/passes" },
        ]}
      />
      <PassesHero />
      <AteliersListe />
      <PassesFAQ />
    </main>
  );
}
