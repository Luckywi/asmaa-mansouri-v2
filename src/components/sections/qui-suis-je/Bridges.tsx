import Link from "next/link";
import {
  ArrowUpRight,
  Eye,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export type QuiSuisJeBridge = {
  readonly href: string;
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
  readonly ctaLabel: string;
};

type Props = {
  /** 3 bridges affichés bas de page (ordre préservé). */
  bridges: readonly QuiSuisJeBridge[];
};

/**
 * Bridges — section de maillage interne bas de page, pour les sous-pages
 * /qui-suis-je/la-naturopathie et /qui-suis-je/medecines-ancestrales.
 *
 * Copie fidèle du pattern `sections/prestations/Bridges.tsx` pour garder
 * la cohérence visuelle entre pages éditoriales longues :
 *   - Mobile : liste éditoriale hairline avec ArrowUpRight.
 *   - md+ : grille 3 cards glass avec icône watermark + icône header +
 *     titre + description + bouton primary.
 *
 * Seule différence structurelle : on prend `icon: LucideIcon` direct
 * (pas de `iconKey`) parce que ce composant est utilisé sur 2 pages
 * uniquement, avec données inline. Pas besoin de la couche d'indirection
 * iconKey qui sert au fichier `data/prestations.ts`.
 *
 * Server Component pur.
 */
export function Bridges({ bridges }: Props) {
  return (
    <section
      aria-labelledby="qui-suis-je-bridges-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <Reveal>
          <h2
            id="qui-suis-je-bridges-titre"
            className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900 text-center text-balance"
          >
            Pour aller plus loin
          </h2>
        </Reveal>

        {/* ─── Mobile (< md) : liste éditoriale ────────────── */}
        <Stagger
          as="ul"
          trigger="inView"
          staggerChildren={0.06}
          className="mt-12 md:hidden border-y border-warm-700/15"
        >
          {bridges.map(({ href, title, description }, i) => (
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
                  "focus-visible:outline-none",
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

        {/* ─── md+ : grille de cards glass watermark ──────── */}
        {/*
          Cards statiques, contenu interne animé via Reveal (pattern
          identique à Specialites / FaisonsConnaissance). Évite le flash
          du backdrop-filter qui perd son watermark sibling pendant
          un transform sur le <li>.
        */}
        <ul
          className={[
            "hidden md:grid mt-14 lg:mt-16 gap-6 lg:gap-8 mx-auto",
            bridges.length === 1
              ? "max-w-md"
              : bridges.length === 2
                ? "md:grid-cols-2 max-w-4xl"
                : "md:grid-cols-3",
          ].join(" ")}
        >
          {bridges.map(({ href, icon: Icon, title, description, ctaLabel }, i) => (
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
      </div>
    </section>
  );
}
