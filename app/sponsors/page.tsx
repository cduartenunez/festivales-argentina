import type { Metadata } from 'next';
import SponsorsForm from '@/components/SponsorsForm';

export const metadata: Metadata = {
  title: 'Anunciá en Festivales de Argentina | Publicidad',
  description: 'Llegá a miles de turistas y amantes de la cultura argentina. Planes desde USD 15/mes.',
};

const TIERS = [
  {
    name: 'Básico',
    price: 15,
    color: '#74ACDF',
    bg: 'rgba(116,172,223,0.08)',
    border: 'rgba(116,172,223,0.25)',
    features: [
      'Logo en sección de sponsors',
      'Link a tu sitio web o redes sociales',
      'Visibilidad en toda la plataforma',
      'Mínimo 1 mes',
    ],
  },
  {
    name: 'Destacado',
    price: 35,
    color: '#E8B830',
    bg: 'rgba(232,184,48,0.08)',
    border: 'rgba(232,184,48,0.3)',
    features: [
      'Logo grande con nombre de marca',
      'Banner en sección de categoría',
      'Todo lo del plan Básico',
      'Mínimo 1 mes',
    ],
  },
  {
    name: 'Premium',
    price: 75,
    color: '#b87fff',
    bg: 'rgba(160,100,220,0.08)',
    border: 'rgba(160,100,220,0.3)',
    badge: 'Más popular',
    features: [
      'Banner destacado en el hero',
      'Flip card de festival auspiciado',
      'Mención en redes sociales',
      'Todo lo anterior',
      'Mínimo 1 mes',
    ],
  },
  {
    name: 'Sponsor Oficial',
    price: 150,
    color: '#ff9f43',
    bg: 'rgba(255,159,67,0.08)',
    border: 'rgba(255,159,67,0.3)',
    badge: 'Máxima visibilidad',
    features: [
      'Nota editorial en el directorio',
      'Presencia en la pantalla de intro del sitio',
      'Mención prioritaria en todas las secciones',
      'Gestión de redes sociales incluida',
      'Todo lo anterior',
    ],
  },
];

const STATS = [
  { num: '70+', label: 'Festivales' },
  { num: '22',  label: 'Provincias' },
  { num: '12',  label: 'Meses' },
  { num: '∞',   label: 'Visitantes' },
];

export default function SponsorsPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(7,15,30,0.9) 0%, var(--bg) 100%), url(/hero-bg.png) center/cover no-repeat',
        padding: '6rem 5vw 5rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(116,172,223,0.1)',
      }}>
        <div style={{ display: 'inline-block', border: '1px solid rgba(232,184,48,0.4)', color: '#E8B830', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', padding: '.3rem 1rem', borderRadius: '20px', marginBottom: '1.5rem' }}>
          💼 Oportunidades de Publicidad
        </div>

        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', letterSpacing: '.03em', lineHeight: .95, color: '#F0F6FF', marginBottom: '1.25rem' }}>
          Anunciá en<br /><span style={{ color: '#74ACDF' }}>Festivales de Argentina</span>
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'rgba(116,172,223,0.7)', maxWidth: 560, margin: '0 auto 3rem', lineHeight: 1.65 }}>
          Llegá a miles de turistas y amantes de la cultura argentina que buscan festivales, fiestas populares y eventos en todo el país.
        </p>

        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', color: '#E8B830', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: '.72rem', color: 'rgba(116,172,223,0.55)', textTransform: 'uppercase', letterSpacing: '.1em', marginTop: '.2rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TIERS ────────────────────────────────── */}
      <section style={{ padding: '5rem 5vw', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.4rem', letterSpacing: '.04em', color: '#F0F6FF', textAlign: 'center', marginBottom: '.5rem' }}>
          Planes de publicidad
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(116,172,223,0.55)', fontSize: '.9rem', marginBottom: '3rem' }}>
          Todos los planes incluyen visibilidad en festivalesdeargentina.com.ar
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {TIERS.map(tier => (
            <div key={tier.name} style={{
              background: tier.bg,
              border: `1px solid ${tier.border}`,
              borderRadius: '16px',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transition: 'transform .25s, box-shadow .25s',
            }}>
              {tier.badge && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: tier.color, color: '#030810', fontSize: '.65rem', fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', padding: '.2rem .85rem', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                  {tier.badge}
                </div>
              )}

              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.6rem', letterSpacing: '.04em', color: tier.color, marginBottom: '.25rem' }}>
                {tier.name}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', color: '#F0F6FF', lineHeight: 1 }}>
                  USD {tier.price}
                </span>
                <span style={{ fontSize: '.8rem', color: 'rgba(116,172,223,0.5)', marginLeft: '.3rem' }}>/mes</span>
              </div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.6rem', flex: 1, marginBottom: '1.75rem' }}>
                {tier.features.map(feat => (
                  <li key={feat} style={{ fontSize: '.85rem', color: 'rgba(240,246,255,0.8)', display: 'flex', gap: '.5rem', alignItems: 'flex-start' }}>
                    <span style={{ color: tier.color, flexShrink: 0, marginTop: '.1rem' }}>✓</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: tier.color,
                  color: '#030810',
                  borderRadius: '8px',
                  padding: '.6rem',
                  fontWeight: 700,
                  fontSize: '.9rem',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-bebas)',
                  letterSpacing: '.05em',
                  fontSize2: '1rem',
                  transition: 'opacity .2s',
                } as React.CSSProperties}
              >
                Lo quiero →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── FORMULARIO ───────────────────────────── */}
      <div id="contacto" style={{ background: 'rgba(7,15,30,0.6)', borderTop: '1px solid rgba(116,172,223,0.1)' }}>
        <SponsorsForm />
      </div>

    </div>
  );
}
