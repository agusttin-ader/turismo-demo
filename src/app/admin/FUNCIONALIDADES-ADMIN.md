# Admin Refugio Nahuel — Funcionalidades

## Implementado (estilo PRO / premium)

### Diseño
- **Sidebar fija oscura** (slate-900) con logo, navegación con iconos, “Ver sitio web” y Cerrar sesión.
- **Área de contenido** clara (slate-50) con buen espaciado.
- **Dashboard** con KPIs: Total reservas, Confirmadas, Canceladas, Próximas llegadas (7 días).
- **Bloque “Próximas llegadas”** con las siguientes 5 reservas confirmadas.
- **Cards** con bordes, sombra y hover en Dashboard y Habitaciones.

### Reservas
- **Filtro por estado** (todos, confirmada, pendiente, cancelada, completada).
- **Búsqueda** por código, nombre de huésped o email.
- **Exportar CSV** con las reservas visibles (filtros aplicados).
- **Cancelar reserva** (botón por fila cuando está confirmada o pendiente).
- **Fechas en formato DD/MM/AAAA**.

### Habitaciones
- Listado en cards con nombre, slug, precio y estado (Activa/Inactiva).

---

## Ideas para sumar más adelante (según buenas prácticas)

### Corto plazo
- **Vista calendario** de ocupación por habitación (entrada/salida por reserva).
- **Filtro por rango de fechas** en Reservas (entrada entre X e Y).
- **Detalle de reserva** en modal o página (ver todos los datos y notas).
- **Notificaciones** (ej. “Nueva reserva” o “Llegada hoy”) en el dashboard o por email.

### Medio plazo
- **Roles y permisos**: solo algunos usuarios pueden cancelar o ver datos sensibles.
- **Auditoría**: log de quién canceló qué y cuándo.
- **Reportes**: ingresos por período, ocupación por habitación, exportar a Excel/PDF.
- **Precios dinámicos** por temporada (tabla habitaciones o reglas por fechas).

### Largo plazo (más complejo)
- **Multi-propiedad** (varios hostels con un solo admin).
- **Canal manager** (sincronizar con Booking, Airbnb, etc.).
- **Pagos** (Stripe/Mercado Pago) y depósitos/anticipos.
- **Check-in móvil** (QR o link para el huésped).
- **WhatsApp / email** automático (confirmación, recordatorio de llegada).
