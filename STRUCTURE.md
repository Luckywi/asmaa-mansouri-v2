# STRUCTURE.md — Asmaa Mansouri Naturopathe

> Architecture du site. Fichier évolutif — ne contient que les éléments validés.

---

## Arborescence

```
/                                         → Landing page
/qui-suis-je                              → Page identité
/cabinet                                  → Page cabinet
/prestations                              → Index services (hub)
  /prestations/appel-decouverte
  /prestations/consultation-bilan
  /prestations/consultation-suivi
  /prestations/massage-tuina-haut-du-corps
  /prestations/massage-tuina-corps-complet
  /prestations/cupping-therapy
  /prestations/accompagnement-3-mois
/blog                                     → Index articles (phase 2)
/blog/[slug]                              → Article individuel (phase 2)
/mentions-legales
```

---

## Navigation

**Header fixe :**
Logo · Qui suis-je · Cabinet · Prestations · Blog · **[Prendre RDV →]** (CTA)

**Footer :**
Liens pages · Mentions légales · Instagram · Téléphone · Email

**Breadcrumb :**
Sur toutes les pages sauf la landing — schema.org BreadcrumbList (Phase 2 SEO technique)

---

## SEO — deux phases

### Phase 1 — fondations pendant le dev

- URL propre par page (kebab-case, sans stopwords)
- Un H1 unique par page, cohérent avec le mot-clé cible
- HTML sémantique : header, nav, main, section, article, footer
- Maillage interne : spoke → hub /prestations → accueil
- Fil d'Ariane visuel sur toutes les pages sauf landing

### Phase 2 — une fois contenu et UI stables

- Metadata (title, description, Open Graph)
- Schema.org (LocalBusiness, Person, Service, FAQPage, BreadcrumbList)
- Sitemap.xml et robots.txt
- Alt text toutes images, favicon
- Core Web Vitals

---

## Pages

---

### / — Landing page

**Mots-clés cibles :** "naturopathe Décines", "naturopathe Lyon Est", "naturopathie féminine Lyon"

**H1 :** Naturopathe à Décines, spécialisée en santé féminine

**Blocs dans l'ordre :**

1. Hero — H1 + accroche + CTA RDV + photo Asmaa
2. Présentation courte — qui est Asmaa, 3 lignes → lien /qui-suis-je
3. Piliers de l'approche — 4 blocs icône + texte (alimentation, phyto, manuel, holistique)
4. Services mis en avant — 3 services cards → lien /prestations
5. Extrait témoignages — 2-3 avis *(à collecter)*
6. Bloc cabinet — photo + adresse + carte → lien /cabinet
7. FAQ courte — 4-5 questions fréquentes
8. CTA final — Prendre RDV + appel découverte

**SEO Phase 2 :**
- `<title>` : Asmaa Mansouri — Naturopathe à Décines-Charpieu
- `<meta description>` : Naturopathie féminine à Décines-Charpieu — consultations, massages Tuina, cupping. Prenez RDV en ligne.
- Schema.org : LocalBusiness · FAQPage

---

### /qui-suis-je — Page identité

**H1 :** Une naturopathe engagée pour la santé des femmes

**Blocs dans l'ordre :**

1. Breadcrumb
2. Hero texte — H1 + photo portrait Asmaa
3. Mon parcours — texte long, formations, philosophie
4. Mes valeurs — 3 blocs illustration + texte
5. Mes diplômes & formations — liste structurée *(à compléter avec Asmaa)*
6. Extrait témoignages — 2 avis
7. CTA — Prendre RDV

**SEO Phase 2 :**
- `<title>` : Qui suis-je — Asmaa Mansouri, Naturopathe à Décines
- Schema.org : Person · BreadcrumbList

---

### /cabinet — Page cabinet

**H1 :** Le cabinet — naturopathie à Décines-Charpieu

**Blocs dans l'ordre :**

1. Breadcrumb
2. Hero — H1 + photo cabinet
3. Présentation du lieu — texte + photos *(à recevoir)*
4. Infos pratiques — adresse, horaires, accès (tramway T3, parking, bus 8)
5. Carte Google Maps intégrée
6. Consultations à distance — section dédiée (Zoom / téléphone)
7. CTA — Prendre RDV

**Adresse :** Everybodyfit, 15 rue Jean Jaurès, 69330 Meyzieu *(à mettre à jour si changement Décines)*

**SEO Phase 2 :**
- `<title>` : Cabinet de naturopathie à Décines-Charpieu — Asmaa Mansouri
- Schema.org : LocalBusiness · BreadcrumbList

---

### /prestations — Index services (hub)

**H1 :** Mes prestations en naturopathie féminine

**Blocs dans l'ordre :**

1. Breadcrumb
2. Hero — H1 + accroche approche globale
3. Grille des 7 services — card par service (titre, description courte, durée, lien → page dédiée)
4. Bloc "par où commencer ?" — orienter vers l'appel découverte
5. FAQ générale prestations — 4-5 questions
6. Témoignages — 3 avis
7. CTA — Prendre RDV

**SEO Phase 2 :**
- `<title>` : Prestations — Naturopathie féminine à Décines · Asmaa Mansouri
- Schema.org : FAQPage · BreadcrumbList

---

### /prestations/[service] — Pages services individuelles

> Template commun aux 7 pages — contenu spécifique par service

**H1 :** [Nom service] — naturopathie féminine à Décines-Charpieu

**Blocs dans l'ordre :**

1. Breadcrumb (Accueil › Prestations › [Nom service])
2. Hero — H1 + accroche + durée + CTA RDV
3. Description détaillée — pour qui, comment ça se passe, bénéfices
4. Illustration + texte alterné — déroulé de la séance
5. À qui s'adresse cette prestation — profils ciblés
6. FAQ spécifique au service — 3-4 questions
7. Témoignage(s) lié(s) à ce service
8. Services complémentaires — 2 cards vers autres prestations (maillage interne)
9. CTA final — Prendre RDV + lien → /prestations

**SEO Phase 2 :**
- `<title>` : [Nom service] à Décines — Asmaa Mansouri, Naturopathe
- Schema.org : Service · FAQPage · BreadcrumbList

---

## Composants transversaux

| Composant | Description |
|---|---|
| Bandeau RDV sticky (mobile) | Lien Resalib — persistant sur toutes les pages |
| Bloc témoignages | Réutilisable — *témoignages à collecter avant mise en ligne* |
| Bloc FAQ | Schema.org FAQPage — réutilisable par page |
| CTA final | Identique sur toutes les pages |
| Breadcrumb | Toutes pages sauf landing |

---

## Mots-clés cibles globaux

- "naturopathe Décines"
- "naturopathe Décines-Charpieu"
- "naturopathe Lyon Est"
- "naturopathie féminine Lyon"
- "massage Tuina Décines"
- "cupping therapy Lyon Est"

---

*Fichier évolutif · Blog en phase 2 · Témoignages à collecter avant mise en ligne · Avril 2026*
