'use client';

import { useLang } from '@/context/LangContext';
import { t } from '@/lib/i18n';

export default function Hero({ total }: { total: number }) {
  const { lang } = useLang();
  const tx = t(lang);

  return (
    <div className="hero">
      <div className="hero-bg-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.png"
          alt=""
          className="hero-bg-img"
          aria-hidden="true"
        />
      </div>

      <div className="hero-gradient" />

      <div className="hero-content">
        <div className="hero-badge">{tx.hero.badge}</div>

        <h1 className="hero-title">
          {tx.hero.title1}
          <em>{tx.hero.title2}</em>
        </h1>

        <p className="hero-subtitle">{tx.hero.subtitle}</p>

        <div className="hero-stats">
          {[
            { num: total, label: tx.hero.statLabels[0] },
            { num: 22,    label: tx.hero.statLabels[1] },
            { num: 12,    label: tx.hero.statLabels[2] },
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
