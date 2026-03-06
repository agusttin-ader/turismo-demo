-- Refugio Nahuel: esquema inicial para reservas y admin
-- Ejecutá este script en el SQL Editor de tu proyecto Supabase (Dashboard → SQL Editor → New query).

-- =============================================================================
-- HABITACIONES (opcional: para que el admin pueda editarlas; el sitio puede seguir usando data estática)
-- =============================================================================
create table if not exists public.habitaciones (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nombre text not null,
  capacidad text not null,
  descripcion text not null default '',
  precio_por_noche integer not null check (precio_por_noche >= 0),
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =============================================================================
-- RESERVAS
-- =============================================================================
create type estado_reserva as enum ('confirmada', 'cancelada', 'pendiente', 'completada');

create table if not exists public.reservas (
  id uuid primary key default gen_random_uuid(),
  habitacion_slug text not null,
  entrada date not null,
  salida date not null,
  huespedes smallint not null check (huespedes >= 1 and huespedes <= 6),
  total_noches smallint not null check (total_noches >= 1),
  total_pesos integer not null check (total_pesos >= 0),
  nombre_guest text not null,
  email text not null,
  telefono text,
  codigo text not null unique,
  metodo_pago text not null check (metodo_pago in ('tarjeta', 'hotel')),
  estado estado_reserva not null default 'confirmada',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reservas_salida_after_entrada check (salida > entrada)
);

create index if not exists idx_reservas_entrada_salida on public.reservas (entrada, salida);
create index if not exists idx_reservas_habitacion_slug on public.reservas (habitacion_slug);
create index if not exists idx_reservas_estado on public.reservas (estado);
create index if not exists idx_reservas_codigo on public.reservas (codigo);

-- =============================================================================
-- ADMINS (quién puede entrar a /admin)
-- =============================================================================
create table if not exists public.admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

-- RLS: solo admins pueden ver/editar reservas
alter table public.reservas enable row level security;
alter table public.habitaciones enable row level security;
alter table public.admins enable row level security;

-- Función para ver si el usuario actual es admin (evita recursión en políticas)
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;

-- Políticas para reservas
create policy "Admins pueden hacer todo en reservas"
  on public.reservas for all
  using (public.is_admin())
  with check (public.is_admin());

-- Lectura pública de habitaciones (para el sitio); escritura solo admins
create policy "Todos pueden leer habitaciones"
  on public.habitaciones for select
  using (true);

create policy "Admins pueden gestionar habitaciones"
  on public.habitaciones for all
  using (public.is_admin())
  with check (public.is_admin());

-- Admins: solo admins pueden leer la tabla admins
create policy "Admins pueden leer admins"
  on public.admins for select
  using (public.is_admin());

-- Inserción de reservas desde el sitio público (sin auth): usamos service role desde Next.js
-- o una policy que permita INSERT sin ser admin (solo INSERT). Mejor: el sitio llama a una
-- API route en Next.js que usa service role para insertar. Así RLS no permite que anónimos
-- inserten. Dejamos entonces que solo admins puedan insertar/update/delete desde el cliente.
-- Para que la web pública guarde reservas, en Next.js hacemos POST a /api/reservas que
-- usa la service role key y hace .from('reservas').insert(...). No necesitamos policy de INSERT
-- para anónimos.

-- Permitir que el backend (service role) inserte reservas sin policy; con service role RLS se bypassa.
-- No hay más policies para anónimos. Listo.

-- =============================================================================
-- SEED: habitaciones iniciales (mismas que en el sitio)
-- =============================================================================
insert into public.habitaciones (slug, nombre, capacidad, descripcion, precio_por_noche) values
  ('dormitorio-compartido-6', 'Dormitorio compartido (6 camas)', '6 personas', 'Ambiente ideal para viajeros que buscan conocer gente y ahorrar. Literas cómodas con luz individual y cortina de privacidad.', 12000),
  ('dormitorio-compartido-4', 'Dormitorio compartido (4 camas)', '4 personas', 'Dormitorio más íntimo, perfecto para grupos pequeños o quienes prefieren menos ruido.', 14000),
  ('habitacion-privada-doble', 'Habitación privada doble', '2 personas', 'Habitación privada con cama doble o dos camas individuales. Baño compartido en el pasillo.', 28000),
  ('habitacion-privada-bano', 'Habitación privada con baño', '2 personas', 'Nuestra opción más cómoda: habitación privada con baño en suite.', 35000)
on conflict (slug) do nothing;

-- =============================================================================
-- TRIGGER: updated_at
-- =============================================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists habitaciones_updated_at on public.habitaciones;
create trigger habitaciones_updated_at
  before update on public.habitaciones
  for each row execute function public.set_updated_at();

drop trigger if exists reservas_updated_at on public.reservas;
create trigger reservas_updated_at
  before update on public.reservas
  for each row execute function public.set_updated_at();
