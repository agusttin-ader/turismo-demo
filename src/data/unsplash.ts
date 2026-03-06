/**
 * Imágenes de Unsplash con crédito obligatorio.
 * Reemplazá las URLs por las fotos que elijas; mantené siempre authorName y authorUrl.
 *
 * Cómo obtener la URL en Unsplash: elegí la foto → Download → "Custom size" o copiá el link directo.
 * Formato recomendado: https://images.unsplash.com/photo-XXXXX?w=1200&q=80
 */

export interface UnsplashCredit {
  authorName: string;
  /** URL del perfil del autor en Unsplash (ej. https://unsplash.com/@usuario) */
  authorUrl: string;
}

export interface UnsplashImageConfig {
  id: string;
  /** URL completa de la imagen en images.unsplash.com */
  src: string;
  alt: string;
  credit: UnsplashCredit;
}

/** Registro de imágenes por id. Usar en <UnsplashImage imageId="hero" /> */
export const unsplashImages: Record<string, UnsplashImageConfig> = {
  // ——— Hero (página de inicio) ———
  hero: {
    id: 'hero',
    src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1600&q=80',
    alt: 'Vista del hostel o paisaje de Bariloche',
    credit: { authorName: 'Lukas Schlagenhauf', authorUrl: 'https://unsplash.com/@schlagenhauf' },
  },

  // ——— Tarjetas "Por qué elegirnos" (home) ———
  ubicacion: {
    id: 'ubicacion',
    src: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
    alt: 'Ubicación céntrica',
    credit: { authorName: 'Nathan Anderson', authorUrl: 'https://unsplash.com/@nathananderson' },
  },
  ambiente: {
    id: 'ambiente',
    src: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
    alt: 'Ambiente hostel',
    credit: { authorName: 'Olia Gozha', authorUrl: 'https://unsplash.com/@oliagozha' },
  },
  experiencias: {
    id: 'experiencias',
    src: 'https://images.unsplash.com/photo-1533105077500-4b4860066ea7?w=800&q=80',
    alt: 'Actividades y excursiones',
    credit: { authorName: 'Benjamin Voros', authorUrl: 'https://unsplash.com/@benjaminvoros' },
  },

  // ——— Galería (reemplazar ids g1–g12 cuando tengas las fotos) ———
  'galeria-g1': {
    id: 'galeria-g1',
    src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
    alt: 'Dormitorio compartido con literas',
    credit: { authorName: 'Spacejoy', authorUrl: 'https://unsplash.com/@spacejoy' },
  },
  'galeria-g2': {
    id: 'galeria-g2',
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    alt: 'Habitación privada doble',
    credit: { authorName: 'Kam Idris', authorUrl: 'https://unsplash.com/@kamidris' },
  },
  'galeria-g3': {
    id: 'galeria-g3',
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    alt: 'Habitación privada con baño',
    credit: { authorName: 'Spacejoy', authorUrl: 'https://unsplash.com/@spacejoy' },
  },
  'galeria-g4': {
    id: 'galeria-g4',
    src: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80',
    alt: 'Cocina compartida',
    credit: { authorName: 'Jean-Philippe Delberghe', authorUrl: 'https://unsplash.com/@jipy32' },
  },
  'galeria-g5': {
    id: 'galeria-g5',
    src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    alt: 'Sala de estar y recepción',
    credit: { authorName: 'Jean-Philippe Delberghe', authorUrl: 'https://unsplash.com/@jipy32' },
  },
  'galeria-g6': {
    id: 'galeria-g6',
    src: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80',
    alt: 'Desayuno',
    credit: { authorName: 'Brooke Lark', authorUrl: 'https://unsplash.com/@brookelark' },
  },
  'galeria-g7': {
    id: 'galeria-g7',
    src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
    alt: 'Vista desde el hostel',
    credit: { authorName: 'Joshua Earle', authorUrl: 'https://unsplash.com/@joshuaearle' },
  },
  'galeria-g8': {
    id: 'galeria-g8',
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    alt: 'Entrada del hostel',
    credit: { authorName: 'Pascal Debrunner', authorUrl: 'https://unsplash.com/@pascal_debrunner' },
  },
  'galeria-g9': {
    id: 'galeria-g9',
    src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80',
    alt: 'Lago Nahuel Huapi desde Bariloche',
    credit: { authorName: 'Lukas Schlagenhauf', authorUrl: 'https://unsplash.com/@schlagenhauf' },
  },
  'galeria-g10': {
    id: 'galeria-g10',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Cerro Catedral',
    credit: { authorName: 'Benjamin Voros', authorUrl: 'https://unsplash.com/@benjaminvoros' },
  },
  'galeria-g11': {
    id: 'galeria-g11',
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    alt: 'Centro de Bariloche',
    credit: { authorName: 'Benjamin Voros', authorUrl: 'https://unsplash.com/@benjaminvoros' },
  },
  'galeria-g12': {
    id: 'galeria-g12',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    alt: 'Atardecer en la montaña',
    credit: { authorName: 'Benjamin Voros', authorUrl: 'https://unsplash.com/@benjaminvoros' },
  },
};

const UNSPLASH_BASE = 'https://unsplash.com';

/** Devuelve la config de una imagen por id, o undefined si no existe. */
export function getUnsplashImage(imageId: string): UnsplashImageConfig | undefined {
  return unsplashImages[imageId];
}

/** Texto de crédito según guidelines de Unsplash: "Photo by [Name] on Unsplash" */
export function getUnsplashCreditText(credit: UnsplashCredit): string {
  return `Photo by ${credit.authorName} on Unsplash`;
}

/** URL de Unsplash para el enlace "on Unsplash". */
export function getUnsplashAttributionUrl(): string {
  return UNSPLASH_BASE;
}
