'use client';

import { useState, useMemo } from 'react';
import { Festival, MESES, MES_EMOJI, MES_VIBE } from '@/lib/types';
import FestivalCard from './FestivalCard';

const CAT_EMOJI: Record<string, string> = {
  folklore: '🎵', gastro: '🍽️', musica: '🎸', carnaval: '🎭',
  artesania: '🌍', doma: '🐎', tango: '💃', cine: '🎬',
};

export default function FestivalGrid({ festivales }: { festivales: Festival[] }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('');
  const [mesActivo, setMesActivo] = useState(0);

  const filtrados = useMemo(() => {
    return festivales.filter(f => {
      const matchQ = !query || [f.titulo, f.ubicacion, f.descripcion, f.mes]
        .join(' ').toLowerCase().includes(query.toLowerCase());
      const matchC = !cat || f.categoria === cat;
      const matchM = mesActivo === 0 || f.mes === MESES[mesActivo - 1];
      return matchQ && matchC && matchM;
    });
  }, [festivales, query, cat, mesActivo]);

  const porMes = useMemo(() => {
    return MESES.map(mes => ({
      mes,
      festivales: filtrados.filter(f => f.mes === mes),
    })).filter(g => g.festivales.length > 0);
  }, [filtrados]);

  function scrollToMes(idx: number) {
    setMesActivo(idx);
    if (idx > 0) {
      const el = document.getElementById(`mes-${MESES[idx - 1]}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <>
      {/* MES NAV */}
      <nav style={{
        background: 'var(--azul-noche)',
        padding: '.7rem 2rem',
        display: 'flex',
        gap: '.4rem',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        position: 'sticky',
        top: 65,
        zIndex: 40,
      }}>
        {[{ label: 'Todos', idx: 0 }, ...MESES.map((m, i) => ({ label: `${MES_EMOJI[m]} ${m}`, idx: i + 1 }))].map(({ label, idx }) => (
          <button
            key={idx}
            onClick={() => scrollToMes(idx)}
            className={mesActivo === idx ? 'month-btn-active' : ''}
            style={{
              background: mesActivo === idx ? 'var(--terracota)' : 'transparent',
              border: `1px solid ${mesActivo === idx ? 'var(--terracota)' : 'rgba(245,238,216,0.18)'}`,
              color: mesActivo === idx ? '#fff' : 'rgba(245,238,216,0.6)',
              padding: '.38rem .85rem',
              borderRadius: 20,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '.82rem',
              whiteSpace: 'nowrap',
              transition: 'all .2s',
              fontWeight: mesActivo === idx ? 700 : 500,
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* FILTER BAR */}
      <div style={{
        background: 'var(--crema2)',
        borderBottom: '1px solid var(--arena)',
        padding: '1rem 2rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '.6rem',
        alignItems: 'center',
      }}>
        <input
          type="text"
          placeholder="🔍 Buscar festival, ciudad, provincia..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            background: 'var(--blanco)',
            border: '1.5px solid var(--arena)',
            color: 'var(--texto)',
            padding: '.6rem 1.1rem',
            borderRadius: 25,
            fontFamily: 'inherit',
            fontSize: '.9rem',
            width: 270,
            outline: 'none',
            boxShadow: '0 1px 4px var(--sombra)',
          }}
        />
        {Object.entries(CAT_EMOJI).map(([c, emoji]) => (
          <button
            key={c}
            onClick={() => setCat(cat === c ? '' : c)}
            style={{
              padding: '.38rem .85rem',
              borderRadius: 20,
              fontSize: '.82rem',
              fontWeight: 600,
              border: `1.5px solid ${cat === c ? 'var(--terracota)' : 'var(--arena)'}`,
              background: cat === c ? 'var(--terracota)' : 'transparent',
              color: cat === c ? '#fff' : 'var(--texto2)',
              cursor: 'pointer',
              transition: 'all .2s',
            }}
          >
            {emoji} {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
        {(query || cat) && (
          <button
            onClick={() => { setQuery(''); setCat(''); }}
            style={{
              padding: '.38rem .85rem',
              borderRadius: 20,
              fontSize: '.82rem',
              fontWeight: 600,
              border: '1.5px solid var(--arena)',
              background: 'transparent',
              color: 'var(--texto2)',
              cursor: 'pointer',
            }}
          >
            ✕ Todos
          </button>
        )}
      </div>

      {/* SECCIONES POR MES */}
      <main>
        {porMes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--texto2)' }}>
            <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</p>
            <p>No encontramos festivales con esa búsqueda.</p>
          </div>
        ) : (
          porMes.map(({ mes, festivales: fests }) => (
            <section key={mes} id={`mes-${mes}`} className="month-section">
              <div className="month-header">
                <h2>{MES_EMOJI[mes]} {mes}</h2>
                <span className="month-vibe">{MES_VIBE[mes]}</span>
                <span className="month-count">{fests.length} {fests.length === 1 ? 'festival' : 'festivales'}</span>
              </div>
              <div className="cards-grid">
                {fests.map(f => <FestivalCard key={f.id} festival={f} />)}
              </div>
            </section>
          ))
        )}
      </main>
    </>
  );
}
