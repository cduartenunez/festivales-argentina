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
    newsletter: {
      heading:      es ? 'Sumate a la comunidad festivalera' : 'Join the festival community',
      subtitle:     es
        ? 'Recibí cada mes los festivales más destacados, novedades culturales y recomendaciones directas en tu casilla.'
        : 'Get the top festivals, cultural news and curated recommendations delivered to your inbox every month.',
      label:        es ? '✉ Suscribite al newsletter' : '✉ Subscribe to our newsletter',
      namePlaceholder:  es ? 'Tu nombre' : 'Your name',
      emailPlaceholder: es ? 'Tu email' : 'Your email',
      cta:          es ? 'Suscribirme →' : 'Subscribe →',
      loading:      es ? 'Enviando...' : 'Sending...',
      success:      es ? '¡Listo! Pronto vas a recibir novedades en tu casilla.' : 'Done! You\'ll hear from us soon.',
      successShort: es ? '¡Gracias! Te escribimos pronto.' : 'Thanks! Talk soon.',
      error:        es ? 'Algo falló. Intentá de nuevo.' : 'Something went wrong. Please try again.',
      disclaimer:   es ? 'Sin spam. Podés darte de baja cuando quieras.' : 'No spam. Unsubscribe anytime.',
    },
    footer: {
      tagline: es
        ? 'El directorio más completo de festivales y eventos culturales del país.'
        : 'The most complete directory of festivals and cultural events in Argentina.',
    },
    mesLabel: (mes: string) => es ? mes : (MESES_EN[mes] ?? mes),
  };
}
