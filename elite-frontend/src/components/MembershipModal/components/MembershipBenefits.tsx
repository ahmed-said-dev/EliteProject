import React from 'react';
import styles from './MembershipBenefits.module.css';
import BenefitItem from './BenefitItem';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface MembershipBenefitsProps {
  title: string;
  description: string;
  benefits: Benefit[];
}

const MembershipBenefits: React.FC<MembershipBenefitsProps> = ({
  title,
  description,
  benefits
}) => {
  return (
    <div className={styles.detailsColumn}>
      <h2 className={styles.modalTitle}>{title}</h2>
      <p className={styles.leadText}>{description}</p>
      <h4 className={styles.benefitsTitle}>Membership Includes:</h4>
      <div className={styles.benefitsContainer}>
        {benefits.map((benefit, index) => (
          <BenefitItem
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </div>
  );
};

export default MembershipBenefits;
