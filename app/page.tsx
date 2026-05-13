import { getFestivales } from '@/lib/festivales';
import Hero from '@/components/Hero';
import FestivalGrid from '@/components/FestivalGrid';

export default async function Home() {
  const festivales = await getFestivales();

  return (
    <>
      <Hero total={festivales.length} />
      <FestivalGrid festivales={festivales} />
    </>
  );
}
