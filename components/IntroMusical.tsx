'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function IntroMusical() {
  const [visible,    setVisible]    = useState(false);
  const [fadingOut,  setFadingOut]  = useState(false);
  const audioRef  = useRef<HTMLAudioElement>(null);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!sessionStorage.getItem('intro-seen')) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const playTimer = setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 200);

    timerRef.current = setTimeout(() => handleDismiss(), 4000);

    return () => {
      clearTimeout(playTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleDismiss = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setFadingOut(true);
    try { audioRef.current?.pause(); } catch (_) {}
    sessionStorage.setItem('intro-seen', '1');
    setTimeout(() => setVisible(false), 600);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: '#030810',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: fadingOut ? 'none' : 'auto',
      }}
    >
      <audio ref={audioRef} src="/intro.mp3" preload="auto" />

      {/* Logo animado */}
      <div style={{ animation: 'introScale 0.8s ease forwards', marginBottom: '1.5rem' }}>
        <Image
          src="/LOGO_FESTIVALES.jpeg"
          alt="Festivales de Argentina"
          width={140}
          height={140}
          style={{ borderRadius: '50%', objectFit: 'cover', boxShadow: '0 0 40px rgba(116,172,223,0.2)' }}
          priority
        />
      </div>

      {/* Título */}
      <h1
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(2rem, 6vw, 3rem)',
          letterSpacing: '.05em',
          lineHeight: 1.1,
          textAlign: 'center',
          animation: 'introFadeUp 0.8s ease 0.3s both',
        }}
      >
        <span style={{ color: '#F0F6FF' }}>Festivales de </span>
        <span style={{ color: '#74ACDF' }}>Argentina</span>
      </h1>

      {/* Botón saltar */}
      <button
        onClick={handleDismiss}
        style={{
          marginTop: '2.5rem',
          background: 'transparent',
          border: '1px solid rgba(116,172,223,0.3)',
          color: 'rgba(116,172,223,0.65)',
          borderRadius: '8px',
          padding: '.5rem 2rem',
          fontSize: '.85rem',
          cursor: 'pointer',
          fontFamily: 'var(--font-dm-sans)',
          letterSpacing: '.04em',
          animation: 'introFadeUp 0.8s ease 0.6s both',
          transition: 'border-color .2s, color .2s',
        }}
      >
        Entrar →
      </button>
    </div>
  );
}
