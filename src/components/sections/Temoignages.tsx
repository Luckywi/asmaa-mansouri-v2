import { Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GoogleLogo } from "@/components/ui/GoogleLogo";
import { InstagramLogo } from "@/components/ui/InstagramLogo";
import { ResalibLogo } from "@/components/ui/ResalibLogo";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/motion/Reveal";
import { temoignages } from "@/data/temoignages";
import { site } from "@/data/site";
import type { Temoignage } from "@/types";

/**
 * Découpe les témoignages en deux colonnes pour les deux marquees verticaux.
 * Si le nombre est impair, la première colonne en reçoit un de plus.
 */
const halfPoint = Math.ceil(temoignages.length / 2);
const firstColumn = temoignages.slice(0, halfPoint);
const secondColumn = temoignages.slice(halfPoint);

/**
 * ReviewCard — une carte témoignage individuelle.
 *
 * Layout : avatar initiales (cercle warm-500/15) + nom + role en header,
 * puis citation en dessous. Glass effect identique aux cards Specialites
 * pour cohérence visuelle.
 *
 * Sizing — pourquoi `w-full max-w-72` et pas `w-72` :
 *
 *   Une largeur fixe (l'ancienne `w-72` = 288px) provoquait du clipping sur
 *   le côté droit des cards dès que la colonne marquee parente devenait
 *   plus étroite que 288px — typiquement à `lg` desktop quand les 2 marquees
 *   se partagent une colonne droite de ~600px (chaque marquee fait ~290px,
 *   soit déjà en limite). Les cards débordaient et le `overflow-hidden` du
 *   container coupait le texte + les 20px de `p-5` à droite, donnant cette
 *   impression que "le texte touche la bordure".
 *
 *   Maintenant : la card prend `w-full` (toute la largeur disponible dans
 *   le marquee) bornée par `max-w-72` (288px max pour ne pas devenir
 *   absurdement large à xl+ où la colonne marquee gonfle). Le padding
 *   interne reste fixe à `p-5` (20px) pour garder la respiration et le
 *   rythme typo identiques quelle que soit la largeur de card.
 *
 *   Pas de `min-w` : on laisse la card shrinker naturellement sur les
 *   petits viewports (un `min-w` rendrait la card plus large que le
 *   marquee mobile et réintroduirait le clipping).
 */
function ReviewCard({ name, role, body }: Temoignage) {
  return (
    <figure
      className={[
        // Layout — w-full max-w-72 pour responsive sans clipping (cf. JSDoc)
        "flex flex-col gap-3 w-full max-w-72 p-5",
        // Forme : rounded-md du système adaptatif
        "rounded-md",
        // Glass effect (recette Specialites/Header)
        "bg-[var(--glass-bg)]",
        "backdrop-blur-xl backdrop-saturate-[1.8]",
        "border-[0.5px] border-white/50",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
      ].join(" ")}
    >
      {/* Header card : avatar initiale + nom + role */}
      <div className="flex items-center gap-3">
        {/* Avatar initiale (placeholder en attendant vraies photos clientes) */}
        <div
          aria-hidden="true"
          className="w-9 h-9 rounded-full bg-warm-500/15 flex items-center justify-center font-display text-sm font-medium text-warm-700 shrink-0"
        >
          {name.charAt(0)}
        </div>
        <div className="flex flex-col leading-tight">
          <figcaption className="font-display text-sm font-medium text-warm-900">
            {name}
          </figcaption>
          {role && (
            <p className="font-body text-xs text-warm-700/60 mt-0.5">{role}</p>
          )}
        </div>
      </div>

      {/* Citation */}
      <blockquote className="font-body text-sm leading-relaxed text-warm-700">
        {body}
      </blockquote>
    </figure>
  );
}

