import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prestations } from "@/data/prestations";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Hero } from "@/components/sections/prestations/Hero";
import { WhatIs } from "@/components/sections/prestations/WhatIs";
import { Steps } from "@/components/sections/prestations/Steps";
import { AccordionFAQ } from "@/components/ui/AccordionFAQ";
import { Reviews } from "@/components/sections/prestations/Reviews";
import { Bridges } from "@/components/sections/prestations/Bridges";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absUrl,
  BUSINESS_ID,
  buildBreadcrumb,
  buildFaqPage,
  buildGraph,
  buildService,
  buildWebPage,
} from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";

type Params = { slug: string };

/**
 * Pré-rend les 4 pages prestation au build (Static Site Generation).
 * Aucun appel API à runtime, full SSG → SEO et perf optimales.
 */
export function generateStaticParams(): Params[] {
  return prestations.map((p) => ({ slug: p.slug }));
}

/**
 * Metadata SEO par slug. Co-localisée ici plutôt qu'injectée dans
 * `src/data/prestations.ts` : on garde le fichier data centré sur le
 * contenu éditorial (title, seoH1, tariffs, whatIs, steps, bridges) et
 * la couche SEO (title/description/OG optimisés pour ranking et CTR)
 * vit avec la route qui la consomme.
 */
const PRESTATION_SEO: Record<
  string,
  { title: string; description: string; ogTitle: string; ogDescription: string }
> = {
  consultation: {
    title: "Consultation naturopathique à Décines-Charpieu",
    description:
      "Bilan initial 1h30 à 80 €, suivi 30 min à 50 €, appel découverte gratuit. Cabinet à Décines-Charpieu (10 min de Lyon) ou en visio. Rendez-vous en ligne.",
    ogTitle: "Consultation naturopathique à Décines",
    ogDescription:
      "Bilan 1h30 à 80 €, suivi à 50 €, appel découverte gratuit. Cabinet à Décines-Charpieu ou en visio, RDV en ligne.",
  },
  "massage-tuina": {
    title: "Massage Tuina chinois à Décines-Charpieu, Lyon Est",
    description:
      "Massage thérapeutique chinois sur méridiens : 30 min à 50 €, corps complet 1h à 80 €. Cabinet à Décines-Charpieu, à dix minutes de Lyon. RDV en ligne.",
    ogTitle: "Massage Tuina thérapeutique à Décines",
    ogDescription:
      "Massage chinois thérapeutique sur les méridiens : 30 min à 50 €, 1h à 80 €. Cabinet à Décines-Charpieu, dix minutes de Lyon.",
  },
  "cupping-therapy": {
    title: "Cupping therapy, hijama et ventouses à Décines-Charpieu",
    description:
      "Ventouses thérapeutiques (cupping, hijama) sur les tensions installées et douleurs chroniques. Séance 1h à 80 €, cabinet à Décines-Charpieu, proche Lyon.",
    ogTitle: "Cupping therapy et hijama à Décines",
    ogDescription:
      "Cupping therapy et hijama : ventouses thérapeutiques sur tensions installées et douleurs chroniques, au cabinet de Décines-Charpieu.",
  },
  "accompagnement-3-mois": {
    title: "Accompagnement naturopathique 3 mois, Décines",
    description:
      "Suivi rapproché sur trois mois pour SOPK, endométriose, fertilité et troubles digestifs installés : 3 RDV d'1h et appel hebdo. Cabinet Décines ou visio, 350 €.",
    ogTitle: "Programme 3 mois pour femmes",
    ogDescription:
      "Suivi naturopathique intensif sur 3 mois pour SOPK, endométriose, fertilité, troubles digestifs. 350 € tout compris, cabinet ou visio.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prestation = prestations.find((p) => p.slug === slug);
  const seo = PRESTATION_SEO[slug];
  if (!prestation || !seo) return {};

  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: `/prestations/${slug}`,
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
  });
}

/**
 * /prestations/[slug] — page détail par prestation (4 au total).
 *
 * Architecture en 5 sections, data-driven depuis `src/data/prestations.ts` :
 *   1. Hero      — H1 SEO local + sous-titre + 2 CTAs + tableau tarifs
 *   2. WhatIs    — texte long "Qu'est-ce que la [service]"
 *   3. Steps     — 3-4 étapes numérotées du déroulé d'une séance
 *   4. Reviews   — avis clients filtrés par role, marquee horizontal
 *                  (1 bande mobile, 2 bandes desktop)
 *   5. Bridges   — 3 cards de maillage interne, variant par prestation
 *
 * Toute adaptation éditoriale passe par `src/data/prestations.ts`.
 * Le template reste stable, la variation vient du contenu + des bridges
 * qui pointent vers des cibles différentes selon la prestation (netlinking
 * logique, pas répétitif).
 *
 * 404 propre via `notFound()` si le slug ne matche aucune prestation.
 */
export default async function PrestationDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const prestation = prestations.find((p) => p.slug === slug);

  if (!prestation) {
    notFound();
  }

  const pageUrl = absUrl(`/prestations/${prestation.slug}`);
  const jsonLd = buildGraph([
    buildWebPage({
      url: pageUrl,
      name: prestation.seoH1,
      description: prestation.seoSubtitle,
      about: BUSINESS_ID,
      mainEntity: `${pageUrl}#service`,
      breadcrumb: `${pageUrl}#breadcrumb`,
    }),
    buildService(prestation),
    buildFaqPage(prestation.faq, pageUrl),
    buildBreadcrumb(
      [
        { name: "Prestations", url: absUrl("/prestations") },
        { name: prestation.category, url: pageUrl },
      ],
      pageUrl,
    ),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Prestations", href: "/prestations" },
          {
            label: prestation.category,
            href: `/prestations/${prestation.slug}`,
          },
        ]}
      />
      <Hero
        h1={prestation.seoH1}
        subtitle={prestation.seoSubtitle}
        tariffs={prestation.tariffs}
      />
      <WhatIs title={prestation.whatIs.title} content={prestation.whatIs.content} />
      <Steps title={prestation.steps.title} items={prestation.steps.items} />
      <AccordionFAQ faq={prestation.faq} idPrefix="prestation-faq" />
      {/*
        `key={slug}` force le remount complet de Reviews à chaque
        changement de prestation. Sans ce key, React réutilise le même
        DOM pour la Marquee, ce qui laisse la CSS animation à sa
        translateX courante quand la navigation arrive : le carousel
        apparaît décalé et laisse une moitié vide. Le remount réinjecte
        des div neufs, les @keyframes repartent à 0.
      */}
      <Reviews
        key={prestation.slug}
        testimonialRoles={prestation.testimonialRoles}
        prestationLabel={prestation.category}
      />
      <Bridges bridges={prestation.bridges} />
    </main>
  );
}
