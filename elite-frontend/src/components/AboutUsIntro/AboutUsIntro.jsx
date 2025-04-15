import React from "react";
import styles from "./AboutUsIntro.module.css";
import { 
  FaPaw, 
  FaStethoscope, 
  FaXRay, 
  FaCapsules, 
  FaUserMd, 
  FaClinicMedical,
  FaPhoneAlt,
  FaArrowRight,
  FaPhone,
  FaMicrophone,
  FaVideo,
  FaComment
} from "react-icons/fa";
import AboutUsInfoCollapse from "./AboutUsInfoCollapse/AboutUsInfoCollapse";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutUsIntro() {
  const { locale, isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <>
      <section className={`content-inner ${styles.contentInner}`}
                style={{
                  backgroundImage: 'url(/background/bg1.png)',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right bottom'
                }}
                dir={dir}
      >
        <div className={`container ${styles.container}`}>
          <div className={`row ${styles.contentWrapper}`}>
            <div className={`col-xl-6 ${styles.colXl6}`}>
              <div className={styles.contentSection}>
                <h2 className={styles.title} style={{ textAlign: isRTL ? 'right' : 'left' }}>{t('about.intro.title')}</h2>
                <p className={styles.description} style={{ textAlign: isRTL ? 'right' : 'left' }}>
                  {t('about.intro.description')}
                </p>
                <div className={styles.services}>
                  <div className={styles.serviceItem}>
                    <FaPaw className={styles.icon} />
                    <span>{t('about.intro.services.advancedPetCare')}</span>
                  </div>
                  <div className={styles.serviceItem}>
                    <FaStethoscope className={styles.icon} />
                    <span>{t('about.intro.services.emergencyServices')}</span>
                  </div>
                  <div className={styles.serviceItem}>
                    <FaXRay className={styles.icon} />
                    <span>{t('about.intro.services.diagnosticImaging')}</span>
                  </div>
                  <div className={styles.serviceItem}>
                    <FaUserMd className={styles.icon} />
                    <span>{t('about.intro.services.expertVeterinarians')}</span>
                  </div>
                  <div className={styles.serviceItem}>
                    <FaCapsules className={styles.icon} />
                    <span>{t('about.intro.services.pharmacyServices')}</span>
                  </div>
                  <div className={styles.serviceItem}>
                    <FaClinicMedical className={styles.icon} />
                    <span>{t('about.intro.services.surgeryCenter')}</span>
                  </div>
                </div>
                <div className={styles.actionArea}>
                  <a href="/appointment" className={styles.appointmentButton}>
                    {t('about.intro.actions.bookAppointment')}
                    <span className={styles.rightIcon}>
                      <FaArrowRight />
                    </span>
                  </a>
                  <div className={styles.emergencyHotline}>
                    <div className={styles.hotlineIcon}>
                      <FaPhoneAlt />
                    </div>
                    <div className={styles.hotlineContent}>
                      <span>{t('about.intro.actions.emergencyHotline')}</span>
                      <strong>{t('about.intro.actions.phoneNumber')}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`col-xl-6 ${styles.colXl6}`}>
              <AboutUsInfoCollapse />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
