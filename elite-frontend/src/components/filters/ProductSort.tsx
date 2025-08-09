'use client';

import React, { useState } from 'react';
import { ChevronDown, ArrowUpDown, SortAsc, SortDesc } from 'lucide-react';
import { useSortOptions } from '@/utils/vendure/hooks';
import { LanguageCode } from '@/utils/vendure/types';

interface ProductSortProps {
  currentSort: string;
  onSortChange: (sortValue: string) => void;
  language: LanguageCode;
  productsCount?: number;
  className?: string;
}

const ProductSort: React.FC<ProductSortProps> = ({
  currentSort,
  onSortChange,
  language,
  productsCount,
  className = '',
}) => {
  const { sortOptions, loading } = useSortOptions(language);
  const [isOpen, setIsOpen] = useState(false);

  const currentSortOption = sortOptions.find(option => option.value === currentSort);

  const getSortLabel = (option: any) => {
    return language === 'ar' ? option.nameAr : option.nameEn;
  };

  const getSortIcon = (sortValue: string) => {
    if (sortValue.includes('_ASC')) {
      return <SortAsc className="w-4 h-4" />;
    } else if (sortValue.includes('_DESC')) {
      return <SortDesc className="w-4 h-4" />;
    }
    return <ArrowUpDown className="w-4 h-4" />;
  };

  if (loading || sortOptions.length === 0) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="animate-pulse bg-gray-200 rounded h-10 w-32"></div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-3">
        {/* Products count */}
        {productsCount !== undefined && (
          <div className="text-sm text-gray-600">
            {language === 'ar' 
              ? `${productsCount.toLocaleString('ar-SA')} منتج`
              : `${productsCount.toLocaleString()} products`
            }
          </div>
        )}

        {/* Sort label */}
        <div className="text-sm text-gray-600">
          {language === 'ar' ? 'ترتيب بواسطة:' : 'Sort by:'}
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <div className="flex items-center gap-2">
              {getSortIcon(currentSort)}
              <span className="text-sm font-medium">
                {currentSortOption ? getSortLabel(currentSortOption) : 
                  (language === 'ar' ? 'اختر الترتيب' : 'Select sort')
                }
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`} />
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsOpen(false)}
              />
              
              {/* Menu */}
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <div className="p-2">
                  <div className="text-xs text-gray-500 px-3 py-2 border-b border-gray-100">
                    {language === 'ar' ? 'خيارات الترتيب' : 'Sort Options'}
                  </div>
                  
                  <div className="mt-1">
                    {sortOptions.map((option) => {
                      const isSelected = currentSort === option.value;
                      
                      return (
                        <button
                          key={option.key}
                          onClick={() => {
                            onSortChange(option.value);
                            setIsOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
                            isSelected 
                              ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className={`p-1 rounded ${
                            isSelected ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            {getSortIcon(option.value)}
                          </div>
                          
                          <div className="flex-1">
                            <div className={`text-sm font-medium ${
                              isSelected ? 'text-blue-700' : 'text-gray-700'
                            }`}>
                              {getSortLabel(option)}
                            </div>
                            
                            {/* Sort direction indicator */}
                            <div className="text-xs text-gray-500">
                              {option.value.includes('_ASC') 
                                ? (language === 'ar' ? 'تصاعدي' : 'Ascending')
                                : (language === 'ar' ? 'تنازلي' : 'Descending')
                              }
                            </div>
                          </div>
                          
                          {isSelected && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile-friendly sort chips */}
      <div className="md:hidden mt-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sortOptions.slice(0, 4).map((option) => {
            const isSelected = currentSort === option.value;
            
            return (
              <button
                key={option.key}
                onClick={() => onSortChange(option.value)}
                className={`flex-shrink-0 flex items-center gap-1 px-3 py-1 text-xs rounded-full border transition-colors ${
                  isSelected 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                }`}
              >
                {getSortIcon(option.value)}
                <span>{getSortLabel(option)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductSort;