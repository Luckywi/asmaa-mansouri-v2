import type { Metadata } from "next";
import { AteliersHero } from "@/components/sections/ateliers/Hero";
import { AteliersAVenir } from "@/components/sections/ateliers/AVenir";
import { AteliersListe } from "@/components/sections/ateliers/Liste";

// Metadata minimale Phase 1. Le SEO technique (Open Graph, schema.org
// Event, canonical) viendra en Phase 2 quand les vraies dates et le
// contenu final des ateliers seront renseignés.
export const metadata: Metadata = {
  title: "Les ateliers — Asmaa Mansouri, naturopathe à Décines-Charpieu",
  description:
    "Ateliers d'alimentation et de bien-être animés par Asmaa Mansouri au sein de l'association Le Cœur du Mas Cuisine, à Vaulx-en-Velin.",
  robots: { index: false, follow: false },
};

/**
 * `/ateliers` — page dédiée aux ateliers animés par Asmaa au sein de
 * l'association "Le Cœur du Mas Cuisine" (Vaulx-en-Velin).
 *
 * Deux sections :
 *   1. Hero — H1 "Les ateliers" + paragraphe d'intro + 2 CTAs
 *      (Réserver → tel: présidente ; Voir l'association → fiche mairie).
 *   2. Liste — grille responsive de cards cliquables, chaque clic
 *      ouvre une modale avec le détail de l'atelier (description longue,
 *      date/durée/lieu, highlights, CTA réservation).
 *
 * Server Component. La liste est un Client Component (state modale)
 * instancié uniquement pour le sous-arbre concerné.
 */
export default function AteliersPage() {
  return (
    <main id="contenu-principal" className="flex-1">
      <AteliersHero />
      <AteliersAVenir />
      <AteliersListe />
    </main>
  );
}
