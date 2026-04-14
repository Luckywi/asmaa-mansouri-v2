# Audit palette — landing page

> ⚠️ **OBSOLÈTE (2026-04-14)** — Ce document audite l'ancienne palette
> `vert-*` / `beige-*` qui **n'existe plus** dans `globals.css`. La
> palette actuelle est `warm-*` + `accent-*` (voir `DESIGN.md` et
> `globals.css`). Tous les tokens, chemins de ligne et recettes ci-dessous
> sont conservés **uniquement comme référence historique** du refactor.
> **Ne pas s'en servir pour coder de nouvelles pages.**

## 1. Tokens définis

### Vert (`globals.css:7-13`)
| Token | OKLCH | Hex approx |
|---|---|---|
| `--color-vert-100` | `oklch(0.90  0.045 137)` | — |
| `--color-vert-300` | `oklch(0.66  0.085 137)` | — |
| `--color-vert-500` | `oklch(0.52  0.075 137)` | — |
| `--color-vert-700` | `oklch(0.393 0.061 137)` | `#38512F` |
| `--color-vert-900` | `oklch(0.20  0.030 137)` | — |

### Beige (`globals.css:16-23`)
| Token | OKLCH | Hex approx |
|---|---|---|
| `--color-beige-100` | `oklch(0.938 0.024 86)` | `#F2EAD8` |
| `--color-beige-200` | `oklch(0.90  0.030 86)` | — |
| `--color-beige-300` | `oklch(0.86  0.034 86)` | — |
| `--color-beige-500` | `oklch(0.72  0.044 86)` | — |
| `--color-beige-700` | `oklch(0.60  0.036 86)` | — |
| `--color-beige-900` | `oklch(0.49  0.030 86)` | — |

### Glass (`globals.css:96, 104`)
| Variable | Valeur | Contexte |
|---|---|---|
| `--glass-bg` | `oklch(0.95 0.012 86 / 0.65)` | défaut |
| `--glass-bg` | `oklch(0.938 0.024 86 / 0.95)` | fallback `@supports not (backdrop-filter)` |

### Couleur sRGB hardcodée dans toutes les shadows
| Valeur | Équivalent token |
|---|---|
| `rgba(11, 40, 28, X)` | sRGB approx de `vert-700` |

---

## 2. Body / globals (`globals.css:130-161`)

| Propriété | Valeur |
|---|---|
| `background-color` | `var(--color-beige-100)` |
| `background-image` | `linear-gradient(to bottom, color-mix(in oklch, var(--color-vert-300) 27%, transparent) 0%, transparent 100%)` |
| `background-size` | `100% clamp(220px, 38vh, 520px)` |
| `background-position` | `top` |
| `background-attachment` | `fixed` |
| `color` | `var(--color-vert-700)` |

---

## 3. Backgrounds

| Token | Fichier:ligne | Élément |
|---|---|---|
| `bg-[var(--glass-bg)]` | `HeaderDesktop.tsx:55` | Header pill flottante |
| `bg-[var(--glass-bg)]` | `HeaderMobile.tsx:80` | Header mobile nav box |
| `bg-[var(--glass-bg)]` | `Specialites.tsx:136` | Cards 3 spécialités |
| `bg-[var(--glass-bg)]` | `PrestationsSelector.tsx:86` | Mini-cards desktop sidebar |
| `bg-[var(--glass-bg)]` | `PrestationsSelector.tsx:165` | Detail panel desktop |
| `bg-[var(--glass-bg)]` | `PrestationsSelector.tsx:211` | Mobile accordion items |
| `bg-[var(--glass-bg)]` | `Temoignages.tsx:55` | ReviewCard |
| `bg-vert-900/15` | `HeaderMobile.tsx:64` | Backdrop overlay menu ouvert |
| `bg-vert-500/15` | `Temoignages.tsx:66` | Avatar circle (fond) |
| `bg-vert-500/10` | `Presentation.tsx:78` | Chips spécialités |
| `bg-vert-700/5` | `Hero.tsx:96` | Tag chips hover |
| `bg-vert-500/8` | `HeaderDesktop.tsx:92` | Nav link hover |
| `bg-vert-700/15` | `Footer.tsx:81, 197, 258, 297` | Hairlines internes (h-px) |
| `var(--color-beige-100)` (inline) | `Temoignages.tsx:248, 265` | Fade overlays top/bottom |

### Fade overlays Temoignages (`Temoignages.tsx:243-276`)
```js
backgroundColor: "var(--color-beige-100)"
backgroundImage: "linear-gradient(to bottom, color-mix(in oklch, var(--color-vert-300) 27%, transparent) 0%, transparent 100%)"
backgroundAttachment: "fixed"
maskImage: "linear-gradient(to bottom|top, black 0%, transparent 100%)"
```

---

## 4. Texte

