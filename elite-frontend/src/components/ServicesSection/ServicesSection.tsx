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
    title: 'Our Medical Services',
    image: 'https://i.pinimg.com/736x/25/27/a6/2527a62d7918216e5e81b37c7c280fa3.jpg',
    icons: [
      { icon: 'fa-microscope' },
      { icon: 'fa-allergies' },
      { icon: 'fa-heartbeat' },
      { icon: 'fa-shield-virus' }
    ],
    features: [
      { text: 'Internal Medicine: Expert diagnosis and treatment of internal diseases' },
      { text: 'Skin & Immune Care: Advanced treatments for skin and immune disorders' },
      { text: 'Heart Disease: State-of-the-art cardiac care and procedures' },
      { text: 'Isolation Care: Safe environment for infectious disease treatment' },
      { text: 'Bird Care: Specialized avian healthcare services' },
      { text: 'Respiratory Care: Treatment for breathing conditions' },
      { text: 'Kidney & Liver: Management of chronic organ diseases' },
      { text: 'Eye Care: Advanced treatment for vision problems' },
      { text: 'Neurology: Brain and spinal injury treatment' }
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
    title: 'Diagnostic Tests',
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
  },
  {
    id: 4,
    title: 'Medical Surgeries',
    image: 'https://i.pinimg.com/736x/26/f1/f1/26f1f1f7b4c6f5fc1dfe51bb0447e8b9.jpg',
    icons: [
      { icon: 'fa-scalpel' },
      { icon: 'fa-bone' },
      { icon: 'fa-brain' },
      { icon: 'fa-heart' }
    ],
    features: [
      { text: 'General Surgery: Spaying, neutering, and mass removal' },
      { text: 'Orthopedic Surgery: Fracture repair and joint replacements' },
      { text: 'Neurosurgery: IVDD and brain tumor procedures' },
      { text: 'Soft Tissue Surgery: Advanced procedures with minimal invasion' },
      { text: 'Gastrointestinal Surgery: Treatment for bloat and obstructions' },
      { text: 'Advanced Pain Management: Comprehensive care protocols' },
      { text: 'State-of-the-Art Facilities: Modern surgical suites' },
      { text: 'Expert Surgical Team: Highly skilled veterinary surgeons' },
      { text: 'Post-Operative Care: Dedicated recovery monitoring' }
    ],
    badge: 'Surgical Excellence',
    delay: '0.4s'
  },
  {
    id: 5,
    title: 'Dental Services',
    image: 'https://i.pinimg.com/736x/79/8b/42/798b42f30b063925bb2b2e7524a41abb.jpg',
    icons: [
      { icon: 'fa-tooth' },
      { icon: 'fa-teeth' },
      { icon: 'fa-file-medical' },
      { icon: 'fa-hand-holding-medical' }
    ],
    features: [
      { text: 'Professional Teeth Cleaning and Tartar Removal' },
      { text: 'Extraction of Damaged or Diseased Teeth' },
      { text: 'Gum Disease Treatment and Prevention' },
      { text: 'Dental Fillings and Cavity Repair' },
      { text: 'Treatment of Mouth Infections' },
      { text: 'Advanced Dental Equipment' },
      { text: 'Comprehensive Oral Examinations' },
      { text: 'Pain Management Techniques' },
      { text: 'Regular Dental Check-ups' }
    ],
    badge: 'Dental Excellence',
    delay: '0.5s'
  },
  {
    id: 6,
    title: 'Periodic Vaccinations',
    image: 'https://www.petprofessional.com.au/wp-content/uploads/2019/06/Pet-anti-vaxxers-metro-co-uk.jpg',
    icons: [
      { icon: 'fa-syringe' },
      { icon: 'fa-shield-virus' },
      { icon: 'fa-calendar-check' },
      { icon: 'fa-heartbeat' }
    ],
    features: [
      { text: 'Rabies Vaccine: Essential protection for all pets' },
      { text: 'FVRCP Vaccine: Complete protection for cats' },
      { text: 'FeLV Vaccine: Feline leukemia prevention' },
      { text: 'DHPP Vaccine: Core protection for dogs' },
      { text: 'Regular Health Check-ups: Comprehensive exams' },
      { text: 'Customized Vaccination Schedules' },
      { text: 'Preventive Healthcare Plans' },
      { text: 'Expert Veterinary Guidance' },
      { text: 'Digital Vaccination Records' }
    ],
    badge: 'Preventive Care',
    delay: '0.6s'
  },
  {
    id: 7,
    title: 'Pet Travel Procedures',
    image: 'https://i.pinimg.com/736x/01/8d/93/018d930d400ed98d7c48621cbb24fabf.jpg',
    icons: [
      { icon: 'fa-plane' },
      { icon: 'fa-passport' },
      { icon: 'fa-certificate' },
      { icon: 'fa-microchip' }
    ],
    features: [
      { text: 'Pre-Travel Health Check: Comprehensive examination' },
      { text: 'Veterinary Health Certificate: Official documentation' },
      { text: 'Travel Vaccinations: Destination-specific requirements' },
      { text: 'Parasiticide Treatment: Complete protection' },
      { text: 'Electronic ID Chip: International standard microchipping' },
      { text: 'Travel Consultation: Expert guidance and advice' },
      { text: 'Documentation Processing: Streamlined paperwork' },
      { text: 'International Regulations: Up-to-date compliance' },
      { text: 'Travel Kit Preparation: Essential supplies guidance' }
    ],
    badge: 'Travel Ready',
    delay: '0.7s'
  },
  {
    id: 8,
    title: 'Boarding Services',
    image: 'https://i.pinimg.com/736x/76/2f/de/762fde59d1309282db0f192ee2c9c872.jpg',
    icons: [
      { icon: 'fa-home' },
      { icon: 'fa-paw' },
      { icon: 'fa-heart' },
      { icon: 'fa-bone' }
    ],
    features: [
      { text: 'Daily Stay: Cozy accommodations & care' },
      { text: 'Long-Term Stay: Comprehensive care packages' },
      { text: 'Daily Nutrition: Premium pet food options' },
      { text: 'Medical Follow-up: Regular health monitoring' },
      { text: 'Walking & Personal Care: Daily exercise' },
      { text: 'Playtime & Socialization: Supervised activities' },
      { text: 'Veterinary Supervision: On-site medical care' },
      { text: 'Luxurious Facilities: Clean, spacious kennels' },
      { text: '24/7 Staff Monitoring: Constant attention' }
    ],
    badge: 'Pet Hotel',
    delay: '0.8s'
  },
  {
    id: 9,
    title: 'Intensive Care',
    image: 'https://i.pinimg.com/736x/f9/99/a2/f999a22a826faa65e79881b64bb0a559.jpg',
    icons: [
      { icon: 'fa-hospital' },
      { icon: 'fa-heartbeat' },
      { icon: 'fa-user-md' },
      { icon: 'fa-clock' }
    ],
    features: [
      { text: 'Post-Operative Care: 24/7 monitoring' },
      { text: 'Vital Signs Monitoring: Advanced equipment' },
      { text: 'Critical Care: Emergency treatments' },
      { text: '24-Hour Care: Round-the-clock staffing' },
      { text: 'Pain Management: Personalized plans' },
      { text: 'Advanced Medical Equipment: State-of-the-art' },
      { text: 'Expert Veterinary Team: Experienced staff' },
      { text: 'Emergency Response: Immediate action' },
      { text: 'Continuous Monitoring: Real-time tracking' }
    ],
    badge: 'ICU',
    delay: '0.9s'
  },
  {
    id: 10,
    title: 'Emergency Services',
    image: 'https://i.pinimg.com/736x/9e/b6/af/9eb6af62323ba82eeb153e4fc1273067.jpg',
    icons: [
      { icon: 'fa-ambulance' },
      { icon: 'fa-first-aid' },
      { icon: 'fa-procedures' },
      { icon: 'fa-phone-volume' }
    ],
    features: [
      { text: '24/7 Emergency Response: Always available' },
      { text: 'Urgent Injury Treatment: Immediate care' },
      { text: 'Poisoning Cases: Swift intervention' },
      { text: 'Immediate First Aid: Quick response' },
      { text: 'Emergency Surgery: When needed' },
      { text: 'Trauma Care: Expert handling' },
      { text: 'Critical Stabilization: Life-saving care' },
      { text: 'Advanced Equipment: Latest technology' },
      { text: 'Experienced Team: 24/7 staffing' }
    ],
    badge: 'Emergency',
    delay: '1.0s'
  },
  {
    id: 11,
    title: 'Home Care Service',
    image: 'https://i.pinimg.com/736x/12/c9/8e/12c98ef2077c0f4fcf8270eaefc63904.jpg',
    icons: [
      { icon: 'fa-house-user' },
      { icon: 'fa-hand-holding-heart' },
      { icon: 'fa-prescription-bottle-medical' },
      { icon: 'fa-stethoscope' }
    ],
    features: [
      { text: 'Home Veterinary Visits: Comprehensive care' },
      { text: 'Medication Administration: At-home service' },
      { text: 'Home Examinations: Thorough check-ups' },
      { text: 'Post-Surgery Care: Recovery support' },
      { text: 'Daily Care Services: Regular attention' },
      { text: 'Geriatric Care: Senior pet support' },
      { text: 'Behavioral Support: Expert guidance' },
      { text: 'Health Monitoring: Regular checks' },
      { text: 'Personalized Care Plans: Custom service' }
    ],
    badge: 'Home Visit',
    delay: '1.1s'
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
