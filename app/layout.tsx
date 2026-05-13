import type { Metadata } from 'next';
import { DM_Sans, Fraunces } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';

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

export const metadata: Metadata = {
  title: 'Festivales de Argentina 2027 | Directorio Oficial',
  description: 'El directorio más completo de festivales, fiestas populares y eventos culturales de todo el país. Folklore, gastronomía, música, carnaval y mucho más.',
  keywords: 'festivales argentina, fiestas populares, folklore, carnaval, gastronomía, música, eventos culturales',
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
    <html lang="es" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body>
        <Header />
        {children}
        <footer style={{
          background: 'var(--azul-noche)',
          color: 'rgba(245,238,216,0.65)',
          padding: '3rem 2rem',
          textAlign: 'center',
        }}>
          <strong style={{
            display: 'block',
            fontFamily: 'var(--font-fraunces,Fraunces,serif)',
            fontSize: '1.4rem',
            color: 'var(--ocre)',
            fontStyle: 'italic',
            marginBottom: '.5rem',
          }}>
            Festivales de Argentina
          </strong>
          <p style={{ fontSize: '.9rem', marginBottom: '.5rem' }}>
            El directorio más completo de festivales y eventos culturales del país.
          </p>
          <small style={{ fontSize: '.78rem', color: 'rgba(245,238,216,0.4)' }}>
            © {new Date().getFullYear()} festivalesdeargentina.com.ar
          </small>
        </footer>
      </body>
    </html>
  );
}
