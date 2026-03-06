import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
export const metadata = {
  title: 'Habitaciones | Admin Refugio Nahuel',
};

function formatPesos(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n);
}

export default async function AdminHabitacionesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login?from=/admin/habitaciones');

  const { data: habitaciones, error } = await supabase
    .from('habitaciones')
    .select('*')
    .order('slug');

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Habitaciones</h1>
      <p className="mt-1 text-slate-600">
        Listado de habitaciones. Para ver cuándo se liberan, consultá las fechas en Reservas.
      </p>
      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error.message}
        </div>
      )}
      {habitaciones && habitaciones.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {habitaciones.map((h) => (
            <div
              key={h.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="font-medium text-slate-900">{h.nombre}</p>
              <p className="mt-1 text-sm text-slate-500">{h.slug}</p>
              <p className="mt-2 text-sm font-semibold text-primary">
                {formatPesos(h.precio_por_noche)}/noche
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {h.activo ? 'Activa' : 'Inactiva'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          No hay habitaciones en la base. Ejecutá el script <code className="rounded bg-slate-100 px-1">supabase/schema.sql</code> en Supabase para crear y cargar las habitaciones.
        </div>
      )}
    </div>
  );
}
