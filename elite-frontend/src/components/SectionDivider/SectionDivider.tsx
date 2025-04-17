import React from 'react';
import styles from '../../../styles/components/SectionDivider.module.css';

interface SectionDividerProps {
  icon?: string;
  color?: string;
  topColor?: string;
  bottomColor?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ 
  icon = "fas fa-heart-pulse",
  color = "#7c58d3",
  topColor,
  bottomColor
}) => {
  // Create gradient color based on either the custom colors or the base color
  const gradientColor = {
    background: topColor && bottomColor
      ? `linear-gradient(to bottom, ${topColor} 0%, ${bottomColor} 100%)`
      : `linear-gradient(135deg, ${color} 0%, #4a2d71 100%)`
  };
  
  return (
    <div className={styles.sectionDivider}>
      <div className={styles.horizontalLine}></div>
      <div className={styles.dividerContent}>
        <div 
          className={styles.dividerIcon} 
          style={gradientColor}
        >
          <i className={`${icon} ${styles.icon}`} />
        </div>
      </div>
    </div>
  );
};
