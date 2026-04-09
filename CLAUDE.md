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
| `DESIGN.md` | Couleurs OKLCH, typographies, assets, conventions Tailwind | ✅ Validé v2 |
| `STRUCTURE.md` | Navigation, arborescence, contenu par page | ⚠️ En cours |
| `CLAUDE.md` | Fichier directeur — stack, principes, méthodologie | ✅ Ce fichier |

**IMPORTANT :** DESIGN.md est figé sur la palette beige/vert validée. Toute nouvelle page suit strictement les conventions couleurs/radius/typo qui y sont décrites. La source de vérité technique reste `src/app/globals.css`.

STRUCTURE.md évolue au fur et à mesure. Ne pas se bloquer si un élément n'est pas encore défini — avancer, proposer, itérer.

---

## Palette — rappel globals.css

```css
@theme {
  /* Vert — usage 500 → 900 uniquement */
  --color-vert-500: oklch(0.414 0.058 154.34);
  --color-vert-700: oklch(0.232 0.032 154.34);
  --color-vert-900: oklch(0.05  0.007 154.34);

  /* Beige — usage complet */
  --color-beige-100: oklch(0.972 0.006 90);
  --color-beige-300: oklch(0.888 0.022 90);
  --color-beige-500: oklch(0.729 0.036 84.593);
  --color-beige-700: oklch(0.619 0.03  84.593);
  --color-beige-900: oklch(0.509 0.025 84.593);

  /* Typographies */
  --font-display: 'Outfit', sans-serif;   /* Titres H1/H2/H3 */
  --font-body:    'Manrope', sans-serif;  /* Body, UI, nav, boutons */

  /* Radius — quasi carré */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 4px;
}
```

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
- Fil d'Ariane visuel sur toutes les pages sauf landing

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
