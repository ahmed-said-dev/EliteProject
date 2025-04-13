import React from 'react';
import styles from './ServicesSection.module.css';
import Link from 'next/link';

interface ServiceIconProps {
  icon: string;
}

interface ServiceFeature {
  text: string;
}

interface ServiceProps {
  id: number;
  title: string;
  description?: string;
  image: string;
  icons: ServiceIconProps[];
  features: ServiceFeature[];
  badge: string;
  isActive?: boolean;
  delay?: string;
}

const services: ServiceProps[] = [
  {
    id: 1,
    title: 'Medical Services',
    image: 'https://i.pinimg.com/736x/25/27/a6/2527a62d7918216e5e81b37c7c280fa3.jpg',
    icons: [
      { icon: 'fa-heartbeat' },
      { icon: 'fa-stethoscope' },
      { icon: 'fa-shield-virus' },
      { icon: 'fa-syringe' }
    ],
    features: [
      { text: 'Comprehensive health exams' },
      { text: 'Customized vaccination plans' },
      { text: 'Parasite prevention' },
      { text: 'Nutritional counseling' },
      { text: 'Early disease detection' },
      { text: 'Growth monitoring' },
      { text: 'Dental check-ups' },
      { text: 'Wellness programs' }
    ],
    badge: 'Elite Care',
    delay: '0.1s'
  },
  {
    id: 2,
    title: 'Hygiene & Appearance Care',
    image: 'https://i.pinimg.com/736x/47/4c/e3/474ce366e734558eeb16343879554f44.jpg',
    icons: [
      { icon: 'fa-cut' },
      { icon: 'fa-tooth' },
      { icon: 'fa-shower' },
      { icon: 'fa-paw' }
    ],
    features: [
      { text: 'Teeth Cleaning: Professional dental care for optimal oral health' },
      { text: 'Nail Clipping: Safe and precise nail trimming services' },
      { text: 'Ear Cleaning: Thorough cleaning to prevent infections' },
      { text: 'Bathing & Drying: Premium grooming with quality products' },
      { text: 'Hair Combing: Professional detangling and mat removal' },
      { text: 'Hair Cutting: Breed-specific and custom styling options' },
      { text: 'Expert Groomers: Experienced in all breeds and sizes' },
      { text: 'Modern Facilities: State-of-the-art grooming equipment' },
      { text: 'Stress-Free Environment: Gentle handling techniques' }
    ],
    badge: 'Premium Care',
    delay: '0.2s'
  },
  {
    id: 3,
    title: 'Advanced Diagnostics',
    image: 'https://i.pinimg.com/736x/9c/d5/2b/9cd52b4ce0a7902864145dab137576f1.jpg',
    icons: [
      { icon: 'fa-microscope' },
      { icon: 'fa-x-ray' },
      { icon: 'fa-vial' },
      { icon: 'fa-laptop-medical' }
    ],
    features: [
      { text: 'Blood Tests: Complete blood count, chemistry profile, and thyroid tests' },
      { text: 'PCW Tests: Comprehensive health assessment and early detection' },
      { text: 'Urine & Fecal Tests: Infection and parasite detection' },
      { text: 'X-rays: Bone, joint, and internal organ examination' },
      { text: 'Ultrasound: Detailed organ imaging and pregnancy checks' },
      { text: 'Endoscopy: Minimally invasive internal examination' },
      { text: 'CT Scan: Advanced cross-sectional imaging' },
      { text: 'In-house Laboratory: Quick and accurate results' },
      { text: 'Expert Analysis: Skilled veterinary diagnosticians' }
    ],
    badge: 'Advanced Diagnostics',
    isActive: true,
    delay: '0.3s'
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.shapesWrapper}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
      </div>
      
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <span className={styles.subtitle}>Our Services</span>
          <h2 className={styles.title}>Comprehensive Veterinary Care</h2>
          <p className={styles.description}>
            We offer a wide range of services to meet all your pet's healthcare needs, from routine check-ups to advanced treatments.
          </p>
        </div>
        
        <div className={styles.servicesGrid}>
          {services.map((service) => (
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
                    Read More
                  </Link>
                  <Link href={`/services/${service.id}`} className={styles.btnPrimary}>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
