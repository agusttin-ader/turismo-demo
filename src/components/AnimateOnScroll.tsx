'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  /** Clase adicional para el wrapper */
  className?: string;
  /** Desplazamiento en px para considerar "visible" (rootMargin) */
  rootMargin?: string;
  /** Una vez visible, no quitar la clase (evita repetir animación) */
  once?: boolean;
}

export function AnimateOnScroll({
  children,
  className = '',
  rootMargin = '0px 0px -40px 0px',
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
        else if (!once) setInView(false);
      },
      { rootMargin, threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once]);

  return (
    <div
      ref={ref}
      className={`animate-on-scroll ${inView ? 'animate-on-scroll-in-view' : ''} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
