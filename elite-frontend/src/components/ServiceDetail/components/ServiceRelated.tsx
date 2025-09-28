import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../components/ServiceComponents.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface ServiceRelatedProps {
  currentServiceId: number;
}

const ServiceRelated: React.FC<ServiceRelatedProps> = ({ currentServiceId }) => {
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  const { t } = useLanguage();
  
  useEffect(() => {
    // Import services dynamically to avoid circular dependencies
    import('../../ServicesSection/ServicesSection').then((module) => {
      const { getServices } = module;
      // Get the services using the exported function
      const services = getServices(t);
      // Get 3 related services (excluding the current one)
      const filteredServices = services
        .filter(service => service.id !== currentServiceId)
        .slice(0, 3);
      setRelatedServices(filteredServices);
    }).catch(error => {
      console.error('Error loading services:', error);
    });
  }, [currentServiceId, t]);

  return (
    <div className={styles.serviceRelated}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{t('Related Services')}</h2>
        
        <div className={styles.relatedGrid}>
          {relatedServices.map((service) => (
            <div key={service.id} className={styles.relatedCard}>
              <div className={styles.relatedImage}>
                <img src={service.image} alt={service.title} />
              </div>
              <div className={styles.relatedContent}>
                <h3 className={styles.relatedTitle}>{service.title}</h3>
                
                {service.badge && (
                  <span className={styles.relatedBadge}>
                    <i className="fa fa-circle" /> {service.badge}
                  </span>
                )}
                
                <div className={styles.relatedFeatures}>
                  {service.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className={styles.relatedFeature}>
                      <i className="fas fa-check-circle"></i>
                      <span>{feature.text.split(':')[0]}</span>
                    </div>
                  ))}
                </div>
                
                <Link href={`/service-detail/${service.id}`} passHref>
                  <a className={styles.relatedBtn}>
                    {t('View Service')}
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceRelated;
