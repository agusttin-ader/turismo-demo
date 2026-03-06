/** Tipos alineados con las tablas de Supabase (schema.sql) */
export type EstadoReserva = 'confirmada' | 'cancelada' | 'pendiente' | 'completada';

export interface ReservaRow {
  id: string;
  habitacion_slug: string;
  entrada: string;
  salida: string;
  huespedes: number;
  total_noches: number;
  total_pesos: number;
  nombre_guest: string;
  email: string;
  telefono: string | null;
  codigo: string;
  metodo_pago: 'tarjeta' | 'hotel';
  estado: EstadoReserva;
  created_at: string;
  updated_at: string;
}

export interface HabitacionRow {
  id: string;
  slug: string;
  nombre: string;
  capacidad: string;
  descripcion: string;
  precio_por_noche: number;
  activo: boolean;
  created_at: string;
  updated_at: string;
}
