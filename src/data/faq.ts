/**
 * Preguntas frecuentes. Se muestran en acordeón en /faq y opcionalmente en home.
 */
export interface FaqItem {
  id: string;
  pregunta: string;
  respuesta: string;
}

export const faqItems: FaqItem[] = [
  {
    id: '1',
    pregunta: '¿Cuáles son los horarios de check-in y check-out?',
    respuesta:
      'Check-in a partir de las 14:00 y check-out hasta las 10:00. Si necesitás dejar equipaje antes o después, podés guardarlo en recepción sin cargo.',
  },
  {
    id: '2',
    pregunta: '¿Qué incluye el precio?',
    respuesta:
      'Incluye desayuno continental (café, té, panificados, mermeladas, fruta), Wi-Fi en todo el hostel, uso de cocina compartida, lockers en dormitorios y mapas e información turística. No incluye toallas en dormitorios compartidos (se alquilan o traer propias); en habitaciones privadas con baño sí están incluidas.',
  },
  {
    id: '3',
    pregunta: '¿Cuál es la política de cancelación?',
    respuesta:
      'Cancelación gratuita hasta 48 horas antes del check-in. Si cancelás con menos de 48 horas, se cobra la primera noche. En fechas de temporada alta (julio, enero) puede aplicarse política extendida; se informa al reservar.',
  },
  {
    id: '4',
    pregunta: '¿Aceptan mascotas?',
    respuesta:
      'No aceptamos mascotas en el hostel por políticas del establecimiento. Podemos recomendarte opciones de guardería en Bariloche si viajás con tu mascota.',
  },
  {
    id: '5',
    pregunta: '¿Hay estacionamiento?',
    respuesta:
      'No tenemos estacionamiento propio. En la zona hay estacionamiento público y en la calle (consultar restricciones). La terminal y el centro están a pocas cuadras, por lo que muchos huéspedes llegan en ómnibus y no necesitan auto.',
  },
  {
    id: '6',
    pregunta: '¿Cómo puedo pagar?',
    respuesta:
      'Aceptamos tarjetas de crédito y débito (Visa, Mastercard), transferencia bancaria y efectivo en pesos argentinos al hacer check-in. Para reservas online se puede abonar con tarjeta de forma segura.',
  },
  {
    id: '7',
    pregunta: '¿Hay habitaciones solo para mujeres o solo para hombres?',
    respuesta:
      'Los dormitorios compartidos son mixtos. Si preferís un ambiente solo para mujeres o solo para hombres, consultanos por disponibilidad; a veces podemos asignar según el grupo.',
  },
  {
    id: '8',
    pregunta: '¿Puedo llegar a cualquier hora?',
    respuesta:
      'La recepción está abierta de 8:00 a 22:00. Si tu llegada es fuera de ese horario, avisanos con anticipación para coordinar la entrega de llaves (puede haber un cargo adicional por check-in tardío).',
  },
];
