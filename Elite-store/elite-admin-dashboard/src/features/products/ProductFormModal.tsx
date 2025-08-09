import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Input, InputNumber, Select, Checkbox, Button, Upload, Radio, message, Collapse } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import type { Product } from '../../types';
import { productsService } from './service';
import api, { apiService } from '../../services/api';
import type { UploadFile } from 'antd/es/upload/interface';
import { useCreateProduct, useUpdateProduct } from './hooks';
import { useQueryClient } from '@tanstack/react-query';

const { Panel } = Collapse;

type FormValues = {
  name: string;
  slug: string;
  sku: string;
  description: string;
  shortDescription?: string;
  price: number;
  salePrice?: number;
  stockQuantity?: number;
  featured?: boolean;
  published?: boolean;
  status?: string;
  categoryId?: string;
  weight?: number;
  dimensions?: string;
  tags?: string[];
};

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  product?: Product | null;
}

const ProductFormModal: React.FC<Props> = ({ open, onClose, onSaved, product }) => {
  const isEdit = !!product;
  const { control, handleSubmit, watch, setValue, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      name: '',
      slug: '',
      sku: '',
      description: '',
      shortDescription: '',
      price: 0,
      salePrice: undefined,
      stockQuantity: 0,
      featured: false,
      published: true,
      status: 'active',
      categoryId: '',
      weight: undefined,
      dimensions: '',
      tags: [],
    }
  });

  // Refill form when editingProduct changes
  useEffect(() => {
    if (product) {
      reset({
        name: product.name || '',
        slug: product.slug || '',
        sku: product.sku || '',
        description: product.description || '',
        shortDescription: (product as any).shortDescription || '',
        price: Number(product.price) || 0,
        salePrice: product.salePrice ? Number(product.salePrice) : undefined,
        stockQuantity: Number(product.stockQuantity) || 0,
        featured: !!product.featured,
        published: !!product.published,
        status: (product as any).status || 'active',
        categoryId: (product as any).categoryId || '',
        weight: (product as any).weight ? Number((product as any).weight) : undefined,
        dimensions: (product as any).dimensions || '',
        tags: (product as any).tags || [],
      });
    } else {
      reset({
        name: '', slug: '', sku: '', description: '', shortDescription: '', price: 0, salePrice: undefined,
        stockQuantity: 0, featured: false, published: true, status: 'active', categoryId: '', weight: undefined, dimensions: '', tags: []
      });
    }
  }, [product, reset]);

  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  // Images state
  const [thumbnailList, setThumbnailList] = useState<UploadFile[]>([]);
  const [galleryList, setGalleryList] = useState<UploadFile[]>([]);
  const [primaryIndex, setPrimaryIndex] = useState<number | null>(null);
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const queryClient = useQueryClient();

  // Build absolute URL for images served by backend /uploads
  const API_BASE = (api.defaults.baseURL as string) || 'http://localhost:3001/api';
  const ASSETS_BASE = useMemo(() => (API_BASE as string).replace(/\/api\/?$/, ''), [API_BASE]);
  const resolveImageUrl = (url?: string) => {
    if (!url) return undefined;
    if (/^https?:\/\//i.test(url)) return url;
    return `${ASSETS_BASE}${url}`;
  };

  useEffect(() => {
    if (!open) return;
    apiService.get<any[]>('/categories').then((res) => {
      const list = (res as unknown as any[]).map((c: any) => ({ id: c.id, name: c.name }));
      setCategories(list);
    }).catch(() => setCategories([]));
    // Prefill uploads with existing images when editing
    if (product && Array.isArray(product.images)) {
      const primary = product.images.find((img) => img.isPrimary) || product.images[0];
      const others = product.images.filter((img) => img.id !== primary?.id);
      // Thumbnail list (at most one)
      setThumbnailList(
        primary
          ? [
              {
                uid: primary.id,
                name: primary.filename || primary.url.split('/').pop() || 'thumbnail',
                status: 'done',
                url: resolveImageUrl(primary.url),
              },
            ]
          : []
      );
      // Gallery list (others)
      setGalleryList(
        others.map((img) => ({
          uid: img.id,
          name: img.filename || img.url.split('/').pop() || 'image',
          status: 'done',
          url: resolveImageUrl(img.url),
        }))
      );
    } else {
      setThumbnailList([]);
      setGalleryList([]);
    }
  }, [open, product]);

  // Auto-generate slug from name
  const nameValue = watch('name');
  useEffect(() => {
    if (!isEdit) {
      const slug = (nameValue || '')
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '')
        .replace(/\s+/g, '-');
      if (slug) setValue('slug', slug);
    }
  }, [nameValue, isEdit, setValue]);

  const onSubmit = async (values: FormValues) => {
    const payload: Partial<Product> = {
      name: values.name,
      slug: values.slug,
      sku: values.sku,
      description: values.description,
      shortDescription: values.shortDescription,
      price: Number(values.price),
      salePrice: values.salePrice ? Number(values.salePrice) : undefined,
      stockQuantity: values.stockQuantity ? Number(values.stockQuantity) : 0,
      featured: !!values.featured,
      published: !!values.published,
      status: values.status || 'active',
      categoryId: values.categoryId || undefined,
      weight: typeof values.weight === 'number' ? values.weight : undefined,
      dimensions: values.dimensions as any,
      tags: values.tags as any,
    };

    let createdOrUpdated: Product | null = null;
    if (isEdit && product) {
      createdOrUpdated = await updateMutation.mutateAsync({ id: product.id, data: payload });
    } else {
      createdOrUpdated = await createMutation.mutateAsync(payload);
    }

    // Upload images after create/update
    try {
      if (createdOrUpdated) {
        // Gather newly added files only (those having originFileObj)
        const newThumbFile = thumbnailList.find((f) => f.originFileObj)?.originFileObj as File | undefined;
        const newGalleryFiles = galleryList
          .filter((f) => !!f.originFileObj)
          .map((f) => f.originFileObj as File);
        const filesToUpload: File[] = [...(newThumbFile ? [newThumbFile] : []), ...newGalleryFiles];

        if (filesToUpload.length > 0) {
          const uploaded: any[] = await productsService.uploadImages(createdOrUpdated.id, filesToUpload);
          // If a primary index was selected among new uploads, set it. Default to first uploaded if selected.
          if (uploaded && uploaded.length > 0 && primaryIndex !== null && uploaded[primaryIndex]) {
            await productsService.setPrimaryImage(createdOrUpdated.id, uploaded[primaryIndex].id);
          }
          // Ensure UI syncs with latest images
          queryClient.invalidateQueries({ queryKey: ['products'] });
          queryClient.invalidateQueries({ queryKey: ['products', createdOrUpdated.id] });
        }
      }
    } catch (e) {
      console.warn('Upload images failed', e);
      message.warning('تم حفظ المنتج، لكن حدث خطأ أثناء رفع الصور');
    }

    onSaved();
    onClose();
    reset();
    setThumbnailList([]);
    setGalleryList([]);
    setPrimaryIndex(null);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={isEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}
      footer={null}
      width={800}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Collapse accordion defaultActiveKey={['base']}>
          <Panel header="الأساسيات" key="base">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label className="form-label">اسم المنتج</label>
                <Controller control={control} name="name" rules={{ required: 'الاسم مطلوب' }} render={({ field }) => (
                  <Input value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                )} />
                {errors.name && <span className="form-error">{errors.name.message}</span>}
              </div>
              <div>
                <label className="form-label">الرابط (slug)</label>
                <Controller control={control} name="slug" rules={{ required: 'الـ slug مطلوب' }} render={({ field }) => (
                  <Input value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                )} />
                {errors.slug && <span className="form-error">{errors.slug.message}</span>}
              </div>
              <div>
                <label className="form-label">الكود (SKU)</label>
                <Controller control={control} name="sku" rules={{ required: 'الكود مطلوب' }} render={({ field }) => (
                  <Input value={field.value} onChange={(e) => field.onChange(e.target.value)} />
                )} />
                {errors.sku && <span className="form-error">{errors.sku.message}</span>}
              </div>
              <div>
                <label className="form-label">الفئة</label>
                <Controller control={control} name="categoryId" render={({ field }) => (
                  <Select className="w-full" value={field.value} onChange={(val) => field.onChange(val)} placeholder="اختر الفئة" options={[{ label: '— بدون —', value: '' }, ...categories.map(c => ({ label: c.name, value: c.id }))]} />
                )} />
              </div>
            </div>
          </Panel>

          <Panel header="التسعير والمخزون" key="pricing">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label className="form-label">السعر</label>
                <Controller control={control} name="price" rules={{ required: 'السعر مطلوب' }} render={({ field }) => (
                  <InputNumber className="w-full" step={0.01} value={field.value} onChange={(val) => field.onChange(val ?? 0)} />
                )} />
                {errors.price && <span className="form-error">{errors.price.message}</span>}
              </div>
              <div>
                <label className="form-label">سعر الخصم</label>
                <Controller control={control} name="salePrice" render={({ field }) => (
                  <InputNumber className="w-full" step={0.01} value={field.value as number | null | undefined} onChange={(val) => field.onChange(val ?? undefined)} />
                )} />
              </div>
              <div>
                <label className="form-label">المخزون</label>
                <Controller control={control} name="stockQuantity" render={({ field }) => (
                  <InputNumber className="w-full" value={field.value as number | null | undefined} onChange={(val) => field.onChange(val ?? 0)} />
                )} />
              </div>
            </div>
          </Panel>

          <Panel header="المواصفات" key="specs">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label className="form-label">الوزن</label>
                <Controller control={control} name="weight" render={({ field }) => (
                  <InputNumber className="w-full" step={0.01} value={field.value as number | undefined} onChange={(val) => field.onChange(typeof val === 'number' ? val : undefined)} placeholder="مثال: 0.20" />
                )} />
              </div>
              <div>
                <label className="form-label">الأبعاد</label>
                <Controller control={control} name="dimensions" render={({ field }) => (
                  <Input value={field.value} onChange={(e) => field.onChange(e.target.value)} placeholder="مثال: 6.1 x 2.8 x 0.3 inches" />
                )} />
              </div>
              <div>
                <label className="form-label">الوسوم</label>
                <Controller control={control} name="tags" render={({ field }) => (
                  <Select mode="tags" className="w-full" value={field.value} onChange={(val) => field.onChange(val)} tokenSeparators={[',']} placeholder="أدخل وسوماً واضغط Enter" />
                )} />
              </div>
              <div>
                <label className="form-label">الحالة</label>
                <Controller control={control} name="status" render={({ field }) => (
                  <Select className="w-full" value={field.value} onChange={(val) => field.onChange(val)} options={[{ label: 'نشط', value: 'active' }, { label: 'غير نشط', value: 'inactive' }, { label: 'غير متوفر', value: 'out_of_stock' }, { label: 'موقوف', value: 'discontinued' }]} />
                )} />
              </div>
              <div>
                <label className="form-label">خصائص</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  <Controller control={control} name="featured" render={({ field }) => (
                    <Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)}>مميز</Checkbox>
                  )} />
                  <Controller control={control} name="published" render={({ field }) => (
                    <Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)}>منشور</Checkbox>
                  )} />
                </div>
              </div>
            </div>
          </Panel>

          <Panel header="الصور" key="images">
            <div>
              <label className="form-label">الصورة المصغّرة (Thumbnail)</label>
              <Upload accept="image/*" maxCount={1} listType="picture" fileList={thumbnailList} beforeUpload={() => false} onChange={({ fileList }) => setThumbnailList(fileList)}>
                <Button>اختر صورة المصغّر</Button>
              </Upload>
            </div>
            <div style={{ marginTop: 16 }}>
              <label className="form-label">معرض الصور</label>
              <Upload.Dragger multiple accept="image/*" listType="picture" fileList={galleryList} beforeUpload={() => false} onChange={({ fileList }) => setGalleryList(fileList)}>
                <p>اسحب وأفلت الصور هنا أو اضغط للاختيار</p>
              </Upload.Dragger>
              {(() => {
                const hasNewThumb = !!thumbnailList.find((f) => !!f.originFileObj);
                const newGallery = galleryList.filter((f) => !!f.originFileObj);
                const newUploads: Array<{ name: string }> = [
                  ...(hasNewThumb ? [{ name: (thumbnailList.find((f) => !!f.originFileObj)?.name as string) || 'thumbnail' }] : []),
                  ...newGallery.map((f) => ({ name: f.name }))
                ];
                return newUploads.length > 0 ? (
                  <div style={{ marginTop: 8 }}>
                    <label className="form-label">اختر الصورة البارزة (Primary)</label>
                    <Radio.Group value={primaryIndex ?? undefined} onChange={(e) => setPrimaryIndex(e.target.value)}>
                      {newUploads.map((f, idx) => (
                        <Radio key={(f.name || 'thumbnail') + idx} value={idx} style={{ marginInlineEnd: 12 }}>
                          {idx === 0 && hasNewThumb ? 'الصورة المصغّرة' : f.name}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                ) : null;
              })()}
            </div>
          </Panel>

          <Panel header="الوصف" key="description">
            <div>
              <label className="form-label">الوصف</label>
              <Controller control={control} name="description" rules={{ required: 'الوصف مطلوب' }} render={({ field }) => (
                <Input.TextArea rows={4} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
              )} />
              {errors.description && <span className="form-error">{errors.description.message}</span>}
            </div>
            <div style={{ marginTop: 12 }}>
              <label className="form-label">وصف مختصر</label>
              <Controller control={control} name="shortDescription" render={({ field }) => (
                <Input.TextArea rows={2} value={field.value} onChange={(e) => field.onChange(e.target.value)} />
              )} />
            </div>
          </Panel>
        </Collapse>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
          <Button onClick={onClose}>إلغاء</Button>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>{isEdit ? 'حفظ التعديلات' : 'إضافة المنتج'}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductFormModal;




