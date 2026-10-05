import type { MetadataRoute } from 'next';
import { getFestivales, toSlug } from '@/lib/festivales';

const SITE = 'https://festivalesdeargentina.com.ar';

// Igual que /calendario: se regenera cada hora para que los festivales vencidos salgan sin redeploy.
export const revalidate = 3600;

// Solo URLs reales. Sin lastModified, changeFrequency ni priority: no hay datos reales para ellos.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const festivales = await getFestivales();
  return [
    { url: SITE },
    { url: `${SITE}/calendario` },
    { url: `${SITE}/galeria` },
    { url: `${SITE}/sponsors` },
    ...festivales.map(f => ({ url: `${SITE}/festivales/${toSlug(f.titulo)}` })),
  ];
}
