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
  return (
    <div className="event-card">
      <div className="card-img-wrap">
        {f.imagen ? (
          <Image
            src={f.imagen}
            alt={f.titulo}
            width={600}
            height={400}
            className="card-img"
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

        <a
          className="card-maps-btn"
          href={`https://maps.google.com/?q=${encodeURIComponent(f.ubicacion + ' Argentina')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg style={{ width: 13, height: 13, fill: 'currentColor', flexShrink: 0 }} viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          Cómo llegar
        </a>
      </div>
    </div>
  );
}
