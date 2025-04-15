import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { locale, changeLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const languageMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu);
  };

  return (
    <div className={styles.languageContainer} ref={languageMenuRef}>
      <button 
        className={styles.languageButton} 
        onClick={toggleLanguageMenu}
        aria-expanded={showLanguageMenu}
        aria-haspopup="true"
      >
        <i className="fa-solid fa-globe"></i>
        <span>{locale === 'en' ? 'English' : 'العربية'}</span>
        <i className={`fa-solid fa-chevron-down ${showLanguageMenu ? styles.rotateIcon : ''}`}></i>
      </button>
      {showLanguageMenu && (
        <div className={styles.languageDropdown}>
          <button 
            className={`${styles.languageItem} ${locale === 'en' ? styles.activeLanguage : ''}`} 
            onClick={() => {
              changeLanguage('en');
              setShowLanguageMenu(false);
            }}
          >
            <span>English</span>
            {locale === 'en' && <i className="fa-solid fa-check"></i>}
          </button>
          <button 
            className={`${styles.languageItem} ${locale === 'ar' ? styles.activeLanguage : ''}`} 
            onClick={() => {
              changeLanguage('ar');
              setShowLanguageMenu(false);
            }}
          >
            <span>العربية</span>
            {locale === 'ar' && <i className="fa-solid fa-check"></i>}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
