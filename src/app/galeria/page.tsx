import { ImagePlaceholder } from '@/components/ImagePlaceholder';
import { UnsplashImage } from '@/components/UnsplashImage';
import { galeriaItems } from '@/data/galeria';

export const metadata = {
  title: 'Galería | Refugio Nahuel',
  description: 'Fotos del hostel, habitaciones, espacios comunes y Bariloche.',
};

const categorias: Record<string, string> = {
  habitaciones: 'Habitaciones',
  comunes: 'Espacios comunes',
  exteriores: 'Exteriores',
  bariloche: 'Bariloche',
};

export default function GaleriaPage() {
  return (
    <div className="w-full">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <h1 className="section-title">
            Galería
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Conocé el hostel, las habitaciones y los alrededores. Las imágenes son placeholders; podés reemplazarlas por fotos desde Unsplash o tu propio contenido.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galeriaItems.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="aspect-[4/3] relative overflow-hidden">
                {item.imageId ? (
                  <UnsplashImage
                    imageId={item.imageId}
                    aspectRatio="4/3"
                    fill
                    className="h-full w-full"
                    showCredit
                    creditPosition="below"
                    objectPosition={item.objectPosition}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                  />
                ) : (
                  <ImagePlaceholder
                    alt={item.alt}
                    aspectRatio="4/3"
                    className="h-full w-full"
                  />
                )}
              </div>
              <p className="px-3 py-2 text-sm text-slate-600">
                <span className="font-medium text-slate-900">{item.alt}</span>
                <span className="ml-2 text-slate-400">— {categorias[item.categoria]}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
