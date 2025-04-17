import React from 'react';
import styles from '../../../styles/components/EmergencyOutro.module.css';
import { PhoneLink } from './PhoneLink';
import { EmergencyBadge } from './EmergencyBadge';

export const EmergencyOutro: React.FC = () => {
  return (
    <section className={styles.outroSection}>
      <div className={styles.container}>
        <div className={styles.outroWrapper}>
          <div className={styles.row}>
            <div className={styles.colLeft}>
              <div className={styles.outroContent}>
                <div className={styles.outroHeader}>
                  <span className={styles.subtitle}>EMERGENCY VET CARE</span>
                  <h2 className={styles.title}>We're Here When You Need Us</h2>
                </div>
                <div className={styles.outroText}>
                  <p>
                    At Elite Vet, we understand that emergencies can happen at any time. 
                    That's why we offer 24/7 emergency veterinary services to ensure your 
                    pet receives immediate care when they need it most.
                  </p>
                  <p className={styles.emergencyNote}>
                    If your pet is experiencing a veterinary emergency, please contact us immediately.
                  </p>
                </div>
              </div>
            </div>
            
            <div className={styles.colRight}>
              <div className={styles.contactBox}>
                <div className={styles.phoneNumbers}>
                  <PhoneLink 
                    phoneNumber="920011626" 
                    icon="fas fa-phone-alt" 
                  />
                  <PhoneLink 
                    phoneNumber="0540456405" 
                    icon="fas fa-mobile-alt" 
                  />
                </div>
                <EmergencyBadge text="24/7 Emergency Care" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
