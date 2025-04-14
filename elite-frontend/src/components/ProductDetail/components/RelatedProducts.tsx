import React from 'react';
import Link from 'next/link';
// @ts-ignore
import styles from '../styles/RelatedProducts.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faCartPlus, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductDetailProps } from '../ProductDetail';

interface RelatedProductsProps {
  products: ProductDetailProps['product'][];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  // Renderizar estrellas para la calificación
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Estrellas llenas
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon 
          key={`full-${i}`} 
          icon={faStar} 
          className={styles.starIcon} 
        />
      );
    }
    
    // Media estrella si es necesario
    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon 
          key="half" 
          icon={faStarHalfAlt} 
          className={styles.starIcon} 
        />
      );
    }
    
    // Estrellas vacías para completar 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon 
          key={`empty-${i}`} 
          icon={faStar} 
          className={styles.emptyStarIcon} 
        />
      );
    }
    
    return stars;
  };
  
  // Si no hay productos relacionados
  if (products.length === 0) {
    return null;
  }
  
  return (
    <div className={styles.relatedProducts}>
      <h2 className={styles.sectionTitle}>Related Products</h2>
      
      <div className={styles.productsGrid}>
        {products.map(product => (
          <div key={product.id} className={styles.productCard}>
            <Link href={`/products/${product.id}`} className={styles.productLink}>
              <div className={styles.imageContainer}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.productImage}
                />
                
                {/* Badges */}
                <div className={styles.badgesContainer}>
                  {product.isNew && (
                    <span className={`${styles.badge} ${styles.badgeNew}`}>New</span>
                  )}
                  {product.isBestSeller && (
                    <span className={`${styles.badge} ${styles.badgeBestseller}`}>Best Seller</span>
                  )}
                  {product.isSale && (
                    <span className={`${styles.badge} ${styles.badgeSale}`}>Sale</span>
                  )}
                </div>
                
                {/* Quick actions */}
                <div className={styles.quickActions}>
                  <button className={styles.actionButton}>
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button className={styles.actionButton}>
                    <FontAwesomeIcon icon={faCartPlus} />
                  </button>
                </div>
              </div>
              
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                
                <div className={styles.productRating}>
                  <div className={styles.stars}>
                    {renderStars(product.rating)}
                  </div>
                  <span className={styles.reviewCount}>({product.reviewCount})</span>
                </div>
                
                <div className={styles.productPrice}>
                  {product.salePrice ? (
                    <>
                      <span className={styles.salePrice}>${product.salePrice.toFixed(2)}</span>
                      <span className={styles.regularPrice}>${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
