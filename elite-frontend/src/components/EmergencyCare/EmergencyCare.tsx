import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from '../../../styles/components/EmergencyCare.module.css';
import { EmergencyFeature } from './EmergencyFeature';
import { ServiceBox } from './ServiceBox';

export const EmergencyCare: React.FC = () => {
  const { t } = useLanguage();

  // Emergency features list
  const emergencyFeatures = t('appointment.emergencyCare.features', { returnObjects: true });

  // Emergency services list with translations
  const emergencyServices = [
    {
      icon: "fas fa-heartbeat",
      title: t('appointment.emergencyCare.services.0.title'),
      description: t('appointment.emergencyCare.services.0.description'),
      delay: "0.1s"
    },
    {
      icon: "fas fa-x-ray",
      title: t('appointment.emergencyCare.services.1.title'),
      description: t('appointment.emergencyCare.services.1.description'),
      delay: "0.3s"
    },
    {
      icon: "fas fa-stethoscope",
      title: t('appointment.emergencyCare.services.2.title'),
      description: t('appointment.emergencyCare.services.2.description'),
      delay: "0.5s"
    },
    {
      icon: "fas fa-capsules",
      title: t('appointment.emergencyCare.services.3.title'),
      description: t('appointment.emergencyCare.services.3.description'),
      delay: "0.7s"
    }
  ];

  return (
    <section className={styles.emergencyCareSection}>
      <div className={styles.container}>
        <div className={styles.contentArea}>
          <h2 className={styles.emergencyTitle}>
            <i className="fas fa-paw" style={{marginRight: '10px', color: '#FFD700'}}></i>
            {t('appointment.emergencyCare.title')}
          </h2>
          <h3 className={styles.emergencySubtitle}>{t('appointment.emergencyCare.subtitle')}</h3>
          
          <p className={styles.emergencyDescription}>
            {t('appointment.emergencyCare.description')}
          </p>
          
          <div className={styles.featuresContainer}>
            {emergencyFeatures.map((feature, index) => (
              <EmergencyFeature key={index} text={feature} />
            ))}
          </div>
          
          <a 
            href={`tel:${t('appointment.emergencyCare.contactNumber').replace(/[^0-9]/g, '')}`}
            className={styles.emergencyContact}
          >
            <i className={`fas fa-phone-alt ${styles.phoneIcon}`}></i>
            <span className={styles.phoneNumber}>{t('appointment.emergencyCare.contactNumber')}</span>
          </a>
          
          <a href="/contact" className={styles.actionButton}>
            {t('appointment.emergencyCare.contactButton')}
          </a>
        </div>
        
        <div className={styles.servicesArea}>
          {emergencyServices.map((service, index) => (
            <ServiceBox 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
