export const dynamic = 'force-dynamic';

import { getFestivales } from '@/lib/festivales';
import { MESES } from '@/lib/types';
import Hero from '@/components/Hero';
import FestivalGrid from '@/components/FestivalGrid';

export default async function Home() {
  const festivales = await getFestivales();
  const mesActual = MESES[new Date().getMonth()];
  const hoy = new Date();

  // Festival más próximo del mes actual que aún no terminó
  const festDestacado = [...festivales]
    .filter(f => f.mes === mesActual && f.fecha_inicio)
    .sort((a, b) => a.fecha_inicio.localeCompare(b.fecha_inicio))
    .find(f => new Date((f.fecha_fin || f.fecha_inicio) + 'T23:59:59') >= hoy)
    ?? festivales.find(f => f.mes === mesActual)
    ?? null;

  return (
    <>
      <Hero total={festivales.length} festDestacado={festDestacado} />
      <FestivalGrid festivales={festivales} mesActual={mesActual} />
    </>
  );
}
