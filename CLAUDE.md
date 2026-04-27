# CLAUDE.md — Projet Asmaa Mansouri Naturopathe

> Fichier directeur du projet. Toute décision de code, de design ou de contenu doit être cohérente avec ce document.

---

## Mission

Création complète du site vitrine d'**Asmaa Mansouri**, naturopathe spécialisée en santé féminine, basée à Décines-Charpieu (69150).

Site à construire de A à Z. L'ancien site (Gamma.site) est abandonné — on repart de zéro sur **naturopathe-decines.fr**.

---

## Mantra du projet

**LOGIQUE · DESIGN · SEO · USER-FRIENDLY**

Chaque décision, chaque composant, chaque ligne de code doit servir ces 4 piliers simultanément.

---

## Stack technique

| Élément | Choix | Raison |
|---|---|---|
| Framework | **Next.js 15** (App Router, Turbopack) | Stable, React 19, SSR/SSG natif, SEO-first |
| Styling | **Tailwind CSS v4** (config CSS-first via `@theme`) | Léger, OKLCH natif, auto-scan |
| Langage | **TypeScript** | Typage strict, maintenabilité |
| Icônes | **Iconoir** | Open source, SVG léger, cohérent |
| Hébergement | **Vercel** | Déploiement natif Next.js, edge, preview deploys |
| Langue | **100% français** | Pas d'i18n, site vitrine local |

---

## Fichiers de référence

| Fichier | Rôle | Statut |
|---|---|---|
| `PERSONA.md` | Identité, parcours, ton, cible, services d'Asmaa | ✅ Validé |
| `DESIGN.md` | Palette warm + accent, glass recipe, typo, boutons, patterns landing | ✅ **Figé 2026-04-14** (post-landing) |
| `STRUCTURE.md` | Navigation, arborescence, contenu par page | ⚠️ En cours (pages internes Phase 2) |
| `CLAUDE.md` | Fichier directeur — stack, principes, méthodologie | ✅ Ce fichier |
| `PALETTE_AUDIT.md` | (ancien) Audit palette `vert/beige` pré-refactor | ❌ Obsolète — tokens supprimés, à ignorer |

**Landing figée — base pour toutes les pages internes :**

La landing page (`src/app/page.tsx` + sections `Hero`, `Presentation`,
`Specialites`, `Cabinet`, `Prestations`, `Temoignages`) est validée à
100 % en couleurs, UI et UX au 2026-04-14. **Toute nouvelle page doit
réutiliser les tokens `warm-*` / `accent` et les recettes documentées
dans `DESIGN.md`** (glass, boutons, cards, typo, radius, section types).
Pas de variation créative sur les patterns de base — seule la
composition et le contenu diffèrent entre pages.

Source de vérité technique : `src/app/globals.css`.

STRUCTURE.md évolue au fur et à mesure. Ne pas se bloquer si un élément n'est pas encore défini — avancer, proposer, itérer.

---

## Palette — rappel globals.css (post-landing)

```css
@theme {
  /* Warm — beige crème chaud → olive vert (hue ~140 sur 700/900) */
  --color-warm-100: #F2E4CF;                    /* fond body — beige Gamma */
  --color-warm-300: #FEF5E7;                    /* overlays, washes locaux */
  --color-warm-500: oklch(0.84  0.030 78);      /* bordures sable, tints /15 */
  --color-warm-700: oklch(0.40  0.050 140);     /* texte body, icônes */
  --color-warm-900: oklch(0.28  0.045 140);     /* titres, emphasis */

  /* Accent CTA — olive plein (identique à warm-700) */
  --color-accent:       oklch(0.40  0.050 140);
  --color-accent-hover: oklch(0.32  0.045 140);

  /* Typographies (injectées par next/font sur <html>) */
  --font-display: var(--font-outfit), "Outfit", sans-serif;
  --font-body:    var(--font-manrope), "Manrope", sans-serif;

  /* Radius adaptatif — 5 tokens selon hauteur du composant */
  --radius-sm:  4px;   /* ≤40px : inputs, tags fins */
  --radius-md:  6px;   /* 40-56px : boutons, cards, tags, mini-cards */
  --radius-lg:  8px;   /* 56-100px : réservé */
  --radius-xl:  10px;  /* 100-300px : Header pill, panels, photos */
  --radius-2xl: 14px;  /* 300px+ : sections géantes */
}
```

Custom prop `--glass-bg` hors `@theme` (surchargée via `@supports`) :
`color-mix(in oklch, #FFF8F0 65%, transparent)` — fond de toutes les
surfaces glass (cards, Header, tags, bouton secondary). Voir
`DESIGN.md` pour la recette complète.

---

## Principes de développement

### Architecture & code

- **Composants réutilisables** : chaque élément UI qui apparaît plus d'une fois devient un composant
- **Séparation des responsabilités** : composants UI purs / composants layout / composants page / données
- **Nommage explicite** : pas de code mort, pas de commentaires inutiles
- **Structure de fichiers** par feature/page, pas par type de fichier
- **Server Components par défaut** : "use client" uniquement quand nécessaire
- **next/image** pour toutes les images, **next/font** pour les polices
- **Deux versions si nécessaire** : certains composants peuvent avoir une version desktop et mobile distincte si le responsive seul ne suffit pas

