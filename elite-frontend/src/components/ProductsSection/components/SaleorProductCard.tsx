import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/SaleorCartContext';
import styles from '../styles/EnhancedProductCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faShoppingCart, faStar, faStarHalfAlt, 
  faEye, faCheck, faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '@/context/LanguageContext';
import { Product } from '@/hooks/useSaleorProducts';

interface SaleorProductCardProps {
  product: Product;
  viewType?: string;
}

const SaleorProductCard: React.FC<SaleorProductCardProps> = ({ product, viewType = 'grid' }) => {
  const { t, isRTL } = useLanguage();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Format price function
  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Get product price
  const getProductPrice = () => {
    if (product.variants && product.variants.length > 0 && product.variants[0].pricing?.price) {
      return {
        current: product.variants[0].pricing.price.gross,
        undiscounted: product.variants[0].pricing.priceUndiscounted?.gross,
        discount: product.variants[0].pricing.discount?.gross
      };
    }
    if (product.pricing?.priceRange?.start) {
      return {
        current: product.pricing.priceRange.start.gross,
        undiscounted: product.pricing?.priceRange?.start?.gross,
        discount: null
      };
    }
    return {
      current: { amount: 0, currency: 'USD' },
      undiscounted: null,
      discount: null
    };
  };

  const price = getProductPrice();
  const hasDiscount = price.undiscounted && price.current.amount < price.undiscounted.amount;
  const discountPercentage = hasDiscount 
    ? Math.round(((price.undiscounted.amount - price.current.amount) / price.undiscounted.amount) * 100) 
    : 0;
  const productImage = product.thumbnail?.url || product.images?.[0]?.url || '/placeholder-product.jpg';

  // Render stars for rating (mock for now)
  const renderStars = (rating: number = 4) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon 
          key={`full-${i}`} 
          icon={faStar} 
          className={styles.starIcon} 
        />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon 
          key="half" 
          icon={faStarHalfAlt} 
          className={styles.starIcon} 
        />
      );
    }
    
    // Empty stars
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      stars.push(
        <FontAwesomeIcon 
          key={`empty-${i}`} 
          icon={faStar} 
          className={`${styles.starIcon} ${styles.emptyStar}`} 
        />
      );
    }
    
    return stars;
  };

  // Handle add to cart
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!product.isAvailableForPurchase || !product.variants || product.variants.length === 0) {
      return;
    }

    setIsLoading(true);
    
    try {
      await addToCart(product.variants[0].id, 1);
      
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    } catch (err) {
      console.error('Error adding to cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle wishlist toggle
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  // Check if product is new (created in last 30 days)
  const isNew = product.created 
    ? new Date(product.created) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    : false;

  return (
    <div className={`${styles.productCard} ${viewType === 'list' ? styles.listView : ''}`}>
      <div className={styles.productImageContainer}>
        <Link href={`/products/${product.slug}`}>
          <img 
            src={productImage} 
            alt={product.name}
            className={styles.productImage}
            onError={(e) => {
              e.currentTarget.src = '/placeholder-product.jpg';
            }}
          />
        </Link>
        
        {/* Product badges */}
        <div className={styles.productBadges}>
          {!product.isAvailableForPurchase && (
            <span className={`${styles.badge} ${styles.outOfStock}`}>
              {t('products.badges.outOfStock') || 'غير متوفر'}
            </span>
          )}
          {isNew && (
            <span className={`${styles.badge} ${styles.new}`}>
              {t('products.badges.new') || 'جديد'}
            </span>
          )}
          {hasDiscount && discountPercentage >= 5 && (
            <span className={`${styles.badge} ${styles.sale}`}>
              {discountPercentage}% خصم
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>

        {/* Quick view overlay */}
        <div className={styles.productOverlay}>
          <div className={styles.quickViewActions}>
            <button
              className={`${styles.quickViewBtn} ${!product.isAvailableForPurchase ? styles.disabled : ''} ${addedToCart ? styles.added : ''}`}
              onClick={handleAddToCart}
              disabled={!product.isAvailableForPurchase || isLoading}
              aria-label="إضافة للسلة"
            >
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : addedToCart ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faShoppingCart} />
              )}
              <span>
                {isLoading ? 'جاري الإضافة...' : addedToCart ? 'تمت الإضافة' : 'أضف للسلة'}
              </span>
            </button>
            
            <Link
              href={`/products/${product.slug}`}
              className={styles.quickViewBtn}
              aria-label="عرض التفاصيل"
            >
              <FontAwesomeIcon icon={faEye} />
              <span>{t('products.actions.quickView') || 'عرض سريع'}</span>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.productInfo}>
        {/* Category */}
        {product.category && (
          <span className={styles.productCategory}>
            {product.category.name}
          </span>
        )}

        {/* Product name */}
        <h3 className={styles.productName}>
          <Link href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Product description */}
        {product.description && (
          <p className={styles.productDescription}>
            {product.description.length > 100 
              ? `${product.description.substring(0, 100)}...`
              : product.description
            }
          </p>
        )}

        {/* Rating */}
        <div className={styles.productRating}>
          <div className={styles.ratingStars}>
            {renderStars(4)}
          </div>
          <span className={styles.reviewCount}>
            (25 {t('products.reviews') || 'تقييم'})
          </span>
        </div>

        {/* Price */}
        <div className={styles.productPrice}>
          {hasDiscount && price.undiscounted && (
            <span className={styles.oldPrice}>
              {formatPrice(price.undiscounted.amount, price.undiscounted.currency)}
            </span>
          )}
          <span className={styles.currentPrice}>
            {formatPrice(price.current.amount, price.current.currency)}
          </span>
          {hasDiscount && (
            <span className={styles.discountPercentage}>
              {discountPercentage}% خصم
            </span>
          )}
        </div>

        {/* Collections tags */}
        {product.collections && product.collections.length > 0 && (
          <div className={styles.productTags}>
            {product.collections.slice(0, 2).map((collection) => (
              <span key={collection.id} className={styles.tag}>
                {collection.name}
              </span>
            ))}
            {product.collections.length > 2 && (
              <span className={styles.tag}>
                +{product.collections.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Add to cart button (bottom) */}
        <div className={styles.addToCartContainer}>
          <button
            className={`${styles.addToCartBtn} ${!product.isAvailableForPurchase ? styles.disabled : ''} ${addedToCart ? styles.added : ''}`}
            onClick={handleAddToCart}
            disabled={!product.isAvailableForPurchase || isLoading}
          >
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : addedToCart ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <FontAwesomeIcon icon={faShoppingCart} />
            )}
            <span>
              {isLoading 
                ? 'جاري الإضافة...' 
                : addedToCart 
                  ? 'تمت الإضافة' 
                  : (t('products.actions.addToCart') || 'أضف للسلة')
              }
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleorProductCard;