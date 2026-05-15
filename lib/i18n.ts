export type Lang = 'es' | 'en';

export const MESES_EN: Record<string, string> = {
  Enero: 'January', Febrero: 'February', Marzo: 'March',
  Abril: 'April', Mayo: 'May', Junio: 'June',
  Julio: 'July', Agosto: 'August', Septiembre: 'September',
  Octubre: 'October', Noviembre: 'November', Diciembre: 'December',
};

export function t(lang: Lang) {
  const es = lang === 'es';
  return {
    hero: {
      badge:    es ? '🇦🇷 Directorio Oficial 2027' : '🇦🇷 Official Directory 2027',
      title1:   es ? 'Festivales de' : 'Festivals of',
      title2:   'Argentina',
      subtitle: es
        ? 'El directorio más completo de festivales, fiestas populares y eventos culturales de todo el país.'
        : 'The most complete directory of festivals, popular celebrations and cultural events in the country.',
      statLabels: es
        ? ['Festivales', 'Provincias', 'Meses']
        : ['Festivals', 'Provinces', 'Months'],
    },
    nav: {
      festivals: es ? '🗺️ Festivales' : '🗺️ Festivals',
      calendar:  es ? '📅 Calendario' : '📅 Calendar',
      quarter:   es ? '🗓 Trimestre'  : '🗓 Quarter',
      thisMonth: es ? '🗓 Este mes'   : '🗓 This month',
    },
    categories: es
      ? [
          { key: 'folklore',  label: '🎵 Folklore'    },
          { key: 'gastro',    label: '🍽️ Gastronomía' },
          { key: 'musica',    label: '🎸 Música'       },
          { key: 'carnaval',  label: '🎭 Carnaval'     },
          { key: 'artesania', label: '🌍 Cultura'      },
          { key: 'doma',      label: '🐎 Doma'         },
          { key: 'tango',     label: '💃 Tango'        },
          { key: 'cine',      label: '🎬 Cine'         },
        ]
      : [
          { key: 'folklore',  label: '🎵 Folklore'   },
          { key: 'gastro',    label: '🍽️ Gastronomy' },
          { key: 'musica',    label: '🎸 Music'       },
          { key: 'carnaval',  label: '🎭 Carnival'    },
          { key: 'artesania', label: '🌍 Culture'     },
          { key: 'doma',      label: '🐎 Rodeo'       },
          { key: 'tango',     label: '💃 Tango'       },
          { key: 'cine',      label: '🎬 Cinema'      },
        ],
    search: {
      placeholder: es
        ? '🔍 Buscar festival, ciudad, provincia...'
        : '🔍 Search festival, city, province...',
      clear:     es ? '✕ Limpiar' : '✕ Clear',
      noFilter:  es ? 'Sin resultados para este filtro.' : 'No results for this filter.',
      noSearch:  es
        ? 'No encontramos festivales con esa búsqueda.'
        : 'No festivals found for that search.',
      count: (n: number) => es
        ? `${n} ${n === 1 ? 'festival' : 'festivales'}`
        : `${n} ${n === 1 ? 'festival' : 'festivals'}`,
    },
    footer: {
      tagline: es
        ? 'El directorio más completo de festivales y eventos culturales del país.'
        : 'The most complete directory of festivals and cultural events in Argentina.',
    },
    mesLabel: (mes: string) => es ? mes : (MESES_EN[mes] ?? mes),
  };
}
