/**
 * Contenedor para imágenes. Reemplazar por Next/Image cuando tengas las URLs de Unsplash.
 * Uso: <ImagePlaceholder alt="Habitación doble" aspectRatio="16/9" />
 * Para hero full-bleed: <ImagePlaceholder alt="Hero" fill />
 */
interface ImagePlaceholderProps {
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4';
  /** Si true, ocupa todo el contenedor (absolute inset-0). Para hero/backgrounds. */
  fill?: boolean;
  className?: string;
}

export function ImagePlaceholder({
  alt,
  aspectRatio = '16/9',
  fill = false,
  className = '',
}: ImagePlaceholderProps) {
  const base = 'bg-slate-200 flex items-center justify-center text-slate-500 text-sm overflow-hidden';
  const size = fill ? 'absolute inset-0 w-full h-full object-cover' : '';
  const style = fill ? undefined : { aspectRatio };

  return (
    <div
      className={`${base} ${size} ${className}`}
      style={style}
      role="img"
      aria-label={alt}
    >
      <span className="px-3 py-2 text-center">
        [ Imagen: {alt} — cargar desde Unsplash ]
      </span>
    </div>
  );
}
