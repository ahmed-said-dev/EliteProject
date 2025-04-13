import React from 'react';
import styles from '../components/ServiceComponents.module.css';

interface ServiceDescriptionProps {
  description: string;
  icons: { icon: string }[];
}

const ServiceDescription: React.FC<ServiceDescriptionProps> = ({ description, icons }) => {
  return (
    <div className={styles.serviceDescription}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Service Overview</h2>
        
        <div className={styles.descriptionContent}>
          <div className={styles.descText}>
            <p>{description}</p>
            <p>
              Our veterinary professionals are committed to delivering personalized care with compassion and expertise. 
              We combine modern techniques with a gentle approach to ensure your pet's comfort during every visit.
            </p>
            <p>
              At Elite Veterinary Clinic, we believe in transparent communication and thorough explanations of all procedures, 
              allowing you to make informed decisions about your pet's health care journey.
            </p>
          </div>
          
          <div className={styles.descIconsWrapper}>
            <h3>Key Highlights</h3>
            <div className={styles.descIconsContainer}>
              {icons.map((icon, index) => (
                <div key={index} className={styles.iconItem}>
                  <i className={`fas ${icon.icon}`}></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDescription;
