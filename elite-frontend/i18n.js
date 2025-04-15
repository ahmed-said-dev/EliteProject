// Translation files
import enTranslations from './public/locales/en/common.json';
import arTranslations from './public/locales/ar/common.json';

// Translations lookup object
const translations = {
  en: enTranslations,
  ar: arTranslations,
};

/**
 * Simple translation function
 * @param {string} key - dot notation key (e.g. 'header.home')
 * @param {string} locale - locale code (e.g. 'en', 'ar')
 * @returns {string} - translated text or key if not found
 */
const translate = (key, locale = 'en') => {
  // Default to English if requested locale doesn't exist
  const localeData = translations[locale] || translations.en;
  
  // Handle nested keys (e.g. 'header.home')
  const keyParts = key.split('.');
  let result = localeData;
  
  // Navigate through nested objects
  for (const part of keyParts) {
    if (result && typeof result === 'object' && part in result) {
      result = result[part];
    } else {
      return key; // Return the key if translation not found
    }
  }
  
  return result;
};

export { translate, translations };
