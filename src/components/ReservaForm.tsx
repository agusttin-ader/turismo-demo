'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { habitaciones, getHabitacionBySlug, type Habitacion } from '@/data/habitaciones';
import { DateRangePicker } from '@/components/DateRangePicker';
import { GuestSelector } from '@/components/GuestSelector';

const STORAGE_KEY = 'refugio-nahuel-reserva';

export type MetodoPago = 'tarjeta' | 'hotel';

export interface ReservaData {
  habitacion: Habitacion;
  entrada: string;
  salida: string;
  huespedes: number;
  totalNoches: number;
  totalPesos: number;
  nombre: string;
  email: string;
  telefono: string;
  codigo: string;
  /** 'tarjeta' o 'hotel'; si no existe se asume 'tarjeta' */
  metodoPago?: MetodoPago;
}

function formatPesos(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n);
}

function generarCodigo() {
  return 'RN-' + Date.now().toString(36).toUpperCase().slice(-6);
}

function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

interface ReservaFormProps {
  /** Slug de habitación desde query ?habitacion=... (ej. desde /habitaciones) */
  habitacionInicial?: string;
  /** Fechas y huéspedes desde el widget de búsqueda del hero (?entrada= &salida= &huespedes=) */
  entradaInicial?: string;
  salidaInicial?: string;
  huespedesInicial?: number;
}

