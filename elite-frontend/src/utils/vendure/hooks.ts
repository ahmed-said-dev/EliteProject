/**
 * Custom React Hooks for Vendure Product Filtering
 * Elite Veterinary Project
 */

import { useState, useEffect, useCallback } from 'react';
import { queryVendure } from './client';
import {
  GET_PRODUCT_FILTERS,
  GET_FILTERED_PRODUCTS,
  GET_SORT_OPTIONS,
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCT_BRANDS,
  GET_PRICE_RANGE,
} from './queries';
import {
  ProductFilters,
  FilteredProductsResult,
  SortOption,
  CategoryFilter,
  BrandFilter,
  PriceRange,
  ProductFilterInput,
  SearchInput,
  LanguageCode,
  UseProductFiltersReturn,
  UseFilteredProductsReturn,
} from './types';

/**
 * Hook to fetch all available product filters
 */
export function useProductFilters(
  collectionSlug?: string,
  languageCode: LanguageCode = 'en'
): UseProductFiltersReturn {
  const [filters, setFilters] = useState<ProductFilters | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFilters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await queryVendure<{ productFilters: ProductFilters }>(
        GET_PRODUCT_FILTERS,
        { collectionSlug, languageCode },
        { languageCode }
      );
      
      setFilters(data.productFilters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch filters');
      console.error('Error fetching product filters:', err);
    } finally {
      setLoading(false);
    }
  }, [collectionSlug, languageCode]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  return {
    filters,
    loading,
    error,
    refetch: fetchFilters,
  };
}

/**
 * Hook to fetch filtered products
 */
export function useFilteredProducts(
  searchInput: SearchInput,
  filterInput?: ProductFilterInput,
  languageCode: LanguageCode = 'en'
): UseFilteredProductsReturn {
  const [products, setProducts] = useState<FilteredProductsResult['items']>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [facetValues, setFacetValues] = useState<FilteredProductsResult['facetValues']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (newFilters?: ProductFilterInput) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await queryVendure<{ filteredProducts: FilteredProductsResult }>(
        GET_FILTERED_PRODUCTS,
        { 
          input: searchInput, 
          filters: newFilters || filterInput 
        },
        { languageCode }
      );
      
      setProducts(data.filteredProducts.items);
      setTotalItems(data.filteredProducts.totalItems);
      setFacetValues(data.filteredProducts.facetValues);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('Error fetching filtered products:', err);
    } finally {
      setLoading(false);
    }
  }, [searchInput, filterInput, languageCode]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    totalItems,
    facetValues,
    loading,
    error,
    refetch: fetchProducts,
  };
}

/**
 * Hook to fetch sort options
 */
export function useSortOptions(languageCode: LanguageCode = 'en') {
  const [sortOptions, setSortOptions] = useState<SortOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSortOptions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await queryVendure<{ sortOptions: SortOption[] }>(
          GET_SORT_OPTIONS,
          { languageCode },
          { languageCode }
        );
        
        setSortOptions(data.sortOptions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch sort options');
        console.error('Error fetching sort options:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSortOptions();
  }, [languageCode]);

  return { sortOptions, loading, error };
}

/**
 * Hook to fetch product categories
 */
export function useProductCategories(
  parentId?: string,
  languageCode: LanguageCode = 'en'
) {
  const [categories, setCategories] = useState<CategoryFilter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await queryVendure<{ productCategories: CategoryFilter[] }>(
          GET_PRODUCT_CATEGORIES,
          { parentId, languageCode },
          { languageCode }
        );
        
        setCategories(data.productCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [parentId, languageCode]);

  return { categories, loading, error };
}

/**
 * Hook to fetch product brands
 */
export function useProductBrands(
  collectionSlug?: string,
  languageCode: LanguageCode = 'en'
) {
  const [brands, setBrands] = useState<BrandFilter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await queryVendure<{ productBrands: BrandFilter[] }>(
          GET_PRODUCT_BRANDS,
          { collectionSlug, languageCode },
          { languageCode }
        );
        
        setBrands(data.productBrands);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch brands');
        console.error('Error fetching brands:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, [collectionSlug, languageCode]);

  return { brands, loading, error };
}

/**
 * Hook to fetch price range
 */
export function usePriceRange(
  categoryIds?: string[],
  brandIds?: string[],
  collectionSlug?: string
) {
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPriceRange = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await queryVendure<{ productPriceRange: PriceRange }>(
          GET_PRICE_RANGE,
          { categoryIds, brandIds, collectionSlug }
        );
        
        setPriceRange(data.productPriceRange);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch price range');
        console.error('Error fetching price range:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceRange();
  }, [categoryIds, brandIds, collectionSlug]);

  return { priceRange, loading, error };
}