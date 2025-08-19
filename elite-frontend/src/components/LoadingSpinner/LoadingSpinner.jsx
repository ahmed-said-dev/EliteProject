import React from 'react';
import styles from './LoadingSpinner.module.css';
import { useLanguage } from '@/context/LanguageContext';

const LoadingSpinner = ({ isLoading }) => {
  const { t } = useLanguage();
  if (!isLoading) return null;

  return (
    <div className={styles.spinnerOverlay}>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <div className={styles.dot1}></div>
          <div className={styles.dot2}></div>
          <div className={styles.dot3}></div>
        </div>
        <div className={styles.logoContainer}>
          <img 
            src="/images/logo.png" 
            alt="Elite Vet Logo" 
            className={styles.logo}
          />
        </div>
        <h3 className={styles.loadingText}>{t('loading.text')}</h3>
      </div>
    </div>
  );
};

export default LoadingSpinner;
