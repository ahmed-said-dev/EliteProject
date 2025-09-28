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
      console.log(`🌐 [LanguageContext] Changing language from ${locale} to ${lng}`);
      console.log(`🔍 [LanguageContext] Current router state:`, {
        pathname: router.pathname,
        asPath: router.asPath,
        query: router.query,
        locale: router.locale
      });
      
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
      
      // تحسين معالجة تغيير اللغة للصفحات الديناميكية
      try {
        // إنشاء URL جديد باللغة الجديدة
        let newAsPath = asPath;
        
        // إزالة الـ locale الحالي من بداية الـ path إذا كان موجوداً
        if (router.locale && router.locale !== 'en') {
          newAsPath = asPath.replace(`/${router.locale}`, '');
        }
        
        // إضافة الـ locale الجديد إذا لم يكن الإنجليزية (default)
        if (lng !== 'en') {
          newAsPath = `/${lng}${newAsPath}`;
        }
        
        console.log(`🔄 [LanguageContext] Navigating to: ${newAsPath} with locale: ${lng}`);
        console.log(`🔍 [LanguageContext] Preserving query:`, query);
        
        // استخدام router.push مع الـ URL الجديد والاحتفاظ بالـ query parameters
        router.push({ pathname, query }, newAsPath, { 
          locale: lng,
          scroll: false // Don't scroll to top to maintain user position
        }).then(() => {
          console.log(`✅ [LanguageContext] Navigation completed successfully`);
        }).catch((error) => {
          console.error(`❌ [LanguageContext] Navigation failed:`, error);
        });
        
      } catch (error) {
        console.error(`❌ [LanguageContext] Error changing language:`, error);
        
        // Fallback: استخدام الطريقة الأساسية
        router.push({ pathname, query }, asPath, { locale: lng, scroll: false });
      }
    }
  };

  // Create an enhanced t function for translations with interpolation support
  const t = (key, params = {}) => {
    let translation = translate(key, locale);
    
    // Handle parameter interpolation
    if (params && typeof translation === 'string') {
      Object.keys(params).forEach(param => {
        const regex = new RegExp(`{{\\s*${param}\\s*}}`, 'g');
        translation = translation.replace(regex, params[param]);
      });
    }
    
    return translation;
  };
  
  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, isRTL, t, dir: isRTL ? 'rtl' : 'ltr' }}>
      {children && !isLoading ? children : <div>Loading...</div>}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
