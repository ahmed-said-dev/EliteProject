import React from 'react';
// @ts-ignore
import styles from '../styles/MobileFilters.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStar, faFilter } from '@fortawesome/free-solid-svg-icons';

interface PriceRange {
  min: number;
  max: number;
}

interface FilterState {
  petType: string[];
  productType: string[];
  priceRange: PriceRange;
  brands: string[];
  rating: number | null;
  availability: string[];
}

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  petTypes: string[];
  productTypes: string[];
  brands: string[];
  onReset: () => void;
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  petTypes,
  productTypes,
  brands,
  onReset
}) => {
  // Manejar cambio en filtros de checkbox
  const handleCheckboxChange = (
    type: 'petType' | 'productType' | 'brands' | 'availability',
    value: string
  ) => {
    const currentValues = [...filters[type]];
    
    if (currentValues.includes(value)) {
      // Si ya está seleccionado, quitarlo
      const newValues = currentValues.filter(item => item !== value);
      onFilterChange({
        ...filters,
        [type]: newValues
      });
    } else {
      // Si no está seleccionado, agregarlo
      onFilterChange({
        ...filters,
        [type]: [...currentValues, value]
      });
    }
  };

  // Manejar cambio en el rango de precios
  const handlePriceRangeChange = (min: number, max: number) => {
    onFilterChange({
      ...filters,
      priceRange: { min, max }
    });
  };

  // Manejar cambio en calificación por estrellas
  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      rating: filters.rating === rating ? null : rating
    });
  };

  // Renderizar estrellas para el filtro de calificación
  const renderStars = (rating: number) => {
    return (
      <div className={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon 
            key={star} 
            icon={faStar} 
            className={star <= rating ? styles.activeStar : styles.star} 
          />
        ))}
        <span className={styles.ratingText}>& Up</span>
      </div>
    );
  };

  // Si el modal no está abierto, no mostrar nada
  if (!isOpen) return null;

  return (
    <div className={`${styles.mobileFilterOverlay} ${isOpen ? styles.open : ''}`}>
      <div className={styles.mobileFilterPanel}>
        <div className={styles.mobileFilterHeader}>
          <h3 className={styles.mobileFilterTitle}>
            <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />
            Filters
          </h3>
          <button className={styles.closeButton} onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className={styles.mobileFilterContent}>
          <div className={styles.filterSection}>
            <h4 className={styles.sectionTitle}>Pet Type</h4>
            <div className={styles.sectionContent}>
              {petTypes.map((pet) => (
                <div key={pet} className={styles.checkboxGroup}>
                  <input 
                    type="checkbox" 
                    id={`mobile-pet-${pet}`} 
                    checked={filters.petType.includes(pet)}
                    onChange={() => handleCheckboxChange('petType', pet)}
                    className={styles.checkbox}
                  />
                  <label htmlFor={`mobile-pet-${pet}`} className={styles.checkboxLabel}>
                    {pet}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h4 className={styles.sectionTitle}>Product Type</h4>
            <div className={styles.sectionContent}>
              {productTypes.map((type) => (
                <div key={type} className={styles.checkboxGroup}>
                  <input 
                    type="checkbox" 
                    id={`mobile-type-${type}`} 
                    checked={filters.productType.includes(type)}
                    onChange={() => handleCheckboxChange('productType', type)}
                    className={styles.checkbox}
                  />
                  <label htmlFor={`mobile-type-${type}`} className={styles.checkboxLabel}>
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h4 className={styles.sectionTitle}>Price Range</h4>
            <div className={styles.sectionContent}>
              <div className={styles.rangeInputs}>
                <div className={styles.rangeGroup}>
                  <label htmlFor="mobile-min-price" className={styles.rangeLabel}>
                    Min
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.currencySymbol}>$</span>
                    <input 
                      type="number" 
                      id="mobile-min-price" 
                      value={filters.priceRange.min}
                      onChange={(e) => handlePriceRangeChange(
                        Number(e.target.value), 
                        filters.priceRange.max
                      )}
                      min="0"
                      className={styles.rangeInput}
                    />
                  </div>
                </div>
                
                <div className={styles.rangeSeparator}>-</div>
                
                <div className={styles.rangeGroup}>
                  <label htmlFor="mobile-max-price" className={styles.rangeLabel}>
                    Max
                  </label>
                  <div className={styles.inputWrapper}>
                    <span className={styles.currencySymbol}>$</span>
                    <input 
                      type="number" 
                      id="mobile-max-price" 
                      value={filters.priceRange.max}
                      onChange={(e) => handlePriceRangeChange(
                        filters.priceRange.min, 
                        Number(e.target.value)
                      )}
                      min={filters.priceRange.min}
                      className={styles.rangeInput}
                    />
                  </div>
                </div>
              </div>
              
              <div className={styles.priceSlider}>
                <input 
                  type="range" 
                  min="0" 
                  max="200"
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceRangeChange(
                    Number(e.target.value), 
                    filters.priceRange.max
                  )}
                  className={styles.slider}
                />
                <input 
                  type="range" 
                  min="0" 
                  max="200"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceRangeChange(
                    filters.priceRange.min, 
                    Number(e.target.value)
                  )}
                  className={styles.slider}
                />
              </div>
            </div>
          </div>

          <div className={styles.filterSection}>
            <h4 className={styles.sectionTitle}>Brands</h4>
            <div className={styles.sectionContent}>
              {brands.map((brand) => (
                <div key={brand} className={styles.checkboxGroup}>
                  <input 
                    type="checkbox" 
                    id={`mobile-brand-${brand}`} 
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleCheckboxChange('brands', brand)}
                    className={styles.checkbox}
                  />
                  <label htmlFor={`mobile-brand-${brand}`} className={styles.checkboxLabel}>
                    {brand}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h4 className={styles.sectionTitle}>Rating</h4>
            <div className={styles.sectionContent}>
              {[4, 3, 2, 1].map((rating) => (
                <div 
                  key={rating} 
                  className={styles.ratingOption}
                  onClick={() => handleRatingChange(rating)}
                >
                  <div className={`${styles.radioBtn} ${filters.rating === rating ? styles.activeRadio : ''}`}>
                    {filters.rating === rating && <span className={styles.radioDot}></span>}
                  </div>
                  {renderStars(rating)}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <h4 className={styles.sectionTitle}>Availability</h4>
            <div className={styles.sectionContent}>
              <div className={styles.checkboxGroup}>
                <input 
                  type="checkbox" 
                  id="mobile-inStock" 
                  checked={filters.availability.includes('In Stock')}
                  onChange={() => handleCheckboxChange('availability', 'In Stock')}
                  className={styles.checkbox}
                />
                <label htmlFor="mobile-inStock" className={styles.checkboxLabel}>
                  In Stock
                </label>
              </div>
              <div className={styles.checkboxGroup}>
                <input 
                  type="checkbox" 
                  id="mobile-outOfStock" 
                  checked={filters.availability.includes('Out of Stock')}
                  onChange={() => handleCheckboxChange('availability', 'Out of Stock')}
                  className={styles.checkbox}
                />
                <label htmlFor="mobile-outOfStock" className={styles.checkboxLabel}>
                  Out of Stock
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mobileFilterFooter}>
          <button className={styles.resetBtn} onClick={onReset}>
            Reset All
          </button>
          <button className={styles.applyBtn} onClick={onClose}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilters;
