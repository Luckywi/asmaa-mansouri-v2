import type { SiteData } from "@/types";

/**
 * Données globales du site Asmaa Mansouri Naturopathe.
 * Source unique de vérité pour le contact, l'adresse, les liens externes.
 *
 * Toute modification ici se propage automatiquement dans Header, Footer,
 * pages prestations, mentions légales, schema.org (Phase 2 SEO), etc.
 */
export const site: SiteData = {
  name: "Asmaa Mansouri",
  title: "Asmaa Mansouri · Naturopathe",
  baseline:
    "Soins personnalisés alliant écoute, alimentation, plantes et techniques manuelles, pour des résultats durables.",
  phone: "06 66 97 37 66",
  phoneHref: "tel:0666973766",
  email: "manaturolyon@gmail.com",
  instagram: "@asmaa_naturo_lyon",
  instagramUrl: "https://www.instagram.com/asmaa_naturo_lyon",
  address: {
    street: "48 rue Francisco Ferrer",
    city: "Décines-Charpieu",
    zip: "69150",
    region: "Auvergne-Rhône-Alpes",
    full: "48 rue Francisco Ferrer, 69150 Décines-Charpieu",
  },
  // Coordonnées du 48 rue Francisco Ferrer, 69150 Décines-Charpieu
  // (résolues via Nominatim/OpenStreetMap, précision rue).
  gps: {
    lat: 45.77643,
    lng: 4.97639,
  },
  resalibUrl:
    "https://www.resalib.fr/praticien/104874-asmaa-mansouri-naturopathe-meyzieu",
  // L'URL pointe vers la même fiche Resalib (id 104874) mais slug
  // "decines-charpieu" et ancre #reviews pour atterrir directement sur les
  // avis. Le ?pr=0 force l'onglet avis ouvert.
  resalibReviewsUrl:
    "https://www.resalib.fr/praticien/104874-asmaa-mansouri-naturopathe-decines-charpieu?pr=0#reviews",
  googleReviewsUrl:
    "https://www.google.com/search?sa=X&sca_esv=51f1ea3ba9abaebf&rlz=1C5AJCO_enFR1205FR1206&cs=1&hl=fr-FR&sxsrf=ANbL-n7JiNrsNesOwfM0sBC39gIvZ2eGmQ:1775672427375&q=Mansouri%20Asmaa%20Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NTOzMDMxNzEwtzAyNjG0MDa33MDI-IpR2Dcxrzi_tChTwbE4NzFRwbEss3gRKzZRAL0G4MZGAAAA&rldimm=5668647407823418379&tbm=lcl&ved=0CAcQ5foLahcKEwj44q-i796TAxUAAAAAHQAAAAAQBQ&biw=1920&bih=992&dpr=1#lkt=LocalPoiReviews&arid=Ci9DQUlRQUNvZENodHljRjlvT20xa2QwSkhSelV0WmxoR1drdzFhV0k0T0VGV01XYxAB",
  verifiedReviewsCount: 24,
  googleMapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=48+rue+Francisco+Ferrer%2C+69150+D%C3%A9cines-Charpieu",
  // Horaires placeholder — à valider avec Asmaa avant publication. On garde
  // le dimanche fermé (jour de repos par défaut pour un cabinet libéral) et
  // le samedi matin seul pour matcher le pattern classique naturopathie/MTC
  // (consultations longues en semaine, matinée fin de semaine).
  openingHours: [
    { day: "Lundi", open: "09:00", close: "19:00" },
    { day: "Mardi", open: "09:00", close: "19:00" },
    { day: "Mercredi", open: "09:00", close: "19:00" },
    { day: "Jeudi", open: "09:00", close: "19:00" },
    { day: "Vendredi", open: "09:00", close: "19:00" },
    { day: "Samedi", open: "09:00", close: "13:00" },
    { day: "Dimanche", open: null, close: null },
  ],
} as const;
