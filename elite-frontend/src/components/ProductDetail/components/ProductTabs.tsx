import React, { useState } from 'react';
// @ts-ignore
import styles from '../styles/ProductTabs.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductDetailProps } from '../ProductDetail';

interface ReviewType {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

interface ProductTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  product: ProductDetailProps['product'];
  specifications: Record<string, string>;
  shippingInfo: Array<{type: string; time: string; cost: string}>;
  reviewsData: ReviewType[];
  setReviewsData: React.Dispatch<React.SetStateAction<ReviewType[]>>;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  activeTab,
  setActiveTab,
  product,
  specifications,
  shippingInfo,
  reviewsData,
  setReviewsData
}) => {
  // Estado para el formulario de reseña
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
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
  
  // Manejo del cambio en el formulario de reseña
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: value
    });
    
    // Limpiar error específico al cambiar un campo
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  // Manejo del cambio en la calificación
  const handleRatingChange = (rating: number) => {
    setReviewForm({
      ...reviewForm,
      rating
    });
  };
  
  // Validar formulario
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!reviewForm.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!reviewForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(reviewForm.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!reviewForm.comment.trim()) {
      errors.comment = 'Please write your review';
    } else if (reviewForm.comment.length < 10) {
      errors.comment = 'Review must be at least 10 characters';
    }
    
    return errors;
  };
  
  // Enviar reseña
  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulario
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Mostrar loader
    setIsSubmitting(true);
    
    // Simular envío de formulario (aquí iría la llamada a la API)
    setTimeout(() => {
      // Crear nueva reseña
      const newReview = {
        id: Date.now(),
        user: reviewForm.name,
        rating: reviewForm.rating,
        date: new Date().toISOString().slice(0, 10),
        comment: reviewForm.comment
      };
      
      // Actualizar estado de reseñas
      setReviewsData([newReview, ...reviewsData]);
      
      // Resetear formulario
      setReviewForm({
        name: '',
        email: '',
        rating: 5,
        comment: ''
      });
      
      // Mostrar mensaje de éxito
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  return (
    <div className={styles.productTabs}>
      {/* Tabs Navigation */}
      <div className={styles.tabsNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === 'description' ? styles.active : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'specifications' ? styles.active : ''}`}
          onClick={() => setActiveTab('specifications')}
        >
          Specifications
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'shipping' ? styles.active : ''}`}
          onClick={() => setActiveTab('shipping')}
        >
          Shipping & Returns
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({reviewsData.length})
        </button>
      </div>
      
      {/* Tab Contents */}
      <div className={styles.tabContent}>
        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className={styles.descriptionTab}>
            <div className={styles.productDescription}>
              <h3>Product Description</h3>
              <p>{product.description}</p>
              
              {/* Agregar párrafos adicionales para una descripción más completa */}
              <p>
                Designed with your pet's health and happiness in mind, this premium product provides 
                excellent quality and value. Each item is crafted using high-quality materials that 
                are safe for your pet and built to last.
              </p>
              
              <h4>Key Benefits</h4>
              <ul className={styles.benefitsList}>
                <li>Premium quality materials for durability and safety</li>
                <li>Designed specifically for {product.petType.toLowerCase()}</li>
                <li>Easy to use and maintain</li>
                <li>Helps promote health and wellbeing</li>
                <li>Trusted by pet owners and veterinarians</li>
              </ul>
              
              <h4>Why Choose {product.brand}?</h4>
              <p>
                {product.brand} has been a trusted name in pet care for over 20 years. We take pride in 
                developing products that enhance the bond between pets and their owners, while maintaining 
                the highest standards of safety and quality. Our team of experts, including veterinarians and 
                animal behaviorists, work together to create innovative solutions for your pet's needs.
              </p>
            </div>
          </div>
        )}
        
        {/* Specifications Tab */}
        {activeTab === 'specifications' && (
          <div className={styles.specificationsTab}>
            <h3>Product Specifications</h3>
            <table className={styles.specificationsTable}>
              <tbody>
                {Object.entries(specifications).map(([key, value]) => (
                  <tr key={key}>
                    <th>{key}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Shipping Tab */}
        {activeTab === 'shipping' && (
          <div className={styles.shippingTab}>
            <h3>Shipping Information</h3>
            <table className={styles.shippingTable}>
              <thead>
                <tr>
                  <th>Shipping Method</th>
                  <th>Estimated Delivery</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {shippingInfo.map((info, index) => (
                  <tr key={index}>
                    <td>{info.type}</td>
                    <td>{info.time}</td>
                    <td>{info.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <h3>Return Policy</h3>
            <p>
              We want you to be completely satisfied with your purchase. If for any reason you're not
              happy with your order, you can return it within 30 days of delivery for a full refund or
              exchange. Please note that items must be in their original, unused condition with all tags 
              and packaging intact.
            </p>
            
            <h4>How to Return</h4>
            <ol className={styles.returnSteps}>
              <li>Contact our customer service team to initiate a return</li>
              <li>Pack the item securely in its original packaging if possible</li>
              <li>Attach the provided return label to your package</li>
              <li>Drop off the package at your nearest shipping location</li>
              <li>Once received and inspected, your refund will be processed within 5-7 business days</li>
            </ol>
            
            <p>
              <strong>Note:</strong> Shipping costs are non-refundable, and the customer is responsible 
              for return shipping unless the item is defective or was shipped incorrectly.
            </p>
          </div>
        )}
        
        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className={styles.reviewsTab}>
            <div className={styles.reviewsHeader}>
              <div className={styles.reviewsSummary}>
                <h3>Customer Reviews</h3>
                <div className={styles.averageRating}>
                  <div className={styles.ratingStars}>
                    {renderStars(product.rating)}
                  </div>
                  <div className={styles.ratingText}>
                    <span className={styles.ratingNumber}>{product.rating.toFixed(1)}</span> out of 5
                  </div>
                </div>
                <p className={styles.totalReviews}>Based on {product.reviewCount} reviews</p>
              </div>
              
              <div className={styles.writeReviewCta}>
                <h4>Share your thoughts</h4>
                <p>Help other pet owners make a better choice</p>
              </div>
            </div>
            
            <div className={styles.reviewsContent}>
              {/* Review List */}
              <div className={styles.reviewsList}>
                <h3>All Reviews</h3>
                
                {reviewsData.length === 0 ? (
                  <div className={styles.noReviews}>
                    <p>No reviews yet. Be the first to review this product!</p>
                  </div>
                ) : (
                  reviewsData.map(review => (
                    <div key={review.id} className={styles.reviewItem}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.reviewerInfo}>
                          <h4 className={styles.reviewerName}>{review.user}</h4>
                          <span className={styles.reviewDate}>
                            {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className={styles.reviewRating}>
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <div className={styles.reviewComment}>
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {/* Write Review Form */}
              <div className={styles.writeReview}>
                <h3>Write a Review</h3>
                
                {submitSuccess ? (
                  <div className={styles.successMessage}>
                    <p>Thank you for your review! It has been submitted successfully.</p>
                  </div>
                ) : (
                  <form onSubmit={submitReview} className={styles.reviewForm}>
                    <div className={styles.formGroup}>
                      <label htmlFor="rating" className={styles.ratingLabel}>
                        Your Rating
                      </label>
                      <div className={styles.ratingSelect}>
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => handleRatingChange(rating)}
                            className={styles.ratingButton}
                          >
                            <FontAwesomeIcon 
                              icon={faStar} 
                              className={rating <= reviewForm.rating ? styles.starSelected : styles.starUnselected} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Name*</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={reviewForm.name}
                        onChange={handleReviewChange}
                        className={formErrors.name ? styles.inputError : ''}
                      />
                      {formErrors.name && (
                        <span className={styles.errorMessage}>{formErrors.name}</span>
                      )}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email* (will not be published)</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={reviewForm.email}
                        onChange={handleReviewChange}
                        className={formErrors.email ? styles.inputError : ''}
                      />
                      {formErrors.email && (
                        <span className={styles.errorMessage}>{formErrors.email}</span>
                      )}
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="comment">Your Review*</label>
                      <textarea
                        id="comment"
                        name="comment"
                        rows={5}
                        value={reviewForm.comment}
                        onChange={handleReviewChange}
                        className={formErrors.comment ? styles.inputError : ''}
                      ></textarea>
                      {formErrors.comment && (
                        <span className={styles.errorMessage}>{formErrors.comment}</span>
                      )}
                    </div>
                    
                    <button 
                      type="submit" 
                      className={styles.submitButton}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
