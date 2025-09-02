import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './WhatsAppButton.module.css';

const WhatsAppButton = ({ position = 'bottom-right' }) => {
  const { t, isRTL } = useLanguage();
  const [showBubble, setShowBubble] = useState(false);
  
  // WhatsApp business number - replace with actual business number
  const whatsappNumber = '+966501234567'; // Replace with actual business WhatsApp number
  const message = encodeURIComponent(
    t('whatsapp.defaultMessage') || 
    'مرحباً! أود الاستفسار عن خدماتكم البيطرية.'
  );
  
  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setShowBubble(false);
  };

  const toggleBubble = () => {
    setShowBubble(!showBubble);
  };

  return (
    <div className={`${styles.whatsappContainer} ${styles[position]}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {showBubble && (
        <div className={styles.chatBubble}>
          <div className={styles.bubbleHeader}>
            <div className={styles.avatar}>
              <i className="fa-solid fa-user-doctor"></i>
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.name}>Elite Vet</div>
              <div className={styles.status}>
                <div className={styles.onlineIndicator}></div>
                {t('whatsapp.online') || 'متاح الآن'}
              </div>
            </div>
            <button className={styles.closeButton} onClick={() => setShowBubble(false)}>
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
          <div className={styles.bubbleContent}>
            <p>{t('whatsapp.welcomeMessage') || 'مرحباً! كيف يمكننا مساعدتك اليوم؟'}</p>
          </div>
          <button className={styles.chatButton} onClick={handleWhatsAppClick}>
            <i className="fa-brands fa-whatsapp"></i>
            {t('whatsapp.startChat') || 'ابدأ المحادثة'}
          </button>
        </div>
      )}
      
      <button className={styles.whatsappButton} onClick={toggleBubble}>
        <div className={styles.whatsappIcon}>
          <i className="fa-brands fa-whatsapp"></i>
        </div>
        {!showBubble && (
          <span className={styles.buttonText}>
            {t('whatsapp.contactUs') || 'تواصل معنا'}
          </span>
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
