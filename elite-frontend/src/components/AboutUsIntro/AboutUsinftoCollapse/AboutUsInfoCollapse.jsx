import React from 'react';
import styles from './AboutUsInfoCollapse.module.css';
import { 
  FaCamera,
  FaComment,
  FaPhone,
  FaMicrophone,
  FaVideo,
  FaPaw
} from 'react-icons/fa';

const AboutUsInfoCollapse = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img 
          src="/images/clinic-exterior.jpg" 
          alt="عيادة النخبة البيطرية" 
          className={styles.clinicImage}
        />
        
        <div className={styles.emergencyCard}>
          <div className={styles.petImageContainer}>
            <img 
              src="/images/emergency-pets.jpg" 
              alt="رعاية طوارئ للحيوانات الأليفة" 
              className={styles.emergencyImage}
            />
            <div className={styles.emergencyLabel}>
              رعاية طوارئ 24/7
            </div>
          </div>
          <div className={styles.callActions}>
            <div className={styles.callIcons}>
              <a href="/#" className={styles.iconLink} aria-label="كاميرا">
                <FaCamera />
              </a>
              <a href="/#" className={styles.iconLink} aria-label="رسالة">
                <FaComment />
              </a>
              <a href="/#" className={`${styles.iconLink} ${styles.active}`} aria-label="اتصال">
                <FaPhone />
              </a>
              <a href="/#" className={styles.iconLink} aria-label="ميكروفون">
                <FaMicrophone />
              </a>
              <a href="/#" className={styles.iconLink} aria-label="فيديو">
                <FaVideo />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.clinicHours}>
          <div className={styles.hoursIcon}>
            <FaPaw />
          </div>
          <div className={styles.hoursContent}>
            <h3>ساعات العمل</h3>
            <div className={styles.schedule}>
              <div className={styles.scheduleRow}>
                <span>الإثنين - السبت</span>
                <strong>08:00 - 22:00</strong>
              </div>
              <div className={styles.scheduleRow}>
                <span>رعاية الطوارئ</span>
                <strong>24/7</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsInfoCollapse;