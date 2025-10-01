import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ServicePage } from '@/hooks/useServicePages';
import styles from '@/styles/components/ServiceDetail/ServiceDescription.module.css';

interface ServiceDescriptionProps {
  service: ServicePage;
  title: string;
}

const ServiceDescription: React.FC<ServiceDescriptionProps> = ({ service, title }) => {
  const { dir } = useLanguage();

  // للعرض التوضيحي، سنستخدم وصف ثابت إذا كان الوصف الحقيقي قصيرًا أو غير متوفر
  const fullDescription = service.description && service.description.length > 100 
    ? service.description 
    : `${service.description || ''}\n\nفي عيادة النخبة البيطرية، نفخر بتقديم أعلى مستويات الرعاية لحيواناتك الأليفة. نقدم خدمات ${service.title} بأحدث المعدات والتقنيات، وفريق من الأطباء ذوي الخبرة العالية.\n\nتشمل خدماتنا فحصًا شاملًا، وتشخيصًا دقيقًا، ومتابعة مستمرة لضمان صحة وسلامة حيوانك الأليف. نؤمن بأن كل حيوان يستحق رعاية استثنائية وشخصية تناسب احتياجاته الفريدة.`;

  // تقسيم النص إلى فقرات
  const paragraphs = fullDescription.split('\n\n');

  return (
    <section className={`${styles.descriptionSection} ${dir === 'rtl' ? styles.rtl : ''}`}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
        
        <div className={styles.infoCard}>
          <h3 className={styles.infoCardTitle}>معلومات الخدمة</h3>
          
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <i className="fas fa-clock"></i>
            </div>
            <div className={styles.infoContent}>
              <h4 className={styles.infoLabel}>مواعيد الخدمة</h4>
              <p className={styles.infoValue}>السبت - الخميس: 9:00 صباحًا - 9:00 مساءً</p>
              <p className={styles.infoValue}>الجمعة: 2:00 ظهرًا - 9:00 مساءً</p>
            </div>
          </div>
          
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <i className="fas fa-phone-alt"></i>
            </div>
            <div className={styles.infoContent}>
              <h4 className={styles.infoLabel}>للحجز والاستفسار</h4>
              <p className={styles.infoValue}>920011626</p>
            </div>
          </div>
          
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>
              <i className="fas fa-calendar-check"></i>
            </div>
            <div className={styles.infoContent}>
              <h4 className={styles.infoLabel}>احجز موعدًا</h4>
              <a href="/appointment" className={styles.appointmentButton}>
                احجز الآن
              </a>
            </div>
          </div>
          
          {service.badge && (
            <div className={styles.specialBadge}>
              <i className="fas fa-certificate"></i>
              <span>{service.badge}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceDescription;
