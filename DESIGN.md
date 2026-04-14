# DESIGN.md — Asmaa Mansouri Naturopathe

> Direction artistique du projet. **Figée au 2026-04-14** après validation
> complète de la landing page. Toute nouvelle page doit réutiliser ces
> tokens et ces recettes — pas de variation créative sur les patterns de
> base (glass, boutons, cards, typo, radius).
>
> Source de vérité technique : `src/app/globals.css`. Ce document explique
> **comment** consommer ces tokens — le CSS reste le juge final.

---

## Palette — `warm` + `accent`

Palette monochrome beige + accent olive. Deux familles seulement, pas de
vert/beige séparés, pas de stops 100/300 côté accent.

### Warm (100 → 900)

| Token | Valeur | Usage |
|---|---|---|
| `--color-warm-100` | `#F2E4CF` (beige crème chaud ref Gamma) | Fond body, texte sur bouton primary |
| `--color-warm-300` | `#FEF5E7` (crème clair) | Réservé overlays / gradient local (Temoignages fade). **Pas un fond de section.** |
| `--color-warm-500` | `oklch(0.84 0.030 78)` (sable) | Bordures, tints faibles (`/15`), avatar placeholder |
| `--color-warm-700` | `oklch(0.40 0.050 140)` (olive ~`#38512F`) | Texte body, icônes, sous-titres, nav, rating stars, watermark |
| `--color-warm-900` | `oklch(0.28 0.045 140)` (olive foncé ~`#1e3715`) | Titres H1/H2/H3, Logo wordmark, hover renforcé |

### Accent (CTA)

| Token | Valeur | Usage |
|---|---|---|
| `--color-accent` | `oklch(0.40 0.050 140)` | Fond bouton primary (identique à warm-700) |
| `--color-accent-hover` | `oklch(0.32 0.045 140)` | Hover bouton primary |

> Les stops 100/300 de l'accent n'existent pas — le bouton primary est un
> bloc olive plein, on ne le décline pas en tintes claires. Si un besoin
> émerge, on l'ajoute à `@theme` en gardant la cohérence monochrome.

### Custom property `--glass-bg`

Définie **hors** `@theme` dans `:root` (globals.css:87-100) pour pouvoir
être surchargée au runtime via `@supports`. Ne pas la migrer dans
`@theme`.

| État | Valeur |
|---|---|
| Default (supports backdrop-filter) | `color-mix(in oklch, #FFF8F0 65%, transparent)` |
| Fallback `@supports not (backdrop-filter)` | `color-mix(in oklch, #FFF8F0 95%, transparent)` |

---

## Règles d'usage couleurs

| Élément | Token |
|---|---|
| Fond body global | `var(--color-warm-100)` — plat, uniforme, aucune section n'ajoute de bg |
| Titres H1, H2, H3 | `text-warm-900` |
| Body, sous-titres, nav, icônes standard | `text-warm-700` |
| Texte muted (contact line, copyright, role témoignage) | `text-warm-700/80` · `/60` · `/30` |
| CTA primary | `bg-accent text-warm-100 hover:bg-accent-hover` |
| CTA secondary | glass (`var(--glass-bg)`) + `text-warm-700` + `border-white/50` |
| Cards, tags, mini-blocs décoratifs | glass (voir recette plus bas) |
| Bordures photos / images | `border border-warm-900` (cadre net) ou `border-warm-700/15` (discret) |
| Hairlines (footer, séparateurs) | `bg-warm-700/15` (h-px) ou `border-t border-warm-700/15` |
| Hover nav link (pill) | `bg-warm-500/8` |
| Backdrop modale/menu mobile | `bg-warm-900/15 backdrop-blur-md` |
| Avatar placeholder | `bg-warm-500/15 text-warm-700` |

---

## Principe d'uniformité — approche composant

Le site fonctionne en **approche composant**, pas en approche section.
Toute la page flotte sur le **fond warm-100 uniforme du body**, et c'est
la mise en page des composants glass à l'intérieur des sections qui
crée le rythme visuel — jamais des changements de bg entre sections.

### Règles strictes

| ❌ Interdit | ✅ À la place |
|---|---|
| `<section className="bg-warm-300 …">` | `<section className="relative py-12 lg:py-22">` transparente |
| Alternance de couleurs entre sections | Padding + bordures internes + cards glass |
| `bg-*` sur l'élément `<section>` racine | `bg-*` autorisé sur **composants internes** (cards, tags, avatars) |

### Différenciation visuelle sans bg

- **Padding rythmé** : toutes les sections de la landing utilisent
  `py-12 lg:py-22`. Le Hero sort du lot (`pt-32 pb-12 md:pt-36 lg:pt-40 lg:pb-22`) parce qu'il démarre sous le Header flottant.
