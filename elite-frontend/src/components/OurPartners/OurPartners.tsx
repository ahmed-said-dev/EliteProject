import React from "react";
import styles from "./OurPartners.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function OurPartners() {
  const { locale, isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  // Use the specified logo image repeated twice
  const logos = [
    {
      src: '/logo-placeholder.jpg',
      alt: 'Partner Logo 1'
    },
    {
      src: '/logo-placeholder.jpg',
      alt: 'Partner Logo 2'
    }
  ];

  return (
    <>
      <section className={styles.contentInner} dir={dir}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.colLeft}>
              <div className={styles.sectionHead}>
                <h2 className={styles.title}>
                  {t('about.partners.title')}
                </h2>
                <p className={styles.description}>
                  {t('about.partners.description')}
                </p>
              </div>
            </div>
            <div className={styles.colRight}>
              <div className={styles.swiper}>
                <div className={styles.swiperWrapper}>
                  {logos.map((logo, index) => (
                    <div key={index} className={styles.swiperSlide}>
                      <div className={styles.clientsLogo}>
                        <img
                          alt={logo.alt}
                          src={logo.src}
                          className={styles.logoImage}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.swiperPagination} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
