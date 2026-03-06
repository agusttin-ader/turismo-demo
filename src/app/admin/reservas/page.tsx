import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AdminReservasList } from './AdminReservasList';
import { ReservasToolbar } from './ReservasToolbar';
import { cancelarReserva } from './actions';

export const metadata = { title: 'Reservas | Admin' };

export default async function AdminReservasPage({
  searchParams,
}: {
  searchParams: { estado?: string; q?: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login?from=/admin/reservas');

  const estado = searchParams.estado ?? '';
  const qRaw = (searchParams.q ?? '').trim().slice(0, 200);
  // Escapar comodines de LIKE para búsqueda literal (\% y \_ en PostgreSQL)
  const q = qRaw.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_');

  let query = supabase.from('reservas').select('*').order('entrada', { ascending: false });
  if (estado && ['confirmada', 'pendiente', 'cancelada', 'completada'].includes(estado)) {
    query = query.eq('estado', estado);
  }
  if (q.length > 0) {
    query = query.or(`codigo.ilike.%${q}%,nombre_guest.ilike.%${q}%,email.ilike.%${q}%`);
  }
  const { data: reservas, error } = await query;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reservas</h1>
        <p className="mt-1 text-slate-600">Gestioná reservas, filtrá por estado y exportá a CSV.</p>
      </div>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error.message}</div>
      )}
      <ReservasToolbar
        reservas={reservas ?? []}
        estadoActual={estado}
        qActual={qRaw}
      />
      <AdminReservasList reservas={reservas ?? []} cancelarReserva={cancelarReserva} />
    </div>
  );
}
