'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import type { ReservaRow } from '@/lib/supabase/types';

function formatDate(s: string) {
  const d = new Date(s + 'T12:00:00');
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${d.getFullYear()}`;
}

function escapeCsvCell(s: string) {
  if (s == null) return '';
  const str = String(s);
  if (str.includes('"') || str.includes(',') || str.includes('\n')) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

export function ReservasToolbar({
  reservas,
  estadoActual,
  qActual,
}: {
  reservas: ReservaRow[];
  estadoActual: string;
  qActual: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(qActual);

  function applyFilters(estado: string, search: string) {
    const params = new URLSearchParams();
    if (estado) params.set('estado', estado);
    if (search.trim()) params.set('q', search.trim());
    router.push(`${pathname}?${params.toString()}`);
  }

  function exportCsv() {
    const headers = ['Código', 'Habitación', 'Entrada', 'Salida', 'Huésped', 'Email', 'Total', 'Estado'];
    const rows = reservas.map((r) => [
      r.codigo,
      r.habitacion_slug,
      formatDate(r.entrada),
      formatDate(r.salida),
      r.nombre_guest,
      r.email,
      r.total_pesos,
      r.estado,
    ]);
    const csv = [headers.join(','), ...rows.map((row) => row.map((cell) => escapeCsvCell(String(cell))).join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reservas-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <select
        value={estadoActual}
        onChange={(e) => applyFilters(e.target.value, searchParams.get('q') ?? '')}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">Todos los estados</option>
        <option value="confirmada">Confirmadas</option>
        <option value="pendiente">Pendientes</option>
        <option value="cancelada">Canceladas</option>
        <option value="completada">Completadas</option>
      </select>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          applyFilters(estadoActual, q);
        }}
      >
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Código, nombre o email..."
          className="w-48 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-56"
        />
        <button type="submit" className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700">
          Buscar
        </button>
      </form>
      {reservas.length > 0 && (
        <button
          type="button"
          onClick={exportCsv}
          className="ml-auto rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Exportar CSV
        </button>
      )}
    </div>
  );
}
