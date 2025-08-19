// Export all filter components
export { default as ProductFilters } from './ProductFilters';
export { default as CategoryFilter } from './CategoryFilter';
export { default as BrandFilter } from './BrandFilter';
export { default as PriceRangeFilter } from './PriceRangeFilter';
export { default as TagFilter } from './TagFilter';
export { default as StockFilter } from './StockFilter';
export { default as ProductSort } from './ProductSort';
export { default as ProductResults } from './ProductResults';

// Re-export types and utilities for convenience
export type {
  ProductFilters as ProductFiltersType,
  CategoryFilter as CategoryFilterType,
  BrandFilter as BrandFilterType,
  FilterOption,
  ProductFilterInput,
  SearchResultItem,
  LanguageCode,
  PaginationState,
  FilterState,
  SortOption,
} from '@/utils/vendure/types';

// Re-export hooks
export {
  useProductFilters,
  useFilteredProducts,
  useSortOptions,
  useProductCategories,
  useProductBrands,
  usePriceRange,
} from '@/utils/vendure/hooks';

// Re-export client utilities
export { vendureClient, queryVendure } from '@/utils/vendure/client';