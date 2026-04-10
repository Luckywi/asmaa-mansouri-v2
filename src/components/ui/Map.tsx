"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { site } from "@/data/site";

/**
 * Style positron CartoDN — base minimaliste grayscale, parfaite pour
 * être recolorisée au runtime via setPaintProperty(). Vector tiles
 * gratuites, sans API key, attribution incluse dans les tiles.
 */
const STYLE_URL =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

/**
 * Résout une variable CSS du thème en `rgba(r, g, b, a)` 8-bit sRGB que
 * maplibre comprend sans ambiguïté.
 *
 * Pourquoi cette gymnastique : Tailwind v4 sert les couleurs en `oklch()`
 * (CSS Color 4), et maplibre ne sait parser que sRGB. On force donc la
 * conversion en peignant la couleur dans un canvas 1×1 puis en lisant
 * les pixels — la spec garantit que `getImageData` retourne des octets
 * sRGB peu importe la couleur source.
 */
function resolveCssColor(varName: string, fallback = "rgb(0, 0, 0)"): string {
  if (typeof window === "undefined") return fallback;

  // 1. Résoudre var(--…) via une <div> probe
  const probe = document.createElement("div");
  probe.style.color = `var(${varName})`;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  document.body.removeChild(probe);
  if (!resolved) return fallback;

  // 2. Forcer la conversion en sRGB 8-bit via canvas pixel
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return fallback;
  ctx.fillStyle = resolved;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(3)})`;
}

interface MapProps {
  className?: string;
}

/**
 * Map — carte MapLibre du cabinet, themée à la palette du site.
 *
 * Style positron de Carto CDN comme base, puis recoloriée au runtime
 * en bouclant sur les layers et en remappant chaque type vers les
 * tokens du thème :
 *   - background → rose-200 (terrain neutre, aligné sur le fond body)
 *   - fill (water/park/building) → rose-200 à 10% d'opacité (cohérence
 *     avec le fond body, filigrane discret)
 *   - fill (tout le reste) → rose-200 (fond uniforme, no clutter)
 *   - line (routes) → rose-200 à 10% d'opacité (filigrane discret)
 *   - symbol text → vert-700 + halo rose-200 (lisibilité)
 *
 * Le marker est un SVG inline avec le path lucide MapPin (pas iconoir),
 * peint en vert-700 (accent du thème) avec un point inner rose-200.
 * Anchored 'bottom' pour que la pointe du pin soit pile sur les coords.
 *
 * Scroll-zoom désactivé (UX : sinon l'utilisateur scroll la page et
 * zoom sans le vouloir), drag/click reste actif.
 *
 * Client component obligatoire — maplibre a besoin du DOM.
 */
export default function Map({ className }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    /* Couleurs résolues depuis le thème — suivent automatiquement la palette */
    const ACCENT = resolveCssColor("--color-vert-700");
    // BG = rose-200 (terrain neutre, aligné sur le fond body)
    const BG = resolveCssColor("--color-rose-200");
    // SUBTLE = rose-500 plein, appliqué avec fill-opacity / line-opacity 0.1.
    // Plus foncé que le fond (rose-200) pour que le filigrane reste visible,
    // tout en gardant la même famille de teinte.
    const SUBTLE = resolveCssColor("--color-rose-500");
    const LABEL = resolveCssColor("--color-vert-700");

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      center: [site.gps.lng, site.gps.lat],
      zoom: 13,
      attributionControl: false,
    });

    // Désactive le scroll-zoom : sinon l'utilisateur qui scroll la page
    // se retrouve à zoomer sur la map sans le vouloir.
    map.scrollZoom.disable();

    mapRef.current = map;

    map.on("load", () => {
      const style = map.getStyle();
      if (style?.layers) {
        for (const layer of style.layers) {
          const id = layer.id;
          const type = layer.type;

          if (type === "background") {
            map.setPaintProperty(id, "background-color", BG);
          } else if (type === "fill") {
            // Eau, parcs et bâtiments en rose-200 à 10% d'opacité ;
            // tout le reste (terre, landuse résidentiel) fond dans le BG.
            if (
              id.includes("water") ||
              id.includes("park") ||
              id.includes("building")
            ) {
              map.setPaintProperty(id, "fill-color", SUBTLE);
              map.setPaintProperty(id, "fill-opacity", 0.1);
            } else {
              map.setPaintProperty(id, "fill-color", BG);
            }
          } else if (type === "line") {
            // Routes en rose-200 à 10% d'opacité — filigrane discret
            map.setPaintProperty(id, "line-color", SUBTLE);
            map.setPaintProperty(id, "line-opacity", 0.1);
          } else if (type === "symbol" && layer.layout?.["text-field"]) {
            map.setPaintProperty(id, "text-color", LABEL);
            map.setPaintProperty(id, "text-halo-color", BG);
          }
        }
      }

      /*
        Marker custom — SVG lucide MapPin inline, peint en vert-700 (ACCENT)
        avec un cercle inner rose-200 (BG) pour la "boule" du pin.
        anchor: 'bottom' pour que la pointe du pin tombe pile sur les coords.
      */
      const el = document.createElement("div");
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="${ACCENT}" stroke="${ACCENT}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3" fill="${BG}" stroke="${BG}"/></svg>`;
      el.style.cursor = "pointer";

      new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([site.gps.lng, site.gps.lat])
        .addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
