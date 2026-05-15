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
          height={44}
          width={44}
          style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          priority
        />
        <span className="navbar-logo-text">
          <span style={{ color: '#F0F6FF' }}>Festivales de </span>
          <span style={{ color: '#74ACDF' }}>Argentina</span>
        </span>
      </Link>

      <nav style={{ display: 'flex', gap: '.35rem', alignItems: 'center' }}>
        <Link href="/"           className={`nav-link${path === '/'           ? ' active' : ''}`}>
          <span className="nav-icon">🗺️</span>
          <span className="nav-label">{lang === 'es' ? 'Festivales' : 'Festivals'}</span>
        </Link>
        <Link href="/calendario" className={`nav-link${path === '/calendario' ? ' active' : ''}`}>
          <span className="nav-icon">📅</span>
          <span className="nav-label">{lang === 'es' ? 'Calendario' : 'Calendar'}</span>
        </Link>
        <Link href="/galeria" className={`nav-link${path === '/galeria' ? ' active' : ''}`}>
          <span className="nav-icon">📸</span>
          <span className="nav-label">Galería</span>
        </Link>
        <Link href="/sponsors" className={`nav-link nav-link-ad${path === '/sponsors' ? ' active' : ''}`}>
          <span className="nav-icon">💼</span>
          <span className="nav-label">Anunciá aquí</span>
        </Link>

        <button
          onClick={toggle}
          title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          className="lang-toggle"
        >
          {lang === 'es' ? 'ES' : 'EN'}
        </button>
      </nav>
    </header>
  );
}
