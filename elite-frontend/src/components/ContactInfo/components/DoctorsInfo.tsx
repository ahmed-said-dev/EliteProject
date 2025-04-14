import React from 'react';
import styles from '../styles/DoctorsInfo.module.css';

const DoctorsInfo: React.FC = () => {
  return (
    <div className={styles.clearfix}>
      <div className={styles.doctorsWrapper}>
        <div className={styles.infoWidget}>
          <div className={styles.avatarGroup}>
            <img
              className={styles.avatar}
              src="/images/avatar/small/avatar1.webp"
              alt="Doctor"
            />
            <img
              className={styles.avatar}
              src="/images/avatar/small/avatar2.webp"
              alt="Doctor"
            />
            <img
              className={styles.avatar}
              src="/images/avatar/small/avatar3.webp"
              alt="Doctor"
            />
            <img
              className={styles.avatar}
              src="/images/avatar/small/avatar4.webp"
              alt="Doctor"
            />
          </div>
          <div className={styles.infoContent}>
            <span className={styles.infoText}>Talk to over 215 doctor</span>
          </div>
        </div>
        <a className={styles.btnLink} href="/team">
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
        <span className={styles.text}>12k+ ratings on google</span>
      </div>
    </div>
  );
};

export default DoctorsInfo;
