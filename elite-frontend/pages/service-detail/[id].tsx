import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaArrowRight, FaCheck, FaClock, FaPhone, FaEnvelope, FaMapMarkerAlt, FaShareAlt, FaChevronLeft } from 'react-icons/fa';

import { useLanguage } from '@/context/LanguageContext';
import useUnifiedService from '@/hooks/useUnifiedService';

import styles from '@/styles/pages/ServiceDetail.module.css';

const ServiceDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t, dir, locale } = useLanguage();

  const { formatted, raw, isLoading, error, refetch } = useUnifiedService(
    typeof id === 'string' ? id : Array.isArray(id) ? id[0] : undefined
  );

  // Force refetch when locale changes
  useEffect(() => {
    if (id && locale) {
      console.log(`🔄 [ServiceDetailPage] Locale changed to ${locale}, refetching service data for ID: ${id}`);
      refetch();
    }
  }, [locale, id, refetch]);

  // Normalize any value (string/number/boolean/object/array) to a safe string for React children
  const normalizeText = (val: any): string => {
    if (val == null) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'number' || typeof val === 'boolean') return String(val);
    if (Array.isArray(val)) {
      // Join arrays after normalizing each item (common in rich-text blocks)
      return val.map(normalizeText).filter(Boolean).join(' ');
    }
    if (typeof val === 'object') {
      // Handle common rich-text shapes: { text: '...' } or { children: [...] }
      if ('text' in val && typeof (val as any).text === 'string') return (val as any).text as string;
      if ('children' in val && Array.isArray((val as any).children)) return normalizeText((val as any).children);
      try { return JSON.stringify(val); } catch { return String(val); }
    }
    return String(val);
  };

  const page = (raw?.pages && Array.isArray(raw.pages) && raw.pages.length > 0) ? raw.pages[0] : undefined;
  const title = normalizeText(formatted?.title ?? page?.title) || 'Service';
  const description = normalizeText(formatted?.description ?? page?.description) || '';
  const image = formatted?.image || '/images/default-service.jpg';

  // Debug logging
  useEffect(() => {
    console.log(`🔍 [ServiceDetailPage] Debug info:`, {
      id,
      locale,
      isLoading,
      error: error?.message,
      hasRawData: !!raw,
      hasFormattedData: !!formatted,
      hasPages: raw?.pages?.length,
      title
    });
  }, [id, locale, isLoading, error, raw, formatted, title]);

  const safeBadge = page?.badge ? normalizeText(page.badge) : '';
  const safeIcons = Array.isArray(page?.icons) ? page!.icons!.map((icon: any) => ({ icon: normalizeText(icon?.icon) })) : [];
  const safeFeatures = Array.isArray(page?.features) ? page!.features!.map((f: any) => ({ text: normalizeText(f?.text) })) : [];
  const safeFaq = Array.isArray(page?.faq) ? page!.faq!.map((q: any) => ({ question: normalizeText(q?.question), answer: normalizeText(q?.answer) })) : [];

  // Share functionality
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: description,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(window.location.href);
        alert(t('common.linkCopied') || 'Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

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
      
      {/* Back Button */}
      <div className={styles.backButtonContainer}>
        <button onClick={() => router.back()} className={styles.backButton}>
          <FaChevronLeft className={styles.backIcon} />
{t('common.back') || 'Back'}
        </button>
      </div>

      <div className={styles.serviceDetailContainer}>
        {/* Breadcrumb */}
        <header className={styles.pageHeader}>
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>{t('nav.home')}</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href="/services" className={styles.breadcrumbLink}>{t('nav.services')}</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.activeBreadcrumb}>
              {title.length > 30 ? `${title.substring(0, 30)}...` : title}
            </span>
          </div>
          <h1 className={styles.pageTitle}>{title}</h1>
          {safeBadge && (
            <div className={styles.serviceBadge}>
              <span className={styles.badgeIcon}>🏷️</span>
              <span>{safeBadge}</span>
            </div>
          )}
        </header>

        {/* Loading / Error */}
        {isLoading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <div className={styles.loadingText}>{normalizeText(t('common.loading'))}</div>
          </div>
        )}

        {!isLoading && error && (
          <div className={styles.errorContainer}>
            <h2>{normalizeText(t('serviceDetail.notFound')) || 'الخدمة غير موجودة'}</h2>
            <p>{normalizeText(t('serviceDetail.notFoundDesc')) || 'عذراً، لم يتم العثور على الخدمة المطلوبة في اللغة المحددة.'}</p>
            <div className={styles.errorActions}>
              <button onClick={() => refetch()} className={styles.primaryBtn}>
                {normalizeText(t('common.refresh')) || 'إعادة المحاولة'}
              </button>
              <button onClick={() => router.back()} className={styles.secondaryBtn}>
                {normalizeText(t('common.back')) || 'العودة'}
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && !formatted && (
          <div className={styles.errorContainer}>
            <h2>{normalizeText(t('serviceDetail.notFound')) || 'الخدمة غير موجودة'}</h2>
            <p>{normalizeText(t('serviceDetail.noDataFound')) || 'لا توجد بيانات متاحة لهذه الخدمة في اللغة المحددة.'}</p>
            <div className={styles.errorActions}>
              <button onClick={() => refetch()} className={styles.primaryBtn}>
                {normalizeText(t('common.refresh')) || 'إعادة المحاولة'}
              </button>
              <button onClick={() => router.back()} className={styles.secondaryBtn}>
                {normalizeText(t('common.back')) || 'العودة'}
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && formatted && (
          <div className={styles.mainContentWrapper}>
            {/* Hero Section */}
            <div className={styles.heroCard}>
              <div className={styles.heroImageSection}>
                <img 
                  src={image} 
                  alt={title} 
                  className={styles.heroImage}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/default-service.jpg';
                  }}
                />
                <div className={styles.imageOverlay}>
                  <button 
                    onClick={handleShare}
                    className={styles.shareButton}
                    aria-label={t('common.share') || 'Share'}
                  >
                    <FaShareAlt />
                  </button>
                </div>
                {safeBadge && (
                  <div className={styles.serviceBadgeOverlay}>
                    <span className={styles.badgeText}>{safeBadge}</span>
                  </div>
                )}
              </div>

              <div className={styles.heroContent}>
                <div className={styles.heroInfo}>
                  <h1 className={styles.heroTitle}>{title}</h1>
                  {description && (
                    <p className={styles.heroDescription}>{description}</p>
                  )}
                  
                  <div className={styles.serviceMeta}>
                    <div className={styles.metaItem}>
                      <FaClock className={styles.metaIcon} />
                      <span>{t('common.duration') || 'Duration'}: 30-60 {t('common.minutes') || 'min'}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <FaMapMarkerAlt className={styles.metaIcon} />
                      <span>{t('common.location') || 'Location'}: {t('common.clinic') || 'Clinic'}</span>
                    </div>
                  </div>

                  <div className={styles.actionButtons}>
                    <button className={styles.primaryBtn}>
                      <FaPhone className={styles.btnIcon} />
                      {t('common.bookAppointment') || 'Book Appointment'}
                    </button>
                    <button className={styles.secondaryBtn}>
                      <FaEnvelope className={styles.btnIcon} />
                      {t('common.askQuestion') || 'Ask Question'}
                    </button>
                  </div>
                </div>

                {/* Service Icons */}
                {safeIcons.length > 0 && (
                  <div className={styles.serviceIcons}>
                    {safeIcons.slice(0, 6).map((icon: any, idx: number) => (
                      <div key={idx} className={styles.serviceIcon}>
                        <i className={icon.icon || 'fas fa-paw'}></i>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Content Grid */}
            <div className={styles.contentGrid}>
              {/* Main Content */}
              <div className={styles.mainContent}>
                {/* Features Section */}
                {safeFeatures.length > 0 && (
                  <div className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                      <h2 className={styles.sectionTitle}>
                        <FaCheck className={styles.sectionIcon} />
                        {t('common.keyFeatures') || 'Key Features'}
                      </h2>
                    </div>
                    <div className={styles.featuresGrid}>
                      {safeFeatures.map((feature: any, idx: number) => (
                        <div key={idx} className={styles.featureCard}>
                          <div className={styles.featureIcon}>
                            <FaCheck />
                          </div>
                          <div className={styles.featureContent}>
                            <h3 className={styles.featureTitle}>{feature.text}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description Section */}
                <div className={styles.sectionCard}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                      <FaArrowRight className={styles.sectionIcon} />
                      {t('common.serviceDetails') || 'Service Details'}
                    </h2>
                  </div>
                  <div className={styles.descriptionContent}>
                    <p>{description}</p>
                  </div>
                </div>

                {/* FAQ Section */}
                {safeFaq.length > 0 && (
                  <div className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                      <h2 className={styles.sectionTitle}>
                        <FaArrowRight className={styles.sectionIcon} />
                        {t('common.frequentlyAskedQuestions') || 'Frequently Asked Questions'}
                      </h2>
                    </div>
                    <div className={styles.faqContainer}>
                      {safeFaq.map((faq: any, idx: number) => (
                        <details key={idx} className={styles.faqItem}>
                          <summary className={styles.faqQuestion}>
                            {faq.question}
                            <span className={styles.faqToggle}>+</span>
                          </summary>
                          <div className={styles.faqAnswer}>
                            <p>{faq.answer}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className={styles.sidebar}>
                {/* Quick Contact Card */}
                <div className={styles.sidebarCard}>
                  <h3 className={styles.sidebarTitle}>
                    <FaPhone className={styles.sidebarIcon} />
                    {t('common.quickContact') || 'Quick Contact'}
                  </h3>
                  <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                      <FaPhone className={styles.contactIcon} />
                      <div>
                        <span className={styles.contactLabel}>{t('common.phone') || 'Call'}</span>
                        <a href="tel:+966920011626" className={`${styles.contactValue} ${styles.phoneNumber}`}>+966 9200 11 626</a>
                      </div>
                    </div>
                    <div className={styles.contactItem}>
                      <FaPhone className={styles.contactIcon} style={{color: '#ef4444'}} />
                      <div>
                        <span className={styles.contactLabel}>{t('common.emergency') || 'Emergency'}</span>
                        <a href="tel:+966920011626" className={`${styles.contactValue} ${styles.phoneNumber}`}>+966 9200 11 626</a>
                      </div>
                    </div>
                    <div className={styles.contactItem}>
                      <FaEnvelope className={styles.contactIcon} />
                      <div>
                        <span className={styles.contactLabel}>{t('common.email') || 'Email'}</span>
                        <a href="mailto:info@elitevetksa.com" className={styles.contactValue}>info@elitevetksa.com</a>
                      </div>
                    </div>
                    <div className={styles.contactItem}>
                      <FaMapMarkerAlt className={styles.contactIcon} />
                      <div>
                        <span className={styles.contactLabel}>{t('common.address') || 'Address'}</span>
                        <span className={styles.contactValue}>Qurtubah gate, Al Thoumamah Rd, Qurtubah, Riyadh 13248</span>
                      </div>
                    </div>
                  </div>
                  <button className={styles.sidebarButton}>
                    <FaArrowRight className={styles.btnIcon} />
                    {t('common.contactNow') || 'Contact Now'}
                  </button>
                </div>

                {/* Working Hours Card */}
                <div className={styles.sidebarCard}>
                  <h3 className={styles.sidebarTitle}>
                    <FaClock className={styles.sidebarIcon} />
                    {t('common.workingHours') || 'Working Hours'}
                  </h3>
                  <div className={styles.hoursGrid}>
                    <div className={styles.hourItem}>
                      <span className={styles.dayLabel}>{t('common.saturday') || 'Sat'} - {t('common.thursday') || 'Thu'}</span>
                      <span className={styles.timeLabel}>09:00 - 22:00</span>
                    </div>
                    <div className={styles.hourItem}>
                      <span className={styles.dayLabel}>{t('common.emergencyCare') || 'Emergency Care'}</span>
                      <span className={styles.timeLabel}>24/7</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailPage;
