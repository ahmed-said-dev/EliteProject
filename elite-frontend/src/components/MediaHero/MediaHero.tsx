import React from 'react';
import Link from 'next/link';
// @ts-ignore
import styles from './MediaHero.module.css';

const MediaHero: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.contentCol}>
            <div className={styles.heroContent}>
              <h2 className={styles.title}>
                Stay Informed with Expert <span className={styles.highlight}>Veterinary Insights</span>
              </h2>
              <p className={styles.description}>
                Explore our collection of professional articles, tips, and stories from Elite Veterinary experts. 
                Get the latest information on pet health, nutrition, behavior, and preventative care to help your 
                furry family members live their best lives.
              </p>
              <div className={styles.btnGroup}>
                <Link href="/contact" className={styles.btnPrimary}>
                  Schedule a Consultation
                </Link>
                <Link href="/services" className={styles.btnOutline}>
                  Our Services
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Veterinarian writing blog post" 
                className={styles.image}
              />
              <div className={styles.imageBg}></div>
              <div className={styles.imageDecor}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaHero;