/**
 * Temoignages — section "Ce qu'elles en disent" sur la landing.
 *
 * Layout responsive :
 *
 *   Mobile / tablette (< lg) — empilé :
 *     1. Bloc texte centré (titre + sous-titre + count souligné)
 *     2. 2 colonnes de marquees verticaux (h-[500px])
 *     3. 2 CTA "Écrire un avis" centrés (Resalib primary, Google secondary)
 *
 *   Desktop (≥ lg) — grille 45/55 (texte / marquees) :
 *
 *     - Grid template `lg:grid-cols-[45fr_55fr]` avec `lg:gap-12` : les
 *       unités `fr` font que le gap est retiré AVANT le calcul des
 *       proportions, donc le ratio 45/55 reste exact entre les 2 colonnes
 *       quelle que soit la largeur du viewport.
 *
 *     - Colonne gauche (45%) : titre + sous-titre + count + 2 CTA empilés,
 *       alignés à gauche, verticalement centrés (order-1)
 *     - Colonne droite (55%) : 2 marquees verticaux côte à côte (order-2),
 *       chaque marquee prend la moitié de la colonne via `flex-1` (sinon
 *       les marquees prendraient leur largeur de contenu et les cards
 *       débordaient — cf. JSDoc de ReviewCard)
 *
 *     Pourquoi 45/55 et pas 50/50 : le bloc texte est compact (4 éléments
 *     verticaux) et n'a pas besoin de la moitié de la largeur. Donner un
 *     peu plus aux marquees leur permet de respirer et garantit que les
 *     2 cards côte à côte aient assez de place pour ne pas se faire
 *     clipper, tout en gardant un espace visuel agréable autour du texte.
 *
 *   Hiérarchie typo du bloc texte (pattern emprunté à Presentation
 *   "Asmaa Mansouri / Au service de la santé des femmes") :
 *     - H2 : font-display, text-4xl/5xl, medium, text-warm-900
 *     - Sous-titre : font-display, text-xl/2xl, light, text-warm-700,
 *       posé sans mt directement sous le H2
 *     - 5 étoiles lucide (text-warm-700, fill currentColor) + texte
 *       "Découvrez les X avis vérifiés" — pattern repris du Hero, étoiles
 *       aria-hidden, partie chiffrée soulignée en decoration warm-500/60
 *     - 2 CTA : Resalib primary + Google secondary, gap-3
 *
 *   Marquees (identique sur les 2 layouts) :
 *     - Colonne 1 : direction normale, première moitié des témoignages
 *     - Colonne 2 : direction reverse, seconde moitié
 *     - pauseOnHover sur les deux, duration 30s
 *     - Fade haut/bas via CSS mask-image (transparent → black 25% → black 75%
 *       → transparent), 100% transparent pour respecter le wash vert du body
 *
 *   Les 2 CTA sont dupliqués (mobile centrés sous les marquees / desktop
 *   inline sous le count) parce que leur position diffère trop entre les
 *   deux layouts pour qu'un simple `order` suffise — un bloc est
 *   `lg:hidden`, l'autre `hidden lg:flex`.
 *
 * Pas de bg propre sur la section — transparente, hérite du body, conforme
 * à la règle d'uniformité du projet.
 *
 * Server Component pur. La Marquee elle-même est full CSS (animation
 * @keyframes), donc aucun JS shipé pour le défilement.
 */
