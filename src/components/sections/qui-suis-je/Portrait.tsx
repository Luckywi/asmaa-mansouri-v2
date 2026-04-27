"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

/**
 * 3 photos d'Asmaa affichées en "deck de cartes" empilé. Hébergées dans
 * `public/qui-suis-je/` sous `portrait-1|2|3.jpg` (JPG q72, 1200×1600,
 * ~365-470 KB chacune). Vercel ré-optimise à la volée en AVIF/WebP.
 */
const photos = [
  {
    src: "/qui-suis-je/portrait-1.jpg",
    alt: "Asmaa Mansouri, naturopathe, souriante en lumière naturelle",
  },
  {
    src: "/qui-suis-je/portrait-2.jpg",
    alt: "Asmaa Mansouri de profil, dans un décor végétal apaisant",
  },
  {
    src: "/qui-suis-je/portrait-3.jpg",
    alt: "Asmaa Mansouri au travail, livres et plantes médicinales en arrière-plan",
  },
] as const;

/**
 * Tags diplômes / formations affichés sous le titre. Factuels, pas
 * des slogans. Asmaa est diplômée en naturopathie et formée au Tuina ;
 * elle termine actuellement son cursus en médecine traditionnelle
 * chinoise, d'où la formulation "En formation" (conforme au document
 * rédigé par Asmaa).
 */
