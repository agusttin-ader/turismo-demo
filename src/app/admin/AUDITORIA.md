# Auditoría: Seguridad, Diseño y Optimización — Admin Refugio Nahuel

Fecha de referencia: marzo 2026. Este documento resume la auditoría y las mejoras aplicadas.

---

## 1. Seguridad

### 1.1 Autenticación y rutas

- **Middleware** (`src/middleware.ts`): Protege `/admin` (excepto `/admin/login`). Si no hay sesión Supabase, redirige a login con `?from=...`. Correcto.
- **Server Components admin**: Cada página que usa datos (dashboard, reservas, habitaciones) llama a `createClient()` y hace `getUser()`; si no hay usuario, `redirect('/admin/login')`. Doble capa de protección.
- **Server Action `cancelarReserva`**: Verifica `getUser()` antes de actualizar; además RLS en Supabase exige `is_admin()`. Correcto.

### 1.2 Parámetros y consultas

- **`estado` (Reservas)**: Solo se aceptan valores de una lista fija (`confirmada`, `pendiente`, `cancelada`, `completada`). No hay inyección por query.
- **`q` (búsqueda)**: 
  - Longitud limitada a 200 caracteres.
  - Comodines de LIKE (`%`, `_`) y backslash escapados antes de enviar a Supabase, para búsqueda literal y evitar patrones inesperados.

### 1.3 API pública `POST /api/reservas`

- **Uso**: La web pública crea reservas; no requiere autenticación (flujo deseado).
- **Mejoras aplicadas**:
  - Longitud máxima en campos de texto (habitacion_slug, codigo, nombre_guest, email, telefono) para evitar payloads enormes.
  - Validación de fechas (formato `YYYY-MM-DD` y que `salida > entrada`).
  - Normalización: trim, email en minúsculas.
- **Recomendación futura**: Añadir rate limiting (p. ej. Vercel Edge Config o Upstash) para limitar abusos de creación de reservas.

### 1.4 Secretos

- `SUPABASE_SERVICE_ROLE_KEY` solo se usa en el servidor (API route); no se expone al cliente.
- `NEXT_PUBLIC_*` son adecuados para URL y anon key. Verificar que `.env.local` esté en `.gitignore` (ya está).

---

## 2. Diseño

### 2.1 Consistencia

- Sidebar oscura, contenido claro; paleta slate + primary coherente en todo el admin.
- Títulos: `text-2xl font-bold tracking-tight text-slate-900`; subtítulos: `text-slate-600`.
- Botones: primarios (slate-800), secundarios (borde blanco), estados (verde/rojo/slate).

### 2.2 Toolbar Reservas

- **Ajustes realizados**:
  - Labels accesibles (`sr-only`) e `id` en select e input; `aria-label` en select; `role="search"` en el formulario.
  - Placeholder: "Código, nombre o email" (sin puntos suspensivos para evitar corte en pantallas chicas).
  - Mayor separación entre filtro de estado y búsqueda (`gap-4` en sm) para evitar que el desplegable nativo tape el input.
  - `maxLength={200}` en el input de búsqueda; `focus-visible` en botones.

### 2.3 Empty state y tabla

- Mensaje cuando no hay reservas: texto completo, `role="status"`, padding responsive.
- Botón "Cancelar" en cada fila: `aria-label` con código de reserva, `focus-visible` para teclado.

### 2.4 Login

- Botón de envío: `aria-busy` cuando está cargando, `focus-visible` para accesibilidad.

### 2.5 Responsive

- Sidebar como drawer en móvil; TopBar con menú hamburguesa; safe-area para iPhone (notch).
- Toolbar de reservas en columna en móvil, en fila desde `sm`.
- Tabla con scroll horizontal y `min-width` para que el scroll sea usable en pantallas pequeñas.

---

## 3. Optimización

### 3.1 Consultas a base de datos

- **Dashboard**: Varias consultas en paralelo con `Promise.all`; correcto.
- **Reservas**: Una sola query con filtros por estado y/o búsqueda; índices en `reservas` (entrada, salida, habitacion_slug, estado, codigo) definidos en `schema.sql`; adecuado.
- **Habitaciones**: Un `select *` ordenado por slug; tabla pequeña; aceptable.

### 3.2 Caché y revalidación

- Las páginas del admin dependen de `searchParams` o de datos de Supabase en el servidor; Next.js las trata como dinámicas. No hace falta marcar explícitamente `dynamic = 'force-dynamic'` salvo que se quiera forzar siempre datos en vivo (opcional).

### 3.3 Cliente

- Server Actions para cancelar reserva; sin duplicar lógica en API. CSV generado en el cliente a partir de datos ya cargados; sin peticiones extra.

---

## 4. Resumen de cambios aplicados en esta auditoría

| Área        | Cambio |
|------------|--------|
| Toolbar    | Labels/ids/aria, placeholder, gap, maxLength, focus-visible |
| Reservas   | Escape de `%` y `_` en búsqueda, límite 200 caracteres para `q` |
| API reservas | Límites de longitud, validación de fechas, trim y normalización |
| Empty state | role="status", texto en `<p>`, padding responsive |
| Cancelar   | aria-label por reserva, focus-visible |
| Login      | aria-busy y focus-visible en botón |

---

## 5. Recomendaciones futuras

1. **Rate limiting** en `POST /api/reservas` (p. ej. por IP o por cabecera).
2. **Logs/alertas** ante muchos fallos de login o muchas reservas en poco tiempo.
3. **CSP** (Content-Security-Policy) en headers si se añaden scripts de terceros.
4. **Tests** automatizados: E2E para flujo de login y cancelación; tests unitarios para escape de búsqueda y validación de la API.
