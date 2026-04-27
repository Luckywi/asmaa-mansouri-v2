import Link from "next/link";
import { CalendarRange, GalleryVerticalEnd, MousePointerClick, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FadeInUp } from "@/components/motion/FadeInUp";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absUrl,
  buildBreadcrumb,
  buildGraph,
  buildItemList,
  buildWebPage,
} from "@/lib/schema";
import { specialites } from "@/data/specialites";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Spécialités naturopathie féminine, Décines-Charpieu",
  description:
    "Quatre domaines accompagnés à Décines-Charpieu : troubles digestifs, allergies saisonnières, stress et burn-out, déséquilibres hormonaux (SOPK, ménopause).",
  path: "/specialites",
  ogTitle: "Mes spécialités en santé féminine",
  ogDescription:
    "Troubles digestifs, allergies saisonnières, stress et burn-out, déséquilibres hormonaux : les quatre domaines que j'accompagne en cabinet.",
});

/**
 * /specialites — page hub des 4 spécialités d'Asmaa.
 *
 * Architecture en 2 sections, conformément au pattern landing :
 *   1. Hero — H1 "Mes spécialités" + intro descriptive + CTA primary
 *      "Réserver un appel découverte gratuit" (→ Resalib).
 *   2. Grid — 4 cards glass uniformes en 2×2 (1 col mobile / 2 cols sm+).
 *
 * **Cards interactives** : la card entière est un `<Link>` (next/link)
 * vers `/specialites/[slug]`. Au lieu d'un `<ButtonLink>` à l'intérieur,
 * on a deux affordances visuelles :
 *   - Icône `Pointer` (main qui pointe) en haut-droit de la card —
 *     signale au regard que le bloc est cliquable et ouvre une page.
 *   - Texte "En savoir plus" + flèche en bas-droit, en couleur titre
 *     (`text-warm-900`), comme un lien stylisé sans chrome de bouton.
 *
 * Toutes les cards ont la même largeur (cellule grid) et la même
 * hauteur (stretch sur la row), arrow CTA aligné en bas via `mt-auto`.
 * Recette glass standard (DESIGN.md). Server Component pur.
 */