const tags = [
  "Diplômée en naturopathie",
  "En formation en médecine traditionnelle chinoise",
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
 * **Deck de cartes photo** (colonne droite) : 3 photos absolute dans un
 * container aspect-[3/4]. Leur transform (rotate + translate + scale)
 * dépend de leur `stackPos` relatif à l'activeIndex (cf. stackVariants).
 * Click sur n'importe quelle carte la porte au-dessus — framer-motion
 * anime automatiquement la transition.
 *
 * Auto-advance toutes les 6 s. Le click reset le cycle via la dep
 * [activeIndex] du useEffect.
 *
 * **Colonne gauche** : H2 "Asmaa Mansouri" + 3 tags (diplômes et
 * formations en cours) + récit narratif issu du document rédigé par
 * Asmaa, filtré anti-slop et structuré en 4 H3 (Mon histoire / La
 * transmission / Le chemin / Pourquoi les femmes). La section "Ma
 * philosophie" du document source est omise volontairement : les 3
 * citations qu'elle contenait vivent déjà une fois chacune sur les
 * sous-pages (/la-naturopathie, /medecines-ancestrales,
 * /specialites/desequilibres-hormonaux), accessibles via les cards
 * Exploration positionnées sous ce Portrait.
 *
 * Client Component obligatoire — useState + useEffect pour le deck.
 */
export function Portrait() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [activeIndex, prefersReducedMotion]);

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
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-[52px] lg:gap-[70px] lg:items-stretch">
          {/* ─── Colonne gauche : titre + tags + description ── */}
          <Reveal as="div" className="order-2 lg:order-1 text-center lg:text-left">
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

            {/*
              Récit narratif issu du document rédigé par Asmaa (section
              "Qui suis-je"). Filtré anti-slop : em dashes convertis en
              virgules/deux-points, triplets AI-typiques supprimés,
              tournures mystiques ("le hasard n'existe pas") retirées.
              Section "Ma philosophie" (3 citations) volontairement
              omise : les citations vivent déjà sur les sous-pages
              /la-naturopathie, /medecines-ancestrales et
              /specialites/desequilibres-hormonaux, une seule occurrence
              par citation pour éviter les doublons.

              Quatre H3 structurent la lecture (l'Asmaa Mansouri H2 reste
              le titre maître). Les <div> assurent un rythme vertical
              `mt-10` entre les blocs tandis que les <p> à l'intérieur
              d'un bloc respirent en `mt-5`.
            */}
            <div className="mt-10 font-body text-base lg:text-lg leading-relaxed text-warm-700 text-left">
              {/* ── Mon histoire ── */}
              <div>
                <h3 className="font-display text-xl lg:text-2xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900">
                  Mon histoire
                </h3>
                <p className="mt-5">
                  Tout a commencé par un détour, ou plutôt par un chemin qui
                  était le mien sans que je le sache encore.
                </p>
                <p className="mt-5">
                  Jeune, j&apos;ai entrepris des études de médecine. Le désir
                  de soigner était là, sincère et entier. Mais c&apos;est
                  lors d&apos;un stage hospitalier que tout a basculé. Je me
                  suis retrouvée à travailler dans un bloc opératoire, face
                  à une situation que je n&apos;oublierai jamais&nbsp;: une
                  jeune fille de 16 ans, une vie qui s&apos;est éteinte
                  cette nuit-là.
                </p>
                <p className="mt-5">
                  J&apos;ai ressenti ce soir-là une impuissance profonde,
                  essentielle. Je ne voulais pas intervenir à ce stade du
                  parcours d&apos;une personne. Je voulais être là avant,
                  bien avant, dans la prévention, dans l&apos;accompagnement,
                  dans ce moment encore possible où l&apos;on peut changer
                  quelque chose. Cette nuit-là a dessiné, sans que je
                  m&apos;en rende compte, toute la direction de ma vie
                  professionnelle.
                </p>
              </div>

              {/* ── La transmission ── */}
              <div className="mt-10">
                <h3 className="font-display text-xl lg:text-2xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900">
                  La transmission
                </h3>
                <p className="mt-5">
                  Je suis issue d&apos;une famille où la santé naturelle
                  n&apos;était pas un concept, c&apos;était un quotidien. Mon
                  père, profondément ancré dans la médecine prophétique,
                  m&apos;a transmis dès l&apos;enfance cet art de prendre
                  soin de soi selon les enseignements du Prophète.
                  L&apos;odeur du miel, de la nigelle, de l&apos;encens
                  naturel&nbsp;: ces trésors ont bercé mon enfance. Il est
                  également commerçant de ces produits naturels, et
                  c&apos;est dans cette atmosphère que j&apos;ai grandi,
                  avec le corps perçu comme un dépôt sacré et la guérison
                  comme un acte de foi autant que de raison.
                </p>
              </div>

              {/* ── Le chemin ── */}
              <div className="mt-10">
                <h3 className="font-display text-xl lg:text-2xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900">
                  Le chemin
                </h3>
                <p className="mt-5">
                  Je me suis mariée et j&apos;ai eu quatre enfants.
                  C&apos;est pour eux, d&apos;abord, que j&apos;ai
                  approfondi ma démarche naturopathique, avec le désir de
                  leur transmettre le meilleur en matière de santé. Quatre
                  naissances naturelles, quatre allaitements. Mes enfants
                  ont rarement eu besoin de consulter un pédiatre en
                  dehors du suivi habituel, non par dogmatisme, mais parce
                  que les bons gestes au quotidien, appliqués tôt et avec
                  constance, font une différence réelle.
                </p>
                <p className="mt-5">
                  Je suis naturopathe formée et certifiée, et je termine
                  actuellement mon cursus en médecine traditionnelle
                  chinoise pour enrichir ma démarche d&apos;une vision
                  énergétique complète.
                </p>
              </div>

              {/* ── Pourquoi les femmes ── */}
              <div className="mt-10">
                <h3 className="font-display text-xl lg:text-2xl font-medium tracking-[-0.01em] leading-[1.2] text-warm-900">
                  Pourquoi les femmes
                </h3>
                <p className="mt-5">
                  Parce que je suis femme. Parce que j&apos;ai vécu de
                  l&apos;intérieur ce que vivent mes patientes&nbsp;: les
                  cycles, la maternité, la charge mentale, les transitions
                  hormonales, les allergies saisonnières que j&apos;ai
                  moi-même traversées et surmontées grâce à la
                  naturopathie. Mon cabinet est un espace dédié
                  exclusivement aux femmes, parce que c&apos;est là que
                  mon accompagnement peut être le plus juste et le plus
                  utile.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ─── Colonne droite : photos ─────────────────────── */}
          {/*
            Deux rendus selon le breakpoint :
            - < lg : deck empilé auto-advance (comportement d'origine,
              compact pour le mobile où le récit suit dessous).
            - lg+ : stack vertical de 3 photos individuelles qui longe
              le long récit à gauche. Pas d'interactivité, chaque photo
              est autonome et respire le long du texte.

            order-1 en mobile pour que les photos passent au-dessus du
            texte en stack vertical ; order-2 en lg pour revenir en
            colonne droite du split classique.
          */}
          <Reveal as="div" delay={0.1} className="order-1 lg:order-2">
            {/* ── < lg : deck empilé auto-advance ── */}
            <div
              role="region"
              aria-roledescription="carrousel en deck"
              aria-label="Photos d'Asmaa Mansouri"
              className="relative aspect-[3/4] w-full max-w-[260px] mx-auto lg:hidden"
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
                      "shadow-[0_12px_32px_-10px_rgba(60,30,25,0.25),0_2px_6px_-2px_rgba(60,30,25,0.10)]",
                      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-warm-700",
                      isActive ? "cursor-default" : "cursor-pointer",
                    ].join(" ")}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover object-center pointer-events-none"
                      sizes="260px"
                      priority={i === 0}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* ── lg+ : stack vertical de 3 photos individuelles ── */}
            {/*
              `lg:h-full` + `lg:justify-between` : les 3 photos s'étalent
              sur toute la hauteur du grid item droit, qui est étiré à
              la hauteur de la colonne gauche (texte) via `lg:items-stretch`
              sur le grid parent. L'espacement entre les photos s'adapte
              automatiquement à la hauteur du récit : plus le texte est
              long, plus les photos respirent.
            */}
            <ul
              aria-label="Photos d'Asmaa Mansouri"
              className="hidden lg:flex lg:flex-col lg:h-full lg:justify-between"
            >
              {photos.map((photo) => (
                <li
                  key={photo.src}
                  className={[
                    "relative aspect-[3/4] w-full max-w-[300px] mx-auto overflow-hidden rounded-xl",
                    "border-[0.5px] border-warm-900",
                    "shadow-[0_12px_32px_-10px_rgba(60,30,25,0.25),0_2px_6px_-2px_rgba(60,30,25,0.10)]",
                  ].join(" ")}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover object-center"
                    sizes="300px"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
