import React from 'react';
import { useSingleMembershipPlan } from '@/hooks/useMembershipsApi';
import { useLanguage } from '@/context/LanguageContext';
import styles from '@/styles/MembershipModal.module.css';
import Loader from '@/components/ui/Loader';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId?: number | string;
  planType?: string;
}

const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose, planId, planType }) => {
  const { t, isRTL } = useLanguage();
  const { plan, loading, error } = useSingleMembershipPlan(planId);
  const dir = isRTL ? 'rtl' : 'ltr';
  
  if (!isOpen) return null;
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick} dir={dir}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {isRTL ? 'تفاصيل خطة العضوية' : 'Membership Plan Details'}
          </h2>
        </div>
        
        {loading ? (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        ) : error ? (
          <div className={styles.errorMessage}>
            {isRTL ? 'حدث خطأ أثناء تحميل بيانات العضوية' : 'Error loading membership details'}
          </div>
        ) : plan ? (
          <div className={styles.modalBody}>
            <div className={styles.leftColumn}>
              <div className={styles.imageContainer}>
                {plan.coverImage ? (
                  <img 
                    src={plan.coverImage.url} 
                    alt={plan.coverImage.alternativeText || plan.title} 
                    className={styles.planImage}
                  />
                ) : (
                  <div 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      background: 'linear-gradient(135deg, #8e54c9 0%, #7a49a3 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" fill="white" fillOpacity="0.8"/>
                      <path d="M3 21C3 17.134 6.13401 14 10 14H14C17.866 14 21 17.134 21 21V22H3V21Z" fill="white" fillOpacity="0.8"/>
                    </svg>
                  </div>
                )}
                {plan.PetType && (
                  <div className={styles.petType}>
                    {plan.PetType}
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.rightColumn}>
              <div className={styles.planDetails}>
                <div className={styles.planHeader}>
                  <h3 className={styles.planTitle}>{plan.title}</h3>
                  <p className={styles.planDescription}>{plan.description}</p>
                </div>
                
                <div className={styles.pricingInfo}>
                  <div className={styles.priceBlock}>
                    <h4 className={styles.priceLabel}>{isRTL ? 'الاشتراك الشهري' : 'Monthly Subscription'}</h4>
                    <div className={styles.priceValue}>
                      <span className={styles.currency}>{isRTL ? 'ج.م' : 'EGP'}</span>
                      <span className={styles.amount}>{plan.price.monthly}</span>
                      <span className={styles.period}>{isRTL ? '/شهر' : '/month'}</span>
                    </div>
                  </div>
                  
                  <div className={styles.priceBlock}>
                    <h4 className={styles.priceLabel}>{isRTL ? 'الاشتراك السنوي' : 'Annual Subscription'}</h4>
                    <div className={styles.priceValue}>
                      <span className={styles.currency}>{isRTL ? 'ج.م' : 'EGP'}</span>
                      <span className={styles.amount}>{plan.price.annual}</span>
                      <span className={styles.period}>{isRTL ? '/سنة' : '/year'}</span>
                    </div>
                    <span className={styles.savingsTag}>
                      {isRTL ? 'توفير 10%' : 'Save 10%'}
                    </span>
                  </div>
                </div>
                
                <div className={styles.featuresSection}>
                  <h4 className={styles.featuresTitle}>{isRTL ? 'المميزات' : 'Features'}</h4>
                  <ul className={styles.featuresList}>
                    {plan.features.map((feature) => (
                      <li 
                        key={feature.id} 
                        className={`${styles.featureItem} ${!feature.isIncluded ? styles.featureNotIncluded : ''}`}
                      >
                        <span className={styles.featureIcon}>
                          {feature.isIncluded ? '✓' : '✕'}
                        </span>
                        <span className={styles.featureText}>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.ctaSection}>
                  <button className={styles.subscribeButton}>
                    {isRTL ? 'اشترك الآن' : 'Subscribe Now'}
                  </button>
                  <button className={styles.contactButton}>
                    {isRTL ? 'تواصل معنا للمزيد من المعلومات' : 'Contact Us For More Info'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.notFoundMessage}>
            {isRTL ? 'لم يتم العثور على خطة العضوية' : 'Membership plan not found'}
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipModal;
