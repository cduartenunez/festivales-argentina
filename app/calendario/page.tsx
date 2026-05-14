import { getFestivales, agruparPorMes, formatFecha } from '@/lib/festivales';
import { MES_EMOJI, MES_VIBE } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calendario 2027 | Festivales de Argentina',
  description: 'Todos los festivales ordenados mes a mes. Planificá tu agenda cultural 2027.',
};

const CAT_COLOR: Record<string, string> = {
  folklore:  'rgba(116,172,223,0.15)', gastro:   'rgba(232,184,48,0.15)',
  musica:    'rgba(160,100,220,0.15)', carnaval: 'rgba(255,80,120,0.15)',
  doma:      'rgba(232,184,48,0.12)', artesania: 'rgba(80,180,130,0.15)',
  tango:     'rgba(255,60,60,0.15)',  cine:      'rgba(116,172,223,0.12)',
};

const CAT_TEXT: Record<string, string> = {
  folklore:  '#74ACDF', gastro:   '#E8B830',
  musica:    '#b87fff', carnaval: '#ff7096',
  doma:      '#c9a840', artesania: '#5fcc9a',
  tango:     '#ff6b6b', cine:     '#a0c8ef',
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
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 5vw 5rem' }}>

      {/* Encabezado */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-block',
          border: '1px solid var(--celeste)',
          color: 'var(--celeste)',
          fontSize: '.72rem',
          fontWeight: 700,
          letterSpacing: '.15em',
          textTransform: 'uppercase',
          padding: '.3rem 1rem',
          borderRadius: 20,
          marginBottom: '1rem',
          opacity: .9,
        }}>
          📅 Vista Anual
        </div>

        <h1 style={{
          fontFamily: 'var(--font-bebas,Bebas Neue,sans-serif)',
          fontSize: 'clamp(3rem,7vw,5.5rem)',
          letterSpacing: '.04em',
          color: 'var(--blanco)',
          lineHeight: 1,
          marginBottom: '.75rem',
        }}>
          Calendario <span style={{ color: 'var(--dorado)' }}>2027</span>
        </h1>

        <p style={{ color: 'var(--gris)', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>
          {festivales.length} festivales distribuidos mes a mes. Planificá tu agenda.
        </p>
      </div>

      {/* Índice rápido */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '.5rem',
        justifyContent: 'center',
        marginBottom: '3rem',
        padding: '1.25rem',
        background: 'var(--bg2)',
        borderRadius: 12,
        border: '1px solid var(--borde)',
      }}>
        {meses.map(mes => (
          <a key={mes} href={`#cal-${mes}`} style={{
            padding: '.35rem .85rem',
            borderRadius: 6,
            fontSize: '.8rem',
            fontWeight: 600,
            textDecoration: 'none',
            background: 'var(--bg3)',
            color: 'var(--gris)',
            border: '1px solid var(--borde)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '.4rem',
            transition: 'all .2s',
          }}>
            {MES_EMOJI[mes]} {mes}
            <span style={{
              background: 'var(--celeste)',
              color: 'var(--bg)',
              fontSize: '.62rem',
              padding: '.1rem .4rem',
              borderRadius: 4,
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
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            paddingBottom: '.85rem',
            borderBottom: '1px solid var(--borde)',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-bebas,Bebas Neue,sans-serif)',
              fontSize: '2rem',
              letterSpacing: '.04em',
              color: 'var(--blanco)',
            }}>
              {MES_EMOJI[mes]} {mes}
            </h2>
            <span style={{ fontSize: '.85rem', color: 'var(--gris)', fontStyle: 'italic', flex: 1 }}>
              {MES_VIBE[mes]}
            </span>
            <span style={{
              fontSize: '.7rem',
              fontWeight: 700,
              color: 'var(--dorado)',
              background: 'rgba(232,184,48,0.08)',
              border: '1px solid var(--borde2)',
              padding: '.18rem .6rem',
              borderRadius: 5,
            }}>
              {porMes[mes].length} festivales
            </span>
          </div>

          <div className="calendar-month">
            {porMes[mes].map(f => {
              const ini = formatFecha(f.fecha_inicio);
              const fin = formatFecha(f.fecha_fin);
              const mismo = ini.mes === fin.mes && ini.dia !== fin.dia;

              return (
                <div key={f.id} className="calendar-event">
                  {/* Fecha */}
                  <div className="calendar-date">
                    <span>{ini.dia}</span>
                    {mismo && (
                      <span style={{ fontSize: '.62rem', color: 'var(--gris)', display: 'block' }}>
                        al {fin.dia}
                      </span>
                    )}
                    <span style={{ fontSize: '.62rem', color: 'var(--gris)', letterSpacing: '.04em' }}>
                      {ini.mes}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="calendar-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.2rem' }}>
                      <h3 className="calendar-title">{f.titulo}</h3>
                      <span style={{
                        fontSize: '.62rem',
                        fontWeight: 700,
                        padding: '.15rem .5rem',
                        borderRadius: 4,
                        background: CAT_COLOR[f.categoria] || 'var(--bg3)',
                        color: CAT_TEXT[f.categoria] || 'var(--celeste)',
                        border: `1px solid ${CAT_TEXT[f.categoria] || 'var(--celeste)'}33`,
                      }}>
                        {CAT_LABEL[f.categoria] || f.categoria}
                      </span>
                      {f.gratuito && (
                        <span style={{
                          fontSize: '.62rem',
                          fontWeight: 700,
                          padding: '.15rem .5rem',
                          borderRadius: 4,
                          background: 'rgba(232,184,48,0.1)',
                          color: 'var(--dorado)',
                          border: '1px solid var(--borde2)',
                        }}>
                          🆓 Gratis
                        </span>
                      )}
                    </div>
                    <p className="calendar-loc">📍 {f.ubicacion}</p>
                    <p className="calendar-desc">{f.descripcion}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* CTA volver */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <a href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '.5rem',
          background: 'var(--celeste)',
          color: 'var(--bg)',
          fontWeight: 700,
          fontSize: '.95rem',
          padding: '.75rem 2rem',
          borderRadius: 8,
          textDecoration: 'none',
          transition: 'all .2s',
        }}>
          🗺️ Ver festivales con fotos
        </a>
      </div>
    </main>
  );
}
