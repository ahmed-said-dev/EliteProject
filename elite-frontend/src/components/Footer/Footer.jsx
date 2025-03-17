import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.elite_footer}>
      <div className={styles.container}>
        <div className={styles.footer_grid}>
          {/* Logo and Description Column */}
          <div className={styles.footer_logo_section}>
            <div className={styles.footer_logo}>
              <div className={styles.logo_blend_wrapper}>
                <Image 
                  src="/images/logo.png" 
                  alt="Elite Vet" 
                  width={180}
                  height={80}
                  priority
                  className={styles.blend_divide}
                />
              </div>
            </div>
            <h3 className={styles.footer_title}>Elite Veterinary Clinic:</h3>
            <h4 className={styles.footer_subtitle}>Your Trusted Partner in Pet Care.</h4>
            <p className={styles.footer_description}>
              Discover a new level of veterinary care. From routine check-ups to complex surgeries, 
              our team is dedicated to providing exceptional service & ensuring your pet's well-being.
            </p>
            <div className={styles.footer_wave_decoration}>
              <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
                <path d="M0 10C20 5, 30 15, 50 10C70 5, 80 15, 100 10" stroke="#FFD700" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Contact Information Column */}
          <div className={styles.footer_contact_section}>
            <h3 className={styles.section_title}>Contact us:</h3>
            <ul className={styles.contact_list}>
              <li>
                <div className={styles.icon_wrapper}>
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className={styles.contact_info}>
                  <span className={styles.label}>Call:</span>
                  <a href="tel:+96592011626" className={styles.contact_link}>+965 920 011 626</a>
                </div>
              </li>
              <li>
                <div className={styles.icon_wrapper}>
                  <i className="fas fa-ambulance"></i>
                </div>
                <div className={styles.contact_info}>
                  <span className={styles.label}>Emergency:</span>
                  <a href="tel:+96592011626" className={styles.contact_link}>+965 920 011 626</a>
                  <a href="tel:+966504045640" className={styles.contact_link}>+966 50 404 5640</a>
                </div>
              </li>
              <li>
                <div className={styles.icon_wrapper}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div className={styles.contact_info}>
                  <span className={styles.label}>Email:</span>
                  <a href="mailto:info@elitevevetksa.com" className={styles.contact_link}>info@elitevevetksa.com</a>
                </div>
              </li>
              <li>
                <div className={styles.icon_wrapper}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className={styles.contact_info}>
                  <span className={styles.label}>Address:</span>
                  <span className={styles.address}>Qurtubah gate, Al Thoumamah Rd, Qurtubah, Riyadh 13248</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Working Hours and Social Media Column */}
          <div className={styles.footer_social_section}>
            <h3 className={styles.section_title}>Follow us:</h3>
            <div className={styles.social_icons}>
              <a href="https://facebook.com" className={styles.social_icon} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" className={styles.social_icon} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" className={styles.social_icon} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://tiktok.com" className={styles.social_icon} aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="https://snapchat.com" className={styles.social_icon} aria-label="Snapchat" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-snapchat-ghost"></i>
              </a>
            </div>
            <div className={styles.footer_wave_decoration}>
              <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
                <path d="M0 10C20 5, 30 15, 50 10C70 5, 80 15, 100 10" stroke="#FFD700" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className={styles.working_hours}>
              <h3 className={styles.section_title}>Working hours</h3>
              <p className={styles.hours}>09:00 AM - 10:00 PM</p>
              <p className={styles.emergency_service}>24/7 Emergency Services</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.footer_decorations}>
        {/* Paw Prints */}
        <div className={`${styles.animal_print} ${styles.cat_paw_1}`}><i className="fas fa-paw"></i></div>
        <div className={`${styles.animal_print} ${styles.cat_paw_2}`}><i className="fas fa-paw"></i></div>
        <div className={`${styles.animal_print} ${styles.cat_paw_3}`}><i className="fas fa-paw"></i></div>
        <div className={`${styles.animal_print} ${styles.dog_paw_1}`}><i className="fas fa-paw"></i></div>
        <div className={`${styles.animal_print} ${styles.dog_paw_2}`}><i className="fas fa-paw"></i></div>
        <div className={`${styles.animal_print} ${styles.dog_paw_3}`}><i className="fas fa-paw"></i></div>

        {/* Birds */}
        <div className={`${styles.animal_print} ${styles.bird_1}`}><i className="fas fa-dove"></i></div>
        <div className={`${styles.animal_print} ${styles.bird_2}`}><i className="fas fa-dove"></i></div>

        {/* Fish */}
        <div className={`${styles.animal_print} ${styles.fish_1}`}><i className="fas fa-fish"></i></div>
        <div className={`${styles.animal_print} ${styles.fish_2}`}><i className="fas fa-fish"></i></div>

        {/* Other Animals */}
        <div className={`${styles.animal_print} ${styles.rabbit}`}><i className="fas fa-rabbit"></i></div>
        <div className={`${styles.animal_print} ${styles.turtle}`}><i className="fas fa-turtle"></i></div>
      </div>
    </footer>
  );
};

export default Footer;
