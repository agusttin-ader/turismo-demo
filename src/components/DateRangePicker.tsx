'use client';

import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { es } from 'react-day-picker/locale';
import { startOfDay, isBefore, addDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';

function toISO(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function fromISO(iso: string): Date {
  const d = new Date(iso + 'T12:00:00');
  return d;
}

export interface DateRangePickerProps {
  /** Fecha de entrada (YYYY-MM-DD) */
  entrada: string;
  /** Fecha de salida (YYYY-MM-DD) */
  salida: string;
  onChange: (entrada: string, salida: string) => void;
  /** Mínimo de noches (opcional) */
  minNoches?: number;
  /** Clase extra para el wrapper (ej. rdp-compact) */
  className?: string;
  /** Si true, quita borde/sombra para usar dentro de otra card */
  nested?: boolean;
}

export function DateRangePicker({
  entrada,
  salida,
  onChange,
  minNoches = 1,
  className = '',
  nested = false,
}: DateRangePickerProps) {
  const today = startOfDay(new Date());
  const selected: DateRange = {
    from: entrada ? fromISO(entrada) : undefined,
    to: salida ? fromISO(salida) : undefined,
  };

  const [month, setMonth] = useState<Date>(() => selected?.from ?? today);
  useEffect(() => {
    if (entrada) setMonth(fromISO(entrada));
    else setMonth(startOfDay(new Date()));
  }, [entrada]);

  const handleSelect = (range: DateRange | undefined) => {
    if (!range?.from) {
      onChange('', '');
      return;
    }
    const fromStr = toISO(range.from);
    if (!range.to || range.to.getTime() === range.from.getTime()) {
      const toDate = addDays(range.from, minNoches);
      onChange(fromStr, toISO(toDate));
      return;
    }
    onChange(fromStr, toISO(range.to));
  };

  const disabled = (date: Date) => isBefore(startOfDay(date), today);

  const wrapperClass = nested
    ? `rdp-wrapper rounded-xl p-0 [&_.rdp-root]:p-0 ${className}`.trim()
    : `rdp-wrapper rounded-2xl border border-slate-200 bg-white p-4 shadow-card [&_.rdp-root]:p-0 ${className}`.trim();

  return (
    <div className={wrapperClass}>
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={handleSelect}
        disabled={disabled}
        locale={es}
        numberOfMonths={1}
        month={month}
        onMonthChange={setMonth}
      />
    </div>
  );
}

