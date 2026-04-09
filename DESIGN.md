# DESIGN.md — Asmaa Mansouri Naturopathe

> Direction artistique du projet. Fichier évolutif — ne contient que les éléments validés.

---

## Palette couleurs

### Vert — usage 500 → 900 uniquement

Hue fixe : 154.34 — chroma proportionnel

| Stop | OKLCH | Usage |
|---|---|---|
| 500 | `oklch(0.414 0.058 154.34)` | CTA, tags, accents, bordures actives |
| 700 | `oklch(0.232 0.032 154.34)` | Body, nav, sous-titres, texte secondaire |
| 900 | `oklch(0.05 0.007 154.34)` | Titres H1, H2 |

> ⚠️ Les stops 100 et 300 du vert ne sont pas utilisés dans ce projet.

### Beige — usage complet 100 → 900

Hue fixe : 90 — chroma proportionnel

| Stop | OKLCH | Usage |
|---|---|---|
| 100 | `oklch(0.972 0.006 90)` | Fond de page, cards, modales |
| 300 | `oklch(0.888 0.022 90)` | Sections alternées, hero, bg secondaire |
| 500 | `oklch(0.729 0.036 84.593)` | Bordures cards, séparateurs |
| 700 | `oklch(0.619 0.03 84.593)` | Texte secondaire sur fond très clair |
| 900 | `oklch(0.509 0.025 84.593)` | Texte dense sur fond très clair |

---

## Règles d'usage couleurs

