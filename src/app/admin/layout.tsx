import { AdminShell } from './AdminShell';

export const metadata = {
  title: 'Admin | Refugio Nahuel',
  description: 'Panel de gestión de reservas y habitaciones.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
