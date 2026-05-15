'use client';

import { useState, useRef } from 'react';

const MAX_MB = 5;

export default function GaleriaForm({ festivales }: { festivales: string[] }) {
  const [form, setForm] = useState({ nombre: '', festival: festivales[0] ?? '', descripcion: '' });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
      setError('Solo se aceptan imágenes JPG, PNG o WebP.');
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`La imagen no puede superar los ${MAX_MB} MB.`);
      return;
    }
    setError('');
    setFile(f);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { setError('Seleccioná una imagen.'); return; }
    setSuccess(true);
  };

  const inp: React.CSSProperties = {
    background: 'rgba(7,15,30,0.8)',
    border: '1px solid rgba(116,172,223,0.18)',
    color: '#F0F6FF',
    padding: '.65rem 1rem',
    borderRadius: '8px',
    fontSize: '.9rem',
    fontFamily: 'inherit',
    width: '100%',
    outline: 'none',
  };

  const label: React.CSSProperties = {
    fontSize: '.75rem',
    color: 'rgba(116,172,223,0.55)',
    letterSpacing: '.08em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '.35rem',
  };

  if (success) {
    return (
      <div style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: '3rem 5vw',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
        <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2rem', color: '#F0F6FF', letterSpacing: '.04em', marginBottom: '.5rem' }}>
          ¡Gracias, {form.nombre}!
        </h3>
        <p style={{ color: 'rgba(116,172,223,0.7)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
          Tu foto de <strong style={{ color: '#E8B830' }}>{form.festival}</strong> fue enviada y será revisada por el equipo antes de aparecer en la galería.
        </p>
        <button
          onClick={() => { setSuccess(false); setFile(null); setForm({ nombre: '', festival: festivales[0] ?? '', descripcion: '' }); if (fileRef.current) fileRef.current.value = ''; }}
          style={{ background: 'var(--celeste)', color: '#030810', border: 'none', borderRadius: '8px', padding: '.65rem 2rem', fontFamily: 'var(--font-bebas)', fontSize: '1rem', letterSpacing: '.05em', cursor: 'pointer' }}
        >
          Subir otra foto
        </button>
      </div>
    );
  }

  return (
    <section style={{ maxWidth: 680, margin: '0 auto', padding: '4rem 5vw' }}>
      <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.2rem', letterSpacing: '.04em', color: 'var(--celeste)', marginBottom: '.5rem' }}>
        Compartí tu foto
      </h2>
      <p style={{ color: 'rgba(116,172,223,0.6)', fontSize: '.9rem', marginBottom: '2rem' }}>
        Subí tu mejor momento en un festival argentino. JPG, PNG o WebP · máx. 5 MB.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={label}>Nombre *</label>
            <input required style={inp} value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Tu nombre" />
          </div>
          <div>
            <label style={label}>Festival *</label>
            <select required style={{ ...inp, cursor: 'pointer' }} value={form.festival} onChange={e => set('festival', e.target.value)}>
              {festivales.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={label}>Descripción</label>
          <textarea
            style={{ ...inp, minHeight: 90, resize: 'vertical' }}
            value={form.descripcion}
            onChange={e => set('descripcion', e.target.value)}
            placeholder="Contá algo sobre el momento que capturaste..."
          />
        </div>

        <div>
          <label style={label}>Imagen *</label>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFile}
            style={{ ...inp, padding: '.5rem .75rem', cursor: 'pointer' }}
          />
          {file && (
            <p style={{ fontSize: '.78rem', color: '#74ACDF', marginTop: '.35rem' }}>
              ✓ {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
            </p>
          )}
          {error && (
            <p style={{ fontSize: '.78rem', color: '#ff6b6b', marginTop: '.35rem' }}>{error}</p>
          )}
        </div>

        <button
          type="submit"
          style={{
            background: 'var(--celeste)',
            color: '#030810',
            border: 'none',
            borderRadius: '10px',
            padding: '.85rem 2.5rem',
            fontSize: '1.05rem',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'var(--font-bebas)',
            letterSpacing: '.06em',
            alignSelf: 'flex-start',
          }}
        >
          Subir foto →
        </button>
      </form>
    </section>
  );
}