- **Hairlines** : `border-t border-warm-700/15` (footer, séparateurs internes).
- **Largeurs** : toutes les sections wrappent leur contenu dans
  `mx-auto max-w-7xl px-6 md:px-8 lg:px-12`. Pour les blocs texte
  centrés : `max-w-3xl mx-auto text-center`.

---

## Typographie

| Rôle | Police | Source |
|---|---|---|
| Display / Titres | **Outfit** (variable) | Google Fonts via `next/font` (`layout.tsx`) |
| Body / UI | **Manrope** (variable) | Google Fonts via `next/font` (`layout.tsx`) |

### Échelle réelle (extraite des composants landing)

| Élément | Classes | Détail |
|---|---|---|
| H1 (Hero) | `font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.05] text-warm-900` | Responsive 3 paliers |
| H2 section | `font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900` | Uniforme sur toute la landing |
| Sous-titre section (sous H2) | `font-display text-xl lg:text-2xl font-light tracking-tight text-warm-700` | Pattern "Asmaa Mansouri / Au service de la santé des femmes" — **pas de `mt`**, posé directement sous le H2 |
| H3 card / detail | `font-display text-xl lg:text-2xl font-medium tracking-tight text-warm-900` (Specialites) · `text-2xl lg:text-3xl` (detail panel Prestations) |
| Description longue | `font-body text-lg leading-relaxed text-warm-700` (intro body) · `text-lg lg:text-xl` (hero sub + intro section) |
| Body card / detail | `font-body text-base leading-relaxed text-warm-700` |
| Nav link | `font-body text-[14px] font-medium tracking-[0.02em]` |
| Bouton | `font-body text-[14px] font-medium tracking-[0.01em]` |
| Tag / chip | `font-body text-xs lg:text-sm font-medium text-warm-700` |
| Footer section title | `font-display text-xs font-medium uppercase tracking-[0.18em] text-warm-900` |
| Logo wordmark | `font-display text-[17px] font-medium tracking-[-0.01em] text-warm-900` + sous-titre `text-[10px] font-light uppercase tracking-[0.18em] text-warm-700` |

---

## Composants UI

### Système de radius adaptatif

Le radius n'est pas une valeur unique — c'est une échelle de 5 tokens
qui s'adapte à la **hauteur typique** du composant. Ratio radius/hauteur
autour de **10-15 %** partout.

| Token | Pixels | Cible (hauteur) | Exemples landing |
|---|---|---|---|
| `--radius-sm` | `4px` | ≤40px | Inputs, tags fins (non utilisé directement actuellement) |
| `--radius-md` | `6px` | 40-56px | **Tous les boutons (h-10)**, tags glass, cards Specialites, ReviewCard, Cabinet map, mini-cards Prestations, items accordion mobile |
| `--radius-lg` | `8px` | 56-100px | (réservé) |
| `--radius-xl` | `10px` | 100-300px | Header pill (h-16), HeaderMobile box, panel mobile, photo Presentation |
| `--radius-2xl` | `14px` | 300px+ | (réservé futures sections larges) |

**Règle stricte** : pas de `rounded-full` (sauf avatar initiale
`Temoignages`). Tous les composants utilisent l'échelle ci-dessus pour
préserver le look "angles assumés".

### Recette glass (recette maîtresse du projet)

Utilisée partout où un bloc doit flotter sur le fond : Header, cards
Specialites, detail panel et mini-cards Prestations, items accordion
mobile, ReviewCard, tags Hero, chips Presentation, bouton secondary.

```tsx
// Bloc glass standard (cards, tags, bouton secondary)
"bg-[var(--glass-bg)]",
"backdrop-blur-xl backdrop-saturate-[1.8]",
"border-[0.5px] border-white/50",
// Shadow allégée (3-layer)
"shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
// Hover standard
"hover:border-white/70",
"transition-colors duration-200 ease-out",
```

**Pour un élément qui flotte (Header pill, modale, panel mobile)** : même
base, shadow 4-layer renforcée :

```tsx
"shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_12px_32px_-10px_rgba(60,30,25,0.20),0_2px_6px_-2px_rgba(60,30,25,0.10)]",
```

**Pour un élément actif / sélectionné** (mini-card Prestations active) :
border blanche quasi-opaque, shadow externe plus présente, léger scale :

```tsx
"border-white/95 opacity-100 saturate-100 scale-[1.015]",
"shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-1px_0_rgba(60,30,25,0.04),0_8px_24px_-8px_rgba(60,30,25,0.25)]",
```

> **Convention shadow** : la teinte sombre est toujours `rgba(60, 30, 25, α)`
> (sRGB ~terracotta foncé, aligné sur le ressenti warm). Ne pas
> introduire d'autres teintes de shadow dans le projet — si besoin de
> plus de présence, on joue sur l'opacité ou l'offset.

