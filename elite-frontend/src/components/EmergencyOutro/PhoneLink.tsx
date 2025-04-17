import React from 'react';
import styles from '../../../styles/components/EmergencyOutro.module.css';

interface PhoneLinkProps {
  phoneNumber: string;
  icon: string;
}

export const PhoneLink: React.FC<PhoneLinkProps> = ({ phoneNumber, icon }) => {
  // Format the phone number for href
  const formattedNumber = phoneNumber.replace(/[^0-9]/g, '');
  
  return (
    <a 
      className={styles.phoneLink} 
      href={`tel:${formattedNumber}`}
    >
      <i className={`${icon} ${styles.phoneIcon}`} />
      <span>{phoneNumber}</span>
    </a>
  );
};
