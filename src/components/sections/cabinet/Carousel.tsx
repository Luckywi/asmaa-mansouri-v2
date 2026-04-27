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
    alt: "Sculpture décorative « Alhamdulillah » posée dans le cabinet",
  },
] as const;

/**
 * Carousel — bandeau plein écran de photos du cabinet en défilement
 * infini. Cards en portrait (ratio 3/4) pour matcher les photos source.
 *
 * Tailles responsive (réduites pour ne pas dominer le LCP) :
 *   - mobile : 140×186 (ratio 3/4)
 *   - desktop : 240×320 (ratio 3/4)
 *
 * Mesure réelle Next 16 : la **première image carousel** est détectée
 * comme LCP de la page /cabinet (le H1 du Hero arrive plus tard à
 * cause de l'AnimatePresence qui swap le keyword). On passe donc
 * `priority` sur l'index 0 et on garde `loading="lazy"` sur les autres.
 * `sizes` suit les breakpoints pour que next/image serve la bonne
 * variante (sources 900×1200), `quality={50}` pour réduire le poids
 * transféré sans perte visuelle perceptible aux dimensions cards.
 *
 * `pauseOnHover` désactivé : sur un bandeau ambiant passif, couper
 * l'animation au survol casserait l'effet recherché.
 *
 * Pause hors viewport : un IntersectionObserver pose
 * `data-marquee-paused="true"` sur la section quand elle sort du viewport,
 * ce qui pause l'animation CSS via une règle dans globals.css. Le but
 * n'est pas l'effet visuel mais de libérer le compositor (le marquee
 * recompose 60fps en permanence sinon, et plombe la fluidité du reste
 * de la page — scroll, clics, navigation).
 */
export function Carousel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((e) => e.isIntersecting);
        setPaused(!inView);
      },
      { rootMargin: "200px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Photos du cabinet"
      data-marquee-paused={paused ? "true" : "false"}
      className="relative py-8 lg:py-14 overflow-hidden [content-visibility:auto] [contain-intrinsic-size:auto_400px]"
    >
      {/*
        Reveal en opacité pure (y={0}) sur le marquee : le scroll
        horizontal infini est piloté par une CSS `@keyframes translateX`
        sur la track interne. Ajouter un translateY parent créerait deux
        transforms concurrents sur le même axe compositor et pourrait
        saccader le défilement. Un simple fade à l'apparition reste
        discret et compatible.
      */}
      <Reveal y={0} duration={0.7}>
      <Marquee
        className="[--gap:0.75rem] md:[--gap:1rem] [--duration:70s]"
        repeat={2}
      >
        {cabinetPhotos.map((photo, i) => {
          const isLCP = i === 0;
          return (
            <div
              key={photo.src}
              className={[
                "relative shrink-0 overflow-hidden rounded-md",
                "w-[140px] h-[186px] md:w-[240px] md:h-[320px]",
                "border border-warm-700/15",
              ].join(" ")}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 240px, 140px"
                quality={50}
                {...(isLCP
                  ? { priority: true }
                  : { loading: "lazy" as const })}
              />
            </div>
          );
        })}
      </Marquee>
      </Reveal>
    </section>
  );
}