### Boutons (ButtonLink)

Deux variantes — voir `src/components/ui/ButtonLink.tsx`. Toutes les CTA
du site **doivent** passer par ce composant.

**Base commune**
```
inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-md
font-body text-[14px] font-medium tracking-[0.01em] whitespace-nowrap
transition-colors duration-150 ease-out
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700
```

**Variant primary** — CTA de conversion (Resalib, "Prendre RDV", "Appeler")
```
text-warm-100 bg-accent hover:bg-accent-hover
shadow-[0_4px_12px_-2px_rgba(40,60,30,0.25),inset_0_1px_0_0_rgba(255,255,255,0.12)]
```

**Variant secondary** — action secondaire (En savoir plus, Itinéraire,
Suivre Instagram) — **glass** (pas outline plat) :
```
text-warm-700 bg-[var(--glass-bg)]
backdrop-blur-xl backdrop-saturate-[1.8]
border-[0.5px] border-white/50
shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]
hover:border-white/70 hover:text-warm-900
```

**Usages observés sur la landing** :
- Primary : Header, Hero ("Prendre RDV"), Specialites "En savoir plus",
  Cabinet "Appeler", Prestations "Découvrir les ateliers", selector
  (detail desktop + accordion mobile), Temoignages "Écrire avis Resalib".
- Secondary : Hero "Appeler", Presentation "Découvrir mon approche",
  Cabinet "Itinéraire", Prestations "Voir toutes les prestations",
  Temoignages "Écrire avis Google" + "Suivre Instagram".

> Les variantes primary et secondary ont la **même hauteur (h-10)** et
> le **même radius (`rounded-md` = 6px)**. Elles s'alignent visuellement
> côte à côte dans tous les contextes.

### Tags / chips glass

Recette glass identique aux cards, taille réduite :

```tsx
"inline-flex items-center px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-md",
"bg-[var(--glass-bg)] backdrop-blur-xl backdrop-saturate-[1.8]",
"border-[0.5px] border-white/50",
"shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(60,30,25,0.04),0_4px_16px_-6px_rgba(60,30,25,0.15)]",
"font-body text-xs lg:text-sm font-medium text-warm-700",
"hover:border-white/70 hover:text-warm-900",
```

Vu dans : Hero tags (conditions), Presentation chips spécialités.

### Cards avec icône "ghost" en watermark

Pattern Specialites + detail panel PrestationsSelector. Deux couches
dans un parent `relative overflow-hidden rounded-md` :

1. **Layer 1** — icône géante en `absolute inset-0 w-full h-full text-warm-700/50 pointer-events-none`, en `strokeWidth={2}`.
2. **Layer 2** — card glass posée par-dessus. Son `backdrop-blur-xl`
   floute l'icône derrière → effet "watermark flouté" sans post-process.

Le LogoMark peut remplacer l'icône quand la card est générique (detail
panel de PrestationsSelector → LogoMark right-aligned à 80% de hauteur).

### Bordures

| Élément | Épaisseur |
|---|---|
| Cards glass | `border-[0.5px]` (Apple Retina, valeur exacte) |
| Photo portrait Presentation | `border border-warm-900` (1px, cadre net) |
| Map Cabinet + hairlines Footer | `border-[0.5px]` ou `border` + `warm-700/15` |

---

## Section types — templates réutilisables

### Section standard centrée (Specialites, Temoignages, Prestations)

```tsx
<section id="…" aria-labelledby="…-titre" className="relative py-12 lg:py-22">
  <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-12">
    <div className="text-center max-w-3xl mx-auto">
      <h2 id="…-titre" className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900">
        …
      </h2>
      <p className="mt-6 font-body text-lg lg:text-xl leading-relaxed text-warm-700">…</p>
    </div>
    {/* grid / selector / contenu spécifique */}
  </div>
</section>
```

### Section split (photo/texte — Presentation, Cabinet)

```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
  <div className="lg:col-span-5">{/* photo */}</div>
  <div className="lg:col-span-7 text-center lg:text-left">
    <h2 className="font-display text-4xl lg:text-5xl font-medium tracking-[-0.02em] leading-[1.1] text-warm-900">…</h2>
    <p className="font-display text-xl lg:text-2xl font-light tracking-tight text-warm-700">sous-titre</p>
    {/* tags, description, CTA */}
  </div>
</div>
```

### Patterns récurrents

- **Rating stars** : 5 étoiles lucide `Star` en `text-warm-700 fill-currentColor stroke-none`, gap compact (`gap-0.5 lg:gap-1`), + texte underline `decoration-warm-500/60` ou `decoration-warm-700/40`.
- **CTA row** : `flex flex-col-reverse sm:flex-row items-center gap-4` (mobile primary au-dessus malgré ordre DOM inverse).
- **Stack mobile / row desktop** : pattern order-1 / order-2 / order-3 dans un grid pour réordonner sans dupliquer le DOM.

