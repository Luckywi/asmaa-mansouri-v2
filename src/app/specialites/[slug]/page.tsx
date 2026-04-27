import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prestations } from "@/data/prestations";
import { specialites } from "@/data/specialites";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Hero } from "@/components/sections/specialites/Hero";
import { Article } from "@/components/sections/specialites/Article";
import { AccordionFAQ } from "@/components/ui/AccordionFAQ";
import { CTAFinal } from "@/components/sections/specialites/CTAFinal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absUrl,
  BUSINESS_ID,
  buildBreadcrumb,
  buildFaqPage,
  buildGraph,
  buildWebPage,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";

type Params = { slug: string };

/**
 * Pré-rend les 4 pages spécialités au build (Static Site Generation).
 * Aucun appel API à runtime, full SSG → SEO et performance optimaux.
 */
export function generateStaticParams(): Params[] {
  return specialites.map((s) => ({ slug: s.slug }));
}

/**
 * Metadata SEO par slug, co-localisée ici pour séparer contenu éditorial
 * (`src/data/specialites.ts`) et optimisation SEO (title/desc/OG). Les
 * titres sont tenus entre 50 et 65 caractères total avec le template
 * du layout ` | Asmaa Mansouri Naturopathe`, descriptions 140-160.
 */
const SPECIALITE_SEO: Record<
  string,
  { title: string; description: string; ogTitle: string; ogDescription: string }
> = {
  "troubles-digestifs": {
    title: "Troubles digestifs, naturopathie à Décines-Charpieu",
    description:
      "Ballonnements, reflux, intestin irritable, digestion lente : approche naturopathique qui travaille le terrain. Cabinet à Décines-Charpieu, près de Lyon.",
    ogTitle: "Troubles digestifs en naturopathie",
    ogDescription:
      "Ballonnements, reflux, intestin irritable : approche naturopathique du terrain digestif, au cabinet de Décines-Charpieu.",
  },
  "allergies-saisonnieres": {
    title: "Allergies saisonnières, naturopathie à Décines",
    description:
      "Rhinite, sinusite, yeux qui piquent : préparer le terrain 6 à 8 semaines avant la saison pollinique. Accompagnement à Décines-Charpieu ou en visio depuis Lyon.",
    ogTitle: "Allergies saisonnières au printemps",
    ogDescription:
      "Rhinite, sinusite, yeux qui piquent : préparer le terrain 6 à 8 semaines avant la saison pollinique, au cabinet de Décines.",
  },
  "stress-burn-out": {
    title: "Stress et burn-out, naturopathie à Décines-Charpieu",
    description:
      "Fatigue chronique, sommeil perturbé, charge mentale saturée : bilan complet du terrain et massage Tuina pour soutenir le système nerveux. Cabinet Décines.",
    ogTitle: "Stress et burn-out en naturopathie",
    ogDescription:
      "Fatigue qui ne cède plus, sommeil perturbé, charge mentale saturée : bilan du terrain et massage Tuina au cabinet de Décines.",
  },
  "desequilibres-hormonaux": {
    title: "SOPK et déséquilibres hormonaux, naturopathe Décines",
    description:
      "SOPK, endométriose, préménopause, fertilité, post-partum, cycles irréguliers : accompagnement naturopathique à Décines-Charpieu et en visio depuis Lyon.",
    ogTitle: "Déséquilibres hormonaux féminins",
    ogDescription:
      "SOPK, endométriose, préménopause, fertilité, post-partum : accompagnement naturopathique des déséquilibres hormonaux à Décines.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const specialite = specialites.find((s) => s.slug === slug);
  const seo = SPECIALITE_SEO[slug];
  if (!specialite || !seo) return {};

  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: `/specialites/${slug}`,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
  });
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

  const pageUrl = absUrl(`/specialites/${specialite.slug}`);
  const seo = SPECIALITE_SEO[specialite.slug];
  // Services liés : on référence toutes les prestations par @id —
  // elles représentent les voies d'accompagnement sémantiquement liées
  // à la spécialité. `mentions` est valide sur WebPage.
  const mentions = prestations.map((p) => ({
    "@id": `${absUrl(`/prestations/${p.slug}`)}#service`,
  }));
  const webPage = buildWebPage({
    url: pageUrl,
    name: seo?.title ?? specialite.title,
    description: seo?.description ?? specialite.shortDescription,
    about: BUSINESS_ID,
    breadcrumb: `${pageUrl}#breadcrumb`,
  });
  webPage.mentions = mentions;
  const jsonLd = buildGraph([
    webPage,
    buildFaqPage(specialite.faq, pageUrl),
    buildBreadcrumb(
      [
        { name: "Spécialités", url: absUrl("/specialites") },
        { name: specialite.title, url: pageUrl },
      ],
      pageUrl,
    ),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Spécialités", href: "/specialites" },
          {
            label: specialite.title,
            href: `/specialites/${specialite.slug}`,
          },
        ]}
      />
      <Hero title={specialite.title} intro={specialite.intro} />
      <Article
        definition={specialite.definition}
        symptomes={specialite.symptomes}
        approche={specialite.approche}
        conditions={specialite.conditions}
      />
      <AccordionFAQ faq={specialite.faq} idPrefix="specialite-faq" />
      <CTAFinal />
    </main>
  );
}
