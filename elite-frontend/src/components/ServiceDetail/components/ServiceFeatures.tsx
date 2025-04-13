import React from 'react';
import styles from '../components/ServiceComponents.module.css';

interface ServiceFeaturesProps {
  features: { text: string }[];
  title: string;
}

const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({ features, title }) => {
  return (
    <div className={styles.serviceFeatures}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        
        <div className={styles.featuresContainer}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <div className={styles.featureContent}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className={styles.featureText}>
                  {feature.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceFeatures;
