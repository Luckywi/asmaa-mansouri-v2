import type { Atelier } from "@/types";

/**
 * Coordonnées de l'association "Le Cœur du Mas Cuisine" — hôte des
 * ateliers animés par Asmaa. Centralisé ici car utilisé uniquement sur
 * la page `/ateliers` (Hero + Modale). Si l'info doit apparaître
 * ailleurs (Footer, page cabinet...), extraire vers `src/data/site.ts`.
 *
 * Le point de contact exact (présidente ou autre bénévole) n'est pas
 * confirmé côté Asmaa : on ne nomme personne dans l'UI, on dit
 * simplement "informations et réservations" + numéro.
 */
export const association = {
  name: "Le Cœur du Mas Cuisine",
  phone: "06 07 73 03 31",
  phoneHref: "tel:0607730331",
  email: "coeurmascuisine@gmail.com",
  emailHref: "mailto:coeurmascuisine@gmail.com",
  address:
    "Entre le 3 et le 4 chemin du Grand Bois, 69120 Vaulx-en-Velin",
  // Fiche officielle sur le site de la mairie de Vaulx-en-Velin.
  externalUrl:
    "https://vaulx-en-velin.net/sortir/vie-associative/annuaire-des-associations/le-coeur-du-mas-cuisine/",
  /** Montant de l'adhésion annuelle à l'association, condition de participation. */
  adhesionAmount: "5 €",
} as const;

/**
 * Liste des derniers ateliers animés par Asmaa au sein de l'association.
 * Source : flyers transmis par Asmaa (saisons 2025 + atelier Kéfir).
 *
 * Chaque entrée déclenche une card + une modale détaillée. Les champs
 * optionnels (date, duration, highlights) ne sont affichés dans la
 * modale que s'ils sont renseignés. Le champ `duration` est ici
 * utilisé pour afficher le créneau horaire exact (ex : "14h à 16h"),
 * plus informatif qu'une durée abstraite.
 */
export const ateliers: readonly Atelier[] = [
  {
    slug: "ete-2025-vitalite-hydratation",
    title: "Vitalité et hydratation",
    theme: "Été 2025",
    shortDescription:
      "Rester en pleine forme malgré la chaleur estivale avec des pratiques rafraîchissantes et énergisantes.",
    longDescription:
      "Atelier de l'été animé par Asmaa, naturopathe. Un temps pour traverser la saison chaude en pleine forme, en adoptant des gestes simples qui soutiennent l'hydratation et l'énergie au quotidien.",
    date: "2025-06-14",
    duration: "10h à 12h",
    highlights: [
      "Pratiques rafraîchissantes pour l'été",
      "Aliments et boissons énergisants",
      "Conseils pour préserver son tonus",
    ],
  },
  {
    slug: "automne-2025-immunite",
    title: "Immunité et changement de saison",
    theme: "Automne 2025",
    shortDescription:
      "Renforcer ses défenses naturelles et accueillir l'automne en douceur.",
    longDescription:
      "Atelier d'automne animé par Asmaa, naturopathe. Un rendez-vous pour préparer son corps au changement de saison et soutenir son immunité de façon naturelle avant les mois plus froids.",
    date: "2025-09-23",
    duration: "14h à 16h",
    highlights: [
      "Soutenir ses défenses naturelles",
      "Adapter son alimentation à l'automne",
      "Gestes préventifs avant l'hiver",
    ],
  },
  {
    slug: "hiver-2025-cocooning",
    title: "Cocooning et régénération",
    theme: "Hiver 2025",
    shortDescription:
      "Chouchouter son corps et son esprit pendant la saison froide.",
    longDescription:
      "Atelier hivernal animé par Asmaa, naturopathe. Un moment autour du cocooning et de la régénération, pour traverser la saison froide en prenant soin de soi sur tous les plans.",
    date: "2025-12-16",
    duration: "14h à 16h",
    highlights: [
      "Rituels de cocooning à la maison",
      "Soutenir son énergie en hiver",
      "Régénération corps et esprit",
    ],
  },
  {
    slug: "kefir-boisson-sante",
    title: "Kéfir, boisson santé et naturelle",
    theme: "Fermentation",
    shortDescription:
      "Découvrir le kéfir, probiotique naturel et ancestral, et apprendre à le préparer chez soi.",
    longDescription:
      "Atelier animé par Asmaa, naturopathe de Sunnah & Naturo. Un temps dédié au kéfir, boisson fermentée aux nombreux bienfaits, avec toutes les clés pour l'intégrer à son quotidien.",
    duration: "9h à 11h",
    highlights: [
      "Origines et bienfaits du kéfir",
      "Préparation maison pas à pas",
      "Conseils d'utilisation au quotidien",
    ],
    images: [
      "/atelier-keffir/1.jpeg",
      "/atelier-keffir/2.jpeg",
      "/atelier-keffir/3.jpeg",
      "/atelier-keffir/4.jpeg",
      "/atelier-keffir/5.jpeg",
      "/atelier-keffir/6.jpeg",
      "/atelier-keffir/7.jpeg",
    ],
  },
];
