import React from 'react';
import styles from '../Membership.module.css';
import { useLanguage } from '@/context/LanguageContext';

const IntroContent: React.FC = () => {
  const { t, isRTL } = useLanguage();
  return (
    <div className={styles.sectionContent}>
      <span className={styles.badge}>{t('membership.badge')}</span>
      
      <h2 className={styles.title}>
        <span className={styles.textPrimary}>{t('membership.title.primary')}</span>
        <span className={styles.textDark}>{t('membership.title.secondary')}</span>
      </h2>
      
      <h4 className={styles.subTitle}>{t('membership.subtitle')}</h4>
      
      <div className={styles.featureList}>
        <p className={styles.featureText}>
          {t('membership.intro')}
        </p>
        
        <ul className={styles.listUnstyled}>
          <li className={styles.listItem}>
            <i className={`fas fa-check-circle ${styles.itemIcon}`} />
            <span className={styles.itemText}>{t('membership.features.discounted')}</span>
          </li>
          <li className={styles.listItem}>
            <i className={`fas fa-check-circle ${styles.itemIcon}`} />
            <span className={styles.itemText}>{t('membership.features.perks')}</span>
          </li>
          <li className={styles.listItem}>
            <i className={`fas fa-check-circle ${styles.itemIcon}`} />
            <span className={styles.itemText}>{t('membership.features.priority')}</span>
          </li>
        </ul>
      </div>
      
      <div className={styles.benefitsList}>
        <h5 className={styles.benefitsTitle}>{t('membership.benefitsTitle')}</h5>
        <ul className={styles.listUnstyled}>
          <li className={styles.listItem}>
            <i className={`fas fa-paw ${styles.itemIcon}`} />
            <span className={styles.itemText}>
              {t('membership.benefits.microchip')}
            </span>
          </li>
          <li className={styles.listItem}>
            <i className={`fas fa-paw ${styles.itemIcon}`} />
            <span className={styles.itemText}>
              {t('membership.benefits.coverage')}
            </span>
          </li>
          <li className={styles.listItem}>
            <i className={`fas fa-paw ${styles.itemIcon}`} />
            <span className={styles.itemText}>
              {t('membership.benefits.enrollment')}
            </span>
          </li>
        </ul>
      </div>
      
      <CallToActionButton />
    </div>
  );
};

// Call to Action Button Component
const CallToActionButton: React.FC = () => {
  const { t } = useLanguage();
  
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-plans');
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  return (
    <div className={styles.actionBox}>
      <h5 className={styles.callToAction}>{t('membership.cta.title')}</h5>
      <button 
        className={styles.btnPrimary} 
        onClick={scrollToPricing}
        type="button"
      >
        {t('membership.cta.button')}
        <i className={`fas fa-paw ${styles.btnIcon}`} />
      </button>
    </div>
  );
};

export default IntroContent;
