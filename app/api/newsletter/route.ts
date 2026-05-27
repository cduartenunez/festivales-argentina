import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nombre, email } = body ?? {};

  if (!nombre?.trim() || !email?.trim()) {
    return Response.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (!emailOk) {
    return Response.json({ error: 'El email no es válido.' }, { status: 400 });
  }

  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('MAKE_WEBHOOK_URL not set — skipping webhook');
    return Response.json({ ok: true });
  }

  try {
    const resp = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: nombre.trim(),
        email: email.trim(),
        timestamp: new Date().toISOString(),
        source: 'festivalesdeargentina.com.ar',
      }),
    });
    if (!resp.ok) throw new Error(`Webhook responded ${resp.status}`);
  } catch (err) {
    console.error('Make.com webhook error:', err);
    return Response.json({ error: 'Error al procesar la suscripción.' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
