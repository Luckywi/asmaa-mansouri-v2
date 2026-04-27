import {
  Flower2,
  GalleryVerticalEnd,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { BridgesGrid, type BridgeItem } from "@/components/ui/BridgesGrid";
import { site } from "@/data/site";

/**
 * AllerPlusLoin — section finale de /cabinet.
 *
 * Architecture en 2 blocs :
 *   1. Header centré (H2 + sous-titre + CTA primary Resalib) — pose
 *      l'invitation conversationnelle et l'action de conversion à
 *      portée de clic, sans avoir à scroller jusqu'aux cards.
 *   2. `BridgesGrid` — 3 cibles (Spécialités / Prestations / Ateliers)
 *      rendues en grille desktop + liste éditoriale mobile.
 *
 * Server Component pur — aucun state, aucun JS shipé.
 */

const items: readonly BridgeItem[] = [
  {
    icon: Flower2,
    title: "Mes spécialités",
    description:
      "SOPK, endométriose, fertilité, préménopause et toutes les problématiques de santé féminine que j'accompagne au cabinet.",
    ctaLabel: "Voir les spécialités",
    href: "/specialites",
  },
  {
    icon: GalleryVerticalEnd,
    title: "Mes prestations",
    description:
      "Consultations naturopathie, massage Tuina, cupping-thérapie et accompagnements sur plusieurs mois.",
    ctaLabel: "Voir les prestations",
    href: "/prestations",
  },
  {
    icon: Sparkles,
    title: "Les ateliers",
    description:
      "Ateliers collectifs autour de l'alimentation anti-inflammatoire, du soutien de l'immunité et de la santé féminine au quotidien.",
    ctaLabel: "Découvrir les ateliers",
    href: "/ateliers",
  },
];

export function AllerPlusLoin() {
  return (
    <section
      id="aller-plus-loin"
      aria-labelledby="aller-plus-loin-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* ─── Header centré : H2 + sous-titre + CTA primary ──── */}
        <Reveal as="div" className="text-center max-w-3xl mx-auto">
          <h2
            id="aller-plus-loin-titre"
            className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
          >
            Aller plus loin
          </h2>
          <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
            Spécialités, prestations en cabinet et ateliers collectifs :
            trois manières de poursuivre la découverte.
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

        <BridgesGrid
          items={items}
          mobileClassName="mt-14"
          desktopClassName="mt-14 lg:mt-20"
        />
      </div>
    </section>
  );
}
