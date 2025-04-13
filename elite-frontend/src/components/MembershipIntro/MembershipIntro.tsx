import React from 'react';
import styles from './MembershipIntro.module.css';
import ContentSection from './components/ContentSection';
import ImageSection from './components/ImageSection';

const MembershipIntro: React.FC = () => {
  return (
    <section className={styles.introSection}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <ContentSection />
          </div>
          <div className={`${styles.col} ${styles.imageCol}`}>
            <ImageSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipIntro;
