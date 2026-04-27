import type { Atelier } from "@/types";
import { absUrl, BUSINESS_ID } from "./constants";
import type { JsonLdNode } from "./types";

/** Date du jour au format ISO YYYY-MM-DD pour comparer aux startDate des ateliers. */
const TODAY_ISO = new Date().toISOString().slice(0, 10);

/**
 * Event pour un atelier passé ou à venir. Si pas de `date` fournie,
 * on omet l'Event (startDate est requis par Schema.org et Google).
 *
 * Atelier 1 jour → `endDate = startDate` (Google warning « missing
 * field endDate » sinon). `eventStatus` passe à `EventCompleted` une
 * fois la date dépassée — bonne pratique pour les rich results.
 *
 * `location` : par défaut le cabinet (#business). Si l'atelier a eu
 * lieu ailleurs (ex: baume-anti-moustique à Vaulx-en-Velin), on
 * génère un `Place` inline avec le nom fourni.
 *
 * Les prix des ateliers ne sont pas publiés → pas d'`offers`.
 */
export function buildEvent(atelier: Atelier): JsonLdNode | null {
  if (!atelier.date) return null;

  const url = absUrl(`/ateliers/passes#${atelier.slug}`);
  const isPast = atelier.date < TODAY_ISO;

  const node: JsonLdNode = {
    "@type": "Event",
    "@id": `${absUrl(`/ateliers/passes`)}#event-${atelier.slug}`,
    name: atelier.title,
    description: atelier.longDescription ?? atelier.shortDescription,
    startDate: atelier.date,
    endDate: atelier.date,
    eventStatus: isPast
      ? "https://schema.org/EventCompleted"
      : "https://schema.org/EventScheduled",
    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",
    organizer: { "@id": BUSINESS_ID },
    url,
  };

  if (atelier.location) {
    node.location = {
      "@type": "Place",
      name: atelier.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: atelier.addressLocality ?? atelier.location,
        addressCountry: "FR",
      },
    };
  } else {
    node.location = { "@id": BUSINESS_ID };
  }

  if (atelier.poster) {
    node.image = absUrl(atelier.poster);
  } else if (atelier.images && atelier.images.length > 0) {
    node.image = atelier.images.map((img) => absUrl(img));
  }

  return node;
}

/**
 * Liste d'Events à partir des ateliers — filtre automatiquement ceux
 * sans `date` (invalides en Schema.org).
 */
export function buildEvents(
  ateliers: readonly Atelier[],
): JsonLdNode[] {
  return ateliers
    .map((a) => buildEvent(a))
    .filter((e): e is JsonLdNode => e !== null);
}
