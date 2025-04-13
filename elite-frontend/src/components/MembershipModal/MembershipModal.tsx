import React, { useEffect, useRef } from 'react';
import styles from './MembershipModal.module.css';
import { MembershipImage, MembershipBenefits, ModalFooter } from './components';

interface MembershipModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  planType: 'dog' | 'cat';
}

const DogMembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onRequestClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
      title: 'Monthly Check-ups',
      description: 'Keep your dog in optimal health with a free monthly examination.'
    },
    {
      icon: 'fa-heart',
      title: 'Therapeutic Services',
      description: 'Receive up to 400 SAR per month in complementary therapeutic services. Additional costs discounted by 30%.'
    },
    {
      icon: 'fa-stethoscope',
      title: 'Diagnostic & Veterinary Services',
      description: '30% discount on a wide range of diagnostic tests and veterinary services.'
    },
    {
      icon: 'fa-home',
      title: 'Boarding Services',
      description: '30% discount on regular and therapeutic boarding services.'
    },
    {
      icon: 'fa-tooth',
      title: 'Dental & Surgical Care',
      description: '30% discount on surgical procedures and dental care.'
    },
    {
      icon: 'fa-cut',
      title: 'Grooming Services',
      description: '30% discount on grooming services with priority access.'
    },
    {
      icon: 'fa-shopping-bag',
      title: 'Food & Accessories',
      description: '10% discount on all food and accessories purchases.'
    },
    {
      icon: 'fa-crown',
      title: 'Luxury Benefits',
      description: 'VIP treatment with exclusive waiting areas and complimentary treats.'
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
              altText="Dog Membership"
              price="5,999 SAR"
              duration="/month"
            />
            <MembershipBenefits 
              title="Dog Membership"
              description="Our Premium Dog Membership offers unparalleled benefits to ensure your canine companion receives the highest quality care."
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
  const modalRef = useRef<HTMLDivElement>(null);

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
      title: 'Monthly Check-ups',
      description: 'Keep your cat in optimal health with a free monthly examination.'
    },
    {
      icon: 'fa-heart',
      title: 'Therapeutic Services',
      description: 'Receive up to 300 SAR per month in complementary therapeutic services. Additional costs discounted by 30%.'
    },
    {
      icon: 'fa-stethoscope',
      title: 'Diagnostic Tests',
      description: '30% discount on all diagnostic tests for your feline companion.'
    },
    {
      icon: 'fa-home',
      title: 'Priority Appointments',
      description: 'Get priority scheduling for all appointments and services.'
    },
    {
      icon: 'fa-tooth',
      title: 'Dental Care',
      description: '30% discount on dental procedures and cleaning services.'
    },
    {
      icon: 'fa-cut',
      title: 'Grooming Services',
      description: '30% discount on grooming services with priority access.'
    },
    {
      icon: 'fa-coffee',
      title: 'Exclusive Café Perks',
      description: 'Complimentary treats and beverages at our pet-friendly café.'
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
              altText="Cat Membership"
              price="4,999 SAR"
              duration="/month"
            />
            <MembershipBenefits 
              title="Cat Membership"
              description="Our Premium Cat Membership offers comprehensive care and benefits to ensure your feline friend stays healthy and happy."
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