---

## Logo

- **Logo** (wordmark texte) : `src/components/ui/Logo.tsx` — placeholder texte Outfit stacké. SVG définitif viendra via Quiver AI, l'API du composant ne changera pas.
- **LogoMark** (glyphe SVG, 250×250) : `src/components/ui/LogoMark.tsx` — `currentColor` + pas de dimensions figées, le parent décide (text-*/w-*/h-*).

Usages LogoMark : Hero centerpiece (294×294), Footer brand block (w-10) + watermark décoratif (420×420 opacité 0.08), detail panel PrestationsSelector (80% de hauteur, right-aligned, opacité 0.50 floutée).

---

## Photos

- **Portrait Asmaa** : `public/asmaa-mansouri.jpg` (951×1280, ratio 3/4). `next/image` en mode `fill`, `object-cover object-top`, container à aspect ratio fixe (mobile `aspect-[3/2]`, desktop `aspect-auto lg:h-full`).
- **Cabinet** : en attente.
- **Format cible** : WebP, optimisé via `next/image`. Traitement tons chauds cohérent avec la palette warm.

---

## Carte (Map cabinet)

Style positron CartoDN (grayscale) recolorisé au runtime vers la
palette warm — voir `src/components/ui/Map.tsx`. Pattern remap :

| Layer | Token |
|---|---|
| `background` | `warm-100` |
| `fill` (water/park/building) | `warm-100 @ 10%` |
| `fill` (autres) | `warm-100` |
| `line` (routes) | `warm-100 @ 10%` |
| `symbol` text | `warm-700` + halo `warm-100` |
| Marker pin (lucide MapPin SVG) | `warm-700` + point inner `warm-100` |

Scroll-zoom désactivé. Client component.

---

## Accessibilité — rappels concrets

- Tous les éléments focusables ont un ring : `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm-700`.
- Chaque `<section>` de landing a un `id` + `aria-labelledby` pointant vers le `id` de son H2.
- Icônes décoratives : `aria-hidden="true"`.
- Skip link dans `layout.tsx` (premier élément focusable du body).
- Accordéon mobile PrestationsSelector : `aria-expanded` + `aria-controls`.
- Burger HeaderMobile : `aria-label` dynamique + `aria-expanded`.
- Tap targets mobile : `min-h-14` (56px) sur les headers accordion (WCAG 2.5.5).

---

## Animations

- **Transitions colors/borders** : `transition-colors duration-150 ease-out` (boutons) ou `duration-200 ease-out` (cards, tags, nav).
- **Framer Motion** : PrestationsSelector (AnimatePresence mode="wait" sur le swap desktop, height auto sur l'accordion mobile, layoutId spring sur l'indicateur actif), HeaderMobile (panel height auto), backdrop fade.
- **Marquee** : animation CSS pure (`@utility animate-marquee` + `@keyframes marquee` / `marquee-vertical`), zero JS. Duration via `[--duration:30s]`. `pauseOnHover` supporté par le composant `Marquee`.

---

## globals.css — état actuel (résumé)

```css
@theme {
  /* warm — monochrome beige → olive */
  --color-warm-100: #F2E4CF;
  --color-warm-300: #FEF5E7;
  --color-warm-500: oklch(0.84  0.030 78);
  --color-warm-700: oklch(0.40  0.050 140);
  --color-warm-900: oklch(0.28  0.045 140);

  /* CTA olive */
  --color-accent:       oklch(0.40 0.050 140);
  --color-accent-hover: oklch(0.32 0.045 140);

  /* Typographies (injectées par next/font sur <html>) */
  --font-display: var(--font-outfit), "Outfit", sans-serif;
  --font-body:    var(--font-manrope), "Manrope", sans-serif;

  /* Radius adaptatif */
  --radius-sm:  4px;
  --radius-md:  6px;
  --radius-lg:  8px;
  --radius-xl:  10px;
  --radius-2xl: 14px;
}

:root {
  --header-height: 64px;
  --glass-bg: color-mix(in oklch, #FFF8F0 65%, transparent);
}

@supports not (backdrop-filter: blur(1px)) {
  :root { --glass-bg: color-mix(in oklch, #FFF8F0 95%, transparent); }
}
```

Body : `background-color: var(--color-warm-100)` + `color: var(--color-warm-700)` + `font-family: var(--font-body)`. Aucun gradient wash au niveau du body — les rares washes (fade overlays Temoignages) sont locaux et inline-style.

---

*Figé au 2026-04-14 après validation landing · Source de vérité technique : `src/app/globals.css`*
