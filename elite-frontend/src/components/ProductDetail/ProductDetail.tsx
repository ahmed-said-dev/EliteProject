import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useCart } from '@/context/SaleorCartContext';
import { ProductGallery, ProductInfo, ProductTabs, RelatedProducts } from './components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faChevronRight, 
  faShare, 
  faHeart, 
  faCartPlus, 
  faTruck, 
  faUndo, 
  faShieldAlt,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { productData } from '../ProductsSection/data/productData';
// @ts-ignore
import styles from './styles/ProductDetail.module.css';

export interface ProductDetailProps {
  product: {
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
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [reviewsData, setReviewsData] = useState([
    { id: 1, user: 'Sarah Johnson', rating: 5, date: '2025-03-15', comment: 'My pet absolutely loves this! Great quality product and excellent value for money.' },
    { id: 2, user: 'Michael Chen', rating: 4, date: '2025-03-10', comment: 'Good product overall. Shipping was fast and my dog seems to enjoy it.' },
    { id: 3, user: 'Emma Williams', rating: 5, date: '2025-02-28', comment: 'Exactly as described. Will definitely purchase again when needed.' },
    { id: 4, user: 'David Brown', rating: 3, date: '2025-02-22', comment: 'Decent quality but a bit overpriced compared to similar products.' }
  ]);
  const reviewRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Generar imágenes adicionales (para fines de demostración)
  const baseImage = product.image || '/placeholder.svg';
  const productImages = [
    baseImage,
    baseImage,
    baseImage,
    baseImage,
  ];
  
  // Calcular descuento si hay precio de oferta
  const discountPercentage = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : 0;
  
  // Manejar cambio de cantidad
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  // Incrementar cantidad
  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  
  // Decrementar cantidad
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  
  // Manejar click en botón de favorito
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    // Aquí podría ir código para guardar en localStorage o enviar a API
  };
  
  // معالجة نقرة زر إضافة إلى السلة
  const handleAddToCart = async () => {
    try {
      console.log('Adding to cart from product detail:', product);
      
      // إضافة المنتج إلى السلة باستخدام سياق Saleor (باستخدام معرّف بديل)
      await addToCart(String(product.id), quantity);
      
      // إظهار رسالة نجاح مؤقتة
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    } catch (err) {
      console.error('Error adding product to cart:', err);
      alert('Failed to add product to cart. Please try again.');
    }
  };
  
  // Manejar compra directa
  const handleBuyNow = () => {
    // Aquí iría la lógica para agregar al carrito y redirigir al checkout
    router.push('/checkout');
  };
  
  // Scrollear a las reseñas cuando se hace click en "Ver reseñas"
  const scrollToReviews = () => {
    setActiveTab('reviews');
    if (reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Obtener productos relacionados
  const getRelatedProducts = () => {
    // Filtrar por el mismo tipo de mascota y producto, excluyendo el producto actual
    return productData
      .filter(p => 
        (p.petType === product.petType || p.productType === product.productType) && 
        p.id !== product.id
      )
      .slice(0, 4);
  };
  
  // Especificaciones técnicas del producto (ejemplo)
  const specifications = {
    "Brand": product.brand,
    "Category": product.productType,
    "Suitable for": product.petType,
    "Weight": "500g",
    "Dimensions": "25 x 15 x 10 cm",
    "Material": "Premium quality materials",
    "Country of origin": "USA",
    "Usage instructions": "See product description"
  };
  
  // Información de envío (ejemplo)
  const shippingInfo = [
    { type: "Standard Shipping", time: "3-5 business days", cost: "$4.99" },
    { type: "Express Shipping", time: "1-2 business days", cost: "$9.99" },
    { type: "Free Shipping", time: "5-7 business days", cost: "Free on orders over $50" }
  ];
  
  return (
    <div className={styles.productDetail}>
      <div className={styles.productDetailContainer}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <FontAwesomeIcon icon={faChevronRight} className={styles.breadcrumbIcon} />
          <Link href="/products">Products</Link>
          <FontAwesomeIcon icon={faChevronRight} className={styles.breadcrumbIcon} />
          <Link href={`/products?pet=${product.petType.toLowerCase()}`}>{product.petType}</Link>
          <FontAwesomeIcon icon={faChevronRight} className={styles.breadcrumbIcon} />
          <span>{product.name}</span>
        </div>
        
        <div className={styles.productDetailContent}>
          {/* Columna izquierda - Galería de imágenes */}
          <div className={styles.productGalleryColumn}>
            <ProductGallery images={productImages} productName={product.name} />
          </div>
          
          {/* Columna derecha - Información del producto */}
          <div className={styles.productInfoColumn}>
            <ProductInfo 
              product={product}
              quantity={quantity}
              isFavorite={isFavorite}
              addedToCart={addedToCart}
              discountPercentage={discountPercentage}
              handleQuantityChange={handleQuantityChange}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              handleFavoriteClick={handleFavoriteClick}
              handleAddToCart={handleAddToCart}
              handleBuyNow={handleBuyNow}
              scrollToReviews={scrollToReviews}
            />
            
            {/* Beneficios de compra */}
            <div className={styles.productBenefits}>
              <div className={styles.benefitItem}>
                <FontAwesomeIcon icon={faTruck} className={styles.benefitIcon} />
                <div className={styles.benefitText}>
                  <h4>Free Shipping</h4>
                  <p>On orders over $50</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <FontAwesomeIcon icon={faUndo} className={styles.benefitIcon} />
                <div className={styles.benefitText}>
                  <h4>Easy Returns</h4>
                  <p>30-day return policy</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <FontAwesomeIcon icon={faShieldAlt} className={styles.benefitIcon} />
                <div className={styles.benefitText}>
                  <h4>Secure Checkout</h4>
                  <p>100% protected payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs de información adicional */}
        <div ref={reviewRef}>
          <ProductTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            product={product}
            specifications={specifications}
            shippingInfo={shippingInfo}
            reviewsData={reviewsData}
            setReviewsData={setReviewsData}
          />
        </div>
        
        {/* Productos relacionados */}
        <RelatedProducts products={getRelatedProducts()} />
      </div>
    </div>
  );
};

export default ProductDetail;
