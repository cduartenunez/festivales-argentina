export default function Hero({ total }: { total: number }) {
  return (
    <div className="hero">
      <div className="hero-fallback" />
      <div className="hero-overlay" />
      <div className="hero-texture" />

      <div className="hero-content">
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
          marginBottom: '1.25rem',
        }}>
          🇦🇷 Directorio Oficial 2027
        </div>

        <h1 style={{
          fontFamily: 'var(--font-fraunces,Fraunces,serif)',
          fontSize: 'clamp(2.6rem,7vw,5.5rem)',
          fontWeight: 900,
          lineHeight: 1.0,
          color: 'var(--crema)',
          marginBottom: '1rem',
        }}>
          Festivales de<br />
          <em style={{ fontStyle: 'italic', color: 'var(--ocre)' }}>Argentina</em>
        </h1>

        <p style={{
          color: 'rgba(245,238,216,0.82)',
          fontSize: '1.1rem',
          maxWidth: 520,
          margin: '0 auto 2rem',
          fontWeight: 300,
        }}>
          El directorio más completo de festivales, fiestas populares y eventos culturales de todo el país.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem' }}>
          {[
            { num: total, label: 'Festivales' },
            { num: 22, label: 'Provincias' },
            { num: 12, label: 'Meses' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-fraunces,Fraunces,serif)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--ocre)', lineHeight: 1 }}>
                {s.num}
              </div>
              <div style={{ fontSize: '.75rem', color: 'rgba(245,238,216,0.65)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '.2rem' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-scroll">Explorá</div>
    </div>
  );
}
