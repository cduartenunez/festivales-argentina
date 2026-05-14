'use client';

import { useState, useMemo } from 'react';
import { Festival, MESES, MES_EMOJI, MES_VIBE } from '@/lib/types';
import FestivalCard from './FestivalCard';

const CATEGORIAS = [
  { key: 'folklore',  label: '🎵 Folklore'    },
  { key: 'gastro',    label: '🍽️ Gastronomía' },
  { key: 'musica',    label: '🎸 Música'       },
  { key: 'carnaval',  label: '🎭 Carnaval'     },
  { key: 'artesania', label: '🌍 Cultura'      },
  { key: 'doma',      label: '🐎 Doma'         },
  { key: 'tango',     label: '💃 Tango'        },
  { key: 'cine',      label: '🎬 Cine'         },
];

type TipoMes = 'actual' | 'siguiente' | 'anterior' | 'seleccionado';

interface Props {
  festivales: Festival[];
  mesActual: string;
}

export default function FestivalGrid({ festivales, mesActual }: Props) {
  const [query,      setQuery]      = useState('');
  const [cat,        setCat]        = useState('');
  const [mesFiltro,  setMesFiltro]  = useState<string | null>(null);

  // Calcular trimestre desde el mes actual
  const currentIdx  = MESES.indexOf(mesActual);
  const mesSiguiente = MESES[(currentIdx + 1) % 12];
  const mesAnterior  = MESES[(currentIdx + 11) % 12];

  // Secciones a renderizar: trimestre o mes seleccionado
  const secciones: { mes: string; tipo: TipoMes }[] = mesFiltro
    ? [{ mes: mesFiltro, tipo: 'seleccionado' }]
    : [
        { mes: mesAnterior,  tipo: 'anterior'  },
        { mes: mesActual,    tipo: 'actual'    },
        { mes: mesSiguiente, tipo: 'siguiente' },
      ];

  // Filtrar festivales aplicando búsqueda y categoría
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
        {/* Botón trimestre */}
        <button
          onClick={() => setMesFiltro(null)}
          className={`month-btn${mesFiltro === null ? ' mes-active' : ''}`}
          title="Volver al trimestre actual"
        >
          🗓 Trimestre
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
            {MES_EMOJI[mes]} {mes}
          </button>
        ))}
      </nav>

      {/* ── FILTER BAR ────────────────────────────── */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="🔍 Buscar festival, ciudad, provincia..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {CATEGORIAS.map(({ key, label }) => (
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
            ✕ Limpiar
          </button>
        )}
      </div>

      {/* ── GRILLA ────────────────────────────────── */}
      <main>
        {secciones.map(({ mes, tipo }) => {
          const fests = festsPorMes(mes);
          if (fests.length === 0 && (query || cat)) return null;

          const esActual    = tipo === 'actual';
          const esAnterior  = tipo === 'anterior';

          return (
            <section
              key={mes}
              id={`mes-${mes}`}
              className={`month-section${esActual ? ' month-section-actual' : ''}${esAnterior ? ' month-section-anterior' : ''}`}
            >
              <div className="month-header">
                <h2 style={esActual ? { fontSize: '2.8rem' } : undefined}>
                  {MES_EMOJI[mes]} {mes}
                </h2>

                {/* Badge solo en mes actual */}
                {esActual && (
                  <span className="badge-mes-actual">🗓 Este mes</span>
                )}

                <span className="month-vibe">{MES_VIBE[mes]}</span>
                <span className="month-count">
                  {fests.length} {fests.length === 1 ? 'festival' : 'festivales'}
                </span>
              </div>

              {fests.length === 0 ? (
                <p style={{ color: 'var(--gris)', fontSize: '.9rem', padding: '1rem 0' }}>
                  Sin resultados para este filtro.
                </p>
              ) : (
                <div className="cards-grid">
                  {fests.map(f => <FestivalCard key={f.id} festival={f} />)}
                </div>
              )}
            </section>
          );
        })}

        {/* Vacío global */}
        {secciones.every(({ mes }) => festsPorMes(mes).length === 0) && (query || cat) && (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--gris)' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</p>
            <p>No encontramos festivales con esa búsqueda.</p>
          </div>
        )}
      </main>
    </>
  );
}