| Token | Fichier:ligne | Élément |
|---|---|---|
| `text-vert-900` | `Hero.tsx:65` | H1 |
| `text-vert-900` | `Presentation.tsx:59` | H2 |
| `text-vert-900` | `Specialites.tsx:86` | H2 |
| `text-vert-900` | `Cabinet.tsx:40` | H2 desktop |
| `text-vert-900` | `Cabinet.tsx:88` | H2 mobile |
| `text-vert-900` | `Prestations.tsx:39` | H2 |
| `text-vert-900` | `Temoignages.tsx:289` | H2 |
| `text-vert-900` | `Specialites.tsx:153` | H3 cards |
| `text-vert-900` | `PrestationsSelector.tsx:113` | Mini-card title |
| `text-vert-900` | `PrestationsSelector.tsx:177` | Detail panel H3 |
| `text-vert-900` | `PrestationsSelector.tsx:238` | Mobile accordion title |
| `text-vert-900` | `Temoignages.tsx:71` | ReviewCard name |
| `text-vert-900` | `Logo.tsx:25` | Logo wordmark "Asmaa" |
| `text-vert-900` | `Footer.tsx:82` | FooterSection title (uppercase) |
| `text-vert-700` | `Hero.tsx:69` | Sous-titre Hero |
| `text-vert-700` | `Presentation.tsx:64` | Sous-titre |
| `text-vert-700` | `Specialites.tsx:91` | Intro paragraph |
| `text-vert-700` | `Cabinet.tsx:46` | Sous-titre adresse |
| `text-vert-700` | `Cabinet.tsx:49` | Description |
| `text-vert-700` | `Prestations.tsx:45` | Description |
| `text-vert-700` | `PrestationsSelector.tsx:108` | Mini-card icon (inactive) |
| `text-vert-700` | `PrestationsSelector.tsx:116` | Tagline mini-card |
| `text-vert-700` | `PrestationsSelector.tsx:181` | Detail description |
| `text-vert-700` | `PrestationsSelector.tsx:241` | Mobile tagline |
| `text-vert-700` | `Temoignages.tsx:81` | ReviewCard quote |
| `text-vert-700` | `Temoignages.tsx:262` | Stars row + count text |
| `text-vert-700` | `Footer.tsx:191` | Baseline |
| `text-vert-700` | `Logo.tsx:30` | Logo sous-titre "Naturopathe" |
| `text-vert-700/80` | `Footer.tsx:108` | FooterLink |
| `text-vert-700/80` | `Footer.tsx:217, 226` | Contact links (tel, email) |
| `text-vert-700/60` | `Footer.tsx:314` | Copyright |
| `text-vert-700/60` | `Temoignages.tsx:75` | ReviewCard role |
| `text-vert-700/30` | `Footer.tsx:221` | Middot separator |
| `text-vert-500` | `ButtonLink.tsx:57` | Variant secondary text |
| `text-beige-100` | `ButtonLink.tsx:54` | Variant primary text |

---

## 5. Bordures

### Glass (white)
| Token | Fichier:ligne | État |
|---|---|---|
| `border-[0.5px] border-white/50` | `HeaderDesktop.tsx:59` | Default |
| `border-[0.5px] border-white/50` | `HeaderMobile.tsx:82` | Default |
| `border-[0.5px] border-white/50` | `Specialites.tsx:138` | Default |
| `border-[0.5px] border-white/50` | `PrestationsSelector.tsx:167` | Detail panel |
| `border-[0.5px] border-white/50` | `Temoignages.tsx:57` | ReviewCard |
| `border-white/95` | `PrestationsSelector.tsx:92` | Mini-card active |
| `border-white/40` | `PrestationsSelector.tsx:93` | Mini-card inactive |
| `border-white/60` | `PrestationsSelector.tsx:93` | Mini-card inactive hover |
| `border-white/70` | `Specialites.tsx:142` | Card group hover |
| `border-white/80` | `PrestationsSelector.tsx:215` | Mobile accordion open |
| `border-white/40` | `PrestationsSelector.tsx:215` | Mobile accordion closed |

### Vert
| Token | Fichier:ligne | Élément |
|---|---|---|
| `border-t border-vert-700/15` | `Footer.tsx:170` | Top du footer |
| `border border-vert-700/15` | `Cabinet.tsx:78` | Map border desktop |
| `border border-vert-700/15` | `Cabinet.tsx:97` | Map border mobile |
| `border border-vert-700/20` | `Hero.tsx:90` | Tag chips default |
| `border-vert-700/35` | `Hero.tsx:96` | Tag chips hover |
| `border border-vert-500` | `ButtonLink.tsx:57` | Variant secondary |

---

## 6. Icônes

