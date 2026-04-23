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
 * Prestations auxquelles un témoignage peut être associé. Strictement
 * limité aux 4 services proposés par Asmaa (cf. `data/prestations.ts`),
 * pour éviter des rôles "sauvages" (atelier, soin bien-être, troubles
 * digestifs, etc.) qui fragmenteraient l'affichage et ne renverraient
 * vers aucune page de prestation dédiée.
 *
 * Ajouter une valeur ici implique de créer la prestation correspondante
 * dans `data/prestations.ts` — et inversement.
 */
export type TemoignageRole =
  | "Consultation"
  | "Suivi naturopathique"
  | "Massage Tuina"
  | "Cupping thérapie";

/**
 * Témoignage client affiché dans la section Temoignages de la landing et
 * sur la page dédiée `/temoignages`. Stockés en `src/data/temoignages.ts`.
 *
 * Les champs `rating`, `date` et `source` sont optionnels et alimentent la
 * page `/temoignages` (étoiles, modale détaillée, lien vers l'avis d'origine).
 * La landing n'en a pas besoin — elle lit `name`, `role`, `body`.
 */
export type Temoignage = {
  /** Nom (typiquement prénom + initiale, ex: "Marie L.") */
  name: string;
  /** Prestation associée à l'avis — contrainte aux 4 types via `TemoignageRole`. */
  role?: TemoignageRole;
  /** Texte du témoignage */
  body: string;
  /** Note sur 5. Par défaut 5 dans l'UI quand omise. */
  rating?: number;
  /**
   * Date ISO (YYYY-MM-DD) de publication. Omise tant que les vraies dates
   * Resalib/Google ne sont pas renseignées — la modale affiche alors un
   * libellé neutre sans date.
   */
  date?: string;
  /**
   * Plateforme source de l'avis. Par défaut "resalib" dans l'UI quand omise.
   * Le CTA "Voir le commentaire" de la modale pointe vers l'URL
   * correspondante (`site.resalibReviewsUrl` ou `site.googleReviewsUrl`).
   */
  source?: "resalib" | "google";
};

/**
 * Ligne du tableau de tarifs affiché dans le Hero de chaque page
 * slug `/prestations/[slug]`. Structure pensée "tableau propre" mais
 * rendue en cards glass horizontales (stack mobile, row desktop).
 */
export type PrestationTariff = {
  /** Ex: "Appel découverte", "Consultation bilan", "Suivi" */
  readonly label: string;
  /** Ex: "Gratuit", "80 €", "50 €". Texte brut, on le stylise côté vue. */
  readonly price: string;
  /** Ex: "15 min", "1h", "1h30" */
  readonly duration: string;
  /** Ex: "Cabinet", "Cabinet ou visio", "Téléphone" */
  readonly location?: string;
};

/**
 * Étape du déroulé d'une séance — rendue en card numérotée sur la
 * page slug. 3 ou 4 étapes par prestation.
 */
export type PrestationStep = {
  /** Numéro affiché en gros sur la card — "01", "02"... */
  readonly number: string;
  readonly title: string;
  readonly description: string;
};

/**
 * Bridge de maillage interne en bas de chaque page slug. 3 entrées
 * par prestation, variées selon le contexte (autres prestations,
 * /specialites, /qui-suis-je, /cabinet).
 */
export type PrestationBridge = {
  readonly href: string;
  readonly iconKey: "user" | "flower" | "map" | "gallery" | "massage" | "cupping" | "heart" | "message";
  readonly title: string;
  readonly description: string;
  readonly ctaLabel: string;
};

/**
 * Une prestation proposée par Asmaa, affichée à 3 endroits :
 *   - section <Prestations /> de la landing (selector master-detail)
 *   - hub /prestations (card avec tag prix + "En savoir plus")
 *   - page slug /prestations/[slug] (article complet)
 *
 * Le champ `icon` est un composant lucide-react importé directement
 * dans `src/data/prestations.ts`. Comme ce n'est pas serializable (c'est
 * une référence de fonction React), la donnée doit être consommée par un
 * Client Component (PrestationsSelector), pas passée comme prop depuis
 * un Server Component à travers la frontière RSC.
 */
