/**
 * Testimonios de huéspedes (ficticios). Para producción reemplazar por reseñas reales o API.
 */
export interface Testimonio {
  id: string;
  nombre: string;
  origen: string;
  texto: string;
  fecha: string;
  puntaje: number; // 1-5
}

export const testimonios: Testimonio[] = [
  {
    id: '1',
    nombre: 'María G.',
    origen: 'Buenos Aires',
    texto: 'Excelente ubicación y muy buena onda. El desayuno está muy bien y la cocina compartida es ideal para ahorrar. Volvería sin dudar.',
    fecha: 'Enero 2025',
    puntaje: 5,
  },
  {
    id: '2',
    nombre: 'Lucas M.',
    origen: 'Córdoba',
    texto: 'Pasé una semana esquiando y el hostel fue la base perfecta. Cerca del centro y de los colectivos al cerro. Staff muy atento.',
    fecha: 'Agosto 2024',
    puntaje: 5,
  },
  {
    id: '3',
    nombre: 'Franco y Ana',
    origen: 'Mendoza',
    texto: 'Habitación privada con baño impecable. Tranquilos y limpios. Nos ayudaron a reservar la excursión a Isla Victoria.',
    fecha: 'Diciembre 2024',
    puntaje: 5,
  },
  {
    id: '4',
    nombre: 'Camila R.',
    origen: 'Chile',
    texto: 'Muy buen ambiente para viajeros solos. Conocí gente genial en la cocina. El dormitorio de 4 camas es cómodo y tiene lockers.',
    fecha: 'Marzo 2024',
    puntaje: 4,
  },
  {
    id: '5',
    nombre: 'Diego P.',
    origen: 'Rosario',
    texto: 'Precio justo, limpio y bien ubicado. Ideal para quienes buscan algo simple sin renunciar a estar en el centro de Bariloche.',
    fecha: 'Julio 2024',
    puntaje: 5,
  },
];
