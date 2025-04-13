import React from 'react';
import styles from './BenefitItem.module.css';

interface BenefitItemProps {
  icon: string;
  title: string;
  description: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, title, description }) => {
  return (
    <div className={styles.benefitItem}>
      <i className={`fas ${icon} ${styles.benefitIcon}`} />
      <div className={styles.benefitContent}>
        <h5 className={styles.benefitTitle}>{title}</h5>
        <p className={styles.benefitDescription}>{description}</p>
      </div>
    </div>
  );
};

export default BenefitItem;
