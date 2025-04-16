import React from 'react';
import styles from './ModalFooter.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface ModalFooterProps {
  onClose: () => void;
  applyLink: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose, applyLink }) => {
  const { t } = useLanguage();
  return (
    <div className={styles.modalFooter}>
      <button 
        className={styles.closeButton} 
        type="button" 
        onClick={onClose}
      >
        {t('membershipModal.buttons.close')}
      </button>
      <a 
        className={styles.applyButton}
        href={applyLink}
      >
        {t('membershipModal.buttons.apply')}
      </a>
    </div>
  );
};

export default ModalFooter;
