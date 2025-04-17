import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from '../../../styles/components/EmergencyOutro.module.css';
import { PhoneLink } from './PhoneLink';
import { EmergencyBadge } from './EmergencyBadge';

export const EmergencyOutro: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className={styles.outroSection}>
      <div className={styles.container}>
        <div className={styles.outroWrapper}>
          <div className={styles.row}>
            <div className={styles.colLeft}>
              <div className={styles.outroContent}>
                <div className={styles.outroHeader}>
                  <span className={styles.subtitle}>{t('appointment.emergencyOutro.subtitle')}</span>
                  <h2 className={styles.title}>{t('appointment.emergencyOutro.title')}</h2>
                </div>
                <div className={styles.outroText}>
                  <p>
                    {t('appointment.emergencyOutro.text1')}
                  </p>
                  <p className={styles.emergencyNote}>
                    {t('appointment.emergencyOutro.text2')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={styles.colRight}>
              <div className={styles.contactBox}>
                <div className={styles.phoneNumbers}>
                  <PhoneLink 
                    phoneNumber={t('appointment.emergencyOutro.phones.landline')}
                    icon="fas fa-phone-alt" 
                  />
                  <PhoneLink 
                    phoneNumber={t('appointment.emergencyOutro.phones.mobile')}
                    icon="fas fa-mobile-alt" 
                  />
                </div>
                <EmergencyBadge text={t('appointment.emergencyOutro.badge')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
