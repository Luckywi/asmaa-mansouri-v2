import Link from "next/link";
import { Star, UserStar } from "lucide-react";
import { VideoCard } from "@/components/sections/temoignages/VideoCard";
import { AudioCard } from "@/components/sections/temoignages/AudioCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { temoignages } from "@/data/temoignages";
import { site } from "@/data/site";

/**
 * Experiences — section "Elles sont venues consulter" sur /cabinet.
 *
 * Posée juste avant AllerPlusLoin. Bento de 3 médias (vidéo, texte, audio)
 * qui donne un aperçu des témoignages avant le CTA "Voir les N témoignages".
 * L'avis texte choisi est `temoignages[0]` (le plus récent), line-clampé
 * pour tenir dans la hauteur de la colonne droite à côté de la VideoCard
 * 9:16.
 *
 * Layout :
 *   - Mobile  : stack vertical video → texte → audio
 *   - lg+     : 2 colonnes, gauche = video 9:16 pleine hauteur, droite =
 *               flex-col [texte (flex-1)] + [audio] alignés sur la hauteur
 *               de la video.
 */

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

export function Experiences() {
  const featured = temoignages[0];
  const rating = featured.rating ?? 5;

  return (
    <section
      id="experiences"
      aria-labelledby="experiences-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* ─── Header centré ──────────────────────────────────── */}
        <Reveal as="div" className="text-center max-w-3xl mx-auto">
          <h2
            id="experiences-titre"
            className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
          >
            Elles sont venues consulter
          </h2>
          <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
            Une vidéo, une voix, un mot : trois regards partagés par celles
            qui ont franchi la porte du cabinet.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/temoignages" variant="primary">
              Voir les {site.verifiedReviewsCount} témoignages
              <UserStar
                aria-hidden="true"
                className="w-4 h-4"
                strokeWidth={1.5}
              />
            </ButtonLink>
          </div>
        </Reveal>

        {/* ─── Bento ──────────────────────────────────────────────
            Mobile  : col1 = video (140px), col2 = texte ; audio col-span-2
            Desktop : col1 = video (220px, row-span-2), col2 = texte puis
                      audio dessous. items-start → les cards ont leur taille
                      naturelle, pas d'étirement pour matcher la video.
        */}
        <div
          className={[
            "mt-12 lg:mt-16 mx-auto max-w-4xl",
            "flex flex-col items-center gap-4",
            "lg:grid lg:gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center",
          ].join(" ")}
        >
          {/* Video — centrée mobile, row-span-2 desktop */}
          <div className="w-[180px] lg:w-auto lg:row-span-2">
            <VideoCard />
          </div>

          {/* Audio — largeur pleine mobile, col 2 row 1 desktop */}
          <div className="w-full max-w-md">
            <AudioCard />
          </div>

          {/* Avis texte — largeur pleine mobile, col 2 row 2 desktop.
              Wrapper porte le watermark Star derrière le glass (pattern
              identique aux cards Specialites de la landing). */}
          <div className="w-full lg:col-start-2 min-w-0 group relative rounded-md overflow-hidden">
            <Star
              aria-hidden="true"
              className="absolute inset-0 w-full h-full text-warm-700/50 pointer-events-none"
              strokeWidth={2}
            />
            <Link
              href="/temoignages"
              aria-label={`Voir tous les témoignages (${site.verifiedReviewsCount})`}
              className={[
                "relative flex flex-col gap-3 p-4 lg:p-5",
                "bg-[var(--glass-bg)]",
                "backdrop-blur-xl backdrop-saturate-[1.8]",
                "border-[0.5px] border-white/50",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                "group-hover:border-white/70",
                "transition-colors duration-200 ease-out",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
              ].join(" ")}
            >
              {/*
                Card glass + Star watermark statique. Reveal uniquement
                sur le contenu interne pour éviter le flash du
                backdrop-filter qui perd l'icône watermark sibling
                pendant un transform parent.
              */}
              <Reveal>
                <header className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-warm-500/15 font-display text-sm font-medium text-warm-700"
                  >
                    {getInitials(featured.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-sm font-medium text-warm-900 truncate">
                      {featured.name}
                    </p>
                    <div
                      className="mt-0.5 flex gap-0.5"
                      aria-label={`Note : ${rating} sur 5`}
                    >
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star
                          key={i}
                          aria-hidden="true"
                          className="w-3 h-3 text-warm-700"
                          fill="currentColor"
                          stroke="none"
                        />
                      ))}
                    </div>
                  </div>
                </header>

                <p className="mt-3 font-body text-sm leading-relaxed text-warm-700 whitespace-pre-line">
                  {featured.body}
                </p>
              </Reveal>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
