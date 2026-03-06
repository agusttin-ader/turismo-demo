# Supabase – Configuración paso a paso

Seguí estos pasos en orden. Cuando termines, tu base de datos estará lista y podrás usar el admin y guardar reservas.

---

## Paso 1: Crear cuenta y proyecto en Supabase

1. Entrá a **https://supabase.com** e iniciá sesión (o creá una cuenta con GitHub/email).
2. En el dashboard, click en **"New project"**.
3. Completá:
   - **Name**: por ejemplo `refugio-nahuel` o `turismo-demo`.
   - **Database Password**: inventá una contraseña segura y **guardala** (la vas a necesitar si algún día querés conectar directo a la base).
   - **Region**: elegí la más cercana (ej. South America si está disponible).
4. Click en **"Create new project"** y esperá 1–2 minutos a que se cree.

---

## Paso 2: Copiar la URL y las API keys

1. En el menú izquierdo del proyecto, entrá a **Settings** (ícono de engranaje).
2. Click en **"API"** en el submenú.
3. En **Project URL** copiá la URL (algo como `https://abcdefgh.supabase.co`). Guardala.
4. En **Project API keys** vas a ver dos keys:
   - **anon public**: copiala (es la que usa el navegador para login, etc.).
   - **service_role**: click en "Reveal" y copiala (solo la usa el servidor para crear reservas; **no** la compartas ni la pongas en el frontend).

Las vas a usar en el Paso 6 (variables de entorno).

---

## Paso 3: Ejecutar el script SQL (crear tablas)

1. En el menú izquierdo, entrá a **"SQL Editor"**.
2. Click en **"New query"**.
3. Abrí en tu proyecto el archivo **`supabase/schema.sql`** y copiá **todo** su contenido.
4. Pegalo en el editor SQL de Supabase.
5. Click en **"Run"** (o Ctrl/Cmd + Enter).
6. Deberías ver un mensaje de éxito. Con eso quedaron creadas:
   - tabla **habitaciones** (con las 4 habitaciones cargadas),
   - tabla **reservas**,
   - tabla **admins**,
   - políticas de seguridad (RLS) e índices.

---

## Paso 4: Crear el usuario administrador

1. En el menú izquierdo, entrá a **"Authentication"**.
2. Click en **"Users"**.
3. Click en **"Add user"** → **"Create new user"**.
4. Completá:
   - **Email**: el email con el que vas a entrar al panel admin (ej. `tu@email.com`).
   - **Password**: una contraseña segura (anotala para entrar a `/admin`).
5. Click en **"Create user"**.
6. En la lista de usuarios, click en el usuario que acabás de crear.
7. Copiá el **UUID** que aparece como "User UID" (algo como `a1b2c3d4-e5f6-7890-abcd-ef1234567890`). Lo vas a usar en el paso siguiente.

---

## Paso 5: Darle permisos de admin a ese usuario

1. Volvé al **SQL Editor** (menú izquierdo).
2. Click en **"New query"**.
3. Pegá este SQL (reemplazá los dos valores por los tuyos):

```sql
insert into public.admins (user_id, email) values
  ('PEGA-ACÁ-EL-USER-UID-DEL-PASO-4', 'el-mismo-email@que-usaste.com');
```

4. Click en **"Run"**.

Si todo salió bien, ese usuario ya puede entrar a **tu-sitio.vercel.app/admin** (o localhost/admin) con ese email y contraseña.

---

## Paso 6: Poner las variables de entorno

### En tu máquina (desarrollo local)

1. En la raíz del proyecto abrí el archivo **`.env.local`** (ya lo creamos antes).
2. Pegá y completá con los valores del Paso 2:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### En Vercel (producción)

1. Entrá a **vercel.com** → tu proyecto **turismo-demo**.
2. **Settings** → **Environment Variables**.
3. Agregá las mismas tres variables:
   - `NEXT_PUBLIC_SUPABASE_URL` → valor
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → valor
   - `SUPABASE_SERVICE_ROLE_KEY` → valor
4. Elegí **Production** (y opcionalmente Preview si querés).
5. Guardá y hacé un **redeploy** del proyecto para que tome las nuevas variables.

---

## Resumen rápido

| Paso | Dónde | Qué hacés |
|------|--------|-----------|
| 1 | supabase.com | Crear proyecto |
| 2 | Settings → API | Copiar URL + anon key + service_role key |
| 3 | SQL Editor | Pegar y ejecutar `schema.sql` |
| 4 | Authentication → Users | Crear usuario (email + contraseña), copiar User UID |
| 5 | SQL Editor | `INSERT` en `public.admins` con ese UID y email |
| 6 | .env.local y Vercel | Poner las 3 variables de entorno |

Listo. Después de esto podés entrar a `/admin`, hacer login y ver reservas; y cada reserva confirmada desde el sitio se guardará en Supabase.
