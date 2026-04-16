import type { Temoignage } from "@/types";

/**
 * Témoignages clients d'Asmaa Mansouri.
 *
 * Origine des avis :
 *   - 13 Google (publics, Google Maps/Business)
 *   - 8 Resalib (publics, fiche praticien vérifiée)
 *   - 21 entrées totales après dédoublonnage des 3 avis qui ont été
 *     postés strictement à l'identique sur les deux plateformes par la
 *     même personne — dans ces 3 cas, on garde la version Resalib (date
 *     précise, plateforme de rendez-vous vérifié).
 *
 * Dédoublonnages (référence : texte strictement identique) :
 *   - Gwen S. → Resalib 2026-02-18 (remplace Google "il y a un mois").
 *   - Hatice K. → Resalib 2026-01-29 (remplace Google "il y a 2 mois",
 *     pseudo Google d'origine "Hhhvvv Kufegv" déjà anonymisé).
 *   - Laétitia A. (Resalib) → remplace Tya A. (Google, pseudo "tya aib"
 *     sur Google Maps, même personne et même texte, le praticien
 *     l'appelle "Laeticia" en réponse Resalib).
 *
 * Doublons "personne oui, texte non" CONSERVÉS à 2 entrées :
 *   - Nassima B. → 1 avis massage (Google 2025-04) + 1 avis
 *     naturopathie/massage (Resalib 2025-03), textes différents.
 *   - Kenza C. → 1 avis suivi court (Google 2025-04) + 1 avis long
 *     reconnaissance (Resalib 2025-02), textes différents.
 *
 * Anonymisation : "Prénom I." (prénom + initiale du nom de famille).
 * Deux cas particuliers côté Google :
 *   - "na me" (pseudonyme Local Guide) → "Naïma M." (prénom plausible,
 *     à remplacer par le vrai prénom si connu).
 *   - "Hhhvvv Kufegv" — n'existe plus dans ce fichier après dédoublonnage
 *     (remplacé par la version Resalib "Hatice K." ci-dessus).
 *
 * Chaque entrée porte :
 *   - `source` : "google" ou "resalib" — pilote le lien "Voir le
 *     commentaire" de la modale `/temoignages` (cible
 *     `site.googleReviewsUrl` ou `site.resalibReviewsUrl`).
 *   - `date` : ISO (YYYY-MM-DD). Exacte pour les Resalib, approximative
 *     (15 du mois) pour les Google où seule "il y a X mois" était
 *     disponible (référence : 2026-04-15).
 *   - `rating` : 5 pour tous (aucun avis inférieur à 5 étoiles à ce jour).
 *
 * Ordre : date décroissante, le plus récent en haut de liste — cet ordre
 * pilote aussi la répartition round-robin des colonnes sur `/temoignages`.
 *
 * Sources publiques d'audit :
 *   - Google : recherche "Asmaa Mansouri naturopathe" sur Maps/Search.
 *   - Resalib : https://www.resalib.fr/praticien/104874-asmaa-mansouri-naturopathe-meyzieu
 */
