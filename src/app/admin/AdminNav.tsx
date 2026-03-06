'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const isLoginPage = pathname?.startsWith('/admin/login');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user: u } }) => setUser(u ?? null));
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/admin" className="text-lg font-bold tracking-tight text-primary">
          Refugio Nahuel - Admin
        </Link>
        {isLoginPage ? (
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-700">
            Ver sitio
          </Link>
        ) : (
          <nav className="flex items-center gap-6" aria-label="Admin">
            <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-primary">Inicio</Link>
            <Link href="/admin/reservas" className="text-sm font-medium text-slate-600 hover:text-primary">Reservas</Link>
            <Link href="/admin/habitaciones" className="text-sm font-medium text-slate-600 hover:text-primary">Habitaciones</Link>
            <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-700">Ver sitio</Link>
            {user && (
              <button
                type="button"
                onClick={handleSignOut}
                className="text-sm font-medium text-slate-500 hover:text-red-600"
              >
                Cerrar sesión
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
