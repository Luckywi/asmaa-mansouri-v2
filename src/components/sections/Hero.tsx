import Link from "next/link";
import { CalendarRange, Phone, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LogoMark } from "@/components/ui/LogoMark";
import { site } from "@/data/site";

/**
 * Tags mots-clés affichés dans le Hero — conditions/spécialités sur
 * lesquelles Asmaa accompagne. Inlinés ici parce qu'ils ne sont utilisés
 * qu'à cet endroit pour l'instant. Si on les réutilise ailleurs (page
 * spécialités, footer, etc.), on déplacera vers `src/data/specialites.ts`.
 *
 * Chaque tag pointe vers `#specialites` (l'ancre placeholder) en attendant
 * que les pages dédiées /specialites/sopk, /specialites/endometriose, etc.
 * existent en Phase 2.
 */
const heroTags = [
  "SOPK",
  "Endométriose",
  "Préménopause",
  "Stress chronique",
  "Troubles digestifs",
  "Cycles irréguliers",
  "Fertilité",
] as const;

/**
 * Hero — section d'accueil de la landing page.
 *
 * Architecture en 2 zones verticales :
 *
 *   1. Bloc titre + sous-titre, **centré horizontalement**, en haut.
 *   2. Row 3 colonnes équilibrées (4/4/4 sur lg+) en dessous :
 *      - Gauche : tags mots-clés (chips wrapped)
 *      - Centre : LogoMark (point d'ancrage visuel)
 *      - Droite : avis Resalib + 2 CTAs (Appeler / Prendre RDV)
 *
 *   `items-center` sur le grid → les 3 colonnes sont verticalement
 *   centrées par rapport au logo (l'élément le plus haut), ce qui
 *   donne un effet "ailes" autour du centerpiece.
 *
 * En mobile (< lg), tout passe en stack vertical avec un ordre repensé
 * via classes `order-*` : LogoMark en haut, puis tags, puis avis +
 * CTAs. Le H1 reste toujours en début de DOM (au-dessus du grid)
 * pour le SEO et l'accessibilité — il ne participe pas au reorder.
 *
 * Server Component pur — aucun state, aucun listener.
 */
export function Hero() {
  // Lien tel: dérivé du téléphone formaté de site.ts (on garde la version
  // affichable avec points dans site.phone, et on dérive la version
  // numérique pour le href). Strip de tout sauf chiffres et + initial.
  const phoneTelHref = `tel:${site.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <section
      aria-labelledby="hero-titre"
      className="relative pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* ─── Bloc titre + sous-titre, centré ──────────────────── */}
        <div className="text-center">
          <h1
            id="hero-titre"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900 max-w-4xl mx-auto"
          >
            La naturopathie au service de votre santé de femme.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto font-body text-lg md:text-xl leading-relaxed text-warm-700">
            Asmaa Mansouri — Naturopathe et médecine traditionnelle chinoise à
            Décines-Charpieu.
          </p>
        </div>

        {/* ─── Row 3 colonnes : Tags | LogoMark | Avis+CTAs ───── */}
        <div className="mt-8 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* ── Colonne 1 (lg) : Tags mots-clés ── */}
          {/*
            Mobile : order-2 (sous le LogoMark)
            Desktop : order-1 = colonne gauche
          */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <ul className="flex flex-wrap justify-center gap-2">
              {heroTags.map((tag) => (
                <li key={tag}>
                  <Link
                    href="#specialites"
                    className={[
                      "inline-flex items-center px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-md",
                      "bg-[var(--glass-bg)]",
                      "backdrop-blur-xl backdrop-saturate-[1.8]",
                      "border-[0.5px] border-white/50",
                      "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
                      "font-body text-xs lg:text-sm font-medium text-warm-700",
                      "hover:border-white/70 hover:text-warm-900",
                      "transition-colors duration-200 ease-out",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
                    ].join(" ")}
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Colonne 2 (lg) : LogoMark, centerpiece ── */}
          {/*
            Mobile : order-1 (en haut, premier élément après le bloc titre)
            Desktop : order-2 = colonne centrale
          */}
          <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
            <LogoMark className="w-32 h-32 sm:w-40 sm:h-40 md:w-72 md:h-72 lg:w-[294px] lg:h-[294px] text-warm-700" />
          </div>

          {/* ── Colonne 3 (lg) : Avis Resalib + CTAs ── */}
          {/*
            Mobile : order-3 (en bas)
            Desktop : order-3 = colonne droite (ordre naturel)
          */}
          <div className="lg:col-span-4 order-3 flex flex-col items-center gap-6">
            {/*
              Lien étoiles + "Lire les 24 avis vérifiés".
              Anchor natif (pas ButtonLink) parce que c'est un lien texte
              avec affordance discrète, pas un CTA. Les étoiles sont
              aria-hidden : seul le texte porte l'info pour les lecteurs
              d'écran. Étoiles en warm-700 pour rester sur la palette
              (pas de gold off-brand).
            */}
            <a
              href={site.resalibUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "inline-flex items-center gap-3 lg:gap-4 rounded-md px-2 py-1 -mx-2 -my-1",
                "transition-colors duration-200 ease-out group",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
              ].join(" ")}
            >
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
              <span
                className={[
                  "font-body text-sm lg:text-base font-medium",
                  "text-warm-700 group-hover:text-warm-900",
                  "underline underline-offset-4 decoration-1",
                  "decoration-warm-700/40 group-hover:decoration-warm-900",
                  "transition-colors duration-200 ease-out",
                ].join(" ")}
              >
                Lire les 24 témoignages
              </span>
            </a>

            {/*
              Deux CTAs côte à côte. flex-col-reverse en mobile pour que
              le primary "Prendre RDV" reste visuellement au-dessus malgré
              l'ordre DOM (où le secondary vient avant pour matcher l'ordre
              visuel desktop : secondary à gauche, primary à droite).
            */}
            <div className="flex flex-col-reverse sm:flex-row items-center gap-4">
              <ButtonLink href={phoneTelHref} variant="secondary">
                Appeler Asmaa
                <Phone
                  aria-hidden="true"
                  className="w-4 h-4"
                  strokeWidth={1.5}
                />
              </ButtonLink>
              <ButtonLink href={site.resalibUrl} variant="primary">
                Prendre rendez-vous
                <CalendarRange
                  aria-hidden="true"
                  className="w-4 h-4"
                  strokeWidth={1.5}
                />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
