import { ContactoForm, WhatsAppLink } from '@/components/ContactoForm';

export const metadata = {
  title: 'Contacto | Refugio Nahuel',
  description: 'Contactá con Refugio Nahuel en Bariloche. WhatsApp y formulario de contacto.',
};

export default function ContactoPage() {
  return (
    <div className="w-full">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <h1 className="section-title">
            Contacto
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Escribinos por WhatsApp o completá el formulario. Los datos son de ejemplo; el envío del formulario es simulado.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          {/* Columna izquierda: datos + WhatsApp */}
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Datos de contacto</h2>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li><strong className="text-slate-700">Teléfono:</strong> +54 294 4 XXX XXXX</li>
                <li><strong className="text-slate-700">Email:</strong> hola@refugionahuel.com</li>
                <li><strong className="text-slate-700">Dirección:</strong> Calle Ejemplo 123, Bariloche</li>
              </ul>
              <p className="mt-4 text-sm text-slate-500">
                Horario de recepción: 8:00 a 22:00
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5">
              <p className="text-sm font-medium text-slate-700">¿Preferís escribir por WhatsApp?</p>
              <p className="mt-1 text-sm text-slate-500">Respuesta rápida para consultas y reservas.</p>
              <div className="mt-4 w-fit">
                <WhatsAppLink />
              </div>
            </div>
          </div>

          {/* Columna derecha: formulario */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <h2 className="text-lg font-semibold text-slate-900">Formulario de contacto</h2>
            <p className="mt-1 text-sm text-slate-500">Completá y te respondemos por email.</p>
            <div className="mt-6">
              <ContactoForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
