import React, { useState } from 'react';
import styles from './PricingToggle.module.css';

interface PricingToggleProps {
  onToggle: (isMonthly: boolean) => void;
}

const PricingToggle: React.FC<PricingToggleProps> = ({ onToggle }) => {
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
          Monthly
        </button>
        <button
          className={`${styles.toggleBtn} ${!isMonthly ? styles.toggleBtnActive : ''}`}
          onClick={() => handleToggle(false)}
        >
          Annual (save 10%)
        </button>
      </div>
    </div>
  );
};

export default PricingToggle;
