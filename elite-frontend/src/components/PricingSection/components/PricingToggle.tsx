import React, { useState } from 'react';
import styles from './PricingToggle.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface PricingToggleProps {
  onToggle: (isMonthly: boolean) => void;
}

const PricingToggle: React.FC<PricingToggleProps> = ({ onToggle }) => {
  const { t } = useLanguage();
  const [isMonthly, setIsMonthly] = useState(true);

  const handleToggle = (monthly: boolean) => {
    setIsMonthly(monthly);
    onToggle(monthly);
  };

  return (
    <div className={styles.pricingToggle}>
      <div className={styles.toggleWrapper}>
        <button
          className={`${styles.toggleBtn} ${isMonthly ? styles.toggleBtnActive : ''}`}
          onClick={() => handleToggle(true)}
        >
          {t('pricing.toggle.monthly')}
        </button>
        <button
          className={`${styles.toggleBtn} ${!isMonthly ? styles.toggleBtnActive : ''}`}
          onClick={() => handleToggle(false)}
        >
          {t('pricing.toggle.annual')}
        </button>
      </div>
    </div>
  );
};

export default PricingToggle;
