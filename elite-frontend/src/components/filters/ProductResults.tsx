'use client';

import React, { useState } from 'react';
import { Grid, List, Eye, ShoppingCart, Heart, Star, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { SearchResultItem, LanguageCode, PaginationState } from '@/utils/vendure/types';

interface ProductResultsProps {
  products: SearchResultItem[];
  loading: boolean;
  language: LanguageCode;
  pagination: PaginationState;
  onPageChange: (page: number) => void;
  onAddToCart?: (productId: string, variantId?: string) => void;
  onAddToWishlist?: (productId: string) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  className?: string;
}

const ProductResults: React.FC<ProductResultsProps> = ({
  products,
  loading,
  language,
  pagination,
  onPageChange,
  onAddToCart,
  onAddToWishlist,
  viewMode = 'grid',
  onViewModeChange,
  className = '',
}) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const formatPrice = (price: number | undefined, currency: string = 'USD'): string => {
    if (!price) return '';
    
    const formatted = new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price / 100); // Assuming prices are in cents

    return formatted;
  };

  const getProductPrice = (product: SearchResultItem) => {
    const price = product.price;
    const priceWithTax = product.priceWithTax;
    
    if (price && 'min' in price && price.min !== price.max) {
      return `${formatPrice(price.min, product.currencyCode)} - ${formatPrice(price.max, product.currencyCode)}`;
    }
    
    const singlePrice = price && 'value' in price ? price.value : price?.min;
    return formatPrice(singlePrice, product.currencyCode);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(pagination.total / pagination.limit);
    const currentPage = pagination.page;
    
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      
      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          {language === 'ar' ? 'السابق' : 'Previous'}
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
              disabled={typeof page !== 'number'}
              className={`w-10 h-10 text-sm rounded-lg transition-colors ${
                page === currentPage
                  ? 'bg-blue-500 text-white'
                  : typeof page === 'number'
                  ? 'text-gray-600 hover:bg-gray-100'
                  : 'text-gray-400 cursor-default'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
            currentPage === totalPages
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {language === 'ar' ? 'التالي' : 'Next'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const renderProductCard = (product: SearchResultItem) => {
    const isHovered = hoveredProduct === product.productId;
    
    if (viewMode === 'list') {
      return (
        <div
          key={product.productId}
          className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          onMouseEnter={() => setHoveredProduct(product.productId)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          {/* Product image */}
          <div className="relative w-24 h-24 flex-shrink-0">
            {product.productAsset ? (
              <img
                src={product.productAsset.preview}
                alt={product.productName}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">
                  {product.productName}
                </h3>
                
                {/* Price */}
                <div className="mt-1">
                  <span className="text-lg font-bold text-gray-900">
                    {getProductPrice(product)}
                  </span>
                </div>

                {/* Facet values (tags) */}
                {product.facetValues.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.facetValues.slice(0, 3).map((facet) => (
                      <span
                        key={facet.id}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {facet.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 ml-4">
                {onAddToWishlist && (
                  <button
                    onClick={() => onAddToWishlist(product.productId)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                )}
                
                <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                  <Eye className="w-5 h-5" />
                </button>
                
                {onAddToCart && (
                  <button
                    onClick={() => onAddToCart(product.productId)}
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Grid view
    return (
      <div
        key={product.productId}
        className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
        onMouseEnter={() => setHoveredProduct(product.productId)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        {/* Product image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {product.productAsset ? (
            <img
              src={product.productAsset.preview}
              alt={product.productName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
          )}

          {/* Overlay actions */}
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-500 transition-colors">
                <Eye className="w-5 h-5" />
              </button>
              
              {onAddToWishlist && (
                <button
                  onClick={() => onAddToWishlist(product.productId)}
                  className="p-2 bg-white rounded-full text-gray-700 hover:text-red-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Score badge */}
          {product.score && product.score > 0.8 && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" />
              {language === 'ar' ? 'الأفضل' : 'Best Match'}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
            {product.productName}
          </h3>

          {/* Facet values */}
          {product.facetValues.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.facetValues.slice(0, 2).map((facet) => (
                <span
                  key={facet.id}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {facet.name}
                </span>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-gray-900">
              {getProductPrice(product)}
            </span>
          </div>

          {/* Add to cart button */}
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product.productId)}
              className="w-full py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              {language === 'ar' ? 'أضف للسلة' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {language === 'ar' ? 'لا توجد منتجات' : 'No products found'}
        </h3>
        <p className="text-gray-500">
          {language === 'ar' 
            ? 'حاول تعديل الفلاتر أو البحث بكلمات مختلفة'
            : 'Try adjusting your filters or search terms'
          }
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* View mode toggle */}
      {onViewModeChange && (
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            {language === 'ar' 
              ? `عرض ${(pagination.page - 1) * pagination.limit + 1}-${Math.min(pagination.page * pagination.limit, pagination.total)} من ${pagination.total}`
              : `Showing ${(pagination.page - 1) * pagination.limit + 1}-${Math.min(pagination.page * pagination.limit, pagination.total)} of ${pagination.total}`
            }
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Products grid/list */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
      }>
        {products.map(renderProductCard)}
      </div>

      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default ProductResults;