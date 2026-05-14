'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const path = usePathname();

  return (
    <header className="navbar">
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <Image
          src="/LOGO_FESTIVALES.jpeg"
          alt="Festivales de Argentina"
          height={48}
          width={160}
          style={{ height: 48, width: 'auto', objectFit: 'contain' }}
          priority
        />
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
