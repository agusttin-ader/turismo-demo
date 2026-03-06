'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getImageSlot, getImageSrc, getCreditLabel, getUnsplashLink } from '@/data/images';
import { getUnsplashImage, getUnsplashAttributionUrl } from '@/data/unsplash';

interface UnsplashImageProps {
  /** Id de la imagen: en src/data/images.ts (archivo en public/images/) o en unsplash.ts (URL externa) */
  imageId: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4';
  /** Si true, ocupa todo el contenedor (absolute inset-0). Para hero/backgrounds. */
  fill?: boolean;
  className?: string;
  /** Mostrar crédito. Por defecto true (Unsplash lo requiere). */
  showCredit?: boolean;
  /** Para fill: crédito en overlay. Para no-fill: debajo o overlay. */
  creditPosition?: 'below' | 'overlay';
  /** Punto de anclaje de la imagen (ej. "center 30%" para mostrar más la parte superior). */
  objectPosition?: string;
  /** Prioridad de carga (LCP): usar solo en hero / primera imagen visible. Evita lazy y preload. */
  priority?: boolean;
}

const aspectRatioMap = {
  '16/9': 16 / 9,
  '4/3': 4 / 3,
  '1/1': 1,
  '3/4': 3 / 4,
};

type ResolvedImage = {
  src: string;
  alt: string;
  creditLabel: string;
  authorName: string;
  authorUrl: string;
  unsplashUrl: string;
};

function resolveImage(imageId: string): ResolvedImage | null {
  const local = getImageSlot(imageId);
  if (local) {
    return {
      src: getImageSrc(local.filename),
      alt: local.alt,
      creditLabel: getCreditLabel(local.credit),
      authorName: local.credit.authorName,
      authorUrl: local.credit.authorUrl,
      unsplashUrl: getUnsplashLink(local.credit),
    };
  }
  const unsplash = getUnsplashImage(imageId);
  if (unsplash) {
    return {
      src: unsplash.src,
      alt: unsplash.alt,
      creditLabel: `Foto de ${unsplash.credit.authorName} en Unsplash`,
      authorName: unsplash.credit.authorName,
      authorUrl: unsplash.credit.authorUrl,
      unsplashUrl: getUnsplashAttributionUrl(),
    };
  }
  return null;
}

const QUALITY = 85;

export function UnsplashImage({
  imageId,
  aspectRatio = '4/3',
  fill = false,
  className = '',
  showCredit = true,
  creditPosition = 'below',
  objectPosition,
  priority = false,
}: UnsplashImageProps) {
  const config = resolveImage(imageId);

  if (!config) {
    return (
      <div
        className="flex items-center justify-center bg-slate-200 text-slate-500 text-sm overflow-hidden"
        style={fill ? undefined : { aspectRatio: aspectRatioMap[aspectRatio] }}
        role="img"
        aria-label={`Imagen ${imageId} no configurada`}
      >
        <span className="px-3 py-2 text-center">
          [ Agregá {imageId} en src/data/images.ts o poné el archivo en public/images/ ]
        </span>
      </div>
    );
  }

  const creditEl = showCredit ? (
    <span className="text-[10px] text-white/90 flex items-center gap-1 flex-wrap">
      <span aria-hidden>Foto de</span>
      <Link
        href={config.authorUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
      >
        {config.authorName}
      </Link>
      <span aria-hidden>en</span>
      <Link
        href={config.unsplashUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
      >
        Unsplash
      </Link>
    </span>
  ) : null;

  const imageStyle = objectPosition ? { objectPosition } : undefined;

  if (fill) {
    const sizesHero = '(max-width: 1920px) 100vw, 1920px';
    const sizesCard = '(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 420px';
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={config.src}
          alt={config.alt}
          fill
          className="object-cover"
          style={imageStyle}
          sizes={priority ? sizesHero : sizesCard}
          quality={QUALITY}
          priority={priority}
        />
        {showCredit && (
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2"
            aria-label={config.creditLabel}
          >
            {creditEl}
          </div>
        )}
      </div>
    );
  }

  return (
    <figure className={className}>
      <div
        className="relative overflow-hidden bg-slate-100"
        style={{ aspectRatio: aspectRatioMap[aspectRatio] }}
      >
        <Image
          src={config.src}
          alt={config.alt}
          fill
          className="object-cover"
          style={imageStyle}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
          quality={QUALITY}
          priority={priority}
        />
        {showCredit && creditPosition === 'overlay' && (
          <div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-1.5"
            aria-label={config.creditLabel}
          >
            {creditEl}
          </div>
        )}
      </div>
      {showCredit && creditPosition === 'below' && (
        <figcaption className="mt-1.5 text-xs text-slate-500">
          <span aria-hidden>Foto de</span>{' '}
          <Link
            href={config.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark underline"
          >
            {config.authorName}
          </Link>{' '}
          <span aria-hidden>en</span>{' '}
          <Link
            href={config.unsplashUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark underline"
          >
            Unsplash
          </Link>
        </figcaption>
      )}
    </figure>
  );
}
