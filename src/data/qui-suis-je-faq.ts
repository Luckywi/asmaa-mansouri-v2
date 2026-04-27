import type { FAQItem } from "@/types";

/**
 * FAQ « Ma démarche » de la page /qui-suis-je.
 *
 * Source unique partagée entre :
 *   - le composant visible `Demarche.tsx` (accordéon UI)
 *   - le builder JSON-LD `buildFaqPage` (FAQPage schema dans la page)
 *
 * Toute édition d'une question/réponse doit se faire ici. La règle
 * anti-cloaking Google exige que chaque `Question.name` du schema soit
 * verbatim dans le HTML visible — ne pas dupliquer ces strings ailleurs.
 */
export const demarcheFaq: readonly FAQItem[] = [
  {
    question: "Comment se passe une séance ?",
    answer:
      "La première consultation dure 1h30. Nous y faisons le point ensemble sur votre santé et votre mode de vie à partir d'un questionnaire approfondi.",
  },
  {
    question: "Quelle est mon approche ?",
    answer:
      "Pendant ce bilan, je propose différentes techniques issues de la naturopathie adaptées à votre situation. L'objectif : vous transmettre des clés concrètes pour devenir actrice de votre santé.",
  },
  {
    question: "Pour quels troubles me consulter ?",
    answer:
      "Je suis spécialisée dans l'accompagnement des maux féminins et des troubles digestifs, avec une approche naturopathique complétée par le massage Tuina et la cupping therapy. J'accompagne les femmes aux différentes étapes de leur vie (SOPK, endométriose, post-partum, préménopause, ménopause) ainsi que sur les troubles digestifs (ballonnements, syndrome de l'intestin irritable). Mon approche allie alimentation, phytothérapie et techniques manuelles.",
  },
  {
    question: "Quels bénéfices en attendre ?",
    answer:
      "La naturopathie propose une approche globale qui vise à soutenir l'énergie, apaiser le stress et accompagner la digestion, en s'appuyant sur la nutrition, la phytothérapie et des techniques manuelles. Le massage Tuina, que je pratique également, libère les tensions et relance la circulation selon les principes de la médecine traditionnelle chinoise.",
  },
] as const;
