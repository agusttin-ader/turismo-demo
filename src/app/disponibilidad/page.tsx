import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { habitaciones } from '@/data/habitaciones';
import { UnsplashImage } from '@/components/UnsplashImage';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { DisponibilidadStep1Form } from './DisponibilidadStep1Form';

const incluyePorSlug: Record<string, string[]> = {
  'dormitorio-compartido-6': ['Wi-Fi', 'Desayuno', 'Lockers', 'Luz y enchufe por cama'],
  'dormitorio-compartido-4': ['Wi-Fi', 'Desayuno', 'Lockers', 'Calefacción'],
  'habitacion-privada-doble': ['Wi-Fi', 'Desayuno', 'Habitación privada', 'Calefacción'],
  'habitacion-privada-bano': ['Wi-Fi', 'Desayuno', 'Baño privado', 'Toallas', 'Calefacción'],
};

function IncluyeList({ slug }: { slug: string }) {
  const items = incluyePorSlug[slug] ?? ['Wi-Fi', 'Desayuno'];
  return (
    <ul className="mt-2 flex flex-wrap gap-2" aria-label="Incluye">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

const imageIdPorSlug: Record<string, string> = {
  'dormitorio-compartido-6': 'dormitorio-6',
  'dormitorio-compartido-4': 'dormitorio-4',
  'habitacion-privada-doble': 'habitacion-doble',
  'habitacion-privada-bano': 'habitacion-suite',
};

function formatPesos(n: number) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(n);
}

export const metadata = {
  title: 'Disponibilidad | Refugio Nahuel',
  description: 'Elegí tu habitación según fechas y huéspedes. Refugio Nahuel, Bariloche.',
};

interface PageProps {
  searchParams: { entrada?: string; salida?: string; huespedes?: string };
}

export default function DisponibilidadPage({ searchParams }: PageProps) {
  const entrada = searchParams.entrada ?? '';
  const salida = searchParams.salida ?? '';
  const huespedes = searchParams.huespedes ? Math.min(6, Math.max(1, parseInt(searchParams.huespedes, 10) || 1)) : 1;

  const entradaDate = entrada ? new Date(entrada) : null;
  const salidaDate = salida ? new Date(salida) : null;
  const noches =
    entradaDate && salidaDate && salidaDate > entradaDate
      ? Math.ceil((salidaDate.getTime() - entradaDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const sinFechas = !entrada || !salida || noches <= 0;

  return (
    <div className="w-full">
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <h1 className="section-title">
            Habitaciones disponibles
          </h1>
          {sinFechas ? (
            <div className="mt-6">
              <DisponibilidadStep1Form />
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <span>
                <strong>Entrada:</strong>{' '}
                {format(entradaDate!, 'EEEE d MMM yyyy', { locale: es })}
              </span>
              <span>
                <strong>Salida:</strong>{' '}
                {format(salidaDate!, 'EEEE d MMM yyyy', { locale: es })}
              </span>
              <span>
                <strong>{noches}</strong> {noches === 1 ? 'noche' : 'noches'}
              </span>
              <span>
                <strong>{huespedes}</strong> {huespedes === 1 ? 'huésped' : 'huéspedes'}
              </span>
            </div>
          )}
        </div>
      </section>

      {!sinFechas && (
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <p className="mb-6 text-slate-600">
            Elegí una habitación para continuar al checkout. Mismo estilo que la página Habitaciones.
          </p>
          <ul className="flex flex-col gap-8">
            {habitaciones.map((hab) => {
              const totalPesos = hab.precioPorNoche * noches;
              const imageId = imageIdPorSlug[hab.slug];
              const reservarUrl = `/reservar?habitacion=${hab.slug}&entrada=${entrada}&salida=${salida}${huespedes > 1 ? `&huespedes=${huespedes}` : ''}`;

              return (
                <li key={hab.id} className="card overflow-hidden p-0 transition hover:shadow-soft">
                  <div className="grid sm:grid-cols-2">
                    <div className="aspect-[4/3] sm:aspect-auto sm:min-h-[240px] relative overflow-hidden">
                      {imageId ? (
                        <UnsplashImage
                          imageId={imageId}
                          aspectRatio="4/3"
                          fill
                          className="h-full w-full"
                          showCredit
                          creditPosition="overlay"
                        />
                      ) : (
                        <ImagePlaceholder
                          alt={hab.nombre}
                          aspectRatio="4/3"
                          className="h-full w-full"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-between p-4 sm:p-6">
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                          {hab.nombre}
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">{hab.capacidad}</p>
                        <IncluyeList slug={hab.slug} />
                        <p className="mt-3 text-slate-700">{hab.descripcion}</p>
                        <p className="mt-3 text-sm text-slate-500">
                          {formatPesos(hab.precioPorNoche)}/noche
                        </p>
                        <p className="text-base font-semibold text-primary">
                          Total estadía: {formatPesos(totalPesos)}
                        </p>
                      </div>
                      <Link
                        href={reservarUrl}
                        className="btn-primary mt-5"
                      >
                        Elegir y reservar
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
