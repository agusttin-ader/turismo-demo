import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AdminReservasList } from './AdminReservasList';
import { cancelarReserva } from './actions';

export const metadata = { title: 'Reservas | Admin' };

export default async function AdminReservasPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login?from=/admin/reservas');
  const { data: reservas, error } = await supabase.from('reservas').select('*').order('entrada', { ascending: false });
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Reservas</h1>
      <p className="mt-1 text-slate-600">Todas las reservas por fecha de entrada.</p>
      {error && <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error.message}</div>}
      <AdminReservasList reservas={reservas ?? []} cancelarReserva={cancelarReserva} />
    </div>
  );
}
