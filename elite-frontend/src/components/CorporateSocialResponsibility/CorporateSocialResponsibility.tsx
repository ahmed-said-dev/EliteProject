import React from "react";
import styles from "./CorporateSocialResponsibility.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function CorporateSocialResponsibility() {
  const { locale, isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const initiatives = t('about.csr.initiatives', { returnObjects: true });

  return (
    <>
      <section className={`${styles.sectionWrapper} ${styles.clearfix}`} dir={dir}>
        <div className={styles.container}>
          <div className={`${styles.contentWrapper}`}>
            <div className={styles.mediaColumn}>
              <div className={styles.contentMedia}>
                <div className={styles.dzMedia}>
                  <img
                    src="/AboutUs/img1.png"
                    alt={t('about.csr.imageAlt')}
                    className={styles.mediaImage}
                  />
                </div>
                <div className={styles.item1}>
                  <div className={styles.infoWidget}>
                    <span className={`${styles.contentText}`}>
                      <span className={styles.counter}>{t('about.csr.experience.years').replace('+', '')}</span>+
                    </span>
                    <h3 className={styles.title}>
                      {t('about.csr.experience.title').split('\n').map((line, i) => (
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
            <div className={styles.textColumn}>
              <div className={styles.sectionHead}>
                <h2 className={`${styles.mainTitle} ${styles.wow}`}>
                  {t('about.csr.title')}
                </h2>
                <p className={`${styles.description} ${styles.wow}`}>
                  {t('about.csr.description')}
                </p>
              </div>
              <h3 className={`${styles.initiativesTitle} ${styles.wow}`}>
                {t('about.csr.initiativesTitle')}
              </h3>
              <ul className={`${styles.listCheckCircle} ${styles.wow}`}>
                {initiatives.map((initiative, index) => (
                  <li key={index} className={styles.listItem}>
                    <i className={`fas fa-${initiative.icon}`} /> {initiative.text}
                  </li>
                ))}
              </ul>
              <p className={`${styles.conclusion} ${styles.wow}`}>
                {t('about.csr.conclusion')}
              </p>
            </div>
          </div>
        </div>
      </section>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes move3 {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(8px, 5px);
  }
}

.overlay-primary-dark:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #4a2d71;
  opacity: 0.95;
  z-index: 0;
}

.title-dashed-separator:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 2px;
  background-color: rgb(124, 88, 211);
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.wow {
  visibility: visible;
}
`,
        }}
      />
    </>
  );
}
