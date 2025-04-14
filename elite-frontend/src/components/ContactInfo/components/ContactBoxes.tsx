import React from 'react';
import styles from '../styles/ContactBoxes.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faEnvelope, faClock, faUsers, faShare, faHashtag, faCamera, faGhost, faMusic } from '@fortawesome/free-solid-svg-icons';

const ContactBoxes: React.FC = () => {
  return (
    <div className={styles.row}>
      <div className={styles.boxColumn}>
        <div className={styles.iconBox}>
          <div className={styles.iconContainer}>
            <span className={styles.iconCell}>
              <FontAwesomeIcon icon={faMapMarker} />
            </span>
          </div>
          <div className={styles.iconContent}>
            <h4 className={styles.title}>Address</h4>
            <p className={styles.text}>
              Qurtubah gate, Al Thoumamah Rd, Qurtubah, Riyadh 13248
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
            <h4 className={styles.title}>Call Us</h4>
            <p className={styles.text}>
              <a className={styles.link} href="tel:+966112030123">
                +966 011 203 0123
              </a>
              <br />
              <a className={styles.link} href="tel:920011626">
                920011626
              </a>
            </p>
            <h4 className={styles.titleMt}>Emergency</h4>
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
            <h4 className={styles.title}>Send us a Mail</h4>
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
            <h4 className={styles.title}>Opening Time</h4>
            <p className={styles.text}>
              09:00 AM to 10:00 PM
              <br />
              24/7 Emergency Services
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
