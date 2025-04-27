import React from 'react';
import styles from '../components/PricingCard.module.css';
import { Feature } from '@/hooks/useMembershipsApi';
import { useLanguage } from '@/context/LanguageContext';

interface PricingCardProps {
  planType: string;
  title: string;
  price: number;
  duration: string;
  features: Feature[];
  buttonText: string;
  buttonLink?: string;
  isPopular?: boolean;
  iconClass?: string; // For Font Awesome if available
  svgIcon?: string;   // For fallback SVG icon
  onButtonClick?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  planType,
  title,
  price,
  duration,
  features,
  buttonText,
  buttonLink = '#',
  isPopular = false,
  iconClass,
  svgIcon,
  onButtonClick,
}) => {
  const { isRTL } = useLanguage();
  
  const handleClick = (e: React.MouseEvent) => {
    if (onButtonClick) {
      e.preventDefault();
      onButtonClick();
    }
  };

  // Simple SVG icons for pets
  const catSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#7a49a3" d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"/></svg>`;
  
  const dogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#7a49a3" d="M298.06,224,448,277.55V496a16,16,0,0,1-16,16H368a16,16,0,0,1-16-16V384H192V496a16,16,0,0,1-16,16H112a16,16,0,0,1-16-16V282.09C58.84,268.84,32,233.66,32,192a32,32,0,0,1,64,0,32,32,0,0,0,32,32ZM544,112v32a64,64,0,0,1-64,64H448v35.58L320,197.87V48c0-14.25,17.22-21.39,27.31-11.31L374.59,64h53.63c10.91,0,23.75,7.92,28.62,17.69L464,96h64A16,16,0,0,1,544,112Zm-112,0a16,16,0,1,0-16,16A16,16,0,0,0,432,112Z"/></svg>`;
  
  const pawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#7a49a3" d="M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34zm266.56 0c-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.16-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34-29.12-6.96-61.16 15.48-71.56 50.13zM256 183.5c29.12 0 52.76-23.64 52.76-52.76 0-29.12-23.64-52.76-52.76-52.76-29.12 0-52.76 23.64-52.76 52.76 0 29.12 23.64 52.76 52.76 52.76z"/></svg>`;

  // Get the appropriate SVG based on the plan type or use provided SVG icon
  const getSvgIcon = () => {
    if (svgIcon) return svgIcon;
    
    const petType = planType?.toLowerCase() || '';
    if (petType.includes('cat')) return catSvg;
    if (petType.includes('dog')) return dogSvg;
    return pawSvg;
  };

  return (
    <div className={styles.pricingCard}>
      <div className={styles.svgWrapper}>
        <div 
          dangerouslySetInnerHTML={{ __html: getSvgIcon() }} 
          style={{ width: '100%', height: '100%', opacity: '0.7' }}
        />
      </div>
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
        <ul className={`${styles.pricingFeatures} ${isRTL ? styles['rtlFeatures'] : ''}`}>
          {features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <i className={feature.isIncluded ? "fas fa-check" : "fas fa-times"} />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.pricingFooter}>
        <a 
          className={styles.pricingBtn} 
          href={buttonLink}
          onClick={handleClick}
        >
          {buttonText}
        </a>
      </div>
      {isPopular && <span className={styles.popularTag}>Popular</span>}
    </div>
  );
};

export default PricingCard;
