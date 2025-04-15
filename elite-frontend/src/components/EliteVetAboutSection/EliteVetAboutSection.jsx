import React from "react";
import styles from './EliteVetAboutSection.module.css';
import { FaCircle, FaBriefcaseMedical } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useLanguage } from '@/context/LanguageContext';

export default function EliteVetAboutSection() {
  const { locale, isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';

  return (
    <section className={styles.contentInner} dir={dir}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.colRight}>
            <div className={styles.imageWrapper}>
              <img
                src="/AboutUs/img8.webp"
                alt={t('about.eliteVetSection.imageAlt')}
                className={styles.image}
              />
            </div>
          </div>

          <div className={styles.colLeft}>
            <div className={styles.sectionHead}>
              <h2 className={styles.title}>
                {t('about.eliteVetSection.title').split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i === 0 && <br />}
                  </React.Fragment>
                ))}
              </h2>
              <p className={styles.description}>
                {t('about.eliteVetSection.description')}
              </p>
            </div>
            
            <div className={styles.iconBox}>
              <div className={styles.icon}>
                <FaCircle className={styles.iconSvg} />
              </div>
              <div className={styles.iconContent}>
                <h3 className={styles.iconTitle}>{t('about.eliteVetSection.vision.title')}</h3>
                <p className={styles.iconText}>
                  {t('about.eliteVetSection.vision.text')}
                </p>
              </div>
            </div>

            <div className={`${styles.iconBox} ${styles.right}`}>
              <div className={styles.icon}>
                <FaBriefcaseMedical className={styles.iconSvg} />
              </div>
              <div className={styles.iconContent}>
                <h3 className={styles.iconTitle}>{t('about.eliteVetSection.mission.title')}</h3>
                <p className={styles.iconText}>
                  {t('about.eliteVetSection.mission.text')}
                </p>
                <ul className={styles.list}>
                  {t('about.eliteVetSection.mission.commitments', { returnObjects: true }).map((commitment, index) => (
                    <li key={index} className={styles.listItem}>
                      <BsCheckCircleFill className={styles.checkIcon} />
                      <span>{commitment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
