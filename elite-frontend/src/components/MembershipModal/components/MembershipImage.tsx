import React from 'react';
import styles from './MembershipImage.module.css';

interface MembershipImageProps {
  imageSrc: string;
  altText: string;
  price: string;
  duration: string;
}

const MembershipImage: React.FC<MembershipImageProps> = ({ 
  imageSrc, 
  altText, 
  price, 
  duration 
}) => {
  return (
    <div className={styles.imageColumn}>
      <img
        className={styles.membershipImage}
        alt={altText}
        src={imageSrc}
      />
      <div className={styles.priceTag}>
        <h3 className={styles.priceAmount}>
          {price}
        </h3>
        <span className={styles.priceDuration}>
          {duration}
        </span>
      </div>
    </div>
  );
};

export default MembershipImage;
