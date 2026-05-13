import { getFestivales, agruparPorMes, formatFecha } from '@/lib/festivales';
import { MES_EMOJI, MES_VIBE } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calendario de Festivales 2027 | Festivales de Argentina',
  description: 'Todos los festivales y fiestas populares de Argentina ordenados mes a mes. Planificá tu agenda cultural 2027.',
};

const CAT_COLOR: Record<string, string> = {
  folklore: '#5A6B3A', gastro: '#D4923A', musica: '#1C2B3A',
  carnaval: '#C4593A', doma: '#B07D4F', artesania: '#8B5E35',
  tango: '#2C1E0F', cine: '#1C2B3A',
};

const CAT_LABEL: Record<string, string> = {
  folklore: '🎵 Folklore', gastro: '🍽️ Gastronomía', musica: '🎸 Música',
  carnaval: '🎭 Carnaval', doma: '🐎 Doma', artesania: '🌍 Cultura',
  tango: '💃 Tango', cine: '🎬 Cine',
};

export default async function CalendarioPage() {
  const festivales = await getFestivales();
  const porMes = agruparPorMes(festivales);
  const meses = Object.keys(porMes);

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 2rem' }}>

      {/* Encabezado */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-block',
          background: 'var(--terracota)',
          color: '#fff',
          fontSize: '.75rem',
          fontWeight: 700,
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          padding: '.35rem 1rem',
          borderRadius: 20,
          marginBottom: '1rem',
        }}>
          📅 Vista Anual
        </div>
        <h1 style={{
          fontFamily: 'var(--font-fraunces,Fraunces,serif)',
          fontSize: 'clamp(2rem,5vw,3.5rem)',
          fontWeight: 900,
          color: 'var(--texto)',
          lineHeight: 1.1,
          marginBottom: '.75rem',
        }}>
          Calendario <em style={{ fontStyle: 'italic', color: 'var(--terracota)' }}>2027</em>
        </h1>
        <p style={{ color: 'var(--texto2)', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto' }}>
          {festivales.length} festivales distribuidos a lo largo del año. Planificá tu agenda cultural.
        </p>
      </div>

      {/* Índice rápido de meses */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '.5rem',
        justifyContent: 'center',
        marginBottom: '3rem',
        padding: '1.25rem',
        background: 'var(--crema2)',
        borderRadius: 16,
        border: '1px solid var(--arena)',
      }}>
        {meses.map(mes => (
          <a
            key={mes}
            href={`#cal-${mes}`}
            style={{
              padding: '.35rem .85rem',
              borderRadius: 20,
              fontSize: '.82rem',
              fontWeight: 600,
              textDecoration: 'none',
              background: 'var(--blanco)',
              color: 'var(--texto2)',
              border: '1px solid var(--arena)',
              transition: 'all .2s',
            }}
          >
            {MES_EMOJI[mes]} {mes}
            <span style={{
              marginLeft: '.4rem',
              background: 'var(--terracota)',
              color: '#fff',
              fontSize: '.65rem',
              padding: '.1rem .45rem',
              borderRadius: 8,
              fontWeight: 700,
            }}>
              {porMes[mes].length}
            </span>
          </a>
        ))}
      </div>

      {/* Timeline por mes */}
      {meses.map(mes => (
        <section key={mes} id={`cal-${mes}`} style={{ marginBottom: '3.5rem' }}>

          {/* Encabezado del mes */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            paddingBottom: '.75rem',
            borderBottom: '2px solid var(--arena)',
          }}>
            <div style={{
              fontFamily: 'var(--font-fraunces,Fraunces,serif)',
              fontSize: '2rem',
              fontWeight: 900,
              color: 'var(--texto)',
            }}>
              {MES_EMOJI[mes]} {mes}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '.88rem', color: 'var(--texto2)', fontStyle: 'italic' }}>
                {MES_VIBE[mes]}
              </div>
            </div>
            <div style={{
              fontSize: '.78rem',
              fontWeight: 700,
              color: 'var(--terracota)',
              background: 'rgba(196,89,58,0.1)',
              padding: '.2rem .65rem',
              borderRadius: 12,
            }}>
              {porMes[mes].length} {porMes[mes].length === 1 ? 'festival' : 'festivales'}
            </div>
          </div>

          {/* Eventos del mes */}
          <div className="calendar-month">
            {porMes[mes].map(f => {
              const inicio = formatFecha(f.fecha_inicio);
              const fin = formatFecha(f.fecha_fin);
              const mismoMes = inicio.mes === fin.mes;

              return (
                <div key={f.id} className="calendar-event">
                  {/* Fecha */}
                  <div className="calendar-date">
                    <span>{inicio.dia}</span>
                    {!mismoMes || inicio.dia !== fin.dia ? (
                      <span style={{ fontSize: '.7rem', fontWeight: 500, color: 'var(--tierra)' }}>
                        al {fin.dia}
                      </span>
                    ) : null}
                    <span style={{ fontSize: '.65rem', fontWeight: 600, color: 'var(--tierra2)', marginTop: '.1rem' }}>
                      {inicio.mes}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="calendar-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.2rem' }}>
                      <h3 className="calendar-title">{f.titulo}</h3>
                      <span style={{
                        fontSize: '.65rem',
                        fontWeight: 700,
                        padding: '.15rem .5rem',
                        borderRadius: 8,
                        background: CAT_COLOR[f.categoria] || 'var(--tierra)',
                        color: '#fff',
                        whiteSpace: 'nowrap',
                      }}>
                        {CAT_LABEL[f.categoria] || f.categoria}
                      </span>
                      {f.gratuito && (
                        <span style={{
                          fontSize: '.65rem',
                          fontWeight: 700,
                          padding: '.15rem .5rem',
                          borderRadius: 8,
                          background: 'rgba(90,107,58,0.15)',
                          color: 'var(--verde-oliva)',
                        }}>
                          🆓 Gratis
                        </span>
                      )}
                    </div>
                    <p className="calendar-loc">📍 {f.ubicacion}</p>
                    <p className="calendar-desc">{f.descripcion}</p>
                  </div>

                  {/* Imagen miniatura */}
                  {f.imagen && (
                    <div style={{
                      width: 70,
                      height: 70,
                      borderRadius: 10,
                      overflow: 'hidden',
                      flexShrink: 0,
                      display: 'none',
                    }}
                    className="calendar-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={f.imagen}
                        alt={f.titulo}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* CTA volver */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <a
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '.5rem',
            background: 'var(--terracota)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '.95rem',
            padding: '.75rem 2rem',
            borderRadius: 25,
            textDecoration: 'none',
            transition: 'all .25s',
            boxShadow: '0 4px 15px rgba(196,89,58,0.35)',
          }}
        >
          🗺️ Ver festivales con fotos
        </a>
      </div>
    </main>
  );
}
