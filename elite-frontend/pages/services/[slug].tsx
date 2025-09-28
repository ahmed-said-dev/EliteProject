import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// CSR only; no getServerSideProps here
import Head from 'next/head';
import Link from 'next/link';
import { FaCheckCircle, FaPaw, FaStethoscope, FaMicroscope, FaHeartbeat, FaShieldVirus, FaChevronRight, FaArrowRight, FaChevronLeft } from 'react-icons/fa';

// Layout and shared tools
import { useLanguage } from '@/context/LanguageContext';
import useServicePages, { ServicePage, FormattedServicePage } from '@/hooks/useServicePages';

// Enhanced detail page styles
import styles from '@/styles/pages/ServiceDetail.module.css';

// Page layout component
const PageLayout = ({ children, dir }: { children: React.ReactNode, dir?: string }) => (
  <div className={`${styles.serviceDetailPage} ${dir === 'rtl' ? styles.rtl : ''}`} dir={dir}>
    <div className={styles.bgPattern}></div>
    <div className={styles.serviceDetailContainer}>
      {children}
    </div>
  </div>
);

// Breadcrumb and title component
const PageBanner = ({ title, breadcrumbs, dir }: { title: string, breadcrumbs: any[], dir?: string }) => (
  <header className={styles.pageHeader}>
    <div className={styles.breadcrumb}>
      {breadcrumbs.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className={styles.breadcrumbSeparator}>
              {dir === 'rtl' ? <FaChevronLeft className={styles.breadcrumbIcon} /> : <FaChevronRight className={styles.breadcrumbIcon} />}
            </span>
          )}
          <span className={styles.breadcrumbItem}>
            {item.active ? 
              <span className={styles.activeBreadcrumb}>{item.name}</span> : 
              <Link href={item.url} className={styles.breadcrumbLink}>{item.name}</Link>
            }
          </span>
        </React.Fragment>
      ))}
    </div>
    <h1 className={styles.pageTitle}>{title}</h1>
  </header>
);

// Features section component
const ServiceFeatures = ({ features, title }: { features: any[], title: string }) => (
  <section className={styles.featuresSection}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    <div className={styles.featuresList}>
      {features.map((feature, index) => (        
        <div key={index} className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <FaCheckCircle />
          </div>
          <div className={styles.featureText}>{feature.text}</div>
        </div>
      ))}
    </div>
  </section>
);

// Detailed description component
const ServiceDescription = ({ service, title }: { service: any, title: string }) => (
  <section className={styles.descriptionSection}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    <div className={styles.descriptionContent}>
      <p>{service.description}</p>
    </div>
  </section>
);

