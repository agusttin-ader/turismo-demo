import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reserva confirmada | Refugio Nahuel',
  description: 'Confirmación de tu reserva en Refugio Nahuel, Bariloche.',
};

export default function ConfirmacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
