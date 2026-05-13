import { Festival } from './types';
import { FESTIVALES_ESTATICOS } from './data';

const WP_URL = process.env.WP_URL || 'https://festivalesdeargentina.com.ar';
const WP_ENDPOINT = process.env.WP_ENDPOINT || 'festivales';
const REVALIDATE = Number(process.env.WP_REVALIDATE || '3600');

interface WPFestival {
  id: number;
  title: { rendered: string };
  acf?: {
    mes?: string;
    categoria?: string;
    ubicacion?: string;
    descripcion?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    imagen?: string;
    gratuito?: boolean;
  };
  meta?: Record<string, string>;
  link?: string;
}

function mapWPToFestival(post: WPFestival): Festival {
  const acf = post.acf || {};
  return {
    id: post.id,
    titulo: post.title.rendered.replace(/<[^>]+>/g, ''),
    mes: acf.mes || '',
    categoria: acf.categoria || 'folklore',
    ubicacion: acf.ubicacion || '',
    descripcion: acf.descripcion || '',
    fecha_inicio: acf.fecha_inicio || '',
    fecha_fin: acf.fecha_fin || '',
    imagen: acf.imagen || '',
    gratuito: acf.gratuito || false,
    link: post.link,
  };
}

export async function getFestivales(): Promise<Festival[]> {
  try {
    const url = `${WP_URL}/wp-json/wp/v2/${WP_ENDPOINT}?per_page=100&_fields=id,title,acf,link`;
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE },
    });

    if (!res.ok) throw new Error(`WP API ${res.status}`);

    const posts: WPFestival[] = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) throw new Error('Sin datos');

    return posts.map(mapWPToFestival);
  } catch {
    return FESTIVALES_ESTATICOS;
  }
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

export function formatFecha(fecha: string): { dia: string; mes: string } {
  if (!fecha) return { dia: '—', mes: '' };
  const d = new Date(fecha + 'T12:00:00');
  return {
    dia: d.getDate().toString().padStart(2, '0'),
    mes: d.toLocaleDateString('es-AR', { month: 'short' }).toUpperCase(),
  };
}