export function Temoignages() {
  return (
    <section
      id="temoignages"
      aria-labelledby="temoignages-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[45fr_55fr] lg:gap-12 lg:gap-y-0 lg:items-center">
          {/*
            Marquees verticaux : 2 colonnes côte à côte.

            Chaque <Marquee> reçoit `flex-1` via className → les 2 marquees
            se partagent équitablement la largeur du parent (50/50 dans la
            colonne droite de la grille 35/65). Sans ce `flex-1`, les
            marquees prendraient leur largeur de contenu (288px par card),
            les cards déborderaient, et `overflow-hidden` les clipperait
            sur la droite — cf. JSDoc de ReviewCard pour le détail du
            problème historique.

            Fade haut/bas — historique :
            On a d'abord utilisé un `mask-image` sur ce wrapper, mais ça
            cassait le `backdrop-filter` des cards filles (mask crée un
            nouveau stacking context / compositor layer dont
            `backdrop-filter` ne peut plus échantillonner le vrai bg du
            body — donc le glass des cards ressortait "plat" comparé aux
            autres sections).

            Solution actuelle : 2 overlays absolus (fadeTop / fadeBottom)
            posés au-dessus des marquees (z-10, pointer-events-none). Chaque
            overlay réplique EXACTEMENT le bg du body (warm-100 +
            linear-gradient wash vert + `background-attachment: fixed`),
            donc il est visuellement indistinguable du body bg derrière.
            Le fade est obtenu via `mask-image` SUR L'OVERLAY (pas sur le
            wrapper) — le mask isole un stacking context pour l'overlay,
            mais les cards sont SIBLINGS du marquee donc leur
            `backdrop-filter` reste fonctionnel.

            Order : sur mobile order-2 (sous le bloc texte) ; sur desktop
            order-2 aussi (colonne droite).
          */}
          <div
            className="order-2 relative flex h-[500px] flex-row items-center justify-center gap-4 overflow-hidden"
          >
            {/*
              Mobile (< lg) : un seul marquee qui contient TOUS les
              témoignages. Pourquoi ne pas réutiliser le marquee gauche du
              desktop avec firstColumn : sur mobile, montrer une seule
              moitié serait amputer la moitié de la social proof. Donc on
              duplique la liste complète dans un marquee mobile-only et on
              cache les 2 marquees split via lg:hidden / hidden lg:flex.
              Coût : un peu de DOM dupliqué, gain : preuve sociale complète
              sur mobile sans avoir à splitter le composant en deux variantes.
            */}
            <Marquee
              pauseOnHover
              vertical
              className="w-full max-w-72 [--duration:30s] lg:hidden"
            >
              {temoignages.map((t, i) => (
                <ReviewCard key={`m-${t.name}-${i}`} {...t} />
              ))}
            </Marquee>
            {/* Desktop (≥ lg) : 2 marquees split, sens opposés */}
            <Marquee
              pauseOnHover
              vertical
              className="hidden lg:flex flex-1 [--duration:30s]"
            >
              {firstColumn.map((t, i) => (
                <ReviewCard key={`a-${t.name}-${i}`} {...t} />
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              vertical
              className="hidden lg:flex flex-1 [--duration:30s]"
            >
              {secondColumn.map((t, i) => (
                <ReviewCard key={`b-${t.name}-${i}`} {...t} />
              ))}
            </Marquee>

            {/*
              Fade overlays (top + bottom) — siblings des marquees, posés
              au-dessus via z-10. Chaque overlay réplique le bg du body
              (warm-100 + wash warm-300 38% en linear-gradient,
              background-attachment: fixed) → visuellement identique au
              fond derrière. Le mask-image fait le fade : opaque côté
              extérieur (top du top-overlay / bottom du bottom-overlay)
              et transparent côté intérieur. Le mask isole un stacking
              context pour l'overlay seul, les cards filles du marquee
              ne sont pas affectées et leur backdrop-filter reste OK.
              h-[25%] reproduit le pourcentage de fade de l'ancien mask
              global (transparent_0% → black_25%).
            */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[25%]"
              style={{
                backgroundColor: "var(--color-warm-100)",
                backgroundImage:
                  "linear-gradient(to bottom, color-mix(in oklch, var(--color-warm-300) 38%, transparent) 0%, transparent 100%)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
                backgroundSize: "100% clamp(220px, 38vh, 520px)",
                backgroundAttachment: "fixed",
                maskImage:
                  "linear-gradient(to bottom, black 0%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, transparent 100%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[25%]"
              style={{
                backgroundColor: "var(--color-warm-100)",
                backgroundImage:
                  "linear-gradient(to bottom, color-mix(in oklch, var(--color-warm-300) 38%, transparent) 0%, transparent 100%)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
                backgroundSize: "100% clamp(220px, 38vh, 520px)",
                backgroundAttachment: "fixed",
                maskImage:
                  "linear-gradient(to top, black 0%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to top, black 0%, transparent 100%)",
              }}
            />
          </div>

          {/*
            Bloc texte : titre + sous-titre + count souligné + 2 CTA.
            Le sous-titre suit le pattern de Presentation (Asmaa Mansouri /
            Au service de la santé des femmes) — pas de mt, font-display
            light, légèrement plus petit que le H2.
            Les 2 CTA "Écrire un avis" sont en hidden lg:flex ; sur mobile
            ils vivent dans le bloc order-3 sous les marquees.
          */}
          <Reveal as="div" className="order-1 text-center max-w-3xl mx-auto lg:max-w-none lg:mx-0">
            <h2
              id="temoignages-titre"
              className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
            >
              Ce qu&apos;elles en disent
            </h2>
            <p className="font-display text-xl lg:text-2xl font-light tracking-tight text-warm-700">
              Les retours des femmes que j&apos;accompagne au quotidien
            </p>

            {/*
              5 étoiles + count d'avis vérifiés. Pattern repris du Hero
              (Hero.tsx) : étoiles lucide remplies en text-warm-700, gap
              compact entre étoiles, gap plus large avec le texte. Les
              étoiles sont aria-hidden : seul le texte porte l'info pour
              les lecteurs d'écran.
              justify-center sur mobile (text-center), justify-start sur lg.
            */}
            <div className="mt-8 flex items-center gap-3 lg:gap-4 justify-center">
              <span
                className="flex items-center gap-0.5 lg:gap-1"
                aria-hidden="true"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-[18px] h-[18px] lg:w-5 lg:h-5 text-warm-700"
                    fill="currentColor"
                    stroke="none"
                  />
                ))}
              </span>
              <p className="font-body text-base text-warm-700 underline underline-offset-4 decoration-warm-500/60">
                Découvrez les {site.verifiedReviewsCount} avis vérifiés
              </p>
            </div>

            {/*
              CTA desktop only — empilés en colonne :
                Row 1 : 2 boutons "Écrire un avis" côte à côte
                  - Resalib en primary, Google en secondary
                  - Le nom de la plateforme est rendu via le logo SVG
                    (currentColor pour hériter de la couleur du bouton)
                  - Accessibilité préservée par le <title> dans le SVG
                Row 2 : CTA "Suivre sur Instagram" en secondary, isolé sous
                  les 2 boutons d'avis. Cohérent avec l'orientation "social
                  proof" du bloc — les 3 boutons sont des actions de
                  connexion communauté (avis Resalib, avis Google, suivi
                  Instagram), pas une conversion RDV.
              Le wrapper flex-col + items-center centre les 2 rows
              horizontalement dans la colonne texte.
            */}
            <div className="hidden lg:flex mt-8 flex-col items-center gap-3">
              <div className="flex flex-row gap-3">
                <ButtonLink href={site.resalibReviewsUrl} variant="primary">
                  Écrire un avis sur
                  <ResalibLogo className="h-5 w-auto" />
                </ButtonLink>
                <ButtonLink href={site.googleReviewsUrl} variant="secondary">
                  Écrire un avis sur
                  <GoogleLogo className="h-4 w-auto translate-y-[1.5px]" />
                </ButtonLink>
              </div>
              <ButtonLink href={site.instagramUrl} variant="secondary">
                Suivre sur
                <InstagramLogo className="h-4 w-auto translate-y-[1.5px]" />
              </ButtonLink>
            </div>
          </Reveal>

          {/*
            CTA mobile only — centrés sous les marquees, masqués sur desktop
            où ils vivent dans le bloc texte. Stack vertical sur très petit
            écran, row à partir de sm pour économiser la hauteur.
            Logos SVG inline (mêmes composants que la version desktop), qui
            héritent de la couleur du bouton via currentColor.
          */}
          <div className="order-3 flex flex-col sm:flex-row gap-3 items-center justify-center lg:hidden">
            <ButtonLink href={site.resalibReviewsUrl} variant="primary">
              Écrire un avis sur
              <ResalibLogo className="h-5 w-auto" />
            </ButtonLink>
            <ButtonLink href={site.googleReviewsUrl} variant="secondary">
              Écrire un avis sur
              <GoogleLogo className="h-4 w-auto" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
