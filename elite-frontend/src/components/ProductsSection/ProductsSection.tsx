import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// @ts-ignore
import styles from './styles/ProductsSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, faShoppingCart, faSearch, faFilter, 
  faChevronDown, faStar, faStarHalfAlt, faTimes,
  faCheck, faSortAmountDown, faLayerGroup
} from '@fortawesome/free-solid-svg-icons';
import { FilterSidebar, ProductCard, MobileFilters } from './components';
import { productData } from './data/productData';
import { useLanguage } from '@/context/LanguageContext';

// Interfaces
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

// دالة للحصول على النص المناسب لعدد المنتجات
const getResultsCountText = (count: number, t: any, isRTL: boolean): string => {
  // استخدام صيغ مختلفة للعربية حسب العدد
  if (isRTL) {
    let key = 'productsSection.resultsCountMany';
    if (count === 0) key = 'productsSection.resultsCountZero';
    else if (count === 1) key = 'productsSection.resultsCountOne';
    else if (count === 2) key = 'productsSection.resultsCountTwo';
    else if (count >= 3 && count <= 10) key = 'productsSection.resultsCountFew';
    
    return t(key).replace('%count%', count.toString());
  } else {
    // للغة الإنجليزية
    return t('productsSection.resultsCount', { count }).replace('%count%', count.toString());
  }
};

const ProductsSection: React.FC = () => {
  const { isRTL, t } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';
  
  // Estados para los productos y filtros
  const [products, setProducts] = useState(productData);
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [sortOption, setSortOption] = useState('popularity');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewType, setViewType] = useState('grid'); // grid or list
  const [filters, setFilters] = useState<FilterState>({
    petType: [],
    productType: [],
    priceRange: { min: 0, max: 200 },
    brands: [],
    rating: null,
    availability: []
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Categorías disponibles
  const petTypes = t('productsSection.petTypes', { returnObjects: true });
  const productTypes = t('productsSection.productTypes', { returnObjects: true });
  const brands = t('productsSection.brands', { returnObjects: true });
  
  // Aplicar filtros a los productos
  useEffect(() => {
    let results = [...productData];
    
    // Filtrar por búsqueda
    if (searchQuery) {
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtrar por tipo de mascota
    if (filters.petType.length > 0) {
      results = results.filter(product => 
        filters.petType.includes(product.petType)
      );
    }
    
    // Filtrar por tipo de producto
    if (filters.productType.length > 0) {
      results = results.filter(product => 
        filters.productType.includes(product.productType)
      );
    }
    
    // Filtrar por rango de precio
    results = results.filter(product => 
      product.price >= filters.priceRange.min && 
      product.price <= filters.priceRange.max
    );
    
    // Filtrar por marcas
    if (filters.brands.length > 0) {
      results = results.filter(product => 
        filters.brands.includes(product.brand)
      );
    }
    
    // Filtrar por calificación
    if (filters.rating) {
      results = results.filter(product => 
        product.rating >= filters.rating
      );
    }
    
    // Filtrar por disponibilidad
    if (filters.availability.length > 0) {
      results = results.filter(product => {
        if (filters.availability.includes('In Stock') && product.inStock) return true;
        if (filters.availability.includes('Out of Stock') && !product.inStock) return true;
        return false;
      });
    }
    
    // Ordenar productos
    switch (sortOption) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        results.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        results.sort((a, b) => b.soldCount - a.soldCount);
        break;
    }
    
    setFilteredProducts(results);
    setCurrentPage(1); // Resetear a la primera página cuando cambien los filtros
  }, [filters, sortOption, searchQuery]);
  
  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Cambiar página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  // Manejar cambios en los filtros
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };
  
  // Manejar cambios en la búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Manejo del cambio de ordenamiento
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  // Resetear todos los filtros
  const resetFilters = () => {
    setFilters({
      petType: [],
      productType: [],
      priceRange: { min: 0, max: 200 },
      brands: [],
      rating: null,
      availability: []
    });
    setSearchQuery('');
  };

  return (
    <section className={styles.productsSection} dir={dir}>
      <div className={styles.productsSectionHeader}>
        <h2 className={styles.sectionTitle}>{t('productsSection.title')}</h2>
        <p className={styles.sectionDescription}>
          {t('productsSection.description')}
        </p>
      </div>
      
      <div className={styles.productSearchBar}>
        <div className={styles.searchContainer}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder={t('productsSection.searchPlaceholder')} 
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button 
              className={styles.clearSearch} 
              onClick={() => setSearchQuery('')}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
        
        <button 
          className={styles.mobileFilterBtn}
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <FontAwesomeIcon icon={faFilter} />
          <span>{t('productsSection.filterButton')}</span>
        </button>
      </div>
      
      <div className={styles.productsContainer}>
        <FilterSidebar 
          filters={filters} 
          onFilterChange={handleFilterChange}
          petTypes={petTypes}
          productTypes={productTypes}
          brands={brands}
          onReset={resetFilters}
        />
        
        <div className={styles.productsWrapper}>
          <div className={styles.productsToolbar}>
            <div className={styles.resultsCount}>
              <span>{
                getResultsCountText(filteredProducts.length, t, isRTL)
              }</span>
            </div>
            
            <div className={styles.sortAndView}>
              <div className={styles.viewToggle}>
                <button 
                  className={`${styles.viewBtn} ${viewType === 'grid' ? styles.active : ''}`}
                  onClick={() => setViewType('grid')}
                >
                  <FontAwesomeIcon icon={faLayerGroup} />
                </button>
                <button 
                  className={`${styles.viewBtn} ${viewType === 'list' ? styles.active : ''}`}
                  onClick={() => setViewType('list')}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
              
              <div className={styles.sortContainer}>
                <span className={styles.sortLabel}>{t('productsSection.sortBy')} </span>
                <select 
                  className={styles.sortSelect}
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="popularity">{t('productsSection.sortOptions.popularity')}</option>
                  <option value="price-low">{t('productsSection.sortOptions.priceLow')}</option>
                  <option value="price-high">{t('productsSection.sortOptions.priceHigh')}</option>
                  <option value="newest">{t('productsSection.sortOptions.newest')}</option>
                  <option value="rating">{t('productsSection.sortOptions.topRated')}</option>
                </select>
              </div>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className={styles.noResults}>
              <FontAwesomeIcon icon={faSearch} className={styles.noResultsIcon} />
              <h3>{t('productsSection.noResults.title')}</h3>
              <p>{t('productsSection.noResults.message')}</p>
              <button className={styles.resetBtn} onClick={resetFilters}>
                {t('productsSection.resetFilters')}
              </button>
            </div>
          ) : (
            <div className={`${styles.productsGrid} ${viewType === 'list' ? styles.listView : ''}`}>
              {currentProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  viewType={viewType}
                />
              ))}
            </div>
          )}
          
          {filteredProducts.length > 0 && (
            <div className={styles.pagination}>
              <button 
                className={`${styles.paginationBtn} ${currentPage === 1 ? styles.disabled : ''}`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {t('productsSection.pagination.previous')}
              </button>
              
              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    className={`${styles.pageNumber} ${currentPage === number ? styles.activePage : ''}`}
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                ))}
              </div>
              
              <button 
                className={`${styles.paginationBtn} ${currentPage === totalPages ? styles.disabled : ''}`}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {t('productsSection.pagination.next')}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <MobileFilters 
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        petTypes={petTypes}
        productTypes={productTypes}
        brands={brands}
        onReset={resetFilters}
      />
    </section>
  );
};

export default ProductsSection;
