import type { Metadata } from "next";
import { AteliersExploration } from "@/components/sections/ateliers/Exploration";
import { AteliersOrganiser } from "@/components/sections/ateliers/Organiser";
import { AteliersFAQ } from "@/components/sections/ateliers/FAQ";

export const metadata: Metadata = {
  title: "Ateliers bien-être — Asmaa Mansouri, naturopathe à Décines-Charpieu",
  description:
    "Ateliers autour de la naturopathie et du bien-être naturel animés par Asmaa Mansouri : cosmétiques maison, fermentation, alimentation hormonale, diététique saisonnière.",
  robots: { index: false, follow: false },
};

export default function AteliersPage() {
  return (
    <main id="contenu-principal" className="flex-1">
      <AteliersOrganiser />
      <AteliersExploration />
      <AteliersFAQ />
    </main>
  );
}
