/**
 * TypeScript interfaces for Vendure API responses
 * Elite Veterinary Project - Product Filtering
 */

// Basic types
export type LanguageCode = 'en' | 'ar';

export interface FilterOption {
  id: string;
  name: string;
  nameAr: string;
  code: string;
  count: number;
}

export interface CategoryFilter extends FilterOption {
  parentId?: string;
  children?: CategoryFilter[];
}

export interface BrandFilter extends FilterOption {
  slug: string;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

export interface StockStatus {
  inStock: boolean;
  outOfStock: boolean;
  lowStock: boolean;
}

export interface ProductFilters {
  categories: CategoryFilter[];
  brands: BrandFilter[];
  priceRange: PriceRange;
  stockStatus: StockStatus;
  tags: FilterOption[];
}

export interface SortOption {
  key: string;
  value: string;
  nameEn: string;
  nameAr: string;
}

// Search and product types
export interface ProductAsset {
  id: string;
  preview: string;
  source: string;
}

export interface Price {
  min?: number;
  max?: number;
  value?: number;
}

export interface FacetValue {
  id: string;
  name: string;
  code?: string;
  facet: {
    id: string;
    name: string;
    code: string;
  };
}

export interface SearchResultItem {
  productId: string;
  slug: string;
  productName: string;
  productAsset?: ProductAsset;
  price: Price;
  priceWithTax: Price;
  currencyCode: string;
  facetValues: FacetValue[];
  score?: number;
}

export interface FacetValueResult {
  facetValue: FacetValue;
  count: number;
}

export interface SearchResult {
  items: SearchResultItem[];
  totalItems: number;
  facetValues: FacetValueResult[];
}

export interface FilteredProductsResult extends SearchResult {}

// Filter input types
export interface ProductFilterInput {
  categoryIds?: string[];
  brandIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  tags?: string[];
  search?: string;
  collectionSlug?: string;
  facetValueIds?: string[];
}

export interface SearchInput {
  term?: string;
  facetValueFilters?: Array<{ and?: string; or?: string[] }>;
  facetValueIds?: string[];
  facetValueOperator?: 'AND' | 'OR';
  collectionId?: string;
  collectionSlug?: string;
  groupByProduct?: boolean;
  take?: number;
  skip?: number;
  sort?: {
    name?: 'ASC' | 'DESC';
    price?: 'ASC' | 'DESC';
    createdAt?: 'ASC' | 'DESC';
  };
  priceRange?: {
    min: number;
    max: number;
  };
}

// Product variant type
export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  priceWithTax: number;
  currencyCode: string;
  stockLevel: string;
  featuredAsset?: ProductAsset;
}

// Full product type
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  featuredAsset?: ProductAsset;
  assets: ProductAsset[];
  variants: ProductVariant[];
  facetValues: FacetValue[];
  collections: Array<{
    id: string;
    name: string;
    slug: string;
    breadcrumbs: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  }>;
}

// UI State types for components
export interface FilterState {
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  selectedTags: string[];
  inStockOnly: boolean;
  sortBy: string;
  searchTerm: string;
}

export interface FilterComponentProps {
  filters: ProductFilters;
  activeFilters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  language: LanguageCode;
  loading?: boolean;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

// Hook return types
export interface UseProductFiltersReturn {
  filters: ProductFilters | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export interface UseFilteredProductsReturn {
  products: SearchResultItem[];
  totalItems: number;
  facetValues: FacetValueResult[];
  loading: boolean;
  error: string | null;
  refetch: (newFilters?: ProductFilterInput) => Promise<void>;
}