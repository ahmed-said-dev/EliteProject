import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './LanguageSwitcher.module.css';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦'
  }
];

export const LanguageSwitcher: React.FC = () => {
  const { locale, changeLanguage, isRTL, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];
  const dir = isRTL ? 'rtl' : 'ltr';

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.languageSwitcher} ${isRTL ? styles.rtl : styles.ltr}`} dir={dir}>
      <button
        className={styles.trigger}
        onClick={toggleDropdown}
        aria-label={t('header.language')}
        aria-expanded={isOpen}
      >
        <FontAwesomeIcon icon={faGlobe} className={styles.globeIcon} />
        <span className={styles.currentLang}>
          <span className={styles.flag}>{currentLanguage.flag}</span>
          <span className={styles.langName}>{currentLanguage.nativeName}</span>
        </span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`${styles.chevron} ${isOpen ? styles.chevronUp : ''}`} 
        />
      </button>

      {isOpen && (
        <div className={`${styles.dropdown} ${isRTL ? styles.dropdownRtl : styles.dropdownLtr}`}>
          <div className={styles.dropdownHeader}>
            <FontAwesomeIcon icon={faGlobe} className={styles.headerIcon} />
            <span>{t('header.language')}</span>
          </div>
          
          <div className={styles.languageList}>
            {languages.map((language) => (
              <button
                key={language.code}
                className={`${styles.languageOption} ${
                  language.code === locale ? styles.active : ''
                }`}
                onClick={() => handleLanguageChange(language.code)}
                dir={language.code === 'ar' ? 'rtl' : 'ltr'}
              >
                <span className={styles.flag}>{language.flag}</span>
                <div className={styles.languageInfo}>
                  <span className={styles.nativeName}>{language.nativeName}</span>
                  <span className={styles.englishName}>{language.name}</span>
                </div>
                {language.code === locale && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default LanguageSwitcher;
