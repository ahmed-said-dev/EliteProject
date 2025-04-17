import React from 'react';
import styles from '../../../styles/components/EmergencyCare.module.css';
import { EmergencyFeature } from './EmergencyFeature.tsx';
import { ServiceBox } from './ServiceBox.tsx';

export const EmergencyCare: React.FC = () => {
  // Emergency features list
  const emergencyFeatures = [
    "24/7 Emergency Veterinary Services",
    "Highly Qualified Veterinary Specialists",
    "Advanced Medical Equipment",
    "Dedicated Intensive Care Units"
  ];

  // Emergency services list
  const emergencyServices = [
    {
      icon: "fas fa-heartbeat",
      title: "Critical Care",
      description: "Immediate treatment for life-threatening conditions and intensive monitoring.",
      delay: "0.1s"
    },
    {
      icon: "fas fa-x-ray",
      title: "Emergency Surgery",
      description: "Rapid surgical intervention for trauma, foreign body removal, and more.",
      delay: "0.3s"
    },
    {
      icon: "fas fa-stethoscope",
      title: "Urgent Consultation",
      description: "Quick evaluation and diagnosis for sudden illness or injury in pets.",
      delay: "0.5s"
    },
    {
      icon: "fas fa-capsules",
      title: "Poison Control",
      description: "Fast treatment for pets who have ingested toxic substances.",
      delay: "0.7s"
    }
  ];

  return (
    <section className={styles.emergencyCareSection}>
      <div className={styles.container}>
        <div className={styles.contentArea}>
          <h2 className={styles.emergencyTitle}><i className="fas fa-paw" style={{marginRight: '10px', color: '#FFD700'}}></i>Emergency Veterinary Care</h2>
          <h3 className={styles.emergencySubtitle}>Available 24/7 for Your Pet's Urgent Needs</h3>
          
          <p className={styles.emergencyDescription}>
            Our emergency veterinary team is always ready to provide immediate care when your pet needs it most. 
            We understand that emergencies can happen at any hour, which is why our facility is equipped to 
            handle critical situations around the clock.
          </p>
          
          <div className={styles.featuresContainer}>
            {emergencyFeatures.map((feature, index) => (
              <EmergencyFeature key={index} text={feature} />
            ))}
          </div>
          
          <div className={styles.emergencyContact}>
            <i className={`fas fa-phone-alt ${styles.phoneIcon}`}></i>
            <span className={styles.phoneNumber}>1-800-PET-HELP</span>
          </div>
          
          <a href="/contact" className={styles.actionButton}>
            Contact Emergency Services
          </a>
        </div>
        
        <div className={styles.servicesArea}>
          {emergencyServices.map((service, index) => (
            <ServiceBox 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