export const temoignages: Temoignage[] = [
  {
    name: "Gwen S.",
    role: "Cupping thérapie",
    source: "resalib",
    date: "2026-02-18",
    rating: 5,
    body: "Je vous recommande Asmaa à 10000%, vous pouvez aller la voir les yeux fermés et le cœur serein. Elle est très douce et bienveillante. J'ai fait une séance de cupping thérapie, dès la fin je me sentais tellement bien et légère. Elle a été à l'écoute et a répondu à toutes mes questions sans aucun jugement. J'ai passé un super moment. Sa prestation est de haute qualité tout comme sa personne. Je suis à 3h de route de son cabinet mais une chose est sûre, pour mon prochain rendez-vous ce sera chez Asmaa que j'irai. Merci encore pour tout.",
  },
  {
    name: "Hatice K.",
    role: "Cupping thérapie",
    source: "resalib",
    date: "2026-01-29",
    rating: 5,
    body: "Excellente expérience avec Asmaa. La cupping thérapie m'a fait beaucoup de bien, je me suis sentie légère, détendue et apaisée. Une vraie sensation de mieux-être.",
  },
  {
    name: "Guille V.",
    role: "Consultation",
    source: "resalib",
    date: "2026-01-15",
    rating: 5,
    body: "Rendez-vous qui s'est très bien déroulé. Personne à l'écoute, bienveillante et professionnelle. Merci.",
  },
  {
    name: "Halima Z.",
    role: "Suivi naturopathique",
    source: "google",
    date: "2025-08-15",
    rating: 5,
    body: "J'ai été suivie par Asmaa en naturopathie et je tiens à la remercier du fond du cœur. Elle m'a écoutée avec bienveillance, sans jugement, et m'a proposé un accompagnement naturel, adapté à ma situation. Grâce à elle, j'ai compris mon corps, j'ai repris confiance, et surtout, j'ai vu des résultats concrets. Son approche est douce, respectueuse et toujours dans la recherche du bien-être holistique.",
  },
  {
    name: "Myriam K.",
    role: "Consultation",
    source: "google",
    date: "2025-08-15",
    rating: 5,
    body: "Je recommande vivement. Asmaa est une personne de confiance, compétente et bienveillante. Une consultation complète, pour trouver au mieux des solutions efficaces. Et tout cela, dans un cadre chaleureux.",
  },
  {
    name: "Ilham K.",
    role: "Consultation",
    source: "google",
    date: "2025-07-15",
    rating: 5,
    body: "Un rendez-vous exceptionnel, avec une personne hautement qualifiée, humaine et diplomate. J'ai aimé ce moment et j'y retournerai sans hésiter. Merci beaucoup pour cette parenthèse suspendue.",
  },
  {
    name: "Naïma M.",
    role: "Massage Tuina",
    source: "google",
    date: "2025-06-15",
    rating: 5,
    body: "Allez-y les yeux fermés. Asmaa est une personne extraordinaire, douce, à l'écoute et passionnée. Son soin est un vrai moment hors du temps : ambiance cocooning, échange bienveillant avant le massage, puis un massage puissant, réconfortant, profondément relaxant. Et le petit plus, l'infusion partagée après le soin, dans une atmosphère apaisante. Je suis repartie légère, détendue, remplie d'une belle énergie. Un vrai soin du corps et de l'âme.",
  },
  {
    name: "Najet H.",
    role: "Consultation",
    source: "google",
    date: "2025-06-15",
    rating: 5,
    body: "Ravie de cette consultation, une praticienne qui m'a reçue avec beaucoup de bienveillance. Très à l'écoute de sa patientèle. Elle a su cibler mes problématiques et adapter un protocole qui m'a vraiment séduite. Son cabinet est magnifique, très belle déco moderne et épurée, on est en mode cocooning. Je recommande vivement ce cabinet.",
  },
  {
    name: "Imène I.",
    role: "Suivi naturopathique",
    source: "google",
    date: "2025-05-15",
    rating: 5,
    body: "Si vous cherchez une naturopathe passionnée, humaine et incroyablement compétente, vous êtes au bon endroit. Dès la première séance, on se sent écouté, compris et accompagné avec bienveillance. Ses conseils sont clairs, personnalisés et surtout très efficaces. Chaque rendez-vous est un vrai moment de bien-être et de recentrage sur soi. Merci pour votre énergie et votre implication.",
  },
  {
    name: "Kanza I.",
    role: "Suivi naturopathique",
    source: "google",
    date: "2025-05-15",
    rating: 5,
    body: "Un grand merci à Asmaa pour son accompagnement de qualité. Elle a su me donner des outils pour me permettre d'atténuer mes douleurs intestinales et mes ballonnements. Elle m'a également aidée à mieux gérer ma fatigue, mes migraines et mes douleurs menstruelles. Je la recommande à 10000% les yeux fermés.",
  },
  {
    name: "Nassima B.",
    role: "Massage Tuina",
    source: "google",
    date: "2025-04-15",
    rating: 5,
    body: "Massage au top. Mon meilleur massage, pourtant j'en ai fait des massages. Je souffrais du dos et là c'est véridique : le top du top. Je n'ai plus de douleurs. Merci énormément pour l'accueil et votre investissement, votre énergie et votre engagement.",
  },
  {
    name: "Kenza C.",
    role: "Suivi naturopathique",
    source: "google",
    date: "2025-04-15",
    rating: 5,
    body: "Je recommande vivement ma naturopathe, pour son écoute et sa bienveillance. Elle prend vraiment le temps de comprendre les besoins individuels et propose des solutions naturelles adaptées, sans jugement. Elle est passionnée, compétente et disponible pour répondre à mes questions. Un véritable pilier pour ma santé.",
  },
  {
    name: "Hanan K.",
    role: "Consultation",
    source: "google",
    date: "2025-04-15",
    rating: 5,
    body: "Très belle rencontre avec Asmaa. Personne douce et à l'écoute. Je suis repartie en ayant appris plein de choses sur mon corps.",
  },
  {
    name: "Flo M.",
    role: "Consultation",
    source: "google",
    date: "2025-04-15",
    rating: 5,
    body: "Praticienne compétente, à l'écoute, dont les soins m'ont permis de me sentir plus en forme. J'y retournerai régulièrement. Je recommande.",
  },
  {
    name: "Hager M.",
    role: "Consultation",
    source: "google",
    date: "2025-04-15",
    rating: 5,
    body: "Excellente naturopathe, très compétente dans son domaine. Je recommande à 100%.",
  },
  {
    name: "Sabrina",
    role: "Consultation",
    source: "google",
    date: "2025-04-15",
    rating: 5,
    body: "Expérience super. Faites-lui confiance les yeux fermés.",
  },
  {
    name: "Nassima B.",
    role: "Massage Tuina",
    source: "resalib",
    date: "2025-03-07",
    rating: 5,
    body: "Naturopathe très sérieuse, je recommande vivement. Professionnelle et à l'écoute, Asmaa adapte son massage selon nos besoins. C'était juste magnifique, ça m'a soulagée et j'ai passé un agréable moment de détente. Elle y a mis tout son cœur. Je recommande vivement.",
  },
  {
    name: "Laétitia A.",
    role: "Consultation",
    source: "resalib",
    date: "2025-03-03",
    rating: 5,
    body: "Asmaa est à l'écoute, appliquée et prodigue de très bons conseils. Elle a un réel don, c'est indéniable. Un grand merci à elle, j'ai vécu une expérience unique et hors du temps. Je recommande à 100%.",
  },
  {
    name: "Samira M.",
    role: "Massage Tuina",
    source: "resalib",
    date: "2025-02-27",
    rating: 5,
    body: "Je recommande vivement Asmaa ainsi que ce lieu pour toutes celles qui cherchent à s'offrir un moment de détente et de soins. Un grand merci pour cette expérience exceptionnelle, j'y reviendrai sans hésiter.",
  },
  {
    name: "Sonia B.",
    role: "Massage Tuina",
    source: "resalib",
    date: "2025-02-26",
    rating: 5,
    body: "J'ai vraiment apprécié le massage effectué, c'était un massage Tuina. J'ai ressenti tous les bienfaits immédiatement. Cette praticienne expérimentée aux doigts de fée m'a vraiment détendue. Un accueil chaleureux avant le massage suivi d'un bon thé après, pour terminer tout en douceur. Les bonnes questions ont été posées concernant d'éventuelles pathologies ou allergies. Je vous la recommande les yeux fermés.",
  },
  {
    name: "Kenza C.",
    role: "Suivi naturopathique",
    source: "resalib",
    date: "2025-02-26",
    rating: 5,
    body: "Je tiens à exprimer toute ma gratitude envers Mme Mansouri pour son accompagnement bienveillant et professionnel. Grâce à son écoute attentive, ses conseils personnalisés et son approche holistique, j'ai retrouvé un véritable équilibre aussi bien physique que mental. Sa passion pour son métier et sa profonde humanité se ressentent dans chaque échange. Je la recommande vivement à toute personne souhaitant prendre soin de sa santé de manière naturelle et durable. Merci pour votre lumière et votre engagement.",
  },
];
