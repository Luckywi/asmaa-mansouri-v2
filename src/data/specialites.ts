import type { Specialite } from "@/types";

/**
 * Les 4 spécialités accompagnées par Asmaa. Contenu éditorial construit
 * à partir du document rédigé par Asmaa (filtré anti-slop) et enrichi en
 * SEO local (Décines, Lyon, Meyzieu, Vaulx-en-Velin, Bron, Villeurbanne).
 *
 * La spécialité "desequilibres-hormonaux" est une entrée parapluie qui
 * regroupe, via le champ `conditions`, cinq sous-sections pathologies
 * (SOPK, endométriose, fertilité, post-partum, cycles irréguliers)
 * chacune accessible via une ancre URL type `#sopk`, `#endometriose`.
 */
export const specialites: readonly Specialite[] = [
  // ─── 1. Troubles digestifs ────────────────────────────────────────
  {
    slug: "troubles-digestifs",
    title: "Troubles digestifs",
    shortDescription:
      "Ballonnements, reflux, intestin irritable, digestion perturbée. Un accompagnement naturopathique qui travaille sur les causes profondes, au cabinet de Décines-Charpieu.",
    intro:
      "Naturopathe à Décines-Charpieu, j'accompagne les femmes dans toute la région lyonnaise qui vivent avec des troubles digestifs chroniques. Ballonnements récurrents, intestin irritable, reflux, lourdeurs après les repas : ces signaux ne sont pas une fatalité, ils parlent d'un terrain qui demande à être écouté.",
    definition: {
      title: "Derrière les symptômes, un terrain à explorer",
      content:
        "Les troubles digestifs chroniques expriment rarement un problème isolé. Derrière un ballonnement qui s'installe chaque soir, un reflux qui revient après les repas ou un intestin irritable qui dicte votre rythme, il y a presque toujours un terrain fragilisé qui cherche à se faire entendre.\n\nLa phrase reprise par Antoine Béchamp le résume bien : le virus n'est rien, le terrain est tout. En naturopathie, on ne cherche pas à faire taire un symptôme, on cherche à comprendre pourquoi le corps l'envoie.\n\nBeaucoup des femmes que je reçois au cabinet portent une charge mentale et physique importante : vie professionnelle, enfants, gestion du foyer. Leur corps absorbe ce que leur emploi du temps ne permet plus de digérer. Les troubles digestifs sont alors souvent le premier signal d'alarme, celui qui précède d'autres déséquilibres si on ne l'écoute pas.",
    },
    symptomes: {
      title: "Reconnaître les troubles digestifs chroniques",
      intro:
        "Ces signes, pris isolément, peuvent sembler banals. C'est leur répétition et leur installation dans la durée qui trahissent un déséquilibre de fond.",
      items: [
        "Ballonnements récurrents, ventre gonflé en cours de journée",
        "Reflux gastriques et remontées acides",
        "Inconfort digestif marqué après les repas",
        "Intestin irritable, alternance de diarrhée et de constipation",
        "Transit paresseux ou irrégulier",
        "Sensation de lourdeur, digestion lente",
        "Fatigue marquée après les repas",
        "Maux de ventre chroniques sans cause médicale identifiée",
      ],
    },
    approche: {
      title: "Mon approche naturopathique des troubles digestifs",
      content:
        "En naturopathie, l'intestin est bien plus qu'un simple organe de digestion : c'est le pilier central de l'immunité, de l'énergie et même de l'équilibre émotionnel. En médecine traditionnelle chinoise, la Rate-Pancréas et l'Estomac sont les organes de la transformation. Quand ils sont affaiblis par le stress ou une mauvaise hygiène de vie, tout le système en souffre.\n\nMa démarche s'articule autour de trois temps qui se succèdent au fil de l'accompagnement.\n\nDrainer d'abord : libérer les organes émonctoires surchargés, en commençant par l'intestin puis le foie. Un terrain qui ne s'élimine pas bien s'intoxique de l'intérieur. C'est une phase préalable indispensable avant toute reconstruction.\n\nDétoxiquer ensuite : identifier et réduire ce qui encombre au quotidien. Alimentation inadaptée au terrain, stress chronique, dysbiose intestinale, perméabilité digestive, perturbateurs du microbiote. Cette étape se fait par ajustements progressifs, sans restriction sévère.\n\nRevitaliser enfin : nourrir et reconstruire la muqueuse intestinale, rééquilibrer le microbiote, redonner de l'énergie. C'est à ce stade que les améliorations deviennent durables.\n\nLes outils que j'utilise : phytothérapie ciblée, drainage naturopathique doux, hygiène alimentaire personnalisée selon votre terrain (combinaisons alimentaires, aliments fermentés, réduction des irritants), gemmothérapie et soutien énergétique par la médecine traditionnelle chinoise. L'observation de la langue et la prise du pouls affinent mon analyse du terrain au fil des séances.\n\nPour les femmes de Décines, Meyzieu, Vaulx-en-Velin ou Bron, les consultations ont lieu au cabinet ; la visio reste une option si vous ne pouvez pas vous déplacer.",
    },
    faq: [
      {
        question: "La naturopathie peut-elle vraiment soulager un intestin irritable ?",
        answer:
          "Oui. L'intestin irritable est souvent l'expression d'un terrain global déséquilibré : stress, dysbiose intestinale, alimentation inadaptée, surcharge du foie. En travaillant ces causes profondes plutôt que les symptômes, on obtient des résultats durables. La plupart de mes patientes notent une amélioration nette dès les premières semaines d'accompagnement.",
      },
      {
        question: "Combien de temps faut-il pour ressentir une amélioration ?",
        answer:
          "Les premières améliorations, notamment sur les ballonnements et la qualité du transit, se ressentent généralement entre la troisième et la sixième semaine. Le travail de fond sur le terrain, celui qui inscrit les résultats dans la durée, demande deux à trois mois selon l'ancienneté des troubles.",
      },
      {
        question: "Faut-il suivre un régime strict pour calmer ses troubles digestifs ?",
        answer:
          "Non. Mon approche ne repose pas sur des restrictions sévères mais sur une meilleure compréhension de votre fonctionnement digestif. Je propose des ajustements progressifs, adaptés à votre quotidien et à votre terrain, plutôt qu'une liste d'interdits difficile à tenir sur la durée.",
      },
      {
        question: "Peut-on travailler sur la digestion avec un traitement médical en cours ?",
        answer:
          "Oui, les deux approches sont complémentaires. Je travaille toujours en cohérence avec votre suivi médical, sans jamais me substituer à votre médecin ou à votre gastro-entérologue. L'objectif est de réduire progressivement l'inflammation de fond et de restaurer un confort digestif durable, en parallèle des soins conventionnels.",
      },
      {
        question: "Les troubles digestifs sont-ils liés au stress ?",
        answer:
          "Très souvent, oui. Le stress chronique et la charge mentale sont presque systématiquement en arrière-plan des troubles digestifs fonctionnels. Les deux dimensions se nourrissent l'une l'autre : un intestin perturbé amplifie l'anxiété, un système nerveux à bout fragilise la sphère digestive. C'est pour cette raison que je travaille toujours les deux axes de front, plutôt que l'un après l'autre.",
      },
      {
        question: "Où consulter une naturopathe pour des troubles digestifs près de Lyon ?",
        answer:
          "Mon cabinet est situé à Décines-Charpieu, à quelques minutes de Lyon par la rocade Est et directement accessible en tramway T3. J'accueille régulièrement des femmes venant de Lyon, Meyzieu, Vaulx-en-Velin, Villeurbanne, Bron et de l'ensemble de l'Est lyonnais. Les consultations en visio sont également possibles si vous ne pouvez pas vous déplacer.",
      },
    ],
  },

  // ─── 2. Allergies saisonnières ────────────────────────────────────
  {
    slug: "allergies-saisonnieres",
    title: "Allergies saisonnières",
    shortDescription:
      "Rhinite allergique, yeux qui piquent, sinusite, fatigue chaque printemps. Un accompagnement en amont de la saison pollinique pour rééquilibrer le terrain, au cabinet de Décines-Charpieu.",
    intro:
      "Naturopathe à Décines-Charpieu, j'accompagne les femmes dans toute la région lyonnaise qui souffrent chaque année d'allergies saisonnières. Rhinite, sinusite, maux de tête liés aux pollens : j'ai moi-même traversé ces symptômes avant de comprendre, grâce à la naturopathie, qu'ils n'étaient pas une fatalité.",
    definition: {
      title: "Pourquoi on devient allergique",
      content:
        "Chaque printemps, c'était le même rituel : nez qui coulait sans arrêt, yeux larmoyants, maux de tête liés au mucus accumulé dans les sinus. Des traitements antihistaminiques et corticoïdes à répétition qui soulageaient sans jamais résoudre.\n\nC'est en me formant à la naturopathie que j'ai compris quelque chose d'essentiel : on ne devient pas allergique par hasard. On le devient parce que le terrain est fragilisé, surchargé, incapable de répondre de façon proportionnée à des allergènes que d'autres organismes tolèrent sans difficulté.\n\nLe système immunitaire d'une femme allergique n'est pas défectueux, il est simplement dépassé. Foie engorgé, intestin perméable, microbiote appauvri, inflammation de fond : quand on travaille ces axes en amont de la saison pollinique, les crises diminuent nettement, parfois disparaissent. C'est ce que j'ai vécu personnellement et ce que j'accompagne aujourd'hui chez mes patientes.",
    },
    symptomes: {
      title: "Les signes d'une allergie saisonnière installée",
      intro:
        "Dans la région lyonnaise, la saison commence dès février avec le bouleau et se prolonge jusqu'à l'été avec les graminées. Si vous reconnaissez plusieurs de ces signaux chaque année, il y a un terrain à travailler en profondeur.",
      items: [
        "Rhinite allergique, nez qui coule, éternuements en salve",
        "Yeux larmoyants, rouges, démangeaisons",
        "Maux de tête liés à l'accumulation de mucus dans les sinus",
        "Sinusites à répétition au printemps",
        "Congestion nasale, sensation de nez bouché",
        "Fatigue saisonnière liée à l'inflammation de fond",
        "Dépendance aux antihistaminiques ou corticoïdes chaque saison",
      ],
    },
    approche: {
      title: "Mon approche pour rééquilibrer le terrain allergique",
      content:
        "En naturopathie, l'allergie est le signal d'un organisme surchargé qui réagit de façon disproportionnée. L'intestin, le foie et les poumons sont les trois grands émonctoires impliqués. En médecine traditionnelle chinoise, le printemps est la saison du Foie et de la Vésicule Biliaire : lorsque ces organes sont engorgés, toute la capacité d'adaptation de l'organisme au changement de saison s'en trouve compromise. Les Poumons, organes du Métal, gouvernent par ailleurs la peau et les muqueuses, première ligne de défense face aux allergènes.\n\nMon accompagnement se construit en trois temps, idéalement anticipés sur la saison pollinique.\n\nPréparer le terrain en amont, 6 à 8 semaines avant l'explosion des pollens. Drainage du foie et de l'intestin, réduction de la charge inflammatoire globale. C'est la phase qui change tout : plus elle est faite tôt, moins la saison est difficile.\n\nSoutenir les muqueuses pendant la période sensible. Lavage nasal quotidien, aromathérapie ciblée avec la camomille romaine, l'eucalyptus ou le pin sylvestre, hygiène alimentaire anti-inflammatoire pour réduire la production de mucus. Ce sont des gestes simples qui limitent la réaction locale au contact des allergènes.\n\nRenforcer l'immunité de fond sur la durée. Microbiote, gemmothérapie, phytothérapie adaptée au terrain de chaque femme, pour que les saisons suivantes soient de plus en plus légères. C'est le travail qui permet de sortir progressivement de la dépendance aux antihistaminiques, toujours en lien avec votre médecin.\n\nPour les femmes de Décines, Meyzieu, Vaulx-en-Velin et de l'Est lyonnais, l'idéal est d'entamer cet accompagnement en hiver, avant que les premiers pollens de bouleau ne se manifestent.",
    },
    faq: [
      {
        question: "Peut-on vraiment guérir d'une allergie saisonnière ?",
        answer:
          "Je préfère parler de rééquilibrage du terrain plutôt que de guérison. Mais oui, quand l'organisme retrouve sa capacité d'adaptation, les réactions allergiques diminuent considérablement, et peuvent disparaître. C'est ce que j'ai vécu personnellement, et ce que constatent la plupart des femmes que j'accompagne sur plusieurs saisons.",
      },
      {
        question: "À quel moment faut-il commencer l'accompagnement naturopathique ?",
        answer:
          "Idéalement 6 à 8 semaines avant le début de la saison pollinique, soit dès janvier pour anticiper les pollens de bouleau dans la région lyonnaise. Même en pleine crise, il reste possible d'agir pour réduire l'intensité des symptômes et préparer la saison suivante sur de meilleures bases.",
      },
      {
        question: "Est-ce compatible avec un traitement antihistaminique en cours ?",
        answer:
          "Oui. La naturopathie travaille en parallèle du traitement symptomatique pour réduire progressivement la dépendance aux médicaments, sur le long terme et en lien avec votre médecin traitant. L'objectif n'est pas d'arrêter brutalement un traitement qui vous soulage, mais de restaurer le terrain pour en avoir de moins en moins besoin.",
      },
      {
        question: "Le lavage nasal est-il vraiment efficace contre les pollens ?",
        answer:
          "Oui, c'est un geste simple et très efficace pour éliminer mécaniquement les allergènes présents dans les muqueuses et limiter la réaction inflammatoire locale. Associé à l'aromathérapie ciblée, c'est souvent ce qui change tout au quotidien pendant la saison pollinique.",
      },
      {
        question: "Pourquoi les allergies s'aggravent-elles d'année en année chez certaines femmes ?",
        answer:
          "Parce que sans prise en charge du terrain, chaque saison aggrave un peu plus la surcharge. L'organisme s'épuise à répondre à des sollicitations répétées sans que les causes de fond soient travaillées. C'est un signal qu'il faut entendre, pas faire taire.",
      },
      {
        question: "Naturopathe allergies saisonnières à Lyon : quand prendre rendez-vous ?",
        answer:
          "Pour les femmes de Lyon, Décines-Charpieu, Meyzieu, Villeurbanne ou Vaulx-en-Velin, je recommande de prendre rendez-vous dès janvier ou février pour anticiper la saison. Un premier appel découverte gratuit permet d'évaluer ensemble votre terrain et de poser les bases d'un accompagnement adapté à votre situation.",
      },
    ],
  },

  // ─── 3. Stress & burn-out ─────────────────────────────────────────
  {
    slug: "stress-burn-out",
    title: "Stress & burn-out",
    shortDescription:
      "Fatigue qui ne cède pas avec le repos, sommeil perturbé, charge mentale saturée. Un accompagnement qui travaille à la fois le terrain physique et la reconnexion à soi, au cabinet de Décines-Charpieu.",
    intro:
      "Naturopathe à Décines-Charpieu, j'accompagne les femmes dans toute la région lyonnaise qui traversent un épuisement chronique ou un burn-out. Surcharges professionnelle et familiale, carences installées, système nerveux à bout : un travail de fond est possible pour retrouver de l'énergie et renouer avec ses propres besoins.",
    definition: {
      title: "Quand le corps dit stop",
      content:
        "Le burn-out ne s'installe pas brutalement. Il se met en place progressivement, sur un terrain sollicité trop longtemps sans jamais être nourri en retour. Professionnellement, la femme qui me consulte tient encore. Intérieurement, elle est à bout.\n\nCe que j'observe au cabinet, c'est une forme d'épuisement qui ne cède plus au repos. Le week-end ne répare plus. Les vacances ne comblent plus. L'énergie ne revient pas, et avec elle s'en vont la patience, la motivation, parfois même la capacité à ressentir.\n\nL'accompagnement naturopathique ne se limite pas à apporter des plantes ou des conseils alimentaires. Il consiste à aider la femme qui me consulte à renouer avec elle-même : son corps, ses besoins, son rythme. Le lâcher-prise et la reconnexion à soi font partie intégrante du protocole, au même titre que la phytothérapie ou la correction des carences.",
    },
    symptomes: {
      title: "Reconnaître un épuisement chronique",
      intro:
        "Ces signaux, quand ils se cumulent sur plusieurs semaines, dessinent un tableau de burn-out qui mérite d'être accompagné plutôt que banalisé.",
      items: [
        "Fatigue profonde qui ne cède pas avec le repos",
        "Troubles du sommeil, endormissement difficile, réveils nocturnes",
        "Irritabilité, émotivité, larmes qui arrivent sans prévenir",
        "Sentiment de vide intérieur, perte de motivation",
        "Tensions musculaires, mâchoires serrées, nuque et épaules contractées",
        "Troubles digestifs associés, foie engorgé, transit perturbé",
        "Carences fréquentes en ferritine, magnésium, vitamine D",
        "Déséquilibre hormonal sous-jacent, cycles irréguliers, SPM accentué",
      ],
    },
    approche: {
      title: "Mon accompagnement du stress et du burn-out",
      content:
        "En médecine traditionnelle chinoise, le Foie est l'organe des émotions refoulées et de la stagnation du Qi. Quand une femme retient trop (ses émotions, ses besoins, sa colère intérieure), le Qi du Foie se bloque, la circulation énergétique se grippe, et l'ensemble de l'organisme en souffre. Le stress chronique est rarement une question de caractère : c'est une question de terrain et d'équilibre énergétique.\n\nMon accompagnement s'articule autour de quatre axes complémentaires.\n\nÉvaluation globale du terrain d'abord : sommeil, alimentation, carences avec la ferritine en particulier, état du foie, équilibre hormonal. Un bilan biologique récent, quand il existe, éclaire la suite du protocole.\n\nLe massage Tuina ensuite, mon outil thérapeutique manuel principal. Il libère les tensions physiques et émotionnelles accumulées sur les méridiens, relâche ce qui est bloqué dans le corps. Les patientes décrivent souvent une sensation de légèreté profonde après la séance, une qualité de détente qu'elles n'avaient pas retrouvée depuis longtemps.\n\nPhytothérapie et micronutrition adaptées à votre terrain. Plantes adaptogènes pour soutenir les surrénales, correction ciblée des carences identifiées, soutien du système nerveux.\n\nLâcher-prise et reconnexion enfin. Une invitation à ralentir, à écouter les signaux du corps, à retrouver une pratique intérieure qui redonne du sens et de l'ancrage. Cette dimension n'est pas un supplément : c'est ce qui permet au reste du travail de tenir dans la durée.\n\nPour les femmes de Décines-Charpieu, Meyzieu, Villeurbanne et de l'agglomération lyonnaise, je propose un rythme adapté à votre réalité professionnelle, sans obligation d'arrêt de travail.",
    },
    faq: [
      {
        question: "Suis-je vraiment en burn-out ou juste fatiguée ?",
        answer:
          "Ce qui distingue la fatigue passagère du burn-out, c'est que le repos seul ne suffit plus à récupérer. Si vous vous levez aussi épuisée que vous vous êtes couchée depuis plusieurs semaines, si les vacances ne vous remettent plus d'aplomb, si l'énergie ne revient plus malgré les weekends, c'est un signal important qu'il ne faut pas ignorer.",
      },
      {
        question: "Faut-il s'arrêter de travailler pour consulter ?",
        answer:
          "Non. L'accompagnement naturopathique s'adapte à votre réalité professionnelle. Des ajustements progressifs sur le sommeil, l'alimentation, la micronutrition et la gestion du stress peuvent déjà faire une grande différence sans tout bouleverser. Si un arrêt est nécessaire, il relève de votre médecin traitant, pas de la naturopathie.",
      },
      {
        question: "Le massage Tuina est-il douloureux ?",
        answer:
          "Non. Le Tuina est un massage thérapeutique chinois qui travaille sur les méridiens. La pression s'adapte à chaque personne et à son terrain. La plupart de mes patientes ressentent une profonde détente pendant et après la séance, avec une sensation de légèreté qui peut se prolonger plusieurs jours.",
      },
      {
        question: "En combien de séances voit-on une amélioration ?",
        answer:
          "Les premières améliorations, notamment sur la qualité du sommeil et la tension corporelle, se ressentent souvent dès 3 à 4 séances. La reconstruction profonde du terrain demande 2 à 3 mois minimum selon l'ancienneté de l'épuisement et la sévérité des carences éventuelles.",
      },
      {
        question: "Faut-il faire une prise de sang avant de consulter ?",
        answer:
          "C'est recommandé, oui. La ferritine basse est extrêmement fréquente chez les femmes en burn-out et passe souvent inaperçue dans les bilans classiques. Je vous accompagne pour interpréter ces résultats dans une logique de terrain global, pas seulement en fonction des normes de laboratoire.",
      },
      {
        question: "Naturopathe burn-out à Lyon : comment se déroule le premier rendez-vous ?",
        answer:
          "Le premier rendez-vous est un bilan d'une heure trente au cabinet de Décines-Charpieu, accessible depuis Lyon par la rocade ou le tramway T3. Nous faisons ensemble le tour de votre histoire, de votre rythme de vie, de vos carences éventuelles, de votre sommeil. À l'issue de cette consultation, je vous remets un protocole personnalisé avec des axes concrets à mettre en place.",
      },
    ],
  },

  // ─── 4. Déséquilibres hormonaux (spécialité parapluie) ────────────
  {
    slug: "desequilibres-hormonaux",
    title: "Déséquilibres hormonaux",
    shortDescription:
      "SOPK, endométriose, syndrome prémenstruel, préménopause, fertilité, post-partum : un accompagnement global pour rééquilibrer durablement le terrain hormonal, au cabinet de Décines-Charpieu.",
    intro:
      "Naturopathe à Décines-Charpieu, j'accompagne les femmes dans toute la région lyonnaise qui traversent un déséquilibre hormonal : SOPK, endométriose, syndrome prémenstruel, cycles irréguliers, préménopause, projet de fertilité ou récupération post-partum. Mon approche travaille le terrain global, pas seulement les symptômes.",
    definition: {
      title: "Les hormones ne se déséquilibrent jamais seules",
      content:
        "Douleurs menstruelles banalisées depuis des années, syndrome prémenstruel qui s'intensifie avec le temps, cycles qui se dérèglent, préménopause qui s'installe sans crier gare. Ces signaux ne sont pas anodins, et ils ne sont pas une fatalité.\n\nNotre médecine a longtemps appris aux femmes à faire taire ces signaux : antidouleurs, pilule, traitement hormonal. La sagesse tibétaine le dit autrement : si tu écoutes ton corps lorsqu'il chuchote, tu n'auras pas à l'entendre crier. Des règles douloureuses, un SPM qui vire à l'intenable, une ménopause vécue comme une épreuve : ce sont souvent des chuchotements qu'on a laissé s'amplifier faute de savoir les lire.\n\nMon rôle en consultation n'est pas de couvrir le voyant d'alarme d'un morceau de scotch. C'est de chercher d'où vient le déséquilibre. Les déséquilibres hormonaux sont presque toujours le reflet d'un terrain global fragilisé. Foie engorgé, digestion perturbée, stress chronique, carences nutritionnelles. Tout cela impacte directement la production et l'élimination des hormones féminines. Les hormones ne se déséquilibrent jamais seules. Elles racontent l'état du foie, du microbiote, du système nerveux, des surrénales. Travailler l'un sans les autres, c'est gagner du temps sur les symptômes sans jamais restaurer le terrain.",
    },
    symptomes: {
      title: "Les signes d'un terrain hormonal déséquilibré",
      intro:
        "Ces symptômes touchent des âges et des situations très différents. Leur point commun : ils méritent d'être explorés plutôt que banalisés.",
      items: [
        "Règles douloureuses, cycles trop longs ou trop courts",
        "Syndrome prémenstruel intense : irritabilité, seins douloureux, ballonnements, crampes",
        "Fatigue marquée et difficultés de concentration en phase lutéale",
        "Réveils nocturnes fréquents, insomnie, sommeil non récupérateur",
        "Bouffées de chaleur, transpiration spontanée",
        "Anxiété, sautes d'humeur, larmes inexpliquées",
        "Prise de poids progressive sans changement d'hygiène de vie",
        "Sécheresse cutanée, modification de la peau et des cheveux",
        "Difficultés de conception, cycles anovulatoires",
        "Fatigue persistante après une grossesse ou un accouchement",
      ],
    },
    approche: {
      title: "Mon approche des déséquilibres hormonaux",
      content:
        "En médecine traditionnelle chinoise, les cycles féminins sont gouvernés par le Rein, gardien de l'énergie vitale, et par le Foie, qui assure la circulation du Qi et du Sang. Quand ces deux organes sont fragilisés, le cycle déraille, les transitions hormonales deviennent turbulentes et le corps se met à crier ce qu'il chuchotait depuis longtemps.\n\nMon accompagnement se construit autour de trois axes, que je module selon votre situation, votre âge et votre histoire.\n\nExplorer le terrain global. Digestion, foie, microbiote, alimentation, stress, carences. Qu'il s'agisse d'un SOPK, d'une endométriose, d'une préménopause qui débute ou d'un projet de grossesse, ce premier temps est incontournable. Les hormones réagissent à tout ce que l'organisme porte, et c'est ce terrain-là qu'on travaille d'abord.\n\nSoutenir avec les plantes. Gattilier et sauge pour le syndrome prémenstruel, accompagnement doux des bouffées de chaleur et réveils nocturnes pour la préménopause, plantes drainantes du foie dans les terrains chargés. Pas de protocole universel : chaque femme a son propre terrain et son propre rythme.\n\nRééquilibrer l'hygiène de vie sur la durée. Alimentation anti-inflammatoire, réduction des perturbateurs endocriniens présents au quotidien, gestion du stress et du sommeil. C'est la part du travail qui inscrit les améliorations dans la durée et permet d'espacer progressivement les consultations.\n\nPour les femmes de Décines, Meyzieu, Vaulx-en-Velin et de l'agglomération lyonnaise, je travaille toujours en complémentarité avec votre gynécologue, sans me substituer à un suivi médical.",
    },
    conditions: [
      {
        slug: "sopk",
        title: "SOPK (syndrome des ovaires polykystiques)",
        content:
          "Le SOPK touche environ une femme sur dix et reste pourtant sous-diagnostiqué. Cycles longs ou absents, acné hormonale, pilosité accrue, prise de poids qui ne cède pas, fatigue après les repas riches en glucides : les signaux sont souvent présents depuis l'adolescence sans avoir été reliés entre eux.\n\nEn naturopathie, l'accompagnement d'un SOPK se concentre sur trois leviers qui font consensus : l'insulino-résistance, l'inflammation de fond et l'équilibre du microbiote. Alimentation à faible charge glycémique, plantes ciblées, soutien du foie dans son travail hormonal, activité physique adaptée.\n\nJe reçois à Décines-Charpieu des femmes de Lyon et Meyzieu qui portent un SOPK diagnostiqué ou soupçonné depuis des années. Les premières améliorations, sur l'énergie et la régularité des cycles, se ressentent souvent dès les deux à trois premiers mois d'accompagnement.",
      },
      {
        slug: "endometriose",
        title: "Endométriose",
        content:
          "L'endométriose est une maladie inflammatoire chronique qui touche une femme sur dix et dont le diagnostic prend encore, en moyenne, sept ans. Règles invalidantes, douleurs pelviennes, troubles digestifs cycliques, fatigue profonde : la charge portée par les femmes atteintes est souvent sous-estimée.\n\nLa naturopathie ne guérit pas l'endométriose, mais elle agit concrètement sur l'inflammation de fond, la charge hormonale et la qualité de vie. Alimentation anti-inflammatoire structurée, soutien du foie qui métabolise les œstrogènes, travail sur le microbiote intestinal, gestion du stress qui amplifie les crises.\n\nPour les femmes de Décines, Vaulx-en-Velin, Bron ou Villeurbanne qui vivent avec une endométriose, l'accompagnement naturopathique se conçoit toujours en complément du suivi gynécologique, jamais à sa place.",
      },
      {
        slug: "fertilite",
        title: "Préparation à la fertilité",
        content:
          "Préparer le terrain à la conception ne se fait pas en quelques semaines. Le cycle de maturation d'un ovocyte dure environ trois mois ; c'est dans cette fenêtre que l'hygiène de vie, l'alimentation et le soutien micronutritionnel font une vraie différence.\n\nEn consultation, j'accompagne des projets de grossesse naturels ou associés à un parcours médicalisé comme une PMA ou une FIV. Le travail porte sur la régularité du cycle, la qualité ovocytaire, l'équilibre du microbiote, les carences fréquentes en ferritine, magnésium, vitamine D et oméga-3.\n\nBeaucoup de femmes de Décines-Charpieu, Lyon et Meyzieu consultent en amont de leur projet pour mettre toutes les chances de leur côté. L'accompagnement se fait en parallèle de votre suivi gynécologique et, si vous êtes en parcours PMA, en cohérence avec votre équipe médicale.",
      },
      {
        slug: "post-partum",
        title: "Post-partum et retour de couches",
        content:
          "Le post-partum est une période de grande vulnérabilité hormonale et nutritionnelle, encore trop souvent réduite au suivi du bébé. Fatigue qui s'installe, chute de cheveux, baby blues, difficultés à retrouver un cycle régulier, carences marquées en fer et en magnésium : ces signaux sont courants et méritent d'être accompagnés.\n\nEn naturopathie, le travail consiste à restaurer les réserves nutritionnelles, à soutenir le système nerveux après la charge émotionnelle de la naissance, à accompagner la remise en route hormonale progressive. Si vous allaitez, le protocole est adapté en conséquence, avec des plantes et des compléments compatibles avec l'allaitement.\n\nPour les jeunes mamans de Décines, Meyzieu, Vaulx-en-Velin et des alentours, je propose aussi des consultations en visio afin de limiter les déplacements dans les premiers mois.",
      },
      {
        slug: "cycles-irreguliers",
        title: "Cycles irréguliers",
        content:
          "Un cycle régulier dure entre 24 et 35 jours, avec une ovulation identifiable. Dès qu'il s'allonge, se raccourcit, disparaît ou devient imprévisible, c'est un message du corps. Les causes sont multiples : stress chronique, arrêt récent de pilule, SOPK sous-jacent, carence, déséquilibre thyroïdien, terrain inflammatoire.\n\nMon approche commence par comprendre ce que raconte votre cycle, puis par travailler les causes identifiées : régulation du stress, soutien du foie dans sa fonction hormonale, correction des carences, réintroduction d'une ovulation quand elle manque depuis plusieurs mois.\n\nPour les femmes de Décines-Charpieu et de l'agglomération lyonnaise, cet accompagnement se conçoit toujours en lien avec votre gynécologue, qui reste la personne de référence pour les examens médicaux éventuels.",
      },
    ],
    faq: [
      {
        question: "La ménopause doit-elle forcément être difficile à vivre ?",
        answer:
          "Non. La manière dont une femme traverse la ménopause dépend en grande partie de son terrain au moment où elle y entre. C'est tout l'enjeu d'un accompagnement en amont : écouter les premiers chuchotements du corps plutôt que d'attendre la crise. Un terrain préparé, drainé, correctement nourri traverse la transition bien plus sereinement.",
      },
      {
        question: "Est-ce normal d'avoir mal aux règles ?",
        answer:
          "Non. La douleur est un signal, pas une normalité. Des règles douloureuses méritent d'être explorées plutôt que simplement anesthésiées. Foie surchargé, inflammation, SPM installé, endométriose méconnue : plusieurs pistes peuvent être travaillées en parallèle d'un suivi gynécologique.",
      },
      {
        question: "Les plantes peuvent-elles remplacer un traitement hormonal substitutif ?",
        answer:
          "La question n'est pas celle du remplacement mais celle du choix éclairé. Mon rôle est de vous offrir des alternatives naturelles efficaces quand elles sont pertinentes pour votre situation, et de vous accompagner dans une décision qui vous correspond, toujours en lien avec votre médecin ou votre gynécologue.",
      },
      {
        question: "À partir de quand consulter pour une préménopause ?",
        answer:
          "Dès les premiers signaux : cycles qui changent, réveils nocturnes inhabituels, irritabilité nouvelle, fatigue inexpliquée. N'attendez pas que le corps crie. Plus tôt on prépare le terrain, plus la transition est douce et plus le besoin de traitements lourds est réduit.",
      },
      {
        question: "Le syndrome prémenstruel peut-il s'améliorer naturellement ?",
        answer:
          "Oui, de façon très significative. En travaillant sur le foie qui métabolise les œstrogènes, le microbiote, l'alimentation et l'équilibre hormonal global, la plupart des femmes que j'accompagne voient leurs symptômes de SPM diminuer nettement dès les premiers cycles. Irritabilité, seins douloureux, crampes, ballonnements prémenstruels : ce ne sont pas des fatalités de la vie de femme.",
      },
      {
        question: "Peut-on préparer une FIV avec la naturopathie ?",
        answer:
          "Oui, et c'est même un moment idéal pour travailler le terrain. Trois mois de préparation permettent d'optimiser la qualité ovocytaire, de corriger les carences en micronutriments essentiels, de soutenir le système nerveux qui sera mis à l'épreuve par le parcours. Je travaille toujours en cohérence avec votre équipe médicale de PMA.",
      },
      {
        question: "SOPK et grossesse : la naturopathie peut-elle aider ?",
        answer:
          "Oui. Beaucoup de femmes portant un SOPK rencontrent des difficultés à concevoir, principalement liées à l'irrégularité de l'ovulation et à l'insulino-résistance. En travaillant ces deux axes en amont du projet de grossesse, on observe fréquemment un retour à des cycles plus réguliers et une amélioration de la fenêtre de fertilité. L'accompagnement se fait en parallèle du suivi gynécologique.",
      },
      {
        question: "Naturopathe déséquilibres hormonaux à Lyon : comment choisir ?",
        answer:
          "Cherchez une praticienne formée, qui travaille en complémentarité avec votre médecin et votre gynécologue, et qui prend le temps de comprendre votre histoire avant de proposer un protocole. Mon cabinet est situé à Décines-Charpieu, directement accessible depuis Lyon, Villeurbanne, Meyzieu et l'Est lyonnais. Un premier appel découverte gratuit permet d'évaluer ensemble si mon approche correspond à ce que vous cherchez.",
      },
    ],
  },
] as const;