| Élément | Couleur |
|---|---|
| Fond de page global | beige-100 + wash vert-300 fixed (cf. Principe d'uniformité) |
| Cards, placeholders photo, blocs internes | beige-300 |
| Titres H1, H2 | vert-900 |
| Sous-titres, body, liens nav | vert-700 |
| CTA primaire | bg vert-500, texte beige-100 |
| CTA secondaire (outline) | bordure vert-500, texte vert-700 |
| Cards | bg beige-100, bordure beige-500 |
| Modales | bg beige-100, bordure beige-500 |
| Tags / badges | bg vert-500, texte beige-100 |
| Accent décoratif | gradient vert-500 → vert-900 |

---

## Typographies

| Rôle | Police | Source | Usage |
|---|---|---|---|
| Display / Titres | **Outfit** | Google Fonts · next/font | H1, H2, H3 |
| Body / UI | **Manrope** | Google Fonts · next/font | Body, nav, boutons, labels |

### Échelle typographique

| Élément | Police | Taille | Graisse | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| H1 | Outfit | 48px | 500 | 1.15 | -0.02em |
| H2 | Outfit | 32px | 500 | 1.25 | -0.01em |
| H3 | Outfit | 22px | 500 | 1.30 | 0 |
| Body | Manrope | 16px | 400 | 1.70 | 0 |
| Small | Manrope | 14px | 400 | 1.60 | 0 |
| Nav | Manrope | 14px | 500 | 1.00 | 0.02em |
| Bouton | Manrope | 14px | 500 | 1.00 | 0.01em |
| Label / tag | Manrope | 11px | 500 | 1.00 | 0.06em |

---

## Principe d'uniformité — approche composant

> Le site fonctionne en **approche composant**, pas en approche section. Toute la page flotte sur **un seul fond uniforme** (le body), et c'est la mise en page des composants à l'intérieur des sections qui crée le rythme visuel — jamais des changements de couleur de fond entre sections.

### Le fond du body (canvas global)

Le `<body>` porte un fond unique pour tout le site, défini une seule fois dans `globals.css` :

- **Couleur de base** : `var(--color-beige-100)` — partout
- **Wash décoratif** : un gradient `vert-300` à 27% d'opacité, appliqué sur 38vh du **haut** et 38vh du **bas** de la viewport
- **`background-attachment: fixed`** — le gradient est attaché au viewport, pas au body. Conséquence : pendant que l'utilisateur scrolle, le wash vert reste **en permanence** au top et au bottom de l'écran. Le site est constamment "framé" par cette matière colorée à toutes les hauteurs de scroll.

C'est la **seule source de couleur de fond** sur le projet. Aucune section ne doit en ajouter d'autre.

### Règles strictes

| ❌ Interdit | ✅ À la place |
|---|---|
| `<section className="bg-beige-300 ...">` | `<section className="...">` (transparente, hérite du body) |
| Alternance de couleurs entre sections | Différenciation par padding, bordures séparatrices, ou composants internes |
| `bg-*` sur l'élément `<section>` racine | `bg-*` autorisé sur les **composants internes** (cards, photo placeholders, chips, hover pills, etc.) |
| Tout ce qui crée une "cassure" visuelle entre deux sections successives | Transition fluide, le contenu glisse sur le canvas commun |

### Différenciation visuelle entre sections (sans bg)

Quand on a besoin de séparer visuellement deux sections successives :

- **Bordures séparatrices** : `border-t border-beige-500` en haut de la section suivante
- **Paddings différents** : `py-24` vs `py-32` pour des respirations distinctes
- **Composants internes** avec bg propre (cards beige-300, photos avec bordures, blocs colorés)
- **Largeurs de container différentes** : `max-w-4xl` vs `max-w-7xl` pour varier l'amplitude visuelle

### Pourquoi ce choix

L'approche composant est plus moderne et plus élégante qu'un patchwork de sections colorées. Elle :
- Donne une **identité visuelle forte et constante** (le canvas reste reconnaissable partout)
- Met le **contenu au premier plan** (pas le contenant)
- Permet une **lecture fluide** sans cassures perceptuelles
- Évite les pièges de "trop de couleurs" qui cassent l'élégance d'une palette restreinte (vert + beige uniquement)

---

## Composants UI

### Système de radius adaptatif

> Le radius n'est pas une valeur unique — c'est une échelle de **5 tokens** qui s'adapte à la taille des composants. Chaque élément choisit son radius dans cette échelle pour rester "presque carré" tout en gagnant un léger arrondi proportionnel à sa taille.

| Token | Pixels | Cible (hauteur) | Exemples |
|---|---|---|---|
| `--radius-sm` | **4px** | ≤40px | Boutons standards, inputs, tags, badges |
| `--radius-md` | **6px** | 40-56px | CTA primaires, hover pills nav, boutons larges |
| `--radius-lg` | **8px** | 56-100px | Cards, sections moyennes |
| `--radius-xl` | **10px** | 100-300px | Header pill, modales, blocs larges |
| `--radius-2xl` | **14px** | 300px+ | Hero, sections géantes, fullscreen |

**Principe :** Chaque composant choisit le token correspondant à sa **hauteur typique**. Le ratio radius/hauteur reste autour de **10-15%** — assez pour adoucir les coins, jamais assez pour ressembler à une pill.

**Règle stricte :** Pas de `rounded-full` dans le projet (sauf cas exceptionnel documenté type avatar circulaire). Tous les composants restent dans l'échelle ci-dessus pour préserver le look "angles assumés".

### Application sur les composants existants

| Composant | Hauteur | Token | Pixels |
|---|---|---|---|
| Header pill flottante | h-16 (64px) | `rounded-xl` | 10px |
| ButtonLink primary (CTA) | h-10 (40px) | `rounded-md` | 6px |
| Nav link hover pill | ~40px | `rounded-md` | 6px |
| Logo Link wrap | ~40px | `rounded-md` | 6px |
| Skip link | ~44px | `rounded-md` | 6px |

### Bordures

| Élément | Épaisseur |
|---|---|
| Cards / inputs | 1px |
| Séparateurs | 0.5px |
| Header glass (Apple-style) | 0.5px |

> L'angle "presque carré" reste un choix design assumé qui contraste avec la douceur de la typographie. L'échelle adaptative permet de garder cette identité tout en évitant l'incohérence visuelle qui apparaîtrait si tous les composants utilisaient strictement 4px.

---

## globals.css — @theme Tailwind v4

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
  --font-display: 'Outfit', sans-serif;
  --font-body:    'Manrope', sans-serif;

  /* Radius — système adaptatif (cf. section "Composants UI") */
  --radius-sm:  4px;   /* ≤40px : boutons, inputs, tags */
  --radius-md:  6px;   /* 40-56px : CTA, hover pills */
  --radius-lg:  8px;   /* 56-100px : cards */
  --radius-xl:  10px;  /* 100-300px : Header pill, modales */
  --radius-2xl: 14px;  /* 300px+ : hero, blocs géants */
}
```

---

## Logo

- **Statut :** À créer via Quiver AI
- **Format :** SVG monochrome inline (composant React)
- **Version claire :** vert-900 (sur fonds beige)
- **Version sombre :** beige-100 (sur fonds verts)
- **Nom affiché :** Asmaa Mansouri · Naturopathe

---

## Photos

- **Statut :** En attente — à recevoir d'Asmaa
- **Traitement :** Tons chauds cohérents avec la palette, pas de filtre froid
- **Format cible :** WebP, optimisé via next/image

---

*Fichier évolutif · Ne valider que les éléments confirmés · Avril 2026*
