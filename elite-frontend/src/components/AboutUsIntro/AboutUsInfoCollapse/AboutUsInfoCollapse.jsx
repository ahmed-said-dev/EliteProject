import React from 'react';
import styles from './AboutUsInfoCollapse.module.css';
import { 
  FaCamera,
  FaComment,
  FaPhone,
  FaMicrophone,
  FaVideo,
  FaPaw
} from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

const AboutUsInfoCollapse = () => {
  const { locale, isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <div className={styles.wrapper} dir={dir}>
      <div className={styles.imageWrapper}>
        <img 
          src="/images/img1.webp" 
          alt={t('about.infoCollapse.imageAlt')} 
          className={styles.clinicImage}
          loading="lazy"
        />
        
        <div className={styles.emergencyCard}>
          <div className={styles.petImageContainer}>
            <img 
              src="/images/emergency-pets.webp" 
              alt={t('about.infoCollapse.emergencyPets')} 
              className={styles.emergencyImage}
              loading="lazy"
            />
            <div className={styles.emergencyLabel}>
              {t('about.infoCollapse.emergencyLabel')}
            </div>
          </div>
          <div className={styles.callActions}>
            <div className={styles.callIcons}>
              <a href="/#" className={styles.iconLink} aria-label={t('about.infoCollapse.accessibilityLabels.camera')}>
                <FaCamera />
              </a>
              <a href="/#" className={styles.iconLink} aria-label={t('about.infoCollapse.accessibilityLabels.message')}>
                <FaComment />
              </a>
              <a href="/#" className={`${styles.iconLink} ${styles.active}`} aria-label={t('about.infoCollapse.accessibilityLabels.call')}>
                <FaPhone />
              </a>
              <a href="/#" className={styles.iconLink} aria-label={t('about.infoCollapse.accessibilityLabels.microphone')}>
                <FaMicrophone />
              </a>
              <a href="/#" className={styles.iconLink} aria-label={t('about.infoCollapse.accessibilityLabels.video')}>
                <FaVideo />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.clinicHours}>
          <div className={styles.hoursIcon}>
            <FaPaw />
          </div>
          <div className={styles.hoursContent}>
            <h3>{t('about.infoCollapse.workingHours.title')}</h3>
            <div className={styles.schedule}>
              <div className={styles.scheduleRow}>
                <span>{t('about.infoCollapse.workingHours.weekdays')}</span>
                <strong>{t('about.infoCollapse.workingHours.weekdayHours')}</strong>
              </div>
              <div className={styles.scheduleRow}>
                <span>{t('about.infoCollapse.workingHours.emergency')}</span>
                <strong>{t('about.infoCollapse.workingHours.emergencyHours')}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsInfoCollapse;
