import { CalendarRange, Clock, MapPin, Navigation, Phone } from "lucide-react";
import MapLazy from "@/components/ui/MapLazy";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

/**
 * Localisation — section cœur de la page /cabinet.
 *
 * Layout :
 *   - Header centré : H2 "Venir au cabinet" + intro courte.
 *   - Contenu : row 2 colonnes (lg+), map à gauche (1/2), infos à droite (1/2).
 *     Mobile : stack vertical, map d'abord puis infos.
 *   - CTAs : rangée flex-wrap centrée en dessous (Prendre RDV primary,
 *     Y aller + Appeler en secondary).
 *
 * Le bouton "Y aller" utilise la même URL que l'adresse cliquable du Hero
 * (`googleMapsDirectionsUrl` avec destination pré-remplie). Google Maps
 * déduit automatiquement la position de départ du GPS du navigateur
 * côté mobile, ou demande une adresse de départ sur desktop.
 *
 * Server Component — l'interactivité (map) est encapsulée dans Map.tsx.
 */
export function Localisation() {
  return (
    <section
      id="localisation"
      aria-labelledby="localisation-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* ─── Header ─────────────────────────────────────────── */}
        <Reveal as="div" className="text-center max-w-3xl mx-auto">
          <h2
            id="localisation-titre"
            className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
          >
            Venir au cabinet
          </h2>
          <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
            À Décines-Charpieu, à 15 minutes de la Part-Dieu et facilement
            accessible depuis tout l&apos;est lyonnais.
          </p>
        </Reveal>

        {/* ─── Row map + infos ───────────────────────────────── */}
        <Reveal as="div" delay={0.1} className="mt-12 lg:mt-16 flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12">
          {/* Map — hauteur réduite en mobile (stack), h-full en desktop (row) */}
          <div className="w-full lg:w-1/2 h-[260px] lg:h-auto lg:min-h-[440px] rounded-md overflow-hidden">
            <MapLazy className="w-full h-full" />
          </div>

          {/* Infos */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <p className="font-body text-base lg:text-lg leading-relaxed text-warm-700">
              Je reçois dans un cabinet calme et confidentiel pensé pour les
              consultations longues et les séances de Tuina. Stationnement
              gratuit à proximité, arrêt de tram T3 (Décines-Centre) à 5 minutes
              à pied. Les consultations peuvent aussi se faire en visio si vous
              résidez hors de Lyon.
            </p>

            {/* Adresse */}
            <div className="mt-8">
              <p className="flex items-center gap-2 font-body text-xs font-medium uppercase tracking-widest text-warm-700/80">
                <MapPin
                  aria-hidden="true"
                  className="w-3.5 h-3.5"
                  strokeWidth={1.8}
                />
                Adresse
              </p>
              <address className="mt-2 not-italic">
                <a
                  href={site.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={[
                    "font-body text-base lg:text-lg text-warm-900",
                    "underline underline-offset-4 decoration-1",
                    "decoration-warm-700/30 hover:decoration-warm-900",
                    "transition-colors duration-200 ease-out",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700",
                  ].join(" ")}
                >
                  {site.address.full}
                </a>
              </address>
            </div>

            {/* Horaires */}
            <div className="mt-8">
              <p className="flex items-center gap-2 font-body text-xs font-medium uppercase tracking-widest text-warm-700/80">
                <Clock
                  aria-hidden="true"
                  className="w-3.5 h-3.5"
                  strokeWidth={1.8}
                />
                Horaires d&apos;ouverture
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {site.openingHours.map((entry) => (
                  <li
                    key={entry.day}
                    className="flex items-baseline justify-between gap-4 font-body text-sm lg:text-base"
                  >
                    <span className="text-warm-900">{entry.day}</span>
                    <span className="text-warm-700">
                      {entry.open && entry.close
                        ? `${entry.open} – ${entry.close}`
                        : "Fermé"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ─── CTAs ───────────────────────────────────────────── */}
        {/* flex-wrap + justify-center : 3 CTAs en ligne sur desktop, wrap
            naturel sur écrans étroits sans casser l'alignement */}
        <Reveal as="div" className="mt-12 lg:mt-16 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href={site.resalibUrl} variant="primary">
            Prendre rendez-vous
            <CalendarRange
              aria-hidden="true"
              className="w-4 h-4"
              strokeWidth={1.5}
            />
          </ButtonLink>
          <ButtonLink
            href={site.googleMapsDirectionsUrl}
            variant="secondary"
          >
            Y aller
            <Navigation
              aria-hidden="true"
              className="w-4 h-4"
              strokeWidth={1.5}
            />
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="secondary">
            Appeler Asmaa
            <Phone aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
