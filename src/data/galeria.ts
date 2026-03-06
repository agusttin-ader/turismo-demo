/**
 * Ítems de la galería. Si tiene imageId, usa la imagen de src/data/images.ts o unsplash.ts.
 */
export interface GaleriaItem {
  id: string;
  alt: string;
  categoria: 'habitaciones' | 'comunes' | 'exteriores' | 'bariloche';
  /** Id del slot en images.ts o unsplash.ts; si no está, se muestra placeholder. */
  imageId?: string;
  /** Ajuste del recorte (ej. "center 65%" para mostrar más la parte inferior). */
  objectPosition?: string;
}

export const galeriaItems: GaleriaItem[] = [
  { id: 'g1', alt: 'Dormitorio compartido con literas', categoria: 'habitaciones', imageId: 'dormitorio-6' },
  { id: 'g2', alt: 'Habitación privada doble', categoria: 'habitaciones', imageId: 'habitacion-doble' },
  { id: 'g3', alt: 'Habitación privada con baño', categoria: 'habitaciones', imageId: 'habitacion-suite' },
  { id: 'g4', alt: 'Cocina compartida', categoria: 'comunes', imageId: 'cocina' },
  { id: 'g5', alt: 'Sala de estar y recepción', categoria: 'comunes', imageId: 'ambiente' },
  { id: 'g6', alt: 'Desayuno', categoria: 'comunes', imageId: 'desayuno' },
  { id: 'g7', alt: 'Vista desde el hostel', categoria: 'exteriores', imageId: 'vista-hotel' },
  { id: 'g8', alt: 'Entrada del hostel', categoria: 'exteriores', imageId: 'hero', objectPosition: 'center 65%' },
  { id: 'g9', alt: 'Lago Nahuel Huapi desde Bariloche', categoria: 'bariloche', imageId: 'lago' },
  { id: 'g10', alt: 'Cerro Catedral', categoria: 'bariloche', imageId: 'cerro-catedral' },
  { id: 'g11', alt: 'Centro de Bariloche', categoria: 'bariloche', imageId: 'ubicacion' },
  { id: 'g12', alt: 'Atardecer en la montaña', categoria: 'bariloche', imageId: 'atardecer' },
];
