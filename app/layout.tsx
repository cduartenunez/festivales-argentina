import type { Metadata } from 'next';
import { DM_Sans, Fraunces, Bebas_Neue } from 'next/font/google';
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
        <Header />
        {children}
        <footer className="footer">
          <div className="footer-title">Festivales de Argentina</div>
          <p style={{ fontSize: '.9rem', marginBottom: '.5rem' }}>
            El directorio más completo de festivales y eventos culturales del país.
          </p>
          <small style={{ fontSize: '.75rem', color: 'rgba(116,172,223,0.35)' }}>
            © {new Date().getFullYear()} festivalesdeargentina.com.ar
          </small>
        </footer>
      </body>
    </html>
  );
}
