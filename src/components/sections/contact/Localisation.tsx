import { CalendarRange, Clock, MapPin, Navigation } from "lucide-react";
import Map from "@/components/ui/Map";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

/**
 * Localisation — section basse de la page `/contact`.
 *
 * Layout :
 *   - Mobile : stack vertical. Map en premier (point visuel fort), infos
 *     ensuite.
 *   - Desktop (lg+) : row 2 colonnes, infos adresse/horaires à gauche,
 *     map à droite. Chaque colonne occupe la moitié de la ligne.
 *
 * Hauteur de la map dynamique : pas de `min-h-[…]` — la map s'adapte
 * à la hauteur de la colonne infos via `items-stretch` sur le flex
 * parent et `h-full` sur le conteneur map. Si l'utilisateur a peu
 * d'horaires, la map raccourcit ; plus d'horaires, la map s'allonge.
 *
 * Server Component — l'interactivité (map) est encapsulée dans Map.tsx.
 */
export function ContactLocalisation() {
  return (
    <section
      id="localisation"
      aria-labelledby="contact-localisation-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        <Reveal as="div" className="text-center max-w-3xl mx-auto">
          <h2
            id="contact-localisation-titre"
            className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
          >
            Où me trouver
          </h2>
          <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">
            Cabinet à Décines-Charpieu, à 15 minutes de la Part-Dieu,
            accessible depuis tout l&apos;est lyonnais.
          </p>
        </Reveal>

        {/* Infos à gauche, map à droite sur desktop. Mobile : map
            en premier (via order-1), infos ensuite. items-stretch
            pour que les deux colonnes aient la même hauteur. */}
        <Reveal as="div" delay={0.1} className="mt-12 lg:mt-16 flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 flex flex-col lg:order-1 order-2">
            <div>
              <p className="flex items-center gap-2 font-body text-xs font-medium uppercase tracking-widest text-warm-700/70">
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

            <div className="mt-8">
              <p className="flex items-center gap-2 font-body text-xs font-medium uppercase tracking-widest text-warm-700/70">
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

          <div className="w-full lg:w-1/2 h-[260px] lg:h-auto rounded-md overflow-hidden lg:order-2 order-1">
            <Map className="w-full h-full" />
          </div>
        </Reveal>

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
        </Reveal>
      </div>
    </section>
  );
}
