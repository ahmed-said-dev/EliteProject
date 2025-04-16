import React from "react";
import styles from "./TeamSection.module.css";
import TeamMember, { TeamMemberProps } from "./TeamMember";
import { useLanguage } from "@/context/LanguageContext";

interface TeamMemberData extends TeamMemberProps {
  name: string;
  position: string;
  imageSrc: string;
  specialties: Array<{ icon: string; text: string }>;
  socialLinks: Array<{ platform: string; url: string; icon: string }>;
  isActive: boolean;
  animationDelay: string;
}

export default function TeamSection() {
  const { locale, isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const teamMembers = t('about.team.members', { returnObjects: true }) as TeamMemberData[];

  const membersWithDefaults = teamMembers.map((member, index) => ({
    ...member,
    isActive: true,
    animationDelay: `${index * 0.2}s`,
    socialLinks: [
      { platform: 'facebook', icon: 'fab fa-facebook-f', url: '#' },
      { platform: 'twitter', icon: 'fab fa-twitter', url: '#' },
      { platform: 'linkedin', icon: 'fab fa-linkedin-in', url: '#' }
    ]
  }));

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
        <div className={styles.teamRow}>
          {membersWithDefaults.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}
