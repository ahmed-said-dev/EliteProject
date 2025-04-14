import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
// @ts-ignore
import styles from '../styles/ProductCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faShoppingCart, faStar, faStarHalfAlt, 
  faEye, faCheck
} from '@fortawesome/free-solid-svg-icons';
// Usamos solo iconos de solid sin necesidad de importar free-regular

interface ProductProps {
  id: number;
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
  
  // Manejar click en botón de agregar al carrito
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Agregar producto al carrito usando el contexto
    addToCart(product, 1);
    
    // Mostrar feedback visual
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
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
                title="Quick View"
              >
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button 
                className={`${styles.actionButton} ${isFavorite ? styles.favoriteActive : ''}`}
                onClick={handleFavoriteClick}
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <FontAwesomeIcon icon={faHeart} className={isFavorite ? '' : styles.outlineIcon} />
              </button>
            </div>
          </div>
          
          <div className={styles.productInfo}>
            <div className={styles.productMeta}>
              <span className={styles.productCategory}>{product.petType}</span>
              <span className={styles.productDivider}>•</span>
              <span className={styles.productCategory}>{product.productType}</span>
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
                <p>{product.description.length > 80 
                  ? `${product.description.substring(0, 80)}...` 
                  : product.description}
                </p>
              )}
            </div>
            
            <div className={styles.priceAndStock}>
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
                  <button 
                    className={`${styles.quickViewAddToCart} ${!product.inStock ? styles.disabled : ''} ${addedToCart ? styles.added : ''}`}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>{addedToCart ? 'Added!' : 'Add to Cart'}</span>
                  </button>
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
