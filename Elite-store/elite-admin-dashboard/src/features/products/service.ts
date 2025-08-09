import { apiService } from '../../services/api';
import type { Product, PaginatedResponse, QueryParams } from '../../types';

export const productsService = {
  // Get all products with pagination
  async getProducts(params?: QueryParams): Promise<PaginatedResponse<Product>> {
    // Build query: map search -> q, pass through filters and sorting
    const query: Record<string, any> = { ...(params || {}) };
    if (query.search && typeof query.search === 'string') {
      query.q = query.search.trim();
      delete query.search;
    }
    const items = (await apiService.get<Product[]>('/products', query)) as unknown as Product[];
    return {
      data: items,
      total: items.length,
      page: 1,
      limit: items.length,
      totalPages: 1,
    };
  },

  // Get single product by ID
  async getProduct(id: string): Promise<Product> {
    const response = await apiService.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Create new product
  async createProduct(data: Partial<Product>): Promise<Product> {
    const response = await apiService.post<Product>('/products', data);
    return response as unknown as Product;
  },

  // Update product
  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const response = await apiService.patch<Product>(`/products/${id}`, data);
    return response as unknown as Product;
  },

  // Delete product
  async deleteProduct(id: string): Promise<void> {
    await apiService.delete(`/products/${id}`);
  },

  // Upload product images
  async uploadImages(productId: string, files: File[]): Promise<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(`images`, file);
    });
    
    const response = await apiService.upload(`/products/${productId}/images`, formData);
    return response.data;
  },

  // Delete product image
  async deleteImage(productId: string, imageId: string): Promise<void> {
    await apiService.delete(`/products/${productId}/images/${imageId}`);
  },

  // Set primary image
  async setPrimaryImage(productId: string, imageId: string): Promise<void> {
    await apiService.patch(`/products/${productId}/images/${imageId}/primary`);
  },

  // Get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    const response = await apiService.get<Product[]>('/products/featured');
    return response as unknown as Product[];
  },

  // Toggle product featured status
  async toggleFeatured(id: string): Promise<Product> {
    const response = await apiService.patch<Product>(`/products/${id}/toggle-featured`);
    return response as unknown as Product;
  },

  // Toggle product published status
  async togglePublished(id: string): Promise<Product> {
    const response = await apiService.patch<Product>(`/products/${id}/toggle-published`);
    return response as unknown as Product;
  },

  // Bulk delete products
  async bulkDelete(ids: string[]): Promise<void> {
    await apiService.post('/products/bulk-delete', { ids });
  },

  // Export products
  async exportProducts(format: 'csv' | 'xlsx' = 'xlsx'): Promise<Blob> {
    const blob = await apiService.getBlob(`/products/export-file`, { format });
    return blob;
  },

  // Import products
  async importProducts(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiService.upload('/products/import', formData);
    return response.data;
  },
};
 