/**
 * Types partagés du projet Asmaa Mansouri Naturopathe.
 *
 * Ce fichier est l'unique source de vérité des types transverses.
 * Tout type spécifique à un seul composant reste co-localisé avec lui.
 */

import type { LucideIcon } from "lucide-react";

/**
 * Lien de navigation utilisé dans le Header (et plus tard le Footer).
 *
 * En phase landing, `href` pointe vers une ancre `#section` de la page d'accueil.
 * Le champ `futureHref` documente dès maintenant la vraie route Phase 2
 * (quand les pages /qui-suis-je, /cabinet, /prestations existeront), pour rendre
 * la migration triviale (search/replace de la colonne).
 */
export type NavLink = {
  label: string;
  href: string;
  futureHref?: string;
};

/**
 * Données globales du site (contact, adresse, liens externes).
 * Centralisées dans `src/data/site.ts` et figées en `as const`.
 */
export type SiteData = {
  readonly name: string;
  readonly title: string;
  /**
   * Baseline / tagline courte affichée sous le brand block du Footer (et,
   * Phase 2, potentiellement réutilisable en Hero secondaire / metadata
   * Open Graph). Une seule phrase, sans em-dash interne — règle de style
   * du projet (em-dash réservé au pattern "Nom — Titre").
   */
  readonly baseline: string;
  /** Téléphone formaté lisible (avec points) */
  readonly phone: string;
  /** Lien tel: prêt à l'emploi (chiffres uniquement) */
  readonly phoneHref: string;
  readonly email: string;
  readonly instagram: string;
  readonly instagramUrl: string;
  readonly address: {
    readonly street: string;
    readonly city: string;
    readonly zip: string;
    readonly region: string;
    /** Adresse complète sur une ligne, prête à afficher */
    readonly full: string;
  };
  /** Coordonnées GPS du cabinet (utilisées par la Map) */
  readonly gps: {
    readonly lat: number;
    readonly lng: number;
  };
  readonly resalibUrl: string;
  /**
   * Lien direct vers l'onglet "Avis" de la fiche Resalib (avec ancre #reviews).
   * Utilisé par le CTA "Écrire un avis sur Resalib" dans la section Temoignages.
   */
  readonly resalibReviewsUrl: string;
  /**
   * Lien vers la fiche Google Business / Local d'Asmaa, ouvert sur le panneau
   * des avis. Utilisé par le CTA "Écrire un avis sur Google" dans la section
   * Temoignages.
   */
  readonly googleReviewsUrl: string;
  /**
   * Nombre total d'avis vérifiés (Resalib + Google) affiché dans la section
   * Temoignages. À mettre à jour manuellement quand le compteur évolue.
   */
  readonly verifiedReviewsCount: number;
  /** Lien Google Maps pré-rempli avec l'adresse comme destination */
  readonly googleMapsDirectionsUrl: string;
  /**
   * Horaires d'ouverture du cabinet. Une entrée par jour de la semaine, dans
   * l'ordre lundi → dimanche. `open`/`close` en `HH:mm` (24h), ou `null` pour
   * un jour fermé. Affiché sur la page /cabinet et utilisé Phase 2 pour le
   * schema.org LocalBusiness.openingHoursSpecification.
   *
   * ⚠️ Valeurs placeholder — à valider avec Asmaa avant publication.
   */
  readonly openingHours: readonly {
    readonly day: string;
    readonly open: string | null;
    readonly close: string | null;
  }[];
};

/**
 * Témoignage client affiché dans la section Temoignages de la landing.
 * Stockés en `src/data/temoignages.ts`.
 *
 * ⚠️ Les témoignages actuels sont des placeholders. À remplacer par des
 * avis réels collectés par Asmaa avant publication.
 */
export type Temoignage = {
  /** Nom (typiquement prénom + initiale, ex: "Marie L.") */
  name: string;
  /** Description courte du contexte (ex: "SOPK", "Préménopause"). Optionnel. */
  role?: string;
  /** Texte du témoignage */
  body: string;
};

