import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import useServicePages from '@/hooks/useServicePages';
import styles from '@/styles/components/ServiceDetail/ServiceRelated.module.css';

interface ServiceRelatedProps {
  currentServiceId: number;
  currentServiceSlug: string;
}

const ServiceRelated: React.FC<ServiceRelatedProps> = ({ currentServiceId, currentServiceSlug }) => {
  // استخدام ترجمات مخصصة بدلاً من next-i18next
  const t = (key: string) => {
    const translations: {[key: string]: {[key: string]: string}} = {
      en: {
        'serviceDetail.relatedServices': 'Related Services'
      },
      ar: {
        'serviceDetail.relatedServices': 'خدمات ذات صلة'
      }
    };
    
    return translations[locale || 'en'][key] || key;
  };
  const { dir, locale } = useLanguage();
  const [relatedServices, setRelatedServices] = useState<any[]>([]);
  
  // استخدام الهوك لجلب جميع الخدمات
  const { formattedServicePages, isLoading } = useServicePages({
    pageSize: 10,
    locale
  });
  
  useEffect(() => {
    if (formattedServicePages && formattedServicePages.length > 0) {
      // استخراج الخدمات ذات الصلة (باستثناء الخدمة الحالية)
      const related = formattedServicePages
        .filter(service => service.id !== currentServiceId)
        // أخذ ٣ خدمات فقط كحد أقصى
        .slice(0, 3);
      
      setRelatedServices(related);
    }
  }, [formattedServicePages, currentServiceId]);
  
  // إذا لم تكن هناك خدمات ذات صلة، لا نعرض هذا القسم
  if (isLoading || relatedServices.length === 0) {
    return null;
  }
  
  return (
    <section className={`${styles.relatedSection} ${dir === 'rtl' ? styles.rtl : ''}`}>
      <h2 className={styles.sectionTitle}>{t('serviceDetail.relatedServices')}</h2>
      
      <div className={styles.servicesGrid}>
        {relatedServices.map((service, index) => (
          <Link 
            href={`/services/${service.slug}`} 
            key={service.id || index}
            className={styles.serviceCard}
            style={{ animationDelay: `${0.2 * (index + 1)}s` }}
          >
            <div className={styles.imageContainer}>
              <img 
                src={service.image} 
                alt={service.title} 
                className={styles.serviceImage}
              />
              {service.badge && (
                <div className={styles.badge}>{service.badge}</div>
              )}
            </div>
            
            <div className={styles.serviceContent}>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              
              {service.description && (
                <p className={styles.serviceDescription}>
                  {service.description.length > 100 
                    ? service.description.substring(0, 100) + '...' 
                    : service.description}
                </p>
              )}
              
              <div className={styles.serviceFooter}>
                <div className={styles.iconsList}>
                  {service.icons && service.icons.slice(0, 3).map((icon, idx) => (
                    <div key={idx} className={styles.iconCircle}>
                      <i className={`fas ${icon.icon}`}></i>
                    </div>
                  ))}
                </div>
                
                <span className={styles.readMore}>
                  {dir === 'rtl' ? 'اقرأ المزيد ←' : 'Read More →'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServiceRelated;
