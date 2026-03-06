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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Habitaciones</h1>
        <p className="mt-1 text-slate-600">
          Tipos de alojamiento. Para ver ocupación por fechas, consultá Reservas.
        </p>
      </div>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error.message}
        </div>
      )}
      {habitaciones && habitaciones.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {habitaciones.map((h) => (
            <div
              key={h.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <p className="font-semibold text-slate-900">{h.nombre}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">{h.slug}</p>
              <p className="mt-3 text-lg font-bold text-primary">
                {formatPesos(h.precio_por_noche)}
                <span className="text-sm font-normal text-slate-500">/noche</span>
              </p>
              <span
                className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                  h.activo ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {h.activo ? 'Activa' : 'Inactiva'}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
          No hay habitaciones en la base. Ejecutá el script <code className="rounded bg-slate-100 px-1">supabase/schema.sql</code> en Supabase para crear y cargar las habitaciones.
        </div>
      )}
    </div>
  );
}
