export interface Festival {
  id: number;
  titulo: string;
  ubicacion: string;
  descripcion: string;
  categoria: string;
  mes: string;
  fecha_inicio: string;
  fecha_fin: string;
  imagen: string;
  link?: string;
  gratuito?: boolean;
}

export type Categoria = 'folklore' | 'gastro' | 'musica' | 'carnaval' | 'doma' | 'artesania' | 'tango' | 'cine' | 'cultura' | '';

export const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export const MES_EMOJI: Record<string, string> = {
  Enero: '☀️', Febrero: '🎭', Marzo: '🍇', Abril: '🎬',
  Mayo: '🍽️', Junio: '🍓', Julio: '🏔️', Agosto: '💃',
  Septiembre: '🌸', Octubre: '🍺', Noviembre: '🌽', Diciembre: '🎉',
};

export const MES_VIBE: Record<string, string> = {
  Enero: 'Verano en todo su esplendor',
  Febrero: 'Carnaval, folklore y rock',
  Marzo: 'Vendimia y grandes festivales',
  Abril: 'Cine, libros y gastronomía',
  Mayo: 'Feria de sabores',
  Junio: 'Frutilla y sabores del litoral',
  Julio: 'Invierno patagónico y valles andinos',
  Agosto: 'Tango y sabores del río',
  Septiembre: 'Empanadas y tradición tucumana',
  Octubre: 'Oktoberfest y chocolate alpino',
  Noviembre: 'Tradición gaucha y cine internacional',
  Diciembre: 'Ferias navideñas y cerveza artesanal',
};
