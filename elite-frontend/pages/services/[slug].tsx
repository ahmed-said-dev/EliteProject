import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// Layout وأدوات مشتركة
import { useLanguage } from '@/context/LanguageContext';
import useServicePages, { ServicePage, FormattedServicePage } from '@/hooks/useServicePages';

// بيانات مؤقتة لصفحة التفاصيل
// سنستخدم هذه المكونات المؤقتة لتجنب أخطاء الاستيراد
const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="page-layout">{children}</div>
);

const PageBanner = ({ title, breadcrumbs }: { title: string, breadcrumbs: any[] }) => (
  <div className="page-banner">
    <h1>{title}</h1>
    <div className="breadcrumbs">
      {breadcrumbs.map((item, index) => (
        <span key={index}>
          {index > 0 && ' > '}
          {item.active ? item.name : <Link href={item.url}>{item.name}</Link>}
        </span>
      ))}
    </div>
  </div>
);

const ServiceFeatures = ({ features, title }: { features: any[], title: string }) => (
  <div className="service-features">
    <h2>{title}</h2>
    <div className="features-list">
      {features.map((feature, index) => (        
        <div key={index} className="feature-item">
          <i className="fas fa-check-circle"></i>
          <span>{feature.text}</span>
        </div>
      ))}
    </div>
  </div>
);

const ServiceDescription = ({ service, title }: { service: any, title: string }) => (
  <div className="service-description">
    <h2>{title}</h2>
    <p>{service.description}</p>
  </div>
);

const ServiceRelated = ({ currentServiceId, currentServiceSlug }: { currentServiceId: number, currentServiceSlug: string }) => (
  <div className="related-services">
    <h2>خدمات ذات صلة</h2>
    <div className="services-grid">
      {/* ستضاف الخدمات ذات الصلة هنا */}
    </div>
  </div>
);

const SectionDivider = ({ icon }: { icon: string }) => (
  <div className="section-divider">
    <div className="divider-line"></div>
    <div className="divider-icon"><i className={`fas ${icon}`}></i></div>
    <div className="divider-line"></div>
  </div>
);

const EmergencyCare = () => (
  <div className="emergency-care">
    <h2>الرعاية الطارئة</h2>
    <p>متوفرون على مدار 24 ساعة للحالات الطارئة. اتصل بنا على الرقم: 123-456-7890</p>
  </div>
);

// أنماط
import styles from '@/styles/pages/ServiceDetail.module.css';

