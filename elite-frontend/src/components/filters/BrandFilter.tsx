'use client';

import React, { useState, useMemo } from 'react';
import { Search, Star, X } from 'lucide-react';
import { BrandFilter as BrandFilterType, LanguageCode } from '@/utils/vendure/types';

interface BrandFilterProps {
  brands: BrandFilterType[];
  selectedBrands: string[];
  onSelectionChange: (brands: string[]) => void;
  language: LanguageCode;
  maxHeight?: string;
  showSearch?: boolean;
}

const BrandFilter: React.FC<BrandFilterProps> = ({
  brands,
  selectedBrands,
  onSelectionChange,
  language,
  maxHeight = 'max-h-64',
  showSearch = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  const getBrandName = (brand: BrandFilterType): string => {
    return language === 'ar' ? brand.nameAr || brand.name : brand.name;
  };

  // Filter and sort brands
  const filteredBrands = useMemo(() => {
    let filtered = brands;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(brand => {
        const name = getBrandName(brand);
        return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               brand.code.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Show only selected brands if toggle is on
    if (showOnlySelected) {
      filtered = filtered.filter(brand => selectedBrands.includes(brand.id));
    }

    // Sort by name, with selected brands first
    return filtered.sort((a, b) => {
      const aSelected = selectedBrands.includes(a.id);
      const bSelected = selectedBrands.includes(b.id);
      
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      
      const aName = getBrandName(a);
      const bName = getBrandName(b);
      return aName.localeCompare(bName);
    });
  }, [brands, searchTerm, selectedBrands, showOnlySelected, language]);

  const handleBrandToggle = (brandId: string) => {
    const isSelected = selectedBrands.includes(brandId);
    let newSelection: string[];

    if (isSelected) {
      newSelection = selectedBrands.filter(id => id !== brandId);
    } else {
      newSelection = [...selectedBrands, brandId];
    }

    onSelectionChange(newSelection);
  };

  const clearSelection = () => {
    onSelectionChange([]);
  };

  const selectAll = () => {
    const allBrandIds = filteredBrands.map(brand => brand.id);
    onSelectionChange(allBrandIds);
  };

  if (brands.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        {language === 'ar' 
          ? 'لا توجد علامات تجارية متاحة' 
          : 'No brands available'
        }
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Search and controls */}
      {showSearch && (
        <div className="space-y-2">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                language === 'ar' 
                  ? 'ابحث عن علامة تجارية...' 
                  : 'Search brands...'
              }
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter controls */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOnlySelected(!showOnlySelected)}
                className={`px-2 py-1 rounded transition-colors ${
                  showOnlySelected 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {language === 'ar' ? 'المحددة فقط' : 'Selected only'}
              </button>
              <span className="text-gray-500">
                {language === 'ar' 
                  ? `${filteredBrands.length} من ${brands.length}` 
                  : `${filteredBrands.length} of ${brands.length}`
                }
              </span>
            </div>

            <div className="flex items-center gap-2">
              {selectedBrands.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  {language === 'ar' ? 'مسح الكل' : 'Clear'}
                </button>
              )}
              
              {selectedBrands.length !== filteredBrands.length && filteredBrands.length > 0 && (
                <button
                  onClick={selectAll}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {language === 'ar' ? 'اختيار الكل' : 'Select all'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Brands list */}
      <div className={`${maxHeight} overflow-y-auto space-y-1`}>
        {filteredBrands.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            {language === 'ar' 
              ? 'لا توجد علامات تجارية مطابقة' 
              : 'No matching brands found'
            }
          </div>
        ) : (
          filteredBrands.map(brand => {
            const isSelected = selectedBrands.includes(brand.id);
            const brandName = getBrandName(brand);

            return (
              <div
                key={brand.id}
                className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer ${
                  isSelected ? 'bg-blue-50 border border-blue-200' : ''
                }`}
                onClick={() => handleBrandToggle(brand.id)}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  id={`brand-${brand.id}`}
                  checked={isSelected}
                  onChange={() => handleBrandToggle(brand.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />

                {/* Brand info */}
                <div className="flex items-center justify-between flex-1 min-w-0">
                  <label
                    htmlFor={`brand-${brand.id}`}
                    className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer"
                  >
                    {/* Brand icon/initial */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      isSelected 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {brandName.charAt(0).toUpperCase()}
                    </div>

                    {/* Brand name */}
                    <span className={`text-sm truncate ${
                      isSelected ? 'font-medium text-blue-700' : 'text-gray-700'
                    }`}>
                      {brandName}
                    </span>

                    {/* Popular brand indicator */}
                    {brand.count > 50 && (
                      <Star className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                    )}
                  </label>

                  {/* Product count */}
                  {brand.count > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      isSelected 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {brand.count}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Selected brands summary */}
      {selectedBrands.length > 0 && !showOnlySelected && (
        <div className="pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-2">
            {language === 'ar' 
              ? `تم اختيار ${selectedBrands.length} علامة تجارية` 
              : `${selectedBrands.length} brands selected`
            }
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedBrands.slice(0, 5).map(brandId => {
              const brand = brands.find(b => b.id === brandId);
              if (!brand) return null;
              
              return (
                <span
                  key={brandId}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  {getBrandName(brand)}
                  <button
                    onClick={() => handleBrandToggle(brandId)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
            {selectedBrands.length > 5 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{selectedBrands.length - 5} {language === 'ar' ? 'أخرى' : 'more'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandFilter;