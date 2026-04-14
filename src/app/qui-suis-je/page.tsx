import type { Metadata } from "next";
import { Hero } from "@/components/sections/qui-suis-je/Hero";
import { Portrait } from "@/components/sections/qui-suis-je/Portrait";
import { Demarche } from "@/components/sections/qui-suis-je/Demarche";
import { FaisonsConnaissance } from "@/components/sections/qui-suis-je/FaisonsConnaissance";

// Metadata minimale Phase 1 — la phase 2 SEO (Open Graph, schema.org
// Person/ProfessionalService, breadcrumb schema) viendra plus tard.
export const metadata: Metadata = {
  title: "Qui suis-je — Asmaa Mansouri, naturopathe à Décines-Charpieu",
  description:
    "Découvrez l'approche exclusivement féminine et naturelle d'Asmaa Mansouri, naturopathe spécialisée en santé féminine, Tuina et cupping therapy.",
  robots: { index: false, follow: false },
};

/**
 * /qui-suis-je — page de présentation d'Asmaa.
 *
 * Architecture :
 *   1. Hero — citation d'Asmaa en H1 + attribution + subtitle + 2 CTAs
 *   2. Portrait — "Asmaa Mansouri" + deck photos + tags diplômes + bio
 *   3. Demarche — H2 "Ma démarche" + 4 Q/A (accordéon glass, grid 2 cols)
 *   4. FaisonsConnaissance — H2 "Faisons connaissance" + subtitle + CTA
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
  return (
    <main id="contenu-principal" className="flex-1">
      <Hero />
      <Portrait />
      <Demarche />
      <FaisonsConnaissance />
    </main>
  );
}
