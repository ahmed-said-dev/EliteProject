import React from 'react';
import Link from 'next/link';
import styles from './ServicesSection.module.css';
import { useLanguage } from '@/context/LanguageContext';

interface IconProps {
  icon: string;
}

interface FeatureProps {
  text: string;
}

interface ServiceProps {
  id: number;
  title: string;
  image: string;
  icons: IconProps[];
  features: FeatureProps[];
  badge?: string;
  delay?: string;
  isActive?: boolean;
  description?: string;
}

// u062fu0627u0644u0629 u0644u0627u0633u062au0631u062cu0627u0639 u0635u0648u0631 u0627u0644u062eu062fu0645u0627u062a
const getServiceImage = (id: number): string => {
  const imageUrls = [
    'https://i.pinimg.com/736x/25/27/a6/2527a62d7918216e5e81b37c7c280fa3.jpg', // u0627u0644u062eu062fu0645u0627u062a u0627u0644u0637u0628u064au0629
    'https://i.pinimg.com/736x/47/4c/e3/474ce366e734558eeb16343879554f44.jpg', // u0631u0639u0627u064au0629 u0627u0644u0646u0638u0627u0641u0629 u0648u0627u0644u0645u0638u0647u0631
    'https://i.pinimg.com/736x/9c/d5/2b/9cd52b4ce0a7902864145dab137576f1.jpg', // u0627u0644u0627u062eu062au0628u0627u0631u0627u062a u0627u0644u062au0634u062eu0645u0648u0644
    'https://i.pinimg.com/736x/26/f1/f1/26f1f1f7b4c6f5fc1dfe51bb0447e8b9.jpg', // u0627u0644u062cu0631u0627u062du0627u062a u0627u0644u0637u0628u064au0629
    'https://i.pinimg.com/736x/79/8b/42/798b42f30b063925bb2b2e7524a41abb.jpg', // u062eu062fu0645u0627u062a u0627u0644u0623u0633u0646u0627u0646
    'https://www.petprofessional.com.au/wp-content/uploads/2019/06/Pet-anti-vaxxers-metro-co-uk.jpg', // u0627u0644u062au0637u0639u064au0645u0627u062a u0627u0644u062fu0648u0631u064au0629
    'https://i.pinimg.com/736x/01/8d/93/018d930d400ed98d7c48621cbb24fabf.jpg', // u0625u062cu0631u0627u0621u0627u062a u0633u0641u0631 u0627u0644u062du064au0648u0627u0646u0627u062a u0627u0644u0623u0644u064au0641u0629
    'https://i.pinimg.com/736x/76/2f/de/762fde59d1309282db0f192ee2c9c872.jpg', // u062eu062fu0645u0627u062a u0627u0644u0625u064au0648u0627u0621
    'https://i.pinimg.com/736x/f9/99/a2/f999a22a826faa65e79881b64bb0a559.jpg', // u0627u0644u0631u0639u0627u064au0629 u0627u0644u0645u0631u0643u0632u0629
    'https://i.pinimg.com/736x/9e/b6/af/9eb6af62323ba82eeb153e4fc1273067.jpg', // u062eu062fu0645u0627u062a u0627u0644u0637u0648u0627u0631u0626
    'https://i.pinimg.com/736x/12/c9/8e/12c98ef2077c0f4fcf8270eaefc63904.jpg', // u062eu062fu0645u0629 u0627u0644u0631u0639u0627u064au0629 u0627u0644u0645u0646u0632u0644u064au0629
  ];
  
  // u0627u0644u062au0623u0643u062f u0645u0646 u0623u0646 u0627u0644u0641u0647u0631u0633 u0636u0645u0646 u0627u0644u0646u0637u0627u0642
  const index = (id - 1) % imageUrls.length;
  return imageUrls[index];
};