### Lucide standalone (couleur via className text-*)
| Token | Fichier:ligne | Icône |
|---|---|---|
| `text-vert-700` | `Hero.tsx:144` | Star × 5 (rating) |
| `text-vert-700` | `Specialites.tsx:152` | Card icons title row (Flower2/Wind/Sunrise) |
| `text-vert-700` | `PrestationsSelector.tsx:108` | Mini-card icons inactive |
| `text-vert-900` | `PrestationsSelector.tsx:108` | Mini-card icons active |
| `text-vert-700` | `PrestationsSelector.tsx:174` | Detail panel ActiveIcon |
| `text-vert-700` | `PrestationsSelector.tsx:234` | Mobile header icon |
| `text-vert-700` | `PrestationsSelector.tsx:252` | ChevronDown |
| `text-vert-700/50` | `Specialites.tsx:119` | Icônes géantes background watermark (strokeWidth 2) |

### LogoMark (SVG composant `currentColor`)
| Token | Fichier:ligne | Contexte |
|---|---|---|
| `text-vert-700` | `Hero.tsx:110` | Centerpiece |
| `text-vert-900` | `Footer.tsx:201` | Footer brand lockup |
| `text-vert-700/50` | `PrestationsSelector.tsx:152` | Detail panel watermark right |
| `text-vert-700 opacity-[0.08]` | `Footer.tsx:181` | Footer décoratif bottom-right 420×420 |

### Hamburger (lignes 2px)
| Token | Fichier:ligne |
|---|---|
| `bg-vert-900` | `HeaderMobile.tsx:95-104` |

---

## 7. Boutons (`ButtonLink.tsx:46-58`)

### Base (commune)
```
inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-md
font-body text-[14px] font-medium tracking-[0.01em] whitespace-nowrap
transition-colors duration-150 ease-out
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vert-700
```

### Variant primary
```
text-beige-100
bg-vert-700
hover:bg-vert-900
shadow-[0_4px_12px_-2px_rgba(11,40,28,0.25),inset_0_1px_0_0_rgba(255,255,255,0.15)]
```

### Variant secondary
```
text-vert-500
bg-transparent
border border-vert-500
hover:bg-vert-500/10
hover:text-vert-700
```

### Usages primary
| Fichier:ligne |
|---|
| `HeaderDesktop.tsx:104` |
| `HeaderMobile.tsx:152, 165` |
| `Hero.tsx:170, 178` |
| `Presentation.tsx:98` |
| `Specialites.tsx:168` |
| `Cabinet.tsx:55, 119` |
| `Prestations.tsx:62` |
| `PrestationsSelector.tsx:185, 273` |
| `Temoignages.tsx:284, 308` |

### Usages secondary
| Fichier:ligne |
|---|
| `Hero.tsx` (Appeler) |
| `Specialites.tsx:54` |
| `Cabinet.tsx:63, 109` |
| `Prestations.tsx:54` |
| `Temoignages.tsx:288, 293, 312` |

---

## 8. Shadows (toutes en `rgba(11, 40, 28, X)`)

### Header pill (4-layer full)
```
shadow-[inset_0_1px_0_rgba(255,255,255,0.7),
         inset_0_-1px_0_rgba(11,40,28,0.04),
         0_12px_32px_-10px_rgba(11,40,28,0.20),
         0_2px_6px_-2px_rgba(11,40,28,0.10)]
```
Fichiers : `HeaderDesktop.tsx:66`, `HeaderMobile.tsx:83`

### Card glass standard (3-layer)
```
shadow-[inset_0_1px_0_rgba(255,255,255,0.7),
         inset_0_-1px_0_rgba(11,40,28,0.04),
         0_4px_16px_-6px_rgba(11,40,28,0.15)]
```
Fichiers : `Specialites.tsx:140`, `PrestationsSelector.tsx:101 (inactive), 168 (detail), 214 (mobile)`, `Temoignages.tsx:58`

### Card glass active renforcée
```
shadow-[inset_0_1px_0_rgba(255,255,255,0.85),
         inset_0_-1px_0_rgba(11,40,28,0.04),
         0_8px_24px_-8px_rgba(11,40,28,0.25)]
```
Fichier : `PrestationsSelector.tsx:97`

### Button primary
```
shadow-[0_4px_12px_-2px_rgba(11,40,28,0.25),
         inset_0_1px_0_0_rgba(255,255,255,0.15)]
```
Fichier : `ButtonLink.tsx:55`

### Skip link focus
```
shadow-[0_4px_12px_-2px_rgba(11,40,28,0.25)]
```
Fichier : `layout.tsx:63`

---

## 9. Glass effect — recette commune

```
bg-[var(--glass-bg)]
backdrop-blur-xl
backdrop-saturate-[1.8]
border-[0.5px] border-white/50
shadow-[...]
```

