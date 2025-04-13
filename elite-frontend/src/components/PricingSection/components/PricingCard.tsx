import React from 'react';
import styles from '../components/PricingCard.module.css';

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  planType: string;
  title: string;
  price: string;
  duration: string;
  features: PricingFeature[];
  buttonText: string;
  buttonLink: string;
  isPopular?: boolean;
  svgIconPath?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  planType,
  title,
  price,
  duration,
  features,
  buttonText,
  buttonLink,
  isPopular = false,
  svgIconPath,
}) => {
  return (
    <div className={styles.pricingCard}>
      {svgIconPath && (
        <div className={styles.svgWrapper}>
          <svg className={styles.svg} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path d={svgIconPath} />
          </svg>
        </div>
      )}
      <div className={styles.pricingHeader}>
        <span className={styles.planTag}>{planType}</span>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.priceWrapper}>
          <h2 className={styles.priceAmount}>
            <span className={styles.currency}>SAR</span>
            <span className={styles.amount}>{price}</span>
            <span className={styles.priceDuration}>{duration}</span>
          </h2>
        </div>
      </div>
      <div className={styles.pricingBody}>
        <ul className={styles.pricingFeatures}>
          {features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <i className="fas fa-check" />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.pricingFooter}>
        <a className={styles.pricingBtn} href={buttonLink}>
          {buttonText}
        </a>
      </div>
      {isPopular && <span className={styles.popularTag}>Popular</span>}
    </div>
  );
};

export default PricingCard;
