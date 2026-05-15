'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const path = usePathname();

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
        <span style={{ color: '#fff' }}>Festivales de </span>
        <span style={{ color: '#74ACDF' }}>Argentina</span>
      </Link>

      <nav style={{ display: 'flex', gap: '.5rem' }}>
        <Link href="/" className={`nav-link${path === '/' ? ' active' : ''}`}>
          🗺️ Festivales
        </Link>
        <Link href="/calendario" className={`nav-link${path === '/calendario' ? ' active' : ''}`}>
          📅 Calendario
        </Link>
      </nav>
    </header>
  );
}
