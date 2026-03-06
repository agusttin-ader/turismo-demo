import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

const MAX_LENGTH = {
  habitacion_slug: 80,
  codigo: 32,
  nombre_guest: 200,
  email: 320,
  telefono: 30,
} as const;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function truncate(s: string, max: number) {
  return s.slice(0, max);
}

function isValidDate(s: string) {
  if (!DATE_RE.test(s)) return false;
  const d = new Date(s + 'T12:00:00');
  return !Number.isNaN(d.getTime());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (
      !body.habitacion_slug ||
      !body.entrada ||
      !body.salida ||
      !body.codigo ||
      !body.nombre_guest ||
      !body.email
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const entrada = String(body.entrada).slice(0, 10);
    const salida = String(body.salida).slice(0, 10);
    if (!isValidDate(entrada) || !isValidDate(salida)) {
      return NextResponse.json({ error: 'Invalid date format (use YYYY-MM-DD)' }, { status: 400 });
    }
    if (salida <= entrada) {
      return NextResponse.json({ error: 'Salida must be after entrada' }, { status: 400 });
    }

    const supabase = createServiceRoleClient();
    const row = {
      habitacion_slug: truncate(String(body.habitacion_slug).trim(), MAX_LENGTH.habitacion_slug),
      entrada,
      salida,
      huespedes: Math.min(6, Math.max(1, Number(body.huespedes) || 1)),
      total_noches: Math.max(1, Number(body.total_noches) || 1),
      total_pesos: Math.max(0, Number(body.total_pesos) || 0),
      nombre_guest: truncate(String(body.nombre_guest).trim(), MAX_LENGTH.nombre_guest),
      email: truncate(String(body.email).trim().toLowerCase(), MAX_LENGTH.email),
      telefono: body.telefono != null ? truncate(String(body.telefono).trim(), MAX_LENGTH.telefono) : null,
      codigo: truncate(String(body.codigo).trim(), MAX_LENGTH.codigo),
      metodo_pago: body.metodo_pago === 'hotel' ? 'hotel' : 'tarjeta',
      estado: 'confirmada',
    };
    const { data, error } = await supabase.from('reservas').insert(row).select('id').single();
    if (error) {
      if (error.code === '23505') return NextResponse.json({ error: 'Duplicate code' }, { status: 409 });
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ id: data?.id });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
