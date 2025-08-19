'use client';

import React from 'react';
import { Package, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { StockStatus, LanguageCode } from '@/utils/vendure/types';

interface StockFilterProps {
  stockStatus: StockStatus;
  inStockOnly: boolean;
  onStockFilterChange: (inStockOnly: boolean) => void;
  language: LanguageCode;
}

const StockFilter: React.FC<StockFilterProps> = ({
  stockStatus,
  inStockOnly,
  onStockFilterChange,
  language,
}) => {
  const stockOptions = [
    {
      key: 'inStock',
      available: stockStatus.inStock,
      icon: CheckCircle,
      labelEn: 'In Stock',
      labelAr: 'متوفر',
      descriptionEn: 'Products available for immediate purchase',
      descriptionAr: 'منتجات متاحة للشراء الفوري',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      key: 'lowStock',
      available: stockStatus.lowStock,
      icon: AlertTriangle,
      labelEn: 'Low Stock',
      labelAr: 'مخزون قليل',
      descriptionEn: 'Limited quantities available',
      descriptionAr: 'كميات محدودة متاحة',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
    {
      key: 'outOfStock',
      available: stockStatus.outOfStock,
      icon: XCircle,
      labelEn: 'Out of Stock',
      labelAr: 'نفد المخزون',
      descriptionEn: 'Currently unavailable',
      descriptionAr: 'غير متاح حالياً',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
  ];

  const availableOptions = stockOptions.filter(option => option.available);

  if (availableOptions.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        {language === 'ar' 
          ? 'لا توجد معلومات مخزون متاحة' 
          : 'No stock information available'
        }
      </div>
    );
  }

  // If only one stock status is available, show simple toggle
  if (availableOptions.length === 1 && availableOptions[0].key === 'inStock') {
    const option = availableOptions[0];
    const Icon = option.icon;

    return (
      <div className="space-y-3">
        <div
          className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
            inStockOnly 
              ? `${option.bgColor} ${option.borderColor}` 
              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
          }`}
          onClick={() => onStockFilterChange(!inStockOnly)}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${inStockOnly ? option.bgColor : 'bg-gray-100'}`}>
              <Icon className={`w-4 h-4 ${inStockOnly ? option.color : 'text-gray-500'}`} />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-medium text-sm ${
                  inStockOnly ? option.color : 'text-gray-700'
                }`}>
                  {language === 'ar' ? option.labelAr : option.labelEn}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {language === 'ar' ? option.descriptionAr : option.descriptionEn}
              </p>
            </div>
          </div>
          
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onStockFilterChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>

        {inStockOnly && (
          <div className="text-xs text-gray-500 px-3">
            {language === 'ar' 
              ? 'سيتم عرض المنتجات المتوفرة فقط' 
              : 'Only available products will be shown'
            }
          </div>
        )}
      </div>
    );
  }

  // Multiple stock statuses available - show comprehensive options
  return (
    <div className="space-y-3">
      {/* Header with stock overview */}
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <Package className="w-4 h-4 text-gray-600" />
        <span className="font-medium text-sm text-gray-700">
          {language === 'ar' ? 'حالة المخزون' : 'Stock Status'}
        </span>
      </div>

      {/* Quick filter toggle */}
      <div
        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
          inStockOnly 
            ? 'bg-blue-50 border-blue-200' 
            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
        }`}
        onClick={() => onStockFilterChange(!inStockOnly)}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${inStockOnly ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <CheckCircle className={`w-4 h-4 ${inStockOnly ? 'text-blue-600' : 'text-gray-500'}`} />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-medium text-sm ${
                inStockOnly ? 'text-blue-700' : 'text-gray-700'
              }`}>
                {language === 'ar' ? 'المتوفر فقط' : 'In Stock Only'}
              </span>
              {inStockOnly && (
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  {language === 'ar' ? 'فعال' : 'Active'}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {language === 'ar' 
                ? 'إخفاء المنتجات غير المتوفرة' 
                : 'Hide unavailable products'
              }
            </p>
          </div>
        </div>
        
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onStockFilterChange(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
      </div>

      {/* Stock status breakdown */}
      <div className="space-y-2">
        <div className="text-xs font-medium text-gray-600 mb-2">
          {language === 'ar' ? 'تفاصيل المخزون:' : 'Stock Breakdown:'}
        </div>
        
        {availableOptions.map(option => {
          const Icon = option.icon;
          
          return (
            <div
              key={option.key}
              className={`flex items-center justify-between p-2 rounded-md border ${option.bgColor} ${option.borderColor}`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-3 h-3 ${option.color}`} />
                <span className={`text-xs font-medium ${option.color}`}>
                  {language === 'ar' ? option.labelAr : option.labelEn}
                </span>
              </div>
              
              <div className={`w-2 h-2 rounded-full ${option.color.replace('text-', 'bg-')}`} />
            </div>
          );
        })}
      </div>

      {/* Filter status message */}
      {inStockOnly ? (
        <div className="p-2 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-blue-700 font-medium">
              {language === 'ar' 
                ? 'عرض المنتجات المتوفرة فقط' 
                : 'Showing available products only'
              }
            </span>
          </div>
        </div>
      ) : (
        <div className="p-2 bg-gray-50 border border-gray-200 rounded-md">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-600">
              {language === 'ar' 
                ? 'عرض جميع المنتجات بغض النظر عن المخزون' 
                : 'Showing all products regardless of stock'
              }
            </span>
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div className="flex gap-2 pt-2 border-t border-gray-200">
        <button
          onClick={() => onStockFilterChange(true)}
          disabled={inStockOnly}
          className={`flex-1 px-3 py-2 text-xs rounded-md transition-colors ${
            inStockOnly
              ? 'bg-blue-100 text-blue-700 cursor-not-allowed'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {language === 'ar' ? 'المتوفر فقط' : 'Available Only'}
        </button>
        
        <button
          onClick={() => onStockFilterChange(false)}
          disabled={!inStockOnly}
          className={`flex-1 px-3 py-2 text-xs rounded-md transition-colors ${
            !inStockOnly
              ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {language === 'ar' ? 'عرض الكل' : 'Show All'}
        </button>
      </div>
    </div>
  );
};

export default StockFilter;