import Link from "next/link";
import {
  ArrowUpRight,
  CalendarRange,
  Eye,
  Flower2,
  MapPin,
  MousePointerClick,
  Phone,
  PhoneCall,
  UserRound,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absUrl,
  buildBreadcrumb,
  buildGraph,
  buildItemList,
  buildWebPage,
} from "@/lib/schema";
import { prestations } from "@/data/prestations";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Prestations et tarifs, naturopathe Décines-Charpieu",
  description:
    "Consultations, massages Tuina, cupping therapy, accompagnement 3 mois à Décines-Charpieu. Tarifs détaillés et RDV en ligne, cabinet ou visio.",
  path: "/prestations",
  ogTitle: "Mes prestations et mes tarifs",
  ogDescription:
    "Consultations, massages Tuina, cupping therapy et accompagnement 3 mois au cabinet de Décines-Charpieu ou en visio.",
});

/**
 * /prestations — hub des 4 prestations d'Asmaa.
 *
 * Pattern identique à `/specialites` (grid 2 cols, cards glass, card
 * entièrement cliquable vers sa page slug Phase 2). Ajout propre à ce
 * hub : tag prix "À partir de X €" en bas-gauche de chaque card,
 * "En savoir plus" conservé en bas-droite.
 */
export default function PrestationsPage() {
  const pageUrl = absUrl("/prestations");
  const jsonLd = buildGraph([
    buildWebPage({
      type: "CollectionPage",
      url: pageUrl,
      name: "Prestations et tarifs, naturopathe Décines-Charpieu",
      description:
        "Consultations, massages Tuina, cupping therapy, accompagnement 3 mois à Décines-Charpieu. Tarifs détaillés et RDV en ligne, cabinet ou visio.",
      mainEntity: `${pageUrl}#itemlist`,
      breadcrumb: `${pageUrl}#breadcrumb`,
    }),
    buildItemList(
      prestations.map((p) => ({
        url: absUrl(`/prestations/${p.slug}`),
        name: p.title,
        description: p.shortDescription,
      })),
      pageUrl,
    ),
    buildBreadcrumb([{ name: "Prestations", url: pageUrl }], pageUrl),
  ]);

  return (
    <main id="contenu-principal" className="flex-1">
      <JsonLd data={jsonLd} />
      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section
        aria-labelledby="prestations-titre"
        className="relative pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-16"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              id="prestations-titre"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900"
            >
              Mes prestations
            </h1>

            <p className="mt-8 max-w-2xl mx-auto font-body text-lg md:text-xl leading-relaxed text-warm-700">
              Quatre manières d&apos;entrer dans la naturopathie selon
              votre situation : une consultation ponctuelle, un travail
              manuel sur le corps, ou un suivi rapproché sur plusieurs
              mois. Chaque prestation a son intention propre.
            </p>

            <div className="mt-10 flex flex-col-reverse sm:flex-row sm:justify-center items-center gap-4">
              <ButtonLink href={site.phoneHref} variant="secondary">
                Appeler Asmaa
                <Phone
                  aria-hidden="true"
                  className="w-4 h-4"
                  strokeWidth={1.5}
                />
              </ButtonLink>
              <ButtonLink href={site.resalibUrl} variant="primary">
                Prendre rendez-vous
                <CalendarRange
                  aria-hidden="true"
                  className="w-4 h-4"
                  strokeWidth={1.5}
                />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Grid des 4 prestations ──────────────────────────────── */}
      <section
        aria-label="Liste des prestations"
        className="relative pb-12 lg:pb-22"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          {/*
            Cards glass statiques, contenu interne animé via Reveal avec
            délai par card. Pattern aligné sur /specialites et la grille
            Specialites landing : évite tout flash au premier paint du
            backdrop-filter.
          */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {prestations.map(
              ({ id, title, shortDescription, priceFrom, detailHref }, i) => (
                <li
                  key={id}
                  className="group relative flex flex-col rounded-md overflow-hidden"
                >
                  <Link
                    href={detailHref}
                    className={[
                      "relative flex-1 flex flex-col",
                      "p-6 lg:p-8",
                      "rounded-md",
                      "bg-[var(--glass-bg)]",
                      "backdrop-blur-xl backdrop-saturate-[1.8]",
                      "border-[0.5px] border-white/50",
                      "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                      "group-hover:border-white/70",
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
                        Footer card : tag prix à gauche, "En savoir plus"
                        à droite. Même recette glass que le tag Hero pour
                        la cohérence visuelle (chip beige crème, texte
                        warm-700). `mt-auto` colle le bloc en bas quelle
                        que soit la hauteur de la description.
                      */}
                      <div className="mt-auto pt-6 flex items-center justify-between gap-4">
                        <span
                          className={[
                            "inline-flex items-center px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-md",
                            "bg-accent text-warm-100",
                            "shadow-[0_4px_12px_-2px_rgba(40,60,30,0.25),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
                            "font-body text-xs lg:text-sm font-medium tracking-[0.01em] whitespace-nowrap",
                          ].join(" ")}
                        >
                          À partir de {priceFrom}&nbsp;€
                        </span>

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
              ),
            )}
          </ul>
        </div>
      </section>

      {/* ─── Bridges bas de page (pattern FaisonsConnaissance) ────
          Même structure que /qui-suis-je : header centré (H2 + intro
          + CTA primary Resalib), puis 3 cards watermark + glass vers
          les autres hubs. Ici on renvoie vers qui-suis-je, cabinet et
          spécialités (pas prestations puisqu'on y est déjà). */}
      <section
        id="pas-sure-par-ou-commencer"
        aria-labelledby="pas-sure-titre"
        className="relative py-12 lg:py-22"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
          <Reveal as="div" className="text-center max-w-3xl mx-auto">
            <h2
              id="pas-sure-titre"
              className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
            >
              Comprendre mon approche
            </h2>
            <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
              Un premier échange gratuit pour poser vos questions et
              regarder ensemble la prestation qui a le plus de sens
              pour votre situation.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink href={site.resalibUrl} variant="primary">
                Réserver un appel découverte gratuit
                <PhoneCall
                  aria-hidden="true"
                  className="w-4 h-4"
                  strokeWidth={1.5}
                />
              </ButtonLink>
            </div>
          </Reveal>

          {(() => {
            const bridges = [
              {
                icon: UserRound,
                title: "Qui suis-je\u00A0?",
                description:
                  "Mon parcours, mes formations et la manière dont je travaille au cabinet au quotidien.",
                ctaLabel: "Me découvrir",
                href: "/qui-suis-je",
              },
              {
                icon: MapPin,
                title: "Mon cabinet",
                description:
                  "À Décines-Charpieu, dix minutes de Lyon. Consultations en cabinet ou en visio au choix.",
                ctaLabel: "Voir le cabinet",
                href: "/cabinet",
              },
              {
                icon: Flower2,
                title: "Mes spécialités",
                description:
                  "SOPK, endométriose, préménopause, fertilité : huit problématiques sur lesquelles je vous accompagne.",
                ctaLabel: "Voir les spécialités",
                href: "/specialites",
              },
            ] as const;

            return (
              <>
                {/* ── Mobile (< md) : liste éditoriale (cf. cabinet
                       AllerPlusLoin) — pas de glass, pas d'icône
                       watermark, pas de bouton chrome. Hairlines
                       warm-700/15, gros titre display, ArrowUpRight
                       qui glisse au hover. ── */}
                <Stagger
                  as="ul"
                  trigger="inView"
                  staggerChildren={0.06}
                  className="mt-14 md:hidden border-y border-warm-700/15"
                >
                  {bridges.map(({ title, description, href }, i) => (
                    <StaggerItem
                      key={title}
                      as="li"
                      className={i > 0 ? "border-t border-warm-700/15" : ""}
                    >
                      <Link
                        href={href}
                        className={[
                          "group relative flex items-center gap-6",
                          "py-7",
                          "transition-colors duration-200 ease-out",
                          "hover:text-warm-900",
                          "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
                        ].join(" ")}
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-2xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900">
                            {title}
                          </h3>
                          <p className="mt-2 font-body text-sm leading-relaxed text-warm-700">
                            {description}
                          </p>
                        </div>
                        <ArrowUpRight
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className={[
                            "w-7 h-7 shrink-0 text-warm-700",
                            "transition-all duration-300 ease-out",
                            "group-hover:translate-x-1 group-hover:-translate-y-1",
                            "group-hover:text-warm-900",
                          ].join(" ")}
                        />
                      </Link>
                    </StaggerItem>
                  ))}
                </Stagger>

                {/* ── md+ : 3 cards glass watermark — cards statiques, contenu animé ── */}
                <ul className="hidden md:grid mt-14 lg:mt-20 md:grid-cols-3 gap-6 lg:gap-8">
                  {bridges.map(({ icon: Icon, title, description, ctaLabel, href }, i) => (
                    <li
                      key={title}
                      className="group relative flex flex-col rounded-md overflow-hidden"
                    >
                      <Icon
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full text-warm-700/50 pointer-events-none"
                        strokeWidth={2}
                      />

                      <div
                        className={[
                          "relative flex-1 flex flex-col",
                          "p-6 lg:p-8",
                          "bg-[var(--glass-bg)]",
                          "backdrop-blur-xl backdrop-saturate-[1.8]",
                          "border-[0.5px] border-white/50",
                          "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                          "group-hover:border-white/70",
                          "transition-colors duration-200 ease-out",
                        ].join(" ")}
                      >
                        <Reveal delay={i * 0.08} className="flex flex-col flex-1">
                          <div className="flex items-center gap-3">
                            <Icon
                              aria-hidden="true"
                              className="w-7 h-7 text-warm-700 shrink-0"
                              strokeWidth={1.5}
                            />
                            <h3 className="font-display text-xl lg:text-2xl font-medium tracking-tight text-warm-900">
                              {title}
                            </h3>
                          </div>

                          <p className="mt-4 font-body text-base leading-relaxed text-warm-700">
                            {description}
                          </p>

                          <div className="mt-auto pt-6">
                            <ButtonLink href={href} variant="primary">
                              {ctaLabel}
                              <Eye
                                aria-hidden="true"
                                className="w-4 h-4"
                                strokeWidth={1.5}
                              />
                            </ButtonLink>
                          </div>
                        </Reveal>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            );
          })()}
        </div>
      </section>
    </main>
  );
}
