import {
  GalleryVerticalEnd,
  MapPin,
  PhoneCall,
  UserRound,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { BridgesGrid, type BridgeItem } from "@/components/ui/BridgesGrid";
import { site } from "@/data/site";

/**
 * AllerPlusLoin — section finale de `/temoignages`.
 *
 * Même pattern que `cabinet/AllerPlusLoin.tsx` et
 * `contact/AllerPlusLoin.tsx` (header centré + CTA primary Resalib + 3
 * cards desktop, liste éditoriale mobile). Bridges adaptés au parcours
 * d'un visiteur qui vient de lire les avis : on l'oriente vers les
 * pages d'action (prestations / cabinet / qui-suis-je).
 *
 * Server Component pur — aucun state, aucun JS shipé.
 */

const items: readonly BridgeItem[] = [
  {
    icon: GalleryVerticalEnd,
    title: "Mes prestations",
    description:
      "Consultations naturopathie, massage Tuina, cupping-thérapie et accompagnements sur plusieurs mois.",
    ctaLabel: "Voir les prestations",
    href: "/prestations",
  },
  {
    icon: MapPin,
    title: "Mon cabinet",
    description:
      "Le lieu de consultation à Décines-Charpieu, l'accès depuis Lyon, le stationnement et tout ce qui entoure la séance.",
    ctaLabel: "Voir le cabinet",
    href: "/cabinet",
  },
  {
    icon: UserRound,
    title: "Qui suis-je",
    description:
      "Mon parcours, ma formation en naturopathie et en médecine traditionnelle chinoise, et ma vision de l'accompagnement.",
    ctaLabel: "Faire connaissance",
    href: "/qui-suis-je",
  },
];

export function AllerPlusLoin() {
  return (
    <section
      id="aller-plus-loin"
      aria-labelledby="temoignages-aller-plus-loin-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <Reveal as="div" className="text-center max-w-3xl mx-auto">
          <h2
            id="temoignages-aller-plus-loin-titre"
            className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
          >
            Aller plus loin
          </h2>
          <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
            Après ces retours, voici les pages qui aident à passer à
            l&apos;action : découvrir les prestations, visiter le cabinet ou
            faire connaissance.
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