export type Prestation = {
  /** Slug pour la React key, cohérent avec le segment d'URL */
  readonly id: string;
  /** Slug URL complet (segment après `/prestations/`) */
  readonly slug: string;
  /** Composant lucide-react pour l'icône (référence directe) */
  readonly icon: LucideIcon;
  /** Catégorie courte affichée dans la mini-card du selector */
  readonly category: string;
  /** Tagline / sous-titre dans la mini-card */
  readonly tagline: string;
  /** Titre long pour la detail card */
  readonly title: string;
  /** Description complète (3-5 lignes) pour la detail card landing */
  readonly description: string;
  /** Description courte (2-3 lignes) pour la card du hub /prestations */
  readonly shortDescription: string;
  /** Prix plancher en euros, affiché "À partir de X €" sur le hub */
  readonly priceFrom: number;
  /** URL détail */
  readonly detailHref: string;
  /** Label custom du bouton "En savoir plus" de la detail card */
  readonly ctaLabel: string;
  /** H1 SEO de la page slug (inclure mot-clé local "Décines-Charpieu") */
  readonly seoH1: string;
  /** Sous-titre du Hero page slug (paragraphe d'intro, contexte) */
  readonly seoSubtitle: string;
  /** Tableau de tarifs (1 à 3 lignes selon prestation) */
  readonly tariffs: readonly PrestationTariff[];
  /** Section "Qu'est-ce que la [service]" — titre + contenu long-form */
  readonly whatIs: {
    readonly title: string;
    readonly content: string;
  };
  /** Section "Déroulé d'une séance" — 3-4 étapes numérotées */
  readonly steps: {
    readonly title: string;
    readonly items: readonly PrestationStep[];
  };
  /**
   * FAQ spécifique à la prestation, orientée SERP et GEO (Décines,
   * Lyon, tarifs, contre-indications). 4 à 5 questions par prestation.
   */
  readonly faq: readonly {
    readonly question: string;
    readonly answer: string;
  }[];
  /** 3 bridges de maillage interne bas de page */
  readonly bridges: readonly PrestationBridge[];
  /**
   * Filtre `role` pour la sélection des témoignages pertinents à
   * afficher dans le carousel d'avis. Chaque entrée est matchée
   * case-insensitive sur le champ `role` de Temoignage.
   */
  readonly testimonialRoles: readonly string[];
};

/**
 * Sous-section pathologie à l'intérieur d'une Specialite "parapluie".
 * Rendue en H3 + paragraphe court dans l'Article, avec `id={slug}` pour
 * permettre l'ancrage URL direct (ex: /specialites/desequilibres-hormonaux#sopk).
 * Utile pour capter les SERPs longue-queue sur des pathologies nommées
 * qui partagent une même approche globale.
 */
