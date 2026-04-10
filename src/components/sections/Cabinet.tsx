import { Navigation, Phone } from "lucide-react";
import Map from "@/components/ui/Map";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/data/site";

/**
 * Cabinet — section "Mon cabinet" sur la landing.
 *
 * Layout adapté du pattern d'un autre projet (référence transmise par
 * l'utilisateur), réécrit avec les conventions du projet Asmaa :
 *
 *   - Desktop (lg+) : flex row, texte à gauche (flex-1), Map à droite
 *     (480×320 fixe). Items center pour aligner verticalement le bloc
 *     texte avec la map.
 *
 *   - Mobile (< lg) : stack vertical dans cet ordre — titre, adresse,
 *     map (200px de haut), description, 2 CTAs côte à côte.
 *
 * Map themée à la palette rose/vert via `Map.tsx` (composant client
 * MapLibre + override des paint properties au runtime).
 *
 * Deux CTAs : Appeler Asmaa (variant primary, lucide Phone) +
 * Itinéraire (variant secondary, lucide Navigation). Le primary domine
 * visuellement parce que l'appel est l'action principale du cabinet.
 *
 * Server Component pur — l'interactivité est encapsulée dans Map.tsx.
 */
export function Cabinet() {
  return (
    <section
      id="cabinet"
      aria-labelledby="cabinet-titre"
      className="relative py-12 lg:py-22"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
        {/* ─── Desktop : flex row texte gauche / map droite ─── */}
        <div className="hidden lg:flex lg:items-center lg:gap-16">
          {/* Texte */}
          <div className="flex-1">
            <h2
              id="cabinet-titre"
              className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
            >
              Mon cabinet
            </h2>
            <p className="font-display text-xl lg:text-2xl font-light tracking-tight text-warm-700">
              {site.address.full}
            </p>
            <p className="mt-6 font-body text-lg leading-relaxed text-warm-700 max-w-xl">
              Je vous accueille dans mon cabinet à Décines-Charpieu, à quelques
              minutes de Lyon. Les consultations se font en cabinet ou à
              distance par visio, selon ce qui vous convient le mieux.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <ButtonLink href={site.phoneHref} variant="primary">
                Appeler Asmaa
                <Phone
                  aria-hidden="true"
                  className="w-4 h-4"
                  strokeWidth={1.5}
                />
              </ButtonLink>
              <ButtonLink
                href={site.googleMapsDirectionsUrl}
                variant="secondary"
              >
                Itinéraire
                <Navigation
                  aria-hidden="true"
                  className="w-4 h-4"
                  strokeWidth={1.5}
                />
              </ButtonLink>
            </div>
          </div>

          {/* Map */}
          <div className="w-[480px] h-[320px] shrink-0 rounded-md overflow-hidden border border-warm-700/15">
            <Map className="w-full h-full" />
          </div>
        </div>

        {/* ─── Mobile : stack vertical (titre, adresse, map, texte, CTAs) ─── */}
        <div className="lg:hidden flex flex-col gap-6 text-center">
          <div>
            <h2
              id="cabinet-titre-mobile"
              className="font-display text-4xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900"
            >
              Mon cabinet
            </h2>
            <p className="font-display text-xl lg:text-2xl font-light tracking-tight text-warm-700">
              {site.address.full}
            </p>
          </div>

          <div className="w-full h-[220px] rounded-md overflow-hidden border border-warm-700/15">
            <Map className="w-full h-full" />
          </div>

          <p className="font-body text-base leading-relaxed text-warm-700">
            Je vous accueille dans mon cabinet à Décines-Charpieu, à quelques
            minutes de Lyon. Les consultations se font en cabinet ou à distance
            par visio, selon ce qui vous convient le mieux.
          </p>

          <div className="flex flex-row items-center justify-center gap-4">
            <ButtonLink href={site.phoneHref} variant="primary">
              Appeler Asmaa
              <Phone aria-hidden="true" className="w-4 h-4" strokeWidth={1.5} />
            </ButtonLink>
            <ButtonLink
              href={site.googleMapsDirectionsUrl}
              variant="secondary"
            >
              Itinéraire
              <Navigation
                aria-hidden="true"
                className="w-4 h-4"
                strokeWidth={1.5}
              />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
