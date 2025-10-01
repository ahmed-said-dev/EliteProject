import React from 'react';
import styles from '../styles/DoctorsInfo.module.css';
import { useLanguage } from '@/context/LanguageContext';

const DoctorsInfo: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <div className={styles.clearfix} dir={dir}>
      <div className={styles.doctorsWrapper}>
        <div className={styles.infoWidget}>
          <div className={styles.avatarGroup}>
            <img
              className={styles.avatar}
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
              alt="Dr. Sarah Johnson"
            />
            <img
              className={styles.avatar}
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
              alt="Dr. Michael Rodriguez"
            />
            <img
              className={styles.avatar}
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
              alt="Dr. Emily Chen"
            />
            <img
              className={styles.avatar}
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
              alt="Dr. James Wilson"
            />
            <img
              className={styles.avatar}
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
              alt="Dr. Olivia Carter"
            />
          </div>
          <div className={styles.infoContent}>
            <span className={styles.infoText}>{t('contact.doctors.count')}</span>
          </div>
        </div>
        <a className={styles.btnLink} aria-label={t('contact.doctors.meetTeam')} style={{ cursor: 'default' }}>
          <svg
            height="24"
            width="24"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7"
              stroke="var(--bs-primary)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M7 7H17V17"
              stroke="var(--bs-primary)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </a>
      </div>
      
      <div className={styles.widgetRating}>
        <ul className={styles.starList}>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <li key={index} className={styles.starItem}>
              <i className="fa fa-star" />
            </li>
          ))}
        </ul>
        <span className={styles.rating}>(4.8)</span>
        <span className={styles.text}>{t('contact.doctors.ratings')} 12k+ {t('contact.doctors.onGoogle')}</span>
      </div>
    </div>
  );
};

export default DoctorsInfo;
