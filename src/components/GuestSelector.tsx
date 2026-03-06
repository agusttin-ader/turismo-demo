'use client';

import { useState, useRef, useEffect } from 'react';

const OPCIONES = [1, 2, 3, 4, 5, 6] as const;

interface GuestSelectorProps {
  value: number;
  onChange: (n: number) => void;
  /** Clases para el botón disparador */
  className?: string;
  id?: string;
}

export function GuestSelector({ value, onChange, className = '', id }: GuestSelectorProps) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setAbierto(false);
      }
    }
    if (abierto) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [abierto]);

  return (
    <div className="relative" ref={ref}>
      <button
        id={id}
        type="button"
        onClick={() => setAbierto(!abierto)}
        className={`flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-sm text-slate-900 transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${className}`}
        aria-haspopup="listbox"
        aria-expanded={abierto}
      >
        <span>
          {value} {value === 1 ? 'huésped' : 'huéspedes'}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${abierto ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {abierto && (
        <div
          className="absolute left-0 top-full z-50 mt-1.5 w-full min-w-[180px] rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
          role="listbox"
        >
          {OPCIONES.map((n) => (
            <button
              key={n}
              type="button"
              role="option"
              aria-selected={value === n}
              onClick={() => {
                onChange(n);
                setAbierto(false);
              }}
              className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition ${
                value === n
                  ? 'bg-primary text-white'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                {value === n ? (
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                ) : null}
              </span>
              <span>
                {n} {n === 1 ? 'huésped' : 'huéspedes'}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
