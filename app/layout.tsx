import type { Metadata } from 'next';
import { DM_Sans, Fraunces, Bebas_Neue } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/context/LangContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
});

const bebasNeue = Bebas_Neue({
  variable: '--font-bebas',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Festivales de Argentina 2027 | Directorio Oficial',
  description: 'El directorio más completo de festivales, fiestas populares y eventos culturales de todo el país.',
  openGraph: {
    title: 'Festivales de Argentina 2027',
    description: 'El directorio más completo de festivales y eventos culturales argentinos.',
    url: 'https://festivalesdeargentina.com.ar',
    siteName: 'Festivales de Argentina',
    locale: 'es_AR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${fraunces.variable} ${bebasNeue.variable}`}>
      <body>
        <LangProvider>
          <Header />
          {children}
          <Footer />
          <AdBanner />
        </LangProvider>
      </body>
    </html>
  );
}
