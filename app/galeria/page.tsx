import type { Metadata } from 'next';
import GaleriaForm from '@/components/GaleriaForm';
import { FESTIVALES_ESTATICOS } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Galería Comunitaria | Festivales de Argentina',
  description: 'Fotos de la comunidad en festivales de todo el país. Compartí tu momento.',
};

const FOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80',
    autor: 'Martín R.',
    festival: 'Fiesta Nacional de la Chaya',
    desc: 'La harina y el agua en La Rioja — una alegría única.',
  },
  {
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
    autor: 'Sofía L.',
    festival: 'Festival Nacional del Chamamé',
    desc: 'El acordeón llenando la noche correntina.',
  },
  {
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
    autor: 'Diego M.',
    festival: 'Carnaval de Gualeguaychú',
    desc: 'Comparsas bajo las luces del corsódromo.',
  },
  {
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
    autor: 'Paula V.',
    festival: 'Festival Nacional de Folklore de Cosquín',
    desc: 'La Plaza Próspero Molina vibra con el folklore.',
  },
  {
    src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80',
    autor: 'Tomás F.',
    festival: 'Cosquín Rock',
    desc: 'Tres días de rock en las sierras de Córdoba.',
  },
  {
    src: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80',
    autor: 'Lucía B.',
    festival: 'Fiesta Nacional de la Vendimia',
    desc: 'El Acto Central bajo las estrellas mendocinas.',
  },
  {
    src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80',
    autor: 'Ramiro G.',
    festival: 'Serenata a Cafayate',
    desc: 'Vinos torrontés y guitarra entre las viñas.',
  },
  {
    src: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&q=80',
    autor: 'Valeria C.',
    festival: 'Festival Nacional del Malambo',
    desc: 'Los zapateos de Laborde resuenan en la llanura.',
  },
  {
    src: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=600&q=80',
    autor: 'Nicolás P.',
    festival: 'Festival de Globos Aerostáticos',
    desc: 'El cielo de Buenos Aires pintado de colores.',
  },
];

const festivalesNames = FESTIVALES_ESTATICOS.map(f => f.titulo).sort();

export default function GaleriaPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(7,15,30,0.92) 0%, var(--bg) 100%), url(/hero-bg.png) center/cover no-repeat',
        padding: '6rem 5vw 5rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(116,172,223,0.1)',
      }}>
        <h1 style={{ display: 'inline-block', border: '1px solid rgba(116,172,223,0.35)', color: '#74ACDF', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', padding: '.3rem 1rem', borderRadius: '20px', marginBottom: '1.5rem' }}>
          📸 Galería Comunitaria
        </h1>

        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', letterSpacing: '.03em', lineHeight: .95, color: '#F0F6FF', marginBottom: '1.25rem' }}>
          Tu Festival,<br /><span style={{ color: '#74ACDF' }}>Tu Foto</span>
        </h2>

        <p style={{ fontSize: '1.05rem', color: 'rgba(116,172,223,0.7)', maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
          Compartí tus momentos en los festivales argentinos y formá parte de la memoria colectiva de nuestra cultura.
        </p>
      </div>

      {/* ── GALERÍA ──────────────────────────────── */}
      <section style={{ padding: '4rem 5vw', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2rem', letterSpacing: '.04em', color: '#F0F6FF', marginBottom: '.4rem' }}>
          Fotos de la comunidad
        </h2>
        <p style={{ color: 'rgba(116,172,223,0.5)', fontSize: '.85rem', marginBottom: '2.5rem' }}>
          Pasá el mouse sobre cada foto para ver más info.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {FOTOS.map((foto, i) => (
            <div key={i} className="galeria-card">
              <img
                src={foto.src}
                alt={`${foto.festival} — ${foto.autor}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
              <div className="galeria-overlay">
                <span className="galeria-festival">{foto.festival}</span>
                <p className="galeria-desc">{foto.desc}</p>
                <span className="galeria-autor">📷 {foto.autor}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORMULARIO ───────────────────────────── */}
      <div style={{ background: 'rgba(7,15,30,0.6)', borderTop: '1px solid rgba(116,172,223,0.1)' }}>
        <GaleriaForm festivales={festivalesNames} />
      </div>

    </div>
  );
}
