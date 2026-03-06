'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function cancelarReserva(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'No autorizado' };

  const { error } = await supabase
    .from('reservas')
    .update({ estado: 'cancelada' })
    .eq('id', id)
    .in('estado', ['confirmada', 'pendiente']);

  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin/reservas');
  return { ok: true };
}
