import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
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
    alt: "Sculpture décorative \u00AB\u00A0Alhamdulillah\u00A0\u00BB posée dans le cabinet",
  },
] as const;

/**
 * Carousel — bandeau plein écran de photos du cabinet en défilement
 * infini. Cards en portrait (ratio 3/4) pour matcher les photos source.
 *
 * Breakage volontaire du max-w-7xl : la section n'a pas de container
 * borné — elle occupe la pleine largeur du viewport. `overflow-hidden`
 * sur le wrapper pour clipper les cards qui sortent du cadre.
 *
 * Tailles responsive :
 *   - mobile : 180×240 (ratio 3/4)
 *   - desktop : 270×360 (ratio 3/4)
 *
 * Les 4 premières images ont `priority` pour améliorer le LCP ; les
 * autres restent lazy. `sizes` suit les breakpoints pour que next/image
 * serve la bonne variante (les photos source font 900×1200).
 *
 * `pauseOnHover` désactivé : sur un bandeau ambiant passif, couper
 * l'animation au survol casserait l'effet recherché.
 *
 * Server Component — animation 100 % CSS via `@utility animate-marquee`.
 */
export function Carousel() {
  return (
    <section
      aria-label="Photos du cabinet"
      className="relative py-8 lg:py-14 overflow-hidden"
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
        {cabinetPhotos.map((photo, i) => (
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
              priority={i < 4}
            />
          </div>
        ))}
      </Marquee>
      </Reveal>
    </section>
  );
}
