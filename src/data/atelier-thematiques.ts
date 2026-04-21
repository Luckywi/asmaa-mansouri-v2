import type { ThematiqueAtelier } from "@/types";

/**
 * Les 5 thématiques d'ateliers proposées par Asmaa, rédigées par elle
 * (source : ATELIER.pdf transmis le 2026-04-17). Chaque thématique est
 * rendue en section verticale ancrée sur `/ateliers`, avec tags de
 * maillage interne vers les pages pertinentes du site (spécialités,
 * bio, médecines ancestrales).
 *
 * Quand une session concrète sera calée, on pourra soit (a) ajouter un
 * champ `nextSession` aux thématiques concernées, soit (b) promouvoir
 * la thématique dans une section "Ateliers à venir" indépendante.
 */

/**
 * Paragraphes d'intro affichés dans le Hero de `/ateliers`, sous le H1.
 * Extraits tels quels du PDF (2 paragraphes signés Asmaa).
 */
export const thematiquesIntro = {
  paragraphs: [
    "Parce que prendre soin de soi ne s'arrête pas à la salle de consultation, je vous propose des ateliers pratiques conçus pour vous redonner le pouvoir sur votre santé au quotidien. Fabriquer ses cosmétiques, nourrir son microbiote, se réconcilier avec les saveurs saines, comprendre ses cycles hormonaux : autant de gestes simples qui transforment profondément notre relation au corps et à la nature.",
    "Chaque atelier est pensé dans une approche globale, à la croisée de la naturopathie et de la médecine chinoise, pour que vous repartiez non seulement avec des recettes ou des outils, mais avec une véritable compréhension de votre terrain.",
  ],
} as const;