### Design & UI

- **Paddings et margins cohérents** : pas de valeurs aléatoires, grille respectée
- **Responsive-first** : mobile → tablette → desktop
- **Border-radius : 4px partout** — carré assumé, voir DESIGN.md
- **SVG massivement utilisés** : logo, icônes, éléments décoratifs
- **Pas de bibliothèque UI par défaut** : on construit sur mesure avec Tailwind
- shadcn ou autre uniquement si le besoin est identifié, pas en prévention

### SEO — deux phases

**PHASE 1 (pendant le dev) — les fondations qu'on respecte dès le départ :**
- URL propre par page (kebab-case, sans stopwords)
- Un H1 unique par page, cohérent avec le mot-clé cible
- HTML sémantique : `header`, `nav`, `main`, `section`, `article`, `footer` — pas de div soup
- Arborescence à 2 niveaux max (sitelinks-ready)
- Maillage interne logique : spoke → hub `/prestations` → accueil
- Fil d'Ariane visuel sur toutes les pages **niveau 2+** uniquement (sauf landing et hubs niveau 1, déjà accessibles directement via le Header pill)

**PHASE 2 (une fois contenu et UI stables) — le SEO technique :**
- Metadata (title, description, Open Graph, Twitter Card)
- Schema.org (LocalBusiness, Person, Service, FAQPage, BreadcrumbList)
- Breadcrumbs schema
- Sitemap.xml et robots.txt
- Favicon, balises alt sur toutes les images
- Accessibilité WCAG, contrastes
- Core Web Vitals (LCP, FID, CLS)

> ⚠️ Ne pas faire de SEO technique en cours de route. On code d'abord l'architecture et le contenu, on peaufine le SEO une fois que tout est en place.

---

## Méthodologie de travail

1. **On avance page par page, section par section** — pas de big bang
2. **Travail méticuleux et professionnel** — chaque détail compte
3. **On itère** — fonctionnel d'abord, design affiné ensuite, SEO technique en dernier
4. **Le projet évolue** — on ajoute bibliothèques, composants, pages au fur et à mesure
5. **Quand un choix n'est pas encore validé** — on propose, on ne se bloque pas

---

## Structure de fichiers cible

```
src/
├── app/
│   ├── layout.tsx                              # Layout global (Header + Footer)
│   ├── page.tsx                                # Landing page
│   ├── globals.css                             # Tailwind v4 @theme (palette + typo + radius)
│   ├── qui-suis-je/page.tsx
│   ├── cabinet/page.tsx
│   ├── prestations/
│   │   ├── page.tsx                            # Index hub prestations
│   │   ├── appel-decouverte/page.tsx
│   │   ├── consultation-bilan/page.tsx
│   │   ├── consultation-suivi/page.tsx
│   │   ├── massage-tuina-haut-du-corps/page.tsx
│   │   ├── massage-tuina-corps-complet/page.tsx
│   │   ├── cupping-therapy/page.tsx
│   │   └── accompagnement-3-mois/page.tsx
│   ├── blog/                                   # Phase 2
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── mentions-legales/page.tsx
├── components/
│   ├── ui/
│   │   └── Logo.tsx                            # Logo SVG inline (à créer via Quiver AI)
│   ├── layout/
│   │   ├── Header.tsx                          # Nav desktop + menu mobile
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── Presentation.tsx
│       ├── Approche.tsx
│       ├── ServicesGrid.tsx
│       ├── Temoignages.tsx
│       ├── CabinetBloc.tsx
│       ├── FAQ.tsx
│       └── CTAFinal.tsx
├── data/
│   ├── site.ts                                 # phone, email, adresse, GPS, resalibUrl
│   ├── navigation.ts                           # navLinks — une seule source de vérité
│   ├── prestations.ts                          # 7 services typés (slug, titre, durée, description)
│   └── temoignages.ts                          # témoignages typés (à collecter)
├── lib/
│   └── utils.ts                                # cn(), helpers
└── types/
    └── index.ts                                # Prestation, Temoignage, etc.
```

---

## Assets

| Fichier | Emplacement | Statut |
|---|---|---|
| `Logo.tsx` | `src/components/ui/` | À créer via Quiver AI — SVG inline, théable |
| `asmaa-mansouri.jpg` | `public/` | En attente — à recevoir d'Asmaa |
| `cabinet-*.jpg` | `public/` | En attente — à recevoir d'Asmaa |

---

## Skills Vercel / Next.js

```bash
npx skills add vercel-labs/next-skills
```

| Skill | Quand l'appliquer |
|---|---|
| `next-best-practices` | Dès le début — RSC, async patterns, directives |
| `image` | Dès l'intégration des visuels |
| `font` | Dès le setup |
| `metadata` | Phase 2 uniquement |

---

*Fichier évolutif · Dernière mise à jour : avril 2026*
