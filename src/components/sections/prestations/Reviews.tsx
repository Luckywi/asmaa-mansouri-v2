import { Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/motion/Reveal";
import { temoignages } from "@/data/temoignages";
import { site } from "@/data/site";
import type { Temoignage } from "@/types";

type ReviewsProps = {
  /**
   * Liste de valeurs `role` à inclure — matching case-insensitive sur
   * l'inclusion (substring). Ex: `["Cupping thérapie"]` matche tous les
   * témoignages dont role contient cette chaîne.
   */
  testimonialRoles: readonly string[];
  /** Nom de la prestation pour les textes du bloc header */
  prestationLabel: string;
};

/**
 * Card individuelle d'un avis, posée dans le marquee horizontal.
 * Largeur fixe pour que le défilement soit prévisible.
 */
function ReviewCard({ name, role, body }: Temoignage) {
  return (
    <figure
      className={[
        "flex flex-col gap-3 w-80 h-56 shrink-0 p-5 overflow-hidden",
        "rounded-md",
        "bg-[var(--glass-bg)]",
        "backdrop-blur-xl backdrop-saturate-[1.8]",
        "border-[0.5px] border-white/50",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
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

      <blockquote className="font-body text-sm leading-relaxed text-warm-700 line-clamp-5 overflow-hidden">
        {body}
      </blockquote>
    </figure>
  );
}

/**
 * Sélectionne les témoignages dont le `role` contient (case-insensitive)
 * au moins une des valeurs fournies. Si aucun match, retourne tous les
 * témoignages en fallback (préférable à un bloc vide).
 */
function filterByRoles(roles: readonly string[]): Temoignage[] {
  const normalized = roles.map((r) => r.toLowerCase());
  const filtered = temoignages.filter((t) =>
    normalized.some((r) => (t.role ?? "").toLowerCase().includes(r)),
  );
  return filtered.length > 0 ? filtered : [...temoignages];
}

/**
 * Section avis horizontale des pages slug /prestations/[slug].
 *
 * Layout :
 *   - Header centré : H2 + sous-titre + 5 étoiles + CTA "Voir tous les avis"
 *   - Mobile : 1 marquee horizontal pleine largeur
 *   - Desktop (lg+) : 2 marquees horizontaux empilés, sens opposés
 *
 * Les témoignages affichés sont filtrés par `testimonialRoles` pour
 * montrer uniquement les avis pertinents pour la prestation. Si la liste
 * filtrée est trop courte pour un défilement fluide, `repeat` dans
 * Marquee assure la boucle visuelle.
 *
 * Server Component — aucun JS pour le défilement (CSS pur via Marquee).
 */
export function Reviews({ testimonialRoles, prestationLabel }: ReviewsProps) {
  const filtered = filterByRoles(testimonialRoles);

  // Largeur minimale de contenu pour que le Marquee couvre un viewport
  // desktop large (≥ 1920px) sans laisser une moitié vide au moment où
  // une copie sort par la gauche. Calcul : 4 copies × (n cards × card_w
  // + gaps) doit dépasser viewport + 1 copy_width. Avec card_w ≈ 320px,
  // il faut au moins 2 cards par bande.
  //
  // Stratégie : on ne split en 2 bandes opposées que si on a assez de
  // matière (≥ 4 témoignages filtrés → 2 par bande). Sinon, les 2 bandes
  // reçoivent la liste complète (avec sens opposés pour garder l'effet
  // visuel) — on privilégie un rendu propre au fait d'avoir 100% de
  // témoignages uniques entre les 2 bandes.
  const shouldSplit = filtered.length >= 4;
  const half = Math.ceil(filtered.length / 2);
  const bandA = shouldSplit ? filtered.slice(0, half) : filtered;
  const bandB = shouldSplit ? filtered.slice(half) : filtered;

  return (
    <section
      aria-labelledby="prestation-reviews-titre"
      className="relative py-12 lg:py-22"
    >
      {/* Header centré */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <Reveal as="div" className="text-center max-w-3xl mx-auto">
          <h2
            id="prestation-reviews-titre"
            className="font-display text-3xl lg:text-4xl font-medium tracking-[-0.02em] leading-[1.15] text-warm-900 text-balance"
          >
            Ce qu&apos;elles en disent
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-warm-700">
            Retours des femmes que j&apos;ai accompagnées{" "}
            {prestationLabel ? `en ${prestationLabel.toLowerCase()}` : ""}.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
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
            <p className="font-body text-base text-warm-700">
              {site.verifiedReviewsCount} avis vérifiés
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <ButtonLink href={site.resalibReviewsUrl} variant="secondary">
              Voir tous les avis
            </ButtonLink>
          </div>
        </Reveal>
      </div>

      {/* Marquees horizontaux — pleine largeur viewport pour que le
          défilement sorte bien des bords de la section. Mobile : 1 bande.
          Desktop : 2 bandes en sens opposés pour l'effet visuel.
          Reveal en opacité pure (y={0}) pour ne pas interférer avec la
          `@keyframes translateX` du Marquee. */}
      <Reveal as="div" y={0} duration={0.7} className="mt-12 lg:mt-16 space-y-4 lg:space-y-6">
        {/* Mobile : 1 bande (affiche tous les filtered) */}
        <Marquee
          pauseOnHover
          className="lg:hidden [--duration:50s] [--gap:1rem]"
        >
          {filtered.map((t, i) => (
            <ReviewCard key={`${t.name}-${i}`} {...t} />
          ))}
        </Marquee>

        {/* Desktop : 2 bandes opposées */}
        <Marquee
          pauseOnHover
          className="hidden lg:flex [--duration:60s] [--gap:1.5rem]"
        >
          {bandA.map((t, i) => (
            <ReviewCard key={`a-${t.name}-${i}`} {...t} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="hidden lg:flex [--duration:60s] [--gap:1.5rem]"
        >
          {bandB.map((t, i) => (
            <ReviewCard key={`b-${t.name}-${i}`} {...t} />
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
