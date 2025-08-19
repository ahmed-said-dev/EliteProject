import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ServiceFeature } from '@/hooks/useServicePages';
import styles from '@/styles/components/ServiceDetail/ServiceFeatures.module.css';

interface ServiceFeaturesProps {
  features: ServiceFeature[];
  title: string;
}

const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({ features, title }) => {
  const { dir } = useLanguage();
  
  // إذا لم تكن هناك مميزات، لا نعرض هذا القسم
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className={`${styles.featuresSection} ${dir === 'rtl' ? styles.rtl : ''}`}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div 
            key={feature.id || index}
            className={styles.featureCard}
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <div className={styles.featureIcon}>
              <i className="fas fa-check-circle"></i>
            </div>
            <p className={styles.featureText}>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceFeatures;
