import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

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
    const supabase = createServiceRoleClient();
    const row = {
      habitacion_slug: String(body.habitacion_slug),
      entrada: String(body.entrada),
      salida: String(body.salida),
      huespedes: Math.min(6, Math.max(1, Number(body.huespedes) || 1)),
      total_noches: Math.max(1, Number(body.total_noches) || 1),
      total_pesos: Math.max(0, Number(body.total_pesos) || 0),
      nombre_guest: String(body.nombre_guest),
      email: String(body.email),
      telefono: body.telefono != null ? String(body.telefono) : null,
      codigo: String(body.codigo),
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
