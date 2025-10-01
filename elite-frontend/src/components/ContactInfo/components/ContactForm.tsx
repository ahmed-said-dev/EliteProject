import React from 'react';
import styles from './ContactForm.module.css';
import { useLanguage } from '@/context/LanguageContext';

const ContactForm: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  return (
    <div className={styles.formWrapper}>
      <div 
        className={styles.formBody}
        style={{ 
          background: 'linear-gradient(135deg, #7c3aed, #a855f7, #8b5cf6, #6d28d9)',
          backgroundSize: '400% 400%',
          backgroundPosition: 'center',
          animation: 'gradientAnimation 10s ease infinite'
        }}
      >
        <div className={styles.sectionHead}>
          <h2 className={styles.title}>{t('contact.form.title')}</h2>
        </div>
        
        <form className={styles.dzForm} dir={dir}>
          <input 
            className={styles.formControl} 
            name="dzToDo" 
            type="hidden" 
            defaultValue="Contact" 
          />
          <input 
            className={styles.formControl} 
            name="reCaptchaEnable" 
            type="hidden" 
            defaultValue="0" 
          />
          
          <div className="dzFormMsg"></div>
          
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <div className={styles.formFloating}>
                <input
                  id="inputName"
                  className={styles.formControl}
                  name="dzName"
                  type="text"
                  // placeholder="Name"
                />
                <label htmlFor="inputName">{t('contact.form.name')}</label>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.formFloating}>
                <input
                  id="inputPhoneNumber"
                  className={styles.formControl}
                  name="dzPhoneNumber"
                  type="text"
                />
                <label htmlFor="inputPhoneNumber">{t('contact.form.phone')}</label>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.formFloating}>
                <input
                  id="inputEmail"
                  className={styles.formControl}
                  name="dzEmail"
                  type="email"
                  // placeholder="Email"
                />
                <label htmlFor="inputEmail">{t('contact.form.email')}</label>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <div className={styles.formFloating}>
                <textarea
                  id="inputMessage"
                  className={styles.formControl}
                  name="dzMessage"
                  rows={6}
                  // placeholder="Message"
                />
                <label htmlFor="inputMessage">{t('contact.form.message')}</label>
              </div>
            </div>
            
            <div className={styles.formSubmit}>
              <button
                className={`${styles.submitButton} ${isRTL ? 'rtl-button' : ''}`}
                name="submit"
                type="submit"
                value="submit"
                style={isRTL ? { flexDirection: 'row-reverse' } : {}}
              >
                {t('contact.form.submit')}
                {!isRTL && (
                  <span className={styles.rightIcon}>
                    <i className="feather icon-arrow-right" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
