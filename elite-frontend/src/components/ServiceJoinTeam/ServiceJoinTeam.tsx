import React from "react";
import styles from "./ServiceJoinTeam.module.css";
import { useLanguage } from "@/context/LanguageContext";

export default function ServiceJoinTeam() {
  const { locale, isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  return (
    <section
      className={styles.sectionWrapper}
      dir={dir}
    >
      <div className={styles.container}>
        <div className={styles.row}>
          <section className={styles.contentInner}>
            <div className={styles.container}>
              <div className={styles.sectionHead}>
                <div className={styles.circleAnimation}>
                  <div className={styles.circle1}>
                    <span />
                  </div>
                  <div className={styles.circle2}>
                    <span />
                  </div>
                </div>
                <div className={styles.subTitle}>
                  <span className={styles.titleBadge}>
                    <i className="fas fa-stethoscope me-2" />
                    {t('serviceSection.intro.badge')}
                  </span>
                </div>
                <h2 className={styles.title}>
                  {t('serviceSection.title')}
                </h2>
                <div className={styles.descriptionWrapper}>
                  <p className={styles.subText}>
                    {t('serviceSection.intro.description')}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </section>
  );
}
