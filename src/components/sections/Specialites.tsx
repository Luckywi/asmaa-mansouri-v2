import { Flower2, ScanSearch, Sunrise, Wind } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";

/**
 * Données des 3 buckets affichés en cards. Inlinés ici parce que cette
 * section est l'unique consommateur. Si on les réutilise ailleurs (page
 * /specialites Phase 2, footer, etc.), on extraira vers
 * `src/data/specialites.ts` avec un type partagé dans `src/types`.
 *
 * Chaque bucket regroupe plusieurs des tags individuels du Hero pour
 * offrir une lecture macro de l'expertise d'Asmaa.
 */
const specialitesBuckets = [
  {
    icon: Flower2,
    title: "Déséquilibres hormonaux",
    description:
      "SOPK, endométriose, cycles irréguliers, fertilité. Un accompagnement ciblé pour rééquilibrer naturellement le terrain hormonal et apaiser les symptômes au quotidien.",
  },
  {
    icon: Wind,
    title: "Stress chronique & fatigue",
    description:
      "Burn-out, troubles du sommeil, charge mentale, anxiété. Des protocoles personnalisés pour retrouver énergie, sérénité et clarté.",
  },
  {
    icon: Sunrise,
    title: "Périodes de transition",
    description:
      "Post-partum, périménopause, ménopause. Un soutien sur mesure pour traverser sereinement les grandes étapes de la vie de femme.",
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
        <div className="text-center max-w-3xl mx-auto">
          <h2
            id="specialites-titre"
            className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-vert-900"
          >
            Ce que j&apos;accompagne
          </h2>
          <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-vert-700">
            Trois grands axes d&apos;accompagnement reliés par une même
            approche holistique : rééquilibrer le terrain hormonal, apaiser
            le stress chronique et traverser sereinement les transitions de
            vie.
          </p>
        </div>

        {/* ─── Grid de 3 cards glass ───────────────────────── */}
        <ul className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {specialitesBuckets.map(({ icon: Icon, title, description }) => (
            <li
              key={title}
              className="group relative flex flex-col rounded-md overflow-hidden"
            >
              {/*
                COUCHE 1 — Icône géante en background.
                Absolute, fills the <li>. La preserveAspectRatio par défaut
                (xMidYMid meet) garde le ratio 1:1 et centre l'icône.

                Couleur vert-700 à 50% (couleur bouton, recette filigrane
                commune avec le LogoMark de PrestationsSelector). vert-700
                étant plus foncé que vert-500, le /50 compense le delta
                de lightness pour garder le même poids visuel qu'avant —
                tout en alignant la couleur sur celle des CTA primary
                pour la cohérence identitaire. Le backdrop-blur-xl de la
                card glass posée par-dessus fait le softening final.
              */}
              <Icon
                aria-hidden="true"
                className="absolute inset-0 w-full h-full text-vert-700/50 pointer-events-none"
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
                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(11,40,28,0.04),0_4px_16px_-6px_rgba(11,40,28,0.15)]",
                  // Hover : on densifie légèrement la bordure et le glass
                  "group-hover:border-white/70",
                  "transition-colors duration-200 ease-out",
                ].join(" ")}
              >
                {/* Title row — icône + titre sur la MÊME ligne */}
                <div className="flex items-center gap-3">
                  <Icon
                    aria-hidden="true"
                    className="w-7 h-7 text-vert-700 shrink-0"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-display text-xl lg:text-2xl font-medium tracking-tight text-vert-900">
                    {title}
                  </h3>
                </div>

                <p className="mt-4 font-body text-base leading-relaxed text-vert-700">
                  {description}
                </p>

                {/*
                  Bouton "En savoir plus" — `mt-auto` le pousse en bas du
                  flex column, ce qui aligne les 3 boutons verticalement
                  même si les descriptions ont des longueurs différentes.
                */}
                <div className="mt-auto pt-6">
                  <ButtonLink href="/specialites" variant="primary">
                    En savoir plus
                    <ScanSearch
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
