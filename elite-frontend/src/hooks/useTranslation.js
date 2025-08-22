import { useLanguage } from '@/context/LanguageContext';

/**
 * Enhanced translation hook with additional features
 */
export const useTranslation = () => {
  const { t, locale, isRTL, changeLanguage } = useLanguage();

  /**
   * Translate with interpolation support
   * @param {string} key - Translation key
   * @param {Object} params - Parameters for interpolation
   * @returns {string} Translated string
   */
  const translate = (key, params = {}) => {
    let translation = t(key);
    
    // Handle interpolation
    if (params && typeof translation === 'string') {
      Object.keys(params).forEach(param => {
        const regex = new RegExp(`{{\\s*${param}\\s*}}`, 'g');
        translation = translation.replace(regex, params[param]);
      });
    }
    
    return translation;
  };

  /**
   * Get direction-aware CSS classes
   * @param {string} baseClasses - Base CSS classes
   * @returns {string} CSS classes with direction-aware modifications
   */
  const getDirectionClasses = (baseClasses = '') => {
    const directionClass = isRTL ? 'rtl' : 'ltr';
    const textAlign = isRTL ? 'text-right' : 'text-left';
    
    return `${baseClasses} ${directionClass} ${textAlign}`.trim();
  };

  /**
   * Get page direction
   * @returns {string} 'rtl' or 'ltr'
   */
  const getDirection = () => isRTL ? 'rtl' : 'ltr';

  /**
   * Format number based on locale
   * @param {number} number - Number to format
   * @param {Object} options - Formatting options
   * @returns {string} Formatted number
   */
  const formatNumber = (number, options = {}) => {
    return new Intl.NumberFormat(locale, options).format(number);
  };

  /**
   * Format date based on locale
   * @param {Date|string} date - Date to format
   * @param {Object} options - Formatting options
   * @returns {string} Formatted date
   */
  const formatDate = (date, options = {}) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, options).format(dateObj);
  };

  /**
   * Get plural form based on count and locale
   * @param {string} key - Base translation key
   * @param {number} count - Count for pluralization
   * @returns {string} Translated plural form
   */
  const getPlural = (key, count) => {
    if (locale === 'ar') {
      // Arabic pluralization rules
      if (count === 0) return t(`${key}Zero`) || t(`${key}Other`);
      if (count === 1) return t(`${key}One`) || t(`${key}Singular`);
      if (count === 2) return t(`${key}Two`) || t(`${key}Other`);
      if (count >= 3 && count <= 10) return t(`${key}Few`) || t(`${key}Other`);
      if (count >= 11 && count <= 99) return t(`${key}Many`) || t(`${key}Other`);
      return t(`${key}Other`) || t(key);
    } else {
      // English pluralization rules
      if (count === 1) return t(`${key}One`) || t(`${key}Singular`) || t(key);
      return t(`${key}Other`) || t(`${key}Plural`) || t(key);
    }
  };

  return {
    t: translate,
    locale,
    isRTL,
    changeLanguage,
    getDirection,
    getDirectionClasses,
    formatNumber,
    formatDate,
    getPlural
  };
};

export default useTranslation;
