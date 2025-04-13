import React from 'react';
import styles from './ImageSection.module.css';

const ImageSection: React.FC = () => {
  return (
    <div className={styles.introMedia}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.mainImg}
          alt="Pet Care"
          src="https://i.pinimg.com/736x/7c/33/25/7c3325721e270f7f4792acd017492178.jpg"
        />
        <div className={styles.shape1} />
        <div className={styles.shape2} />
      </div>
    </div>
  );
};

export default ImageSection;
