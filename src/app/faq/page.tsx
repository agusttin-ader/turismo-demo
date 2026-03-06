import { FAQ } from '@/components/FAQ';
import { faqItems } from '@/data/faq';

export const metadata = {
  title: 'Preguntas frecuentes | Refugio Nahuel',
  description: 'Horarios, cancelación, mascotas, pago y más. Resolvé tus dudas antes de reservar.',
};

export default function FAQPage() {
  return (
    <div className="w-full">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <h1 className="section-title">
            Preguntas frecuentes
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Encontrá respuestas a las dudas más comunes: horarios, reservas, mascotas, pago y políticas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <FAQ items={faqItems} />
      </section>
    </div>
  );
}
