'use client';

import { usePathname } from 'next/navigation';
import { AdminSidebar } from './AdminSidebar';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname?.startsWith('/admin/login');

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="pl-64">
        <div className="min-h-screen px-6 py-8 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