| Composant | Fichier:ligne | Variante |
|---|---|---|
| Header pill | `HeaderDesktop.tsx:55-66` | rounded-xl, full shadow |
| Header mobile box | `HeaderMobile.tsx:80-83` | rounded-xl, full shadow |
| Specialites card | `Specialites.tsx:136-144` | rounded-md, allégée |
| PrestationsSelector mini-card | `PrestationsSelector.tsx:86-103` | rounded-md, états multiples |
| PrestationsSelector detail | `PrestationsSelector.tsx:165-169` | rounded-md, allégée |
| PrestationsSelector mobile | `PrestationsSelector.tsx:211-216` | rounded-md, états open/closed |
| ReviewCard | `Temoignages.tsx:55-59` | rounded-md, allégée |

Footer : pas glass (`Footer.tsx:170` = `border-t border-vert-700/15` seulement).

---

## 10. Map (`Map.tsx:83-86`)

| Variable | Token | Cible |
|---|---|---|
| `ACCENT` | `--color-vert-700` | Marker pin (fill+stroke), label text |
| `BG` | `--color-beige-100` | Background terrain, label halo, marker inner circle |
| `SUBTLE` | `--color-beige-200` | Bâtiments, eau, parcs, routes (lines) |
| `LABEL` | `--color-vert-700` | Texte des labels |

Layers remappés (`Map.tsx:103-129`) :
- `background` → `BG`
- `fill` (id contient `water|park|building`) → `SUBTLE`
- `fill` (else) → `BG`
- `line` → `SUBTLE`
- `symbol` text → `LABEL` + halo `BG`

---

## 11. Decorations / divers

| Élément | Token | Fichier:ligne |
|---|---|---|
| Indicator bar PrestationsSelector | `bg-vert-700` | `PrestationsSelector.tsx:149` |
| Avatar circle ReviewCard | `bg-vert-500/15` | `Temoignages.tsx:66` |
| Chips spécialités Presentation | `bg-vert-500/10 text-vert-700` | `Presentation.tsx:78-83` |
| Tag chips Hero default | `border-vert-700/20 text-vert-700` | `Hero.tsx:90` |
| Tag chips Hero hover | `bg-vert-700/5 border-vert-700/35 text-vert-900` | `Hero.tsx:96` |
| Underline Hero review link | `decoration-vert-700/40 → decoration-vert-900` | `Hero.tsx:154` |
| Underline Temoignages count | `decoration-vert-500/60` | `Temoignages.tsx:262` |
| Footer hairline top | `border-t border-vert-700/15` | `Footer.tsx:170` |
| Footer hairlines internes | `bg-vert-700/15` (h-px) | `Footer.tsx:81, 197, 258, 297` |
| Footer middot separator | `text-vert-700/30` | `Footer.tsx:221` |
| Footer LogoMark watermark | `text-vert-700 opacity-[0.08]` | `Footer.tsx:181` |
| HeaderMobile backdrop | `bg-vert-900/15` | `HeaderMobile.tsx:64` |

---

## 12. Fréquence d'utilisation

| Token | Occurrences approx |
|---|---|
| `text-vert-700` | 65 |
| `text-vert-900` | 35 |
| `bg-[var(--glass-bg)]` | 7 |
| `border-white/50` | 5 |
| `text-vert-500` | 8 |
| `bg-vert-700` | 8 |
| `border-vert-700/15` | 7 |
| `rgba(11,40,28,X)` (shadows) | 6 familles |
| `text-beige-100` | 6 |
| `text-vert-700/60` | 5 |
| `text-vert-700/50` | 3 |
| `text-vert-700/80` | 3 |
| `bg-vert-500/X` | 4 |
| `vert-300` (gradient body uniquement) | 1 |
| `vert-100` | 0 (créé, non utilisé) |
| `beige-200` | 1 (Map seul) |
| `beige-300` à `beige-900` | 0 |

---

## 13. Opacités utilisées

| Niveau | Contextes |
|---|---|
| `/5` | Hover bg subtil (Hero tag chips) |
| `/8` | Hover bg subtil (HeaderDesktop nav) |
| `/10` | Bg chips (Presentation), hover button secondary |
| `/15` | Hairlines (footer, map border), avatar bg, backdrop overlay |
| `/20` | Border tag chips, shadow drop strong |
| `/25` | Shadow drop button primary, shadow active card |
| `/30` | Middot footer |
| `/35` | Border hover tag chips |
| `/40` | Border inactive (PrestationsSelector mini-card), decoration default |
| `/50` | Border glass standard, watermark icons (text-vert-700/50) |
| `/60` | Border hover inactive, decoration count, text muted |
| `/65` | `--glass-bg` opacité (default) |
| `/70` | Border hover (Specialites cards), shadow inset highlight |
| `/80` | Border active mobile, text-vert-700/80 footer |
| `/85` | Shadow inset highlight active |
| `/95` | Border active desktop, `--glass-bg` opacité (fallback) |
