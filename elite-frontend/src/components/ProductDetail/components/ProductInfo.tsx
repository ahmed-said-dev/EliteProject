import React from 'react';
// @ts-ignore
import styles from '../styles/ProductInfo.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faStarHalfAlt, 
  faHeart, 
  faCartPlus, 
  faShareAlt,
  faCheck,
  faMinus,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { ProductDetailProps } from '../ProductDetail';

interface ProductInfoProps {
  product: ProductDetailProps['product'];
  quantity: number;
  isFavorite: boolean;
  addedToCart: boolean;
  discountPercentage: number;
  handleQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  handleFavoriteClick: () => void;
  handleAddToCart: () => void;
  handleBuyNow: () => void;
  scrollToReviews: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  quantity,
  isFavorite,
  addedToCart,
  discountPercentage,
  handleQuantityChange,
  incrementQuantity,
  decrementQuantity,
  handleFavoriteClick,
  handleAddToCart,
  handleBuyNow,
  scrollToReviews
}) => {
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

  // Compartir producto en redes sociales
  const shareProduct = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this awesome product: ${product.name}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'pinterest':
        window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ': ' + url)}`, '_blank');
        break;
      default:
        // Copiar al portapapeles
        navigator.clipboard.writeText(url).then(() => {
          alert('Product link copied to clipboard!');
        });
    }
  };
  
  return (
    <div className={styles.productInfo}>
      {/* Badges */}
      <div className={styles.productBadges}>
        {product.isNew && (
          <span className={`${styles.badge} ${styles.badgeNew}`}>New</span>
        )}
        {product.isBestSeller && (
          <span className={`${styles.badge} ${styles.badgeBestseller}`}>Best Seller</span>
        )}
        {product.isSale && (
          <span className={`${styles.badge} ${styles.badgeSale}`}>
            {discountPercentage}% Off
          </span>
        )}
      </div>
      
      {/* Nombre del producto */}
      <h1 className={styles.productName}>{product.name}</h1>
      
      {/* Calificación */}
      <div className={styles.productRating}>
        <div className={styles.stars}>
          {renderStars(product.rating)}
        </div>
        <button 
          className={styles.reviewsLink}
          onClick={scrollToReviews}
        >
          {product.reviewCount} Reviews
        </button>
      </div>
      
      {/* Marca */}
      <div className={styles.productBrand}>
        <span className={styles.brandLabel}>Brand:</span>
        <span className={styles.brandName}>{product.brand}</span>
      </div>
      
      {/* Precio */}
      <div className={styles.productPrice}>
        {product.salePrice ? (
          <>
            <span className={styles.salePrice}>${product.salePrice.toFixed(2)}</span>
            <span className={styles.regularPrice}>${product.price.toFixed(2)}</span>
            <span className={styles.saveAmount}>
              You save: ${(product.price - product.salePrice).toFixed(2)} ({discountPercentage}%)
            </span>
          </>
        ) : (
          <span className={styles.price}>${product.price.toFixed(2)}</span>
        )}
      </div>
      
      {/* Disponibilidad */}
      <div className={styles.productAvailability}>
        <span className={styles.availabilityLabel}>Availability:</span>
        {product.inStock ? (
          <span className={styles.inStock}>
            <FontAwesomeIcon icon={faCheck} className={styles.inStockIcon} />
            In Stock
          </span>
        ) : (
          <span className={styles.outOfStock}>Out of Stock</span>
        )}
      </div>
      
      {/* Descripción breve */}
      <div className={styles.shortDescription}>
        <p>{product.description.substring(0, 150)}...</p>
      </div>
      
      {/* Línea separadora */}
      <div className={styles.divider}></div>
      
      {/* Acciones de producto */}
      <div className={styles.productActions}>
        {/* Selector de cantidad */}
        <div className={styles.quantitySelector}>
          <span className={styles.quantityLabel}>Quantity:</span>
          <div className={styles.quantityControls}>
            <button 
              className={styles.quantityBtn}
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={handleQuantityChange}
              className={styles.quantityInput}
            />
            <button 
              className={styles.quantityBtn}
              onClick={incrementQuantity}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className={styles.actionButtons}>
          <button 
            className={`${styles.addToCartBtn} ${addedToCart ? styles.added : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <FontAwesomeIcon icon={faCartPlus} />
            <span>{addedToCart ? 'Added to Cart' : 'Add to Cart'}</span>
          </button>
          
          <button 
            className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
            onClick={handleFavoriteClick}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
        
        {/* Botón de compra directa */}
        <button 
          className={styles.buyNowBtn}
          onClick={handleBuyNow}
          disabled={!product.inStock}
        >
          Buy Now
        </button>
      </div>
      
      {/* Compartir en redes sociales */}
      <div className={styles.shareProduct}>
        <span className={styles.shareLabel}>Share:</span>
        <div className={styles.socialButtons}>
          <button 
            className={`${styles.socialBtn} ${styles.facebook}`}
            onClick={() => shareProduct('facebook')}
          >
            <i className="fab fa-facebook-f"></i>
          </button>
          <button 
            className={`${styles.socialBtn} ${styles.twitter}`}
            onClick={() => shareProduct('twitter')}
          >
            <i className="fab fa-twitter"></i>
          </button>
          <button 
            className={`${styles.socialBtn} ${styles.pinterest}`}
            onClick={() => shareProduct('pinterest')}
          >
            <i className="fab fa-pinterest-p"></i>
          </button>
          <button 
            className={`${styles.socialBtn} ${styles.whatsapp}`}
            onClick={() => shareProduct('whatsapp')}
          >
            <i className="fab fa-whatsapp"></i>
          </button>
          <button 
            className={`${styles.socialBtn} ${styles.link}`}
            onClick={() => shareProduct('link')}
          >
            <i className="fas fa-link"></i>
          </button>
        </div>
      </div>
      
      {/* Categorías */}
      <div className={styles.productCategories}>
        <div className={styles.categoryItem}>
          <span className={styles.categoryLabel}>Pet:</span>
          <span className={styles.categoryValue}>{product.petType}</span>
        </div>
        <div className={styles.categoryItem}>
          <span className={styles.categoryLabel}>Category:</span>
          <span className={styles.categoryValue}>{product.productType}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
