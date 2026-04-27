import { zonesDesservies } from "@/data/cabinet-acces";
import { prestations } from "@/data/prestations";
import { site } from "@/data/site";
import { temoignages } from "@/data/temoignages";
import {
  absUrl,
  BUSINESS_ID,
  PERSON_ID,
  RESALIB_CANONICAL_URL,
  SITE_URL,
} from "./constants";
import type { JsonLdNode } from "./types";

/**
 * Mapping jour FR → code Schema.org DayOfWeek. L'ordre d'itération
 * suit `site.openingHours` pour produire des
 * `OpeningHoursSpecification` par plage.
 */
const DAY_TO_SCHEMA: Record<string, string> = {
  Lundi: "https://schema.org/Monday",
  Mardi: "https://schema.org/Tuesday",
  Mercredi: "https://schema.org/Wednesday",
  Jeudi: "https://schema.org/Thursday",
  Vendredi: "https://schema.org/Friday",
  Samedi: "https://schema.org/Saturday",
  Dimanche: "https://schema.org/Sunday",
};

/**
 * Agrège les plages d'ouverture consécutives identiques en une seule
 * `OpeningHoursSpecification` avec `dayOfWeek: [...]`. Format préféré
 * Google (moins verbeux, sémantiquement identique).
 */
function buildOpeningHours() {
  const ranges = new Map<string, string[]>();

  for (const { day, open, close } of site.openingHours) {
    if (!open || !close) continue;
    const key = `${open}-${close}`;
    const list = ranges.get(key) ?? [];
    const schemaDay = DAY_TO_SCHEMA[day];
    if (schemaDay) list.push(schemaDay);
    ranges.set(key, list);
  }

  return Array.from(ranges.entries()).map(([hours, days]) => {
    const [opens, closes] = hours.split("-");
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days,
      opens,
      closes,
    };
  });
}

/**
 * `aggregateRating` aligné sur les Reviews effectivement injectées dans
 * le schema (`/temoignages`). Règle Google : `reviewCount` doit refléter
 * les Reviews que le crawler peut voir dans le JSON-LD du site, pas un
 * cumul tiers. Les avis cumulés Google Business + Resalib non dédupliqués
 * restent accessibles via `sameAs[]` qui pointe vers les deux fiches.
 *
 * `bestRating: 5` / `worstRating: 1` = échelle 1-5 standard. Ne PAS
 * mettre `worstRating: 5` même si aucun avis 1★ n'existe — la propriété
 * décrit le plancher de l'échelle, pas la pire note observée.
 *
 * Ratings observés : 100% 5★ sur les avis dédupliqués → ratingValue: 5.
 */
const AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: 5,
  bestRating: 5,
  worstRating: 1,
  reviewCount: temoignages.length,
} as const;

/**
 * URL Google Business (GMB) partagée par Asmaa. Utilisée en `hasMap`
 * et dans `sameAs[]` pour consolider l'identité en ligne.
 */
const GMB_SHARE_URL = "https://share.google/HHNTauiykRprnd5sE";

/**
 * LocalBusiness canonique du cabinet — sous-type
 * `HealthAndBeautyBusiness`. On évite volontairement `MedicalBusiness`
 * / `MedicalClinic` : Asmaa est naturopathe, pas médecin — le schéma
 * médical Google exige `medicalEvidenceLevel` / `recognizingAuthority`
 * qu'on ne peut pas fournir honnêtement.
 */
export function buildLocalBusiness(): JsonLdNode {
  return {
    "@type": "HealthAndBeautyBusiness",
    "@id": BUSINESS_ID,
    name: site.name,
    legalName: site.name,
    description:
      "Cabinet de naturopathie spécialisé en santé féminine à Décines-Charpieu, à dix minutes de Lyon. Consultations, massages Tuina, cupping therapy et accompagnement trois mois.",
    slogan: site.baseline,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absUrl("/icon1.png"),
      width: 96,
      height: 96,
    },
    image: [
      absUrl("/qui-suis-je/portrait-1.jpg"),
      absUrl("/caroussel/cabinet-ensemble.jpg"),
      absUrl("/caroussel/cabinet-bureau-consultation.jpg"),
    ],
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.zip,
      addressRegion: site.address.region,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.gps.lat,
      longitude: site.gps.lng,
    },
    hasMap: GMB_SHARE_URL,
    openingHoursSpecification: buildOpeningHours(),
    priceRange: "€€",
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
    currenciesAccepted: "EUR",
    // Schema.org : `serviceArea` est déprécié, tout passe par `areaServed`
    // qui accepte indistinctement AdministrativeArea, Place et GeoShape
    // (GeoCircle est un sous-type de GeoShape). On combine la liste des
    // communes et un cercle géographique de 20 km autour du cabinet.
    areaServed: [
      ...zonesDesservies.map((name) => ({
        "@type": "AdministrativeArea",
        name,
      })),
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: site.gps.lat,
          longitude: site.gps.lng,
        },
        geoRadius: 20000,
      },
    ],
    knowsLanguage: ["fr"],
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    sameAs: [
      site.instagramUrl,
      RESALIB_CANONICAL_URL,
      GMB_SHARE_URL,
    ],
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "SIRET",
        value: "95258346600018",
      },
      {
        "@type": "PropertyValue",
        propertyID: "APE",
        value: "96.09Z",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: site.phone,
        email: site.email,
        areaServed: "FR",
        availableLanguage: ["fr"],
      },
      {
        "@type": "ContactPoint",
        contactType: "reservations",
        url: RESALIB_CANONICAL_URL,
        areaServed: "FR",
        availableLanguage: ["fr"],
      },
    ],
    aggregateRating: {
      ...AGGREGATE_RATING,
      itemReviewed: { "@id": BUSINESS_ID },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations de naturopathie",
      itemListElement: prestations.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@id": `${absUrl(`/prestations/${p.slug}`)}#service`,
        },
        url: absUrl(`/prestations/${p.slug}`),
      })),
    },
    makesOffer: prestations.map((p) => ({
      "@type": "Offer",
      itemOffered: { "@id": `${absUrl(`/prestations/${p.slug}`)}#service` },
      url: absUrl(`/prestations/${p.slug}`),
    })),
  };
}
