import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { UnsplashImage } from '@/components/UnsplashImage';

const servicios = [
  {
    titulo: 'Desayuno incluido',
    texto: 'Desayuno continental con café, té, panificados, mermeladas y fruta. Incluido en todas las tarifas.',
  },
  {
    titulo: 'Cocina compartida',
    texto: 'Cocina totalmente equipada para que prepares tus comidas. Heladera y espacio para guardar tus compras.',
  },
  {
    titulo: 'Wi-Fi en todo el hostel',
    texto: 'Conexión gratuita en habitaciones y áreas comunes. Ideal para nómades digitales.',
  },
  {
    titulo: 'Lockers y seguridad',
    texto: 'Lockers bajo llave en dormitorios. Traé tu candado o comprá uno en recepción.',
  },
  {
    titulo: 'Recepción e información',
    texto: 'Te ayudamos a reservar excursiones, ski, navegación y traslados. Mapas y recomendaciones locales.',
  },
  {
    titulo: 'Lavandería',
    texto: 'Servicio de lavandería por kg (consultar precio en recepción). Secado disponible.',
  },
];

export const metadata = {
  title: 'Servicios | Refugio Nahuel',
  description: 'Servicios e instalaciones del hostel: desayuno, cocina, Wi-Fi, lockers y más.',
};

export default function ServiciosPage() {
  return (
    <div className="w-full">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <h1 className="section-title">
            Servicios e instalaciones
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Todo lo que necesitás para sentirte como en casa durante tu estadía en Bariloche.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s, i) => (
            <article key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="aspect-video w-full overflow-hidden rounded-lg relative">
                {s.titulo === 'Desayuno incluido' ? (
                  <UnsplashImage
                    imageId="desayuno"
                    aspectRatio="16/9"
                    fill
                    className="h-full w-full"
                    showCredit
                    creditPosition="overlay"
                  />
                ) : s.titulo === 'Cocina compartida' ? (
                  <UnsplashImage
                    imageId="cocina"
                    aspectRatio="16/9"
                    fill
                    className="h-full w-full"
                    showCredit
                    creditPosition="overlay"
                  />
                ) : s.titulo === 'Wi-Fi en todo el hostel' ? (
                  <UnsplashImage
                    imageId="wifi"
                    aspectRatio="16/9"
                    fill
                    className="h-full w-full"
                    showCredit
                    creditPosition="overlay"
                  />
                ) : s.titulo === 'Lockers y seguridad' ? (
                  <UnsplashImage
                    imageId="locker"
                    aspectRatio="16/9"
                    fill
                    className="h-full w-full"
                    showCredit
                    creditPosition="overlay"
                  />
                ) : s.titulo === 'Recepción e información' ? (
                  <UnsplashImage
                    imageId="recepcion"
                    aspectRatio="16/9"
                    fill
                    className="h-full w-full"
                    showCredit
                    creditPosition="overlay"
                  />
                ) : s.titulo === 'Lavandería' ? (
                  <UnsplashImage
                    imageId="lavanderia"
                    aspectRatio="16/9"
                    fill
                    className="h-full w-full"
                    showCredit
                    creditPosition="overlay"
                  />
                ) : (
                  <ImagePlaceholder
                    alt={s.titulo}
                    aspectRatio="16/9"
                    className="h-full w-full"
                  />
                )}
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{s.titulo}</h2>
              <p className="mt-2 text-sm text-slate-600">{s.texto}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
