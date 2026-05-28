import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getFestivales, getFestivalBySlug, toSlug } from '@/lib/festivales';
import { Festival } from '@/lib/types';

const SITE = 'https://festivalesdeargentina.com.ar';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const festivales = await getFestivales();
  return festivales.map(f => ({ slug: toSlug(f.titulo) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const f = await getFestivalBySlug(slug);
  if (!f) return { title: 'Festival no encontrado' };

  const title = `${f.titulo} | Festivales de Argentina`;
  const description = f.descripcion || `${f.titulo} — ${f.ubicacion}, Argentina.`;
  const url = `${SITE}/festivales/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Festivales de Argentina',
      locale: 'es_AR',
      type: 'article',
      ...(f.imagen ? { images: [{ url: f.imagen, width: 600, height: 400, alt: f.titulo }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(f.imagen ? { images: [f.imagen] } : {}),
    },
  };
}

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

function formatRangoLargo(inicio: string, fin: string): string {
  if (!inicio) return '';
  const d1 = new Date(inicio + 'T12:00:00');
  const d2 = fin ? new Date(fin + 'T12:00:00') : null;
  const full: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  const short: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  if (!d2 || d2.getTime() === d1.getTime()) {
    return d1.toLocaleDateString('es-AR', full);
  }
  if (d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()) {
    return `${d1.getDate()} al ${d2.toLocaleDateString('es-AR', full)}`;
  }
  return `${d1.toLocaleDateString('es-AR', short)} al ${d2.toLocaleDateString('es-AR', full)}`;
}

function buildEventSchema(f: Festival, slug: string) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: f.titulo,
    description: f.descripcion,
    url: `${SITE}/festivales/${slug}`,
    location: {
      '@type': 'Place',
      name: f.ubicacion,
      address: {
        '@type': 'PostalAddress',
        addressLocality: f.ubicacion,
        addressCountry: 'AR',
      },
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  };
  if (f.fecha_inicio) schema.startDate = f.fecha_inicio;
  schema.endDate = f.fecha_fin || f.fecha_inicio || undefined;
  if (f.imagen) schema.image = f.imagen;
  if (f.link) schema.mainEntityOfPage = f.link;
  if (f.gratuito !== undefined) schema.isAccessibleForFree = f.gratuito;
  schema.organizer = { '@type': 'Organization', name: 'Festivales de Argentina', url: 'https://festivalesdeargentina.com.ar' };
  schema.offers = { '@type': 'Offer', availability: 'https://schema.org/InStock', price: '0', priceCurrency: 'ARS' };
  schema.performer = { '@type': 'PerformingGroup', name: 'Artistas del festival' };
  return schema;
}

export default async function FestivalPage({ params }: Props) {
  const { slug } = await params;
  const f = await getFestivalBySlug(slug);
  if (!f) notFound();

  const jsonLd = JSON.stringify(buildEventSchema(f, slug)).replace(/<\/script/gi, '<\\/script');
  const rangoFecha = formatRangoLargo(f.fecha_inicio, f.fecha_fin);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      {/* Hero image */}
      {f.imagen && (
        <div style={{ position: 'relative', width: '100%', height: '42vh', minHeight: 240, overflow: 'hidden' }}>
          <Image
            src={f.imagen}
            alt={f.titulo}
            fill
            style={{ objectFit: 'cover', filter: 'brightness(0.5) saturate(0.85)' }}
            priority
            unoptimized
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, var(--bg) 100%)',
          }} />
        </div>
      )}

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '2.5rem 5vw 6rem' }}>

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" style={{ fontSize: '.78rem', color: 'var(--gris)', marginBottom: '1.5rem' }}>
          <a href="/" style={{ color: 'var(--gris)', textDecoration: 'none' }}>Inicio</a>
          {' › '}
          <span style={{ color: 'var(--blanco)' }}>{f.titulo}</span>
        </nav>

        {/* Category pill */}
        <span style={{
          display: 'inline-block',
          fontSize: '.72rem',
          fontWeight: 700,
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          padding: '.28rem .9rem',
          borderRadius: 20,
          border: '1px solid var(--celeste)',
          color: 'var(--celeste)',
          marginBottom: '1rem',
          opacity: .9,
        }}>
          {CAT_LABEL[f.categoria] || f.categoria}
        </span>

        {/* H1 */}
        <h1 style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          letterSpacing: '.04em',
          color: 'var(--blanco)',
          lineHeight: 1.05,
          marginBottom: '1.25rem',
        }}>
          {f.titulo}
        </h1>

        {/* Meta row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '.75rem 1.25rem',
          marginBottom: '2rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--borde)',
        }}>
          {rangoFecha && (
            <span style={{ fontSize: '.9rem', color: 'var(--dorado)', fontWeight: 700 }}>
              🗓 {rangoFecha}
            </span>
          )}
          <span style={{ fontSize: '.9rem', color: 'rgba(240,246,255,0.7)' }}>
            📍 {f.ubicacion}
          </span>
          {f.gratuito && (
            <span style={{
              fontSize: '.78rem',
              fontWeight: 700,
              padding: '.2rem .7rem',
              borderRadius: 5,
              background: 'rgba(232,184,48,0.1)',
              color: 'var(--dorado)',
              border: '1px solid var(--borde2)',
            }}>
              🆓 Entrada gratuita
            </span>
          )}
        </div>

        {/* Description */}
        <p style={{
          fontSize: '1.08rem',
          color: 'rgba(240,246,255,0.82)',
          lineHeight: 1.78,
          marginBottom: '2.5rem',
          borderLeft: '3px solid var(--celeste)',
          paddingLeft: '1.25rem',
        }}>
          {f.descripcion}
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(f.ubicacion + ' Argentina')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.45rem',
              padding: '.65rem 1.4rem',
              borderRadius: 8,
              border: '1px solid var(--borde)',
              color: 'rgba(240,246,255,0.7)',
              textDecoration: 'none',
              fontSize: '.9rem',
              fontWeight: 600,
              background: 'var(--bg2)',
            }}
          >
            📍 Ver en mapa
          </a>
          {f.link && (
            <a
              href={f.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.45rem',
                padding: '.65rem 1.4rem',
                borderRadius: 8,
                background: 'var(--celeste)',
                color: 'var(--bg)',
                textDecoration: 'none',
                fontSize: '.9rem',
                fontWeight: 700,
              }}
            >
              Sitio oficial →
            </a>
          )}
        </div>

        {/* Back link */}
        <a href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '.4rem',
          fontSize: '.85rem',
          color: 'var(--gris)',
          textDecoration: 'none',
        }}>
          ← Volver a todos los festivales
        </a>
      </main>
    </>
  );
}
