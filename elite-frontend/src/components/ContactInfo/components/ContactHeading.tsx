import React from 'react';
import styles from '../styles/ContactHeading.module.css';
import { useLanguage } from '@/context/LanguageContext';

const ContactHeading: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <div className={styles.sectionHead} dir={dir}>
      <h2 className={styles.title}>
        {t('contact.heading.title')}
      </h2>
      <p className={styles.description}>
        {t('contact.heading.description')}
      </p>
    </div>
  );
};

export default ContactHeading;
