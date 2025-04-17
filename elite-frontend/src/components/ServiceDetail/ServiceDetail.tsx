import React, { useEffect, useState } from 'react';
import styles from './ServiceDetail.module.css';
import { useLanguage } from '@/context/LanguageContext';

// Dynamic imports to prevent issues during initial render
const ServiceHero = React.lazy(() => import('./components/ServiceHero'));
const ServiceFeatures = React.lazy(() => import('./components/ServiceFeatures'));
const ServiceDescription = React.lazy(() => import('./components/ServiceDescription'));
const ServiceFAQ = React.lazy(() => import('./components/ServiceFAQ'));
const ServiceRelated = React.lazy(() => import('./components/ServiceRelated'));

export interface ServiceDetailProps {
  serviceId: string | string[] | undefined;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId }) => {
  const [service, setService] = useState<any>(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    if (serviceId) {
      // Import the services data dynamically to avoid circular imports
      import('../ServicesSection/ServicesSection').then((module) => {
        const { getServices } = module;
        // Get the services using the exported function
        const services = getServices(t);
        const foundService = services.find(s => s.id === Number(serviceId));
        if (foundService) {
          setService(foundService);
        }
      }).catch(error => {
        console.error('Error loading services:', error);
      });
    }
  }, [serviceId, t]);

  if (!service) {
    return <div className={styles.loadingContainer}>Loading service details...</div>;
  }

  return (
    <div className={styles.serviceDetailPage}>
      <div className={styles.shapesWrapper}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
      </div>
      
      <React.Suspense fallback={<div className={styles.loadingContainer}>جاري تحميل التفاصيل...</div>}>
        {/* Hero Section with service title, badge and main image */}
        <ServiceHero 
          title={service.title} 
          image={service.image} 
          badge={service.badge} 
        />
        
        {/* Service Description Section */}
        <ServiceDescription 
          description={service.description || "Our comprehensive veterinary service delivers exceptional care tailored to your pet's specific needs. With state-of-the-art equipment and expert veterinarians, we ensure your beloved companion receives the highest standard of medical attention."} 
          icons={service.icons}
        />
        
        {/* Service Features List Section */}
        <ServiceFeatures 
          features={service.features} 
          title="What We Offer"
        />
        
        {/* FAQs Section */}
        <ServiceFAQ 
          serviceType={service.title}
        />
        
        {/* Related Services Section */}
        <ServiceRelated 
          currentServiceId={service.id}
        />
      </React.Suspense>
    </div>
  );
};

export default ServiceDetail;
