import Link from 'next/link';

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Panel de administración</h1>
      <p className="mt-2 text-slate-600">
        Gestioná reservas y disponibilidad de habitaciones.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/reservas"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <h2 className="font-semibold text-slate-900">Reservas</h2>
          <p className="mt-1 text-sm text-slate-500">
            Ver y gestionar reservas. Estado y fechas.
          </p>
        </Link>
        <Link
          href="/admin/habitaciones"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
        >
          <h2 className="font-semibold text-slate-900">Habitaciones</h2>
          <p className="mt-1 text-sm text-slate-500">
            Ver habitaciones y cuándo se liberan.
          </p>
        </Link>
      </div>
    </div>
  );
}
