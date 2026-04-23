import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prestations } from "@/data/prestations";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Hero } from "@/components/sections/prestations/Hero";
import { WhatIs } from "@/components/sections/prestations/WhatIs";
import { Steps } from "@/components/sections/prestations/Steps";
import { FAQ } from "@/components/sections/prestations/FAQ";
import { Reviews } from "@/components/sections/prestations/Reviews";
import { Bridges } from "@/components/sections/prestations/Bridges";

type Params = { slug: string };

/**
 * Pré-rend les 4 pages prestation au build (Static Site Generation).
 * Aucun appel API à runtime, full SSG → SEO et perf optimales.
 */
export function generateStaticParams(): Params[] {
  return prestations.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prestation = prestations.find((p) => p.slug === slug);
  if (!prestation) return {};

  return {
    title: `${prestation.seoH1} — Asmaa Mansouri`,
    description: prestation.shortDescription,
    robots: { index: false, follow: false },
  };
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

  return (
    <main id="contenu-principal" className="flex-1">
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
      <FAQ faq={prestation.faq} />
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
