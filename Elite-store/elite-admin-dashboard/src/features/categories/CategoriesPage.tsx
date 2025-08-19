import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, message, Upload, Space, Popconfirm } from 'antd';
import { UploadOutlined, PlusOutlined, LinkOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import CategoriesTree from './CategoriesTree';
import CategoryFormModal from './CategoryFormModal';
import CategoryProductsModal from './CategoryProductsModal';
import { categoriesService, type ReorderNodeInput } from './service';
import type { Category } from '../../types';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [productsOpen, setProductsOpen] = useState(false);

  const selected = useMemo(() => categories.find(c => c.id === selectedIds[0]) || null, [categories, selectedIds]);

  const load = async () => {
    setLoading(true);
    try {
      const items = await categoriesService.getAll();
      setCategories(items);
    } catch (e: any) {
      message.error(e.message || 'فشل تحميل الفئات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (values: Partial<Category>) => {
    try {
      if (editTarget) {
        await categoriesService.updateCategory(editTarget.id, values);
        message.success('تم تحديث الفئة');
      } else {
        await categoriesService.createCategory(values);
        message.success('تم إنشاء الفئة');
      }
      setFormOpen(false);
      setEditTarget(null);
      await load();
    } catch (e: any) {
      message.error(e.message || 'حدث خطأ');
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    await categoriesService.deleteCategory(selected.id);
    message.success('تم حذف الفئة');
    setSelectedIds([]);
    await load();
  };

  const handleMove = async (dragId: string, dropParentId: string | null, sortOrder: number) => {
    const nodes: ReorderNodeInput[] = [
      { id: dragId, parentId: dropParentId, sortOrder },
    ];
    await categoriesService.reorder(nodes);
    message.success('تم حفظ ترتيب الفئات');
    await load();
  };

  const handleUpload = async ({ file }: any) => {
    if (!selected) return;
    await categoriesService.uploadImage(selected.id, file as File);
    message.success('تم رفع الصورة');
    await load();
  };

  const attachProducts = async (ids: string[]) => {
    if (!selected) return;
    await categoriesService.attachProducts(selected.id, ids);
    message.success('تم ربط المنتجات');
    await load();
  };

  const detachProducts = async (ids: string[]) => {
    if (!selected) return;
    await categoriesService.detachProducts(selected.id, ids);
    message.success('تم فصل المنتجات');
    await load();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">إدارة الفئات</h1>
        <p className="page-subtitle">إدارة فئات المنتجات والخدمات</p>
      </div>

      <Card loading={loading}>
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditTarget(null); setFormOpen(true); }}>إضافة فئة</Button>
          <Button icon={<EditOutlined />} disabled={!selected} onClick={() => { setEditTarget(selected); setFormOpen(true); }}>تعديل</Button>
          <Popconfirm title="تأكيد الحذف" onConfirm={handleDelete} okText="حذف" cancelText="إلغاء">
            <Button danger icon={<DeleteOutlined />} disabled={!selected}>حذف</Button>
          </Popconfirm>
          <Upload maxCount={1} customRequest={({ file, onSuccess }: any) => { handleUpload({ file }); onSuccess && onSuccess('ok'); }}>
            <Button icon={<UploadOutlined />} disabled={!selected}>رفع صورة</Button>
          </Upload>
          <Button icon={<LinkOutlined />} disabled={!selected} onClick={() => setProductsOpen(true)}>ربط منتجات</Button>
          <Button icon={<ReloadOutlined />} onClick={load}>تحديث</Button>
        </Space>

        <CategoriesTree
          categories={categories}
          selectedKeys={selectedIds}
          onSelect={setSelectedIds}
          onMove={handleMove}
        />
      </Card>

      <CategoryFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditTarget(null); }}
        onSubmit={handleSubmit}
        initial={editTarget}
        categories={categories}
      />

      <CategoryProductsModal
        open={productsOpen}
        onClose={() => setProductsOpen(false)}
        category={selected}
        onAttach={attachProducts}
        onDetach={detachProducts}
      />
    </div>
  );
};

export default CategoriesPage;
 