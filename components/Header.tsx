'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 border-b-2 shadow-sm"
      style={{ background: 'rgba(245,238,216,0.95)', backdropFilter: 'blur(14px)', borderColor: 'var(--arena)', boxShadow: '0 2px 20px var(--sombra)' }}>

      <Link href="/" className="logo" style={{ fontFamily: 'var(--font-fraunces,Fraunces,serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--texto)', lineHeight: 1.1, textDecoration: 'none' }}>
        Festivales de <span style={{ color: 'var(--terracota)', fontStyle: 'italic' }}>Argentina</span>
        <small style={{ display: 'block', fontFamily: 'DM Sans,sans-serif', fontSize: '.7rem', fontWeight: 400, color: 'var(--texto2)', fontStyle: 'normal', letterSpacing: '.04em' }}>
          Directorio Oficial 2027
        </small>
      </Link>

      <nav className="flex items-center gap-2">
        <Link href="/" style={{
          padding: '.38rem .9rem',
          borderRadius: 20,
          fontSize: '.85rem',
          fontWeight: 600,
          textDecoration: 'none',
          background: path === '/' ? 'var(--terracota)' : 'transparent',
          color: path === '/' ? '#fff' : 'var(--texto2)',
          border: `1.5px solid ${path === '/' ? 'var(--terracota)' : 'var(--arena)'}`,
          transition: 'all .2s',
        }}>
          🗺️ Festivales
        </Link>
        <Link href="/calendario" style={{
          padding: '.38rem .9rem',
          borderRadius: 20,
          fontSize: '.85rem',
          fontWeight: 600,
          textDecoration: 'none',
          background: path === '/calendario' ? 'var(--terracota)' : 'transparent',
          color: path === '/calendario' ? '#fff' : 'var(--texto2)',
          border: `1.5px solid ${path === '/calendario' ? 'var(--terracota)' : 'var(--arena)'}`,
          transition: 'all .2s',
        }}>
          📅 Calendario
        </Link>
      </nav>
    </header>
  );
}
