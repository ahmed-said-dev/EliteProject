import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { productsService } from './service';
import type { Product, QueryParams } from '../../types';
import toast from 'react-hot-toast';

// Get products with pagination
export const useProducts = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsService.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: keepPreviousData,
  });
};

// Get single product
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productsService.getProduct(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get featured products
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => productsService.getFeaturedProducts(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Create product mutation
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Product>) => productsService.createProduct(data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const snapshots = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      return { snapshots };
    },
    onSuccess: (created) => {
      const lists = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      lists.forEach(([key, value]) => {
        if (!value) return;
        if (Array.isArray((value as any).data)) {
          const existing = (value as any).data as Product[];
          queryClient.setQueryData(key, { ...value, data: [created as Product, ...existing], total: (value as any).total + 1 });
        }
      });
      queryClient.setQueryData(['products', (created as Product).id], created);
      toast.success('تم إنشاء المنتج بنجاح!');
    },
    onError: (_err, _vars, context) => {
      if (context?.snapshots) {
        context.snapshots.forEach(([key, data]: any) => queryClient.setQueryData(key, data));
      }
      toast.error('فشل في إنشاء المنتج');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// Update product mutation
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      productsService.updateProduct(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const snapshots = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      const lists = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      lists.forEach(([key, value]) => {
        if (!value) return;
        if (Array.isArray((value as any).data)) {
          const list = (value as any).data as Product[];
          const next = list.map((p) => (p.id === id ? { ...p, ...data } as Product : p));
          queryClient.setQueryData(key, { ...value, data: next });
        }
      });
      const prevItem = queryClient.getQueryData<Product>(['products', id]);
      if (prevItem) queryClient.setQueryData(['products', id], { ...prevItem, ...data });
      return { snapshots, prevItem };
    },
    onSuccess: (updatedProduct) => {
      const lists = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      lists.forEach(([key, value]) => {
        if (!value) return;
        if (Array.isArray((value as any).data)) {
          const list = (value as any).data as Product[];
          const next = list.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
          queryClient.setQueryData(key, { ...value, data: next });
        }
      });
      queryClient.setQueryData(['products', updatedProduct.id], updatedProduct);
      toast.success('تم تحديث المنتج بنجاح!');
    },
    onError: (_err, vars, context) => {
      if (context?.snapshots) {
        context.snapshots.forEach(([key, data]: any) => queryClient.setQueryData(key, data));
      }
      if (context?.prevItem) queryClient.setQueryData(['products', vars.id], context.prevItem);
      toast.error('فشل في تحديث المنتج');
    },
    onSettled: (res) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      if (res?.id) queryClient.invalidateQueries({ queryKey: ['products', res.id] });
    },
  });
};

// Delete product mutation
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsService.deleteProduct(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const snapshots = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      const lists = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      lists.forEach(([key, value]) => {
        if (!value) return;
        if (Array.isArray((value as any).data)) {
          const list = (value as any).data as Product[];
          const next = list.filter((p) => p.id !== id);
          queryClient.setQueryData(key, { ...value, data: next, total: Math.max(0, (value as any).total - 1) });
        }
      });
      const prevItem = queryClient.getQueryData<Product>(['products', id]);
      queryClient.removeQueries({ queryKey: ['products', id], exact: true });
      return { snapshots, prevItem };
    },
    onSuccess: () => {
      toast.success('تم حذف المنتج بنجاح!');
    },
    onError: (_err, _id, context) => {
      if (context?.snapshots) {
        context.snapshots.forEach(([key, data]: any) => queryClient.setQueryData(key, data));
      }
      if (context?.prevItem) {
        queryClient.setQueryData(['products', context.prevItem.id], context.prevItem);
      }
      toast.error('فشل في حذف المنتج');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// Bulk delete products mutation
export const useBulkDeleteProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => productsService.bulkDelete(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const snapshots = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      const lists = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      lists.forEach(([key, value]) => {
        if (!value) return;
        if (Array.isArray((value as any).data)) {
          const list = (value as any).data as Product[];
          const next = list.filter((p) => !ids.includes(p.id));
          queryClient.setQueryData(key, { ...value, data: next, total: Math.max(0, (value as any).total - ids.length) });
        }
      });
      return { snapshots };
    },
    onSuccess: () => {
      toast.success('تم حذف المنتجات المحددة بنجاح!');
    },
    onError: (_err, _ids, context) => {
      if (context?.snapshots) {
        context.snapshots.forEach(([key, data]: any) => queryClient.setQueryData(key, data));
      }
      toast.error('فشل في حذف المنتجات');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// Upload images mutation
export const useUploadProductImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, files }: { productId: string; files: File[] }) =>
      productsService.uploadImages(productId, files),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ['products', productId] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('تم رفع الصور بنجاح!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'فشل في رفع الصور');
    },
  });
};

