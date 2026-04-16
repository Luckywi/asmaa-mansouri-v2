import type { Metadata } from "next";
import { TemoignagesHero } from "@/components/sections/temoignages/Hero";
import { TemoignagesListe } from "@/components/sections/temoignages/Liste";

// Metadata minimale Phase 1. Le SEO technique (Open Graph, schema.org
// Review / AggregateRating, balises canonical) est reporté à la Phase 2
// une fois les vraies dates et sources renseignées dans `data/temoignages.ts`.
export const metadata: Metadata = {
  title: "Témoignages — Asmaa Mansouri, naturopathe à Décines-Charpieu",
  description:
    "Les retours des femmes accompagnées au cabinet : naturopathie, massage Tuina, cupping thérapie. Avis vérifiés Resalib et Google.",
  robots: { index: false, follow: false },
};

/**
 * `/temoignages` — page dédiée aux avis clients.
 *
 * Deux sections :
 *   1. Hero — H1 "Vos témoignages" + paragraphe d'intro + bloc 5 étoiles
 *      + 2 CTA "Écrire un avis" (Resalib primary, Google secondary).
 *   2. Liste — grille masonry responsive (1 / 2 / 3 colonnes), avec
 *      modale de détail par avis (date + source + lien externe).
 *
 * Server Component. La liste est un Client Component (state modale),
 * instancié uniquement pour le sous-arbre concerné.
 */
export default function TemoignagesPage() {
  return (
    <main id="contenu-principal" className="flex-1">
      <TemoignagesHero />
      <TemoignagesListe />
    </main>
  );
}
