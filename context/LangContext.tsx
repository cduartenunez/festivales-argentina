'use client';

import { createContext, useContext, useState } from 'react';
import type { Lang } from '@/lib/i18n';

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue>({ lang: 'es', toggle: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');
  return (
    <LangContext.Provider value={{ lang, toggle: () => setLang(l => l === 'es' ? 'en' : 'es') }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
