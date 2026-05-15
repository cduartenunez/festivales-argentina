'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Festival } from '@/lib/types';

const CAT_LABEL: Record<string, string> = {
  folklore:  '🎵 Folklore',
  gastro:    '🍽️ Gastronomía',
  musica:    '🎸 Música',
  carnaval:  '🎭 Carnaval',
  doma:      '🐎 Doma',
  artesania: '🌍 Cultura',
  tango:     '💃 Tango',
  cine:      '🎬 Cine',
};

const MESES_CORTO = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];

function formatRango(inicio: string, fin: string): string {
  if (!inicio) return '';
  const d1 = new Date(inicio + 'T12:00:00');
  const d2 = fin ? new Date(fin + 'T12:00:00') : d1;
  const m1 = MESES_CORTO[d1.getMonth()];
  const m2 = MESES_CORTO[d2.getMonth()];
  if (m1 === m2 && d1.getDate() === d2.getDate()) return `${d1.getDate()} ${m1}`;
  if (m1 === m2) return `${d1.getDate()}–${d2.getDate()} ${m1}`;
  return `${d1.getDate()} ${m1} – ${d2.getDate()} ${m2}`;
}

export default function FestivalCard({ festival: f }: { festival: Festival }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card${flipped ? ' flipped' : ''}`}
      onClick={() => !flipped && setFlipped(true)}
      style={{ cursor: flipped ? 'default' : 'pointer' }}
    >
      <div className="flip-card-inner">

        {/* ── FRENTE ─────────────────────────────── */}
        <div className="flip-card-front event-card">
          <div className="card-img-wrap">
            {f.imagen ? (
              <Image
                src={f.imagen}
                alt={f.titulo}
                width={600}
                height={400}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
                unoptimized
              />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #070f1e, #0d1a30)' }} />
            )}
            <span className={`card-cat-pill cat-${f.categoria}`}>
              {CAT_LABEL[f.categoria] || f.categoria}
            </span>
            {f.fecha_inicio && (
              <span className="card-date-pill">
                {formatRango(f.fecha_inicio, f.fecha_fin)}
              </span>
            )}
          </div>

          <div className="card-body">
            <h3 className="card-title">{f.titulo}</h3>
            <p className="card-loc">📍 {f.ubicacion}</p>
            <p className="card-desc">{f.descripcion}</p>
            <div className="card-tags">
              {f.gratuito && <span className="tag hot">🆓 Gratuito</span>}
              <span className="tag">{f.mes}</span>
            </div>
            <span style={{ fontSize: '.72rem', color: 'rgba(116,172,223,0.4)', marginTop: 'auto', display: 'block', paddingTop: '.5rem' }}>
              Tocá para más info →
            </span>
          </div>
        </div>

        {/* ── REVERSO ────────────────────────────── */}
        <div className="flip-card-back">
          {/* Header con imagen de fondo difuminada */}
          {f.imagen && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', borderRadius: '12px' }}>
              <Image
                src={f.imagen}
                alt=""
                fill
                style={{ objectFit: 'cover', filter: 'blur(20px) brightness(0.25) saturate(0.5)', transform: 'scale(1.1)' }}
                unoptimized
                aria-hidden
              />
            </div>
          )}

          <div className="flip-back-body">
            {/* Categoría */}
            <span className={`card-cat-pill cat-${f.categoria}`} style={{ position: 'static', marginBottom: '.75rem', alignSelf: 'flex-start' }}>
              {CAT_LABEL[f.categoria] || f.categoria}
            </span>

            {/* Título */}
            <h3 style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '1.7rem',
              letterSpacing: '.03em',
              color: 'var(--blanco)',
              lineHeight: 1.1,
              marginBottom: '.5rem',
            }}>
              {f.titulo}
            </h3>

            {/* Fechas */}
            {f.fecha_inicio && (
              <p style={{ fontSize: '.8rem', color: 'var(--dorado)', fontWeight: 700, marginBottom: '.5rem' }}>
                🗓 {formatRango(f.fecha_inicio, f.fecha_fin)} · {f.mes}
              </p>
            )}

            {/* Descripción completa */}
            <p style={{ fontSize: '.85rem', color: 'rgba(240,246,255,0.8)', lineHeight: 1.6, flex: 1, marginBottom: '.75rem' }}>
              {f.descripcion}
            </p>

            {/* Tags */}
            <div className="card-tags" style={{ marginBottom: '.75rem' }}>
              {f.gratuito && <span className="tag hot">🆓 Gratuito</span>}
              <span className="tag">{f.mes}</span>
            </div>

            {/* Botones */}
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(f.ubicacion + ' Argentina')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flip-btn flip-btn-ghost"
              >
                📍 {f.ubicacion}
              </a>

              {f.link && (
                <a
                  href={f.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flip-btn flip-btn-primary"
                >
                  Más info →
                </a>
              )}

              <button
                onClick={e => { e.stopPropagation(); setFlipped(false); }}
                className="flip-btn flip-btn-ghost"
              >
                ← Volver
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
