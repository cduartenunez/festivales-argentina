'use client';

import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { t } from '@/lib/i18n';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inp: React.CSSProperties = {
  background: 'rgba(7,15,30,0.8)',
  border: '1px solid rgba(116,172,223,0.18)',
  color: '#F0F6FF',
  borderRadius: '8px',
  fontFamily: 'inherit',
  outline: 'none',
};

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const { lang } = useLang();
  const tx = t(lang).newsletter;
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Error');
      }
      setStatus('success');
      setNombre('');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (compact) {
    return (
      <div className="newsletter-compact">
        <p className="newsletter-compact-label">{tx.label}</p>
        {status === 'success' ? (
          <p className="newsletter-compact-ok">{tx.successShort}</p>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-compact-form">
            <input
              type="text"
              required
              placeholder={tx.namePlaceholder}
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              style={{ ...inp, padding: '.5rem .85rem', fontSize: '.82rem' }}
            />
            <input
              type="email"
              required
              placeholder={tx.emailPlaceholder}
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ ...inp, padding: '.5rem .85rem', fontSize: '.82rem' }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="newsletter-compact-btn"
            >
              {status === 'loading' ? '...' : tx.cta}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="newsletter-error">{tx.error}</p>
        )}
      </div>
    );
  }

  return (
    <section className="newsletter-section">
      <div className="newsletter-inner">
        <div className="newsletter-text">
          <span className="newsletter-badge">✉ Newsletter</span>
          <h2 className="newsletter-title">{tx.heading}</h2>
          <p className="newsletter-subtitle">{tx.subtitle}</p>
        </div>

        {status === 'success' ? (
          <div className="newsletter-success">
            <span style={{ fontSize: '2rem' }}>🎉</span>
            <p className="newsletter-success-msg">{tx.success}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="text"
              required
              placeholder={tx.namePlaceholder}
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              style={{ ...inp, padding: '.7rem 1.1rem', fontSize: '.92rem', flex: '1 1 160px' }}
            />
            <input
              type="email"
              required
              placeholder={tx.emailPlaceholder}
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ ...inp, padding: '.7rem 1.1rem', fontSize: '.92rem', flex: '2 1 220px' }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="newsletter-btn"
            >
              {status === 'loading' ? tx.loading : tx.cta}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="newsletter-error">{tx.error}</p>
        )}
        {status !== 'success' && (
          <p className="newsletter-disclaimer">{tx.disclaimer}</p>
        )}
      </div>
    </section>
  );
}
