import type { Prestation } from "@/types";
import { absUrl, BUSINESS_ID } from "./constants";
import type { JsonLdNode } from "./types";

/**
 * Parse un prix "80 €" / "50 €" / "350 €" / "Gratuit" / "Sur devis"
 * en nombre. Retourne null pour les valeurs non-numériques (Sur
 * devis, etc.) — règle : on n'invente rien.
 */
function parsePrice(price: string): number | null {
  const normalized = price.replace(/\s/g, "").toLowerCase();
  if (normalized === "gratuit") return 0;
  const match = normalized.match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return null;
  return parseFloat(match[1].replace(",", "."));
}

/**
 * Construit les `offers` à partir du tableau `tariffs` d'une
 * prestation. Chaque tariff avec un prix numérique devient une Offer.
 * Les "Sur devis" sont omis.
 */
function buildOffers(prestation: Prestation, pageUrl: string) {
  const offers = prestation.tariffs
    .map((tariff) => {
      const price = parsePrice(tariff.price);
      if (price === null) return null;
      return {
        "@type": "Offer",
        name: tariff.label,
        description: `${tariff.label} — ${tariff.duration} — ${tariff.location}`,
        price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: pageUrl,
      };
    })
    .filter((o): o is NonNullable<typeof o> => o !== null);

  return offers;
}

/**
 * Mapping des serviceType descriptifs, cohérents avec le vocabulaire
 * utilisé sur les pages. Pour cupping-therapy, inclut "hijama"
 * (préférence éditoriale assumée, cf. CLAUDE.md).
 */
const SERVICE_TYPE_MAP: Record<string, string> = {
  consultation: "Consultation de naturopathie",
  "massage-tuina": "Massage thérapeutique Tuina",
  "cupping-therapy": "Cupping therapy (hijama)",
  "accompagnement-3-mois": "Accompagnement naturopathie 3 mois",
};

/**
 * Service JSON-LD pour une prestation. Type `Service` simple (pas
 * `MedicalTherapy` — évite les warnings Google sans garantie médicale).
 *
 * `audience.suggestedGender: "Female"` reflète la patientèle
 * exclusivement féminine d'Asmaa (cohérent PERSONA.md).
 */
export function buildService(prestation: Prestation): JsonLdNode {
  const pageUrl = absUrl(`/prestations/${prestation.slug}`);
  const offers = buildOffers(prestation, pageUrl);

  const node: JsonLdNode = {
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: prestation.title,
    serviceType: SERVICE_TYPE_MAP[prestation.slug] ?? prestation.title,
    description: prestation.description,
    url: pageUrl,
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Décines-Charpieu et agglomération lyonnaise",
    },
    audience: {
      "@type": "PeopleAudience",
      suggestedGender: "Female",
      audienceType: "Femmes adultes",
    },
    category: "Naturopathie",
  };

  if (offers.length > 0) {
    node.offers = offers;
  }

  return node;
}
