import Link from "next/link";
import { ArrowUpRight, Flame, Flower2, Leaf, ScanSearch, Wind } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const specialitesBuckets = [
  {
    icon: Flower2,
    href: "/specialites/desequilibres-hormonaux",
    title: "Déséquilibres hormonaux",
    // Première mention de SOPK dans le texte de la landing : balisée
    // <abbr> avec l'expansion complète pour l'accessibilité (lecteurs
    // d'écran) et le SEO (signal sémantique). Les occurrences suivantes
    // sur le site sont laissées en clair pour éviter les soulignés
    // pointillés répétés.
    description: (
      <>
        <abbr title="Syndrome des ovaires polykystiques">SOPK</abbr>,
        endométriose, SPM, cycles irréguliers, fertilité, post-partum,
        préménopause. Un accompagnement pour rééquilibrer le terrain
        hormonal à chaque étape.
      </>
    ),
  },
  {
    icon: Flame,
    href: "/specialites/troubles-digestifs",
    title: "Troubles digestifs",
    description:
      "Ballonnements, reflux, intestin irritable, transit perturbé, fatigue après les repas. Un travail de fond sur le terrain digestif pour retrouver un confort durable.",
  },
  {
    icon: Wind,
    href: "/specialites/stress-burn-out",
    title: "Stress & burn-out",
    description:
      "Fatigue chronique, sommeil perturbé, charge mentale saturée, tensions accumulées. Un accompagnement pour restaurer l'énergie et renouer avec ses propres besoins.",
  },
  {
    icon: Leaf,
    href: "/specialites/allergies-saisonnieres",
    title: "Allergies saisonnières",
    description:
      "Rhinite, sinusite, maux de tête liés aux pollens, fatigue saisonnière. Un travail en amont de la saison pour rééquilibrer le terrain allergique.",
  },
] as const;

/**
 * Specialites — section "Ce que j'accompagne" sur la landing.
 *
 * Layout :
 *   - Bloc titre + intro centré, max-w-3xl
 *   - Grid de 3 cards en md+ (md:grid-cols-3), stack vertical en mobile
 *   - CTA secondary "Découvrir toutes les spécialités" centré sous les cards
 *
 * Chaque card est une `<li>` qui contient deux couches superposées :
 *
 *   1. **Une icône géante en background**, positionnée en absolute, qui
 *      remplit le `<li>` (`w-full h-full`) avec une opacité très basse.
 *      Cette icône est la même que celle de la card (Flower2 / Wind /
 *      Sunrise), mais en version "watermark" derrière le contenu.
 *
 *   2. **La carte glass elle-même**, par-dessus, qui utilise la même
 *      recette de glass effect que le Header (backdrop-blur-xl,
 *      backdrop-saturate, bg `--glass-bg`, border 0.5px Apple Retina,
 *      shadow 4-layers). Le `backdrop-filter: blur` capte l'icône
 *      derrière (qui est dans le même stacking context) et la floute,
 *      ce qui produit l'effet "ghost icon flouté en transparence".
 *
 * À l'intérieur du contenu glass :
 *   - Title row : icône (taille normale, lucide stroke 1.5) + H3 alignés
 *     sur la **même ligne** via flex items-center
 *   - Description en dessous
 *   - Bouton "En savoir plus" (variant secondary) aligné en bas via
 *     `mt-auto` pour que les 3 boutons s'alignent verticalement quelle
 *     que soit la longueur des descriptions.
 *
 * Tous les boutons "En savoir plus" + le CTA global pointent vers
 * `/specialites` (futureHref de navigation.ts) — la page n'existe pas
 * encore Phase 2, donc 404 en dev. C'est le pattern qu'on utilise déjà
 * ailleurs (Presentation → /qui-suis-je) pour pré-câbler les routes
 * futures sans bloquer.
 *
 * Pas de background propre sur la section — elle est transparente et
 * hérite du body, conforme à la règle de cohérence du projet.
 *
 * Server Component pur — aucun state, aucune interactivité.
 */
