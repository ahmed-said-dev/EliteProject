import React from 'react';
import styles from '@/styles/components/AppointmentIntro.module.css';

interface FeatureBoxProps {
  icon: string;
  title: string;
  description: string;
  delay: string;
}

export const FeatureBox: React.FC<FeatureBoxProps> = ({ icon, title, description, delay }) => {
  return (
    <div className={styles.featureCol} style={{ animationDelay: delay }}>
      <div className={styles.featureBox}>
        <div className={styles.featureIcon}>
          <i className={`${icon} ${styles.icon}`} />
        </div>
        <h4 className={styles.featureTitle}>{title}</h4>
        <p className={styles.mb0}>{description}</p>
      </div>
    </div>
  );
};
