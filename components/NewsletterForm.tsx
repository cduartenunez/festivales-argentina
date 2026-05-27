'use client';

import { useState } from 'react';
import { useLang } from '@/context/LangContext';
import { t } from '@/lib/i18n';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inp: React.CSSProperties = {
  width: '100%',
  background: 'rgba(7,15,30,0.8)',
  border: '1px solid rgba(116,172,223,0.18)',
  color: '#F0F6FF',
  padding: '.6rem 1rem',
  borderRadius: '8px',
  fontSize: '.88rem',
  fontFamily: 'inherit',
  outline: 'none',
};

export default function NewsletterForm() {
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

  return (
    <div className="nl">
      <p className="nl-heading">{tx.label}</p>

      {status === 'success' ? (
        <p className="nl-success">{tx.successShort}</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="nl-form">
            <input
              type="text"
              required
              placeholder={tx.namePlaceholder}
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              style={inp}
            />
            <input
              type="email"
              required
              placeholder={tx.emailPlaceholder}
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inp}
            />
            <button type="submit" disabled={status === 'loading'} className="nl-btn">
              {status === 'loading' ? tx.loading : tx.cta}
            </button>
          </form>
          {status === 'error' && <p className="nl-error">{tx.error}</p>}
          <p className="nl-disclaimer">{tx.disclaimer}</p>
        </>
      )}
    </div>
  );
}
