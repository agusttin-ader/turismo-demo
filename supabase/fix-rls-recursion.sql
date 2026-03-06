-- Corrige infinite recursion en políticas de admins
-- Ejecutar en Supabase: SQL Editor -> New query -> Pegar -> Run

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;

drop policy if exists "Admins pueden hacer todo en reservas" on public.reservas;
drop policy if exists "Admins pueden gestionar habitaciones" on public.habitaciones;
drop policy if exists "Admins pueden leer admins" on public.admins;

create policy "Admins pueden hacer todo en reservas"
  on public.reservas for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins pueden gestionar habitaciones"
  on public.habitaciones for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins pueden leer admins"
  on public.admins for select
  using (public.is_admin());
