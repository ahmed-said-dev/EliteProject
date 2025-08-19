import React, { useEffect } from 'react';
import styles from './ServiceDetail.module.css';
import { useLanguage } from '@/context/LanguageContext';
import useServicePages from '@/hooks/useServicePages';

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
  const { locale } = useLanguage();
  
  // استخدام الـ hook المحدث لجلب بيانات الخدمة مباشرة من API بدلاً من تحميلها محلياً
  const { 
    formattedServiceDetail: service, 
    isLoading, 
    error, 
    refetch 
  } = useServicePages({ 
    id: serviceId ? Number(serviceId) : undefined,
    locale
  });
  
  useEffect(() => {
    // إعادة جلب البيانات عند تغيير معرف الخدمة أو اللغة
    if (serviceId) {
      refetch();
    }
  }, [serviceId, locale, refetch]);

  if (isLoading) {
    return <div className={styles.loadingContainer}>جاري تحميل تفاصيل الخدمة...</div>;
  }

  if (error || !service) {
    return (
      <div className={styles.errorContainer}>
        <h3>عذراً، حدث خطأ أثناء تحميل تفاصيل الخدمة</h3>
        <p>{error?.message || 'لم يتم العثور على الخدمة المطلوبة'}</p>
        <button onClick={() => refetch()} className={styles.retryButton}>
          إعادة المحاولة
        </button>
      </div>
    );
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
          description={service.description || "خدمة بيطرية شاملة تقدم رعاية استثنائية مصممة لتلبية احتياجات حيوانك الأليف. مع أحدث المعدات وخبرة الأطباء البيطريين، نضمن حصول رفيقك المحبوب على أعلى مستوى من الرعاية الطبية."} 
          icons={service.icons}
        />
        
        {/* Service Features List Section */}
        <ServiceFeatures 
          features={service.features} 
          title="ما نقدمه"
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
