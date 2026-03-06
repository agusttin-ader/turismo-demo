/**
 * Bloque de explicación para el cliente: qué no está implementado aún
 * y qué opciones se pueden implementar. Solo visible como referencia.
 */
interface ClientNoteProps {
  title: string;
  items: string[];
}

export function ClientNote({ title, items }: ClientNoteProps) {
  return (
    <div className="mt-8 rounded-xl border border-slate-300 bg-slate-100 p-4 sm:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
        Nota para el cliente
      </h3>
      <h4 className="mt-2 font-semibold text-slate-900">{title}</h4>
      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
