import { TemoignagesHero } from "@/components/sections/temoignages/Hero";
import { TemoignagesListe } from "@/components/sections/temoignages/Liste";
import { AllerPlusLoin } from "@/components/sections/temoignages/AllerPlusLoin";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absUrl,
  BUSINESS_ID,
  buildBreadcrumb,
  buildGraph,
  buildReviews,
  buildWebPage,
} from "@/lib/schema";
import { temoignages } from "@/data/temoignages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Avis et témoignages, naturopathe Décines-Charpieu",
  description:
    "Avis de femmes accompagnées à Décines-Charpieu : consultations, massages Tuina, cupping et suivi 3 mois. Témoignages vérifiés Resalib et Google.",
  path: "/temoignages",
  ogTitle: "Avis et témoignages de patientes",
  ogDescription:
    "Témoignages de femmes accompagnées au cabinet de Décines-Charpieu, vérifiés sur Resalib et Google.",
});

/**
 * `/temoignages` — page dédiée aux avis clients.
 *
 * Trois sections :
 *   1. Hero — H1 "Vos témoignages" + paragraphe d'intro + bloc 5 étoiles
 *      + 2 CTA "Écrire un avis" (Resalib primary, Google secondary).
 *   2. Liste — grille masonry responsive (1 / 2 / 3 colonnes), avec
 *      modale de détail par avis (date + source + lien externe).
 *   3. AllerPlusLoin — H2 + CTA appel découverte + 3 bridges
 *      (Prestations / Cabinet / Qui suis-je) pour prolonger la visite.
 *
 * Server Component. La liste est un Client Component (state modale),
 * instancié uniquement pour le sous-arbre concerné.
 */
export default function TemoignagesPage() {
  const pageUrl = absUrl("/temoignages");
  const jsonLd = buildGraph([
    buildWebPage({
      url: pageUrl,
      name: "Avis et témoignages, naturopathe Décines-Charpieu",
      description:
        "Avis de femmes accompagnées à Décines-Charpieu : consultations, massages Tuina, cupping et suivi 3 mois. Témoignages vérifiés Resalib et Google.",
      about: BUSINESS_ID,
      breadcrumb: `${pageUrl}#breadcrumb`,
    }),
    ...buildReviews(temoignages),
    buildBreadcrumb([{ name: "Témoignages", url: pageUrl }], pageUrl),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      <TemoignagesHero />
      <TemoignagesListe />
      <AllerPlusLoin />
    </main>
  );
}
