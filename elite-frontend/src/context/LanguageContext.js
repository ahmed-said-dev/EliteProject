import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { translate, translations } from '../../i18n';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const router = useRouter();
  const [locale, setLocale] = useState('en');
  const [isRTL, setIsRTL] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize language settings
  useEffect(() => {
    // Only access localStorage on the client-side
    if (typeof window !== 'undefined') {
      // Check if there's a saved language preference in localStorage
      const savedLocale = window.localStorage.getItem('locale') || 'en';
      setLocale(savedLocale);
      
      // Set RTL based on the language
      const direction = translate('direction', savedLocale);
      setIsRTL(direction === 'rtl');
      
      // Set dir attribute on html element
      document.documentElement.dir = direction;
      document.documentElement.lang = savedLocale;
      
      // Finish loading
      setIsLoading(false);
    }
  }, []);

  // Change language function
  const changeLanguage = (lng) => {
    // Only access localStorage on the client-side
    if (typeof window !== 'undefined') {
      // Save to localStorage
      window.localStorage.setItem('locale', lng);
      setLocale(lng);
      
      // Update direction
      const direction = translate('direction', lng);
      setIsRTL(direction === 'rtl');
      
      // Set dir attribute on html element
      document.documentElement.dir = direction;
      document.documentElement.lang = lng;
      
      // Use Next.js router to change the locale in the URL
      const { pathname, asPath, query } = router;
      router.push({ pathname, query }, asPath, { locale: lng });
    }
  };

  // Create a simple t function for translations
  const t = (key) => translate(key, locale);
  
  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, isRTL, t }}>
      {children && !isLoading ? children : <div>Loading...</div>}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
