import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import styles from './styles/SaleorProducts.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faShoppingCart, faSearch, faFilter, 
  faChevronDown, faStar, faStarHalfAlt, faTimes,
  faCheck, faSortAmountDown, faLayerGroup, faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { SaleorFilterSidebar, SaleorMobileFilters } from './components';
import SaleorProductCard from './components/SaleorProductCard';
import { useSaleorProducts, useSaleorCategories, useSaleorCollections } from '@/hooks/useSaleorProducts';
import { useCart } from '@/context/SaleorCartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Product } from '@/hooks/useSaleorProducts';

// Interfaces
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

// Sort options
const SORT_OPTIONS = [
  { value: 'NAME:ASC', label: 'الاسم (أ - ي)' },
  { value: 'NAME:DESC', label: 'الاسم (ي - أ)' },
  { value: 'PRICE:ASC', label: 'السعر (من الأقل للأعلى)' },
  { value: 'PRICE:DESC', label: 'السعر (من الأعلى للأقل)' },
  { value: 'CREATED:DESC', label: 'الأحدث أولاً' },
  { value: 'CREATED:ASC', label: 'الأقدم أولاً' },
];



const SaleorProductsSection: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { addToCart } = useCart();
  
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState({ field: 'NAME', direction: 'ASC' as 'ASC' | 'DESC' });
  const [showFilters, setShowFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    collections: [],
    priceRange: { min: 0, max: 1000 },
    availability: [],
  });

  // Saleor hooks
  const { 
    products, 
    loading, 
    error, 
    hasNextPage, 
    totalCount, 
    loadMore 
  } = useSaleorProducts({
    first: 20,
    search: searchQuery || undefined,
    categories: filters.categories.length > 0 ? filters.categories : undefined,
    collections: filters.collections.length > 0 ? filters.collections : undefined,
    priceRange: filters.priceRange.min > 0 || filters.priceRange.max < 1000 ? filters.priceRange : undefined,
    sortBy: {
      field: sortBy.field,
      direction: sortBy.direction,
    },
  });

  const { categories } = useSaleorCategories();
  const { collections } = useSaleorCollections();



  // Handle sort change
  const handleSortChange = (sortValue: string) => {
    const [field, direction] = sortValue.split(':');
    setSortBy({ field, direction: direction as 'ASC' | 'DESC' });
  };

  // Handle filter change
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      categories: [],
      collections: [],
      priceRange: { min: 0, max: 1000 },
      availability: [],
    });
    setSearchQuery('');
  };

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.collections.length > 0) count++;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 1000) count++;
    if (filters.availability.length > 0) count++;
    if (searchQuery) count++;
    return count;
  }, [filters, searchQuery]);

  // Get results count text
  const getResultsCountText = (count: number): string => {
    if (isRTL) {
      if (count === 0) return 'لا توجد منتجات';
      if (count === 1) return 'منتج واحد';
      if (count === 2) return 'منتجان';
      if (count <= 10) return `${count} منتجات`;
      return `${count} منتجاً`;
    }
    return count === 1 ? '1 product' : `${count} products`;
  };

  return (
    <div className={styles.productsSection}>
      {/* Search and Filters Header */}
      <div className={styles.productsHeader}>
        <div className={styles.headerTop}>
          <h1 className={styles.sectionTitle}>
            {t('productsSection.title') || 'منتجاتنا'}
          </h1>
          <p className={styles.sectionSubtitle}>
            {t('productsSection.subtitle') || 'اكتشف أفضل المنتجات لحيوانك الأليف'}
          </p>
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchBar}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input
              type="text"
              placeholder={t('productsSection.searchPlaceholder') || 'ابحث عن المنتجات...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={styles.clearSearchBtn}
                aria-label="مسح البحث"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
        </div>

        {/* Controls Bar */}
        <div className={styles.controlsBar}>
          <div className={styles.leftControls}>
            {/* Results count */}
            <span className={styles.resultsCount}>
              {getResultsCountText(totalCount)}
            </span>

            {/* Active filters indicator */}
            {activeFiltersCount > 0 && (
              <div className={styles.activeFilters}>
                <span className={styles.filtersCount}>
                  {activeFiltersCount} فلتر نشط
                </span>
                <button
                  onClick={clearAllFilters}
                  className={styles.clearFiltersBtn}
                >
                  مسح الكل
                </button>
              </div>
            )}
          </div>

          <div className={styles.rightControls}>
            {/* Sort dropdown */}
            <div className={styles.sortContainer}>
              <label htmlFor="sort" className={styles.sortLabel}>
                ترتيب حسب:
              </label>
              <select
                id="sort"
                value={`${sortBy.field}:${sortBy.direction}`}
                onChange={(e) => handleSortChange(e.target.value)}
                className={styles.sortSelect}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View mode toggle */}
            <div className={styles.viewModeToggle}>
              <button
                onClick={() => setViewMode('grid')}
                className={`${styles.viewModeBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                aria-label="عرض شبكي"
              >
                <FontAwesomeIcon icon={faLayerGroup} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`${styles.viewModeBtn} ${viewMode === 'list' ? styles.active : ''}`}
                aria-label="عرض قائمة"
              >
                <FontAwesomeIcon icon={faSortAmountDown} />
              </button>
            </div>

            {/* Filters toggle (mobile) */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className={styles.mobileFiltersBtn}
              aria-label="فتح الفلاتر"
            >
              <FontAwesomeIcon icon={faFilter} />
              <span>فلاتر</span>
              {activeFiltersCount > 0 && (
                <span className={styles.filtersBadge}>{activeFiltersCount}</span>
              )}
            </button>

            {/* Desktop filters toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={styles.desktopFiltersBtn}
              aria-label={showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}
            >
              <FontAwesomeIcon icon={faFilter} />
              <span>{showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles.productsContent}>
        {/* Desktop Filters Sidebar */}
        {showFilters && (
          <aside className={styles.filtersSidebar}>
            <SaleorFilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={categories}
              collections={collections}
              onClose={() => setShowFilters(false)}
            />
          </aside>
        )}

        {/* Products Grid/List */}
        <main className={`${styles.productsMain} ${showFilters ? styles.withSidebar : ''}`}>
          {/* Loading State */}
          {loading && (
            <div className={styles.loadingContainer}>
              <FontAwesomeIcon icon={faSpinner} spin className={styles.loadingIcon} />
              <span>جاري تحميل المنتجات...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>
                حدث خطأ في تحميل المنتجات: {error}
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className={styles.emptyState}>
              <FontAwesomeIcon icon={faSearch} className={styles.emptyIcon} />
              <h3>لا توجد منتجات</h3>
              <p>لم نجد أي منتجات تطابق معايير البحث الحالية</p>
              <button onClick={clearAllFilters} className={styles.clearFiltersBtn}>
                مسح جميع الفلاتر
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && products.length > 0 && (
            <>
              <div className={`${styles.productsGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
                {products.map((product) => (
                  <SaleorProductCard
                    key={product.id}
                    product={product}
                    viewType={viewMode}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasNextPage && (
                <div className={styles.loadMoreContainer}>
                  <button
                    onClick={loadMore}
                    className={styles.loadMoreBtn}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} spin />
                        جاري التحميل...
                      </>
                    ) : (
                      'تحميل المزيد'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile Filters Modal */}
      <SaleorMobileFilters
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={categories}
        collections={collections}
        activeFiltersCount={activeFiltersCount}
        onClearAll={clearAllFilters}
      />
    </div>
  );
};

export default SaleorProductsSection;