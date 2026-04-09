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
 * Les descriptions sont des **placeholders à valider** avec Asmaa.
 * Les `detailHref` pointent vers des routes Phase 2 (futureHref pattern)
 * qui n'existent pas encore en Phase 1 — c'est cohérent avec ce qu'on
 * fait ailleurs (Presentation → /qui-suis-je, Specialites → /specialites).
 */
export const prestations: readonly Prestation[] = [
  {
    id: "consultation",
    icon: MessageCircle,
    category: "Consultation",
    tagline: "Bilan, suivi, découverte",
    title: "Consultations naturopathiques",
    description:
      "La consultation est le moment d'écoute privilégié où nous explorons ensemble votre histoire, vos symptômes et vos objectifs de santé. À l'issue de notre échange, je construis un protocole personnalisé combinant alimentation, plantes et techniques manuelles, adapté à votre singularité et à votre rythme de vie.",
    detailHref: "/prestations/consultation",
    ctaLabel: "En savoir plus sur les consultations",
  },
  {
    id: "tuina",
    icon: HandHeart,
    category: "Massage Tuina",
    tagline: "Médecine traditionnelle chinoise",
    title: "Massage Tuina",
    description:
      "Le massage Tuina, issu de la médecine traditionnelle chinoise, agit sur les méridiens et les points d'énergie pour libérer les tensions, relancer la circulation et apaiser le système nerveux. Une approche manuelle profonde et structurée, qui complète idéalement le travail naturopathique en agissant directement sur le corps.",
    detailHref: "/prestations/massage-tuina",
    ctaLabel: "Comprendre le massage Tuina",
  },
  {
    id: "cupping",
    icon: CircleDot,
    category: "Cupping Therapy",
    tagline: "Ventouses thérapeutiques",
    title: "Cupping Therapy",
    description:
      "La cupping therapy, ou thérapie par ventouses, utilise la succion pour stimuler la circulation sanguine et lymphatique, dénouer les tensions musculaires profondes et favoriser l'élimination des toxines. Une technique ancestrale qui s'intègre parfaitement à une démarche de soin globale.",
    detailHref: "/prestations/cupping-therapy",
    ctaLabel: "Découvrir la cupping therapy",
  },
  {
    id: "accompagnement",
    icon: HeartHandshake,
    category: "Accompagnement",
    tagline: "Programme intensif 3 mois",
    title: "Accompagnement 3 mois",
    description:
      "Le programme intensif sur trois mois est pensé pour les femmes qui souhaitent un accompagnement structuré et continu. Bilans réguliers, ajustements de protocole, soutien entre les séances : un suivi rapproché pour transformer durablement votre santé et installer de nouveaux équilibres au quotidien.",
    detailHref: "/prestations/accompagnement-3-mois",
    ctaLabel: "Explorer l'accompagnement 3 mois",
  },
] as const;
