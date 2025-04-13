import React from 'react';
import styles from '../Divider.module.css';

interface PawPrintProps {
  position: 'left' | 'right';
}

const PawPrint: React.FC<PawPrintProps> = ({ position }) => {
  return (
    <div className={`${styles.pawPrint} ${position === 'left' ? styles.left : styles.right}`}>
      <i className={`fas fa-paw ${styles.pawIcon}`} />
    </div>
  );
};

export default PawPrint;
