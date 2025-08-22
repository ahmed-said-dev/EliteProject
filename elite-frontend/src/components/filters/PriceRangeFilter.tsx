'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DollarSign, Minus } from 'lucide-react';
import { PriceRange, LanguageCode } from '@/utils/vendure/types';

interface PriceRangeFilterProps {
  priceRange: PriceRange;
  selectedRange: { min: number; max: number };
  onRangeChange: (range: { min: number; max: number }) => void;
  language: LanguageCode;
  currency?: string;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  priceRange,
  selectedRange,
  onRangeChange,
  language,
  currency = 'USD',
}) => {
  const [localMin, setLocalMin] = useState(selectedRange.min.toString());
  const [localMax, setLocalMax] = useState(selectedRange.max.toString());
  const [isSliderActive, setIsSliderActive] = useState(false);

  // Update local state when props change
  useEffect(() => {
    setLocalMin(selectedRange.min.toString());
    setLocalMax(selectedRange.max.toString());
  }, [selectedRange]);

  // Debounced update function
  const debouncedUpdate = useCallback(
    debounce((min: number, max: number) => {
      onRangeChange({ min, max });
    }, 300),
    [onRangeChange]
  );

  const handleMinChange = (value: string) => {
    setLocalMin(value);
    const numValue = parseFloat(value) || 0;
    if (!isNaN(numValue) && numValue >= priceRange.min && numValue <= priceRange.max) {
      debouncedUpdate(numValue, parseFloat(localMax) || priceRange.max);
    }
  };

  const handleMaxChange = (value: string) => {
    setLocalMax(value);
    const numValue = parseFloat(value) || priceRange.max;
    if (!isNaN(numValue) && numValue >= priceRange.min && numValue <= priceRange.max) {
      debouncedUpdate(parseFloat(localMin) || priceRange.min, numValue);
    }
  };

  const handleSliderChange = (type: 'min' | 'max', value: number) => {
    if (type === 'min') {
      const newMin = Math.min(value, parseFloat(localMax) || priceRange.max);
      setLocalMin(newMin.toString());
      if (!isSliderActive) {
        debouncedUpdate(newMin, parseFloat(localMax) || priceRange.max);
      }
    } else {
      const newMax = Math.max(value, parseFloat(localMin) || priceRange.min);
      setLocalMax(newMax.toString());
      if (!isSliderActive) {
        debouncedUpdate(parseFloat(localMin) || priceRange.min, newMax);
      }
    }
  };

  const formatPrice = (price: number): string => {
    const formatted = new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price / 100); // Assuming prices are in cents

    return formatted;
  };

  const resetRange = () => {
    setLocalMin(priceRange.min.toString());
    setLocalMax(priceRange.max.toString());
    onRangeChange({ min: priceRange.min, max: priceRange.max });
  };

  const isRangeModified = () => {
    return selectedRange.min !== priceRange.min || selectedRange.max !== priceRange.max;
  };

  // Calculate slider percentages
  const getSliderPercentage = (value: number): number => {
    const total = priceRange.max - priceRange.min;
    return total > 0 ? ((value - priceRange.min) / total) * 100 : 0;
  };

  const minPercentage = getSliderPercentage(parseFloat(localMin) || priceRange.min);
  const maxPercentage = getSliderPercentage(parseFloat(localMax) || priceRange.max);

  if (priceRange.min === priceRange.max || priceRange.max === 0) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        {language === 'ar' 
          ? 'لا توجد معلومات أسعار متاحة' 
          : 'No price information available'
        }
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Price range header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
          </span>
        </div>
        {isRangeModified() && (
          <button
            onClick={resetRange}
            className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
          >
            {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
          </button>
        )}
      </div>

      {/* Price inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            {language === 'ar' ? 'الحد الأدنى' : 'Min'}
          </label>
          <div className="relative">
            <input
              type="number"
              value={localMin}
              onChange={(e) => handleMinChange(e.target.value)}
              min={priceRange.min}
              max={priceRange.max}
              step="1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={priceRange.min.toString()}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
              {currency}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">
            {language === 'ar' ? 'الحد الأقصى' : 'Max'}
          </label>
          <div className="relative">
            <input
              type="number"
              value={localMax}
              onChange={(e) => handleMaxChange(e.target.value)}
              min={priceRange.min}
              max={priceRange.max}
              step="1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={priceRange.max.toString()}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
              {currency}
            </span>
          </div>
        </div>
      </div>

      {/* Dual range slider */}
      <div className="relative px-2 py-4">
        {/* Slider track */}
        <div className="relative h-2 bg-gray-200 rounded-full">
          {/* Active range */}
          <div
            className="absolute h-2 bg-blue-500 rounded-full"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`,
            }}
          />
          
          {/* Min slider */}
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={parseFloat(localMin) || priceRange.min}
            onChange={(e) => handleSliderChange('min', parseFloat(e.target.value))}
            onMouseDown={() => setIsSliderActive(true)}
            onMouseUp={() => {
              setIsSliderActive(false);
              debouncedUpdate(parseFloat(localMin) || priceRange.min, parseFloat(localMax) || priceRange.max);
            }}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
            style={{ zIndex: 1 }}
          />
          
          {/* Max slider */}
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            value={parseFloat(localMax) || priceRange.max}
            onChange={(e) => handleSliderChange('max', parseFloat(e.target.value))}
            onMouseDown={() => setIsSliderActive(true)}
            onMouseUp={() => {
              setIsSliderActive(false);
              debouncedUpdate(parseFloat(localMin) || priceRange.min, parseFloat(localMax) || priceRange.max);
            }}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
            style={{ zIndex: 2 }}
          />
        </div>

        {/* Price labels */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>{formatPrice(priceRange.min)}</span>
          <span>{formatPrice(priceRange.max)}</span>
        </div>
      </div>

      {/* Selected range display */}
      <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium text-gray-700">
          {formatPrice(parseFloat(localMin) || priceRange.min)}
        </span>
        <Minus className="w-3 h-3 text-gray-400" />
        <span className="text-sm font-medium text-gray-700">
          {formatPrice(parseFloat(localMax) || priceRange.max)}
        </span>
      </div>

      {/* Quick preset ranges */}
      <div className="grid grid-cols-3 gap-2">
        {generatePresetRanges(priceRange).map((preset, index) => {
          const isActive = 
            Math.abs((parseFloat(localMin) || priceRange.min) - preset.min) < 1 && 
            Math.abs((parseFloat(localMax) || priceRange.max) - preset.max) < 1;

          return (
            <button
              key={index}
              onClick={() => {
                setLocalMin(preset.min.toString());
                setLocalMax(preset.max.toString());
                onRangeChange({ min: preset.min, max: preset.max });
              }}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                isActive 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {language === 'ar' ? preset.labelAr : preset.labelEn}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Helper function to generate preset price ranges
function generatePresetRanges(priceRange: PriceRange) {
  const { min, max } = priceRange;
  const range = max - min;
  const third = range / 3;

  return [
    {
      min: min,
      max: min + third,
      labelEn: 'Low',
      labelAr: 'منخفض'
    },
    {
      min: min + third,
      max: min + (third * 2),
      labelEn: 'Mid',
      labelAr: 'متوسط'
    },
    {
      min: min + (third * 2),
      max: max,
      labelEn: 'High',
      labelAr: 'مرتفع'
    }
  ];
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default PriceRangeFilter;