// Related services component
const ServiceRelated = ({ currentServiceId, currentServiceSlug }: { currentServiceId: number, currentServiceSlug: string }) => {
  const { locale } = useLanguage();
  const { formattedServicePages } = useServicePages({ locale });
  
  // Exclude current service and take only 3 services
  const relatedServices = formattedServicePages
    .filter(service => service.id !== currentServiceId)
    .slice(0, 3);
  
  return (
    <section className={styles.relatedSection}>
      <h2 className={styles.sectionTitle}>Related Services</h2>
      <div className={styles.relatedServices}>
        {relatedServices.map((service, index) => (
          <div key={index} className={styles.relatedServiceCard}>
            <div className={styles.relatedImageContainer}>
              <img 
                src={service.image}
                alt={service.title}
                className={styles.relatedImage}
              />
            </div>
            <div className={styles.relatedContent}>
              <h3 className={styles.relatedTitle}>{service.title}</h3>
              <p className={styles.relatedDescription}>
                {service.description?.substring(0, 120)}
                {service.description && service.description.length > 120 ? '...' : ''}
              </p>
              <Link href={`/services/${service.slug}`}>
                <button className={styles.viewButton}>
                  Details <FaArrowRight style={{ marginRight: '5px', fontSize: '12px' }} />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Section divider component
const SectionDivider = ({ icon }: { icon: string }) => {
  // Determine icon from react-icons based on name
  const getIcon = () => {
    switch (icon) {
      case 'fa-paw':
        return <FaPaw />;
      case 'fa-stethoscope':
        return <FaStethoscope />;
      case 'fa-microscope':
        return <FaMicroscope />;
      case 'fa-heartbeat':
        return <FaHeartbeat />;
      case 'fa-shield-virus':
        return <FaShieldVirus />;
      default:
        return <FaPaw />;
    }
  };
  
  return (
    <div className={styles.sectionDivider}>
      <div className={styles.dividerLine}></div>
      <div className={styles.dividerIcon}>
        {getIcon()}
      </div>
    </div>
  );
};

// Page props interface
interface ServiceDetailPageProps {
  initialService?: ServicePage | null;
  service?: ServicePage | null;
  error?: string;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ initialService, service: serverService, error: initialError }) => {
  const router = useRouter();
  const { locale, dir } = useLanguage();
  
  // Get slug from the route
  const { slug } = router.query;
  
  // Use hook to fetch service details by ID
  const { 
    formattedServiceDetail,
    serviceDetail,
    rawData,
    isLoading, 
    error: serviceError,
    refetch,
    forceRefresh
  } = useServicePages({ 
    slug: typeof slug === 'string' ? slug : undefined,
    locale 
  });

  // On locale change, force refresh (hook invalidates automatically, this ensures no stale cache)
  useEffect(() => {
    if (forceRefresh) {
      console.log(`🌐 Locale changed to ${locale}. Forcing refresh for slug:`, slug);
      forceRefresh();
    }
  }, [locale, forceRefresh, slug]);

  // (Removed old ID-based refetch effect)

  // Use unified language context
  const { t } = useLanguage();

  // Use the loading variable from hook instead of redefining it
  // Add optional delay to improve user experience
  const [uiReady, setUiReady] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      setUiReady(false);
    } else {
      const timer = setTimeout(() => setUiReady(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Determine displayed service: priority order - hook data, initial server data, server service data
  const serviceToDisplay = formattedServiceDetail || serviceDetail || (initialService as any)?.data || serverService;

  // Print service data in console
  useEffect(() => {
    console.log('=== Service Detail Debug Info ===');
    console.log('Slug:', slug);
    console.log('Current locale:', locale);
    console.log('Router locale:', router.locale);
    console.log('Formatted service detail (from hook):', formattedServiceDetail);
    console.log('Service detail (raw from hook):', serviceDetail);
    console.log('Raw API data:', rawData);
    console.log('Final service to display:', serviceToDisplay);
    console.log('=== End Debug Info ===');
  }, [slug, locale, router.locale, formattedServiceDetail, serviceDetail, rawData, serviceToDisplay]);

  // Handle locale mismatch - when URL locale doesn't match context locale
  useEffect(() => {
    if (router.locale && locale && router.locale !== locale) {
      console.log(`⚠️ [ServiceDetail] Locale mismatch detected: URL=${router.locale}, Context=${locale}`);
      
      // If we have service data but locale mismatch, trigger a refetch
      if (serviceToDisplay && !isLoading) {
        console.log(`🔄 [ServiceDetail] Triggering refetch due to locale mismatch`);
        // The useServicePages hook will automatically refetch when locale changes
      }
    }
  }, [router.locale, locale, serviceToDisplay, isLoading]);

  // If page is loading or waiting for ID/data resolution, keep blocking with a loading state
  const waitingForData = (!formattedServiceDetail && !serviceDetail && !(initialService as any)?.data && !serverService);
  if (isLoading || router.isFallback || (waitingForData && !initialError) || !uiReady) {
    return (
      <PageLayout dir={dir}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingText}>{t('loading')}</div>
        </div>
      </PageLayout>
    );
  }

  // If no service data available
  if (!serviceToDisplay) {
    return (
      <PageLayout dir={dir}>
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
      // Use URL from formatted data
      return formattedServiceDetail.image || '/images/default-service.jpg';
    }
    
    // Check if we have server-side data with image
    const serviceData = (initialService as any)?.data || service;
    if (serviceData?.image) {
      // Handle different image data structures
      if (typeof serviceData.image === 'string') {
        return serviceData.image;
      } else if (serviceData.image?.url) {
        return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${serviceData.image.url}`;
      } else if (serviceData.image?.data?.attributes?.url) {
        return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${serviceData.image.data.attributes.url}`;
      }
    }
    
    // Use default value
    return '/images/default-service.jpg';
  };

  // Use the determined service data
  const service = serviceToDisplay;
  
  return (
    <PageLayout dir={dir}>
      <Head>
        <title>{`${service?.title || 'Service'} | ${t('siteName')}`}</title>
        <meta name="description" content={service?.description || t('serviceDetail.defaultDesc')} />
        <meta property="og:title" content={service?.title || 'Service'} />
        <meta property="og:description" content={service?.description || t('serviceDetail.defaultDesc')} />
        <meta property="og:image" content={getImageUrl()} />
      </Head>

      {/* Page header with breadcrumbs */}
      <PageBanner 
        title={service?.title || 'Service'}
        breadcrumbs={[
          { name: t('nav.home'), url: '/' },
          { name: t('nav.services'), url: '/services' },
          { name: service?.title || 'Service', url: `/services/${service?.slug || ''}`, active: true }
        ]}
        dir={dir}
      />

      {/* Main display section */}
      <section className={styles.heroSection}>
        <div className={styles.imageContainer}>
          <img 
            src={getImageUrl()} 
            alt={service?.title || 'Service'} 
            className={styles.mainImage}
          />
          <div className={styles.imageOverlay}></div>
          {service?.badge && (
            <div className={styles.badge}>
              {service.badge}
            </div>
          )}
        </div>
        
        <div className={styles.serviceInfo}>
          <h1 className={styles.serviceTitle}>{service?.title || 'Service'}</h1>
          
          {/* Service icons */}
          {service?.icons && Array.isArray(service.icons) && service.icons.length > 0 && (
            <div className={styles.iconsContainer}>
              {service.icons.map((icon, index) => (
                <div key={index} className={styles.iconCircle}>
                  <i className={`fas ${icon.icon || 'fa-paw'}`}></i>
                </div>
              ))}
            </div>
          )}
          
          {/* Brief description */}
          {service?.description && (
            <div className={styles.shortDescription}>
              <p>{service.description}</p>
            </div>
          )}
        </div>
      </section>

      <SectionDivider icon="fa-paw" />

      {/* Service features section */}
      <ServiceFeatures 
        features={(service?.features || []).map((item, index) => ({ 
          id: item.id || index, 
          text: item.text || '' 
        }))} 
        title={t('serviceDetail.featuresTitle')} 
      />

      <SectionDivider icon="fa-stethoscope" />

      {/* Detailed description section */}
      <ServiceDescription 
        service={{ 
          description: service?.description || '',
          title: service?.title || '' 
        }}
        title={t('serviceDetail.aboutService')}
      />

      <SectionDivider icon="fa-notes-medical" />

      {/* Related services */}
      <ServiceRelated 
        currentServiceId={service?.id || 0}
        currentServiceSlug={service?.slug || ''}
      />
    </PageLayout>
  );
};

// Import initial data from server
// Removed getServerSideProps: this page is CSR-only to avoid SSR locale mismatch issues

export default ServiceDetailPage;
