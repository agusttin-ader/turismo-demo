export const metadata = {
  title: 'Políticas de reserva y estadía | Refugio Nahuel',
  description: 'Política de cancelación, horarios de check-in y check-out, reglas de la casa.',
};

export default function PoliticasPage() {
  return (
    <div className="w-full">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <h1 className="section-title">
            Políticas de reserva y estadía
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Información importante para tu reserva y tu estadía en Refugio Nahuel.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-lg font-semibold text-slate-900 mt-8 first:mt-0">
            Check-in y check-out
          </h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600 space-y-1">
            <li>Check-in: a partir de las 14:00.</li>
            <li>Check-out: hasta las 10:00.</li>
            <li>Equipaje: podés dejar o retirar equipaje fuera de horario en recepción, sin cargo. Consultar por check-in tardío (después de las 22:00).</li>
          </ul>

          <h2 className="text-lg font-semibold text-slate-900 mt-8">
            Política de cancelación
          </h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600 space-y-1">
            <li>Cancelación gratuita hasta 48 horas antes del check-in.</li>
            <li>Cancelación con menos de 48 horas: se cobra la primera noche.</li>
            <li>No presentarse (no-show): se cobra la primera noche.</li>
            <li>En temporada alta (julio, enero y fines de semana largos) puede aplicarse política extendida; se informa al confirmar la reserva.</li>
          </ul>

          <h2 className="text-lg font-semibold text-slate-900 mt-8">
            Reglas de la casa
          </h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600 space-y-1">
            <li>No fumar en el interior. Hay espacio en el exterior.</li>
            <li>Respetar el silencio entre las 23:00 y las 8:00 en zonas de dormitorios.</li>
            <li>Cocina compartida: dejar limpio después de usar. Etiquetar tus alimentos en la heladera.</li>
            <li>No se permiten mascotas.</li>
            <li>El hostel no se hace responsable por objetos de valor; usá los lockers.</li>
          </ul>

          <h2 className="text-lg font-semibold text-slate-900 mt-8">
            Qué incluye tu reserva
          </h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600 space-y-1">
            <li>Desayuno continental (café, té, panificados, mermeladas, fruta).</li>
            <li>Wi-Fi en todo el establecimiento.</li>
            <li>Uso de cocina compartida y espacios comunes.</li>
            <li>Lockers en dormitorios (traé candado o comprá en recepción).</li>
            <li>Mapas e información turística. Recepción para consultas y reserva de excursiones.</li>
            <li>En habitaciones privadas con baño: toallas incluidas. En dormitorios: toallas por alquiler o traer propias.</li>
          </ul>

          <h2 className="text-lg font-semibold text-slate-900 mt-8">
            Formas de pago
          </h2>
          <p className="mt-2 text-slate-600">
            Aceptamos tarjetas de crédito y débito (Visa, Mastercard), transferencia bancaria y efectivo en pesos argentinos. Para reservas online podés abonar con tarjeta de forma segura. Consultá en recepción por promociones por estadía prolongada.
          </p>
        </div>
      </section>
    </div>
  );
}
