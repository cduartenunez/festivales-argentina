'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const FADE_VISUAL_MS  = 1000;   // fade-out visual del overlay
const MUSIC_LINGER_MS = 15000;  // música sigue después del cierre visual
const VOL_FADE_MS     = 2000;   // duración del fade de volumen al final

export default function IntroMusical() {
  const [phase, setPhase] = useState<'hidden' | 'intro' | 'audio-only' | 'done'>('hidden');
  const introRef    = useRef<HTMLAudioElement>(null);
  const volInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!sessionStorage.getItem('intro-seen')) setPhase('intro');
  }, []);

  const handleEnter = () => {
    // 1. Arrancar audio
    if (introRef.current) {
      introRef.current.volume = 0.6;
      introRef.current.play().catch(() => {});
    }
    sessionStorage.setItem('intro-seen', '1');

    // 2. Fade-out visual rápido (1s), audio sigue
    setPhase('audio-only');

    // 3. Después de MUSIC_LINGER_MS, fade de volumen
    setTimeout(() => {
      const audio = introRef.current;
      if (!audio) { setPhase('done'); return; }

      const steps    = 30;
      const stepMs   = VOL_FADE_MS / steps;
      const stepVol  = audio.volume / steps;

      volInterval.current = setInterval(() => {
        if (!introRef.current) { cleanup(); return; }
        const next = Math.max(0, introRef.current.volume - stepVol);
        introRef.current.volume = next;
        if (next <= 0) {
          introRef.current.pause();
          cleanup();
        }
      }, stepMs);
    }, MUSIC_LINGER_MS);
  };

  const cleanup = () => {
    if (volInterval.current) clearInterval(volInterval.current);
    setPhase('done');
  };

  if (phase === 'hidden' || phase === 'done') return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        backgroundImage: 'url(/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        opacity: phase === 'audio-only' ? 0 : 1,
        pointerEvents: phase === 'audio-only' ? 'none' : 'auto',
        transition: `opacity ${FADE_VISUAL_MS}ms ease`,
      }}
    >
      <audio ref={introRef} src="/intro.mp3" preload="auto" />

      {/* Overlay oscuro para legibilidad */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(3,8,16,0.65)', zIndex: 0 }} />

      {/* Contenido centrado sobre el overlay */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

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
      </div>{/* /contenido */}
    </div>
  );
}
