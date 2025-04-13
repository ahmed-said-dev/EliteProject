import React from 'react';
import styles from './Divider.module.css';
import PawPrint from './components/PawPrint';
import GradientLine from './components/GradientLine';

const Divider: React.FC = () => {
  return (
    <div className={styles.customDivider}>
      <div className={styles.dividerContent}>
        <PawPrint position="left" />
        <GradientLine />
        <PawPrint position="right" />
      </div>
    </div>
  );
};

export default Divider;
