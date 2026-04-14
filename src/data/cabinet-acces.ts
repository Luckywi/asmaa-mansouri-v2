import type { LucideIcon } from "lucide-react";
import { Bus, Car, TramFront } from "lucide-react";

/**
 * Données de la section "Accessibilité du cabinet" (/cabinet).
 *
 * Toutes les informations transport / parking sont sourcées TCL et
 * Parkinlyon — pas d'estimation de trajet, pas de donnée inventée.
 * Si une info doit évoluer (horaires, lignes, capacité), mettre à jour
 * d'abord ici, les composants n'ont pas de fallback.
 *
 * Sources :
 *   - tcl.fr (ligne T3, ligne 85, P+R Grand Large)
 *   - parkinlyon.fr (Parc Relais Décines Grand Large)
 *
 * À noter : l'arrêt T3, l'arrêt Bus 85 et le Parc Relais partagent tous
 * le nom "Décines Grand Large" et sont situés sur la rue Francisco
 * Ferrer, la même rue que le cabinet (n° 48).
 */

export type AccessMode = {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly description: string;
  readonly details: readonly string[];
};

export const zonesDesservies = [
  "Lyon",
  "Villeurbanne",
  "Meyzieu",
  "Vaulx-en-Velin",
  "Bron",
  "Chassieu",
  "Saint-Priest",
  "Jonage",
  "Pusignan",
  "Genas",
  "Caluire-et-Cuire",
  "Est lyonnais",
] as const;

export const accessModes: readonly AccessMode[] = [
  {
    icon: TramFront,
    title: "Tramway T3",
    description:
      "Le cabinet se trouve à proximité immédiate de l'arrêt Décines Grand Large, desservi par la ligne T3 qui relie la Part-Dieu à Meyzieu.",
    details: [
      "Ligne T3 : Gare Part-Dieu Villette ↔ Meyzieu Les Panettes",
      "Arrêt Décines Grand Large, sur la rue Francisco Ferrer",
    ],
  },
  {
    icon: Bus,
    title: "Bus 85",
    description:
      "La ligne de bus 85 a son terminus à Décines Grand Large, au 24 rue Francisco Ferrer, à quelques mètres du cabinet (au n° 48 de la même rue).",
    details: [
      "Ligne 85 : Meyzieu ↔ Décines Grand Large (terminus)",
      "Arrêt au 24 rue Francisco Ferrer",
    ],
  },
  {
    icon: Car,
    title: "Parking Relais Grand Large",
    description:
      "Le Parc Relais TCL Décines Grand Large a son entrée sur la rue Francisco Ferrer, la même rue que le cabinet.",
    details: [
      "57 places voiture et 2 places PMR",
      "Gratuit sur présentation d'un ticket TCL validé dans la journée",
      "Entrée rue Francisco Ferrer, 69150 Décines-Charpieu",
    ],
  },
] as const;
