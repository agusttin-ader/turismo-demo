'use client';

import { useState } from 'react';
import type { FaqItem } from '@/data/faq';

interface FAQProps {
  items: FaqItem[];
  /** Si true, muestra solo las primeras N en home; si false, muestra todos (página FAQ). */
  limit?: number;
}

export function FAQ({ items, limit }: FAQProps) {
  const toShow = limit ? items.slice(0, limit) : items;
  const [abierto, setAbierto] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {toShow.map((item) => {
        const isOpen = abierto === item.id;
        return (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-card transition-shadow hover:shadow-soft"
          >
            <button
              type="button"
              onClick={() => setAbierto(isOpen ? null : item.id)}
              className={`flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset focus:ring-offset-0 ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
              aria-expanded={isOpen}
            >
              <span>{item.pregunta}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ease-out ${isOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              aria-hidden={!isOpen}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="border-t border-slate-100 px-4 py-3 text-sm text-slate-600">
                  {item.respuesta}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