export type Condition = {
  readonly slug: string;
  readonly title: string;
  readonly content: string;
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
   * Section 2 — "Les symptômes" : titre + intro rédigés, symptômes
   * à compléter. Deux formats mutuellement exclusifs :
   *   - `items` : liste à puces plate (format par défaut, utilisé par la
   *     majorité des spécialités).
   *   - `groups` : liste catégorisée (H3 + sous-liste) pour les
   *     spécialités parapluie qui couvrent plusieurs tableaux cliniques
   *     distincts (ex : déséquilibres hormonaux → SPM vs préménopause).
   *
   * Au moins l'un des deux doit être renseigné. Le composant de rendu
   * (`Article.tsx`) privilégie `groups` quand il est présent.
   */
  readonly symptomes: {
    readonly title: string;
    readonly intro: string;
    readonly items?: readonly string[];
    readonly groups?: readonly {
      readonly label: string;
      readonly items: readonly string[];
    }[];
  };
  /** Section 3 — "Mon approche" : titre rédigé, content à compléter */
  readonly approche: {
    readonly title: string;
    readonly content: string;
  };
  /**
   * Sous-sections pathologies optionnelles. Présent uniquement pour les
   * spécialités "parapluie" qui regroupent plusieurs conditions cliniques
   * partageant une même approche (ex: déséquilibres hormonaux → SOPK,
   * endométriose, fertilité, post-partum, cycles irréguliers). Rendu en H3
   * avec ancres URL après la section Approche.
   */
  readonly conditions?: readonly Condition[];
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

/**
 * Tag de maillage interne utilisé sur les sections thématiques de la
 * page `/ateliers`. Rendu en chip glass sous le bloc highlight. Chaque
 * chip cliquable pointe vers une page pertinente (spécialité, bio,
 * médecines ancestrales) pour nourrir le maillage interne SEO et
 * suggérer une lecture associée au visiteur.
 */
export type AtelierLinkTag = {
  readonly label: string;
  readonly href: string;
};

/**
 * Thématique d'atelier proposée par Asmaa. Contenu éditorial rédigé
 * par Asmaa (cf. ATELIER.pdf du 2026-04). Affichée en section verticale
 * empilée sur `/ateliers`, avec ancre URL pour les liens directs
 * (ex : /ateliers#atelier-diy).
 *
 * Distincte du type `Atelier` qui représente les ateliers déjà animés
 * (expérience passée), conservés plus bas sur la page.
 */
export type ThematiqueAtelier = {
  /** Slug pour React key + ancre URL (ex: "atelier-diy") */
  readonly slug: string;
  /** Tag eyebrow en capitales (ex: "ATELIER DIY", "SANTÉ FÉMININE") */
  readonly eyebrow: string;
  /** Titre de la thématique (H2) */
  readonly title: string;
  /** Sous-titre italique sous le H2 */
  readonly subtitle: string;
  /** Paragraphes d'intro (avant le bloc highlight) */
  readonly intro: readonly string[];
  /** Bloc highlight encadré (citation / promesse de l'atelier) */
  readonly highlight: string;
  /** Paragraphes d'outro (après le bloc highlight, avant bullets) */
  readonly outro?: readonly string[];
  /** Bullets points (recettes, points abordés) */
  readonly bullets?: readonly string[];
  /** Tags de maillage interne cliquables (3 à 4 par thématique) */
  readonly tags: readonly AtelierLinkTag[];
  /**
   * Présent uniquement pour la thématique "Diététique saisonnière" :
   * 4 sous-cards (une par saison) insérées entre l'outro et les tags.
   */
  readonly saisons?: readonly {
    readonly name: "Printemps" | "Été" | "Automne" | "Hiver";
    readonly organe: string;
    readonly description: string;
  }[];
};

/**
 * Atelier déjà animé par Asmaa, conservé sur `/ateliers` pour
 * témoigner d'une expérience d'animation en place (thématiques
 * saisonnières, kéfir, bien-être). Communication 100 % indépendante
 * depuis avril 2026 : plus aucune mention d'association tierce.
 *
 * Affiché :
 *   - en card cliquable sur la page `/ateliers` (titre + theme +
 *     shortDescription)
 *   - en modale de détail au clic (longDescription + champs optionnels
 *     date / duration / location / highlights)
 *
 * Toute édition se fait dans `src/data/ateliers.ts`.
 */
export type Atelier = {
  /** Slug pour la React key (kebab-case) */
  readonly slug: string;
  /** Titre de l'atelier — affiché sur la card et en titre de modale */
  readonly title: string;
  /** Catégorie / thème court — affiché en tag au-dessus du titre */
  readonly theme?: string;
  /** Description courte (1-2 lignes) pour la card */
  readonly shortDescription: string;
  /** Description complète (multi-paragraphes possibles via \n) pour la modale */
  readonly longDescription: string;
  /** Date ISO (YYYY-MM-DD) ou texte libre — affiché en footer de modale */
  readonly date?: string;
  /** Durée indicative, ex: "2h" */
  readonly duration?: string;
  /** Lieu libre, affiché uniquement si renseigné. */
  readonly location?: string;
  /** Points clés listés en bullets dans la modale */
  readonly highlights?: readonly string[];
  /**
   * Galerie photo de l'atelier — chemins relatifs à `/public`. Quand
   * renseigné (≥1 image), la modale affiche une grille de miniatures
   * cliquables qui ouvrent un lightbox plein écran (cf. `ateliers/Gallery.tsx`).
   * Toutes les photos doivent être en orientation portrait pour la
   * cohérence de la grille ; rotater côté source si besoin.
   */
  readonly images?: readonly string[];
  /**
   * Affiche officielle de l'atelier (visuel de communication au format
   * paysage ou quasi-carré). Quand renseignée, elle s'affiche en
   * header edge-to-edge en haut de la modale, avant le titre, pour
   * servir de visuel d'accroche. Chemin relatif à `/public`.
   */
  readonly poster?: string;
};
