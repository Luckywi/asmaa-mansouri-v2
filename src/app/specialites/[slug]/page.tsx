import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { specialites } from "@/data/specialites";
import { Hero } from "@/components/sections/specialites/Hero";
import { Article } from "@/components/sections/specialites/Article";
import { FAQ } from "@/components/sections/specialites/FAQ";
import { CTAFinal } from "@/components/sections/specialites/CTAFinal";

type Params = { slug: string };

/**
 * Pré-rend les 8 pages spécialités au build (Static Site Generation).
 * Aucun appel API à runtime, full SSG → SEO et performance optimaux.
 */
export function generateStaticParams(): Params[] {
  return specialites.map((s) => ({ slug: s.slug }));
}

/**
 * Metadata par spécialité (title + description). Phase 2 : ajouter
 * Open Graph, schema.org MedicalCondition / FAQPage, breadcrumb.
 *
 * Pour l'instant `noindex` Phase 1 (le contenu Asmaa n'est pas encore
 * intégré, on évite que Google index les placeholders).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const specialite = specialites.find((s) => s.slug === slug);

  if (!specialite) return {};

  return {
    title: `${specialite.title} — Asmaa Mansouri, naturopathe à Décines-Charpieu`,
    description: specialite.shortDescription,
    robots: { index: false, follow: false },
  };
}

/**
 * /specialites/[slug] — page article par spécialité.
 *
 * Architecture :
 *   1. Hero       — H1 (title) + intro + CTA primary Resalib
 *   2. Article    — Definition / Symptômes / Approche en long-form
 *   3. FAQ        — accordéon des 5 questions/réponses
 *   4. CTAFinal   — re-CTA primary + bridge "Retour aux spécialités"
 *
 * Tout le contenu vient de `src/data/specialites.ts` — Asmaa édite ce
 * seul fichier pour mettre à jour les pages.
 *
 * 404 propre via `notFound()` si le slug ne matche aucune spécialité.
 */
export default async function SpecialiteDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const specialite = specialites.find((s) => s.slug === slug);

  if (!specialite) {
    notFound();
  }

  return (
    <main id="contenu-principal" className="flex-1">
      <Hero title={specialite.title} intro={specialite.intro} />
      <Article
        definition={specialite.definition}
        symptomes={specialite.symptomes}
        approche={specialite.approche}
      />
      <FAQ faq={specialite.faq} />
      <CTAFinal />
    </main>
  );
}