// Delete image mutation
export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, imageId }: { productId: string; imageId: string }) =>
      productsService.deleteImage(productId, imageId),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ['products', productId] });
      toast.success('تم حذف الصورة بنجاح!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'فشل في حذف الصورة');
    },
  });
};

// Set primary image mutation
export const useSetPrimaryImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, imageId }: { productId: string; imageId: string }) =>
      productsService.setPrimaryImage(productId, imageId),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ['products', productId] });
      toast.success('تم تعيين الصورة الرئيسية بنجاح!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'فشل في تعيين الصورة الرئيسية');
    },
  });
};

// Toggle featured mutation
export const useToggleFeatured = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsService.toggleFeatured(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const snapshots = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      const prevItem = queryClient.getQueryData<Product>(['products', id]);
      const lists = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      lists.forEach(([key, value]) => {
        if (!value) return;
        if (Array.isArray((value as any).data)) {
          const list = (value as any).data as Product[];
          const next = list.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p));
          queryClient.setQueryData(key, { ...value, data: next });
        }
      });
      if (prevItem) queryClient.setQueryData(['products', id], { ...prevItem, featured: !prevItem.featured });
      return { snapshots, prevItem };
    },
    onSuccess: (updatedProduct) => {
      const lists = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      lists.forEach(([key, value]) => {
        if (!value) return;
        if (Array.isArray((value as any).data)) {
          const list = (value as any).data as Product[];
          const next = list.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
          queryClient.setQueryData(key, { ...value, data: next });
        }
      });
      queryClient.setQueryData(['products', updatedProduct.id], updatedProduct);
      toast.success(updatedProduct.featured ? 'تم إضافة المنتج للمنتجات المميزة!' : 'تم إزالة المنتج من المنتجات المميزة!');
    },
    onError: (_err, id, context) => {
      if (context?.snapshots) {
        context.snapshots.forEach(([key, data]: any) => queryClient.setQueryData(key, data));
      }
      if (context?.prevItem) queryClient.setQueryData(['products', id], context.prevItem);
      toast.error('فشل في تحديث حالة المنتج المميز');
    },
    onSettled: (res) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      if (res?.id) queryClient.invalidateQueries({ queryKey: ['products', res.id] });
    },
  });
};

// Toggle published mutation
export const useTogglePublished = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsService.togglePublished(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const snapshots = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      const prevItem = queryClient.getQueryData<Product>(['products', id]);
      const lists = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      lists.forEach(([key, value]) => {
        if (!value) return;
        if (Array.isArray((value as any).data)) {
          const list = (value as any).data as Product[];
          const next = list.map((p) => (p.id === id ? { ...p, published: !p.published } : p));
          queryClient.setQueryData(key, { ...value, data: next });
        }
      });
      if (prevItem) queryClient.setQueryData(['products', id], { ...prevItem, published: !prevItem.published });
      return { snapshots, prevItem };
    },
    onSuccess: (updatedProduct) => {
      const lists = queryClient.getQueriesData<any>({ queryKey: ['products'] });
      lists.forEach(([key, value]) => {
        if (!value) return;
        if (Array.isArray((value as any).data)) {
          const list = (value as any).data as Product[];
          const next = list.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
          queryClient.setQueryData(key, { ...value, data: next });
        }
      });
      queryClient.setQueryData(['products', updatedProduct.id], updatedProduct);
      toast.success(updatedProduct.published ? 'تم نشر المنتج بنجاح!' : 'تم إلغاء نشر المنتج!');
    },
    onError: (_err, id, context) => {
      if (context?.snapshots) {
        context.snapshots.forEach(([key, data]: any) => queryClient.setQueryData(key, data));
      }
      if (context?.prevItem) queryClient.setQueryData(['products', id], context.prevItem);
      toast.error('فشل في تحديث حالة النشر');
    },
    onSettled: (res) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      if (res?.id) queryClient.invalidateQueries({ queryKey: ['products', res.id] });
    },
  });
};

// Export products mutation
export const useExportProducts = () => {
  return useMutation({
    mutationFn: (format: 'csv' | 'xlsx' = 'xlsx') => productsService.exportProducts(format),
    onSuccess: (blob, format) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `products.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('تم تصدير المنتجات بنجاح!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'فشل في تصدير المنتجات');
    },
  });
};

// Import products mutation
export const useImportProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => productsService.importProducts(file),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(`تم استيراد ${result.imported} منتج بنجاح!`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'فشل في استيراد المنتجات');
    },
  });
};
 