import React, { useState } from 'react';
import styles from '../styles/FilterSidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, 
  faChevronUp, 
  faTimes, 
  faCheck,
  faTag,
  faLayerGroup,
  faDollarSign
} from '@fortawesome/free-solid-svg-icons';

interface PriceRange {
  min: number;
  max: number;
}

interface FilterState {
  categories: string[];
  collections: string[];
  priceRange: PriceRange;
  availability: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  products?: { totalCount: number };
}

interface Collection {
  id: string;
  name: string;
  slug: string;
  products?: { totalCount: number };
}

interface SaleorFilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  categories: Category[];
  collections: Collection[];
  onClose?: () => void;
}

const SaleorFilterSidebar: React.FC<SaleorFilterSidebarProps> = ({ 
  filters, 
  onFilterChange, 
  categories,
  collections,
  onClose
}) => {
  // State for expanded/collapsed sections
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    collections: true,
    priceRange: true,
    availability: true
  });

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  // Handle category change
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(id => id !== categoryId);
    
    onFilterChange({ categories: newCategories });
  };

  // Handle collection change
  const handleCollectionChange = (collectionId: string, checked: boolean) => {
    const newCollections = checked
      ? [...filters.collections, collectionId]
      : filters.collections.filter(id => id !== collectionId);
    
    onFilterChange({ collections: newCollections });
  };

  // Handle price range change
  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    onFilterChange({
      priceRange: {
        ...filters.priceRange,
        [type]: value
      }
    });
  };

  // Handle availability change
  const handleAvailabilityChange = (option: string, checked: boolean) => {
    const newAvailability = checked
      ? [...filters.availability, option]
      : filters.availability.filter(item => item !== option);
    
    onFilterChange({ availability: newAvailability });
  };

  // Reset all filters
  const resetAllFilters = () => {
    onFilterChange({
      categories: [],
      collections: [],
      priceRange: { min: 0, max: 1000 },
      availability: []
    });
  };

  // Count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.collections.length > 0) count++;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 1000) count++;
    if (filters.availability.length > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className={styles.filterSidebar}>
      {/* Header */}
      <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>
          <FontAwesomeIcon icon={faLayerGroup} />
          الفلاتر
        </h3>
        
        <div className={styles.filterHeaderActions}>
          {activeFiltersCount > 0 && (
            <button
              onClick={resetAllFilters}
              className={styles.resetFiltersBtn}
            >
              إعادة تعيين ({activeFiltersCount})
            </button>
          )}
          
          {onClose && (
            <button
              onClick={onClose}
              className={styles.closeBtn}
              aria-label="إغلاق الفلاتر"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.filterContent}>
        {/* Categories Filter */}
        <div className={styles.filterSection}>
          <button
            className={styles.filterSectionHeader}
            onClick={() => toggleSection('categories')}
          >
            <span className={styles.sectionTitle}>
              <FontAwesomeIcon icon={faTag} />
              الأصناف
            </span>
            <FontAwesomeIcon 
              icon={expandedSections.categories ? faChevronUp : faChevronDown}
              className={styles.toggleIcon}
            />
          </button>

          {expandedSections.categories && (
            <div className={styles.filterOptions}>
              {categories.map((category) => (
                <label key={category.id} className={styles.filterOption}>
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                    className={styles.filterCheckbox}
                  />
                  <span className={styles.checkmark}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={styles.optionLabel}>
                    {category.name}
                    {category.products?.totalCount && (
                      <span className={styles.optionCount}>
                        ({category.products.totalCount})
                      </span>
                    )}
                  </span>
                </label>
              ))}
              
              {categories.length === 0 && (
                <div className={styles.emptyMessage}>
                  لا توجد أصناف متاحة
                </div>
              )}
            </div>
          )}
        </div>

        {/* Collections Filter */}
        <div className={styles.filterSection}>
          <button
            className={styles.filterSectionHeader}
            onClick={() => toggleSection('collections')}
          >
            <span className={styles.sectionTitle}>
              <FontAwesomeIcon icon={faLayerGroup} />
              المجموعات
            </span>
            <FontAwesomeIcon 
              icon={expandedSections.collections ? faChevronUp : faChevronDown}
              className={styles.toggleIcon}
            />
          </button>

          {expandedSections.collections && (
            <div className={styles.filterOptions}>
              {collections.map((collection) => (
                <label key={collection.id} className={styles.filterOption}>
                  <input
                    type="checkbox"
                    checked={filters.collections.includes(collection.id)}
                    onChange={(e) => handleCollectionChange(collection.id, e.target.checked)}
                    className={styles.filterCheckbox}
                  />
                  <span className={styles.checkmark}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={styles.optionLabel}>
                    {collection.name}
                    {collection.products?.totalCount && (
                      <span className={styles.optionCount}>
                        ({collection.products.totalCount})
                      </span>
                    )}
                  </span>
                </label>
              ))}
              
              {collections.length === 0 && (
                <div className={styles.emptyMessage}>
                  لا توجد مجموعات متاحة
                </div>
              )}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className={styles.filterSection}>
          <button
            className={styles.filterSectionHeader}
            onClick={() => toggleSection('priceRange')}
          >
            <span className={styles.sectionTitle}>
              <FontAwesomeIcon icon={faDollarSign} />
              نطاق السعر
            </span>
            <FontAwesomeIcon 
              icon={expandedSections.priceRange ? faChevronUp : faChevronDown}
              className={styles.toggleIcon}
            />
          </button>

          {expandedSections.priceRange && (
            <div className={styles.priceRangeContainer}>
              <div className={styles.priceInputs}>
                <div className={styles.priceInput}>
                  <label htmlFor="minPrice">من</label>
                  <input
                    id="minPrice"
                    type="number"
                    min="0"
                    max={filters.priceRange.max}
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceRangeChange('min', Number(e.target.value))}
                    className={styles.priceField}
                    placeholder="0"
                  />
                  <span className={styles.currency}>$</span>
                </div>
                
                <div className={styles.priceSeparator}>-</div>
                
                <div className={styles.priceInput}>
                  <label htmlFor="maxPrice">إلى</label>
                  <input
                    id="maxPrice"
                    type="number"
                    min={filters.priceRange.min}
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceRangeChange('max', Number(e.target.value))}
                    className={styles.priceField}
                    placeholder="1000"
                  />
                  <span className={styles.currency}>$</span>
                </div>
              </div>

              {/* Quick price ranges */}
              <div className={styles.quickPriceRanges}>
                {[
                  { label: 'أقل من $50', min: 0, max: 50 },
                  { label: '$50 - $100', min: 50, max: 100 },
                  { label: '$100 - $200', min: 100, max: 200 },
                  { label: '$200 - $500', min: 200, max: 500 },
                  { label: 'أكثر من $500', min: 500, max: 1000 },
                ].map((range) => (
                  <button
                    key={range.label}
                    onClick={() => onFilterChange({ 
                      priceRange: { min: range.min, max: range.max }
                    })}
                    className={`${styles.quickPriceBtn} ${
                      filters.priceRange.min === range.min && 
                      filters.priceRange.max === range.max 
                        ? styles.active 
                        : ''
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Availability Filter */}
        <div className={styles.filterSection}>
          <button
            className={styles.filterSectionHeader}
            onClick={() => toggleSection('availability')}
          >
            <span className={styles.sectionTitle}>
              <FontAwesomeIcon icon={faCheck} />
              التوفر
            </span>
            <FontAwesomeIcon 
              icon={expandedSections.availability ? faChevronUp : faChevronDown}
              className={styles.toggleIcon}
            />
          </button>

          {expandedSections.availability && (
            <div className={styles.filterOptions}>
              {[
                { value: 'in_stock', label: 'متوفر' },
                { value: 'out_of_stock', label: 'غير متوفر' },
                { value: 'pre_order', label: 'طلب مسبق' },
              ].map((option) => (
                <label key={option.value} className={styles.filterOption}>
                  <input
                    type="checkbox"
                    checked={filters.availability.includes(option.value)}
                    onChange={(e) => handleAvailabilityChange(option.value, e.target.checked)}
                    className={styles.filterCheckbox}
                  />
                  <span className={styles.checkmark}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={styles.optionLabel}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer with action buttons */}
      <div className={styles.filterFooter}>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetAllFilters}
            className={styles.resetBtn}
          >
            إعادة تعيين الكل
          </button>
        )}
      </div>
    </div>
  );
};

export default SaleorFilterSidebar;