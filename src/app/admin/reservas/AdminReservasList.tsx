'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ReservaRow } from '@/lib/supabase/types';

function formatPesos(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n);
}

function formatDate(s: string) {
  const d = new Date(s + 'T12:00:00');
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${d.getFullYear()}`;
}

type CancelarReservaFn = (id: string) => Promise<{ ok: boolean; error?: string }>;

export function AdminReservasList({ reservas, cancelarReserva }: { reservas: ReservaRow[]; cancelarReserva: CancelarReservaFn }) {
  const router = useRouter();
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  async function handleCancelar(id: string) {
    if (cancelingId) return;
    setCancelingId(id);
    const result = await cancelarReserva(id);
    setCancelingId(null);
    if (result?.ok) router.refresh();
  }
  if (reservas.length === 0) {
    return (
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-500 sm:p-8" role="status">
        <p className="text-sm sm:text-base">Aún no hay reservas. Las que se confirmen desde el sitio aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto -mx-4 sm:mx-0" style={{ minHeight: 0 }}>
        <table className="min-w-[640px] w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-700">Código</th>
              <th className="px-4 py-3 font-medium text-slate-700">Habitación</th>
              <th className="px-4 py-3 font-medium text-slate-700">Entrada</th>
              <th className="px-4 py-3 font-medium text-slate-700">Salida</th>
              <th className="px-4 py-3 font-medium text-slate-700">Huésped</th>
              <th className="px-4 py-3 font-medium text-slate-700">Total</th>
              <th className="px-4 py-3 font-medium text-slate-700">Estado</th>
              <th className="px-4 py-3 font-medium text-slate-700">Acciones</th>
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
                <td className="px-4 py-3">
                  {(r.estado === 'confirmada' || r.estado === 'pendiente') && (
                    <button
                      type="button"
                      onClick={() => handleCancelar(r.id)}
                      disabled={cancelingId === r.id}
                      className="text-xs font-medium text-red-600 hover:text-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:opacity-50"
                      aria-label={`Cancelar reserva ${r.codigo}`}
                    >
                      {cancelingId === r.id ? 'Cancelando…' : 'Cancelar'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
