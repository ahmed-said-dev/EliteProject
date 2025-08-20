import { apiService } from '../../services/api';
import type { Category, Product } from '../../types';

export interface ReorderNodeInput {
  id: string;
  sortOrder: number;
  parentId: string | null;
}

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    const items = (await apiService.get<Category[]>('/categories')) as unknown as Category[];
    return items;
  },

  async getRoot(): Promise<Category[]> {
    const items = (await apiService.get<Category[]>('/categories/root')) as unknown as Category[];
    return items;
  },

  async getById(id: string): Promise<Category> {
    const res = await apiService.get<Category>(`/categories/${id}`);
    return res.data as unknown as Category;
  },

  async createCategory(data: Partial<Category>): Promise<Category> {
    const res = await apiService.post<Category>('/categories', data);
    return res as unknown as Category;
  },

  async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    const res = await apiService.patch<Category>(`/categories/${id}`, data);
    return res as unknown as Category;
  },

  async deleteCategory(id: string): Promise<void> {
    await apiService.delete(`/categories/${id}`);
  },

  async reorder(nodes: ReorderNodeInput[]): Promise<void> {
    await apiService.patch(`/categories/reorder`, { nodes });
  },

  async uploadImage(categoryId: string, file: File): Promise<Category> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiService.upload<Category>(`/categories/${categoryId}/image`, formData);
    return res as unknown as Category;
  },

  async attachProducts(categoryId: string, productIds: string[]): Promise<{ success: boolean; updated: number }> {
    const res = await apiService.post<{ success: boolean; updated: number }>(`/categories/${categoryId}/attach-products`, { productIds });
    return res as unknown as { success: boolean; updated: number };
  },

  async detachProducts(categoryId: string, productIds: string[]): Promise<{ success: boolean; updated: number }> {
    const res = await apiService.post<{ success: boolean; updated: number }>(`/categories/${categoryId}/detach-products`, { productIds });
    return res as unknown as { success: boolean; updated: number };
  },
};





