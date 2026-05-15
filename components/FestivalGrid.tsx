'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Festival, MESES, MES_EMOJI, MES_VIBE } from '@/lib/types';
import { useLang } from '@/context/LangContext';
import { t } from '@/lib/i18n';
import FestivalCard from './FestivalCard';

type TipoMes = 'actual' | 'siguiente' | 'anterior' | 'seleccionado';

interface Props {
  festivales: Festival[];
  mesActual: string;
}

export default function FestivalGrid({ festivales, mesActual }: Props) {
  const [query,     setQuery]     = useState('');
  const [cat,       setCat]       = useState('');
  const [mesFiltro, setMesFiltro] = useState<string | null>(null);

  const { lang } = useLang();
  const tx = t(lang);

  const currentIdx   = MESES.indexOf(mesActual);
  const mesSiguiente = MESES[(currentIdx + 1) % 12];
  const mesAnterior  = MESES[(currentIdx + 11) % 12];

  const secciones: { mes: string; tipo: TipoMes }[] = mesFiltro
    ? [{ mes: mesFiltro, tipo: 'seleccionado' }]
    : [
        { mes: mesAnterior,  tipo: 'anterior'  },
        { mes: mesActual,    tipo: 'actual'    },
        { mes: mesSiguiente, tipo: 'siguiente' },
      ];

  const festsPorMes = useMemo(() => {
    return (mes: string) =>
      festivales.filter(f => {
        if (f.mes !== mes) return false;
        const texto = [f.titulo, f.ubicacion, f.descripcion].join(' ').toLowerCase();
        const matchQ = !query || texto.includes(query.toLowerCase());
        const matchC = !cat   || f.categoria === cat;
        return matchQ && matchC;
      });
  }, [festivales, query, cat]);

  return (
    <>
      {/* ── SELECTOR DE MESES ──────────────────────── */}
      <nav className="month-nav">
        <button
          onClick={() => setMesFiltro(null)}
          className={`month-btn${mesFiltro === null ? ' mes-active' : ''}`}
          title={lang === 'es' ? 'Volver al trimestre actual' : 'Back to current quarter'}
        >
          {tx.nav.quarter}
        </button>

        <span style={{ width: 1, background: 'rgba(116,172,223,0.15)', margin: '0 .25rem', alignSelf: 'stretch' }} />

        {MESES.map(mes => (
          <button
            key={mes}
            onClick={() => setMesFiltro(mes === mesFiltro ? null : mes)}
            className={`month-btn${
              mesFiltro === mes
                ? ' mes-active'
                : mes === mesActual && !mesFiltro
                ? ' mes-hoy'
                : ''
            }`}
          >
            {MES_EMOJI[mes]} {tx.mesLabel(mes)}
          </button>
        ))}
      </nav>

      {/* ── FILTER BAR ────────────────────────────── */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder={tx.search.placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {tx.categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setCat(cat === key ? '' : key)}
            className={`cat-btn${cat === key ? ' cat-active' : ''}`}
          >
            {label}
          </button>
        ))}
        {(query || cat) && (
          <button className="cat-btn" onClick={() => { setQuery(''); setCat(''); }}>
            {tx.search.clear}
          </button>
        )}
      </div>

      {/* ── SPONSORS ──────────────────────────────── */}
      <div className="sponsors-bar">
        <span className="sponsors-label">Sponsors</span>
        <a
          href="https://instagram.com/6segundos"
          target="_blank"
          rel="noopener noreferrer"
          className="sponsor-item"
        >
          <Image
            src="/6seg_logo_rosa.png"
            alt="6 Segundos"
            width={60}
            height={60}
            style={{ borderRadius: '50%', objectFit: 'contain', flexShrink: 0 }}
          />
          <div>
            <div className="sponsor-name">6 Segundos</div>
            <div className="sponsor-handle">@6segundos</div>
          </div>
        </a>
      </div>

      {/* ── GRILLA ────────────────────────────────── */}
      <main>
        {secciones.map(({ mes, tipo }) => {
          const fests = festsPorMes(mes);
          if (fests.length === 0 && (query || cat)) return null;

          const esActual   = tipo === 'actual';
          const esAnterior = tipo === 'anterior';

          return (
            <section
              key={mes}
              id={`mes-${mes}`}
              className={`month-section${esActual ? ' month-section-actual' : ''}${esAnterior ? ' month-section-anterior' : ''}`}
            >
              <div className="month-header">
                <h2 style={esActual ? { fontSize: '2.8rem' } : undefined}>
                  {MES_EMOJI[mes]} {tx.mesLabel(mes)}
                </h2>

                {esActual && (
                  <span className="badge-mes-actual">{tx.nav.thisMonth}</span>
                )}

                <span className="month-vibe">{MES_VIBE[mes]}</span>
                <span className="month-count">{tx.search.count(fests.length)}</span>
              </div>

              {fests.length === 0 ? (
                <p style={{ color: 'var(--gris)', fontSize: '.9rem', padding: '1rem 0' }}>
                  {tx.search.noFilter}
                </p>
              ) : (
                <div className="cards-grid">
                  {fests.map(f => <FestivalCard key={f.id} festival={f} />)}
                </div>
              )}
            </section>
          );
        })}

        {secciones.every(({ mes }) => festsPorMes(mes).length === 0) && (query || cat) && (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--gris)' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</p>
            <p>{tx.search.noSearch}</p>
          </div>
        )}
      </main>
    </>
  );
}
