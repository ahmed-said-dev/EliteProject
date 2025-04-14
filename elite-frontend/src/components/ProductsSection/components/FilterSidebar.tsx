import React, { useState } from 'react';
// @ts-ignore
import styles from '../styles/FilterSidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronDown, faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons';

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

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  petTypes: string[];
  productTypes: string[];
  brands: string[];
  onReset: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  filters, 
  onFilterChange, 
  petTypes, 
  productTypes, 
  brands,
  onReset
}) => {
  // Estado para las secciones expandidas/colapsadas
  const [expandedSections, setExpandedSections] = useState({
    petType: true,
    productType: true,
    priceRange: true,
    brands: true,
    rating: true,
    availability: true
  });

  // Toggle para expandir/colapsar secciones
  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section as keyof typeof expandedSections]
    });
  };

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

  return (
    <div className={styles.filterSidebar}>
      <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>Filters</h3>
        <button className={styles.resetBtn} onClick={onReset}>
          Reset All
        </button>
      </div>

      <div className={styles.filterSection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => toggleSection('petType')}
        >
          <h4 className={styles.sectionTitle}>Pet Type</h4>
          <FontAwesomeIcon 
            icon={expandedSections.petType ? faChevronUp : faChevronDown} 
            className={styles.chevronIcon} 
          />
        </div>
        
        {expandedSections.petType && (
          <div className={styles.sectionContent}>
            {petTypes.map((pet) => (
              <div key={pet} className={styles.checkboxGroup}>
                <input 
                  type="checkbox" 
                  id={`pet-${pet}`} 
                  checked={filters.petType.includes(pet)}
                  onChange={() => handleCheckboxChange('petType', pet)}
                  className={styles.checkbox}
                />
                <label htmlFor={`pet-${pet}`} className={styles.checkboxLabel}>
                  {pet}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => toggleSection('productType')}
        >
          <h4 className={styles.sectionTitle}>Product Type</h4>
          <FontAwesomeIcon 
            icon={expandedSections.productType ? faChevronUp : faChevronDown} 
            className={styles.chevronIcon} 
          />
        </div>
        
        {expandedSections.productType && (
          <div className={styles.sectionContent}>
            {productTypes.map((type) => (
              <div key={type} className={styles.checkboxGroup}>
                <input 
                  type="checkbox" 
                  id={`type-${type}`} 
                  checked={filters.productType.includes(type)}
                  onChange={() => handleCheckboxChange('productType', type)}
                  className={styles.checkbox}
                />
                <label htmlFor={`type-${type}`} className={styles.checkboxLabel}>
                  {type}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => toggleSection('priceRange')}
        >
          <h4 className={styles.sectionTitle}>Price Range</h4>
          <FontAwesomeIcon 
            icon={expandedSections.priceRange ? faChevronUp : faChevronDown} 
            className={styles.chevronIcon} 
          />
        </div>
        
        {expandedSections.priceRange && (
          <div className={styles.sectionContent}>
            <div className={styles.rangeInputs}>
              <div className={styles.rangeGroup}>
                <label htmlFor="min-price" className={styles.rangeLabel}>
                  Min
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.currencySymbol}>$</span>
                  <input 
                    type="number" 
                    id="min-price" 
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
                <label htmlFor="max-price" className={styles.rangeLabel}>
                  Max
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.currencySymbol}>$</span>
                  <input 
                    type="number" 
                    id="max-price" 
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
        )}
      </div>

      <div className={styles.filterSection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => toggleSection('brands')}
        >
          <h4 className={styles.sectionTitle}>Brands</h4>
          <FontAwesomeIcon 
            icon={expandedSections.brands ? faChevronUp : faChevronDown} 
            className={styles.chevronIcon} 
          />
        </div>
        
        {expandedSections.brands && (
          <div className={styles.sectionContent}>
            {brands.map((brand) => (
              <div key={brand} className={styles.checkboxGroup}>
                <input 
                  type="checkbox" 
                  id={`brand-${brand}`} 
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleCheckboxChange('brands', brand)}
                  className={styles.checkbox}
                />
                <label htmlFor={`brand-${brand}`} className={styles.checkboxLabel}>
                  {brand}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => toggleSection('rating')}
        >
          <h4 className={styles.sectionTitle}>Rating</h4>
          <FontAwesomeIcon 
            icon={expandedSections.rating ? faChevronUp : faChevronDown} 
            className={styles.chevronIcon} 
          />
        </div>
        
        {expandedSections.rating && (
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
        )}
      </div>

      <div className={styles.filterSection}>
        <div 
          className={styles.sectionHeader} 
          onClick={() => toggleSection('availability')}
        >
          <h4 className={styles.sectionTitle}>Availability</h4>
          <FontAwesomeIcon 
            icon={expandedSections.availability ? faChevronUp : faChevronDown} 
            className={styles.chevronIcon} 
          />
        </div>
        
        {expandedSections.availability && (
          <div className={styles.sectionContent}>
            <div className={styles.checkboxGroup}>
              <input 
                type="checkbox" 
                id="inStock" 
                checked={filters.availability.includes('In Stock')}
                onChange={() => handleCheckboxChange('availability', 'In Stock')}
                className={styles.checkbox}
              />
              <label htmlFor="inStock" className={styles.checkboxLabel}>
                In Stock
              </label>
            </div>
            <div className={styles.checkboxGroup}>
              <input 
                type="checkbox" 
                id="outOfStock" 
                checked={filters.availability.includes('Out of Stock')}
                onChange={() => handleCheckboxChange('availability', 'Out of Stock')}
                className={styles.checkbox}
              />
              <label htmlFor="outOfStock" className={styles.checkboxLabel}>
                Out of Stock
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
