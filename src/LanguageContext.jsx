import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return window.localStorage.getItem('eyepek-language') === 'hi' ? 'hi' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState(nextLanguage === 'hi' ? 'hi' : 'en');
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem('eyepek-language', language);
    } catch {
      // Language switching still works for this visit when storage is unavailable.
    }
  }, [language]);

  const t = useCallback((english, hindi) => language === 'hi' ? hindi : english, [language]);
  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
