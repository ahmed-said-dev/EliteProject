import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
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
  initialService: ServicePage | null;
  error?: string;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ initialService, error: initialError }) => {
  const router = useRouter();
  const { locale, dir } = useLanguage();
  
  // Get service ID from slug
  const { slug } = router.query;
  const [serviceId, setServiceId] = useState<number | undefined>(undefined);
  
  // Use hook to fetch service details by ID
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

  // Extract service ID from slug and set it
  useEffect(() => {
    if (slug && typeof slug === 'string') {
      // Check if slug contains numeric ID
      const match = slug.match(/(\d+)$/);
      if (match && match[1]) {
        const id = parseInt(match[1], 10);
        console.log('Service ID found:', id);
        setServiceId(id);
      } else {
        // If no numeric ID, can search for service by slug
        console.log('No numeric ID found in slug:', slug);
      }
    }
  }, [slug]);

  // Print service data in console
  useEffect(() => {
    if (serviceId) {
      console.log('Requested service ID:', serviceId);
    }
    
    if (formattedServiceDetail) {
      console.log('Formatted service details:', formattedServiceDetail);
    }
    
    if (serviceDetail) {
      console.log('Original service data:', serviceDetail);
    }
    
    if (rawData) {
      console.log('Raw API data:', rawData);
    }
  }, [serviceId, formattedServiceDetail, serviceDetail, rawData]);
  
  // Use unified language context
  const { t } = useLanguage();

  // Use the loading variable from hook instead of redefining it
  // Add optional delay to improve user experience
  const [uiReady, setUiReady] = useState<boolean>(false);

  useEffect(() => {
    // Effect to control UI ready state
    if (isLoading) {
      setUiReady(false);
    } else {
      // Small delay to improve user experience
      const timer = setTimeout(() => {
        setUiReady(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Determine displayed service: either from hook or initial data
  const serviceToDisplay = formattedServiceDetail || null;

  // If page is loading or in fallback state
  if (isLoading || router.isFallback) {
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
  if (!serviceToDisplay && !initialService) {
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
    
    // Use default value
    return '/images/default-service.jpg';
  };

  // Use formatted data from hook instead of accessing attributes
  const service = serviceToDisplay || initialService;
  
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
        features={(service?.features || []).map(item => ({ 
          id: item.id, 
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
export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  // Execute at page build time on server, not in browser
  try {
    if (!params?.slug) {
      return { 
        props: { 
          service: null, 
          error: 'Service slug is required' 
        } 
      };
    }
    
    // Extract service ID number from slug if it exists
    const slug = params.slug as string;
    const match = slug.match(/(\d+)$/);
    let serviceId: number | null = null;
    
    if (match && match[1]) {
      serviceId = parseInt(match[1], 10);
    }
    
    const localeToUse = locale || 'ar';
    
    // If ID found, use it in API request
    if (serviceId) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/service-pages/${serviceId}?locale=${localeToUse}`;
      
      try {
        const response = await axios.get(url);
        
        return {
          props: {
            service: response.data || null,
            error: null
          }
        };
      } catch (error) {
        console.error(`Error fetching service with ID ${serviceId}:`, error);
        
        return {
          props: {
            service: null,
            error: `Error fetching service details: ${error}`
          }
        };
      }
    }
    
    // If no ID found, search using slug
    return {
      props: {
        service: null,
        error: 'Service not found'
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    
    return {
      props: {
        service: null,
        error: `Server error: ${error}`
      }
    };
  }
};

export default ServiceDetailPage;
