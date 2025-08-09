import React, { useState } from 'react';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { 
  useProducts, 
  useDeleteProduct, 
  useBulkDeleteProducts,
  useTogglePublished,
  useExportProducts,
  useImportProducts
} from './hooks';
import type { Product, QueryParams } from '../../types';
import ProductFormModal from './ProductFormModal';
import ProductDetailsModal from './ProductDetailsModal';

// Build absolute URL for images served by backend /uploads
import api from '../../services/api';
const API_BASE = (api.defaults.baseURL as string) || 'http://localhost:3001/api';
const ASSETS_BASE = API_BASE.replace(/\/api\/?$/, '');
const resolveImageUrl = (url?: string) => {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${ASSETS_BASE}${url}`;
};

// Products Table Component
const ProductsTable: React.FC<{
  products: Product[];
  selectedIds: string[];
  onSelectProduct: (id: string) => void;
  onSelectAll: (selectAll: boolean) => void;
  onEdit: (product: Product) => void;
  onView: (product: Product) => void;
}> = ({ 
  products, 
  selectedIds, 
  onSelectProduct, 
  onSelectAll, 
  onEdit, 
  onView 
}) => {
  const deleteProductMutation = useDeleteProduct();
  const togglePublishedMutation = useTogglePublished();

  const handleDelete = async (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      await deleteProductMutation.mutateAsync(id);
    }
  };

  const handleTogglePublished = async (id: string) => {
    await togglePublishedMutation.mutateAsync(id);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => onSelectAll(e.target.checked)}
                checked={selectedIds.length === products.length && products.length > 0}
              />
            </th>
            <th>الصورة</th>
            <th>اسم المنتج</th>
            <th>الفئة</th>
            <th>السعر</th>
            <th>سعر الخصم</th>
            <th>المخزون</th>
            <th>الحالة</th>
            <th>مميز</th>
            <th>منشور</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(product.id)}
                  onChange={() => onSelectProduct(product.id)}
                />
              </td>
              <td>
                <div className="product-image">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={resolveImageUrl(product.images.find(img => img.isPrimary)?.url || product.images[0]?.url)} 
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs">لا توجد صورة</span>
                    </div>
                  )}
                </div>
              </td>
              <td>
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.sku}</p>
                </div>
              </td>
              <td>{product.category?.name || 'غير محدد'}</td>
              <td>
                <span className="font-medium">${product.price}</span>
              </td>
              <td>
                {product.salePrice ? (
                  <span className="text-sm text-green-600">${product.salePrice}</span>
                ) : (
                  <span className="text-sm text-gray-400">—</span>
                )}
              </td>
              <td>
                <span className={`badge ${
                  product.stockQuantity > 10 ? 'badge-success' :
                  product.stockQuantity > 0 ? 'badge-warning' : 'badge-danger'
                }`}>
                  {product.stockQuantity}
                </span>
              </td>
              <td>
                <button
                  onClick={() => handleTogglePublished(product.id)}
                  className={`badge ${product.published ? 'badge-success' : 'badge-danger'}`}
                  disabled={togglePublishedMutation.isPending}
                >
                  {product.published ? 'منشور' : 'غير منشور'}
                </button>
              </td>
              <td>
                <span className={`badge ${product.featured ? 'badge-success' : 'badge-secondary'}`}>
                  {product.featured ? 'نعم' : 'لا'}
                </span>
              </td>
              <td>
                <span className={`badge ${product.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                  {product.status}
                </span>
              </td>
              <td>
                <div className="flex gap-2">
                  <button
                    onClick={() => onView(product)}
                    className="btn btn-sm btn-secondary"
                    title="عرض"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(product)}
                    className="btn btn-sm btn-primary"
                    title="تعديل"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-sm btn-danger"
                    title="حذف"
                    disabled={deleteProductMutation.isPending}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main Products Page Component
const ProductsPage: React.FC = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 1,
    limit: 10,
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'DESC',
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const { data: productsData, isLoading, error } = useProducts(queryParams);
  const bulkDeleteMutation = useBulkDeleteProducts();
  const exportMutation = useExportProducts();
  const importMutation = useImportProducts();

  const products = productsData?.data || [];
  const totalPages = productsData?.totalPages || 0;

  const handleSearch = (search: string) => {
    setQueryParams(prev => ({ ...prev, search, page: 1 }));
  };

  const handleSelectProduct = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (selectAll: boolean) => {
    setSelectedIds(selectAll ? products.map(p => p.id) : []);
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    
    if (window.confirm(`هل أنت متأكد من حذف ${selectedIds.length} منتج؟`)) {
      await bulkDeleteMutation.mutateAsync(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleExport = async (format: 'csv' | 'xlsx' = 'xlsx') => {
    await exportMutation.mutateAsync(format);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await importMutation.mutateAsync(file);
      event.target.value = ''; // Reset input
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleView = (product: Product) => {
    setViewingProduct(product);
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="skeleton" style={{ height: '400px' }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">خطأ في تحميل المنتجات</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-row">
          <div className="page-header-titles">
            <h1 className="page-title">إدارة المنتجات</h1>
            <p className="page-subtitle">إدارة منتجات وأدوية المركز البيطري</p>
          </div>
          <button className="btn btn-primary btn-sm products-add-btn" onClick={() => { setEditingProduct(null); setShowForm(true); }}>
            <PlusIcon className="w-3 h-3" />
            إضافة منتج جديد
          </button>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="card mb-6">
        <div className="card-body products-actions">
          <div className="products-actions-row">
            {/* Action Buttons */}
            <div className="products-actions-buttons">
              {selectedIds.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="btn btn-danger btn-sm"
                  disabled={bulkDeleteMutation.isPending}
                >
                  <TrashIcon className="w-4 h-4" />
                  حذف المحدد ({selectedIds.length})
                </button>
              )}
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-secondary btn-sm"
              >
                <FunnelIcon className="w-4 h-4" />
                فلترة
              </button>

              <button
                onClick={() => handleExport('xlsx')}
                className="btn btn-secondary btn-sm"
                disabled={exportMutation.isPending}
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                تصدير
              </button>

              <label className="btn btn-secondary btn-sm cursor-pointer">
                <ArrowUpTrayIcon className="w-4 h-4" />
                استيراد
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleImport}
                  style={{ display: 'none' }}
                  disabled={importMutation.isPending}
                />
              </label>
            </div>

            {/* Search */}
            <div className="products-search">
              <div className="relative">
                <MagnifyingGlassIcon className="icon w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في المنتجات..."
                  className="form-input form-input-sm pl-8"
                  value={queryParams.search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">فلاتر البحث المتقدم</h3>
                
                {/* First Row - Category & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">الفئة</label>
                    <select 
                      className="form-input w-full"
                      value={queryParams.categoryId || ''}
                      onChange={(e) => setQueryParams(prev => ({ ...prev, categoryId: e.target.value || undefined }))}
                    >
                      <option value="">اختر الفئة...</option>
                      {/* TODO: Load categories */}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">الحالة</label>
                    <select 
                      className="form-input w-full"
                      value={queryParams.status || ''}
                      onChange={(e) => setQueryParams(prev => ({ ...prev, status: e.target.value || undefined }))}
                    >
                      <option value="">اختر الحالة...</option>
                      <option value="active">نشط</option>
                      <option value="inactive">غير نشط</option>
                      <option value="out_of_stock">غير متوفر</option>
                      <option value="discontinued">موقوف</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">النوع</label>
                    <select 
                      className="form-input w-full"
                      value={queryParams.featured !== undefined ? String(queryParams.featured) : ''}
                      onChange={(e) => setQueryParams(prev => ({ 
                        ...prev, 
                        featured: e.target.value === '' ? undefined : e.target.value === 'true'
                      }))}
                    >
                      <option value="">جميع المنتجات</option>
                      <option value="true">مميز</option>
                      <option value="false">عادي</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">حالة النشر</label>
                    <select 
                      className="form-input w-full"
                      value={queryParams.published !== undefined ? String(queryParams.published) : ''}
                      onChange={(e) => setQueryParams(prev => ({ 
                        ...prev, 
                        published: e.target.value === '' ? undefined : e.target.value === 'true'
                      }))}
                    >
                      <option value="">جميع المنتجات</option>
                      <option value="true">منشور</option>
                      <option value="false">غير منشور</option>
                    </select>
                  </div>
                </div>

                {/* Second Row - Price Range & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">السعر من</label>
                    <input
                      type="number"
                      placeholder="أقل سعر..."
                      className="form-input w-full"
                      value={queryParams.minPrice || ''}
                      onChange={(e) => setQueryParams(prev => ({ 
                        ...prev, 
                        minPrice: e.target.value ? Number(e.target.value) : undefined 
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">السعر إلى</label>
                    <input
                      type="number"
                      placeholder="أعلى سعر..."
                      className="form-input w-full"
                      value={queryParams.maxPrice || ''}
                      onChange={(e) => setQueryParams(prev => ({ 
                        ...prev, 
                        maxPrice: e.target.value ? Number(e.target.value) : undefined 
                      }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">المخزون</label>
                    <select 
                      className="form-input w-full"
                      value={queryParams.inStock !== undefined ? String(queryParams.inStock) : ''}
                      onChange={(e) => setQueryParams(prev => ({ 
                        ...prev, 
                        inStock: e.target.value === '' ? undefined : e.target.value === 'true'
                      }))}
                    >
                      <option value="">جميع المنتجات</option>
                      <option value="true">متوفر</option>
                      <option value="false">غير متوفر</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">ترتيب حسب</label>
                <select 
                      className="form-input w-full"
                      value={queryParams.sortBy || 'createdAt'}
                  onChange={(e) => setQueryParams(prev => ({ ...prev, sortBy: e.target.value }))}
                >
                  <option value="createdAt">تاريخ الإنشاء</option>
                  <option value="name">الاسم</option>
                  <option value="price">السعر</option>
                  <option value="stockQuantity">المخزون</option>
                      <option value="salesCount">المبيعات</option>
                      <option value="viewsCount">المشاهدات</option>
                </select>
                  </div>
                </div>

                {/* Third Row Label & Sort Order */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-600 mb-2">اتجاه الترتيب</label>
                <select 
                  className="form-input"
                      value={queryParams.sortOrder || 'DESC'}
                  onChange={(e) => setQueryParams(prev => ({ ...prev, sortOrder: e.target.value as 'ASC' | 'DESC' }))}
                >
                      <option value="DESC">تنازلي (الأحدث أولاً)</option>
                      <option value="ASC">تصاعدي (الأقدم أولاً)</option>
                </select>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setQueryParams({
                        page: 1,
                        limit: 10,
                        search: '',
                        sortBy: 'createdAt',
                        sortOrder: 'DESC',
                      })}
                      className="btn btn-secondary btn-sm"
                    >
                      إعادة تعيين الفلاتر
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        <ProductsTable
          products={products}
          selectedIds={selectedIds}
          onSelectProduct={handleSelectProduct}
          onSelectAll={handleSelectAll}
          onEdit={handleEdit}
          onView={handleView}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="card-footer">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                عرض {products.length} من {productsData?.total} منتج
              </span>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setQueryParams(prev => ({ ...prev, page: prev.page! - 1 }))}
                  disabled={queryParams.page === 1}
                  className="btn btn-secondary btn-sm"
                >
                  السابق
                </button>
                
                <span className="px-3 py-1 text-sm">
                  صفحة {queryParams.page} من {totalPages}
                </span>
                
                <button
                  onClick={() => setQueryParams(prev => ({ ...prev, page: prev.page! + 1 }))}
                  disabled={queryParams.page === totalPages}
                  className="btn btn-secondary btn-sm"
                >
                  التالي
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        open={showForm}
        onClose={() => setShowForm(false)}
        onSaved={() => { /* refetch by invalidating query via simple param change */ setQueryParams(prev => ({ ...prev })); }}
        product={editingProduct}
      />

      {/* Product Details Modal */}
      <ProductDetailsModal
        open={!!viewingProduct}
        product={viewingProduct}
        onClose={() => setViewingProduct(null)}
            onEdit={(p: Product) => { setViewingProduct(null); setEditingProduct(p); setShowForm(true); }}
      />
    </div>
  );
};

export default ProductsPage;
 