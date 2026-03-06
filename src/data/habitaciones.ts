/**
 * Textos de ejemplo para habitaciones. Reemplazar por contenido definitivo.
 * precioPorNoche: usado para cálculo simulado en reserva (Etapa 2).
 */
export interface Habitacion {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  capacidad: string;
  precioAprox: string;
  /** Precio por noche en pesos (ficticio) para el simulador de reserva. */
  precioPorNoche: number;
}

export const habitaciones: Habitacion[] = [
  {
    id: '1',
    nombre: 'Dormitorio compartido (6 camas)',
    slug: 'dormitorio-compartido-6',
    descripcion:
      'Ambiente ideal para viajeros que buscan conocer gente y ahorrar. Literas cómodas con luz individual y cortina de privacidad. Lockers bajo llave y enchufes en cada cama. Vista al cerro desde la ventana.',
    capacidad: '6 personas',
    precioAprox: 'Desde $XX/noche (ejemplo)',
    precioPorNoche: 12000,
  },
  {
    id: '2',
    nombre: 'Dormitorio compartido (4 camas)',
    slug: 'dormitorio-compartido-4',
    descripcion:
      'Dormitorio más íntimo, perfecto para grupos pequeños o quienes prefieren menos ruido. Mismas comodidades que el de 6: lockers, luz y enchufe por cama, cortinas. Calefacción en invierno.',
    capacidad: '4 personas',
    precioAprox: 'Desde $XX/noche (ejemplo)',
    precioPorNoche: 14000,
  },
  {
    id: '3',
    nombre: 'Habitación privada doble',
    slug: 'habitacion-privada-doble',
    descripcion:
      'Habitación privada con cama doble o dos camas individuales. Baño compartido en el pasillo. Ideal para parejas o amigos que buscan privacidad sin dejar de vivir la atmósfera del hostel.',
    capacidad: '2 personas',
    precioAprox: 'Desde $XX/noche (ejemplo)',
    precioPorNoche: 28000,
  },
  {
    id: '4',
    nombre: 'Habitación privada con baño',
    slug: 'habitacion-privada-bano',
    descripcion:
      'Nuestra opción más cómoda: habitación privada con baño en suite. Cama doble, calefacción y vista a la montaña. Incluye toallas y amenities básicos. Perfecta para una escapada en pareja.',
    capacidad: '2 personas',
    precioAprox: 'Desde $XX/noche (ejemplo)',
    precioPorNoche: 35000,
  },
];

export function getHabitacionBySlug(slug: string): Habitacion | undefined {
  return habitaciones.find((h) => h.slug === slug);
}