export const thematiques: readonly ThematiqueAtelier[] = [
  // ─── 1. ATELIER DIY — Cosmétiques maison ──────────────────────────
  {
    slug: "atelier-diy",
    eyebrow: "ATELIER DIY",
    title: "Fabriquez vos soins naturels",
    subtitle:
      "Cosmétiques maison : reprendre le contrôle de ce que l'on met sur sa peau",
    intro: [
      "Notre peau absorbe chaque jour des dizaines de molécules chimiques issues des cosmétiques conventionnels. Perturbateurs endocriniens, conservateurs synthétiques, parfums de synthèse : autant de substances étrangères que notre foie et nos reins doivent neutraliser. En naturopathie, nous considérons que la peau est à la fois un organe éliminatoire et une porte d'entrée. Ce que nous appliquons dessus compte autant que ce que nous mangeons.",
    ],
    highlight:
      "Lors de cet atelier, vous apprendrez à formuler vos propres soins à partir d'ingrédients que vous reconnaissez : huiles végétales, cires naturelles, hydrolats, argiles et huiles essentielles soigneusement sélectionnées.",
    outro: [
      "Nous aborderons la cosmétique naturelle non comme une tendance, mais comme une hygiène de vie à part entière. Chaque recette sera adaptée à votre type de peau et à votre terrain naturopathique : peau sèche, mixte, sensible ou à tendance acnéique. Un soin réellement personnalisé, formulé de vos propres mains.",
    ],
    bullets: [
      "Baume nourrissant corps et visage",
      "Sérum à l'huile d'argan et huiles essentielles",
      "Déodorant naturel sans bicarbonate irritant",
      "Démaquillant doux à l'hydrolat de rose ou de lavande",
    ],
    tags: [
      {
        label: "Perturbateurs endocriniens",
        href: "/specialites/desequilibres-hormonaux",
      },
      { label: "Terrain naturopathique", href: "/qui-suis-je/la-naturopathie" },
      {
        label: "Médecines ancestrales",
        href: "/qui-suis-je/medecines-ancestrales",
      },
    ],
  },

  // ─── 2. ATELIER FERMENTATION ──────────────────────────────────────
  {
    slug: "atelier-fermentation",
    eyebrow: "ATELIER FERMENTATION",
    title: "Kéfir, levain et jus revitalisants",
    subtitle: "Réveiller la vie dans votre assiette pour nourrir votre microbiote",
    intro: [
      "En médecine chinoise, l'intestin est le siège de la Rate-Pancréas, organe central de la transformation et du transport des aliments. Sa santé conditionne la qualité du Qi, l'énergie vitale, que nous produisons à chaque repas. En naturopathie, nous savons que 70 % de notre immunité réside dans notre microbiote intestinal. Ces deux visions convergent vers une même évidence : prendre soin de son intestin, c'est prendre soin de tout son être.",
    ],
    highlight:
      "Les aliments fermentés sont l'un des outils les plus puissants et les plus accessibles pour régénérer cet écosystème microbien. Kéfir de lait ou de fruits, levain naturel, jus de légumes lactofermentés : autant de préparations vivantes que vos ancêtres connaissaient et que nous avons progressivement perdues.",
    outro: [
      "Au cours de cet atelier, vous repartirez avec votre propre grain de kéfir actif, un levain chef prêt à l'emploi et plusieurs recettes de jus revitalisants riches en enzymes vivantes, en probiotiques naturels et en micronutriments biodisponibles. Vous comprendrez les mécanismes biologiques de la fermentation et apprendrez à entretenir ces cultures avec simplicité, au quotidien.",
    ],
    tags: [
      { label: "Microbiote intestinal", href: "/specialites/troubles-digestifs" },
      { label: "Immunité de fond", href: "/specialites/allergies-saisonnieres" },
      {
        label: "Médecine chinoise",
        href: "/qui-suis-je/medecines-ancestrales",
      },
    ],
  },

  // ─── 3. ATELIER GOURMAND ──────────────────────────────────────────
  {
    slug: "atelier-gourmand",
    eyebrow: "ATELIER GOURMAND",
    title: "Chocolat sain et goûter sans sucres raffinés",
    subtitle: "Réconcilier plaisir et équilibre, pour petits et grands",
    intro: [
      "Le sucre raffiné est aujourd'hui l'un des principaux facteurs inflammatoires de notre alimentation moderne. Pics glycémiques, perturbation hormonale, dysbiose intestinale, fatigue chronique : ses effets sur l'organisme sont documentés et profonds. Et pourtant, le plaisir de la douceur est légitime, nécessaire même. La naturopathie ne prône pas la privation : elle propose de réapprendre à se faire du bien vraiment.",
    ],
    highlight:
      "Lors de cet atelier, vous découvrirez comment reformuler vos moments de gourmandise avec des ingrédients de qualité : sucres à index glycémique bas, oléagineux riches en bons lipides, fèves de cacao crues, farines complètes, épices adaptogènes.",
    outro: [
      "Nous préparerons ensemble un chocolat au lait sain à partir de beurre de cacao et de poudre de cacao cru, sans sucres industriels. Puis un goûter équilibré (biscuits, barres d'énergie ou boules crues) qui nourrit réellement le corps et évite les coups de fatigue de l'après-midi. Un atelier idéal en famille, ou pour repenser les habitudes alimentaires de vos enfants.",
    ],
    tags: [
      {
        label: "Inflammation et hormones",
        href: "/specialites/desequilibres-hormonaux",
      },
      { label: "Dysbiose intestinale", href: "/specialites/troubles-digestifs" },
      { label: "Fatigue chronique", href: "/specialites/stress-burn-out" },
    ],
  },

  // ─── 4. SANTÉ FÉMININE — Alimentation et équilibre hormonal ───────
  {
    slug: "atelier-sante-feminine",
    eyebrow: "SANTÉ FÉMININE",
    title: "Alimentation et équilibre hormonal",
    subtitle:
      "Prévenir naturellement les dérèglements hormonaux à chaque étape de la vie",
    intro: [
      "Syndrome prémenstruel, cycles irréguliers, SOPK, endométriose, fatigue persistante, perturbations de l'humeur, prise de poids hormonale, périménopause : ces manifestations très fréquentes chez la femme sont souvent le reflet d'un terrain déséquilibré, qu'il est possible de soutenir en profondeur par l'alimentation et l'hygiène de vie.",
      "En médecine chinoise, les hormones relèvent de l'énergie du Rein, fondement du Jing (l'essence vitale) et siège de la constitution. La Rate-Pancréas, quant à elle, gouverne la transformation des nutriments et le bon ancrage de l'énergie. Un déséquilibre de ces deux organes se retrouve dans la grande majorité des tableaux hormonaux féminins.",
    ],
    highlight:
      "Cet atelier vous donne les clés pour comprendre vos hormones, identifier vos déséquilibres et adapter votre alimentation : phytoestrogènes, oméga-3, magnésium, zinc, vitamines du groupe B, plantes régulatrices (gattilier, sauge, rhodiola). Une approche globale, sans jargon médical.",
    bullets: [
      "Comprendre le cycle hormonal et ses acteurs principaux",
      "Les aliments qui perturbent les hormones (sucre, xénoestrogènes, carences)",
      "Les aliments et plantes protecteurs selon la phase du cycle",
      "Conseils pratiques pour chaque étape de vie (jeune femme, grossesse, ménopause)",
    ],
    tags: [
      { label: "SOPK", href: "/specialites/desequilibres-hormonaux#sopk" },
      {
        label: "Endométriose",
        href: "/specialites/desequilibres-hormonaux#endometriose",
      },
      {
        label: "Cycles irréguliers",
        href: "/specialites/desequilibres-hormonaux#cycles-irreguliers",
      },
      {
        label: "Périménopause",
        href: "/specialites/desequilibres-hormonaux",
      },
    ],
  },

  // ─── 5. DIÉTÉTIQUE SAISONNIÈRE ────────────────────────────────────
  {
    slug: "atelier-saisons",
    eyebrow: "DIÉTÉTIQUE SAISONNIÈRE",
    title: "Vivre en accord avec les saisons",
    subtitle: "Quatre ateliers, quatre énergies, la diététique chinoise au fil de l'année",
    intro: [
      "Dans la tradition de la médecine chinoise, chaque saison est associée à un organe, une saveur, une émotion et un type d'énergie dominant. Loin d'être une vision archaïque, cette sagesse millénaire rejoint aujourd'hui les données de la chronobiologie moderne : notre corps n'a pas les mêmes besoins en janvier qu'en juillet. S'alimenter et prendre soin de soi en harmonie avec les cycles naturels est l'un des actes de prévention les plus puissants qui soit.",
    ],
    highlight:
      "Chaque atelier saisonnier est conçu comme un rendez-vous de prévention : comprendre ce qui se joue dans le corps à ce moment de l'année, ajuster son alimentation, ses rituels, ses soins et son rythme de vie. Une invitation à renouer avec l'intelligence du vivant.",
    saisons: [
      {
        name: "Printemps",
        organe: "Foie",
        description:
          "Drainage hépatique, cure de sève de bouleau, aliments amers et vivifiants. Soutien du Foie et de la Vésicule Biliaire.",
      },
      {
        name: "Été",
        organe: "Cœur",
        description:
          "Légèreté, hydratation profonde, fruits frais et saveur amère. Soutien du Cœur et de l'Intestin Grêle.",
      },
      {
        name: "Automne",
        organe: "Poumon",
        description:
          "Immunité, saveur piquante, aliments blancs et racines. Soutien du Poumon et du Gros Intestin.",
      },
      {
        name: "Hiver",
        organe: "Rein",
        description:
          "Minéralisation, saveur salée, aliments noirs et réchauffants. Soutien du Rein et de la Vessie.",
      },
    ],
    tags: [
      {
        label: "Drainage de printemps",
        href: "/specialites/allergies-saisonnieres",
      },
      { label: "Immunité d'automne", href: "/specialites/allergies-saisonnieres" },
      {
        label: "Médecine chinoise",
        href: "/qui-suis-je/medecines-ancestrales",
      },
    ],
  },
];
