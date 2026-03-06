import { AdminNav } from './AdminNav';

export const metadata = {
  title: 'Admin | Refugio Nahuel',
  description: 'Panel de gestión de reservas.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <AdminNav />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
