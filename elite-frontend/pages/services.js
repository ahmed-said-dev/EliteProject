import React from 'react';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner/PageBanner';
import ServiceJoinTeam from '@/components/ServiceJoinTeam';
import { useLanguage } from '@/context/LanguageContext';
import { useHomeServices } from '@/hooks/useHomeServices';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import styles from '@/components/ServicesSection/ServicesSection.module.css';

export default function Services() {
  const { t, isRTL } = useLanguage();
  const { pages, isLoading, error } = useHomeServices();

  return (
    <main>
      <PageBanner 
        title={t('pageBanner.services.title')}
        backgroundImage="https://images.unsplash.com/photo-1551730459-92db2a308d6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
      />
      <ServiceJoinTeam />
      
      <section className={styles.servicesSection} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className={styles.shapesWrapper}>
          <div className={`${styles.shape} ${styles.shape1}`}></div>
          <div className={`${styles.shape} ${styles.shape2}`}></div>
          <div className={`${styles.shape} ${styles.shape3}`}></div>
        </div>

        <div className={styles.container}>
          {/* <div className="text-center mb-5">
            <h2 className="display-4 fw-bold text-primary mb-3">
              {isRTL ? 'خدماتنا المتميزة' : 'Our Premium Services'}
            </h2>
            <p className="lead text-muted">
              {isRTL ? 'نقدم مجموعة شاملة من الخدمات الطبية المتخصصة' : 'We provide a comprehensive range of specialized medical services'}
            </p>
          </div> */}

          {isLoading ? (
            <div className="loading-container" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
              width: '100%'
            }}>
              <LoadingSpinner isLoading={isLoading} />
            </div>
          ) : error ? (
            <div className="error-container" style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
              width: '100%',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              borderRadius: '8px',
              padding: '20px'
            }}>
              <p style={{ color: '#d32f2f', fontSize: '18px', textAlign: 'center' }}>
                {isRTL ? 'حدث خطأ في تحميل الخدمات' : 'Error loading services'}
              </p>
            </div>
          ) : (
            <div className={styles.servicesGrid}>
              {pages && pages.length > 0 ? pages.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`${styles.serviceCard} ${styles.wowFadeInUp}`}
                  data-wow-delay={`0.${index + 1}s`}
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

                      {service.image && (
                        <div className={styles.cardImageWrapper}>
                          <img 
                            src={`${process.env.NEXT_PUBLIC_API_URL}${service.image.url}`}
                            alt={service.title} 
                            className={styles.cardImage}
                          />
                          <div className={styles.cardImageOverlay}></div>
                        </div>
                      )}

                      <h3 className={styles.cardTitle}>{service.title}</h3>
                      
                      {service.description && (
                        <p className={styles.cardDescription}>
                          {service.description.length > 150 
                            ? `${service.description.substring(0, 150)}...` 
                            : service.description
                          }
                        </p>
                      )}

                      {service.features && (
                        <ul className={styles.featuresList}>
                          {service.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className={styles.featureItem}>
                              <i className="fas fa-check-circle text-primary me-2"></i>
                              {feature.text}
                            </li>
                          ))}
                        </ul>
                      )}

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
                      <Link href={`/service-detail/${service.id}`} className={styles.readMoreBtn}>
                        {isRTL ? 'اقرأ المزيد' : 'Read More'}
                      </Link>
                      <Link href={`/service-detail/${service.id}`} className={styles.btnPrimary}>
                        <i className={`fas ${isRTL ? 'fa-arrow-left' : 'fa-arrow-right'}`}></i>
                      </Link>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-5">
                  <p className="text-muted">
                    {isRTL ? 'لا توجد خدمات متاحة حالياً' : 'No services available at the moment'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
    </main>
  );
}
