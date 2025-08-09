import React, { useEffect } from 'react';
import styles from '../styles/FilterSidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faCheck,
  faFilter
} from '@fortawesome/free-solid-svg-icons';
import SaleorFilterSidebar from './SaleorFilterSidebar';

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

interface SaleorMobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  categories: Category[];
  collections: Collection[];
  activeFiltersCount: number;
  onClearAll: () => void;
}

const SaleorMobileFilters: React.FC<SaleorMobileFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  categories,
  collections,
  activeFiltersCount,
  onClearAll
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.mobileFiltersOverlay} onClick={handleBackdropClick}>
      <div className={styles.mobileFiltersModal}>
        {/* Header */}
        <div className={styles.mobileFiltersHeader}>
          <div className={styles.headerLeft}>
            <FontAwesomeIcon icon={faFilter} />
            <h2>الفلاتر</h2>
            {activeFiltersCount > 0 && (
              <span className={styles.activeFiltersBadge}>
                {activeFiltersCount}
              </span>
            )}
          </div>
          
          <button
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="إغلاق الفلاتر"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.mobileFiltersContent}>
          <SaleorFilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            categories={categories}
            collections={collections}
          />
        </div>

        {/* Footer */}
        <div className={styles.mobileFiltersFooter}>
          {activeFiltersCount > 0 && (
            <button
              onClick={onClearAll}
              className={styles.clearAllBtn}
            >
              مسح الكل ({activeFiltersCount})
            </button>
          )}
          
          <button
            onClick={onClose}
            className={styles.applyFiltersBtn}
          >
            <FontAwesomeIcon icon={faCheck} />
            تطبيق الفلاتر
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleorMobileFilters;