'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Filter, X, Search, DollarSign, Tag, Package } from 'lucide-react';
import { useProductFilters } from '@/utils/vendure/hooks';
import { FilterState, LanguageCode, ProductFilterInput } from '@/utils/vendure/types';
import CategoryFilter from './CategoryFilter';
import BrandFilter from './BrandFilter';
import PriceRangeFilter from './PriceRangeFilter';
import TagFilter from './TagFilter';
import StockFilter from './StockFilter';

interface ProductFiltersProps {
  onFilterChange: (filters: ProductFilterInput) => void;
  language?: LanguageCode;
  collectionSlug?: string;
  className?: string;
  isMobile?: boolean;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFilterChange,
  language = 'en',
  collectionSlug,
  className = '',
  isMobile = false,
}) => {
  const { filters, loading, error } = useProductFilters(collectionSlug, language);
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    selectedCategories: [],
    selectedBrands: [],
    priceRange: { min: 0, max: 0 },
    selectedTags: [],
    inStockOnly: false,
    sortBy: 'name_ASC',
    searchTerm: '',
  });

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
    tags: false,
    stock: false,
  });

  // Update price range when filters load
  useEffect(() => {
    if (filters?.priceRange) {
      setActiveFilters(prev => ({
        ...prev,
        priceRange: {
          min: filters.priceRange.min,
          max: filters.priceRange.max,
        },
      }));
    }
  }, [filters]);

  // Send filter changes to parent
  useEffect(() => {
    const filterInput: ProductFilterInput = {
      categoryIds: activeFilters.selectedCategories,
      brandIds: activeFilters.selectedBrands,
      minPrice: activeFilters.priceRange.min > 0 ? activeFilters.priceRange.min : undefined,
      maxPrice: activeFilters.priceRange.max > 0 ? activeFilters.priceRange.max : undefined,
      inStock: activeFilters.inStockOnly || undefined,
      tags: activeFilters.selectedTags,
      search: activeFilters.searchTerm || undefined,
      collectionSlug,
    };

    onFilterChange(filterInput);
  }, [activeFilters, onFilterChange, collectionSlug]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setActiveFilters(prev => ({ ...prev, ...newFilters }));
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      selectedCategories: [],
      selectedBrands: [],
      priceRange: filters?.priceRange ? { min: filters.priceRange.min, max: filters.priceRange.max } : { min: 0, max: 0 },
      selectedTags: [],
      inStockOnly: false,
      sortBy: 'name_ASC',
      searchTerm: '',
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.selectedCategories.length > 0) count++;
    if (activeFilters.selectedBrands.length > 0) count++;
    if (activeFilters.priceRange.min > 0 || activeFilters.priceRange.max > 0) count++;
    if (activeFilters.selectedTags.length > 0) count++;
    if (activeFilters.inStockOnly) count++;
    if (activeFilters.searchTerm) count++;
    return count;
  };

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <p className="text-red-600 text-sm">
          {language === 'ar' ? 'خطأ في تحميل الفلاتر' : 'Error loading filters'}
        </p>
      </div>
    );
  }

  const SectionHeader: React.FC<{
    title: string;
    icon: React.ReactNode;
    section: keyof typeof expandedSections;
    count?: number;
  }> = ({ title, icon, section, count }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full p-3 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium text-gray-900">{title}</span>
        {count !== undefined && count > 0 && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {count}
          </span>
        )}
      </div>
      {expandedSections[section] ? (
        <ChevronUp className="w-4 h-4 text-gray-500" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-500" />
      )}
    </button>
  );

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* Mobile Header */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-4 border-b border-gray-200"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <span className="font-medium">
              {language === 'ar' ? 'فلاتر المنتجات' : 'Product Filters'}
            </span>
            {getActiveFilterCount() > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-lg text-gray-900">
              {language === 'ar' ? 'فلاتر المنتجات' : 'Product Filters'}
            </h3>
          </div>
          {getActiveFilterCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              <X className="w-4 h-4" />
              {language === 'ar' ? 'مسح الكل' : 'Clear All'}
            </button>
          )}
        </div>
      )}

      {/* Filter Content */}
      {(isOpen || !isMobile) && (
        <div className={`${loading ? 'opacity-50 pointer-events-none' : ''}`}>
          {loading && (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {filters && (
            <div className="divide-y divide-gray-200">
              {/* Search Filter */}
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={activeFilters.searchTerm}
                    onChange={(e) => handleFilterChange({ searchTerm: e.target.value })}
                    placeholder={language === 'ar' ? 'ابحث عن المنتجات...' : 'Search products...'}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              {filters.categories.length > 0 && (
                <div>
                  <SectionHeader
                    title={language === 'ar' ? 'الفئات' : 'Categories'}
                    icon={<Tag className="w-4 h-4 text-gray-600" />}
                    section="categories"
                    count={activeFilters.selectedCategories.length}
                  />
                  {expandedSections.categories && (
                    <div className="p-4">
                      <CategoryFilter
                        categories={filters.categories}
                        selectedCategories={activeFilters.selectedCategories}
                        onSelectionChange={(categories) => handleFilterChange({ selectedCategories: categories })}
                        language={language}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Brands */}
              {filters.brands.length > 0 && (
                <div>
                  <SectionHeader
                    title={language === 'ar' ? 'العلامات التجارية' : 'Brands'}
                    icon={<Package className="w-4 h-4 text-gray-600" />}
                    section="brands"
                    count={activeFilters.selectedBrands.length}
                  />
                  {expandedSections.brands && (
                    <div className="p-4">
                      <BrandFilter
                        brands={filters.brands}
                        selectedBrands={activeFilters.selectedBrands}
                        onSelectionChange={(brands) => handleFilterChange({ selectedBrands: brands })}
                        language={language}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Price Range */}
              <div>
                <SectionHeader
                  title={language === 'ar' ? 'نطاق السعر' : 'Price Range'}
                  icon={<DollarSign className="w-4 h-4 text-gray-600" />}
                  section="price"
                />
                {expandedSections.price && (
                  <div className="p-4">
                    <PriceRangeFilter
                      priceRange={filters.priceRange}
                      selectedRange={activeFilters.priceRange}
                      onRangeChange={(range) => handleFilterChange({ priceRange: range })}
                      language={language}
                    />
                  </div>
                )}
              </div>

              {/* Stock Status */}
              <div>
                <SectionHeader
                  title={language === 'ar' ? 'حالة المخزون' : 'Stock Status'}
                  icon={<Package className="w-4 h-4 text-gray-600" />}
                  section="stock"
                />
                {expandedSections.stock && (
                  <div className="p-4">
                    <StockFilter
                      stockStatus={filters.stockStatus}
                      inStockOnly={activeFilters.inStockOnly}
                      onStockFilterChange={(inStock) => handleFilterChange({ inStockOnly: inStock })}
                      language={language}
                    />
                  </div>
                )}
              </div>

              {/* Tags */}
              {filters.tags.length > 0 && (
                <div>
                  <SectionHeader
                    title={language === 'ar' ? 'التصنيفات' : 'Tags'}
                    icon={<Tag className="w-4 h-4 text-gray-600" />}
                    section="tags"
                    count={activeFilters.selectedTags.length}
                  />
                  {expandedSections.tags && (
                    <div className="p-4">
                      <TagFilter
                        tags={filters.tags}
                        selectedTags={activeFilters.selectedTags}
                        onSelectionChange={(tags) => handleFilterChange({ selectedTags: tags })}
                        language={language}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;