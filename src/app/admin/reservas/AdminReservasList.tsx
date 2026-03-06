'use client';

import type { ReservaRow } from '@/lib/supabase/types';

function formatPesos(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n);
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function AdminReservasList({ reservas }: { reservas: ReservaRow[] }) {
  if (reservas.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        Aún no hay reservas. Las que se confirmen desde el sitio aparecerán aquí.
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-700">Código</th>
              <th className="px-4 py-3 font-medium text-slate-700">Habitación</th>
              <th className="px-4 py-3 font-medium text-slate-700">Entrada</th>
              <th className="px-4 py-3 font-medium text-slate-700">Salida</th>
              <th className="px-4 py-3 font-medium text-slate-700">Huésped</th>
              <th className="px-4 py-3 font-medium text-slate-700">Total</th>
              <th className="px-4 py-3 font-medium text-slate-700">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {reservas.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-mono text-slate-900">{r.codigo}</td>
                <td className="px-4 py-3 text-slate-700">{r.habitacion_slug}</td>
                <td className="px-4 py-3 text-slate-700">{formatDate(r.entrada)}</td>
                <td className="px-4 py-3 text-slate-700">{formatDate(r.salida)}</td>
                <td className="px-4 py-3 text-slate-700">{r.nombre_guest}</td>
                <td className="px-4 py-3 text-slate-700">{formatPesos(r.total_pesos)}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      r.estado === 'confirmada'
                        ? 'inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800'
                        : r.estado === 'cancelada'
                          ? 'inline-flex rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800'
                          : 'inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700'
                    }
                  >
                    {r.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
