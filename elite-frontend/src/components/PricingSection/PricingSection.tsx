import React, { useState } from 'react';
import styles from './PricingSection.module.css';
import PricingCard from './components/PricingCard';
import PricingToggle from './components/PricingToggle';
import MembershipModal from '../MembershipModal';
import { useLanguage } from '@/context/LanguageContext';
import { useMembershipPlans, Feature } from '@/hooks/useMembershipsApi';
import Loader from '@/components/ui/Loader';

const PricingSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [isMonthly, setIsMonthly] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [selectedPlanType, setSelectedPlanType] = useState<string | null>(null);
  const dir = isRTL ? 'rtl' : 'ltr';

  // Fetch plans from API
  const { plans, loading, error } = useMembershipPlans();

  // Handle billing period toggle
  const handleToggle = (monthly: boolean) => {
    setIsMonthly(monthly);
  };

  // Open modal with specific plan ID and type
  const openModal = (id: number, type: string) => {
    setSelectedPlanId(id);
    setSelectedPlanType(type);
  };

  // Close modal
  const closeModal = () => {
    setSelectedPlanId(null);
    setSelectedPlanType(null);
  };

  // If data is loading, show loader
  if (loading) {
    return (
      <section id="pricing-plans" className={styles['pricingSection']} dir={dir}>
        <div className={styles['pricingBgOverlay']}></div>
        <div className={styles['container']}>
          <div className={styles['loaderWrapper']}>
            <Loader />
          </div>
        </div>
      </section>
    );
  }

  // If no plans are available from API, show error message
  if (error || plans.length === 0) {
    return (
      <section id="pricing-plans" className={styles['pricingSection']} dir={dir}>
        <div className={styles['pricingBgOverlay']}></div>
        <div className={styles['container']}>
          <div className={styles['sectionHead']}>
            <h2 className={styles['sectionTitle']}>{t('pricing.title')}</h2>
            <p className={styles['sectionSubtitle']}>{t('pricing.subtitle')}</p>
          </div>
          
          <div className={styles['errorMessage']}>
            {error ? t('pricing.error.message') : t('pricing.noPlans')}
          </div>
        </div>
      </section>
    );
  }

  // Get the price based on the selected billing period (monthly/annual)
  const getPriceByPeriod = (plan) => {
    return isMonthly ? plan.price.monthly : plan.price.annual;
  };

  return (
    <section id="pricing-plans" className={styles['pricingSection']} dir={dir}>
      <div className={styles['pricingBgOverlay']}></div>
      <div className={styles['container']}>
        <div className={styles['sectionHead']}>
          <h2 className={styles['sectionTitle']}>{t('pricing.title')}</h2>
          <p className={styles['sectionSubtitle']}>{t('pricing.subtitle')}</p>
        </div>
        
        <PricingToggle onToggle={handleToggle} />
        
        <div className={styles['pricingCards']}>
          {/* Display all plans */}
          {plans.map((plan) => (
            <div key={plan.id} className={styles['cardWrapper']}>
              <PricingCard 
                planType={plan.PetType}
                title={plan.title}
                price={getPriceByPeriod(plan)}
                duration={isMonthly ? t('pricing.duration.monthly') : t('pricing.duration.annual')}
                features={plan.features}
                buttonText={isRTL ? "اشترك الآن" : "Subscribe Now"}
                isPopular={plan.isFeatured}
                svgIcon={plan.iconClass ? undefined : undefined} // Let the component use auto-detected SVG based on PetType
                onButtonClick={() => openModal(plan.id, 'general')}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Modals for plan details */}
      {selectedPlanId && (
        <MembershipModal
          isOpen={true} 
          onClose={closeModal}
          planId={selectedPlanId}
          planType={selectedPlanType}
        />
      )}
    </section>
  );
};

export default PricingSection;
