import React from 'react';
import styles from './Membership.module.css';
import IntroContent from './components/IntroContent';
import ImageContent from './components/ImageContent';
import { useLanguage } from '@/context/LanguageContext';

const Membership: React.FC = () => {
  const { isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <section className={styles.contentInner} dir={dir}>
      <div className={styles.container}>
        <div className={styles.row}>
          {/* Left column with content */}
          <div className={styles.col}>
            <IntroContent />
          </div>
          
          {/* Right column with image */}
          <div className={styles.col}>
            <ImageContent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;
