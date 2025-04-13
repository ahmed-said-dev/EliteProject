import React from 'react';
import styles from '../components/ServiceComponents.module.css';

interface ServiceHeroProps {
  title: string;
  image: string;
  badge: string;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ title, image, badge }) => {
  return (
    <div className={styles.serviceHero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextContent}>
            <h1 className={styles.heroTitle}>{title}</h1>
            {badge && (
              <div className={styles.heroBadge}>
                <span><i className="fa fa-certificate" /> {badge}</span>
              </div>
            )}
            <div className={styles.heroAccent}></div>
          </div>
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageContainer}>
              <img src={image} alt={title} className={styles.heroImage} />
              <div className={styles.heroImageOverlay}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHero;
