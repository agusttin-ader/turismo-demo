# Refugio Nahuel — Hostel ficticio en Bariloche

Sitio web de un hostel ficticio en Bariloche, Río Negro, Argentina. Desarrollo por etapas.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 18**

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Estructura del sitio

| Ruta | Contenido |
|------|-----------|
| `/` | Inicio: hero con **widget de búsqueda** (fechas + huéspedes → reservar), intro, por qué elegirnos, **testimonios**, **FAQ** (primeras 3), CTA + **newsletter** |
| `/habitaciones` | Tipos de habitación con “qué incluye”, precios y enlace a reservar |
| `/servicios` | Servicios e instalaciones (desayuno, cocina, Wi-Fi, etc.) |
| `/galeria` | Galería de fotos (placeholders por categoría: habitaciones, comunes, exteriores, Bariloche) |
| `/ubicacion` | Mapa Google Maps (Bariloche) + dirección y cómo llegar |
| `/faq` | Preguntas frecuentes en acordeón (horarios, cancelación, mascotas, pago, etc.) |
| `/politicas` | Políticas de reserva y estadía (check-in/out, cancelación, reglas de la casa, qué incluye) |
| `/reservar` | Flujo de reserva en 3 pasos; acepta `?entrada=&salida=&huespedes=` desde el hero |
| `/reservar/confirmacion` | Resumen y código de reserva tras confirmar |
| `/contacto` | Formulario de contacto (simulado) + botón WhatsApp |

## Imágenes

Los bloques de imagen usan el componente `ImagePlaceholder`. Cuando tengas las fotos (por ejemplo desde Unsplash):

1. Guardar en `public/` o usar URLs de Unsplash.
2. Reemplazar `<ImagePlaceholder ... />` por `<Image src="..." alt="..." />` de `next/image`.
3. En `next.config.js` ya está permitido `images.unsplash.com` si usás URLs remotas.

## Textos

- **Habitaciones**: textos de ejemplo en `src/data/habitaciones.ts`. Sustituir por los definitivos.
- **Servicios, ubicación, contacto**: textos de muestra en cada página; reemplazar cuando tengas el contenido final.

## Etapa 2 — Funcionalidades implementadas

- **Reserva**: formulario en 3 pasos (habitación + fechas → datos huésped → pago simulado). Cálculo de noches y total. Código de reserva ficticio y página de confirmación. Desde `/habitaciones` se puede abrir reservar con la habitación ya elegida (`?habitacion=slug`).
- **Contacto**: formulario (nombre, email, asunto, mensaje) con envío simulado y mensaje de éxito; botón a WhatsApp con mensaje prellenado. Número en `ContactoForm.tsx` (ficticio).
- **Ubicación**: iframe de Google Maps con Bariloche. Para tu dirección real: en Google Maps → Compartir → Insertar un mapa → copiar la URL del iframe en `ubicacion/page.tsx`.

Nada de lo anterior envía datos a servidores externos ni realiza cobros reales.

## Pulido profesional (post-Etapa 2)

- **Widget de búsqueda en el hero**: entrada, salida, huéspedes → “Buscar” lleva a `/reservar` con esos parámetros prefiltrados.
- **Testimonios**: sección “Lo que dicen los huéspedes” en inicio (datos en `src/data/testimonios.ts`).
- **FAQ**: página `/faq` con acordeón; en inicio se muestran las primeras 3 preguntas.
- **Políticas**: página `/politicas` con check-in/out, cancelación, reglas de la casa, qué incluye.
- **Newsletter**: formulario en footer y en el CTA del inicio; suscripción simulado (mensaje de éxito).
- **Galería**: página `/galeria` con ítems por categoría; contenedores listos para reemplazar por imágenes.
- **Habitaciones**: cada tipo muestra “qué incluye” (Wi-Fi, desayuno, lockers, etc.) en chips.

## Etapas

1. **Etapa 1: Estructura** — ✅ Rutas, layouts, componentes base, placeholders, textos de ejemplo.
2. **Etapa 2: Funcionalidades** — ✅ Reserva, contacto, mapa.
3. **Pulido** — ✅ Búsqueda en hero, testimonios, FAQ, políticas, newsletter, galería, “qué incluye”.
4. **Etapa 3: Diseño** — ✅ Paleta (primary/accent), tipografía Plus Jakarta Sans, componentes .card / .btn-primary / .btn-accent / .section-title, hero con overlay, espaciados y sombras unificados.
5. **Etapa 4: Animaciones** — Transiciones, micro-interacciones.

## Diseño

- **Mobile first**: layouts y estilos pensados primero para móvil.
- **Paleta base** definida en `src/app/globals.css` (variables CSS); se refina en Etapa 3.
