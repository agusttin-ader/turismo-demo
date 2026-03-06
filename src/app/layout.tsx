import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import 'react-day-picker/style.css';
import { Shell } from '@/components/Shell';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Refugio Nahuel | Hostel en Bariloche, Río Negro',
  description: 'Hostel de montaña en Bariloche. Alojamiento económico, habitaciones compartidas y privadas. Experiencia patagónica.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={jakarta.variable}>
      <body className="min-h-screen flex flex-col font-sans">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
