import Link from "next/link";
import {
  ArrowUpRight,
  Flower2,
  GalleryVerticalEnd,
  MapPin,
  PhoneCall,
  Eye,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/data/site";

/**
 * 3 bridges de maillage interne pour prolonger la visite après /qui-suis-je.
 *
 * Chaque bridge pointe directement vers sa page dédiée. Inlinés ici parce
 * que cette section est l'unique consommatrice de ces bridges. Si on les
 * réutilise ailleurs (page /prestations, etc.), extraire vers
 * `src/data/bridges.ts`.
 */
const bridges = [
  {
    icon: Flower2,
    title: "Mes spécialités",
    description:
      "Déséquilibres hormonaux, troubles digestifs et transitions de vie.",
    ctaLabel: "Voir les spécialités",
    href: "/specialites",
  },
  {
    icon: MapPin,
    title: "Mon cabinet",
    description:
      "À Décines-Charpieu, à quelques minutes de Lyon. Consultations en cabinet ou en visio.",
    ctaLabel: "Voir le cabinet",
    href: "/cabinet",
  },
  {
    icon: GalleryVerticalEnd,
    title: "Mes prestations",
    description:
      "Consultations, massages Tuina, cupping therapy, accompagnement sur trois mois.",
    ctaLabel: "Voir les prestations",
    href: "/prestations",
  },
] as const;

/**
 * FaisonsConnaissance — section de clôture de /qui-suis-je.
 *
 * Architecture alignée sur `/cabinet/AllerPlusLoin` :
 *
 *   1. Header centré : H2 + subtitle + CTA primary Resalib.
 *   2. Liste 3 bridges (Spécialités / Cabinet / Prestations) en rendu
 *      adaptatif :
 *        - Mobile (< md) : liste éditoriale hairline warm-700/15 avec
 *          ArrowUpRight en diagonale au hover.
 *        - md+ : grid 3 cards glass watermark + header icône + CTA
 *          primary.
 *
 * Server Component pur.
 */
export function FaisonsConnaissance() {
  return (
    <section
      id="faisons-connaissance"
      aria-labelledby="faisons-connaissance-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* ─── Header centré : H2 + subtitle + CTA primary ────── */}
        <div className="text-center max-w-3xl mx-auto">
          <h2
            id="faisons-connaissance-titre"
            className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
          >
            Faisons connaissance
          </h2>
          <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
            Un premier échange pour poser vos questions et voir si nous pouvons
            avancer ensemble.
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
        </div>

        {/* ─── Mobile (< md) : liste éditoriale ───────────────── */}
        <ul className="mt-14 md:hidden border-y border-warm-700/15">
          {bridges.map(({ title, description, href }, i) => (
            <li
              key={title}
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

        {/* ─── md+ : 3 cards glass watermark ──────────────────── */}
        <ul className="hidden md:grid mt-14 lg:mt-20 md:grid-cols-3 gap-6 lg:gap-8">
          {bridges.map(({ icon: Icon, title, description, ctaLabel, href }) => (
            <li
              key={title}
              className="group relative flex flex-col rounded-md overflow-hidden"
            >
              {/* Couche 1 — icône watermark */}
              <Icon
                aria-hidden="true"
                className="absolute inset-0 w-full h-full text-warm-700/50 pointer-events-none"
                strokeWidth={2}
              />

              {/* Couche 2 — card glass */}
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
          ))}
        </ul>
      </div>
    </section>
  );
}
