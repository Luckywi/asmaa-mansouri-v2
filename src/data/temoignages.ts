import type { Temoignage } from "@/types";

/**
 * Témoignages clients affichés dans la section Temoignages de la landing.
 *
 * ✅ **Vrais avis clients**, sélectionnés et lightly édités à partir des
 * 24 avis publics d'Asmaa (8 Resalib vérifiés + 16 Google Reviews).
 *
 * Critères de sélection :
 *   - Variété de contexte (cupping, Tuina, naturopathie, troubles digestifs)
 *   - Substance (assez de matière pour remplir une card de marquee)
 *   - Représentativité (couvre les principaux services et bénéfices)
 *
 * Les noms sont anonymisés en prénom + initiale (les avis Google/Resalib
 * étant publics, mais on garde le respect de la vie privée).
 *
 * Pour voir les avis complets et tous les autres :
 *   - Resalib : https://www.resalib.fr/praticien/104874-asmaa-mansouri-naturopathe-meyzieu
 *   - Google : recherche "Asmaa Mansouri naturopathe Meyzieu"
 */
export const temoignages: Temoignage[] = [
  {
    name: "Gwen S.",
    role: "Cupping thérapie",
    body: "Je vous recommande Asmaa à 10000%, vous pouvez aller la voir les yeux fermés. J'ai fait une séance de cupping thérapie, dès la fin je me sentais tellement bien et légère. Elle a été à l'écoute et a répondu à toutes mes questions sans aucun jugement.",
  },
  {
    name: "Sonia B.",
    role: "Massage thérapeutique Tuina",
    body: "J'ai vraiment apprécié le massage tuina, j'ai ressenti tous les bienfaits immédiatement. Cette praticienne aux doigts de fée m'a vraiment détendue. Un accueil chaleureux et un thé après le massage pour terminer en douceur.",
  },
  {
    name: "Kenza C.",
    role: "Suivi naturopathique",
    body: "Je tiens à exprimer toute ma gratitude envers Asmaa. Grâce à son écoute attentive, ses conseils personnalisés et son approche holistique, j'ai retrouvé un véritable équilibre aussi bien physique que mental.",
  },
  {
    name: "Halima Z.",
    role: "Naturopathie",
    body: "J'ai été suivie par Asmaa en naturopathie. Elle m'a écoutée avec bienveillance, sans jugement, et m'a proposé un accompagnement adapté à ma situation. Grâce à elle, j'ai compris mon corps et vu des résultats concrets.",
  },
  {
    name: "Kanza I.",
    role: "Troubles digestifs",
    body: "Un grand merci à Asmaa pour son accompagnement de qualité. Elle a su me donner des outils pour atténuer mes douleurs intestinales et ballonnements, et m'a aussi aidée à mieux gérer ma fatigue, mes migraines et mes douleurs menstruelles.",
  },
  {
    name: "Imène I.",
    role: "Naturopathie",
    body: "Si vous cherchez une naturopathe passionnée, humaine et compétente, vous êtes au bon endroit. Dès la première séance, on se sent écouté et accompagné avec bienveillance. Ses conseils sont clairs, personnalisés et très efficaces.",
  },
  {
    name: "Nassima B.",
    role: "Massage thérapeutique Tuina",
    body: "Mon meilleur massage, pourtant j'en ai fait des massages. Je souffrais du dos et là c'est véridique, le top du top. Je n'ai plus de douleurs. Merci pour l'accueil et votre énergie.",
  },
  {
    name: "Najet H.",
    role: "Consultation",
    body: "Ravie de cette consultation, une praticienne qui m'a reçue avec beaucoup de bienveillance. Très à l'écoute. Elle a su cibler mes problématiques et adapter un protocole qui m'a vraiment séduite. Son cabinet est magnifique, on est en mode cocooning.",
  },
  {
    name: "Myriam K.",
    role: "Naturopathie",
    body: "Je recommande vivement. Asmaa est une personne de confiance, compétente et bienveillante. Une consultation complète, pour trouver au mieux des solutions efficaces. Et tout cela, dans un cadre chaleureux.",
  },
  {
    name: "Hatice K.",
    role: "Cupping thérapie",
    body: "Excellente expérience avec Asmaa. La cupping thérapie m'a fait beaucoup de bien, je me suis sentie légère, détendue et apaisée. Une vraie sensation de mieux-être.",
  },
];
