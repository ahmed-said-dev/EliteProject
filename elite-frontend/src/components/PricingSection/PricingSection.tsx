import React, { useState } from 'react';
import styles from './PricingSection.module.css';
import PricingCard from './components/PricingCard';
import PricingToggle from './components/PricingToggle';
import MembershipModal from '../MembershipModal';
import { useLanguage } from '@/context/LanguageContext';

// SVG path constants
const CAT_SVG_PATH = "M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34zm266.56 0c-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.16-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34-29.12-6.96-61.16 15.48-71.56 50.13zM256 183.5c29.12 0 52.76-23.64 52.76-52.76 0-29.12-23.64-52.76-52.76-52.76-29.12 0-52.76 23.64-52.76 52.76 0 29.12 23.64 52.76 52.76 52.76z";

const DOG_SVG_PATH = "M496 96h-64l-7.16-14.31A32 32 0 0 0 396.22 64H342.6l-27.28-27.28C305.23 26.64 288 33.78 288 48.03v149.84l128 45.71V208h32c35.35 0 64-28.65 64-64v-32c0-8.84-7.16-16-16-16zm-112 48c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zM96 224c-17.64 0-32-14.36-32-32 0-17.67-14.33-32-32-32S0 174.33 0 192c0 41.66 26.83 76.85 64 90.1V496c0 8.84 7.16 16 16 16h64c8.84 0 16-7.16 16-16V384h160v112c0 8.84 7.16 16 16 16h64c8.84 0 16-7.16 16-16V277.55L266.05 224H96z";

const PricingSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [isMonthly, setIsMonthly] = useState(true);
  const [modalOpen, setModalOpen] = useState<'cat' | 'dog' | null>(null);
  const dir = isRTL ? 'rtl' : 'ltr';

  // Features for cat plan
  const catFeatures = [
    { text: t('pricing.catPlan.features.checkups') },
    { text: t('pricing.catPlan.features.therapeutic') },
    { text: t('pricing.catPlan.features.diagnostic') },
    { text: t('pricing.catPlan.features.priority') },
    { text: t('pricing.catPlan.features.perks') },
  ];

  // Features for dog plan
  const dogFeatures = [
    { text: t('pricing.dogPlan.features.checkups') },
    { text: t('pricing.dogPlan.features.therapeutic') },
    { text: t('pricing.dogPlan.features.services') },
    { text: t('pricing.dogPlan.features.vip') },
    { text: t('pricing.dogPlan.features.luxury') },
  ];

  // Features for custom plan
  const customFeatures = [
    { text: t('pricing.customPlan.features.care') },
    { text: t('pricing.customPlan.features.scheduling') },
    { text: t('pricing.customPlan.features.support') },
    { text: t('pricing.customPlan.features.benefits') },
    { text: t('pricing.customPlan.features.perks') },
  ];

  // Calculate annual prices (10% discount)
  const catPrice = isMonthly ? t('pricing.catPlan.monthlyPrice') : t('pricing.catPlan.annualPrice');
  const dogPrice = isMonthly ? t('pricing.dogPlan.monthlyPrice') : t('pricing.dogPlan.annualPrice');
  const priceDuration = isMonthly ? t('pricing.duration.monthly') : t('pricing.duration.annual');

  const handleToggle = (monthly: boolean) => {
    setIsMonthly(monthly);
  };

  const openModal = (type: 'cat' | 'dog') => {
    setModalOpen(type);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  return (
    <section className={styles.pricingSection} dir={dir}>
      <div className={styles.pricingBgOverlay} />
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <h2 className={styles.title}>{t('pricing.title')}</h2>
          <p className={styles.subTitle}>
            {t('pricing.subtitle1')}
            <br />
            {t('pricing.subtitle2')}
          </p>
          <PricingToggle onToggle={handleToggle} />
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <PricingCard
              planType={t('pricing.catPlan.name')}
              title={t('pricing.catPlan.title')}
              price={catPrice}
              duration={priceDuration}
              features={catFeatures}
              buttonText={t('pricing.button.getStarted')}
              buttonLink="#catModal"
              svgIconPath={CAT_SVG_PATH}
              onButtonClick={() => openModal('cat')}
            />
          </div>
          <div className={styles.col}>
            <PricingCard
              planType={t('pricing.dogPlan.name')}
              title={t('pricing.dogPlan.title')}
              price={dogPrice}
              duration={priceDuration}
              features={dogFeatures}
              buttonText={t('pricing.button.getStarted')}
              buttonLink="#dogModal"
              isPopular={true}
              svgIconPath={DOG_SVG_PATH}
              onButtonClick={() => openModal('dog')}
            />
          </div>
          <div className={styles.col}>
            <PricingCard
              planType={t('pricing.customPlan.name')}
              title={t('pricing.customPlan.title')}
              price={t('pricing.customPlan.price')}
              duration=""
              features={customFeatures}
              buttonText={t('pricing.button.bookCall')}
              buttonLink="#contact-form"
            />
          </div>
        </div>
      </div>
      
      {/* Membership Modals */}
      <MembershipModal 
        isOpen={modalOpen === 'dog'}
        onRequestClose={closeModal}
        planType="dog"
      />
      
      <MembershipModal 
        isOpen={modalOpen === 'cat'}
        onRequestClose={closeModal}
        planType="cat"
      />
    </section>
  );
};

export default PricingSection;
