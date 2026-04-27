import { Hero } from "@/components/sections/qui-suis-je/Hero";
import { Exploration } from "@/components/sections/qui-suis-je/Exploration";
import { Engagement } from "@/components/sections/qui-suis-je/Engagement";
import { Portrait } from "@/components/sections/qui-suis-je/Portrait";
import { Demarche } from "@/components/sections/qui-suis-je/Demarche";
import { FaisonsConnaissance } from "@/components/sections/qui-suis-je/FaisonsConnaissance";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absUrl,
  buildBreadcrumb,
  buildFaqPage,
  buildGraph,
  buildWebPage,
  PERSON_ID,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";
import { demarcheFaq } from "@/data/qui-suis-je-faq";

export const metadata = buildMetadata({
  title: "Mon parcours de naturopathe à Décines-Charpieu",
  description:
    "Asmaa Mansouri, naturopathe à Décines-Charpieu : parcours, diplômes, formations (naturopathie, MTC, cupping) et approche de la santé féminine.",
  path: "/qui-suis-je",
  ogDescription:
    "Parcours, formations et approche d'Asmaa Mansouri, naturopathe à Décines-Charpieu spécialisée en santé féminine.",
});

/**
 * /qui-suis-je — page de présentation d'Asmaa.
 *
 * Architecture :
 *   1. Hero — citation d'Asmaa en H1 + attribution + subtitle + 2 CTAs
 *   2. Portrait — "Asmaa Mansouri" + deck photos + tags diplômes + bio
 *   3. Exploration — 2 cards glass vers les sous-pages thématiques
 *      (La naturopathie / Mes médecines ancestrales). Garde la nav à 5
 *      entrées en rangeant ces pages en sous-sections de /qui-suis-je.
 *   4. Demarche — H2 "Ma démarche" + 4 Q/A (accordéon glass, grid 2 cols)
 *   5. FaisonsConnaissance — H2 "Faisons connaissance" + subtitle + CTA
 *      primary "Réserver un appel découverte gratuit" (→ Resalib) + 3
 *      bridges (Spécialités / Cabinet / Prestations) pour le maillage
 *      interne SEO. Merge des anciens blocs AllerPlusLoin + CTAFinal.
 *
 * Le wrapper <main id="contenu-principal" className="flex-1"> est
 * obligatoire pour :
 *   - Le skip link (a href="#contenu-principal") de layout.tsx
 *   - Le sticky footer pattern (body flex-col min-h-full + main flex-1)
 */
export default function QuiSuisJePage() {
  const pageUrl = absUrl("/qui-suis-je");
  const jsonLd = buildGraph([
    buildWebPage({
      type: "ProfilePage",
      url: pageUrl,
      name: "Mon parcours de naturopathe à Décines-Charpieu",
      description:
        "Asmaa Mansouri, naturopathe à Décines-Charpieu : parcours, diplômes, formations (naturopathie, MTC, cupping) et approche de la santé féminine.",
      mainEntity: PERSON_ID,
      breadcrumb: `${pageUrl}#breadcrumb`,
    }),
    buildBreadcrumb(
      [{ name: "Qui suis-je ?", url: pageUrl }],
      pageUrl,
    ),
    buildFaqPage(demarcheFaq, pageUrl),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      <Hero />
      <Portrait />
      <Exploration />
      <Engagement />
      <Demarche />
      <FaisonsConnaissance />
    </main>
  );
}
