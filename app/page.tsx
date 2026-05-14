import { getFestivales } from '@/lib/festivales';
import { MESES } from '@/lib/types';
import Hero from '@/components/Hero';
import FestivalGrid from '@/components/FestivalGrid';

export default async function Home() {
  const festivales = await getFestivales();
  // Detectar mes actual en el servidor
  const mesActual = MESES[new Date().getMonth()];

  return (
    <>
      <Hero total={festivales.length} />
      <FestivalGrid festivales={festivales} mesActual={mesActual} />
    </>
  );
}
