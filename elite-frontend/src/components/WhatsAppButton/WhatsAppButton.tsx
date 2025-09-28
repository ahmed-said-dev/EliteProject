import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './WhatsAppButton.module.css';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left';
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '+966920011626', // Default Elite Vet KSA number
  message,
  position = 'bottom-right'
}) => {
  const { t, language, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const [isExpanded, setIsExpanded] = useState(false);

  const defaultMessage = message || t('whatsapp.defaultMessage');
  const whatsappMessage = defaultMessage;
  
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.whatsappContainer} ${styles[position]}`} dir={dir}>
      {isExpanded && (
        <div className={styles.chatBubble}>
          <div className={styles.bubbleHeader}>
            <div className={styles.avatar}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.486" fill="currentColor"/>
              </svg>
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.name}>Elite Veterinary Care</div>
              <div className={styles.status}>
                <span className={styles.onlineIndicator}></span>
                {t('whatsapp.online')}
              </div>
            </div>
            <button 
              className={styles.closeButton}
              onClick={toggleExpanded}
              aria-label={t('whatsapp.close')}
            >
              ×
            </button>
          </div>
          <div className={styles.bubbleContent}>
            <p>{t('whatsapp.hello')}</p>
          </div>
          <button 
            className={styles.chatButton}
            onClick={handleClick}
          >
            {t('whatsapp.startChat')}
          </button>
        </div>
      )}
      
      <button
        className={styles.whatsappButton}
        onClick={isExpanded ? handleClick : toggleExpanded}
        aria-label={t('whatsapp.contactUs')}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none"
          className={styles.whatsappIcon}
        >
          <path 
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.486" 
            fill="currentColor"
          />
        </svg>
        {isExpanded && (
          <span className={styles.buttonText}>
            WhatsApp
          </span>
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