/**
 * Une prestation proposée par Asmaa, affichée dans la section
 * <Prestations /> et (Phase 2) sur sa propre page /prestations/{id}.
 *
 * Le champ `icon` est un composant lucide-react importé directement
 * dans `src/data/prestations.ts`. Comme ce n'est pas serializable (c'est
 * une référence de fonction React), la donnée doit être consommée par un
 * Client Component (PrestationsSelector), pas passée comme prop depuis
 * un Server Component à travers la frontière RSC.
 */
export type Prestation = {
  /** Slug pour la URL et la React key */
  readonly id: string;
  /** Composant lucide-react pour l'icône (référence directe) */
  readonly icon: LucideIcon;
  /** Catégorie courte affichée dans la mini-card du selector */
  readonly category: string;
  /** Tagline / sous-titre dans la mini-card */
  readonly tagline: string;
  /** Titre long pour la detail card */
  readonly title: string;
  /** Description complète (3-5 lignes) pour la detail card */
  readonly description: string;
  /** URL détail (futureHref Phase 2) */
  readonly detailHref: string;
  /**
   * Label custom du bouton "En savoir plus" de la detail card. Doit
   * avoir un sens contextualisé pour la prestation, pas un générique
   * (ex: "En savoir plus sur les consultations", "Comprendre le Tuina").
   */
  readonly ctaLabel: string;
};

/**
 * Une spécialité (problématique de santé féminine) accompagnée par Asmaa.
 *
 * Affichée :
 *   - en card sur le hub `/specialites` (champs `title` + `shortDescription`)
 *   - en article complet sur sa page dédiée `/specialites/[slug]`
 *     (tous les champs structurés en sections SEO).
 *
 * Stratégie de contenu **plug-and-play** :
 *   - Champs "structure" rédigés en interne (titres, descriptions,
 *     intro hero, titres de section, questions FAQ) — pilotent le SEO
 *     long-tail et le rendu visuel.
 *   - Champs "fond" laissés à Asmaa (definition.content, symptomes.items,
 *     approche.content, faq[].answer) — repérables dans le data file via
 *     le marqueur "À COMPLÉTER PAR ASMAA — …" pour une édition directe.
 *
 * Toute édition se fait dans `src/data/specialites.ts`, sans toucher
 * aux composants de rendu.
 */
export type Specialite = {
  /** Slug pour la URL et la React key (kebab-case, sans stopwords) */
  readonly slug: string;
  /** Titre court — H1 de la page dédiée et titre de card du hub */
  readonly title: string;
  /** Phrase courte (1-2 lignes) affichée sur la card du hub */
  readonly shortDescription: string;
  /**
   * Paragraphe d'intro sous le H1 de la page dédiée. Densité SEO :
   * mention "naturopathe + Décines-Charpieu/Lyon + mot-clé spécialité"
   * pour capter les SERPs locales.
   */
  readonly intro: string;
  /** Section 1 — "Le SOPK, c'est quoi ?" : titre rédigé, content à compléter */
  readonly definition: {
    readonly title: string;
    readonly content: string;
  };
  /**
   * Section 2 — "Les symptômes" : titre + intro rédigés, items à compléter.
   * `items` est rendu en liste à puces ; minimum 1 item pour ne pas
   * laisser un bloc vide à la publication.
   */
  readonly symptomes: {
    readonly title: string;
    readonly intro: string;
    readonly items: readonly string[];
  };
  /** Section 3 — "Mon approche" : titre rédigé, content à compléter */
  readonly approche: {
    readonly title: string;
    readonly content: string;
  };
  /**
   * Bloc FAQ — questions rédigées (long-tail SEO ciblé pain points
   * locaux), réponses à compléter par Asmaa avec ses vraies réponses
   * cabinet (durées, cas concrets, méthodes).
   */
  readonly faq: readonly {
    readonly question: string;
    readonly answer: string;
  }[];
};
