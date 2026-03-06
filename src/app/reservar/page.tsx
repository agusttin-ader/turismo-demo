import { ReservaForm } from '@/components/ReservaForm';

export const metadata = {
  title: 'Reservar | Refugio Nahuel',
  description: 'Reservá tu estadía en Refugio Nahuel, Bariloche. Elegí habitación, fechas y completá el pago.',
};

export default function ReservarPage({
  searchParams,
}: {
  searchParams: { habitacion?: string; entrada?: string; salida?: string; huespedes?: string };
}) {
  const habitacionSlug = searchParams.habitacion ?? '';
  const entrada = searchParams.entrada ?? '';
  const salida = searchParams.salida ?? '';
  const huespedes = searchParams.huespedes ? Math.min(6, Math.max(1, parseInt(searchParams.huespedes, 10) || 1)) : 1;

  return (
    <div className="w-full">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <h1 className="section-title">
            Reservar
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Elegí habitación y fechas, completá tus datos y el pago simulado. No se realiza ningún cobro real.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <ReservaForm
          habitacionInicial={habitacionSlug}
          entradaInicial={entrada}
          salidaInicial={salida}
          huespedesInicial={huespedes}
        />
      </section>
    </div>
  );
}
