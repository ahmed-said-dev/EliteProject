import React from 'react';
import styles from './styles/MapSection.module.css';

const MapSection: React.FC = () => {
  return (
    <section className={styles.mapSection}>
      <div className={styles.mapContainer}>
        <div className={styles.mapOverlay}>
          <div className={styles.locationInfo}>
            <div className={styles.logoContainer}>
              <img src="/images/logo.png" alt="Elite Veterinary Logo" className={styles.logo} />
            </div>
            <div className={styles.addressInfo}>
              <h3>Elite Veterinary Clinic</h3>
              <p>Qurtubah gate, Al Thoumamah Rd, Qurtubah, Riyadh 13248</p>
              <a 
                href="https://goo.gl/maps/Cj7QXvdVTkCkC1Zv7" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.directionsLink}
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
        {/* Google Maps iFrame */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.2307203352765!2d46.71088431502346!3d24.722551584124702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0a16e68f3f9d%3A0xa612ac89e7da98d4!2sAl%20Thumamah%20Rd%2C%20Qurtubah%2C%20Riyadh%2013248%2C%20Saudi%20Arabia!5e0!3m2!1sen!2seg!4v1618317783984!5m2!1sen!2seg" 
          className={styles.googleMap} 
          allowFullScreen 
          loading="lazy"
          title="Elite Veterinary Clinic Location"
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;
