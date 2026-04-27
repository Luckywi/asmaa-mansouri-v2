import type { FAQItem } from "@/types";

/**
 * FAQ de la page `/ateliers` (page principale). Rendu par le composant
 * générique `components/ui/AccordionFAQ.tsx`. Les réponses peuvent
 * contenir des `\n` — le rendu utilise `whitespace-pre-line`.
 */
export const faqAteliers: readonly FAQItem[] = [
  {
    question: "À qui s'adressent les ateliers ?",
    answer:
      "À toute personne curieuse de reprendre sa santé en main de façon naturelle. Aucun prérequis n'est nécessaire : les ateliers sont conçus pour être accessibles, pratiques et concrets, que vous soyez débutant ou déjà sensibilisé à la naturopathie.",
  },
  {
    question: "Combien de temps dure un atelier ?",
    answer:
      "En général entre 1 h 30 et 3 h selon la thématique. Le format, la durée et le contenu s'adaptent au public et au cadre (association, entreprise, groupe de particuliers).",
  },
  {
    question: "Où se déroulent les ateliers ?",
    answer:
      "J'interviens en dehors du cabinet : chez vous, dans vos locaux, en salle communale ou tout autre lieu adapté. Le lieu est défini ensemble en amont.",
  },
  {
    question: "Faut-il apporter quelque chose ?",
    answer:
      "Non, tout le matériel et les ingrédients sont fournis. Vous repartez avec vos créations (cosmétiques, kéfir, levain…) et un support récapitulatif.",
  },
  {
    question: "Peut-on organiser un atelier privé ?",
    answer:
      "Oui, je propose des ateliers sur mesure pour les associations, collectivités, entreprises ou groupes de particuliers. Contactez-moi pour définir ensemble le thème, le format et la date.",
  },
];

/**
 * FAQ de la page `/ateliers/passes` (ateliers déjà animés). Plus courte
 * et centrée sur la reproductibilité des sessions passées.
 */
export const faqPassesAteliers: readonly FAQItem[] = [
  {
    question: "Les ateliers passés seront-ils reproposés ?",
    answer:
      "Oui, certaines thématiques reviennent au fil des saisons. Contactez-moi pour être informé des prochaines dates.",
  },
  {
    question: "Peut-on organiser un atelier privé sur ces thèmes ?",
    answer:
      "Tout à fait. Chaque atelier peut être repris et adapté pour un groupe privé, en entreprise, en association ou entre amis.",
  },
  {
    question: "Combien de personnes participent à un atelier ?",
    answer:
      "Les ateliers se déroulent en petit groupe, généralement entre 5 et 15 personnes, pour favoriser les échanges et la pratique.",
  },
];
