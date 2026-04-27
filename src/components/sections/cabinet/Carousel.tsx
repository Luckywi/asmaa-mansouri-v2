"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Photos du cabinet affichées dans le marquee.
 *
 * Shoot professionnel (AtelierHachure) — toutes les photos sont en
 * orientation portrait (ratio ~3/4). Le carousel est donc dimensionné en
 * portrait aussi : cards plus hautes que larges, plus intimistes et
 * cohérentes avec le registre "petit salon feutré" du cabinet.
 *
 * Fichiers stockés dans `/public/caroussel/` (ortographe volontaire côté
 * filesystem — c'est la convention choisie côté projet). Tous optimisés à
 * 1200 px sur le grand côté, JPEG qualité 82, entre 150 et 340 ko.
 */
const cabinetPhotos = [
  {
    src: "/caroussel/cabinet-ensemble.jpg",
    alt: "Vue d'ensemble du cabinet d'Asmaa Mansouri : table de massage, fauteuil et espace accueil",
  },
  {
    src: "/caroussel/cabinet-salon-accueil.jpg",
    alt: "Espace salon d'accueil avec canapés, plante et table basse",
  },
  {
    src: "/caroussel/cabinet-bureau-consultation.jpg",
    alt: "Asmaa prenant des notes au bureau pendant une consultation",
  },
  {
    src: "/caroussel/cabinet-lecture-naturopathie.jpg",
    alt: "Ouvrage de naturopathie ouvert sur le bureau de consultation",
  },
  {
    src: "/caroussel/cabinet-the-tisane.jpg",
    alt: "Préparation d'une tisane avec théière fonte et baies séchées",
  },
  {
    src: "/caroussel/cabinet-ambiance-bougie.jpg",
    alt: "Ambiance du cabinet : bougie allumée, mugs et théière sur tapis en laine",
  },
  {
    src: "/caroussel/cabinet-fleurs-bougie.jpg",
    alt: "Détail décoratif : fleurs et bougie en bois au premier plan, table de massage en arrière-plan",
  },
  {
    src: "/caroussel/cabinet-alhamdulillah.jpg",
    alt: "Sculpture décorative « Alhamdulillah » posée dans le cabinet",
  },
] as const;

/**
 * Carousel — bandeau plein écran de photos du cabinet en défilement
 * infini. Cards en portrait (ratio 3/4) pour matcher les photos source.
 *
 * Gated derrière un IntersectionObserver : tant que la section n'est pas
 * proche du viewport, on ne rend qu'un placeholder à hauteur fixe (même
 * dimensions que les cards) — le H1 du Hero reste l'élément LCP de la
 * page au lieu d'une image carousel partiellement visible. Une fois la
 * section approchée (rootMargin 200 px), le marquee et les 8 photos
 * s'hydrate normalement.
 *
 * Tailles responsive :
 *   - mobile : 180×240 (ratio 3/4)
 *   - desktop : 270×360 (ratio 3/4)
 *
 * `pauseOnHover` désactivé : sur un bandeau ambiant passif, couper
 * l'animation au survol casserait l'effet recherché.
 */
export function Carousel() {
  const ref = useRef<HTMLElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldMount) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldMount(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [shouldMount]);

  return (
    <section
      ref={ref}
      aria-label="Photos du cabinet"
      className="relative py-8 lg:py-14 overflow-hidden"
    >
      {shouldMount ? (
        <Reveal y={0} duration={0.7}>
          <Marquee
            className="[--gap:0.75rem] md:[--gap:1rem] [--duration:70s]"
            repeat={2}
          >
            {cabinetPhotos.map((photo) => (
              <div
                key={photo.src}
                className={[
                  "relative shrink-0 overflow-hidden rounded-md",
                  "w-[180px] h-[240px] md:w-[270px] md:h-[360px]",
                  "border border-warm-700/15",
                ].join(" ")}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 270px, 180px"
                />
              </div>
            ))}
          </Marquee>
        </Reveal>
      ) : (
        <div
          aria-hidden="true"
          className="h-[240px] md:h-[360px]"
        />
      )}
    </section>
  );
}
