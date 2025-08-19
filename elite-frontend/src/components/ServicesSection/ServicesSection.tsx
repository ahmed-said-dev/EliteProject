import React from 'react';
import Link from 'next/link';
import styles from './ServicesSection.module.css';
import { useLanguage } from '@/context/LanguageContext';
import useServicePages, { FormattedServicePage, ServicePageParams } from '@/hooks/useServicePages';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

// دالة لعرض بيانات خدمة افتراضية في حالة عدم وجود بيانات من API
const getDefaultService = (index: number): FormattedServicePage => {
  return {
    id: index,
    title: 'خدمة افتراضية',
    image: '/images/default-service.jpg',
    icons: [
      { icon: 'fa-microscope' },
      { icon: 'fa-heartbeat' },
      { icon: 'fa-shield-virus' },
      { icon: 'fa-stethoscope' }
    ],
    features: [
      { text: 'ميزة 1' },
      { text: 'ميزة 2' },
      { text: 'ميزة 3' }
    ],
    badge: 'جديد',
    delay: `0.${index + 1}s`,
    isActive: false,
    order: index,
    slug: `service-${index}`
  };
};

const ServicesSection: React.FC = () => {
  const { isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  // إعداد معاملات التصفح الافتراضية
  const defaultParams: ServicePageParams = {
    page: 1,
    pageSize: 6,
    sort: 'order:asc'
  };
  
  // استخدام hook الخدمات مع دعم التصفح
  const { 
    formattedServicePages, 
    isLoading, 
    error, 
    currentPage,
    pagination,
    loadNextPage,
    loadPreviousPage,
    hasNextPage,
    hasPreviousPage
  } = useServicePages(defaultParams);

  // استخدام بيانات الخدمات من API، أو استخدام بيانات افتراضية إذا لم تكن هناك خدمات
  const services = formattedServicePages.length > 0 
    ? formattedServicePages 
    : Array.from({ length: 6 }).map((_, index) => getDefaultService(index + 1));

  return (
    <section className={styles.servicesSection} dir={dir}>
      <div className={styles.shapesWrapper}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
      </div>

      <div className={styles.container}>
        {isLoading ? (
          <div className="loading-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            width: '100%'
          }}>
            <LoadingSpinner isLoading={isLoading} />
          </div>
        ) : error ? (
          <div className="error-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            width: '100%',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <p style={{ color: '#d32f2f', fontSize: '18px', textAlign: 'center' as const }}>
              {t('errors.dataLoading')}
            </p>
          </div>
        ) : (
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div 
                key={service.id} 
                className={`${styles.serviceCard} ${service.isActive ? styles.active : ''} ${styles.wowFadeInUp}`}
                data-wow-delay={service.delay}
              >
                <div className={styles.iconBoxWrapper}>
                  <div className={styles.iconContent}>
                    <div className={styles.iconGroup}>
                      {service.icons && service.icons.map((icon, iconIndex) => (
                        <span key={iconIndex} className={styles.iconCell}>
                          <i className={`fas ${icon.icon}`}></i>
                        </span>
                      ))}
                    </div>

                    <div className={styles.cardImageWrapper}>
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className={styles.cardImage}
                      />
                      <div className={styles.cardImageOverlay}></div>
                    </div>

                    <h3 className={styles.cardTitle}>{service.title}</h3>

                    <ul className={styles.featuresList}>
                      {service.features && service.features.map((feature, index) => (
                        <li key={index} className={styles.featureItem}>
                          <i className="fas fa-check-circle text-primary me-2"></i>
                          {feature.text}
                        </li>
                      ))}
                    </ul>

                    {service.badge && (
                      <div className={styles.specialtyTags}>
                        <span className={styles.textBadge}>
                          <i className="fa fa-circle text-primary"></i>{' '}
                          {service.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className={styles.iconBxFooter}>
                    <Link href={`/services/${service.slug || service.id}`} className={styles.readMoreBtn}>
                      {isRTL ? 'اقرأ المزيد' : 'Read More'}
                    </Link>
                    <Link href={`/services/${service.slug || service.id}`} className={styles.btnPrimary}>
                      <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!isLoading && !error && (
          <div className="pagination-container" style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            {/* أزرار التصفح */}
            <div className="pagination-controls" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
              {hasPreviousPage && (
                <button 
                  onClick={loadPreviousPage} 
                  className="pagination-button" 
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#f5f0ff', 
                    color: '#7c58d3', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer', 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {isRTL ? <i className="fas fa-arrow-right"></i> : <i className="fas fa-arrow-left"></i>}
                  {isRTL ? 'الصفحة السابقة' : 'Previous'}
                </button>
              )}
              
              <span style={{ display: 'flex', alignItems: 'center', fontWeight: '500', color: '#7a6e99' }}>
                {isRTL 
                  ? `الصفحة ${currentPage} من ${pagination.pageCount}` 
                  : `Page ${currentPage} of ${pagination.pageCount}`
                }
              </span>
              
              {hasNextPage && (
                <button 
                  onClick={loadNextPage} 
                  className="pagination-button" 
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#7c58d3', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer', 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {isRTL ? 'المزيد من الخدمات' : 'Load More'}
                  {isRTL ? <i className="fas fa-arrow-left"></i> : <i className="fas fa-arrow-right"></i>}
                </button>
              )}
            </div>
            
            {/* زر عرض جميع الخدمات */}
            <Link href="/services" className={styles.btnPrimaryLg}>
              {isRTL ? 'عرض جميع الخدمات' : 'View All Services'}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;

// Backward-compatibility export for ServiceRelated dynamic import
export function getServices(t: (k: string) => string) {
  return Array.from({ length: 6 }).map((_, index) => getDefaultService(index + 1));
}
