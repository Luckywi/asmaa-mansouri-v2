import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — combine des classes Tailwind avec gestion des conflits.
 *
 * Utilise clsx pour la composition conditionnelle, puis tailwind-merge
 * pour résoudre les conflits (ex: "px-2 px-4" → "px-4", la dernière gagne).
 *
 * Standard de l'écosystème React + Tailwind, utilisé par shadcn, MagicUI,
 * Radix, et la plupart des design systems modernes. Indispensable dès qu'on
 * commence à composer dynamiquement des classes Tailwind.
 *
 * Exemple :
 *   cn("px-4 py-2", isActive && "bg-vert-500", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
