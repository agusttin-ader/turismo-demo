/**
 * Imágenes del sitio: archivos en public/images/ + crédito de Unsplash.
 * Vos ponés el archivo en public/images/ y acá definís nombre, alt y crédito.
 *
 * Para agregar una imagen: añadí la entrada en imageSlots y usá <CreditImage imageId="hero" /> (o el id que definas).
 */

export interface ImageCredit {
  authorName: string;
  /** URL del perfil del autor en Unsplash */
  authorUrl: string;
  /** URL de la foto en Unsplash (enlace "en Unsplash"). Si no está, se usa unsplash.com */
  unsplashPhotoUrl?: string;
}

export interface ImageSlotConfig {
  id: string;
  /** Nombre del archivo en public/images/ (ej. hero.jpg) */
  filename: string;
  alt: string;
  credit: ImageCredit;
}

const UNSPLASH_BASE = 'https://unsplash.com';

/** Slots de imagen: id → config. La imagen debe estar en public/images/{filename} */
export const imageSlots: Record<string, ImageSlotConfig> = {
  hero: {
    id: 'hero',
    filename: 'hero.jpg',
    alt: 'Vista del hostel o paisaje de Bariloche',
    credit: {
      authorName: 'Geronimo Giqueaux',
      authorUrl:
        'https://unsplash.com/es/@ggiqueaux?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/casa-blanca-y-marron-cerca-de-arboles-verdes-y-lago-durante-el-dia-At0wecizwVU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  ubicacion: {
    id: 'ubicacion',
    filename: 'centro.jpg',
    alt: 'Ubicación céntrica',
    credit: {
      authorName: 'Por completar',
      authorUrl: 'https://unsplash.com',
      // Reemplazá con authorUrl (perfil) y unsplashPhotoUrl (foto) cuando tengas el crédito.
    },
  },

  ambiente: {
    id: 'ambiente',
    filename: 'comun-espacio.jpg',
    alt: 'Ambiente hostel',
    credit: {
      authorName: 'Takafumi Yamashita',
      authorUrl:
        'https://unsplash.com/es/@yamashita0129?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/habitacion-vacia-de-madera-marron-yUs-rYGedzs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  experiencias: {
    id: 'experiencias',
    filename: 'experiencia.jpg',
    alt: 'Actividades y excursiones',
    credit: {
      authorName: 'Juano David',
      authorUrl:
        'https://unsplash.com/es/@juanodlt_?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/un-hombre-parado-frente-a-un-cuerpo-de-agua-tGTJ2QRJzzU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  'dormitorio-6': {
    id: 'dormitorio-6',
    filename: 'dormitorio-6-camas.jpg',
    alt: 'Dormitorio compartido de 6 camas',
    credit: {
      authorName: 'Zoshua Colah',
      authorUrl:
        'https://unsplash.com/es/@zoshuacolah?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/una-habitacion-llena-de-literas-junto-a-una-ventana-TzMGehZmocI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  'dormitorio-4': {
    id: 'dormitorio-4',
    filename: 'dormitorio-4camas.jpg',
    alt: 'Dormitorio compartido de 4 camas',
    credit: {
      authorName: 'Nicate Lee',
      authorUrl:
        'https://unsplash.com/es/@nicn10?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/literas-de-madera-marron-kT-ZyaiwBe0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  'habitacion-suite': {
    id: 'habitacion-suite',
    filename: 'dormitorio-suite.jpg',
    alt: 'Habitación privada con baño',
    credit: {
      authorName: 'Sasha Kaunas',
      authorUrl:
        'https://unsplash.com/es/@akaunas?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/ropa-de-cama-blanca-cerca-de-la-cortina-marron-de-la-ventana-Fk9d0cxYqC4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  'habitacion-doble': {
    id: 'habitacion-doble',
    filename: 'dormitorio-doblepriv.jpg',
    alt: 'Habitación privada doble',
    credit: {
      authorName: 'Alen Rojnić',
      authorUrl:
        'https://unsplash.com/es/@alenrojnicphotography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/ropa-de-cama-floral-blanca-y-gris-T1Yvmf4oleQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  desayuno: {
    id: 'desayuno',
    filename: 'desayuno.jpg',
    alt: 'Desayuno incluido',
    credit: {
      authorName: 'Claudia Viloria',
      authorUrl:
        'https://unsplash.com/es/@viloria?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/fotografia-de-enfoque-selectivo-de-jarra-llena-de-leche-junto-a-la-canasta-de-mimbre-marron-WIJPPnoVrDs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  cocina: {
    id: 'cocina',
    filename: 'cocina.jpg',
    alt: 'Cocina compartida',
    credit: {
      authorName: 'Barbara Burgess',
      authorUrl:
        'https://unsplash.com/es/@fieldworkframes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/una-cocina-con-electrodomesticos-de-acero-inoxidable-y-una-encimera-de-madera-v9jraQ0tM9A?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  wifi: {
    id: 'wifi',
    filename: 'wifi.jpg',
    alt: 'Wi-Fi en todo el hostel',
    credit: {
      authorName: 'Austin Distel',
      authorUrl:
        'https://unsplash.com/es/@austindistel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/persona-que-usa-el-telefono-y-la-computadora-portatil-gUIJ0YszPig?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  locker: {
    id: 'locker',
    filename: 'locker.jpg',
    alt: 'Lockers y seguridad',
    credit: {
      authorName: 'Els Cattrysse',
      authorUrl:
        'https://unsplash.com/es/@piksels?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/una-fila-de-casilleros-blancos-y-amarillos-uno-al-lado-del-otro-iqzfULydYtQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  recepcion: {
    id: 'recepcion',
    filename: 'recepcion.jpg',
    alt: 'Recepción e información',
    credit: {
      authorName: 'Helena Lopes',
      authorUrl:
        'https://unsplash.com/es/@helenalopesph?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/hombre-con-camisa-negra-de-pie-junto-al-mostrador-yIcm3DWRz-c?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  lavanderia: {
    id: 'lavanderia',
    filename: 'laundry.jpg',
    alt: 'Lavandería',
    credit: {
      authorName: 'Annie Spratt',
      authorUrl:
        'https://unsplash.com/es/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/cesta-de-ropa-de-plastico-blanco-al-lado-de-la-lavadora-de-carga-frontal-negra-aJN7zURQ1Wg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  'vista-hotel': {
    id: 'vista-hotel',
    filename: 'vista-hotel.jpg',
    alt: 'Vista desde el hostel',
    credit: {
      authorName: 'Alexis Garcia',
      authorUrl:
        'https://unsplash.com/es/@alexgarciafoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/una-gran-casa-sentada-en-la-cima-de-una-exuberante-ladera-verde-JrO95SdRu4E?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  lago: {
    id: 'lago',
    filename: 'lago.jpg',
    alt: 'Lago Nahuel Huapi desde Bariloche',
    credit: {
      authorName: 'Mayra Segovia Lauría',
      authorUrl:
        'https://unsplash.com/es/@maysegovial?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/una-gran-masa-de-agua-rodeada-de-montanas-oOia8jh8R80?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },

  'cerro-catedral': {
    id: 'cerro-catedral',
    filename: 'cerro-catedral.jpeg',
    alt: 'Cerro Catedral',
    credit: {
      authorName: 'Por completar',
      authorUrl: 'https://unsplash.com',
    },
  },

  atardecer: {
    id: 'atardecer',
    filename: 'atardecer-bariloche.jpg',
    alt: 'Atardecer en la montaña',
    credit: {
      authorName: 'Andrew Svk',
      authorUrl:
        'https://unsplash.com/es/@andrew_svk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
      unsplashPhotoUrl:
        'https://unsplash.com/es/fotos/una-vista-panoramica-de-un-lago-rodeado-de-montanas-X4b2DK80F1k?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    },
  },
};

export function getImageSlot(imageId: string): ImageSlotConfig | undefined {
  return imageSlots[imageId];
}

/** URL pública de la imagen (desde public/images/) */
export function getImageSrc(filename: string): string {
  return `/images/${filename}`;
}

export function getCreditLabel(credit: ImageCredit): string {
  return `Foto de ${credit.authorName} en Unsplash`;
}

export function getUnsplashLink(credit: ImageCredit): string {
  return credit.unsplashPhotoUrl ?? UNSPLASH_BASE;
}
