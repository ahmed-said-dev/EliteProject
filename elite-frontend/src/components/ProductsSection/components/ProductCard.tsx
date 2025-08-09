import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/SaleorCartContext';
// @ts-ignore
import styles from '../styles/ProductCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faShoppingCart, faStar, faStarHalfAlt, 
  faEye, faCheck
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '@/context/LanguageContext';
// Usamos solo iconos de solid sin necesidad de importar free-regular

interface ProductProps {
  id: number;
  original_id?: string; // معرف المنتج الأصلي من API
  name: string;
  price: number;
  salePrice?: number;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  petType: string;
  productType: string;
  brand: string;
  inStock: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  soldCount: number;
  releaseDate: string;
}

interface ProductCardProps {
  product: ProductProps;
  viewType: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewType }) => {
  const { addToCart } = useCart();
  const { isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Calcular descuento si hay precio de oferta
  const discountPercentage = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : 0;
  
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
  
  // Manejar click en botón de favorito
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    // Aquí podría ir código para guardar en localStorage o enviar a API
  };
  
  // معالجة نقرة زر إضافة إلى السلة
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    console.log('Adding to cart:', product);
    
    try {
      // إضافة المنتج إلى السلة باستخدام السياق
      await addToCart(product, 1);
      
      // إظهار ملاحظة بصرية
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  // Manejar vista rápida
  const toggleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowQuickView(!showQuickView);
  };

  // Determinar si es una vista de lista o cuadrícula
  const isListView = viewType === 'list';
  
  return (
    <>
      <div 
        className={`${styles.productCard} ${isListView ? styles.listViewCard : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/products/${product.original_id || product.id}`} className={styles.productLink}>
          <div className={styles.imageContainer}>
            <img 
              src={product.image} 
              alt={t(`products.${product.id}.name`)}
              className={styles.productImage}
            />
            
            {/* Badges */}
            <div className={styles.badgesContainer}>
              {product.isNew && (
                <span className={`${styles.badge} ${styles.badgeNew}`}>{t('products.badges.new')}</span>
              )}
              {product.isBestSeller && (
                <span className={`${styles.badge} ${styles.badgeBestseller}`}>{t('products.badges.bestSeller')}</span>
              )}
              {product.isSale && (
                <span className={`${styles.badge} ${styles.badgeSale}`}>
                  -{discountPercentage}%
                </span>
              )}
            </div>
            
            {/* Botones de acciones que aparecen al hacer hover */}
            <div className={`${styles.productActions} ${isHovered ? styles.showActions : ''}`}>
              <button 
                className={styles.actionButton}
                onClick={toggleQuickView}
                title={t('products.actions.quickView')}
              >
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button 
                className={`${styles.actionButton} ${isFavorite ? styles.favoriteActive : ''}`}
                onClick={handleFavoriteClick}
                title={isFavorite ? t('products.actions.removeFromFavorites') : t('products.actions.addToFavorites')}
              >
                <FontAwesomeIcon icon={faHeart} className={isFavorite ? '' : styles.outlineIcon} />
              </button>
            </div>
          </div>
          
          <div className={styles.productInfo} dir={dir}>
            <div className={styles.productMeta}>
              <span className={styles.productCategory}>{t(`products.petTypes.${product.petType.toLowerCase()}`)}</span>
              <span className={styles.productDivider}>•</span>
              <span className={styles.productCategory}>{t(`products.productTypes.${product.productType.toLowerCase()}`)}</span>
            </div>
            
            <h3 className={styles.productName}>{product.name}</h3>
            
            <div className={styles.productRating}>
              <div className={styles.stars}>
                {renderStars(product.rating)}
              </div>
              <span className={styles.reviewCount}>({product.reviewCount})</span>
            </div>
            
            <div className={styles.productDescription}>
              {isListView ? (
                <p>{product.description}</p>
              ) : (
                <p>
                  {product.description && product.description.length > 80 
                    ? `${product.description.substring(0, 80)}...` 
                    : product.description
                  }
                </p>
              )}
            </div>
            
            <div className={styles.priceAndStock}>
              <div className={styles.productPrice}>
                {product.salePrice ? (
                  <>
                    <span className={styles.salePrice}>${((product.salePrice || 0) / 100).toFixed(2)}</span>
                    <span className={styles.regularPrice}>${((product.price || 0) / 100).toFixed(2)}</span>
                  </>
                ) : (
                  <span className={styles.price}>${((product.price || 0) / 100).toFixed(2)}</span>
                )}
              </div>
              
              <div className={styles.stockStatus}>
                {product.inStock ? (
                  <span className={styles.inStock}>
                    <FontAwesomeIcon icon={faCheck} /> In Stock
                  </span>
                ) : (
                  <span className={styles.outOfStock}>Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        </Link>
        
        <div className={styles.addToCartContainer}>
          <button 
            className={`${styles.addToCartBtn} ${!product.inStock ? styles.disabled : ''} ${addedToCart ? styles.added : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>{addedToCart ? 'Added!' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
      
      {/* Modal de vista rápida */}
      {showQuickView && (
        <div className={styles.quickViewOverlay} onClick={toggleQuickView}>
          <div className={styles.quickViewModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={toggleQuickView}>
              &times;
            </button>
            <div className={styles.quickViewContent}>
              <div className={styles.quickViewImage}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.quickViewInfo}>
                <h2 className={styles.quickViewTitle}>{product.name}</h2>
                
                <div className={styles.quickViewRating}>
                  <div className={styles.stars}>
                    {renderStars(product.rating)}
                  </div>
                  <span className={styles.reviewCount}>({product.reviewCount} reviews)</span>
                </div>
                
                <div className={styles.quickViewPrice}>
                  {product.salePrice ? (
                    <>
                      <span className={styles.salePrice}>${product.salePrice.toFixed(2)}</span>
                      <span className={styles.regularPrice}>${product.price.toFixed(2)}</span>
                      <span className={styles.discount}>({discountPercentage}% Off)</span>
                    </>
                  ) : (
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                  )}
                </div>
                
                <div className={styles.quickViewDescription}>
                  <p>{product.description}</p>
                </div>
                
                <div className={styles.productDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Brand:</span>
                    <span className={styles.detailValue}>{product.brand}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Pet Type:</span>
                    <span className={styles.detailValue}>{product.petType}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Category:</span>
                    <span className={styles.detailValue}>{product.productType}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Availability:</span>
                    {product.inStock ? (
                      <span className={styles.inStock}>In Stock</span>
                    ) : (
                      <span className={styles.outOfStock}>Out of Stock</span>
                    )}
                  </div>
                </div>
                
                <div className={styles.quickViewActions}>
                  <div className={styles.actionButtonWrapper}>
                    <button 
                      className={`${styles.quickViewAddToCart} ${addedToCart ? styles.added : ''}`}
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                    >
                      {!product.inStock ? (
                        <span>{t('products.status.outOfStock')}</span>
                      ) : addedToCart ? (
                        <>
                          <FontAwesomeIcon icon={faCheck} className={styles.checkIcon} />
                          <span>{t('products.actions.addedToCart')}</span>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faShoppingCart} className={styles.cartIcon} />
                          <span>{t('products.actions.addToCart')}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <button 
                    className={`${styles.quickViewFavorite} ${isFavorite ? styles.favoriteActive : ''}`}
                    onClick={handleFavoriteClick}
                  >
                    <FontAwesomeIcon icon={faHeart} className={isFavorite ? '' : styles.outlineIcon} />
                    <span>{isFavorite ? "Remove from Favorites" : "Add to Favorites"}</span>
                  </button>
                </div>
                
                <Link href={`/products/${product.id}`} className={styles.viewDetailsBtn}>
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
