import React from 'react';
import styles from '../styles/ContactBoxes.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faEnvelope, faClock, faUsers, faShare, faHashtag, faCamera, faGhost, faMusic } from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '@/context/LanguageContext';

const ContactBoxes: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <div className={styles.row} dir={dir}>
      <div className={styles.boxColumn}>
        <div className={styles.iconBox}>
          <div className={styles.iconContainer}>
            <span className={styles.iconCell}>
              <FontAwesomeIcon icon={faMapMarker} />
            </span>
          </div>
          <div className={styles.iconContent}>
            <h4 className={styles.title}>{t('contact.boxes.address.title')}</h4>
            <p className={styles.text}>
              {t('contact.boxes.address.text')}
            </p>
          </div>
        </div>
      </div>
      
      <div className={styles.boxColumn}>
        <div className={styles.iconBox}>
          <div className={styles.iconContainer}>
            <span className={styles.iconCell}>
              <FontAwesomeIcon icon={faPhone} />
            </span>
          </div>
          <div className={styles.iconContent}>
            <h4 className={styles.title}>{t('contact.boxes.phone.title')}</h4>
            <p className={styles.text}>
              <a className={styles.link} href="tel:+966112030123">
                +966 011 203 0123
              </a>
              <br />
              <a className={styles.link} href="tel:920011626">
                920011626
              </a>
            </p>
            <h4 className={styles.titleMt}>{t('contact.boxes.emergency.title')}</h4>
            <p className={styles.text}>
              <a className={styles.link} href="tel:920011626">
                920011626
              </a>
              <br />
              <a className={styles.link} href="tel:0540456405">
                0540456405
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <div className={styles.boxColumn}>
        <div className={styles.iconBox}>
          <div className={styles.iconContainer}>
            <span className={styles.iconCell}>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </div>
          <div className={styles.iconContent}>
            <h4 className={styles.title}>{t('contact.boxes.email.title')}</h4>
            <p className={styles.text}>
              <a className={styles.link} href="mailto:info@ellitevetksa.com">
                info@ellitevetksa.com
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <div className={styles.boxColumn}>
        <div className={styles.iconBox}>
          <div className={styles.iconContainer}>
            <span className={styles.iconCell}>
              <FontAwesomeIcon icon={faClock} />
            </span>
          </div>
          <div className={styles.iconContent}>
            <h4 className={styles.title}>{t('contact.boxes.hours.title')}</h4>
            <p className={styles.text}>
              <span className={styles.text}><strong>{t('contact.boxes.hours.weekdays')}:</strong> {t('contact.boxes.hours.weekdaysTime')}</span>
              <br />
              {t('contact.boxes.hours.emergencyServices')}
            </p>
          </div>
        </div>
      </div>
      
      <div className={styles.boxColumn}>
        <div className={styles.iconBox}>
          <div className={styles.iconContainer}>
            <span className={styles.iconCell}>
              <FontAwesomeIcon icon={faUsers} />
            </span>
          </div>
          <div className={styles.iconContent}>
            <h4 className={styles.title}>Follow Us</h4>
            <div className={styles.socialMedia}>
              <a className={styles.socialIcon} aria-label="Facebook" href="#">
                <FontAwesomeIcon icon={faShare} />
              </a>
              <a className={styles.socialIcon} aria-label="Twitter" href="#">
                <FontAwesomeIcon icon={faHashtag} />
              </a>
              <a className={styles.socialIcon} aria-label="Instagram" href="#">
                <FontAwesomeIcon icon={faCamera} />
              </a>
              <a className={styles.socialIcon} aria-label="Snapchat" href="#">
                <FontAwesomeIcon icon={faGhost} />
              </a>
              <a className={styles.socialIcon} aria-label="TikTok" href="#">
                <FontAwesomeIcon icon={faMusic} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBoxes;
