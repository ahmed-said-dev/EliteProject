import React, { useEffect, useRef } from 'react';
import styles from './MembershipModal.module.css';
import { MembershipImage, MembershipBenefits, ModalFooter } from './components';
import { useLanguage } from '@/context/LanguageContext';

interface MembershipModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  planType: 'dog' | 'cat';
}

const DogMembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onRequestClose }) => {
  const { t, isRTL } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const dir = isRTL ? 'rtl' : 'ltr';

  useEffect(() => {
    // Handle ESC key press
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    // Handle outside click
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onRequestClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('mousedown', handleOutsideClick);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = '';
    };
  }, [isOpen, onRequestClose]);

  if (!isOpen) return null;

  // Dog plan benefits
  const dogBenefits = [
    {
      icon: 'fa-calendar-check',
      title: t('dogMembership.benefits.checkups.title'),
      description: t('dogMembership.benefits.checkups.description')
    },
    {
      icon: 'fa-heart',
      title: t('dogMembership.benefits.therapeutic.title'),
      description: t('dogMembership.benefits.therapeutic.description')
    },
    {
      icon: 'fa-stethoscope',
      title: t('dogMembership.benefits.diagnostic.title'),
      description: t('dogMembership.benefits.diagnostic.description')
    },
    {
      icon: 'fa-home',
      title: t('dogMembership.benefits.boarding.title'),
      description: t('dogMembership.benefits.boarding.description')
    },
    {
      icon: 'fa-tooth',
      title: t('dogMembership.benefits.dental.title'),
      description: t('dogMembership.benefits.dental.description')
    },
    {
      icon: 'fa-cut',
      title: t('dogMembership.benefits.grooming.title'),
      description: t('dogMembership.benefits.grooming.description')
    },
    {
      icon: 'fa-shopping-bag',
      title: t('dogMembership.benefits.food.title'),
      description: t('dogMembership.benefits.food.description')
    },
    {
      icon: 'fa-crown',
      title: t('dogMembership.benefits.luxury.title'),
      description: t('dogMembership.benefits.luxury.description')
    }
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <button className={styles.closeButton} onClick={onRequestClose}>×</button>
        <div className={styles.modalBody}>
          <div className={styles.row}>
            <MembershipImage 
              imageSrc="https://i.pinimg.com/736x/20/0d/9a/200d9ab2ab9665053505af2184d19381.jpg"
              altText={t('dogMembership.image.alt')}
              price={t('dogMembership.price')}
              duration={t('dogMembership.duration')}
            />
            <MembershipBenefits 
              title={t('dogMembership.title')}
              description={t('dogMembership.description')}
              benefits={dogBenefits}
            />
          </div>
          <ModalFooter 
            onClose={onRequestClose}
            applyLink="#dog-form"
          />
        </div>
      </div>
    </div>
  );
};

const CatMembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onRequestClose }) => {
  const { t, isRTL } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const dir = isRTL ? 'rtl' : 'ltr';

  useEffect(() => {
    // Handle ESC key press
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    // Handle outside click
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onRequestClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('mousedown', handleOutsideClick);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = '';
    };
  }, [isOpen, onRequestClose]);

  if (!isOpen) return null;

  // Cat plan benefits
  const catBenefits = [
    {
      icon: 'fa-calendar-check',
      title: t('catMembership.benefits.checkups.title'),
      description: t('catMembership.benefits.checkups.description')
    },
    {
      icon: 'fa-heart',
      title: t('catMembership.benefits.therapeutic.title'),
      description: t('catMembership.benefits.therapeutic.description')
    },
    {
      icon: 'fa-stethoscope',
      title: t('catMembership.benefits.diagnostic.title'),
      description: t('catMembership.benefits.diagnostic.description')
    },
    {
      icon: 'fa-home',
      title: t('catMembership.benefits.priority.title'),
      description: t('catMembership.benefits.priority.description')
    },
    {
      icon: 'fa-tooth',
      title: t('catMembership.benefits.dental.title'),
      description: t('catMembership.benefits.dental.description')
    },
    {
      icon: 'fa-cut',
      title: t('catMembership.benefits.grooming.title'),
      description: t('catMembership.benefits.grooming.description')
    },
    {
      icon: 'fa-coffee',
      title: t('catMembership.benefits.cafe.title'),
      description: t('catMembership.benefits.cafe.description')
    }
  ];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <button className={styles.closeButton} onClick={onRequestClose}>×</button>
        <div className={styles.modalBody}>
          <div className={styles.row}>
            <MembershipImage 
              imageSrc="https://i.pinimg.com/736x/f4/5c/33/f45c33aaad76774a4a8fe15b2391e839.jpg"
              altText={t('catMembership.image.alt')}
              price={t('catMembership.price')}
              duration={t('catMembership.duration')}
            />
            <MembershipBenefits 
              title={t('catMembership.title')}
              description={t('catMembership.description')}
              benefits={catBenefits}
            />
          </div>
          <ModalFooter 
            onClose={onRequestClose}
            applyLink="#cat-form"
          />
        </div>
      </div>
    </div>
  );
};

const MembershipModal: React.FC<MembershipModalProps> = (props) => {
  if (props.planType === 'dog') {
    return <DogMembershipModal {...props} />;
  } else {
    return <CatMembershipModal {...props} />;
  }
};

export default MembershipModal;
