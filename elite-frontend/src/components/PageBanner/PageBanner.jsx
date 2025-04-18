import { useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/PageBanner.module.css';
import { useLanguage } from '@/context/LanguageContext';

const PageBanner = ({ title, backgroundImage }) => {
  const { isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const WOW = require('wowjs');
      const wow = new WOW.WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true
      });
      wow.init();
    }
  }, []);

  return (
    <div
      className={`${styles.bannerContainer} ${styles.overlay}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      dir={dir}
    >
      <div className={styles.container}>
        <div className={styles.entry}>
          <h1
            className={`wow ${styles.title}`}
            data-wow-delay="0.2s"
            data-wow-duration="0.8s"
          >
            {title}
          </h1>
          <nav
            aria-label="breadcrumb"
            className={`breadcrumb-row wow ${styles.breadcrumb}`}
            data-wow-delay="0.4s"
            data-wow-duration="0.8s"
          >
            <ul className={styles.breadcrumb}>
              <li className={styles.breadcrumbItem}>
                <Link href="/" style={{ color: '#ffffff', textDecoration: 'none' }}>
                  {t('pageBanner.home')}
                </Link>
              </li>
              <li className={styles.breadcrumbItem}>{title}</li>
            </ul>
          </nav>
        </div>
      </div>
      <div className={styles.phoneContainer}>
        <a
          href="tel:78904561231"
          className={styles.phoneButton}
        >
          <span className={styles.phoneIcon}>
            <i className="fa-solid fa-phone"></i>
          </span>
          +965 920 011 626
        </a>
      </div>
      <span 
        className={styles.textVertical}
      >
        24/7 EMERGENCY SERVICE
      </span>
      <ul 
        className={styles.socialLinks}
      >
        <li style={{ marginBottom: '15px' }}>
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li style={{ marginBottom: '15px' }}>
          <a 
            href="https://www.facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>
        </li>
        <li style={{ marginBottom: '15px' }}>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </li>
        <li>
          <a 
            href="https://www.youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PageBanner;
