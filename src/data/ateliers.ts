import type { Atelier } from "@/types";

/**
 * Liste des derniers ateliers animés par Asmaa, conservés sur la page
 * `/ateliers` pour témoigner d'une pratique d'animation déjà installée.
 *
 * Les références aux associations ou structures partenaires ont été
 * retirées volontairement : Asmaa a choisi une communication 100 %
 * indépendante depuis avril 2026 et reste ouverte à toute collaboration
 * future (cf. section `Organiser` de la page).
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
      "Atelier de l'été animé par Asmaa. Un temps pour traverser la saison chaude en pleine forme, en adoptant des gestes simples qui soutiennent l'hydratation et l'énergie au quotidien.",
    date: "2025-06-14",
    duration: "10h à 12h",
    highlights: [
      "Pratiques rafraîchissantes pour l'été",
      "Aliments et boissons énergisants",
      "Conseils pour préserver son tonus",
    ],
    poster: "/ateliers-affiches/vitalite-hydratation.jpeg",
  },
  {
    slug: "automne-2025-immunite",
    title: "Immunité et changement de saison",
    theme: "Automne 2025",
    shortDescription:
      "Renforcer ses défenses naturelles et accueillir l'automne en douceur.",
    longDescription:
      "Atelier d'automne animé par Asmaa. Un rendez-vous pour préparer son corps au changement de saison et soutenir son immunité de façon naturelle avant les mois plus froids.",
    date: "2025-09-23",
    duration: "14h à 16h",
    highlights: [
      "Soutenir ses défenses naturelles",
      "Adapter son alimentation à l'automne",
      "Gestes préventifs avant l'hiver",
    ],
    poster: "/ateliers-affiches/immunite-changement-saison.jpeg",
  },
  {
    slug: "hiver-2025-cocooning",
    title: "Cocooning et régénération",
    theme: "Hiver 2025",
    shortDescription:
      "Chouchouter son corps et son esprit pendant la saison froide.",
    longDescription:
      "Atelier hivernal animé par Asmaa. Un moment autour du cocooning et de la régénération, pour traverser la saison froide en prenant soin de soi sur tous les plans.",
    date: "2025-12-16",
    duration: "14h à 16h",
    highlights: [
      "Rituels de cocooning à la maison",
      "Soutenir son énergie en hiver",
      "Régénération corps et esprit",
    ],
    poster: "/ateliers-affiches/cocooning-regeneration.jpeg",
  },
  {
    slug: "kefir-boisson-sante",
    title: "Kéfir, boisson santé et naturelle",
    theme: "Fermentation",
    shortDescription:
      "Découvrir le kéfir, probiotique naturel et ancestral, et apprendre à le préparer chez soi.",
    longDescription:
      "Atelier animé par Asmaa autour du kéfir, boisson fermentée aux nombreux bienfaits, avec toutes les clés pour l'intégrer à son quotidien.",
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
  {
    slug: "baume-anti-moustique-vaulx-en-velin",
    title: "Baume anti-moustique naturel",
    theme: "Atelier public",
    shortDescription:
      "Atelier animé à l'inauguration de la pépinière du Mas du Taureau à Vaulx-en-Velin, autour d'une recette naturelle de protection contre le moustique tigre.",
    longDescription:
      "Atelier public animé par Asmaa lors de l'inauguration de la pépinière du Mas du Taureau, en présence des habitants de Vaulx-en-Velin, de la maire de la ville et du préfet de Lyon. L'occasion de partager des solutions naturelles pour se protéger du moustique tigre, particulièrement présent dans la région lyonnaise, avec une recette de baume que chaque participante peut refaire chez elle.\n\nApporter des réponses naturelles aux tracas du quotidien, sans inciter à la consommation de produits industriels chargés en perturbateurs endocriniens et conservateurs chimiques : c'est au cœur de ma démarche de naturopathe.",
    date: "2023-06-23",
    location: "Pépinière du Mas du Taureau, Vaulx-en-Velin",
    highlights: [
      "Protection naturelle contre le moustique tigre",
      "Recette de baume facile à refaire à la maison",
      "Alternative aux répulsifs industriels du commerce",
    ],
    images: [
      "/atelier-moustique/1.webp",
      "/atelier-moustique/2.webp",
      "/atelier-moustique/3.webp",
      "/atelier-moustique/4.webp",
    ],
  },
];
