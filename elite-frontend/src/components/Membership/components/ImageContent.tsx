import React, { useEffect, useRef } from 'react';
import styles from '../Membership.module.css';
import { useLanguage } from '@/context/LanguageContext';

const ImageContent: React.FC = () => {
  const { t } = useLanguage();
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Subtle continuous floating animation
    const imageWrapper = imageRef.current;
    if (imageWrapper) {
      imageWrapper.style.animation = `${styles.float} 4s ease-in-out infinite`;
    }
  }, []);

  return (
    <div className={styles.introMedia}>
      <div className={styles.imageWrapper} ref={imageRef}>
        <img
          className={styles.mainImg}
          alt={t('membership.image.alt')}
          src="https://i.pinimg.com/736x/7c/33/25/7c3325721e270f7f4792acd017492178.jpg"
        />
        {/* Decorative shapes */}
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
      </div>
    </div>
  );
};

export default ImageContent;
