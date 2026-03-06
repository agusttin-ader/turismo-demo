# Supabase – Refugio Nahuel

## 1. Crear proyecto en Supabase

1. Entrá a [supabase.com](https://supabase.com) y creá un proyecto (gratuito).
2. Anotá la **URL** del proyecto y las **API keys** (Settings → API):
   - `Project URL`
   - `anon` `public` (para el cliente en el navegador)
   - `service_role` (solo para el servidor Next.js, **nunca** en el frontend)

## 2. Ejecutar el esquema

1. En el Dashboard de Supabase: **SQL Editor** → **New query**.
2. Copiá y pegá todo el contenido de `schema.sql`.
3. Ejecutá (Run). Se crean las tablas `habitaciones`, `reservas`, `admins`, RLS y el seed de habitaciones.

## 3. Crear el primer usuario admin

1. En Supabase: **Authentication** → **Users** → **Add user** → **Create new user**.
2. Ingresá email y contraseña. Anotalas para entrar a `/admin`.
3. Copiá el **User UID** del usuario recién creado.
4. En **SQL Editor** ejecutá (reemplazá `TU-USER-UID` por el UID real):

```sql
insert into public.admins (user_id, email) values
  ('TU-USER-UID', 'tu-email@ejemplo.com');
```

Desde ese momento ese usuario puede iniciar sesión en `/admin`.

## 4. Variables de entorno en Next.js

En la raíz del proyecto creá `.env.local` con:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

- `NEXT_PUBLIC_*`: los usa el cliente (login, etc.).
- `SUPABASE_SERVICE_ROLE_KEY`: solo en el servidor (API routes que crean reservas desde la web pública). No la expongas en el frontend.
