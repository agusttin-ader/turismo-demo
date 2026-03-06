import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login?from=/admin');

  const today = new Date().toISOString().slice(0, 10);
  const in7Days = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const [
    { count: totalReservas },
    { count: confirmadas },
    { count: canceladas },
    { count: proximasCount },
    { data: proximasLlegadas },
  ] = await Promise.all([
    supabase.from('reservas').select('*', { count: 'exact', head: true }),
    supabase.from('reservas').select('*', { count: 'exact', head: true }).eq('estado', 'confirmada'),
    supabase.from('reservas').select('*', { count: 'exact', head: true }).eq('estado', 'cancelada'),
    supabase
      .from('reservas')
      .select('*', { count: 'exact', head: true })
      .eq('estado', 'confirmada')
      .gte('entrada', today)
      .lte('entrada', in7Days),
    supabase
      .from('reservas')
      .select('id, codigo, habitacion_slug, entrada, nombre_guest')
      .eq('estado', 'confirmada')
      .gte('entrada', today)
      .lte('entrada', in7Days)
      .order('entrada', { ascending: true })
      .limit(5),
  ]);

  const kpis = [
    { label: 'Total reservas', value: totalReservas ?? 0, href: '/admin/reservas', color: 'slate' },
    { label: 'Confirmadas', value: confirmadas ?? 0, href: '/admin/reservas?estado=confirmada', color: 'green' },
    { label: 'Canceladas', value: canceladas ?? 0, href: '/admin/reservas?estado=cancelada', color: 'red' },
    { label: 'Próximas llegadas (7 días)', value: proximasCount ?? 0, href: '/admin/reservas', color: 'primary' },
  ];

  function formatDate(s: string) {
    const d = new Date(s + 'T12:00:00');
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="mt-1 text-slate-600">Resumen de reservas y actividad.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ label, value, href, color }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p
              className={`mt-2 text-2xl font-bold ${
                color === 'green'
                  ? 'text-green-600'
                  : color === 'red'
                    ? 'text-red-600'
                    : color === 'primary'
                      ? 'text-primary'
                      : 'text-slate-900'
              }`}
            >
              {value}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-400 group-hover:text-primary">Ver detalle →</p>
          </Link>
        ))}
      </div>

      {proximasLlegadas && proximasLlegadas.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-4 py-4 sm:px-5">
            <h2 className="font-semibold text-slate-900">Próximas llegadas</h2>
            <p className="text-sm text-slate-500">Reservas confirmadas con entrada en los próximos 7 días.</p>
          </div>
          <ul className="divide-y divide-slate-100">
            {proximasLlegadas.map((r: { id: string; codigo: string; habitacion_slug: string; entrada: string; nombre_guest: string }) => (
              <li key={r.id}>
                <Link
                  href="/admin/reservas"
                  className="flex flex-col gap-1 px-4 py-3 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:gap-4"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-sm font-medium text-slate-900">{r.codigo}</span>
                    <span className="text-sm text-slate-600">{r.nombre_guest}</span>
                    <span className="text-sm text-slate-500">{r.habitacion_slug}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-700">{formatDate(r.entrada)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/reservas"
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <div>
            <h2 className="font-semibold text-slate-900">Reservas</h2>
            <p className="mt-1 text-sm text-slate-500">Gestionar, filtrar y cancelar reservas.</p>
          </div>
          <span className="text-2xl text-slate-300">→</span>
        </Link>
        <Link
          href="/admin/habitaciones"
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <div>
            <h2 className="font-semibold text-slate-900">Habitaciones</h2>
            <p className="mt-1 text-sm text-slate-500">Ver tipos y precios. Ocupación en Reservas.</p>
          </div>
          <span className="text-2xl text-slate-300">→</span>
        </Link>
      </div>
    </div>
  );
}
