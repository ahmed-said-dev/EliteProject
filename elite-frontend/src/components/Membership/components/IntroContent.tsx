import React from 'react';
import styles from '../Membership.module.css';

const IntroContent: React.FC = () => {
  return (
    <div className={styles.sectionContent}>
      <span className={styles.badge}>Premium Pet Care</span>
      
      <h2 className={styles.title}>
        <span className={styles.textPrimary}>Invest in Your Pet's</span>
        <span className={styles.textDark}>Health with Elite Vet</span>
      </h2>
      
      <h4 className={styles.subTitle}>Comprehensive Care, Simplified</h4>
      
      <div className={styles.featureList}>
        <p className={styles.featureText}>
          At Elite Vet, we believe in providing comprehensive and affordable healthcare for your furry friend.
        </p>
        
        <ul className={styles.listUnstyled}>
          <li className={styles.listItem}>
            <i className={`fas fa-check-circle ${styles.itemIcon}`} />
            <span className={styles.itemText}>Discounted veterinary services</span>
          </li>
          <li className={styles.listItem}>
            <i className={`fas fa-check-circle ${styles.itemIcon}`} />
            <span className={styles.itemText}>Exclusive member perks</span>
          </li>
          <li className={styles.listItem}>
            <i className={`fas fa-check-circle ${styles.itemIcon}`} />
            <span className={styles.itemText}>Priority appointments</span>
          </li>
        </ul>
      </div>
      
      <div className={styles.benefitsList}>
        <h5 className={styles.benefitsTitle}>Membership Benefits</h5>
        <ul className={styles.listUnstyled}>
          <li className={styles.listItem}>
            <i className={`fas fa-paw ${styles.itemIcon}`} />
            <span className={styles.itemText}>
              Free Microchip: Every membership includes a complimentary microchip for your pet.
            </span>
          </li>
          <li className={styles.listItem}>
            <i className={`fas fa-paw ${styles.itemIcon}`} />
            <span className={styles.itemText}>
              Multiple Pet Coverage: Your membership covers up to 3 pets.
            </span>
          </li>
          <li className={styles.listItem}>
            <i className={`fas fa-paw ${styles.itemIcon}`} />
            <span className={styles.itemText}>
              Additional Pet Enrollment: Add more pets to your membership for a fee of 650 SAR for cats and 750 SAR for dogs, per pet.
            </span>
          </li>
        </ul>
      </div>
      
      <CallToActionButton />
    </div>
  );
};

// Call to Action Button Component
const CallToActionButton: React.FC = () => {
  return (
    <div className={styles.actionBox}>
      <h5 className={styles.callToAction}>Ready to Elevate Your Pet's Healthcare?</h5>
      <a 
        className={styles.btnPrimary} 
        href="#membership-form"
      >
        Join Elite Vet Today
        <i className={`fas fa-paw ${styles.btnIcon}`} />
      </a>
    </div>
  );
};

export default IntroContent;