export function Specialites() {
  return (
    <section
      id="specialites"
      aria-labelledby="specialites-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* ─── Titre + intro centrés ───────────────────────── */}
        <Reveal as="div" className="text-center max-w-3xl mx-auto">
          <h2
            id="specialites-titre"
            className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
          >
            Ce que j&apos;accompagne
          </h2>
          <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
            Quatre spécialités reliées par une même approche&nbsp;:
            comprendre le terrain, identifier les causes profondes et
            accompagner chaque femme vers un équilibre durable.
          </p>
        </Reveal>

        {/* ─── Mobile (< md) : liste éditoriale ─────────────
            Pattern repris de cabinet/AllerPlusLoin et des bridges
            /prestations : hairlines warm-700/15, gros titre display,
            description, ArrowUpRight qui glisse au hover. Pas de
            glass, pas d'icône watermark, pas de bouton chrome. */}
        <Stagger
          as="ul"
          trigger="inView"
          staggerChildren={0.06}
          className="mt-12 md:hidden border-y border-warm-700/15"
        >
          {specialitesBuckets.map(({ title, description, href }, i) => (
            <StaggerItem
              key={title}
              as="li"
              className={i > 0 ? "border-t border-warm-700/15" : ""}
            >
              <Link
                href={href}
                className={[
                  "group relative flex items-center gap-6",
                  "py-7",
                  "transition-colors duration-200 ease-out",
                  "hover:text-warm-900",
                  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
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
            </StaggerItem>
          ))}
        </Stagger>

        {/* ─── md+ : grid de 3 cards glass watermark ──────── */}
        {/*
          Règle forte sur cette grille : **la card reste complètement
          statique**. On n'anime ni le `<li>`, ni le watermark, ni le
          glass div. Seul le contenu *à l'intérieur* du glass est
          animé via un `<Reveal>`.
          Raison : toute animation (translation *ou* opacité) sur le
          `<li>` ou son glass provoque un flash visuel. Soit le
          navigateur promeut la card en compositor layer et le
          backdrop-filter perd temporairement le watermark sibling,
          soit le backdrop-filter met une frame à s'initialiser au
          passage opacité 0 → 1 et l'icône apparaît "nue" une fraction
          de seconde.
          En gardant la card statique, glass et watermark sont peints
          ensemble dès le premier rendu, parfaitement stables. Le
          contenu interne (titre, description, CTA) cascade via Reveal
          avec un délai croissant par card pour l'effet stagger.
        */}
        <ul className="hidden md:grid mt-16 lg:mt-20 md:grid-cols-2 gap-6 lg:gap-8">
          {specialitesBuckets.map(({ icon: Icon, title, description, href }, i) => (
            <li
              key={title}
              className="group relative flex flex-col rounded-md overflow-hidden"
            >
              {/*
                COUCHE 1 — Icône géante en background.
                Absolute, fills the <li>. La preserveAspectRatio par défaut
                (xMidYMid meet) garde le ratio 1:1 et centre l'icône.

                Couleur warm-700 à 50% (couleur bouton, recette filigrane
                commune avec le LogoMark de PrestationsSelector). warm-700
                étant plus foncé que warm-500, le /50 compense le delta
                de lightness pour garder le même poids visuel qu'avant —
                tout en alignant la couleur sur celle des CTA primary
                pour la cohérence identitaire. Le backdrop-blur-xl de la
                card glass posée par-dessus fait le softening final.
              */}
              <Icon
                aria-hidden="true"
                className="absolute inset-0 w-full h-full text-warm-700/50 pointer-events-none"
                strokeWidth={2}
              />

              {/*
                COUCHE 2 — Card glass par-dessus.
                Recette glass copiée du Header (avec un shadow allégé
                puisque les cards ne flottent pas comme la pill du Header).
                `flex-1 flex flex-col` pour que la card remplisse toute la
                hauteur du <li> (que CSS Grid stretche à la row height),
                ce qui permet à `mt-auto` sur le bouton de l'aligner en bas.
              */}
              <div
                className={[
                  "relative flex-1 flex flex-col",
                  "p-6 lg:p-8",
                  // Glass effect (recette Header, voir Header.tsx)
                  "bg-[var(--glass-bg)]",
                  "backdrop-blur-xl backdrop-saturate-[1.8]",
                  "border-[0.5px] border-white/50",
                  // Shadow allégée (cards posées, pas flottantes comme la pill du Header)
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                  // Hover : on densifie légèrement la bordure et le glass
                  "group-hover:border-white/70",
                  "transition-colors duration-200 ease-out",
                ].join(" ")}
              >
                {/*
                  Contenu interne animé — la card, l'icône watermark et
                  le glass restent statiques. Le Reveal est placé *à
                  l'intérieur* du glass donc son transform ne promeut
                  jamais la card en compositor layer : backdrop-filter
                  stable pendant toute l'animation. Délai croissant par
                  card (i * 0.08s) pour reproduire l'effet stagger.
                */}
                <Reveal delay={i * 0.08} className="flex flex-col flex-1">
                  {/* Title row — icône + titre sur la MÊME ligne */}
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

                  {/*
                    Bouton "En savoir plus" — `mt-auto` le pousse en bas du
                    flex column, ce qui aligne les 3 boutons verticalement
                    même si les descriptions ont des longueurs différentes.
                  */}
                  <div className="mt-auto pt-6">
                    <ButtonLink href={href} variant="primary">
                      En savoir plus
                      <ScanSearch
                        aria-hidden="true"
                        className="w-4 h-4"
                        strokeWidth={1.5}
                      />
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
