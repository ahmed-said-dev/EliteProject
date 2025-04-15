import React from 'react';
import styles from './Divider.module.css';
import PawPrint from './components/PawPrint';
import GradientLine from './components/GradientLine';

interface DividerProps {
  transparent?: boolean;
}

const Divider: React.FC<DividerProps> = ({ transparent = false }) => {
  return (
    <div className={`${styles.customDivider} ${transparent ? styles.transparentBg : ''}`}>
      <div className={styles.dividerContent}>
        <PawPrint position="left" />
        <GradientLine />
        <PawPrint position="right" />
      </div>
    </div>
  );
};

export default Divider;
