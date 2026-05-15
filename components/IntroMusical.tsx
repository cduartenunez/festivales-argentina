'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function IntroMusical() {
  const [visible,   setVisible]   = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  const introRef   = useRef<HTMLAudioElement>(null);
  const crowdRef   = useRef<HTMLAudioElement>(null);
  const crowdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!sessionStorage.getItem('intro-seen')) setVisible(true);
  }, []);

  const handleEnter = () => {
    // Arrancar ambos audios en el click (resuelve bloqueo de autoplay)
    if (introRef.current) {
      introRef.current.volume = 0.5;
      introRef.current.play().catch(() => {});
    }
    if (crowdRef.current) {
      crowdRef.current.volume = 0.8;
      crowdRef.current.play().catch(() => {});
    }

    // Detener aplausos después de 4s
    crowdTimer.current = setTimeout(() => {
      try { crowdRef.current?.pause(); } catch (_) {}
    }, 4000);

    // Fade-out en 2 segundos
    setFadingOut(true);
    sessionStorage.setItem('intro-seen', '1');
    setTimeout(() => {
      try { introRef.current?.pause(); } catch (_) {}
      if (crowdTimer.current) clearTimeout(crowdTimer.current);
      setVisible(false);
    }, 2000);
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
        transition: 'opacity 2s ease',
        pointerEvents: fadingOut ? 'none' : 'auto',
      }}
    >
      <audio ref={introRef} src="/intro.mp3" preload="auto" />
      <audio ref={crowdRef} src="/crowd.mp3" preload="auto" />

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

      {/* Botón Entrar */}
      <button
        onClick={handleEnter}
        style={{
          marginTop: '2.5rem',
          background: 'rgba(116,172,223,0.1)',
          border: '1px solid rgba(116,172,223,0.45)',
          color: '#74ACDF',
          borderRadius: '8px',
          padding: '.6rem 2.5rem',
          fontSize: '1rem',
          cursor: 'pointer',
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 600,
          letterSpacing: '.06em',
          animation: 'introFadeUp 0.8s ease 0.5s both',
          transition: 'background .2s, border-color .2s',
        }}
      >
        Entrar →
      </button>
    </div>
  );
}
