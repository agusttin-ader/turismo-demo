/**
 * Ubicación con mapa embebido. Bariloche centro.
 * Para usar tu propia dirección: en Google Maps buscá el lugar → Compartir → Insertar un mapa → copiá el iframe src.
 */
export const metadata = {
  title: 'Ubicación | Refugio Nahuel',
  description: 'Dónde estamos en Bariloche, Río Negro. Cómo llegar y qué hay cerca.',
};

// Centro de San Carlos de Bariloche (coordenadas aproximadas). Reemplazar por la URL de embed de tu dirección.
const MAPA_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23870!2d-71.310278!3d-41.133472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961a7b152e1a88a5%3A0x5f2a648b2a2a2a2a!2sSan%20Carlos%20de%20Bariloche%2C%20R%C3%ADo%20Negro!5e0!3m2!1ses!2sar!4v1234567890';

export default function UbicacionPage() {
  return (
    <div className="w-full">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <h1 className="section-title">
            Ubicación
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Refugio Nahuel está en el centro de Bariloche, a pocas cuadras del lago y de la avenida principal.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200">
          <iframe
            src={MAPA_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Refugio Nahuel en Bariloche"
            className="min-h-[280px] sm:min-h-[360px]"
          />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Dirección (ejemplo)</h2>
            <p className="mt-2 text-slate-600">
              Calle Ejemplo 123, Bariloche<br />
              Río Negro, Argentina
            </p>
            <a
              href="https://www.google.com/maps/search/San+Carlos+de+Bariloche"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-semibold text-primary hover:text-primary-dark"
            >
              Ver en Google Maps →
            </a>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Cómo llegar</h2>
            <p className="mt-2 text-slate-600">
              Desde la terminal de ómnibus: líneas 2 y 10, bajar en Ejemplo y Mitre. Desde el aeropuerto: transfer o remis; consultar en recepción.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
