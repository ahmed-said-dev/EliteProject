import React from "react";
import styles from "./TeamSection.module.css";
import TeamMember from "./TeamMember";
import { useLanguage } from "@/context/LanguageContext";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

// أنماط مضمنة لحاويات الحالات
const inlineStyles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    width: '100%'
  },
  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    width: '100%',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px'
  },
  errorMessage: {
    color: '#d32f2f',
    fontSize: '18px',
    textAlign: 'center' as const // تثبيت نوع القيمة لتفادي خطأ TypeScript
  }
};

export default function TeamSection() {
  const { isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const { formattedTeamMembers, isLoading, error } = useTeamMembers();

  return (
    <section className={styles.sectionTeam} dir={dir}>
      <div className={styles.backgroundShapes}>
        <i className={`fas fa-paw ${styles.petShape} ${styles.pawPrint1}`} />
        <i className={`fas fa-paw ${styles.petShape} ${styles.pawPrint2}`} />
        <i className={`fas fa-paw ${styles.petShape} ${styles.pawPrint3}`} />
        <i className={`fas fa-heart ${styles.petShape} ${styles.heartShape}`} />
        <i className={`fas fa-stethoscope ${styles.petShape} ${styles.stethoscopeShape}`} />
      </div>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <div className={`${styles.col12} ${styles.fadeInUp}`}>
            <h2 className={styles.title}>{t('about.team.title')}</h2>
            <div className={styles.teamIntro}>
              <i className={`fas fa-paw ${styles.introIcon}`} />
              <p className={styles.introText}>
                {t('about.team.intro.text1')}
              </p>
              <p className={styles.introText2}>
                {t('about.team.intro.text2')}
              </p>
              <div className={styles.expertiseHighlight}>
                <i className={`fas fa-medal ${styles.medalIcon}`} />
                <span>
                  {t('about.team.intro.expertise')}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div style={inlineStyles.loadingContainer}>
            <LoadingSpinner isLoading={isLoading} />
          </div>
        ) : error ? (
          <div style={inlineStyles.errorContainer}>
            <p style={inlineStyles.errorMessage}>{t('errors.dataLoading')}</p>
          </div>
        ) : (
          <div className={styles.teamRow}>
            {formattedTeamMembers.map((member, index) => (
              <TeamMember key={member.id || index} {...member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