export default function SpecialitesPage() {
  const pageUrl = absUrl("/specialites");
  const jsonLd = buildGraph([
    buildWebPage({
      type: "CollectionPage",
      url: pageUrl,
      name: "Spécialités naturopathie féminine, Décines-Charpieu",
      description:
        "Quatre domaines accompagnés à Décines-Charpieu : troubles digestifs, allergies saisonnières, stress et burn-out, déséquilibres hormonaux (SOPK, ménopause).",
      mainEntity: `${pageUrl}#itemlist`,
      breadcrumb: `${pageUrl}#breadcrumb`,
    }),
    buildItemList(
      specialites.map((s) => ({
        url: absUrl(`/specialites/${s.slug}`),
        name: s.title,
        description: s.shortDescription,
      })),
      pageUrl,
    ),
    buildBreadcrumb([{ name: "Spécialités", url: pageUrl }], pageUrl),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section
        aria-labelledby="specialites-titre"
        className="relative pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-16"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <FadeInUp duration={0.6}>
              <h1
                id="specialites-titre"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900"
              >
                Mes spécialités
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.1} duration={0.6} className="mt-8 max-w-2xl mx-auto">
              <p className="font-body text-lg md:text-xl leading-relaxed text-warm-700">
                Naturopathe à Décines-Charpieu, j&apos;accompagne exclusivement
                les femmes autour de quatre grands univers de santé&nbsp;:
                troubles digestifs, allergies saisonnières, stress et burn-out,
                déséquilibres hormonaux.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.25} duration={0.6} className="mt-10">
              <div className="flex justify-center">
                <ButtonLink href={site.resalibUrl} variant="primary">
                  Réserver un appel découverte gratuit
                  <CalendarRange
                    aria-hidden="true"
                    className="w-4 h-4"
                    strokeWidth={1.5}
                  />
                </ButtonLink>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ─── Grid des 8 spécialités ──────────────────────────────── */}
      <section
        aria-label="Liste des spécialités"
        className="relative pb-12 lg:pb-22"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          {/*
            Cards statiques, contenu interne animé via Reveal avec délai
            croissant par card (`i * 0.08s`). Le glass n'a pas de
            watermark derrière mais son backdrop-filter met une frame
            ou deux à s'initialiser au premier paint — animer les
            cards produirait un flash. En gardant le container Link
            statique, le backdrop-filter est peint dès que la section
            entre dans le viewport ; seuls H2, description et CTA
            cascadent en fade+translateY.
          */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {specialites.map(({ slug, title, shortDescription }, i) => (
              <li
                key={slug}
                className="group relative flex flex-col rounded-md overflow-hidden"
              >
                <Link
                  href={`/specialites/${slug}`}
                  className={[
                    "relative flex-1 flex flex-col",
                    "p-6 lg:p-8",
                    // Glass effect (recette standard DESIGN.md)
                    "rounded-md",
                    "bg-[var(--glass-bg)]",
                    "backdrop-blur-xl backdrop-saturate-[1.8]",
                    "border-[0.5px] border-white/50",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                    "group-hover:border-white/70",
                    // Zoom-in subtil au hover desktop uniquement (lg+).
                    // transform-origin par défaut = center, scale [1.02]
                    // discret pour signaler l'interaction sans agressivité.
                    "lg:group-hover:scale-[1.02]",
                    "transition-all duration-200 ease-out",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
                  ].join(" ")}
                >
                  <Reveal delay={i * 0.08} className="flex flex-col flex-1">
                    <h2 className="font-display text-xl lg:text-2xl font-medium tracking-tight text-warm-900 text-balance">
                      {title}
                    </h2>

                    <p className="mt-4 font-body text-base leading-relaxed text-warm-700">
                      {shortDescription}
                    </p>

                    {/*
                      "En savoir plus" + MousePointerClick (en lieu et place
                      d'une flèche) en couleur titre (warm-900), aligné
                      bottom-right via `mt-auto` + `justify-end`. L'icône
                      signale la clickability — le clic est porté par tout
                      le <Link>. `aria-hidden` car visuellement redondant
                      avec le titre côté lecteur d'écran.
                    */}
                    <div className="mt-auto pt-6 flex justify-end">
                      <span
                        aria-hidden="true"
                        className="font-display text-base lg:text-lg font-medium text-warm-900 inline-flex items-center gap-2"
                      >
                        En savoir plus
                        <MousePointerClick
                          className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-200 group-hover:translate-x-1"
                          strokeWidth={2}
                        />
                      </span>
                    </div>
                  </Reveal>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Section rassurance — hors périmètre ─────────────────────
          Répond à l'objection "je ne me reconnais dans aucune des 8
          thématiques". Deux affordances :
            - Primary : appel direct (gratuit, sans RDV) pour évaluer
              si Asmaa peut accompagner une problématique plus rare,
              ou un simple besoin de détente / repos.
            - Secondary glass : renvoi vers le hub /prestations
              (maillage interne, pour visiteurs en phase de découverte).
      */}
      <section
        aria-label="Autres problématiques et détente"
        className="relative py-12 lg:py-22"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <Reveal as="div" className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900 text-balance">
              Vous n&apos;êtes concernée par aucune de ces problématiques&nbsp;?
            </h2>

            <p className="mt-8 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
              La naturopathie accompagne bien d&apos;autres situations
              que ces quatre univers. Qu&apos;il s&apos;agisse
              d&apos;une problématique moins fréquente ou d&apos;un
              simple besoin de détente et de repos, un premier appel
              gratuit permet d&apos;évaluer ensemble si je peux vous
              accompagner.
            </p>

            <div className="mt-10 flex flex-col-reverse sm:flex-row sm:justify-center items-center gap-4">
              <ButtonLink href="/prestations" variant="secondary">
                Découvrir les prestations
                <GalleryVerticalEnd
                  aria-hidden="true"
                  className="w-4 h-4"
                  strokeWidth={1.5}
                />
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="primary">
                Appeler Asmaa
                <Phone
                  aria-hidden="true"
                  className="w-4 h-4"
                  strokeWidth={1.5}
                />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
