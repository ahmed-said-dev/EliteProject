import React from 'react';
// Using relative path instead of alias to resolve module import issue
import styles from '../../../styles/components/EmergencyCare.module.css';

interface EmergencyFeatureProps {
  text: string;
}

export const EmergencyFeature: React.FC<EmergencyFeatureProps> = ({ text }) => {
  return (
    <div className={styles.featureItem}>
      <i className={`fas fa-check-circle ${styles.featureIcon}`}></i>
      <span className={styles.featureText}>{text}</span>
    </div>
  );
};
