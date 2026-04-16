import Link from "next/link";
import {
  ArrowUpRight,
  Eye,
  GalleryVerticalEnd,
  MapPin,
  PhoneCall,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/data/site";

/**
 * AllerPlusLoin — section finale de `/contact`.
 *
 * Même pattern visuel que `cabinet/AllerPlusLoin.tsx` (header centré
 * + CTA primary Resalib + 3 cards en row desktop, liste éditoriale
 * mobile) mais pointe vers 3 cibles cohérentes avec le parcours d'un
 * visiteur qui vient de la page contact :
 *   - /qui-suis-je : pour situer l'accompagnement avant de prendre RDV
 *   - /cabinet     : pour visualiser le lieu
 *   - /ateliers    : pour explorer les formats collectifs
 *
 * Server Component pur — aucun state, aucun JS shipé.
 */

type Step = {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
  readonly ctaLabel: string;
  readonly href: string;
};

const steps: readonly Step[] = [
  {
    icon: UserRound,
    title: "Qui suis-je",
    description:
      "Mon parcours, ma formation en naturopathie et en médecine traditionnelle chinoise, et ma vision de l'accompagnement.",
    ctaLabel: "Faire connaissance",
    href: "/qui-suis-je",
  },
  {
    icon: MapPin,
    title: "Le cabinet",
    description:
      "Découvrir le lieu de consultation, l'accès depuis Lyon, le stationnement et tout ce qui entoure la séance.",
    ctaLabel: "Voir le cabinet",
    href: "/cabinet",
  },
  {
    icon: Sparkles,
    title: "Les ateliers",
    description:
      "Ateliers collectifs autour de l'alimentation anti-inflammatoire, du soutien de l'immunité et de la santé féminine.",
    ctaLabel: "Découvrir les ateliers",
    href: "/ateliers",
  },
] as const;

export function AllerPlusLoin() {
  return (
    <section
      id="aller-plus-loin"
      aria-labelledby="contact-aller-plus-loin-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2
            id="contact-aller-plus-loin-titre"
            className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
          >
            Aller plus loin
          </h2>
          <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
            Découvrir mon parcours, le lieu de consultation et les ateliers
            que j&apos;anime en parallèle du cabinet.
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

        <ul className="mt-14 md:hidden border-y border-warm-700/15">
          {steps.map(({ title, description, href }, i) => (
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

        <ul className="hidden md:grid mt-14 lg:mt-20 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map(({ icon: Icon, title, description, ctaLabel, href }) => (
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
