import type { MetadataRoute } from 'next';
import { toSlug } from '@/lib/festivales';
import { FESTIVALES_ESTATICOS } from '@/lib/data';

const SITE = 'https://festivalesdeargentina.com.ar';

// Igual que /calendario: se regenera cada hora.
export const revalidate = 3600;

// Solo URLs reales. Sin lastModified, changeFrequency ni priority: no hay datos reales para ellos.
// Incluye las fichas de festivales finalizados: siguen publicadas como contenido histórico.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const festivales = FESTIVALES_ESTATICOS;
  return [
    { url: SITE },
    { url: `${SITE}/calendario` },
    { url: `${SITE}/galeria` },
    { url: `${SITE}/sponsors` },
    ...festivales.map(f => ({ url: `${SITE}/festivales/${toSlug(f.titulo)}` })),
  ];
}