// Exportar función para obtener servicios
export const getServices = (t: any): ServiceProps[] => {
  return t('serviceSection.categories', { returnObjects: true }).map((category, index) => {
    return {
      id: category.id,
      title: category.title,
      image: getServiceImage(index + 1),
      icons: [
        { icon: 'fa-microscope' },
        { icon: 'fa-heartbeat' },
        { icon: 'fa-shield-virus' },
        { icon: 'fa-stethoscope' }
      ],
      features: category.features.map(feature => ({ text: feature })),
      badge: category.badge,
      delay: `0.${index + 1}s`,
      isActive: index === 2 // Make the third item active by default
    };
  });
};

const ServicesSection: React.FC = () => {
  const { locale, isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';

  // Get services from translation files
  const services: ServiceProps[] = getServices(t);

  return (
    <section className={styles.servicesSection} dir={dir}>
      <div className={styles.shapesWrapper}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.servicesGrid}>
          {services.slice(0, 6).map((service) => (
            <div 
              key={service.id} 
              className={`${styles.serviceCard} ${service.isActive ? styles.active : ''} ${styles.wowFadeInUp}`}
              data-wow-delay={service.delay}
            >
              <div className={styles.iconBoxWrapper}>
                <div className={styles.iconContent}>
                  <div className={styles.iconGroup}>
                    {service.icons.map((icon, iconIndex) => (
                      <span key={iconIndex} className={styles.iconCell}>
                        <i className={`fas ${icon.icon}`}></i>
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardImageWrapper}>
                    <img 
                      className={styles.cardImage}
                      src={service.image}
                      alt={service.title}
                    />
                    <div className={styles.cardImageOverlay}></div>
                  </div>

                  <h3 className={styles.cardTitle}>{service.title}</h3>

                  <ul className={styles.featuresList}>
                    {service.features.map((feature, index) => (
                      <li key={index} className={styles.featureItem}>
                        <i className="fas fa-check-circle text-primary me-2"></i>
                        {feature.text}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.specialtyTags}>
                    <span className={styles.textBadge}>
                      <i className="fa fa-circle text-primary"></i>{' '}
                      {service.badge}
                    </span>
                  </div>
                </div>

                <div className={styles.iconBxFooter}>
                  <Link href={`/services/${service.id}`} className={styles.readMoreBtn}>
                    {isRTL ? 'اقرأ المزيد' : 'Read More'}
                  </Link>
                  <Link href={`/services/${service.id}`} className={styles.btnPrimary}>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.servicesGrid} style={{ marginTop: '2rem' }}>
          {services.slice(6).map((service) => (
            <div 
              key={service.id} 
              className={`${styles.serviceCard} ${service.isActive ? styles.active : ''} ${styles.wowFadeInUp}`}
              data-wow-delay={service.delay}
            >
              <div className={styles.iconBoxWrapper}>
                <div className={styles.iconContent}>
                  <div className={styles.iconGroup}>
                    {service.icons.map((icon, iconIndex) => (
                      <span key={iconIndex} className={styles.iconCell}>
                        <i className={`fas ${icon.icon}`}></i>
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardImageWrapper}>
                    <img 
                      className={styles.cardImage}
                      src={service.image}
                      alt={service.title}
                    />
                    <div className={styles.cardImageOverlay}></div>
                  </div>

                  <h3 className={styles.cardTitle}>{service.title}</h3>

                  <ul className={styles.featuresList}>
                    {service.features.map((feature, index) => (
                      <li key={index} className={styles.featureItem}>
                        <i className="fas fa-check-circle text-primary me-2"></i>
                        {feature.text}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.specialtyTags}>
                    <span className={styles.textBadge}>
                      <i className="fa fa-circle text-primary"></i>{' '}
                      {service.badge}
                    </span>
                  </div>
                </div>

                <div className={styles.iconBxFooter}>
                  <Link href={`/services/${service.id}`} className={styles.readMoreBtn}>
                    {isRTL ? 'اقرأ المزيد' : 'Read More'}
                  </Link>
                  <Link href={`/services/${service.id}`} className={styles.btnPrimary}>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.textCenter} style={{ marginTop: '3rem' }}>
          <Link href="/services" className={styles.btnPrimaryLg}>
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
