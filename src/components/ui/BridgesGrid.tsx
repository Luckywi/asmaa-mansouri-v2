import Link from "next/link";
import { ArrowUpRight, Eye, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * Entrée rendue par `BridgesGrid`. Résolution d'icône faite côté
 * appelant (`icon: LucideIcon`) — les data files qui stockent une clé
 * sérialisable (ex: `PrestationBridge.iconKey`) doivent mapper vers
 * un composant lucide avant de passer la liste.
 */
export type BridgeItem = {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
  readonly ctaLabel: string;
  readonly href: string;
};

type Props = {
  readonly items: readonly BridgeItem[];
  /**
   * Classes appliquées au `<ul>` mobile (liste éditoriale hairline).
   * Sert à ajuster le `mt-*` qui pousse la liste sous le header de la
   * section parente. Défaut : `mt-12` (cas "Bridges" sans intro).
   */
  readonly mobileClassName?: string;
  /**
   * Classes appliquées au `<ul>` desktop (grille 3 cards). Sert à
   * ajuster le `mt-*`. Défaut : `mt-14 lg:mt-16` (cas "Bridges" sans
   * intro). Les wrappers avec header + CTA intro passent `mt-14 lg:mt-20`.
   */
  readonly desktopClassName?: string;
};

/**
 * BridgesGrid — grille 3 cards desktop + liste éditoriale mobile.
 *
 * Pattern partagé entre les 4 sections "Aller plus loin" / "Pour aller
 * plus loin" du site (prestations, qui-suis-je, cabinet, contact). Le
 * wrapper de chaque page apporte son `<section>`, son H2 et son intro
 * spécifiques, puis délègue la grille à ce composant.
 *
 * Comportement :
 *   - Mobile (< md) : liste éditoriale hairline, flèche ArrowUpRight
 *     qui glisse en diagonale au hover, apparition en stagger (inView).
 *   - md+ : grille 3 cards glass avec icône watermark + header icône
 *     + titre + description + ButtonLink primary.
 *
 * La grille s'adapte au nombre d'items (1, 2 ou 3) pour éviter qu'une
 * grille à 3 colonnes soit à moitié vide.
 *
 * Server Component pur — les interactions (Reveal, Stagger) viennent
 * des enfants motion/*, déjà `"use client"`.
 */
export function BridgesGrid({
  items,
  mobileClassName = "mt-12",
  desktopClassName = "mt-14 lg:mt-16",
}: Props) {
  return (
    <>
      {/* ─── Mobile (< md) : liste éditoriale hairline ────────── */}
      <Stagger
        as="ul"
        trigger="inView"
        staggerChildren={0.06}
        className={`md:hidden border-y border-warm-700/15 ${mobileClassName}`}
      >
        {items.map(({ href, title, description }, i) => (
          <StaggerItem
            key={href}
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

      {/* ─── md+ : grille de cards glass watermark ────────────── */}
      <ul
        className={[
          "hidden md:grid gap-6 lg:gap-8 mx-auto",
          items.length === 1
            ? "max-w-md"
            : items.length === 2
              ? "md:grid-cols-2 max-w-4xl"
              : "md:grid-cols-3",
          desktopClassName,
        ].join(" ")}
      >
        {items.map(({ icon: Icon, title, description, ctaLabel, href }, i) => (
          <li
            key={href}
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
}
