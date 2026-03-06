import Link from 'next/link';
import { UnsplashImage } from '@/components/UnsplashImage';
import { HeroSearch } from '@/components/HeroSearch';
import { TestimoniosSection } from '@/components/TestimoniosSection';
import { FAQ } from '@/components/FAQ';
import { NewsletterForm } from '@/components/NewsletterForm';
import { AnimateOnScroll } from '@/components/AnimateOnScroll';
import { faqItems } from '@/data/faq';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero con overlay y widget de búsqueda */}
      <section className="relative w-full min-h-[70vh] flex flex-col justify-end p-4 pb-10 sm:p-6 sm:pb-14 md:min-h-[80vh] md:justify-center md:items-center">
        <div className="absolute inset-0 z-0">
          <UnsplashImage imageId="hero" fill showCredit creditPosition="overlay" className="h-full w-full" priority />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-900/50 via-slate-900/60 to-slate-900/75" aria-hidden />
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-3xl font-bold text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-tight animate-fade-in-up anim-delay-0 opacity-0">
            Refugio Nahuel
          </h1>
          <p className="mt-3 text-lg text-white/95 drop-shadow sm:text-xl md:text-2xl text-center max-w-xl animate-fade-in-up anim-delay-150 opacity-0">
            Tu base en Bariloche. Montaña, lago y buena onda.
          </p>
          <div className="mt-8 w-full max-w-3xl animate-fade-in-up anim-delay-300 opacity-0">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Intro */}
      <AnimateOnScroll>
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="section-title">
            Bienvenidos al refugio
          </h2>
          <p className="mt-5 max-w-2xl text-slate-600 leading-relaxed text-base sm:text-lg">
            Refugio Nahuel es un hostel de montaña en el corazón de Bariloche. Pensado para
            viajeros que quieren estar cerca del lago Nahuel Huapi, del cerro Catedral y de
            la vida nocturna, sin renunciar a un ambiente tranquilo y acogedor. Desayuno
            incluido, cocina compartida y actividades para conectar con otros viajeros.
          </p>
        </section>
      </AnimateOnScroll>

      {/* Destacados — 3 bloques */}
      <AnimateOnScroll>
        <section className="border-t border-slate-200/80 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <h2 className="section-title">
              Por qué elegirnos
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-3">
              <li className="card overflow-hidden p-0 transition hover:shadow-soft hover:scale-[1.02] duration-300">
                <div className="h-36 w-full overflow-hidden rounded-t-2xl sm:h-40 relative">
                  <UnsplashImage imageId="ubicacion" aspectRatio="4/3" fill className="h-full w-full" showCredit creditPosition="overlay" />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold text-slate-900">Ubicación</h3>
                  <p className="mt-1.5 text-sm text-slate-600">
                    A minutos del centro y de la terminal. Fácil acceso al transporte público.
                  </p>
                </div>
              </li>
              <li className="card overflow-hidden p-0 transition hover:shadow-soft hover:scale-[1.02] duration-300">
                <div className="h-36 w-full overflow-hidden rounded-t-2xl sm:h-40 relative">
                  <UnsplashImage imageId="ambiente" aspectRatio="4/3" fill className="h-full w-full" showCredit creditPosition="overlay" />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold text-slate-900">Ambiente</h3>
                  <p className="mt-1.5 text-sm text-slate-600">
                    Espacios comunes para trabajar, cocinar y conocer a otros viajeros.
                  </p>
                </div>
              </li>
              <li className="card overflow-hidden p-0 transition hover:shadow-soft hover:scale-[1.02] duration-300">
                <div className="h-36 w-full overflow-hidden rounded-t-2xl sm:h-40 relative">
                  <UnsplashImage imageId="experiencias" aspectRatio="4/3" fill className="h-full w-full" showCredit creditPosition="overlay" objectPosition="center 45%" />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-semibold text-slate-900">Experiencias</h3>
                  <p className="mt-1.5 text-sm text-slate-600">
                    Te ayudamos a organizar salidas al cerro, navegación y trekking.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Testimonios */}
      <AnimateOnScroll>
        <TestimoniosSection />
      </AnimateOnScroll>

      {/* FAQ preview — primeras 3 */}
      <AnimateOnScroll>
        <section className="border-t border-slate-200/80 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="section-title">
                  Preguntas frecuentes
                </h2>
                <p className="mt-2 text-slate-600">
                  Resolvé dudas sobre horarios, cancelación y servicios.
                </p>
              </div>
              <Link
                href="/faq"
                className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors shrink-0"
              >
                Ver todas →
              </Link>
            </div>
            <div className="mt-8 max-w-2xl">
              <FAQ items={faqItems} limit={3} />
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* CTA + Newsletter */}
      <AnimateOnScroll>
        <section className="border-t border-slate-200/80 bg-primary text-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Reservá tu lugar
                </h2>
                <p className="mt-4 text-white/90 text-base sm:text-lg">
                  Consultá disponibilidad y precios. Estamos para ayudarte a armar tu viaje.
                </p>
                <Link href="/reservar" className="btn-accent mt-6">
                  Ir a reservar
                </Link>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Recibí ofertas y novedades</h3>
                <p className="mt-2 text-sm text-white/80">
                  Suscribite con tu email. Sin spam, solo info útil.
                </p>
                <div className="mt-5 rounded-2xl bg-white/10 p-5 backdrop-blur">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
}
