import React from "react";
import styles from './EliteVetBenefits.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function EliteVetBenefits() {
  const { locale, isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const benefits = t('about.benefits.items', { returnObjects: true });

  return (
    <>
      <section className={styles.contentInner} dir={dir}> 
        <div className={styles.overlay} />
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            {/* Image Column - Now first in order */}
            <div className={`${styles.column} ${styles.imageColumn} wow fadeInUp`}> 
              <div className={styles.contentMedia}>
                <div className={styles.dzMedia}>
                  <img 
                    src="/images/About-us/img5.webp" 
                    alt={t('about.benefits.imageAlt')} 
                    className={styles.image} 
                  />
                </div>
                <div className={styles.item1}>
                  <div className={styles.infoWidget}>
                    <span className={styles.contentText}>
                      <span className="counter">{t('about.benefits.experience.years').replace('+', '')}</span>
                      <span className={styles.counterSpan}>+</span>
                    </span>
                    <h3 className={styles.title}>
                      {t('about.benefits.experience.title').split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i === 0 && <br />}
                        </React.Fragment>
                      ))}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            {/* Content Column - Now second in order */}
            <div className={`${styles.column} ${styles.contentColumn} wow fadeInUp`}> 
              <div className={styles.sectionHead}>
                <h2 className={styles.title}>
                  {t('about.benefits.title').split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i === 0 && <br />}
                    </React.Fragment>
                  ))}
                </h2>
              </div>
              <div className={styles.rowWrapper}> 
                {benefits.map((item, index) => (
                  <div key={index} className={styles.column}> 
                    <div 
                      className={styles.iconBxWrapper} 
                      style={{ animationDelay: `${(index + 2) * 0.2}s` }}
                    > 
                      <div className={styles.iconBx}>
                        <span className="icon-cell">
                          <i className={`fas fa-${item.icon} fa-2x`} />
                        </span>
                      </div>
                      <div className={styles.iconContent}>
                        <h3 className={styles.dzTitle}>
                          {item.title}
                        </h3>
                        <p className={styles.description}> 
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
