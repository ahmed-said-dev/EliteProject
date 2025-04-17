import React from 'react';
import styles from '../../../styles/components/EmergencyOutro.module.css';

interface EmergencyBadgeProps {
  text: string;
  icon?: string;
}

export const EmergencyBadge: React.FC<EmergencyBadgeProps> = ({ 
  text, 
  icon = 'fas fa-paw'
}) => {
  return (
    <div className={styles.emergencyBadge}>
      <i className={`${icon} ${styles.badgeIcon}`} />
      <span>{text}</span>
    </div>
  );
};
