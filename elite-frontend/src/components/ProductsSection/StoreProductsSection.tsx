import React from 'react';
import { useStoreProducts } from '@/hooks/useStoreProducts';
import { useLanguage } from '@/context/LanguageContext';
import StoreProductCard from './StoreProductCard';

export default function StoreProductsSection() {
  const { products, loading, error, params, setFilter } = useStoreProducts({ page: 1, limit: 10, sortBy: 'createdAt', sortOrder: 'DESC' });
  const { t, isRTL } = useLanguage();
  const dir = isRTL ? 'rtl' : 'ltr';

  return (
    <div className="space-y-6" dir={dir}>
      {/* Advanced Filters */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-purple-200/30 p-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          {t('storeProducts.filters.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('storeProducts.filters.searchName')}
            </label>
            <div className="relative">
              <input 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                placeholder={t('storeProducts.filters.searchPlaceholder')}
                value={params.search || ''} 
                onChange={(e) => setFilter({ search: e.target.value })} 
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('storeProducts.filters.priceFrom')}
            </label>
            <input 
              type="number" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
              placeholder="0" 
              value={params.minPrice ?? ''} 
              onChange={(e) => setFilter({ minPrice: e.target.value ? Number(e.target.value) : undefined })} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('storeProducts.filters.priceTo')}
            </label>
            <input 
              type="number" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
              placeholder="1000" 
              value={params.maxPrice ?? ''} 
              onChange={(e) => setFilter({ maxPrice: e.target.value ? Number(e.target.value) : undefined })} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('storeProducts.filters.status')}
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
              value={params.published !== undefined ? String(params.published) : ''} 
              onChange={(e) => setFilter({ published: e.target.value === '' ? undefined : e.target.value === 'true' })}
            >
              <option value="">{t('storeProducts.filters.allProducts')}</option>
              <option value="true">{t('storeProducts.filters.published')}</option>
              <option value="false">{t('storeProducts.filters.unpublished')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('storeProducts.filters.sortBy')}
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
              value={`${params.sortBy}:${params.sortOrder}`} 
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split(':');
                setFilter({ sortBy, sortOrder: sortOrder as 'ASC' | 'DESC' });
              }}
            >
              <option value="createdAt:DESC">{t('storeProducts.filters.newestFirst')}</option>
              <option value="createdAt:ASC">{t('storeProducts.filters.oldestFirst')}</option>
              <option value="price:ASC">{t('storeProducts.filters.priceAsc')}</option>
              <option value="price:DESC">{t('storeProducts.filters.priceDesc')}</option>
              <option value="name:ASC">{t('storeProducts.filters.nameAsc')}</option>
              <option value="name:DESC">{t('storeProducts.filters.nameDesc')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
            <span>{t('storeProducts.loading')}</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{t('storeProducts.error', { message: error })}</span>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <StoreProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('storeProducts.emptyState.title')}
          </h3>
          <p className="text-gray-500">
            {t('storeProducts.emptyState.message')}
          </p>
        </div>
      )}
    </div>
  );
}
