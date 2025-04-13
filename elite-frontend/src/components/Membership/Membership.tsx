import React from 'react';
import styles from './Membership.module.css';
import IntroContent from './components/IntroContent';
import ImageContent from './components/ImageContent';

const Membership: React.FC = () => {
  return (
    <section className={styles.contentInner}>
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
