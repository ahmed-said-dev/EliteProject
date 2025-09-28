import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useLanguage } from '@/context/LanguageContext';
import useUnifiedServiceById from '@/hooks/useUnifiedServiceById';

import styles from '@/styles/pages/ServiceDetail.module.css';

const ServiceDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t, dir, locale } = useLanguage();

  const { formatted, raw, isLoading, error, refetch } = useUnifiedServiceById(
    typeof id === 'string' ? id : Array.isArray(id) ? id[0] : undefined
  );

  const title = formatted?.title || raw?.pages?.[0]?.title || 'Service';
  const description = formatted?.description || raw?.pages?.[0]?.description || '';
  const image = formatted?.image || '/images/default-service.jpg';

  return (
    <div className={`${styles.serviceDetailPage} ${dir === 'rtl' ? styles.rtl : ''}`} dir={dir}>
      <Head>
        <title>{`${title} | ${t('siteName')}`}</title>
        <meta name="description" content={description || t('serviceDetail.defaultDesc')} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description || t('serviceDetail.defaultDesc')} />
        <meta property="og:image" content={image} />
      </Head>

      <div className={styles.bgPattern}></div>
      <div className={styles.serviceDetailContainer}>
        {/* Breadcrumb */}
        <header className={styles.pageHeader}>
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>{t('nav.home')}</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/services" className={styles.breadcrumbLink}>{t('nav.services')}</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.activeBreadcrumb}>{title}</span>
          </div>
          <h1 className={styles.pageTitle}>{title}</h1>
        </header>

        {/* Loading / Error */}
        {isLoading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <div className={styles.loadingText}>{t('loading')}</div>
          </div>
        )}

        {!isLoading && error && (
          <div className={styles.errorContainer}>
            <h2>{t('serviceDetail.notFound')}</h2>
            <p>{t('serviceDetail.notFoundDesc')}</p>
            <button onClick={() => refetch()} className={styles.backButton}>{t('refresh')}</button>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* Hero */}
            <section className={styles.heroSection}>
              <div className={styles.imageContainer}>
                <img src={image} alt={title} className={styles.mainImage} />
                <div className={styles.imageOverlay}></div>
                {raw?.pages?.[0]?.badge && (
                  <div className={styles.badge}>{raw.pages[0].badge}</div>
                )}
              </div>

              <div className={styles.serviceInfo}>
                <h1 className={styles.serviceTitle}>{title}</h1>
                {description && (
                  <div className={styles.shortDescription}><p>{description}</p></div>
                )}

                {/* Icons */}
                {Array.isArray(raw?.pages?.[0]?.icons) && raw!.pages![0]!.icons!.length > 0 && (
                  <div className={styles.iconsContainer}>
                    {raw!.pages![0]!.icons!.map((icon, idx) => (
                      <div key={idx} className={styles.iconCircle}>
                        <i className={icon.icon || 'fa-solid fa-paw'}></i>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Features */}
            {Array.isArray(raw?.pages?.[0]?.features) && raw!.pages![0]!.features!.length > 0 && (
              <section className={styles.featuresSection}>
                <h2 className={styles.sectionTitle}>{t('serviceDetail.featuresTitle')}</h2>
                <div className={styles.featuresList}>
                  {raw!.pages![0]!.features!.map((f, i) => (
                    <div key={i} className={styles.featureItem}>
                      <div className={styles.featureIcon}><i className="fas fa-check-circle"></i></div>
                      <div className={styles.featureText}>{f.text}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            {Array.isArray(raw?.pages?.[0]?.faq) && raw!.pages![0]!.faq!.length > 0 && (
              <section className={styles.descriptionSection}>
                <h2 className={styles.sectionTitle}>{t('serviceDetail.faqTitle') || 'FAQ'}</h2>
                <div className={styles.descriptionContent}>
                  {raw!.pages![0]!.faq!.map((q, i) => (
                    <div key={i} style={{ marginBottom: 12 }}>
                      <strong>{q.question}</strong>
                      <p style={{ margin: '6px 0 0' }}>{q.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailPage;
