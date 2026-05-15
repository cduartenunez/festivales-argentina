'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLang } from '@/context/LangContext';
import { t } from '@/lib/i18n';

export default function Header() {
  const path = usePathname();
  const { lang, toggle } = useLang();
  const tx = t(lang);

  return (
    <header className="navbar">
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', fontFamily: 'var(--font-bebas)', fontSize: '1.6rem', letterSpacing: '0.03em', lineHeight: 1 }}>
        <Image
          src="/LOGO_FESTIVALES.jpeg"
          alt="Festivales de Argentina"
          height={52}
          width={52}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
          priority
        />
        <span style={{ color: '#F0F6FF' }}>Festivales de </span>
        <span style={{ color: '#74ACDF' }}>Argentina</span>
      </Link>

      <nav style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
        <Link href="/"           className={`nav-link${path === '/'           ? ' active' : ''}`}>{tx.nav.festivals}</Link>
        <Link href="/calendario" className={`nav-link${path === '/calendario' ? ' active' : ''}`}>{tx.nav.calendar}</Link>

        <button
          onClick={toggle}
          title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          style={{
            background: 'transparent',
            border: '1px solid rgba(116,172,223,0.25)',
            color: 'rgba(116,172,223,0.7)',
            borderRadius: '6px',
            padding: '.35rem .75rem',
            fontSize: '.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '.06em',
            marginLeft: '.25rem',
            transition: 'all .2s',
          }}
        >
          {lang === 'es' ? 'ES | EN' : 'EN | ES'}
        </button>
      </nav>
    </header>
  );
}
