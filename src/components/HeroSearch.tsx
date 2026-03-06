'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRangePicker } from '@/components/DateRangePicker';
import { GuestSelector } from '@/components/GuestSelector';

function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

function sumarDias(iso: string, dias: number) {
  const d = new Date(iso);
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}

function getRangoParts(entrada: string, salida: string): { fromStr: string; toStr?: string } | null {
  if (!entrada) return null;
  const from = new Date(entrada + 'T12:00:00');
  const fromStr = format(from, 'dd/MM/yyyy', { locale: es });
  if (!salida || salida === entrada) return { fromStr };
  const to = new Date(salida + 'T12:00:00');
  const toStr = format(to, 'dd/MM/yyyy', { locale: es });
  return { fromStr, toStr };
}

export function HeroSearch() {
  const router = useRouter();
  const [entrada, setEntrada] = useState(hoyISO());
  const [salida, setSalida] = useState(sumarDias(hoyISO(), 2));
  const [huespedes, setHuespedes] = useState(1);
  const [calendarioAbierto, setCalendarioAbierto] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setCalendarioAbierto(false);
      }
    }
    if (calendarioAbierto) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [calendarioAbierto]);

  function handleBuscar(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (entrada) params.set('entrada', entrada);
    if (salida) params.set('salida', salida);
    if (huespedes > 1) params.set('huespedes', String(huespedes));
    router.push(`/disponibilidad?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleBuscar}
      className="relative z-10 w-full max-w-3xl rounded-2xl border border-white/20 bg-white/95 p-4 shadow-soft backdrop-blur sm:p-5"
      aria-label="Buscar disponibilidad"
    >
      <p className="mb-3 text-sm font-semibold text-slate-600 sm:mb-4">
        Bariloche, Río Negro
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
        {/* Fechas */}
        <div className="relative flex-1 min-w-0" ref={popoverRef}>
          <label htmlFor="hero-fechas" className="block text-xs font-medium text-slate-500 mb-1">
            Fechas
          </label>
          <button
            id="hero-fechas"
            type="button"
            onClick={() => setCalendarioAbierto(!calendarioAbierto)}
            className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-sm text-slate-900 transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <span className="truncate flex items-center flex-wrap gap-x-1">
              {(() => {
                const parts = getRangoParts(entrada, salida);
                if (parts == null) return 'Elegir fechas';
                if (parts.toStr == null) return parts.fromStr;
                return (
                  <>
                    <span>{parts.fromStr}</span>
                    <span className="mx-1.5 text-slate-500">al día</span>
                    <span>{parts.toStr}</span>
                  </>
                );
              })()}
            </span>
            <svg
              className={`ml-2 h-4 w-4 shrink-0 text-slate-400 transition-transform ${calendarioAbierto ? 'rotate-180' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          {calendarioAbierto && (
            <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[320px] max-w-[360px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
              <p className="mb-3 text-sm font-medium text-slate-700">Seleccioná fechas de estadía</p>
              <DateRangePicker
                entrada={entrada}
                salida={salida}
                onChange={(e, s) => {
                  setEntrada(e);
                  setSalida(s);
                }}
                minNoches={1}
              />
              <button
                type="button"
                onClick={() => setCalendarioAbierto(false)}
                className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition"
              >
                Listo
              </button>
            </div>
          )}
        </div>

        {/* Huéspedes */}
        <div className="sm:w-44 shrink-0">
          <label htmlFor="hero-huespedes" className="block text-xs font-medium text-slate-500 mb-1">
            Huéspedes
          </label>
          <GuestSelector
            id="hero-huespedes"
            value={huespedes}
            onChange={setHuespedes}
            className="h-11"
          />
        </div>

        {/* Buscar */}
        <div className="flex flex-col justify-end">
          <button
            type="submit"
            className="btn-primary h-11 w-full sm:w-auto sm:min-w-[120px]"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}
