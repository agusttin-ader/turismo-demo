'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [mensaje, setMensaje] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEstado('loading');
    // Simulación: no se envía a ningún servicio
    setTimeout(() => {
      setEstado('success');
      setMensaje('Gracias por suscribirte. Te avisaremos ofertas y novedades.');
      setEmail('');
    }, 600);
  }

  if (estado === 'success') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
        {mensaje}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email para newsletter
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        required
        disabled={estado === 'loading'}
        className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-70"
      />
      <button
        type="submit"
        disabled={estado === 'loading'}
        className="btn-primary disabled:opacity-70"
      >
        {estado === 'loading' ? 'Enviando...' : 'Suscribirme'}
      </button>
    </form>
  );
}
