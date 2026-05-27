import { getFestivales } from '@/lib/festivales';
import { MESES } from '@/lib/types';
import Hero from '@/components/Hero';
import FestivalGrid from '@/components/FestivalGrid';
import NewsletterForm from '@/components/NewsletterForm';

export default async function Home() {
  const festivales = await getFestivales();
  const mesActual = MESES[new Date().getMonth()];

  return (
    <>
      <Hero total={festivales.length} />
      <FestivalGrid festivales={festivales} mesActual={mesActual} />
      <NewsletterForm />
    </>
  );
}
