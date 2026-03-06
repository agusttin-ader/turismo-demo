'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

export function DisponibilidadStep1Form() {
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

  function handleVerHabitaciones(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('entrada', entrada);
    params.set('salida', salida);
    if (huespedes > 1) params.set('huespedes', String(huespedes));
    router.push(`/disponibilidad?${params.toString()}`);
  }

  return (
    <form onSubmit={handleVerHabitaciones} className="mx-auto max-w-xl space-y-6">
      <p className="text-slate-600">
        Elegí fechas de estadía y cantidad de huéspedes. Esos datos se guardan y en el siguiente paso elegís la habitación.
      </p>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div ref={popoverRef} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Fechas de estadía
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setCalendarioAbierto(!calendarioAbierto)}
                className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-left text-sm text-slate-900"
              >
                <span>
                  {entrada && salida
                    ? `${entrada} → ${salida}`
                    : 'Elegir fechas'}
                </span>
                <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              {calendarioAbierto && (
                <div className="absolute left-0 top-full z-20 mt-2">
                  <DateRangePicker
                    entrada={entrada}
                    salida={salida}
                    onChange={(e, s) => {
                      setEntrada(e);
                      setSalida(s);
                    }}
                    minNoches={1}
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="disp-huespedes" className="block text-sm font-medium text-slate-700 mb-2">
              Huéspedes
            </label>
            <GuestSelector
              id="disp-huespedes"
              value={huespedes}
              onChange={setHuespedes}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto">
        Ver habitaciones disponibles
      </button>
    </form>
  );
}
