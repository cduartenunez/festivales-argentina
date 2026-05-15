'use client';

import { useState, useEffect } from 'react';

const SPONSOR_URL = 'https://festivalesdeargentina.com.ar';

export default function AdBanner() {
  const [visible,   setVisible]   = useState(false);
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    if (!sessionStorage.getItem('ad-seen')) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible || countdown <= 0) return;
    const id = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(id);
  }, [visible, countdown]);

  const dismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    sessionStorage.setItem('ad-seen', '1');
    setVisible(false);
  };

  const openSponsor = () => window.open(SPONSOR_URL, '_blank', 'noopener,noreferrer');

  if (!visible) return null;

  return (
    <div
      onClick={openSponsor}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(3,8,16,0.88)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <div
        onClick={openSponsor}
        style={{
          background: 'rgba(7,15,30,0.97)',
          border: '1px solid rgba(116,172,223,0.18)',
          borderRadius: '18px',
          padding: '2.5rem 3rem',
          textAlign: 'center',
          minWidth: '320px',
          maxWidth: '460px',
          width: '90vw',
          cursor: 'pointer',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Label publicidad */}
        <p style={{
          fontSize: '.62rem', letterSpacing: '.18em', textTransform: 'uppercase',
          color: 'rgba(116,172,223,0.4)', marginBottom: '1.5rem',
        }}>
          Publicidad
        </p>

        {/* Área sponsor */}
        <div style={{
          border: '2px dashed rgba(116,172,223,0.18)',
          borderRadius: '12px',
          padding: '3rem 2rem',
          marginBottom: '2rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '1.6rem', letterSpacing: '.06em',
            color: 'var(--celeste)', marginBottom: '.5rem',
          }}>
            Tu marca aquí
          </p>
          <p style={{ fontSize: '.8rem', color: 'rgba(116,172,223,0.35)' }}>
            festivalesdeargentina.com.ar
          </p>
        </div>

        {/* Contador / botón saltar */}
        <div style={{ minHeight: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {countdown > 0 ? (
            <div>
              <span style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: '2.4rem', color: 'var(--dorado)',
                letterSpacing: '.05em', display: 'block', lineHeight: 1,
              }}>
                {countdown}
              </span>
              <span style={{ fontSize: '.7rem', color: 'rgba(116,172,223,0.35)', display: 'block', marginTop: '.2rem' }}>
                Podés saltar en {countdown}s
              </span>
            </div>
          ) : (
            <button
              onClick={dismiss}
              style={{
                background: 'var(--celeste)', color: '#030810',
                border: 'none', borderRadius: '8px',
                padding: '.55rem 2.2rem',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '.95rem', fontWeight: 700,
                cursor: 'pointer', letterSpacing: '.02em',
              }}
            >
              Saltar →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
