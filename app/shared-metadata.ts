// Campos Open Graph comunes. Una página que define `openGraph` reemplaza el del layout
// completo, así que cada una los reutiliza y solo agrega su propia `url`.
export const baseOpenGraph = {
  title: 'Festivales de Argentina 2027',
  description: 'El directorio más completo de festivales y eventos culturales argentinos.',
  siteName: 'Festivales de Argentina',
  locale: 'es_AR',
  type: 'website',
} as const;
