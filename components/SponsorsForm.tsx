'use client';

import { useState } from 'react';

const TIERS = ['Básico — USD 15/mes', 'Destacado — USD 35/mes', 'Premium — USD 75/mes', 'Sponsor Oficial — USD 150/mes'];

export default function SponsorsForm() {
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', telefono: '', tier: TIERS[0], mensaje: '' });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Consulta de publicidad: ${form.tier} — ${form.empresa || form.nombre}`);
    const body = encodeURIComponent(
      `Hola Claudio,\n\nMe interesa anunciar en Festivales de Argentina.\n\nPlan: ${form.tier}\nNombre: ${form.nombre}\nEmpresa: ${form.empresa}\nTeléfono: ${form.telefono}\n\n${form.mensaje}\n\nSaludos`
    );
    window.location.href = `mailto:claudio@festivalesdeargentina.com.ar?subject=${subject}&body=${body}`;
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
    transition: 'border-color .2s',
  };

  return (
    <section style={{ maxWidth: 680, margin: '0 auto', padding: '4rem 5vw' }}>
      <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.2rem', letterSpacing: '.04em', color: 'var(--celeste)', marginBottom: '.5rem' }}>
        Contactanos
      </h2>
      <p style={{ color: 'rgba(116,172,223,0.6)', fontSize: '.9rem', marginBottom: '2rem' }}>
        Completá el formulario y te respondemos en menos de 24 horas.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '.75rem', color: 'rgba(116,172,223,0.55)', letterSpacing: '.08em', textTransform: 'uppercase', display: 'block', marginBottom: '.35rem' }}>Nombre *</label>
            <input required style={inp} value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Tu nombre" />
          </div>
          <div>
            <label style={{ fontSize: '.75rem', color: 'rgba(116,172,223,0.55)', letterSpacing: '.08em', textTransform: 'uppercase', display: 'block', marginBottom: '.35rem' }}>Empresa</label>
            <input style={inp} value={form.empresa} onChange={e => set('empresa', e.target.value)} placeholder="Tu empresa o marca" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '.75rem', color: 'rgba(116,172,223,0.55)', letterSpacing: '.08em', textTransform: 'uppercase', display: 'block', marginBottom: '.35rem' }}>Email *</label>
            <input required type="email" style={inp} value={form.email} onChange={e => set('email', e.target.value)} placeholder="tu@email.com" />
          </div>
          <div>
            <label style={{ fontSize: '.75rem', color: 'rgba(116,172,223,0.55)', letterSpacing: '.08em', textTransform: 'uppercase', display: 'block', marginBottom: '.35rem' }}>Teléfono</label>
            <input style={inp} value={form.telefono} onChange={e => set('telefono', e.target.value)} placeholder="+54 9 11 ..." />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '.75rem', color: 'rgba(116,172,223,0.55)', letterSpacing: '.08em', textTransform: 'uppercase', display: 'block', marginBottom: '.35rem' }}>Plan de interés</label>
          <select style={{ ...inp, cursor: 'pointer' }} value={form.tier} onChange={e => set('tier', e.target.value)}>
            {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '.75rem', color: 'rgba(116,172,223,0.55)', letterSpacing: '.08em', textTransform: 'uppercase', display: 'block', marginBottom: '.35rem' }}>Mensaje</label>
          <textarea
            style={{ ...inp, minHeight: 120, resize: 'vertical' }}
            value={form.mensaje}
            onChange={e => set('mensaje', e.target.value)}
            placeholder="Contanos sobre tu marca, producto o servicio..."
          />
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
            transition: 'background .2s',
            alignSelf: 'flex-start',
          }}
        >
          Quiero anunciar →
        </button>
      </form>
    </section>
  );
}
