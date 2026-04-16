import { CircleDot, HandHeart, HeartHandshake, MessageCircle } from "lucide-react";
import type { Prestation } from "@/types";

/**
 * Les 4 grandes catégories de prestations d'Asmaa, regroupant les 7
 * services individuels listés sur Resalib :
 *
 *   - Consultation : Appel découverte, Bilan, Suivi
 *   - Massage Tuina : Haut du corps, Corps complet
 *   - Cupping Therapy : séance de ventouses
 *   - Accompagnement : programme intensif 3 mois
 *
 * Cette data alimente 3 surfaces :
 *   1. Section <Prestations /> de la landing (title/description/tagline)
 *   2. Hub /prestations (shortDescription + priceFrom)
 *   3. Page slug /prestations/[slug] (seoH1, tariffs, whatIs, steps,
 *      bridges, testimonialRoles)
 *
 * Les prix sont des **placeholders à confirmer avec Asmaa** — sources :
 * annonces Resalib publiques à la date de ce commit. À valider avant
 * publication.
 */
export const prestations: readonly Prestation[] = [
  {
    id: "consultation",
    slug: "consultation",
    icon: MessageCircle,
    category: "Consultation",
    tagline: "Bilan, suivi, découverte",
    title: "Consultations naturopathiques",
    description:
      "La consultation est le moment d'écoute privilégié où nous explorons ensemble votre histoire, vos symptômes et vos objectifs de santé. À l'issue de notre échange, je construis un protocole personnalisé combinant alimentation, plantes et techniques manuelles, adapté à votre singularité et à votre rythme de vie.",
    shortDescription:
      "On commence par une consultation bilan pour comprendre vos habitudes, identifier ce qui coince et poser ensemble un protocole clair : alimentation, plantes, nouvelles routines à installer. Les consultations de suivi viennent ensuite ajuster et avancer à votre rythme.",
    priceFrom: 50,
    detailHref: "/prestations/consultation",
    ctaLabel: "En savoir plus sur les consultations",
    seoH1: "Consultation naturopathique à Décines-Charpieu",
    seoSubtitle:
      "Un moment d'écoute approfondi pour comprendre ce qui se joue dans votre corps et construire un protocole qui vous ressemble. Cabinet à Décines-Charpieu (10 minutes de Lyon) ou consultation en visio au choix.",
    tariffs: [
      {
        label: "Appel découverte",
        price: "Gratuit",
        duration: "15 min",
        location: "Téléphone",
      },
      {
        label: "Consultation bilan",
        price: "80 €",
        duration: "1h30",
        location: "Cabinet ou visio",
      },
      {
        label: "Consultation de suivi",
        price: "50 €",
        duration: "30 min",
        location: "Cabinet ou visio",
      },
    ],
    whatIs: {
      title: "Qu'est-ce qu'une consultation naturopathique\u00A0?",
      content:
        "Une consultation naturopathique, c'est un vrai temps d'écoute et d'analyse de votre situation. On prend le temps de poser à plat vos habitudes de vie, votre alimentation, votre sommeil, votre cycle, vos antécédents et vos symptômes actuels pour comprendre ce qui se joue dans votre corps. À partir de là, je construis un protocole sur mesure qui combine alimentation, plantes, techniques manuelles et ajustements de rythme au quotidien.",
    },
    steps: {
      title: "Déroulé d'une consultation",
      items: [
        {
          number: "01",
          title: "Échange",
          description:
            "On pose à plat votre histoire, vos symptômes, votre mode de vie et vos objectifs. Rien n'est anodin : alimentation, sommeil, cycle, stress, digestion.",
        },
        {
          number: "02",
          title: "Analyse et bilan",
          description:
            "Je relie vos symptômes à vos habitudes, j'identifie les déséquilibres et les leviers sur lesquels on peut agir en priorité.",
        },
        {
          number: "03",
          title: "Protocole personnalisé",
          description:
            "On construit ensemble un plan clair : alimentation, plantes, routines quotidiennes, techniques manuelles si pertinent.",
        },
        {
          number: "04",
          title: "Retour à la maison",
          description:
            "Vous repartez avec un document écrit reprenant tout le protocole. Je reste disponible par message entre les rendez-vous.",
        },
      ],
    },
    faq: [
      {
        question:
          "Combien coûte une consultation naturopathique à Décines-Charpieu\u00A0?",
        answer:
          "L'appel découverte est gratuit et dure 15 minutes au téléphone. La consultation bilan initial est à 80 €, d'une durée d'1h30. Les consultations de suivi sont à 50 € pour 30 minutes. Vous recevez toujours une facture réglable par CB, espèces ou virement.",
      },
      {
        question:
          "Faut-il commencer par un appel découverte ou directement par un bilan\u00A0?",
        answer:
          "L'appel découverte sert surtout si vous hésitez, si vous voulez poser quelques questions ou vérifier qu'on est bien en phase avant de vous engager. Si vous êtes déjà décidée, vous pouvez prendre directement une consultation bilan : c'est là qu'on travaille vraiment votre situation.",
      },
      {
        question:
          "Peut-on faire la consultation en visio depuis Lyon ou ailleurs\u00A0?",
        answer:
          "Oui. Le cabinet est à Décines-Charpieu, à dix minutes de Lyon, mais toutes les consultations peuvent se faire en visio si vous préférez. C'est la même qualité d'écoute et le même protocole à la fin, envoyé par mail.",
      },
      {
        question:
          "La naturopathie est-elle remboursée par la mutuelle\u00A0?",
        answer:
          "La sécurité sociale ne rembourse pas la naturopathie, mais beaucoup de mutuelles proposent des forfaits médecines douces qui couvrent tout ou partie de la consultation. Je vous remets une facture à chaque séance : pensez à vérifier votre contrat avant de venir.",
      },
      {
        question:
          "Combien de temps dure un accompagnement en naturopathie\u00A0?",
        answer:
          "Ça dépend vraiment de ce qu'on travaille ensemble. Pour une problématique ponctuelle, un bilan plus un ou deux suivis suffisent souvent. Pour un déséquilibre hormonal installé ou un projet fertilité, comptez plutôt trois à six mois avec des rendez-vous réguliers. On pose un rythme ensemble au bilan, selon ce qui vous convient.",
      },
    ],
    bridges: [
      {
        href: "/specialites",
        iconKey: "flower",
        title: "Mes spécialités",
        description:
          "Déséquilibres hormonaux, troubles digestifs, fertilité, préménopause : huit problématiques que j'accompagne en naturopathie.",
        ctaLabel: "Voir les spécialités",
      },
      {
        href: "/prestations/massage-tuina",
        iconKey: "massage",
        title: "Massage Tuina",
        description:
          "Quand le travail naturopathique gagne à être soutenu par un travail manuel sur le corps : le Tuina prolonge et amplifie les effets.",
        ctaLabel: "Découvrir le Tuina",
      },
      {
        href: "/qui-suis-je",
        iconKey: "user",
        title: "Qui suis-je\u00A0?",
        description:
          "Mon parcours, mes formations et la manière dont je travaille au cabinet au quotidien.",
        ctaLabel: "Me découvrir",
      },
    ],
    testimonialRoles: ["Consultation", "Suivi naturopathique"],
  },
  {
    id: "tuina",
    slug: "massage-tuina",
    icon: HandHeart,
    category: "Massage Tuina",
    tagline: "Médecine traditionnelle chinoise",
    title: "Massage thérapeutique Tuina",
    description:
      "Le massage thérapeutique Tuina, issu de la médecine traditionnelle chinoise, agit sur les méridiens et les points d'énergie pour libérer les tensions, relancer la circulation et apaiser le système nerveux. Une approche manuelle profonde et structurée, qui complète idéalement le travail naturopathique en agissant directement sur le corps.",
    shortDescription:
      "Trois possibilités selon ce dont votre corps a besoin : haut du corps, bas du corps ou corps complet. Une approche de revitalisation qui détend en profondeur et relance votre énergie quand le quotidien tire trop fort.",
    priceFrom: 50,
    detailHref: "/prestations/massage-tuina",
    ctaLabel: "Comprendre le massage Tuina",
    seoH1: "Massage Tuina à Décines-Charpieu",
    seoSubtitle:
      "Un massage chinois thérapeutique qui travaille sur les méridiens et les points d'énergie pour libérer les tensions et relancer votre énergie. Cabinet à Décines-Charpieu, à dix minutes de Lyon.",
    tariffs: [
      {
        label: "Haut ou bas du corps",
        price: "50 €",
        duration: "30 min",
        location: "Cabinet",
      },
      {
        label: "Corps complet",
        price: "80 €",
        duration: "1h",
        location: "Cabinet",
      },
    ],
    whatIs: {
      title: "Qu'est-ce que le massage Tuina\u00A0?",
      content:
        "Le Tuina est l'une des cinq branches de la médecine traditionnelle chinoise, pratiqué depuis plus de deux mille ans. Contrairement à un massage de détente classique, il travaille directement sur les méridiens et les points d'énergie du corps pour décoincer ce qui bloque : une tension musculaire installée, une fatigue chronique, un stress qui s'accroche, un déséquilibre hormonal.",
    },
    steps: {
      title: "Déroulé d'une séance",
      items: [
        {
          number: "01",
          title: "Accueil et échange",
          description:
            "On fait le point sur votre état du jour, les zones qui tirent, ce que vous souhaitez travailler. Le massage est adapté à cet échange.",
        },
        {
          number: "02",
          title: "Installation",
          description:
            "Mon approche est exclusivement réservée aux femmes. La pièce est chauffée, vous vous installez confortablement à votre rythme.",
        },
        {
          number: "03",
          title: "Massage thérapeutique",
          description:
            "Travail progressif sur les méridiens et les zones ciblées. Les gestes sont toujours adaptés à votre tolérance et aux réactions de votre corps.",
        },
        {
          number: "04",
          title: "Temps de repos",
          description:
            "Quelques minutes allongée pour laisser le corps intégrer la séance. On termine par une discussion pour faire un point sur votre ressenti.",
        },
      ],
    },
    faq: [
      {
        question: "Le massage Tuina est-il douloureux\u00A0?",
        answer:
          "Le Tuina travaille en profondeur, donc certaines zones peuvent tirer un peu quand il y a des tensions installées. Rien de violent pour autant : j'ajuste la pression à votre ressenti tout au long de la séance, et on adapte au fur et à mesure.",
      },
      {
        question:
          "Quelle est la différence entre le Tuina et un massage de détente classique\u00A0?",
        answer:
          "Un massage de détente vise la relaxation immédiate. Le Tuina est thérapeutique : il travaille sur les méridiens et les points d'énergie pour débloquer des tensions de fond, relancer la circulation et agir sur le système nerveux. On en sort détendue, oui, mais surtout avec des effets qui se prolongent plusieurs jours.",
      },
      {
        question:
          "Combien coûte un massage Tuina à Décines-Charpieu\u00A0?",
        answer:
          "Le Tuina haut ou bas du corps est à 50 € pour 30 minutes. Le Tuina corps complet est à 80 € pour 1 heure. Les séances se déroulent uniquement au cabinet de Décines-Charpieu, à dix minutes de Lyon.",
      },
      {
        question:
          "Peut-on coupler le massage Tuina et la cupping therapy dans la même séance\u00A0?",
        answer:
          "Oui, c'est même souvent recommandé pour les tensions musculaires installées ou les blocages profonds. On commence par le Tuina pour préparer les tissus, puis on pose les ventouses sur les zones les plus contractées. La combinaison est devisée au cas par cas selon la durée.",
      },
    ],
    bridges: [
      {
        href: "/prestations/consultation",
        iconKey: "message",
        title: "Consultation naturopathique",
        description:
          "Le travail manuel gagne à être complété par un vrai bilan sur vos habitudes de vie. On pose les bases ensemble en consultation.",
        ctaLabel: "Voir les consultations",
      },
      {
        href: "/prestations/cupping-therapy",
        iconKey: "cupping",
        title: "Cupping therapy",
        description:
          "Pour aller plus loin sur les tensions tenaces que le massage seul ne suffit pas à dénouer. Souvent couplée au Tuina sur une même séance.",
        ctaLabel: "Découvrir les ventouses",
      },
    ],
    testimonialRoles: ["Massage Tuina"],
  },
  {
    id: "cupping",
    slug: "cupping-therapy",
    icon: CircleDot,
    category: "Cupping Therapy",
    tagline: "Ventouses thérapeutiques",
    title: "Cupping Therapy",
    description:
      "Issue de la médecine traditionnelle chinoise, la cupping therapy consiste à poser des ventouses sur la peau pour relâcher les tensions musculaires, soulager les douleurs chroniques et apaiser les zones de blocage. Une approche douce et ciblée, qui complète naturellement le massage thérapeutique Tuina et le travail naturopathique.",
    shortDescription:
      "Une séance qui relance la circulation sanguine, aide votre corps à évacuer ses toxines et libère les nœuds profonds que le massage seul ne suffit pas à dénouer. Souvent couplée à une séance de Tuina pour aller plus loin.",
    priceFrom: 80,
    detailHref: "/prestations/cupping-therapy",
    ctaLabel: "Découvrir la cupping therapy",
    seoH1: "Cupping therapy (ventouses) à Décines-Charpieu",
    seoSubtitle:
      "Des ventouses thérapeutiques pour relancer la circulation sanguine, libérer les nœuds profonds et soulager les tensions que le massage seul n'atteint pas. Cabinet à Décines-Charpieu, à dix minutes de Lyon.",
    tariffs: [
      {
        label: "Séance cupping therapy",
        price: "80 €",
        duration: "1h",
        location: "Cabinet",
      },
      {
        label: "Cupping + Tuina",
        price: "Sur devis",
        duration: "1h30",
        location: "Cabinet",
      },
    ],
    whatIs: {
      title: "Qu'est-ce que la cupping therapy\u00A0?",
      content:
        "La cupping therapy, ou thérapie par ventouses, est une pratique millénaire qu'on retrouve dans plusieurs traditions, notamment la médecine chinoise. On applique des ventouses, le plus souvent en verre ou en silicone, sur des zones ciblées du corps. La succion soulève en douceur les tissus superficiels (peau et fascia), relance la circulation sanguine locale et libère les nœuds profonds que le massage manuel n'atteint pas toujours. Les marques rondes qui peuvent apparaître après la séance ne viennent pas d'un choc mais de la succion qui fait remonter le sang vers la surface : ce sont de petites extravasations sans gravité, indolores, qui s'estompent en quelques jours. Particulièrement indiquée pour les tensions musculaires installées, les douleurs chroniques et les zones de blocage.",
    },
    steps: {
      title: "Déroulé d'une séance",
      items: [
        {
          number: "01",
          title: "Échange et repérage",
          description:
            "On identifie les zones de tension, l'historique des douleurs, les éventuelles contre-indications. Je vous explique ce que vous allez ressentir.",
        },
        {
          number: "02",
          title: "Préparation",
          description:
            "Selon la technique, j'applique une huile légère pour les ventouses glissantes, ou je pose directement les ventouses fixes sur les zones ciblées.",
        },
        {
          number: "03",
          title: "Pose des ventouses",
          description:
            "Les ventouses sont posées sur les zones ciblées, souvent dos, épaules, lombaires. Elles restent en place 5 à 15 minutes, succion ajustée à votre ressenti.",
        },
        {
          number: "04",
          title: "Relaxation et retour",
          description:
            "Quelques minutes de repos pour laisser le corps intégrer la séance. Je vous donne quelques conseils pour les jours qui suivent : hydratation, sport doux, éviter l'exposition solaire sur les marques.",
        },
      ],
    },
    faq: [
      {
        question:
          "Les marques laissées par les ventouses sont-elles des bleus\u00A0?",
        answer:
          "Pas au sens d'un choc. Les marques rondes viennent de la succion qui fait remonter le sang vers la surface de la peau : ce sont de petites extravasations capillaires sans gravité, indolores. Elles s'estompent naturellement en trois à dix jours selon votre peau et la zone travaillée. Leur couleur (du rose pâle au pourpre) donne aussi une indication sur l'état de circulation locale.",
      },
      {
        question: "La cupping therapy est-elle douloureuse\u00A0?",
        answer:
          "La succion des ventouses provoque une sensation de traction sur la peau, pas une douleur. Certaines personnes la trouvent même très agréable. Je règle toujours l'intensité de la succion à votre ressenti, surtout sur les zones très contractées où la sensation est plus marquée.",
      },
      {
        question:
          "Combien de séances de cupping faut-il pour soulager une douleur chronique\u00A0?",
        answer:
          "Ça dépend de l'ancienneté de la douleur et de sa localisation. Pour une tension musculaire récente, une ou deux séances peuvent suffire. Pour une douleur chronique installée, on part plutôt sur trois à cinq séances espacées d'une à deux semaines pour obtenir un vrai résultat durable.",
      },
      {
        question:
          "Peut-on combiner la cupping therapy et le massage Tuina sur une même séance\u00A0?",
        answer:
          "Oui, et c'est souvent l'approche la plus efficace. Le Tuina prépare les tissus et libère les grandes tensions, puis les ventouses vont chercher les nœuds profonds que le massage seul n'atteint pas. La durée et le tarif sont adaptés à votre situation au cas par cas.",
      },
      {
        question: "Y a-t-il des contre-indications à la cupping therapy\u00A0?",
        answer:
          "Oui, quelques-unes. Les ventouses ne sont pas recommandées en cas de grossesse (surtout les trois premiers mois), de troubles de la coagulation, de prise d'anticoagulants, de fragilité vasculaire marquée (varices), sur une peau lésée, ou en cas de fièvre ou d'infection aiguë. On fait toujours le point avant la séance pour vérifier qu'il n'y a pas de contre-indication dans votre situation.",
      },
    ],
    bridges: [
      {
        href: "/prestations/massage-tuina",
        iconKey: "massage",
        title: "Massage Tuina",
        description:
          "Souvent complémentaire à la cupping therapy : on peut coupler les deux sur une même séance pour un travail plus complet.",
        ctaLabel: "Découvrir le Tuina",
      },
      {
        href: "/prestations/accompagnement-3-mois",
        iconKey: "heart",
        title: "Accompagnement 3 mois",
        description:
          "Pour les douleurs installées qui demandent un travail de fond : la cupping peut s'intégrer à un suivi rapproché sur plusieurs mois.",
        ctaLabel: "Voir l'accompagnement",
      },
      {
        href: "/specialites",
        iconKey: "flower",
        title: "Mes spécialités",
        description:
          "Les problématiques sur lesquelles j'accompagne au quotidien : déséquilibres hormonaux, digestifs, fertilité, transitions de vie.",
        ctaLabel: "Voir les spécialités",
      },
    ],
    testimonialRoles: ["Cupping thérapie"],
  },
  {
    id: "accompagnement",
    slug: "accompagnement-3-mois",
    icon: HeartHandshake,
    category: "Accompagnement",
    tagline: "Programme intensif 3 mois",
    title: "Accompagnement 3 mois",
    description:
      "Le programme intensif sur trois mois est pensé pour les femmes qui souhaitent un accompagnement structuré et continu. Bilans réguliers, ajustements de protocole, soutien entre les séances : un suivi rapproché pour transformer durablement votre santé et installer de nouveaux équilibres au quotidien.",
    shortDescription:
      "Un suivi rapproché sur trois mois, avec un objectif clair : soulager vos symptômes ou aller chercher une amélioration durable. Pour les situations qui demandent du temps : SOPK, fertilité, déséquilibres hormonaux, troubles digestifs installés.",
    priceFrom: 350,
    detailHref: "/prestations/accompagnement-3-mois",
    ctaLabel: "Explorer l'accompagnement 3 mois",
    seoH1: "Accompagnement naturopathique 3 mois à Décines-Charpieu",
    seoSubtitle:
      "Un suivi rapproché sur trois mois pour transformer durablement votre santé : SOPK, fertilité, déséquilibres hormonaux, troubles digestifs. Cabinet à Décines-Charpieu ou consultations en visio, à dix minutes de Lyon.",
    tariffs: [
      {
        label: "Programme 3 mois",
        price: "350 €",
        duration: "3 rdv d'1h + appel hebdo 20 min",
        location: "Cabinet ou visio",
      },
    ],
    whatIs: {
      title: "Qu'est-ce que l'accompagnement 3 mois\u00A0?",
      content:
        "Certaines situations demandent du temps et de la continuité pour avancer vraiment. Le programme 3 mois est pensé exactement pour ça : trois consultations d'une heure à la fin de chaque mois, et un appel téléphonique de 20 minutes toutes les semaines pour ajuster le protocole au fur et à mesure que votre corps répond. Vous n'êtes jamais seule entre les rendez-vous : une question sur un symptôme, un doute sur une plante, un besoin de recadrage, on en parle chaque semaine au téléphone. C'est le format que je recommande pour les déséquilibres hormonaux installés (SOPK, endométriose, préménopause), les projets de fertilité et les situations digestives chroniques qui ne se règlent pas en une seule consultation.",
    },
    steps: {
      title: "Déroulé du programme",
      items: [
        {
          number: "01",
          title: "Démarrage du programme",
          description:
            "Tout part d'une consultation bilan complète, généralement réalisée en amont. C'est elle qui pose le cadre : on identifie vos priorités et on cale ensemble le protocole sur lequel on va travailler pendant les trois mois.",
        },
        {
          number: "02",
          title: "Suivi hebdomadaire",
          description:
            "Un appel téléphonique de 20 minutes chaque semaine pour écouter vos retours, prendre en compte les évolutions et ajuster le programme au fur et à mesure que votre corps répond.",
        },
        {
          number: "03",
          title: "Rendez-vous mensuel",
          description:
            "Un rendez-vous d'une heure à la fin de chaque mois pendant les trois mois (cabinet ou visio) pour faire un point complet, mesurer les progrès et affiner les protocoles.",
        },
        {
          number: "04",
          title: "Clôture et suite",
          description:
            "À la fin des trois mois, on prend le temps de regarder ce qui a changé et on prépare la suite : consultations de suivi espacées, nouveau cycle ou autonomie selon votre situation.",
        },
      ],
    },
    faq: [
      {
        question: "Pourquoi un accompagnement de 3 mois et pas moins\u00A0?",
        answer:
          "Un déséquilibre hormonal, un projet fertilité ou un trouble digestif installé ne se règle pas en une consultation. Le corps a besoin de temps pour répondre aux changements : trois mois permettent d'installer un protocole, de l'ajuster en cours de route et de mesurer des résultats concrets. Moins de temps, c'est rarement suffisant pour ce type de situation.",
      },
      {
        question:
          "Le programme 3 mois est-il accessible en visio depuis Lyon ou ailleurs\u00A0?",
        answer:
          "Oui, les trois consultations mensuelles et les appels hebdomadaires peuvent se faire entièrement en visio ou au téléphone. Le suivi est le même qu'en cabinet : même qualité d'écoute, même protocole, même disponibilité. Le cabinet est à dix minutes de Lyon si vous préférez venir sur place.",
      },
      {
        question:
          "Quelles situations tirent le plus parti d'un accompagnement long\u00A0?",
        answer:
          "Le programme 3 mois est particulièrement adapté aux déséquilibres hormonaux (SOPK, endométriose, préménopause), aux projets de fertilité, aux troubles digestifs chroniques et aux fatigues installées. Tout ce qui demande un travail de fond et un vrai suivi, plutôt qu'une consultation ponctuelle.",
      },
      {
        question: "Que comprend exactement le programme 3 mois\u00A0?",
        answer:
          "Trois consultations d'une heure à la fin de chaque mois (cabinet ou visio), un appel téléphonique de 20 minutes chaque semaine pour suivre vos ressentis et ajuster si besoin, et un protocole complet remis à chaque rendez-vous. Le tarif global est de 350 €, payable en une ou plusieurs fois.",
      },
      {
        question:
          "Peut-on prolonger l'accompagnement après les 3 mois\u00A0?",
        answer:
          "Bien sûr, si vous en ressentez le besoin. Certaines femmes continuent avec des consultations de suivi espacées (50 € les 30 minutes), d'autres repartent sur un nouveau cycle de 3 mois si la situation le justifie. On fait le point ensemble à la consultation de clôture.",
      },
    ],
    bridges: [
      {
        href: "/specialites",
        iconKey: "flower",
        title: "Mes spécialités",
        description:
          "SOPK, endométriose, fertilité, préménopause : les problématiques qui tirent le plus parti d'un suivi rapproché sur plusieurs mois.",
        ctaLabel: "Voir les spécialités",
      },
      {
        href: "/prestations/consultation",
        iconKey: "message",
        title: "Consultation naturopathique",
        description:
          "Si vous préférez commencer par une consultation unique avant de vous engager dans un suivi long : le bilan initial est la bonne porte d'entrée.",
        ctaLabel: "Voir les consultations",
      },
    ],
    testimonialRoles: ["Suivi naturopathique"],
  },
] as const;