export function ReservaForm({
  habitacionInicial = '',
  entradaInicial = '',
  salidaInicial = '',
  huespedesInicial = 1,
}: ReservaFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [habitacionSlug, setHabitacionSlug] = useState(habitacionInicial);
  const [entrada, setEntrada] = useState(entradaInicial);
  const [salida, setSalida] = useState(salidaInicial);
  const [huespedes, setHuespedes] = useState(huespedesInicial > 0 ? huespedesInicial : 1);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [metodoPago, setMetodoPago] = useState<'tarjeta' | 'hotel'>('tarjeta');
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState(false);

  const habitacion = habitacionSlug ? getHabitacionBySlug(habitacionSlug) : null;
  const entradaDate = entrada ? new Date(entrada) : null;
  const salidaDate = salida ? new Date(salida) : null;
  const noches = entradaDate && salidaDate && salidaDate > entradaDate
    ? Math.ceil((salidaDate.getTime() - entradaDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPesos = habitacion && noches > 0 ? habitacion.precioPorNoche * noches : 0;

  function validarPaso1() {
    if (!habitacionSlug) {
      setError('Elegí un tipo de habitación.');
      return false;
    }
    if (!entrada || !salida) {
      setError('Completá fecha de entrada y salida.');
      return false;
    }
    if (noches <= 0) {
      setError('La fecha de salida debe ser posterior a la de entrada.');
      return false;
    }
    setError('');
    return true;
  }

  function validarPaso2() {
    if (!nombre.trim()) {
      setError('Completá tu nombre.');
      return false;
    }
    if (!email.trim()) {
      setError('Completá tu email.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email no válido.');
      return false;
    }
    setError('');
    return true;
  }

  function validarPaso3() {
    if (metodoPago === 'hotel') {
      setError('');
      return true;
    }
    const num = tarjeta.replace(/\s/g, '');
    if (num.length < 13 || num.length > 19) {
      setError('Número de tarjeta inválido (simulador: usá 13–19 dígitos).');
      return false;
    }
    if (!vencimiento.trim() || !/^\d{2}\/\d{2}$/.test(vencimiento)) {
      setError('Vencimiento en formato MM/AA.');
      return false;
    }
    if (cvv.length < 3) {
      setError('CVV de 3 o 4 dígitos.');
      return false;
    }
    if (!nombreTarjeta.trim()) {
      setError('Nombre como figura en la tarjeta.');
      return false;
    }
    setError('');
    return true;
  }

  function handleSiguiente() {
    if (step === 1 && validarPaso1()) setStep(2);
    if (step === 2 && validarPaso2()) setStep(3);
  }

  async function handleConfirmar() {
    if (step !== 3 || !validarPaso3() || !habitacion) return;
    const codigo = generarCodigo();
    const data: ReservaData = {
      habitacion,
      entrada,
      salida,
      huespedes,
      totalNoches: noches,
      totalPesos,
      nombre,
      email,
      telefono,
      codigo,
      metodoPago,
    };
    setError('');
    setConfirming(true);
    try {
      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          habitacion_slug: habitacion.slug,
          entrada,
          salida,
          huespedes,
          total_noches: noches,
          total_pesos: totalPesos,
          nombre_guest: nombre,
          email,
          telefono: telefono || null,
          codigo,
          metodo_pago: metodoPago,
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json?.error || 'No se pudo guardar la reserva. Intentá de nuevo.');
        setConfirming(false);
        return;
      }
    } catch {
      setError('Error de conexión. Intentá de nuevo.');
      setConfirming(false);
      return;
    } finally {
      setConfirming(false);
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
    router.push('/reservar/confirmacion');
  }

  const stepLabels = ['Habitación y fechas', 'Datos del huésped', 'Pago'];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Indicador de pasos */}
      <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm sm:px-4 sm:py-3">
        <div className="flex justify-between gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-center transition ${
                step === s
                  ? 'bg-primary text-white'
                  : step > s
                    ? 'bg-primary/10 text-primary'
                    : 'bg-slate-100 text-slate-500'
              }`}
            >
              <span className="text-sm font-semibold">{s}</span>
              <span className="hidden text-xs font-medium sm:inline">{stepLabels[s - 1]}</span>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}

      {/* Paso 1 */}
      {step === 1 && (
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Habitación y fechas
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Confirmá tu opción de alojamiento y el rango de fechas de estadía.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr,320px] lg:items-start">
            {/* Bloque: Tu selección */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Tu selección
              </h3>
              <div className="mt-5 space-y-5">
                <div>
                  <label htmlFor="habitacion" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Tipo de habitación
                  </label>
                  <select
                    id="habitacion"
                    value={habitacionSlug}
                    onChange={(e) => setHabitacionSlug(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3 py-2.5 text-slate-900 transition focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Elegir habitación...</option>
                    {habitaciones.map((h) => (
                      <option key={h.id} value={h.slug}>
                        {h.nombre} — {formatPesos(h.precioPorNoche)}/noche
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label id="reserva-huespedes-label" className="block text-sm font-medium text-slate-700 mb-1.5">
                    Huéspedes
                  </label>
                  <GuestSelector
                    id="reserva-huespedes"
                    value={huespedes}
                    onChange={setHuespedes}
                    className="w-full max-w-[12rem]"
                  />
                </div>
                {totalPesos > 0 && habitacion && (
                  <div className="rounded-xl border border-primary/15 bg-primary/[0.06] px-4 py-3.5">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Total estadía
                    </p>
                    <p className="mt-1.5 text-lg font-semibold text-primary">
                      {noches} {noches === 1 ? 'noche' : 'noches'} × {formatPesos(habitacion.precioPorNoche)} = {formatPesos(totalPesos)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bloque: Fechas */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Fechas de estadía
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Elegí entrada y salida
              </p>
              <div className="mt-5 flex justify-center lg:justify-start">
                <DateRangePicker
                  entrada={entrada}
                  salida={salida}
                  onChange={(e, s) => {
                    setEntrada(e);
                    setSalida(s);
                  }}
                  minNoches={1}
                  className="rdp-compact"
                  nested
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Paso 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Datos del huésped</h2>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-slate-700">
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Ej. Juan Pérez"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-slate-700">
              Teléfono (opcional)
            </label>
            <input
              id="telefono"
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="+54 9 294 4..."
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
            Resumen: {habitacion?.nombre} · {entrada} a {salida} · {formatPesos(totalPesos)}
          </div>
        </div>
      )}

      {/* Paso 3 — Pago (simulado) o Pagar en el hotel */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Pago</h2>
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700">Forma de pago</p>
            <div className="flex flex-wrap gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="metodoPago"
                  checked={metodoPago === 'tarjeta'}
                  onChange={() => setMetodoPago('tarjeta')}
                  className="h-4 w-4 border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-slate-800">Tarjeta (simulado)</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="metodoPago"
                  checked={metodoPago === 'hotel'}
                  onChange={() => setMetodoPago('hotel')}
                  className="h-4 w-4 border-slate-300 text-primary focus:ring-primary"
                />
                <span className="text-slate-800">Pagar en el hotel</span>
              </label>
            </div>
          </div>
          {metodoPago === 'hotel' ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Abonás el total en recepción al llegar. No se realiza ningún cobro ahora.
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-600">
                No se realiza ningún cobro real. Usá datos de prueba (ej. 4111 1111 1111 1111, vencimiento 12/28, CVV 123).
              </p>
              <div>
                <label htmlFor="tarjeta" className="block text-sm font-medium text-slate-700">
                  Número de tarjeta
                </label>
                <input
                  id="tarjeta"
                  type="text"
                  inputMode="numeric"
                  value={tarjeta}
                  onChange={(e) => setTarjeta(e.target.value.replace(/\D/g, '').slice(0, 19))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="4111 1111 1111 1111"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="vencimiento" className="block text-sm font-medium text-slate-700">
                    Vencimiento (MM/AA)
                  </label>
                  <input
                    id="vencimiento"
                    type="text"
                    value={vencimiento}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                      if (v.length >= 2) setVencimiento(v.slice(0, 2) + '/' + v.slice(2));
                      else setVencimiento(v);
                    }}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="12/28"
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-slate-700">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    inputMode="numeric"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="123"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="nombreTarjeta" className="block text-sm font-medium text-slate-700">
                  Nombre en la tarjeta
                </label>
                <input
                  id="nombreTarjeta"
                  type="text"
                  value={nombreTarjeta}
                  onChange={(e) => setNombreTarjeta(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="JUAN PEREZ"
                />
              </div>
            </>
          )}
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            Total: <strong>{formatPesos(totalPesos)}</strong>
            {metodoPago === 'hotel' && ' — a abonar en el hotel'}
          </div>
        </div>
      )}

      {/* Botones */}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-between sm:items-center">
        {step < 3 ? (
          <button
            type="button"
            onClick={handleSiguiente}
            className="btn-primary w-full sm:w-auto"
          >
            Siguiente
          </button>
        ) : (
          <button
            type="button"
            onClick={handleConfirmar}
            disabled={confirming}
            className="btn-primary w-full sm:w-auto disabled:opacity-50"
          >
            {confirming ? 'Guardando…' : 'Confirmar reserva (simulado)'}
          </button>
        )}
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="order-first text-sm font-medium text-slate-600 hover:text-slate-900 sm:order-none"
          >
            ← Atrás
          </button>
        ) : entrada && salida ? (
          <Link
            href={`/disponibilidad?entrada=${entrada}&salida=${salida}${huespedes > 1 ? `&huespedes=${huespedes}` : ''}`}
            className="text-sm font-medium text-slate-600 hover:text-primary"
          >
            Cambiar habitación
          </Link>
        ) : (
          <Link
            href="/habitaciones"
            className="text-sm font-medium text-slate-600 hover:text-primary"
          >
            Ver habitaciones
          </Link>
        )}
      </div>
    </div>
  );
}

export { STORAGE_KEY };
