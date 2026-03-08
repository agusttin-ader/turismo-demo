import Link from 'next/link';
import { NewsletterForm } from '@/components/NewsletterForm';

const links = [
  { href: '/habitaciones', label: 'Habitaciones' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/galeria', label: 'Galería' },
  { href: '/ubicacion', label: 'Ubicación' },
  { href: '/faq', label: 'Preguntas frecuentes' },
  { href: '/politicas', label: 'Políticas' },
  { href: '/reservar', label: 'Reservar' },
  { href: '/contacto', label: 'Contacto' },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <p className="text-lg font-bold tracking-tight text-white">Refugio Nahuel</p>
            <p className="mt-2 text-sm text-slate-400">Hostel en Bariloche, Río Negro, Argentina</p>
          </div>
          <nav aria-label="Pie de página">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-medium text-slate-400 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="lg:col-span-1">
            <p className="text-sm font-medium text-white">Newsletter</p>
            <p className="mt-1 text-xs text-slate-400">Ofertas y novedades en tu email.</p>
            <div className="mt-3">
              <NewsletterForm />
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-slate-700 pt-6 text-center text-xs text-slate-500">
          Sitio ficticio. Refugio Nahuel — Hostel en Bariloche. Imágenes: contenedores listos para Unsplash.
        </p>
      </div>
    </footer>
  );
}
