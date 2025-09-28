import React from 'react';
// Using relative path instead of alias to resolve module import issue
import styles from '../../../styles/components/EmergencyCare.module.css';

interface ServiceBoxProps {
  icon: string;
  title: string;
  description: string;
  delay: string;
}

export const ServiceBox: React.FC<ServiceBoxProps> = ({ 
  icon, 
  title, 
  description,
  delay 
}) => {
  return (
    <div className={styles.serviceBox} style={{ animationDelay: delay }}>
      <div className={styles.serviceHeader}>
        <div className={styles.serviceIconWrap}>
          <div className={styles.iconBox}>
            <i className={`${icon} ${styles.serviceIcon}`}></i>
          </div>
        </div>
        <h4 className={styles.serviceTitle}>{title}</h4>
      </div>
      <p className={styles.serviceDescription}>{description}</p>
    </div>
  );
};