// واجهة الخصائص للصفحة
interface ServiceDetailPageProps {
  initialService: ServicePage | null;
  error?: string;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ initialService, error: initialError }) => {
  const router = useRouter();
  const { locale, dir } = useLanguage();
  
  // الحصول على معرف الخدمة من الـ slug
  const { slug } = router.query;
  const [serviceId, setServiceId] = useState<number | undefined>(undefined);
  
  // استخدام hook لجلب تفاصيل الخدمة بواسطة الـ ID
  const { 
    formattedServiceDetail,
    serviceDetail,
    rawData,
    isLoading, 
    error: serviceError 
  } = useServicePages({ 
    id: serviceId,
    locale 
  });

  // استخراج معرف الخدمة من الـ slug وتعيينه
  useEffect(() => {
    if (slug && typeof slug === 'string') {
      // تحقق إذا كان slug يحتوي على معرف رقمي
      const match = slug.match(/(\d+)$/);
      if (match && match[1]) {
        const id = parseInt(match[1], 10);
        console.log('تم العثور على معرف الخدمة:', id);
        setServiceId(id);
      } else {
        // إذا لم يكن هناك معرف رقمي، يمكن البحث عن الخدمة بواسطة الـ slug
        console.log('لم يتم العثور على معرف رقمي في slug:', slug);
      }
    }
  }, [slug]);

  // طباعة بيانات الخدمة في console
  useEffect(() => {
    if (serviceId) {
      console.log('معرف الخدمة المطلوبة:', serviceId);
    }
    
    if (formattedServiceDetail) {
      console.log('تفاصيل الخدمة المنسقة:', formattedServiceDetail);
    }
    
    if (serviceDetail) {
      console.log('بيانات الخدمة الأصلية:', serviceDetail);
    }
    
    if (rawData) {
      console.log('البيانات الخام من API:', rawData);
    }
  }, [serviceId, formattedServiceDetail, serviceDetail, rawData]);
  
  // استخدام ترجمات مخصصة بدلاً من useTranslation
  const t = (key: string) => {
    const translations: {[key: string]: {[key: string]: string}} = {
      en: {
        'siteName': 'Elite Veterinary Clinic',
        'loading': 'Loading...',
        'serviceDetail.notFound': 'Service Not Found',
        'serviceDetail.notFoundDesc': 'Sorry, the service you are looking for could not be found.',
        'serviceDetail.backToServices': 'Back to Services',
        'serviceDetail.defaultDesc': 'Elite Veterinary Clinic offers high quality services for your beloved pets.',
        'serviceDetail.featuresTitle': 'Service Features',
        'serviceDetail.aboutService': 'About This Service',
        'serviceDetail.relatedServices': 'Related Services',
        'nav.home': 'Home',
        'nav.services': 'Services'
      },
      ar: {
        'siteName': 'عيادة النخبة البيطرية',
        'loading': 'جاري التحميل...',
        'serviceDetail.notFound': 'الخدمة غير موجودة',
        'serviceDetail.notFoundDesc': 'عذراً، الخدمة التي تبحث عنها غير موجودة.',
        'serviceDetail.backToServices': 'العودة إلى الخدمات',
        'serviceDetail.defaultDesc': 'تقدم عيادة النخبة البيطرية خدمات عالية الجودة لحيواناتك الأليفة.',
        'serviceDetail.featuresTitle': 'مميزات الخدمة',
        'serviceDetail.aboutService': 'عن هذه الخدمة',
        'serviceDetail.relatedServices': 'خدمات ذات صلة',
        'nav.home': 'الرئيسية',
        'nav.services': 'الخدمات'
      }
    };
    
    return translations[locale || 'en'][key] || key;
  };

  // استخدام متغير loading من الـ hook بدلاً من إعادة تعريفه
  // إضافة تأخير اختياري لتحسين تجربة المستخدم
  const [uiReady, setUiReady] = useState<boolean>(false);

  useEffect(() => {
    // تأثير للتحكم بحالة جاهزية واجهة المستخدم
    if (isLoading) {
      setUiReady(false);
    } else {
      // تأخير صغير لتحسين تجربة المستخدم
      const timer = setTimeout(() => {
        setUiReady(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // تحديد الخدمة المعروضة: إما من الـ hook أو من البيانات الأولية
  const serviceToDisplay = formattedServiceDetail || null;

  // إذا كانت الصفحة قيد التحميل أو في حالة الخطأ الباهت
  if (isLoading || router.isFallback) {
    return (
      <PageLayout>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>{t('loading')}</p>
        </div>
      </PageLayout>
    );
  }

  // في حالة عدم وجود بيانات للخدمة
  if (!serviceToDisplay && !initialService) {
    return (
      <PageLayout>
        <div className={styles.errorContainer}>
          <h1>{t('serviceDetail.notFound')}</h1>
          <p>{initialError || t('serviceDetail.notFoundDesc')}</p>
          <Link href="/services">
            <button className={styles.backButton}>
              {t('serviceDetail.backToServices')}
            </button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const getImageUrl = () => {
    if (formattedServiceDetail) {
      // استخدام الـ URL من البيانات المنسقة
      return formattedServiceDetail.image || '/images/default-service.jpg';
    }
    
    // استخدام قيمة افتراضية
    return '/images/default-service.jpg';
  };

  // استخدام البيانات المنسقة من الـ hook بدلاً من الوصول إلى attributes
  const service = serviceToDisplay || initialService;
  
  return (
    <PageLayout>
      <Head>
        <title>{`${service?.title || 'خدمة'} | ${t('siteName')}`}</title>
        <meta name="description" content={service?.description || t('serviceDetail.defaultDesc')} />
        <meta property="og:title" content={service?.title || 'خدمة'} />
        <meta property="og:description" content={service?.description || t('serviceDetail.defaultDesc')} />
        <meta property="og:image" content={getImageUrl()} />
      </Head>

      {/* شريط عنوان الصفحة مع التنقل الفتات */}
      <PageBanner 
        title={service?.title || 'خدمة'}
        breadcrumbs={[
          { name: t('nav.home'), url: '/' },
          { name: t('nav.services'), url: '/services' },
          { name: service?.title || 'خدمة', url: `/services/${service?.slug || ''}`, active: true }
        ]}
      />

      <div className={`${styles.serviceDetailContainer} ${dir === 'rtl' ? styles.rtl : ''}`}>
        {/* قسم الصورة الرئيسية والعنوان */}
        <section className={styles.heroSection}>
          <div className={styles.imageContainer}>
            <img 
              src={getImageUrl()} 
              alt={service?.title || 'خدمة'} 
              className={styles.mainImage}
            />
            {service?.badge && (
              <div className={styles.badge}>
                {service.badge}
              </div>
            )}
          </div>
          <div className={styles.serviceInfo}>
            <h1 className={styles.serviceTitle}>{service?.title || 'خدمة'}</h1>
            
            {/* أيقونات الخدمة */}
            {service?.icons && Array.isArray(service.icons) && service.icons.length > 0 && (
              <div className={styles.iconsContainer}>
                {service.icons.map((icon, index) => (
                  <div key={index} className={styles.iconCircle}>
                    <i className={`fas ${icon.icon || 'fa-paw'}`}></i>
                  </div>
                ))}
              </div>
            )}
            
            {/* وصف موجز */}
            {service?.description && (
              <div className={styles.shortDescription}>
                <p>{service.description}</p>
              </div>
            )}
          </div>
        </section>

        <SectionDivider icon="fa-paw" />

        {/* قسم مميزات الخدمة */}
        <ServiceFeatures 
          features={(service?.features || []).map(item => ({ 
            id: item.id, 
            text: item.text || '' 
          }))} 
          title={t('serviceDetail.featuresTitle')} 
        />

        <SectionDivider icon="fa-stethoscope" />

        {/* قسم الوصف التفصيلي */}
        <ServiceDescription 
          service={{ 
            description: service?.description || '',
            title: service?.title || '' 
          }}
          title={t('serviceDetail.aboutService')}
        />

        {/* قسم الرعاية الطارئة */}
        <EmergencyCare />

        <SectionDivider icon="fa-heart" />

        {/* خدمات ذات صلة */}
        <ServiceRelated 
          currentServiceId={service?.id || 0}
          currentServiceSlug={service?.slug || ''}
        />
      </div>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  const slug = params?.slug;
  
  if (!slug) {
    return {
      props: {
        service: null,
        error: 'Service slug is missing'
      }
    };
  }

  try {
    // استدعاء API لجلب Service ID بناءً على slug أولاً
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    
    // Step 1: الحصول على ID الخدمة باستخدام slug
    const servicesResponse = await axios.get(`${baseUrl}/api/services`, {
      params: {
        filters: {
          slug: {
            $eq: slug
          }
        },
        fields: ['id'],
        locale: locale
      }
    });
    
    if (!servicesResponse.data?.data || servicesResponse.data.data.length === 0) {
      console.error('Could not find service with slug:', slug);
      return {
        props: {
          service: null,
          error: 'Service not found'
        }
      };
    }
    
    // استخراج ID الخدمة من النتيجة
    const serviceId = servicesResponse.data.data[0].id;
    console.log('Found service ID:', serviceId);
    
    // Step 2: استخدام findOne API للحصول على تفاصيل الخدمة بناءً على ID
    const serviceDetailResponse = await axios.get(`${baseUrl}/api/services/${serviceId}`, {
      params: {
        populate: ['image', 'features', 'icons'],
        locale: locale
      }
    });
    
    console.log('Service API response:', serviceDetailResponse.data);
    
    if (!serviceDetailResponse.data?.data) {
      console.error('Could not fetch details for service ID:', serviceId);
      return {
        props: {
          service: null,
          error: 'Service details not found'
        }
      };
    }
    
    // التأكد من أن البيانات بالتنسيق الصحيح
    const serviceData = serviceDetailResponse.data.data;
    console.log('Service data:', serviceData);
    
    return {
      props: {
        service: serviceData
      },
    };
  } catch (error) {
    console.error('Error fetching service details:', error);
    return {
      props: {
        service: null,
        error: 'Failed to fetch service details: ' + (error instanceof Error ? error.message : String(error))
      }
    };
  }
};

export default ServiceDetailPage;
