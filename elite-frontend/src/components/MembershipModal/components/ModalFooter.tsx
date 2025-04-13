import React from 'react';
import styles from './ModalFooter.module.css';

interface ModalFooterProps {
  onClose: () => void;
  applyLink: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose, applyLink }) => {
  return (
    <div className={styles.modalFooter}>
      <button 
        className={styles.closeButton} 
        type="button" 
        onClick={onClose}
      >
        Close
      </button>
      <a 
        className={styles.applyButton}
        href={applyLink}
      >
        Apply Now
      </a>
    </div>
  );
};

export default ModalFooter;
