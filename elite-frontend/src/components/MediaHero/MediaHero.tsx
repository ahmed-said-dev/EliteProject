import React from 'react';
import Link from 'next/link';
// @ts-ignore
import styles from './MediaHero.module.css';
import { useLanguage } from '@/context/LanguageContext';

const MediaHero: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  return (
    <section className={styles.heroSection} dir={dir}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.contentCol}>
            <div className={styles.heroContent}>
              <h2 className={styles.title}>
                {t('mediaHero.title.start')} <span className={styles.highlight}>{t('mediaHero.title.highlight')}</span>
              </h2>
              <p className={styles.description}>
                {t('mediaHero.description')}
              </p>
              <div className={styles.btnGroup}>
                <Link href="/contact" className={styles.btnPrimary}>
                  {t('mediaHero.buttons.consultation')}
                </Link>
                <Link href="/services" className={styles.btnOutline}>
                  {t('mediaHero.buttons.services')}
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1581888227599-779811939961?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt={t('mediaHero.image.alt')} 
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
