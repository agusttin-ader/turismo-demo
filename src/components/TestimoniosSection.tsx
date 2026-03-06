import Link from 'next/link';
import { testimonios } from '@/data/testimonios';

function Estrellas({ n }: { n: number }) {
  return (
    <span className="flex text-amber-500" aria-label={`${n} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-4 w-4 sm:h-5 sm:w-5 ${i <= n ? 'text-accent' : 'text-slate-200'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
        </svg>
      ))}
    </span>
  );
}

export function TestimoniosSection() {
  const destacados = testimonios.slice(0, 3);

  return (
    <section className="border-t border-slate-200/80 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="section-title">
              Lo que dicen los huéspedes
            </h2>
            <p className="mt-2 text-slate-600">
              Experiencias reales de viajeros que se alojaron en Refugio Nahuel.
            </p>
          </div>
          <Link
            href="/faq"
            className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            Ver preguntas frecuentes →
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {destacados.map((t) => (
            <li
              key={t.id}
              className="card p-4 transition hover:shadow-soft sm:p-5"
            >
              <div className="flex items-center gap-2">
                <Estrellas n={t.puntaje} />
                <span className="text-xs text-slate-500">{t.fecha}</span>
              </div>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                &ldquo;{t.texto}&rdquo;
              </p>
              <p className="mt-3 text-sm font-medium text-slate-900">
                {t.nombre}
              </p>
              <p className="text-xs text-slate-500">{t.origen}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link href="/contacto" className="btn-primary">
            Escribinos tu consulta
          </Link>
        </div>
      </div>
    </section>
  );
}
