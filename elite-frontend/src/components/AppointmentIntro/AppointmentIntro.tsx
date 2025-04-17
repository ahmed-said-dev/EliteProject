import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from '@/styles/components/AppointmentIntro.module.css';
import { FeatureBox } from './FeatureBox';

export const AppointmentIntro = () => {
  const { t } = useLanguage();
  
  return (
    <section className={styles.introSection}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colLeft}>
            <div className={styles.sectionHead}>
              <div className={styles.subTitle}>
                <span className={styles.textPrimary}>{t('appointment.intro.subtitle')}</span>
              </div>
              <h2 className={styles.title}>{t('appointment.intro.title')}</h2>
              <p className={styles.text}>
                {t('appointment.intro.text1')}
              </p>
              <p className={styles.text}>
                {t('appointment.intro.text2')}
              </p>
            </div>
            <div className={styles.featureContainer}>
              <div className={styles.featureRow}>
                <FeatureBox 
                  icon="fas fa-paw" 
                  title={t('appointment.intro.features.feature1.title')}
                  description={t('appointment.intro.features.feature1.description')}
                  delay="0.2s"
                />
                <FeatureBox 
                  icon="fas fa-calendar-check" 
                  title={t('appointment.intro.features.feature2.title')}
                  description={t('appointment.intro.features.feature2.description')}
                  delay="0.4s"
                />
              </div>
            </div>
            <div className={styles.cta}>
              <a className={styles.btnPrimary} href="#appointment-form">
                {t('appointment.intro.cta.button')}
              </a>
              <p className={styles.ctaText}>
                {t('appointment.intro.cta.text')}
              </p>
            </div>
          </div>
          <div className={styles.colRight}>
            <div className={styles.introMedia}>
              <img
                className={styles.image}
                alt="Veterinary Care"
                src="https://images.unsplash.com/photo-1606098216818-40939b7c98ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <div className={styles.experienceCard}>
                <div className={styles.expContent}>
                  <h2 className={styles.expNumber}>{t('appointment.intro.experience.years')}</h2>
                  <p className={styles.mb0}>{t('appointment.intro.experience.text')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
