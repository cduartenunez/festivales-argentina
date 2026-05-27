'use client';

import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { t } from '@/lib/i18n';
import NewsletterForm from '@/components/NewsletterForm';

export default function Footer() {
  const { lang } = useLang();
  const tx = t(lang);

  return (
    <footer className="footer">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
        <Image
          src="/LOGO_FESTIVALES.jpeg"
          alt="Festivales de Argentina"
          width={90}
          height={90}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', letterSpacing: '0.03em', lineHeight: 1.1 }}>
          <span style={{ color: '#F0F6FF' }}>Festivales de </span>
          <span style={{ color: '#74ACDF' }}>Argentina</span>
        </span>
      </div>
      <p style={{ fontSize: '.9rem', marginBottom: '1.75rem' }}>{tx.footer.tagline}</p>
      <NewsletterForm />
      <small style={{ fontSize: '.75rem', color: 'rgba(116,172,223,0.35)' }}>
        © {new Date().getFullYear()} festivalesdeargentina.com.ar
      </small>
    </footer>
  );
}
