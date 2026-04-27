import { MapPin, PhoneCall, Sparkles, UserRound } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { BridgesGrid, type BridgeItem } from "@/components/ui/BridgesGrid";
import { site } from "@/data/site";

/**
 * AllerPlusLoin — section finale de `/contact`.
 *
 * Même pattern visuel que `cabinet/AllerPlusLoin.tsx` (header centré
 * + CTA primary Resalib + 3 cards desktop, liste éditoriale mobile)
 * mais pointe vers 3 cibles cohérentes avec le parcours d'un visiteur
 * qui vient de la page contact :
 *   - /qui-suis-je : pour situer l'accompagnement avant de prendre RDV
 *   - /cabinet     : pour visualiser le lieu
 *   - /ateliers    : pour explorer les formats collectifs
 *
 * Server Component pur — aucun state, aucun JS shipé.
 */

const items: readonly BridgeItem[] = [
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
];

export function AllerPlusLoin() {
  return (
    <section
      id="aller-plus-loin"
      aria-labelledby="contact-aller-plus-loin-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <Reveal as="div" className="text-center max-w-3xl mx-auto">
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
