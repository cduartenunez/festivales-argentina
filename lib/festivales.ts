import { Festival } from './types';
import { FESTIVALES_ESTATICOS } from './data';

// Oculta los eventos que ya terminaron (fecha en hora de Argentina). Los que no tienen fecha se muestran siempre.
export async function getFestivales(): Promise<Festival[]> {
  const hoy = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' });
  return FESTIVALES_ESTATICOS.filter(f => {
    const fin = f.fecha_fin || f.fecha_inicio;
    return !fin || fin >= hoy;
  });
}

export function agruparPorMes(festivales: Festival[]): Record<string, Festival[]> {
  const orden = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const grupos: Record<string, Festival[]> = {};

  for (const mes of orden) {
    const del_mes = festivales
      .filter(f => f.mes === mes)
      .sort((a, b) => a.fecha_inicio.localeCompare(b.fecha_inicio));
    if (del_mes.length > 0) grupos[mes] = del_mes;
  }

  return grupos;
}

export function toSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export async function getFestivalBySlug(slug: string): Promise<Festival | null> {
  return FESTIVALES_ESTATICOS.find(f => toSlug(f.titulo) === slug) ?? null;
}

export function formatFecha(fecha: string): { dia: string; mes: string } {
  if (!fecha) return { dia: '—', mes: '' };
  const d = new Date(fecha + 'T12:00:00');
  return {
    dia: d.getDate().toString().padStart(2, '0'),
    mes: d.toLocaleDateString('es-AR', { month: 'short' }).toUpperCase(),
  };
}
