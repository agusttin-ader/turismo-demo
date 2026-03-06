import Link from 'next/link';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { UnsplashImage } from '@/components/UnsplashImage';
import { habitaciones } from '@/data/habitaciones';

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

export const metadata = {
  title: 'Habitaciones | Refugio Nahuel',
  description: 'Opciones de alojamiento: dormitorios compartidos y habitaciones privadas en Bariloche.',
};

export default function HabitacionesPage() {
  return (
    <div className="w-full">
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="section-title">
            Habitaciones
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Desde dormitorios compartidos hasta habitación privada con baño. Textos de ejemplo; reemplazar por los definitivos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <ul className="flex flex-col gap-8">
          {habitaciones.map((hab) => (
            <li key={hab.id} className="card overflow-hidden p-0 transition hover:shadow-soft">
              <div className="grid sm:grid-cols-2">
                <div className="aspect-[4/3] sm:aspect-auto sm:min-h-[240px] relative overflow-hidden">
                  {hab.slug === 'dormitorio-compartido-6' ? (
                    <UnsplashImage
                      imageId="dormitorio-6"
                      aspectRatio="4/3"
                      fill
                      className="h-full w-full"
                      showCredit
                      creditPosition="overlay"
                    />
                  ) : hab.slug === 'dormitorio-compartido-4' ? (
                    <UnsplashImage
                      imageId="dormitorio-4"
                      aspectRatio="4/3"
                      fill
                      className="h-full w-full"
                      showCredit
                      creditPosition="overlay"
                    />
                  ) : hab.slug === 'habitacion-privada-bano' ? (
                    <UnsplashImage
                      imageId="habitacion-suite"
                      aspectRatio="4/3"
                      fill
                      className="h-full w-full"
                      showCredit
                      creditPosition="overlay"
                    />
                  ) : hab.slug === 'habitacion-privada-doble' ? (
                    <UnsplashImage
                      imageId="habitacion-doble"
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
                    <p className="mt-3 text-sm font-semibold text-primary">
                      {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(hab.precioPorNoche)}/noche
                    </p>
                  </div>
                  <Link
                    href={`/reservar?habitacion=${hab.slug}`}
                    className="btn-primary mt-5"
                  >
                    Reservar esta opción
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
