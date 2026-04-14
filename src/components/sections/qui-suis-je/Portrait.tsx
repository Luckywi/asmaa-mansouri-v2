"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/**
 * 3 photos d'Asmaa affichées en "deck de cartes" empilé. Hébergées dans
 * `public/qui-suis-je/` sous `portrait-1|2|3.png`.
 *
 * ⚠️ PNG sources 34-46 MB (3501×4654 → 4000×6000). `next/image` compresse
 * à la volée en AVIF/WebP à la livraison, donc le front reste léger. En
 * revanche le repo git porte les originaux — envisager une conversion
 * WebP offline avant mise en production.
 */
const photos = [
  {
    src: "/qui-suis-je/portrait-1.png",
    alt: "Portrait d'Asmaa Mansouri, naturopathe — premier plan",
  },
  {
    src: "/qui-suis-je/portrait-2.png",
    alt: "Portrait d'Asmaa Mansouri, naturopathe — second plan",
  },
  {
    src: "/qui-suis-je/portrait-3.png",
    alt: "Portrait d'Asmaa Mansouri, naturopathe — troisième plan",
  },
] as const;

/**
 * 3 tags diplômes / formations affichés sous le titre. Factuels, pas
 * des slogans. Si on doit en ajouter (acupuncture en cours, cupping
 * therapy), extraire vers `src/data/diplomes.ts`.
 */
const tags = [
  "Diplômée en naturopathie",
  "Diplômée en médecine traditionnelle chinoise",
  "Formée au massage Tuina",
] as const;

/**
 * Délai entre deux rotations automatiques de la carte du dessus (ms).
 * Click sur une carte du fond reset le cycle (useEffect dep sur
 * activeIndex).
 */
const AUTO_ADVANCE_MS = 6000;

/**
 * Positions du deck selon la place dans la pile (stackPos) :
 *   0 = carte du dessus (front), visible pleinement
 *   1 = première carte derrière (tilt vers la gauche)
 *   2 = seconde carte derrière (tilt vers la droite, plus bas)
 *
 * Les valeurs d'offset (x/y en %, rotate en deg) sont calibrées pour un
 * container aspect-[3/4]. Le z-index inversé par rapport au stackPos
 * empile visuellement : front = z-30, back = z-10.
 */
const stackVariants = {
  0: { x: "0%", y: "0%", rotate: 0, scale: 1, zIndex: 30 },
  1: { x: "-22%", y: "5%", rotate: -12, scale: 0.9, zIndex: 20 },
  2: { x: "22%", y: "10%", rotate: 12, scale: 0.84, zIndex: 10 },
} as const;

/**
 * Portrait — section "Asmaa Mansouri" juste sous le Hero de /qui-suis-je.
 *
 * **Pattern split classique magazine** :
 *
 *   Desktop (lg+)  ┌──────────┬──────────────────────┐
 *                  │          │  Asmaa Mansouri      │  ← col 5 / col 7
 *                  │  [deck]  │  [tags]              │
 *                  │          │  description…        │
 *                  └──────────┴──────────────────────┘
 *
 *   Mobile         deck empilé au centre, texte en dessous (stack vertical)
 *
 * **Deck de cartes photo** (colonne gauche) : 3 photos absolute dans un
 * container aspect-[3/4]. Leur transform (rotate + translate + scale)
 * dépend de leur `stackPos` relatif à l'activeIndex (cf. stackVariants).
 * Click sur n'importe quelle carte la porte au-dessus — framer-motion
 * anime automatiquement la transition.
 *
 * Auto-advance toutes les 6 s. Le click reset le cycle via la dep
 * [activeIndex] du useEffect.
 *
 * Client Component obligatoire — useState + useEffect.
 */
export function Portrait() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section
      id="portrait"
      aria-labelledby="portrait-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/*
          Split 70/30 via fr units : les fr se partagent la largeur restante
          après gap, donc le ratio 7/3 est exact quel que soit le viewport.
          Colonnes ordonnées order-1/2 pour remonter le deck au-dessus du
          texte en mobile (stack vertical), et l'envoyer à droite en lg.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-[52px] lg:gap-[70px] items-center">
          {/* ─── Colonne gauche : titre + tags + description ── */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h2
              id="portrait-titre"
              className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
            >
              Asmaa Mansouri
            </h2>

            <ul className="mt-6 flex flex-wrap gap-2 lg:gap-3 justify-center lg:justify-start">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className={[
                    "inline-flex items-center rounded-md px-3 py-1.5",
                    // Glass recipe — aligné sur les tags Hero landing
                    "bg-[var(--glass-bg)]",
                    "backdrop-blur-xl backdrop-saturate-[1.8]",
                    "border-[0.5px] border-white/50",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                    "font-body text-xs lg:text-sm font-medium text-warm-700",
                  ].join(" ")}
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-5 font-body text-base lg:text-lg leading-relaxed text-warm-700">
              <p>
                Je suis Asmaa Mansouri, naturopathe à Décines-Charpieu. Mère
                de famille, je ne reçois que des femmes. Cycle, fertilité,
                transitions hormonales, intimité corporelle&nbsp;: ce sont des
                sujets qui demandent un cadre dédié et un temps qui leur sont
                propres.
              </p>
              <p>
                Mon approche s&apos;appuie sur trois pratiques
                complémentaires&nbsp;: la naturopathie (alimentation,
                phytothérapie, hygiène de vie), la médecine traditionnelle
                chinoise et le massage Tuina, que je pratique en cabinet. Je
                me forme actuellement à l&apos;acupuncture.
              </p>
              <p>
                En consultation, je prends le temps d&apos;observer, de
                questionner, de recouper. Je construis ensuite avec vous un
                protocole sur mesure, en cabinet ou en visio.
              </p>
            </div>
          </div>

          {/* ─── Colonne droite : deck de cartes ────────────── */}
          {/*
            order-1 en mobile pour que le deck passe au-dessus du texte en
            stack vertical (lecture visuelle "photo d'abord puis bio") ;
            order-2 en lg pour revenir en colonne droite du split classique.
          */}
          <div className="order-1 lg:order-2">
            <div
              role="region"
              aria-roledescription="carrousel en deck"
              aria-label="Photos d'Asmaa Mansouri"
              className="relative aspect-[3/4] w-full max-w-[260px] lg:max-w-[300px] mx-auto"
            >
              {photos.map((photo, i) => {
                const stackPos = (i - activeIndex + photos.length) % photos.length;
                const variant = stackVariants[stackPos as 0 | 1 | 2];
                const isActive = stackPos === 0;
                return (
                  <motion.button
                    key={photo.src}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-pressed={isActive}
                    aria-label={`Afficher la photo ${i + 1} sur ${photos.length}`}
                    animate={variant}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 24,
                    }}
                    style={{ zIndex: variant.zIndex }}
                    className={[
                      "absolute inset-0 overflow-hidden rounded-xl",
                      "border-[0.5px] border-warm-900",
                      // Shadow alignée sur les cards flottantes du projet
                      "shadow-[0_12px_32px_-10px_rgba(60,30,25,0.25),0_2px_6px_-2px_rgba(60,30,25,0.10)]",
                      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-700",
                      // La carte du dessus n'est pas cliquable en navigation
                      // pointer (pas d'intérêt) ; les cartes du fond gardent
                      // un cursor pointer pour signaler l'affordance "click
                      // pour me porter au-dessus".
                      isActive
                        ? "cursor-default"
                        : "cursor-pointer",
                    ].join(" ")}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover object-center pointer-events-none"
                      sizes="(min-width: 1024px) 300px, 260px"
                      priority={i === 0}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
