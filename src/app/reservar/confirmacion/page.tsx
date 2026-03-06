'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { STORAGE_KEY, type ReservaData } from '@/components/ReservaForm';

function formatPesos(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n);
}

export default function ConfirmacionPage() {
  const [data, setData] = useState<ReservaData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setData(JSON.parse(raw) as ReservaData);
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        setData(null);
      }
    } else {
      setData(null);
    }
  }, []);

  if (data === null) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 text-center">
        <h1 className="text-xl font-semibold text-slate-900">No hay reserva para mostrar</h1>
        <p className="mt-2 text-slate-600">
          Completá el proceso de reserva desde la página de reservar.
        </p>
        <Link href="/reservar" className="mt-6 inline-block font-semibold text-primary hover:text-primary-dark">
          Ir a reservar
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-xl">
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-center sm:p-6">
              <h1 className="text-xl font-bold text-green-800 sm:text-2xl">
                ¡Reserva confirmada!
              </h1>
              <p className="mt-2 text-green-700">
                Código de reserva: <strong className="font-mono">{data.codigo}</strong>
              </p>
              <p className="mt-1 text-sm text-green-600">
                (Simulado — no se realizó ningún cobro real.)
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Resumen de la reserva</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-600">Habitación</dt>
              <dd className="font-medium text-slate-900">{data.habitacion.nombre}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Entrada</dt>
              <dd className="text-slate-900">{data.entrada}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Salida</dt>
              <dd className="text-slate-900">{data.salida}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Noches</dt>
              <dd className="text-slate-900">{data.totalNoches}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Huésped</dt>
              <dd className="text-slate-900">{data.nombre}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Email</dt>
              <dd className="text-slate-900">{data.email}</dd>
            </div>
            {data.metodoPago && (
              <div className="flex justify-between">
                <dt className="text-slate-600">Forma de pago</dt>
                <dd className="text-slate-900">
                  {data.metodoPago === 'hotel' ? 'Pagar en el hotel' : 'Tarjeta (simulado)'}
                </dd>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-3">
              <dt className="font-medium text-slate-700">Total</dt>
              <dd className="font-semibold text-slate-900">{formatPesos(data.totalPesos)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-slate-500">
            En un entorno real, acá podrías mostrar un mensaje tipo “Te enviamos un email de confirmación a {data.email}”.
          </p>
          <Link
            href="/"
            className="btn-primary mt-6"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}
