import Link from "next/link";
import {
  ArrowUpRight,
  CircleDot,
  Eye,
  Flower2,
  GalleryVerticalEnd,
  HandHeart,
  HeartHandshake,
  MapPin,
  MessageCircle,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { PrestationBridge } from "@/types";

/**
 * Mapping iconKey → composant lucide, pour sérializer les icônes dans
 * la data (`src/data/prestations.ts`). Les données restent pures
 * JSON-like, le composant résout l'icône au render.
 */
const iconMap: Record<PrestationBridge["iconKey"], LucideIcon> = {
  user: UserRound,
  flower: Flower2,
  map: MapPin,
  gallery: GalleryVerticalEnd,
  massage: HandHeart,
  cupping: CircleDot,
  heart: HeartHandshake,
  message: MessageCircle,
};

type BridgesProps = {
  /** Les 3 bridges à afficher (ordre préservé) */
  bridges: readonly PrestationBridge[];
};

/**
 * Section de maillage interne bas de page slug.
 *
 * Pattern repris de /qui-suis-je/FaisonsConnaissance : 3 cards en grid,
 * chacune avec icône watermark + icône header + titre + description +
 * CTA primary "Voir ...". La variation vient de la data (chaque page
 * slug pointe vers des combinaisons différentes de cibles).
 *
 * Server Component pur.
 */
export function Bridges({ bridges }: BridgesProps) {
  return (
    <section
      aria-labelledby="prestation-bridges-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <h2
          id="prestation-bridges-titre"
          className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900 text-center text-balance"
        >
          Pour aller plus loin
        </h2>

        {/* ─── Mobile (< md) : liste éditoriale ─────────────
            Pattern unifié avec /cabinet/AllerPlusLoin et la
            section Specialites de la landing : hairlines
            warm-700/15, gros titre display, description,
            ArrowUpRight qui glisse au hover. */}
        <ul className="mt-12 md:hidden border-y border-warm-700/15">
          {bridges.map(({ href, title, description }, i) => (
            <li
              key={href}
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
            </li>
          ))}
        </ul>

        {/* ─── md+ : grille de cards glass watermark ──────── */}
        <ul
          className={[
            "hidden md:grid mt-14 lg:mt-16 gap-6 lg:gap-8 mx-auto",
            // Adaptation de la grille au nombre de bridges (1, 2 ou 3)
            // pour que les cards prennent une largeur cohérente sans
            // s'étaler sur une grille à 3 colonnes à moitié vide.
            bridges.length === 1
              ? "max-w-md"
              : bridges.length === 2
                ? "md:grid-cols-2 max-w-4xl"
                : "md:grid-cols-3",
          ].join(" ")}
        >
          {bridges.map(({ href, iconKey, title, description, ctaLabel }) => {
            const Icon = iconMap[iconKey];
            return (
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
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
