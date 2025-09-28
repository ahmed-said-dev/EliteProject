import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.css';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '../../../i18n';
import { useHomeServices } from '@/hooks/useHomeServices';

const Footer = () => {
  const { locale, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  // جلب الخدمات من نفس مصدر الهيدر
  const { pages, isLoading, error } = useHomeServices();
  return (
    <footer className={styles.elite_footer} dir={dir}>
      <div className={styles.container}>
        <div className={styles.footer_grid}>
          {/* Logo and Description Column */}
          <div className={styles.footer_logo_section}>
            <div className={styles.footer_logo}>
              <div className={styles.logo_blend_wrapper}>
                <Image 
                  src="/images/logo.png" 
                  alt="Elite Vet" 
                  width={180}
                  height={80}
                  priority
                  className={styles.blend_divide}
                />
              </div>
            </div>
            <h3 className={styles.footer_title}>{translate('footer.title', locale)}</h3>
            <h4 className={styles.footer_subtitle}>{translate('footer.subtitle', locale)}</h4>
            <p className={styles.footer_description}>
              {translate('footer.description', locale)}
            </p>
            <div className={styles.footer_wave_decoration}>
              <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
                <path d="M0 10C20 5, 30 15, 50 10C70 5, 80 15, 100 10" stroke="#FFD700" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Services Section */}
          <div className={styles.footer_services_section}>
            <h3 className={styles.section_title}>{translate('footer.services.title', locale)}</h3>
            {isLoading ? (
              <div className={styles.services_loading}>
                <i className="fas fa-spinner fa-spin"></i>
                {isRTL ? 'جاري تحميل الخدمات...' : 'Loading services...'}
              </div>
            ) : error ? (
              <div className={styles.services_error}>
                <i className="fas fa-exclamation-triangle"></i>
                {isRTL ? 'خطأ في تحميل الخدمات' : 'Error loading services'}
              </div>
            ) : (
              <ul className={styles.services_list}>
                {pages && pages.slice(0, 6).map((service, index) => (
                  <li key={service.id}>
                    <Link href={`/service-detail/${service.documentId || service.id}`} className={styles.service_link}>
                      {service.icons && service.icons[0] ? (
                        <i className={`fas ${service.icons[0].icon}`}></i>
                      ) : (
                        <i className="fas fa-stethoscope"></i>
                      )}
                      {service.title}
                    </Link>
                  </li>
                ))}
                {(!pages || pages.length === 0) && (
                  <>
                    <li>
                      <Link href="/services/general-checkup" className={styles.service_link}>
                        <i className="fas fa-stethoscope"></i>
                        {translate('footer.services.generalCheckup', locale)}
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/surgery" className={styles.service_link}>
                        <i className="fas fa-cut"></i>
                        {translate('footer.services.surgery', locale)}
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/emergency" className={styles.service_link}>
                        <i className="fas fa-ambulance"></i>
                        {translate('footer.services.emergency', locale)}
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/vaccination" className={styles.service_link}>
                        <i className="fas fa-syringe"></i>
                        {translate('footer.services.vaccination', locale)}
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/dental" className={styles.service_link}>
                        <i className="fas fa-tooth"></i>
                        {translate('footer.services.dental', locale)}
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/grooming" className={styles.service_link}>
                        <i className="fas fa-cut"></i>
                        {translate('footer.services.grooming', locale)}
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>

          {/* Contact Information Column */}
          <div className={styles.footer_contact_section}>
            <h3 className={styles.section_title}>{translate('footer.contact.title', locale)}</h3>
            <ul className={styles.contact_list}>
              <li>
                <div className={styles.icon_wrapper}>
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className={styles.contact_info}>
                  <span className={styles.label}>{translate('footer.contact.call', locale)}</span>
                  <a href="tel:+966920011626" className={`${styles.contact_link} ${styles.phone_number}`}>+966 9200 11 626</a>
                </div>
              </li>
              <li>
                <div className={styles.icon_wrapper}>
                  <i className="fas fa-ambulance"></i>
                </div>
                <div className={styles.contact_info}>
                  <span className={styles.label}>{translate('footer.contact.emergency', locale)}</span>
                  <a href="tel:+966920011626" className={`${styles.contact_link} ${styles.phone_number}`}>+966 9200 11 626</a>
                  {/* <a href="tel:+966504045640" className={styles.contact_link}>+966 50 404 5640</a> */}
                </div>
              </li>
              <li>
                <div className={styles.icon_wrapper}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div className={styles.contact_info}>
                  <span className={styles.label}>{translate('footer.contact.email', locale)}</span>
                  <a href="mailto:info@elitevetksa.com" className={styles.contact_link}>info@elitevetksa.com</a>
                </div>
              </li>
              <li>
                <div className={styles.icon_wrapper}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className={styles.contact_info}>
                  <span className={styles.label}>{translate('footer.contact.address', locale)}</span>
                  <a
                    href="https://www.google.com/maps?q=Qurtubah%20gate,%20Al%20Thoumamah%20Rd,%20Qurtubah,%20Riyadh%2013248"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.address} ${styles.contact_link}`}
                  >
                    Qurtubah gate, Al Thoumamah Rd, Qurtubah, Riyadh 13248
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Certifications and Accreditations Column */}
          {/* <div className={styles.footer_certifications_section}>
            <h3 className={styles.section_title}>{translate('footer.certifications.title', locale)}</h3>
            <div className={styles.certifications_grid}>
              <div className={styles.certification_item}>
                <div className={styles.cert_icon}>
                  <i className="fas fa-certificate"></i>
                </div>
                <span className={styles.cert_text}>{translate('footer.certifications.veterinaryBoard', locale)}</span>
              </div>
              <div className={styles.certification_item}>
                <div className={styles.cert_icon}>
                  <i className="fas fa-award"></i>
                </div>
                <span className={styles.cert_text}>{translate('footer.certifications.animalWelfare', locale)}</span>
              </div>
              <div className={styles.certification_item}>
                <div className={styles.cert_icon}>
                  <i className="fas fa-shield-alt"></i>
                </div>
                <span className={styles.cert_text}>{translate('footer.certifications.iso9001', locale)}</span>
              </div>
              <div className={styles.certification_item}>
                <div className={styles.cert_icon}>
                  <i className="fas fa-star"></i>
                </div>
                <span className={styles.cert_text}>{translate('footer.certifications.excellence', locale)}</span>
              </div>
            </div>
            <div className={styles.footer_wave_decoration}>
              <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
                <path d="M0 10C20 5, 30 15, 50 10C70 5, 80 15, 100 10" stroke="#FFD700" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div> */}

          {/* Working Hours and Social Media Column */}
          <div className={styles.footer_social_section}>
            <h3 className={styles.section_title}>{translate('footer.social.title', locale)}</h3>
            <div className={styles.social_icons}>
              <a href="https://www.facebook.com/EliteVetKsa/?locale=ar_AR" className={styles.social_icon} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://x.com/elitevetksa" className={styles.social_icon} aria-label="X" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-x-twitter"></i>
              </a>
              <a href="https://www.instagram.com/elitevetsa/" className={styles.social_icon} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.tiktok.com/@elitevetksa" className={styles.social_icon} aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="https://www.snapchat.com/@elitevetksa" className={styles.social_icon} aria-label="Snapchat" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-snapchat-ghost"></i>
              </a>
            </div>
            <div className={styles.footer_wave_decoration}>
              <svg width="100" height="20" viewBox="0 0 100 20" fill="none">
                <path d="M0 10C20 5, 30 15, 50 10C70 5, 80 15, 100 10" stroke="#FFD700" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className={styles.working_hours}>
              <h3 className={styles.section_title}>{translate('footer.workingHours.title', locale)}</h3>
              <p className={styles.hours}>{translate('footer.workingHours.hours', locale)}</p>
              <p className={styles.emergency_service}>{translate('footer.workingHours.emergency', locale)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.footer_decorations}>
        {/* Paw Prints */}
        <div className={`${styles.animal_print} ${styles.cat_paw_1}`}><i className="fas fa-paw"></i></div>
        <div className={`${styles.animal_print} ${styles.cat_paw_2}`}><i className="fas fa-paw"></i></div>
        <div className={`${styles.animal_print} ${styles.cat_paw_3}`}><i className="fas fa-paw"></i></div>
        <div className={`${styles.animal_print} ${styles.dog_paw_1}`}><i className="fas fa-paw"></i></div>
        <div className={`${styles.animal_print} ${styles.dog_paw_2}`}><i className="fas fa-paw"></i></div>
        <div className={`${styles.animal_print} ${styles.dog_paw_3}`}><i className="fas fa-paw"></i></div>

        {/* Birds */}
        <div className={`${styles.animal_print} ${styles.bird_1}`}><i className="fas fa-dove"></i></div>
        <div className={`${styles.animal_print} ${styles.bird_2}`}><i className="fas fa-dove"></i></div>

        {/* Fish */}
        <div className={`${styles.animal_print} ${styles.fish_1}`}><i className="fas fa-fish"></i></div>
        <div className={`${styles.animal_print} ${styles.fish_2}`}><i className="fas fa-fish"></i></div>

        {/* Other Animals */}
        <div className={`${styles.animal_print} ${styles.rabbit}`}><i className="fas fa-rabbit"></i></div>
        <div className={`${styles.animal_print} ${styles.turtle}`}><i className="fas fa-turtle"></i></div>
      </div>
    </footer>
  );
};

export default Footer;
