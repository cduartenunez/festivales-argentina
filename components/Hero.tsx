export default function Hero({ total }: { total: number }) {
  return (
    <div className="hero">
      {/* imagen de fondo con animación Ken Burns */}
      <div className="hero-bg-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.png"
          alt=""
          className="hero-bg-img"
          aria-hidden="true"
        />
      </div>

      {/* overlay oscuro para legibilidad */}
      <div className="hero-gradient" />

      {/* texto bottom-left */}
      <div className="hero-content">
        <div className="hero-badge">🇦🇷 Directorio Oficial 2027</div>

        <h1 className="hero-title">
          Festivales de
          <em>Argentina</em>
        </h1>

        <p className="hero-subtitle">
          El directorio más completo de festivales, fiestas populares y eventos culturales de todo el país.
        </p>

        <div className="hero-stats">
          {[
            { num: total, label: 'Festivales' },
            { num: 22,    label: 'Provincias'  },
            { num: 12,    label: 'Meses'       },
          ].map(s => (
            <div key={s.label}>
              <div className="hero-stat-num">{s.num}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
